import getDailyNoteSettings from './getDailyNoteSettings'

function updateDailyNotesNavigatorWithTodayDecal(newText = " * ") {
	let logString = ''

	const dailyNoteSettings = getDailyNoteSettings()
	const navFolders = document.getElementsByClassName("nav-folder")

	let dailyNotesFolder = undefined
	for (let i = 0; i < navFolders.length; i++) {
		const folder = navFolders[i]
		const folderTitleNode = folder.children[0]
		if (folderTitleNode.innerText == dailyNoteSettings.folder) {
			dailyNotesFolder = folder
		} else {
			logString += logString.length == 0 ? '(' : ""
			logString += folderTitleNode.innerText + ", "
		}
	}
	logString+= ") " + (dailyNotesFolder == undefined ? "" : JSON.stringify(dailyNoteSettings,null,2))

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
						console.log("add")
						file.insertAdjacentHTML('afterbegin', newHTML)
					}
				} else {
					if (file.children[1].innerText == todayFormatted) {
						if (file.children[0].id == "obsidian-daily-manager-navigator-decal") {
							// Removes old element, adds new one (might be updated, might not be)
							file.removeChild(file.children[0])
							file.insertAdjacentHTML('afterbegin', newHTML)
							console.log("edit")
						}
					} else {
						if (file.children[0].id == "obsidian-daily-manager-navigator-decal") {
							// Removes old element, usually because day changed.
							file.removeChild(file.children[0])
							console.log("delete")
						}
					}
				}
			}
		}
	} else {
		console.log(`Unable to find daily notes folder: Looked for ${logString}`)
	}
}

export default updateDailyNotesNavigatorWithTodayDecal
