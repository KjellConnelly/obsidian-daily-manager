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
		let {containerEl} = this

		containerEl.empty()

		containerEl.createEl('h2', {text: 'Settings for my awesome plugin.'})

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue('')
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value
					await this.plugin.saveSettings()
				}))

		containerEl.createEl('h3', {text: "Today's Daily Decal"})

		const {todayDecalOn, decalText} = this.plugin.settings
		const decalToggle = new Setting(containerEl)
		decalToggle.setName("Today's Daily Note Decal")
			.setDesc(todayDecalOn ? 'Decal Added to Navigator' : 'Decal Disabled')
			.addToggle(toggle => {
				toggle.setValue(todayDecalOn)
				toggle.onChange(async isOn => {
					decalToggle.setDesc(isOn ? 'Decal Added to Navigator' : 'Decal Disabled')
					this.plugin.settings.todayDecalOn = isOn
					await this.plugin.saveSettings()
				})
			})

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
	}
}
