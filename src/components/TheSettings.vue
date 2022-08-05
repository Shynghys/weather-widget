<template>
	<div class="settings">
		settings
		<div v-for="(item, index) in list" :key="index">
			<div class="item">{{ item.name }}, {{ item.sys.country }}</div>
			<!-- <the-widget :item="item" /> -->
		</div>
	</div>
</template>

<script>
	export default {
		name: "the-setting",
		data() {
			return {};
		},
		props: {
			list: {
				type: Array,
				default: () => [],
			},
		},
	};
</script>

<style>
	.settings {
		position: absolute;
		z-index: 99;
		width: 300px;
		top: 0;
		background: rgb(226, 223, 223);
		height: 100%;
	}
</style>