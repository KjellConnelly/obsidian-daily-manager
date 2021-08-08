import { App, Notice, Plugin, PluginSettingTab, Setting, ToggleComponent, TFile, TAbstractFile } from 'obsidian'

export default class ObsidianDevShortcuts {
  plugin : Plugin

  constructor(plugin : Plugin) {
    this.plugin = plugin
  }

  /*
  const str = await this.plugin.app.vault.adapter.read(filePath)
  console.log(str)
  */

  setTextAtPath({
    path = "",
    pathFromConfigFile = false,
    type = "file",
    defaultText = "", // if new file
    text = ""
  } = {}) {
    const {vault} = this.plugin.app
    path = `${pathFromConfigFile ? vault.configDir + "/" : ""}${path}`
    type = type.toLowerCase().trim()

    return new Promise(async (resolve, reject)=>{
      try {
        const exists = await vault.adapter.exists(path, false)
        if (!exists) {
          if (type == 'folder') {
            await vault.createFolder(path)
            resolve()
          } else {
            const newFile : TFile = await vault.create(path, defaultText)
            resolve(newFile)
          }
        } else {

          if (type == 'folder') {
            resolve()
          } else {
            const {tfile, data} = await this.getFileDataByPath({path:path})
            console.log(`tfile:`)
            console.log(tfile)
            console.log(`data:`)
            console.log(data)
            if (tfile != undefined) {
              // TFile found. Able to modify this way.
              await vault.modify(tfile, text)
              resolve()
            } else {
              // TFile not found, just OVERWRITE IT!
              await vault.adapter.write(path, text)
              resolve()
            }
          }
        }
      } catch(err) {
        console.log(`createIfNeeded error for type=${type}: ${err}`)
      }
    })
  }

  getFileDataByPath({
    path = "",
    pathFromConfigFile = false,
  } = {}) {
    const {vault} = this.plugin.app

    path = `${pathFromConfigFile ? vault.configDir + "/" : ""}${path}`
    return new Promise(async (resolve, reject)=>{
      try {
        const exists = await vault.adapter.exists(path, false)
        if (!exists) {
          reject(`No file exists at path ${path}`)
        } else {
          const tfile : TAbstractFile = vault.getAbstractFileByPath(path)
          
          //if (tfile instanceof TFile ) {}
          if (tfile != undefined) {
            resolve({
              tfile:tfile,
              data:tfile.unsafeCachedData,
            })
          } else {
            const data = await vault.adapter.read(path)
            resolve({
              tfile:undefined,
              data:data
            })
          }
        }
      } catch(err) {
        console.log(`getTFileByPath for path ${path} error: ${err}`)
      }
    })
  }

  addTextInputSetting({
    containerEl = undefined,
    name = ``,
    description = ``,
    placeholder = ``,
    key = ``,
    onChange = (value : string)=>{},
  } = {}) {
    const setting = new Setting(containerEl)
    if (name.length > 0) { setting.setName(name) }
    if (description.length > 0) { setting.setDesc(description) }

		setting.addText(textElement => {
			if (placeholder.length > 0) { textElement.setPlaceholder(placeholder) }
			textElement.setValue(this.plugin.settings[key])
			textElement.onChange(async val=>{
				this.plugin.settings[key] = val
				await this.plugin.saveSettings()
        if (onChange) {
          onChange(val)
        }
			})
		})
  }

  addToggleInputSetting({
    containerEl = undefined,
    name = ``,
    description = ``,
    key = ``,
    onChange = (val : boolean, toggle : ToggleComponent, setting : Setting)=>{},
  } = {}) {
    const setting = new Setting(containerEl)
    if (name.length > 0) { setting.setName(name) }
    if (description.length > 0) { setting.setDesc(description) }

		setting.addToggle(toggle=>{
			toggle.setValue(this.plugin.settings[key])
			toggle.onChange(async val=>{
				this.plugin.settings[key] = val
				await this.plugin.saveSettings()
        if (onChange) {
          onChange(val, toggle, setting)
        }
			})
		})
  }






  /*
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
  */
}
