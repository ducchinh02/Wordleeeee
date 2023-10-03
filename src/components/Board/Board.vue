<script setup lang="ts">
import Keyboard from "@/components/Keyboard/Keyboard.vue";
import { computed } from "vue";
import { useBoardStore } from "@/stores/board";

const boardStore = useBoardStore();
const board = computed(() => boardStore.board);
const boardRow = computed(() => boardStore.row);
const correctWord = computed(() => boardStore.correctWord);
</script>

<template>
	<div class="board-container">
		<div class="board grid gap-3 grid-cols-5 w-64 mx-auto mt-5 mb-7">
			<template v-for="(square, idx) in board" :key="idx">
				<span
					:class="{
						'bg-gray-300 dark:bg-gray-600':
							Math.floor(idx / 5) < boardRow &&
							square &&
							!correctWord.includes(square),
						'bg-blue-500 text-white':
							Math.floor(idx / 5) < boardRow &&
							square &&
							correctWord.includes(square),
					}"
					class="flex items-center justify-center border aspect-square border-blue-500 shadow-md shadow-blue-300 font-semibold"
					>{{ square.toUpperCase() }}</span
				>
			</template>
		</div>
		<Keyboard />
	</div>
</template>
