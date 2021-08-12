import ObsidianDevShortcuts from './ObsidianDevShortcuts'

export default class DailyManagerHelper {
  constructor(plugin) {
    this.plugin = plugin
    this.loadDailyManagerData()
    console.log(window)
    console.log(window.Capacitor)
  }

  async loadDailyManagerData() {
    const {todayDecalOn, decalText, jsonDirectory} = this.plugin.settings
    let jsonFileLocation = jsonDirectory || ".obsidian/.daily-manager"
    while (jsonFileLocation.endsWith('/')) {
      jsonFileLocation = jsonFileLocation.replace(/\/$/, '')
    }

    const {shortcuts} = this.plugin
    return new Promise(async (resolve, reject)=>{
      try {
        const filePath = `${jsonFileLocation}/test.json`
        await shortcuts.setTextAtPath({path:jsonFileLocation,type:'folder',pathFromConfigFile:false})
        const file = await shortcuts.setTextAtPath({path:filePath,type:'file',pathFromConfigFile:false,text:'# HELLO7!',defaultText:"{}"})
        resolve()
      } catch(err) {
        console.log(err)
        reject()
      }
    })
    /*
    const {workspace, vault, metadataCache, fileManager} = this.plugin.app
    */

  }
}
