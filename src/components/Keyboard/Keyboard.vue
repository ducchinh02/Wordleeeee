<script setup lang="ts">
import { computed } from "vue";
import { useBoardStore } from "@/stores/board";
import { words } from "@/words.json";

const boardStore = useBoardStore();
const board = computed(() => boardStore.board);
const position = computed(() => boardStore.position);
const currentRow = computed(() => Math.floor(position.value / 5));
const boardRow = computed(() => boardStore.row);
const correctWord = computed(() => boardStore.correctWord);

const rows: string[] = [
	"q w e r t y u i o p",
	"a s d f g h j k l",
	"z x c v b n m",
];

const userWord = computed(() => {
	return Array.from({ length: 5 }, (_i, index) => index + 1)
		.reverse()
		.map((i) => board.value[position.value - i])
		.join("");
});

const chooseLetter = (letter: string): void => {
	if (currentRow.value > boardRow.value) return;
	if (position.value < board.value.length) {
		board.value[position.value] = letter;
		boardStore.position += 1;
	}
};
const removeLetter = (): void => {
	if (Math.floor(position.value - 1) / 5 < boardRow.value) return;
	if (position.value > 0) {
		board.value[position.value - 1] = "";
		boardStore.position -= 1;
	}
};

const clickEnter = (): void => {
	if (position.value % 5 !== 0 || position.value <= 0) {
		return;
	}
	if (!words.includes(userWord.value)) {
		boardStore.modalContent = "Invalid word!!";
		boardStore.showModal = true;
		return;
	}
	if (words.includes(userWord.value)) {
		boardStore.increaseRow();
	}
	if (correctWord.value === userWord.value) {
		boardStore.modalContent =
			'You win. Correct word is "' + correctWord.value + '"';
		boardStore.showModal = true;
		boardStore.winTheGame = true;
		return;
	}
	if (position.value === board.value.length && words.includes(userWord.value)) {
		boardStore.$patch({
			modalContent: 'Correct word is "' + correctWord.value + '"',
			showModal: true,
			endGame: true,
		});
	}
};
</script>

<template>
	<div class="keyboard-container">
		<div
			class="row flex items-center justify-center md:gap-3 gap-1 flex-wrap"
			v-for="(row, idx) in rows"
			:key="idx"
			:class="{ 'mt-3': idx > 0 }"
		>
			<div
				v-if="idx === 2"
				@click="removeLetter"
				class="md:px-3 py-1 px-2 cursor-pointer default-transition dark:hover:bg-gray-600 dark:bg-gray-500 flex bg-gray-300 hover:bg-gray-400 rounded-md"
			>
				Back
			</div>
			<div class="letter-row" v-for="letter in row.split(' ')" :key="letter">
				<span
					@click="chooseLetter(letter)"
					class="key-letter md:px-3 py-1 px-2 cursor-pointer default-transition dark:hover:bg-gray-600 rounded-md dark:bg-gray-500 flex bg-gray-300 hover:bg-gray-400"
					>{{ letter.toUpperCase() }}
				</span>
			</div>
			<span
				@click="clickEnter"
				v-if="idx === 2"
				class="letter-row cursor-pointer default-transition dark:hover:bg-gray-600 md:px-3 py-1 px-2 dark:bg-gray-500 flex bg-gray-300 hover:bg-gray-400 rounded-md"
			>
				Enter
			</span>
		</div>
	</div>
</template>
