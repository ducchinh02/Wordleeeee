<script setup lang="ts">
import Heading from "@/components/Heading/Heading.vue";
import SwitchMode from "@/components/SwitchMode/SwitchMode.vue";
import Board from "@/components/Board/Board.vue";
import { computed } from "vue";
import { useConfigStore } from "@/stores/configs";
import { useBoardStore } from "@/stores/board";

import WordleModal from "@/components/Modal/WordleModal.vue";

const configStore = useConfigStore();
const boardStore = useBoardStore();
const darkMode = computed(() => configStore.darkMode);
const isShowModal = computed(() => boardStore.showModal);
const modalContent = computed(() => boardStore.modalContent);
const winTheGame = computed(() => boardStore.winTheGame);
const endGame = computed(() => boardStore.endGame);

const resetStore = (): void => {
	boardStore.showModal = false;
	if (winTheGame.value || endGame.value) {
		boardStore.resetStore();
	}
};
</script>

<template>
	<div :class="{ dark: darkMode }">
		<div
			class="min-h-screen default-transition dark:bg-gray-800 dark:text-white py-5 flex flex-col justify-center items-center px-4"
		>
			<div class="flex items-center gap-4 justify-center">
				<Heading tag="h3" class="font-bold text-2xl" text="Wordle Game" />
				<SwitchMode />
			</div>
			<div class="container mx-auto">
				<Board />
			</div>
		</div>
		<WordleModal v-if="isShowModal" @closeModal="resetStore">
			<template #content>{{ modalContent }}</template>
		</WordleModal>
	</div>
</template>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: filter 300ms;
}
.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
