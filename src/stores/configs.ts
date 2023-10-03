import { defineStore } from "pinia";

interface State {
	darkMode: Boolean | String;
}

export const useConfigStore = defineStore("config", {
	state: (): State => ({
		darkMode:
			JSON.parse(localStorage.getItem("wordle-dark-mode") || false) || false,
	}),
	getters: {},
	actions: {
		toggleDarkMode() {
			this.darkMode = !this.darkMode;
			localStorage.setItem("wordle-dark-mode", JSON.stringify(this.darkMode));
		},
	},
	// persist: true,
});
