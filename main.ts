import { App, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian'
import SettingTab from './Views/SettingTab'
import MyModal from './Views/MyModal'
import updateDailyNotesNavigatorWithTodayDecal from './Functions/updateDailyNotesNavigatorWithTodayDecal'
import DailyManagerHelper from './Functions/DailyManagerHelper'
import ObsidianDevShortcuts from './Functions/ObsidianDevShortcuts'

interface MyPluginSettings {
	mySetting: string,
	todayDecalOn: boolean,
	decalText: string,
	jsonDirectory: string,
}
const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default',
	todayDecalOn: true,
	decalText: '*',
	jsonDirectory: ''
}


export default class DailyManager extends Plugin {
  settings: MyPluginSettings
	helper: DailyManagerHelper
	shortcuts: ObsidianDevShortcuts

  onunload() {
		//console.log('unloading plugin')
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
	}

	async saveSettings() {
		await this.saveData(this.settings)
	}

  // My Code finally
  async onload() {
		return new Promise(async (resolve, reject)=>{
			try {
		    await this.loadSettings()
		    this.addSettingTab(new SettingTab(this))
		    this.addCommand({
					id: 'Daily Manager: Insert Todo',
					name: 'Insert Todo',
					// callback: () => {
					// 	console.log('Simple Callback');
					// },
					checkCallback: (checking: boolean) => {
						let leaf = this.app.workspace.activeLeaf
						if (leaf) {
							if (!checking) {
								new MyModal(this).open()
							}
							return true
						}
						return false
					}
				})

				/*
				this.addCommand({
					id: 'Daily Manager: Update Daily Notes Navigator',
					name: 'Update Daily Notes Navigator',
					checkCallback: (checking: boolean) => {
						let leaf = this.app.workspace.activeLeaf
						if (leaf) {
							if (!checking) {
								updateDailyNotesNavigatorWithTodayDecal()
								new Notice("Updating Daily Notes!")
							}
							return true
						}
						return false
					}
				})
				*/


				this.registerEvent(this.app.workspace.on('file-open', ()=>{
					updateDailyNotesNavigatorWithTodayDecal(this)
				}))

				setTimeout(()=>{
					updateDailyNotesNavigatorWithTodayDecal(this)
					this.shortcuts = new ObsidianDevShortcuts(this)
					this.helper = new DailyManagerHelper(this)
				}, 200)
			} catch(err) {
				console.log(`main onload error: ${err}`)
			}
		})
  }
}
