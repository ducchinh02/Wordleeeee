import { defineStore } from "pinia";
import { words } from "@/words.json";

interface State {
	board: string[];
	position: number;
	row: number;
	correctWord: string;
	showModal: boolean;
	modalContent: string;
	winTheGame: boolean;
	endGame: boolean;
}

export const useBoardStore = defineStore("board", {
	state: (): State => ({
		// prettier-ignore
		board:
    ["", "", "", "", "",
    "", "", "", "", "",
    "", "", "", "", "",
    "", "", "", "", "",
    "", "", "", "", "",
    "", "", "", "", ""],
		position: 0,
		row: 0,
		correctWord: words[Math.floor(Math.random() * words.length)],
		showModal: false,
		modalContent: "",
		winTheGame: false,
		endGame: false,
	}),
	getters: {},
	actions: {
		increaseRow() {
			this.row += 1;
		},
		decreaseRow() {
			this.row -= 1;
		},
		resetStore() {
			this.board = [...Array.from({ length: this.board.length }, (_, i) => "")];
			this.position = 0;
			this.row = 0;
			this.correctWord = words[Math.floor(Math.random() * words.length)];
			this.modalContent = "";
			this.winTheGame = false;
			this.endGame = false;
		},
	},
	// persist: true,
});
