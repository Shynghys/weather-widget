<template>
	<div class="input">
		<div>Add location:</div>
		<div class="input__block">
			<input
				type="text"
				placeholder="For example Almaty.."
				@keyup.enter="getLocation"
				class="input__area"
			/>
			<img src="/enter.png" alt="" class="settings__icons" />
		</div>
	</div>
</template>

<script setup>
	import { ref, defineEmits, computed } from "vue";
	const rules = ref([
		(value) => !!value || "Required.",
		(value) => (value && value.length >= 3) || "Min 3 characters",
	]);
	const emit = defineEmits(["getFromInputLocation"]);
	function getLocation(event) {
		emit("getFromInputLocation", event.target.value);
		console.log(event.target.value);
	}
</script>

<style>
	.input {
		padding-top: 20px;
		/* padding: 10px; */
		gap: 20px;
	}
	.input__area {
		margin-top: 10px;
		width: 100%;
		padding: 7px;
	}
	.input__block {
		display: flex;
		align-items: center;
	}
</style>