<template>
	<div>
		Add location:
		<input type="text" placeholder="11" @keyup.enter="getLocation" />
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
				this.$emit("getLocation", event.target.value);
				console.log(event.target.value);
			},
		},
	};
</script>

<style>
</style>