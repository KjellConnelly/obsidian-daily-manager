import ObsidianDevShortcuts from './ObsidianDevShortcuts'

export default class DailyManagerHelper {
  constructor(plugin) {
    this.plugin = plugin
    this.loadDailyManagerData()
  }

  async loadDailyManagerData() {
    const {todayDecalOn, decalText, jsonDirectory} = this.plugin.settings
    let jsonFileLocation = jsonDirectory || "daily-manager-json"
    while (jsonFileLocation.endsWith('/')) {
      jsonFileLocation = jsonFileLocation.replace(/\/$/, '')
    }

    const {shortcuts} = this.plugin
    return new Promise(async (resolve, reject)=>{
      try {
        await shortcuts.setTextAtPath({path:jsonFileLocation,type:'folder',pathFromConfigFile:false})
        const filePath = `${jsonFileLocation}/test.json`
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
