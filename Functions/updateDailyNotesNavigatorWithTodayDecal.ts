import getDailyNoteSettings from './getDailyNoteSettings'

function updateDailyNotesNavigatorWithTodayDecal(plugin) {
	const {decalText, todayDecalOn} = plugin.settings
	let newText = todayDecalOn ? (decalText.length > 0 ? decalText : "*") :  ""
	let logString = ''

	const dailyNoteSettings = getDailyNoteSettings()
	const navFolders = document.getElementsByClassName("nav-folder")


/*
	/////// testing
	const {workspace, vault, metadataCache, fileManager} = plugin.app

	// gets all markdown files as [TFile] objects
	const mdFiles = vault.getMarkdownFiles()

	// finds config file
	const {configDir} = vault

	// useful for checking workspace leaves
	workspace.iterateAllLeaves(leaf=>{
		if (leaf.getDisplayText().toLowerCase() == 'file explorer') {
			console.log(leaf.view.containerEl)
		}
	})

	// Useful for iterating through metadata for sections/heading
	mdFiles.forEach(file=>{
		console.log(metadataCache.getFileCache(file))
	})

	////////
*/

	let dailyNotesFolder = undefined
	for (let i = 0; i < navFolders.length; i++) {
		const folder = navFolders[i]
		const folderTitleNode = folder.children[0]
		if (folderTitleNode.innerText.trim() == dailyNoteSettings.folder) {
			dailyNotesFolder = folder
		} else {
			//logString += logString.length == 0 ? '(' : ""
			//logString += `${folderTitleNode.innerText.trim()} != ${dailyNoteSettings.folder},\n`
		}
	}
	//logString += ") "

	if (dailyNotesFolder != undefined) {
		const folderChildrenNodes = dailyNotesFolder.children[1].children
		const todayFormatted = moment(new Date()).format(dailyNoteSettings.format)
		const newHTML = `<span style="color:rgb(210,60,90);margin-left:-10px;position:absolute;" id="obsidian-daily-manager-navigator-decal"> ${newText} </span>`

		for (let i = 0; i < folderChildrenNodes.length; i++) {
			if (folderChildrenNodes[i].children.length > 0) {
				const file = folderChildrenNodes[i].children[0]

				if (file.children.length == 1) {
					if (file.children[0].innerText == todayFormatted) {
						// Adds HTML element
						//console.log("add")
						file.insertAdjacentHTML('afterbegin', newHTML)
					}
				} else {
					if (file.children[1].innerText == todayFormatted) {
						if (file.children[0].id == "obsidian-daily-manager-navigator-decal") {
							// Removes old element, adds new one (might be updated, might not be)
							file.removeChild(file.children[0])
							file.insertAdjacentHTML('afterbegin', newHTML)
							//console.log("edit")
						}
					} else {
						if (file.children[0].id == "obsidian-daily-manager-navigator-decal") {
							// Removes old element, usually because day changed.
							file.removeChild(file.children[0])
							//console.log("delete")
						}
					}
				}
			}
		}
	} else {
		console.log(`Unable to find daily notes folder: Make sure your Daily Notes plugin has the exact same name as one of your folders and it is on the top level of the vault.`)
		//console.log(logString)
		//console.log(JSON.stringify(dailyNoteSettings))
	}
}

export default updateDailyNotesNavigatorWithTodayDecal
