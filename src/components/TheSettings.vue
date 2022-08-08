<template>
	<div class="settings">
		123
		<div class="settings__title">Settings</div>

		<!-- <div v-for="item in list" :key="item.id" class="settings__item">
			<img src="/menu.png" alt="" class="settings__icons" />
			<div class="item">{{ item.name }}, {{ item.sys.country }}</div>

			<img
				src="/garbage.png"
				alt=""
				class="settings__icons"
				@click="deleteEl(item.id)"
			/>

		</div> -->
		<draggable
			v-model="list"
			group="people"
			@start="drag = true"
			@end="drag = false"
			item-key="id"
		>
			<template #item="{ element }">
				<div class="settings__item">
					<img src="/menu.png" alt="" class="settings__icons" />
					<div class="item">
						{{ element.name }}, {{ element?.sys?.country }}
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

<script>
	import TheInput from "./TheInput.vue";
	import draggable from "vuedraggable";
	export default {
		name: "the-setting",
		components: {
			TheInput,
			draggable,
		},
		data() {
			return { drag: false };
		},
		props: {
			list: {
				type: Array,
				default: () => [],
			},
		},
		methods: {
			getFromSettingsLocation(loc) {
				this.$emit("getFromSettingsLocation", loc);
				console.log(loc);
			},
			deleteEl(id) {
				this.$emit("deleteEl", id);
			},
		},
		computed: {
			list: {
				get() {
					return this.list;
				},
				set(value) {
					this.$emit("rearrange", value);
				},
			},
		},
	};
</script>

<style>
	.settings {
		padding: 10px;
		position: absolute;
		z-index: 99;
		width: 300px;
		top: 0;
		background: rgb(248, 245, 245);
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