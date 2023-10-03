<script setup>
import { computed, ref } from "vue";
import { useConfigStore } from "@/stores/configs";

const configStore = useConfigStore();

const darkMode = computed(() => configStore.darkMode);
</script>

<template>
	<nav
		class="bg-white border-b border-gray-300 dark:border-gray-600 dark:bg-gray-900 default-transition"
	>
		<div
			class="container px-4 flex items-center justify-between mx-auto py-0 md:py-4"
		>
			<!-- <img src="@/assets/logo.svg" class="w-14" alt="Happy Chat Logo" /> -->
			<span class="self-center text-2xl font-semibold whitespace-nowrap"
				>Wordle</span
			>
			<div class="" id="navbar-default">
				<ul
					class="font-medium flex items-center flex-col p-4 md:p-0 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0"
				>
					<label class="relative inline-flex items-center cursor-pointer">
						<input
							@change="configStore.toggleDarkMode"
							type="checkbox"
							value=""
							class="sr-only peer"
							:checked="darkMode"
						/>
						<div
							class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 relative after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
						></div>
					</label>
				</ul>
			</div>
		</div>
	</nav>
</template>

<style lang=""></style>
