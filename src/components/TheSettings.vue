<template>
	<div class="settings">
		<div class="settings__title">Settings</div>

		<draggable
			v-model="computedlist"
			group="people"
			@start="drag = true"
			@end="drag = false"
			item-key="id"
		>
			<template #item="{ element }">
				<div class="settings__item">
					<img src="/menu.png" alt="" class="settings__icons" />
					<div class="item">
						{{ element.name }}, {{ element.sys.country }}
					</div>

					<img
						src="/garbage.png"
						alt=""
						class="settings__icons"
						@click="deleteEl(element.id)"
					/>
				</div>
			</template>
		</draggable>

		<the-input @getFromInputLocation="getFromSettingsLocation" />
	</div>
</template>

<script setup>
	import { ref, defineEmits, computed, watch } from "vue";
	import TheInput from "./TheInput.vue";
	import draggable from "vuedraggable";

	const props = defineProps({
		list: Array,
	});
	const { list } = props;
	const drag = ref(false);
	const emit = defineEmits(["rearrange"]);

	const computedlist = computed({
		get() {
			return list;
		},
		set(val) {
			emit("rearrange", val);
		},
	});

	function getFromSettingsLocation(loc) {
		emit("getFromSettingsLocation", loc);
		console.log(loc);
	}
	function deleteEl(id) {
		emit("deleteEl", id);
	}
</script>

<style>
	.settings {
		padding: 10px;
		position: absolute;
		z-index: 99;
		width: 300px;
		top: 0;
		background: rgb(250, 243, 243);
		height: 100%;
		/* gap: 20px; */
	}
	.settings__title {
	}
	.settings__item {
		margin-top: 20px;
		padding: 10px;
		background: rgb(223, 214, 214);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.settings__icons {
		width: 25px;
		height: auto;
	}
</style>