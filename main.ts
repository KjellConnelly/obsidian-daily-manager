import { App, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian'
import SettingTab from './Views/SettingTab'
import MyModal from './Views/MyModal'
import updateDailyNotesNavigatorWithTodayDecal from './Functions/updateDailyNotesNavigatorWithTodayDecal'

interface MyPluginSettings {
	mySetting: string
}
const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}


export default class DailyManager extends Plugin {
  settings: MyPluginSettings

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
    await this.loadSettings()
    this.addSettingTab(new SettingTab(this.app, this))
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
						new MyModal(this.app).open()
					}
					return true
				}
				return false
			}
		})
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


		this.registerEvent(this.app.on('file-open', ()=>{
			updateDailyNotesNavigatorWithTodayDecal()
		}))
  }
}
