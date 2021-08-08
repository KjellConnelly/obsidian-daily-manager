import { App, Plugin, PluginSettingTab, Setting } from 'obsidian'
import DailyManager from './../main'
import updateDailyNotesNavigatorWithTodayDecal from '../Functions/updateDailyNotesNavigatorWithTodayDecal'

export default class SampleSettingTab extends PluginSettingTab {
	plugin: DailyManager

	constructor(plugin: DailyManager) {
		super(plugin.app, plugin)
		this.plugin = plugin
	}

	hide() {
		updateDailyNotesNavigatorWithTodayDecal(this.plugin)
	}

	display(): void {
		const {shortcuts} = this.plugin
		let {containerEl} = this
		containerEl.empty()
		const {todayDecalOn, decalText, jsonDirectory} = this.plugin.settings


		containerEl.createEl('h1', {text: 'Daily Manager Settings'})

		containerEl.createEl('h2', {text: "Today's Daily Decal"})
		shortcuts.addToggleInputSetting({
			containerEl:containerEl,
			name:"Today's Daily Note Decal",
			description:todayDecalOn ? 'Decal Added to Navigator' : 'Decal Disabled on Navigator',
			key:'todayDecalOn',
			onChange:(val, toggle, setting)=>{
				setting.setDesc(todayDecalOn ? 'Decal Added to Navigator' : 'Decal Disabled on Navigator')
			}
		})

		shortcuts.addTextInputSetting({
			containerEl:containerEl,
			name:'Decal Text',
			description:'Set text or html element for your decal',
			placeholder:'Default: *',
			key:'decalText',
		})



		containerEl.createEl('h2', {text: "Creating Events"})
		shortcuts.addTextInputSetting({
			containerEl:containerEl,
			name:`JSON Directory (Obsidian doesn't see .json files)`,
			description:'Where do you want your event files saved? Note: If you change this, you will need to manually move files before you run a new command which accesses this directory. We recommend somewhere in your resources folder.',
			placeholder:'daily-manager-json/',
			key:'jsonDirectory',
		})
/*
		const decalTextSetting = new Setting(containerEl)
		decalTextSetting.setName('Decal Text')
		.setDesc('Set text or html element for your decal')
		.addText(textElement => {
			textElement.setPlaceholder('Default: *')
			.setValue(decalText)
			.onChange(async (value) => {
				this.plugin.settings.decalText = value
				await this.plugin.saveSettings()
			})
		})
		*/
	}
}
