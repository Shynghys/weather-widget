
<template>
	<div class="container">
		<img
			class="widget__gear-icon"
			:src="isSettingsOpen ? 'cross.png' : '/gear.svg'"
			alt=""
			@click="change"
		/>
		<the-settings
			v-if="isSettingsOpen"
			:list="list"
			@getFromSettingsLocation="getWeather"
			@deleteEl="deleteEl"
			@rearrange="rearrange"
		/>
		<div v-for="item in list" :key="item.id">
			<the-widget :item="item" />
		</div>
	</div>
</template>
<script >
	import { ref, reactive, watch, nextTick, onMounted } from "vue";
	import TheWidget from "./components/TheWidget.vue";
	import TheSettings from "./components/TheSettings.vue";
	import axios from "axios";
	export default {
		name: "App",
		setup() {
			const list = reactive([]);
			const isSettingsOpen = ref(false);

			onMounted(() => {
				nextTick(function () {
					console.log("try", list == null, list.length == 0, list);
					try {
						console.log("try");
						list = JSON.parse(localStorage.getItem("apiData"));

						if (list == null || list.length == 0) {
							console.log("thorw");
							throw "no list";
						}
						console.log("try1");
					} catch (e) {
						console.log("catch");
						const success = (position) => {
							const latitude = position.coords.latitude;
							const longitude = position.coords.longitude;
							getByPointsWeather(latitude, longitude);
						};

						const error = (err) => {
							console.log(error);
						};

						// This will open permission popup
						navigator.geolocation.getCurrentPosition(success, error);

						console.log(e);
					}
				});
			});

			async function getWeather(location) {
				console.log(location);
				// bac0994b0aba261ed63bc5edfb7a3296
				let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=bac0994b0aba261ed63bc5edfb7a3296`;
				console.log(url);
				await axios.get(url).then((response) => {
					// console.log(response.data);
					addEl(response.data);
				});
				localStorage.setItem("apiData", JSON.stringify(list));
			}
			async function getByPointsWeather(lat, lon) {
				console.log(lat, lon);
				// bac0994b0aba261ed63bc5edfb7a3296
				let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bac0994b0aba261ed63bc5edfb7a3296`;
				console.log(url);
				await axios.get(url).then((response) => {
					console.log(list, response.data);
					// if (!list) {
					// 	list = [];
					// }
					list.push(response.data);
				});
				localStorage.setItem("apiData", JSON.stringify(list));
			}
			function change() {
				isSettingsOpen = !isSettingsOpen;
				console.log(isSettingsOpen);
			}
			function deleteEl(id) {
				list = list.filter((item) => item.id != id);
				localStorage.setItem("apiData", JSON.stringify(list));
			}
			function addEl(el) {
				const found = list.some((item) => item.id == el.id);
				if (!found) list.push(el);
			}
			function rearrange(list) {
				list = list;
				localStorage.setItem("apiData", JSON.stringify(this.list));
			}
			return {
				isSettingsOpen,
				list,
				rearrange,
				addEl,
				change,
				deleteEl,
				getByPointsWeather,
				getWeather,
			};
		},
		components: {
			TheWidget,
			TheSettings,
		},
		data() {
			return {
				list: [],
				isSettingsOpen: false,
			};
		},

		methods: {},
	};
</script>


<style >
	@import url("https://fonts.googleapis.com/css2?family=Bitter:wght@300;500;600&display=swap");
	html {
		box-sizing: border-box;
		font-family: "Bitter", serif;
	}
	*,
	*:before,
	*:after {
		box-sizing: border-box;
		margin: 0;
	}
	.container {
		position: relative;
		width: 300px;
		margin: 0 auto;
	}
	.widget__gear-icon {
		z-index: 200;
		position: absolute;
		top: 10px;
		right: 15px;
		width: 25px;
		background: transparent;
	}
</style>
