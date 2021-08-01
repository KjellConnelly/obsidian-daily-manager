import { App, Plugin, PluginSettingTab, Setting } from 'obsidian'
import DailyManager from './../main'

export default class SampleSettingTab extends PluginSettingTab {
	plugin: DailyManager

	constructor(app: App, plugin: DailyManager) {
		super(app, plugin)
		this.plugin = plugin
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

		const decalToggle = new Setting(containerEl)
		decalToggle.setName("Today's Daily Note Decal")
			.setDesc('Decal Added to Navigator')
			.addToggle(toggle => {
				toggle.onChange(async isOn => {
					console.log(isOn)
				})
			})

		decalToggle.addText(textElement => {
			textElement.setPlaceholder('Element HTML')
			.setValue('')
			.onChange(async (value) => {
				this.plugin.settings.mySetting = value
				await this.plugin.saveSettings()
			})
		})
	}
}