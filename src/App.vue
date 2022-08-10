
<template>
	<div class="container">
		<img
			class="widget__gear-icon"
			:src="isSettingsOpen ? '/cross.png' : '/gear.svg'"
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
<script setup>
	import { ref, reactive, watch, nextTick, onMounted } from "vue";
	import TheWidget from "./components/TheWidget.vue";
	import TheSettings from "./components/TheSettings.vue";
	import axios from "axios";

	const list = ref([]);
	const isSettingsOpen = ref(false);

	onMounted(() => {
		nextTick(function () {
			console.log(
				"try",
				list.value == null,
				list.value.length == 0,
				list.value
			);
			try {
				console.log("try");
				// Object.assign(
				// 	list.value,
				// 	JSON.parse(localStorage.getItem("apiData"))
				// );
				list.value = JSON.parse(localStorage.getItem("apiData"));
				if (list.value.length == 0 || list.value == null) {
					console.log("thorw");
					throw "no list.value";
				}
				console.log("try1", list.value);
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
		localStorage.setItem("apiData", JSON.stringify(list.value));
	}
	async function getByPointsWeather(lat, lon) {
		console.log(lat, lon);
		// bac0994b0aba261ed63bc5edfb7a3296
		let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bac0994b0aba261ed63bc5edfb7a3296`;
		console.log(url);
		await axios.get(url).then((response) => {
			console.log(list.value, response.data);
			// if (!list.value) {
			// 	list.value = [];
			// }
			list.value.push(response.data);
		});
		localStorage.setItem("apiData", JSON.stringify(list.value));
	}
	function change() {
		isSettingsOpen.value = !isSettingsOpen.value;
		console.log(isSettingsOpen.value);
	}
	function deleteEl(id) {
		list.value = list.value.filter((item) => item.id != id);
		localStorage.setItem("apiData", JSON.stringify(list.value));
	}
	function addEl(el) {
		const found = list.value.some((item) => item.id == el.id);
		if (!found) list.value.push(el);
	}
	function rearrange(list1) {
		list.value = list1;
		localStorage.setItem("apiData", JSON.stringify(this.list));
	}
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
