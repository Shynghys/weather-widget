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

<script>
	export default {
		name: "the-input",
		data() {
			return {
				rules: [
					(value) => !!value || "Required.",
					(value) => (value && value.length >= 3) || "Min 3 characters",
				],
			};
		},
		methods: {
			getLocation(event) {
				this.$emit("getFromInputLocation", event.target.value);
				console.log(event.target.value);
			},
		},
	};
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