<script setup lang="ts">
import { useReward } from "vue-rewards";
import { onMounted, computed } from "vue";
import { useBoardStore } from "@/stores/board";
defineProps({
	heading: { type: String, required: false, default: "Wordle Alert" },
});

const boardStore = useBoardStore();
const winTheGame = computed(() => boardStore.winTheGame);

defineEmits<{
	(e: "closeModal"): void;
}>();

const config = {
	startVelocity: 10,
	spread: 180,
	elementCount: 200,
	position: "absolute ",
};

const { reward: fullPageReward, isAnimating: isFullPageAnimating } = useReward(
	"wordle-modal",
	"confetti",
	config
);
onMounted(() => {
	if (winTheGame.value) {
		fullPageReward();
	}
});
</script>

<template>
	<!-- Main modal -->
	<div
		id="defaultModal"
		@click.self="$emit('closeModal')"
		tabindex="-1"
		class="fixed bg-black bg-opacity-50 top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen max-h-full flex items-center justify-center"
	>
		<div class="relative w-full max-w-2xl max-h-full" id="wordle-modal">
			<!-- Modal content -->
			<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
				<!-- Modal header -->
				<div
					class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
				>
					<h3 class="text-xl font-semibold text-gray-900 dark:text-white">
						{{ heading }}
					</h3>
					<button
						type="button"
						class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
						data-modal-hide="defaultModal"
					>
						<svg
							class="w-3 h-3"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 14 14"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
							/>
						</svg>
						<span class="sr-only">Close modal</span>
					</button>
				</div>
				<!-- Modal body -->
				<div class="p-6 space-y-6 dark:text-white font-semibold">
					<slot name="content" />
				</div>
				<!-- Modal footer -->
				<div
					class="flex items-center justify-end p-3 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
				>
					<button
						data-modal-hide="defaultModal"
						@click="$emit('closeModal')"
						type="button"
						class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Ok, I got it
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
