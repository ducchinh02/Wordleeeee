<script setup lang="ts">
defineProps({
	tag: { type: String, required: false, default: "p" },
	text: { type: String, required: false, default: "" },
});
</script>

<template>
	<div class="wordle-heading">
		<component :is="tag">{{ text }}</component>
	</div>
</template>

<style lang=""></style>
