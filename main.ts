import { App, Editor, MarkdownView, Plugin } from 'obsidian';
import * as CodeMirror from "codemirror";

export default class switchLayout extends Plugin {
	async onload() {
		this.addCommand({
			id: 'switch-layout',
			name: 'Switch Layout',
			callback: () => this.change()
		});
	}

	change(): void {
		let editor = this.getEditor();
		if (editor) {
			let selectedText = editor.getSelection();
			let switchedText = this.switchLayout(selectedText);
			editor.replaceSelection(switchedText);
		}
	}

	getEditor(): CodeMirror.Editor {
		return this.app.workspace.getActiveViewOfType(MarkdownView)?.sourceMode.cmEditor;
	}

	// Функция для замены раскладки
	switchLayout(text: string): string {
		// Маппинг символов между раскладками
		const layoutMap: { [key: string]: string } = {
			'q': 'й', 'w': 'ц', 'e': 'у', 'r': 'к', 't': 'е', 'y': 'н', 'u': 'г', 'i': 'ш', 'o': 'щ', 'p': 'з',
			'a': 'ф', 's': 'ы', 'd': 'в', 'f': 'а', 'g': 'п', 'h': 'р', 'j': 'о', 'k': 'л', 'l': 'д',
			'z': 'я', 'x': 'ч', 'c': 'с', 'v': 'м', 'b': 'и', 'n': 'т', 'm': 'ь',

			'й': 'q', 'ц': 'w', 'у': 'e', 'к': 'r', 'е': 't', 'н': 'y', 'г': 'u', 'ш': 'i', 'щ': 'o', 'з': 'p',
			'ф': 'a', 'ы': 's', 'в': 'd', 'а': 'f', 'п': 'g', 'р': 'h', 'о': 'j', 'л': 'k', 'д': 'l',
			'я': 'z', 'ч': 'x', 'с': 'c', 'м': 'v', 'и': 'b', 'т': 'n', 'ь': 'm',

			// Маппинг для заглавных букв
			'Q': 'Й', 'W': 'Ц', 'E': 'У', 'R': 'К', 'T': 'Е', 'Y': 'Н', 'U': 'Г', 'I': 'Ш', 'O': 'Щ', 'P': 'З',
			'A': 'Ф', 'S': 'Ы', 'D': 'В', 'F': 'А', 'G': 'П', 'H': 'Р', 'J': 'О', 'K': 'Л', 'L': 'Д',
			'Z': 'Я', 'X': 'Ч', 'C': 'С', 'V': 'М', 'B': 'И', 'N': 'Т', 'M': 'Ь',

			'Й': 'Q', 'Ц': 'W', 'У': 'E', 'К': 'R', 'Е': 'T', 'Н': 'Y', 'Г': 'U', 'Ш': 'I', 'Щ': 'O', 'З': 'P',
			'Ф': 'A', 'Ы': 'S', 'В': 'D', 'А': 'F', 'П': 'G', 'Р': 'H', 'О': 'J', 'Л': 'K', 'Д': 'L',
			'Я': 'Z', 'Ч': 'X', 'С': 'C', 'М': 'V', 'И': 'B', 'Т': 'N', 'Ь': 'M'
		};

		// Преобразование текста
		let switchedText = '';
		for (let char of text) {
			switchedText += layoutMap[char] || char; // Если символ есть в маппинге, заменить, иначе оставить как есть
		}

		return switchedText;
	}
}
