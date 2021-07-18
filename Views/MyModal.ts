import { App, Modal } from 'obsidian'
import DailyManager from './../main'
import * as chrono from 'chrono-node'
import MyModalContent from './MyModalContent.svelte'

export default class MyModal extends Modal {
	constructor(app: App) {
		super(app)
	}

	parsedDueDate(dateString : string) {
		return chrono.parseDate(dateString)
	}

	onOpen() {
		console.log(this)
		let {contentEl, titleEl} = this
		titleEl.setText('Insert/Edit Todo')
		const content = new MyModalContent({
			target: contentEl,
			props: {
				answer: 42
			}
		})
	}

	onClose() {
		let {contentEl} = this
		contentEl.empty()
	}
}
