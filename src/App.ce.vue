
<template>
	<div class="container">
		ss
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
		1
	</div>
</template>
<script >
	import TheWidget from "./components/TheWidget.vue";
	import TheSettings from "./components/TheSettings.vue";
	import axios from "axios";

	export default {
		name: "App",

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
		mounted() {
			this.$nextTick(function () {
				console.log("try");
				try {
					console.log("try");
					this.list = JSON.parse(localStorage.getItem("apiData"));
					if (this.list == null || this.list.length == 0) {
						throw "no list";
					}
				} catch (e) {
					console.log("catch");
					const success = (position) => {
						const latitude = position.coords.latitude;
						const longitude = position.coords.longitude;
						this.getByPointsWeather(latitude, longitude);
					};

					const error = (err) => {
						console.log(error);
					};

					// This will open permission popup
					navigator.geolocation.getCurrentPosition(success, error);

					console.log(e);
				}
			});
		},
		methods: {
			async getWeather(location) {
				console.log(location);
				// bac0994b0aba261ed63bc5edfb7a3296
				let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=bac0994b0aba261ed63bc5edfb7a3296`;
				console.log(url);
				await axios.get(url).then((response) => {
					console.log(response.data);
					this.addEl(response.data);
				});
				localStorage.setItem("apiData", JSON.stringify(this.list));
			},
			async getByPointsWeather(lat, lon) {
				console.log(lat, lon);
				// bac0994b0aba261ed63bc5edfb7a3296
				let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bac0994b0aba261ed63bc5edfb7a3296`;
				console.log(url);
				await axios.get(url).then((response) => {
					console.log(this.list, response.data);
					// if (!this.list) {
					// 	this.list = [];
					// }
					this.list.push(response.data);
				});
				localStorage.setItem("apiData", JSON.stringify(this.list));
			},
			change() {
				this.isSettingsOpen = !this.isSettingsOpen;
				console.log(this.isSettingsOpen);
			},
			deleteEl(id) {
				this.list = this.list.filter((item) => item.id != id);
				localStorage.setItem("apiData", JSON.stringify(this.list));
			},
			addEl(el) {
				const found = this.list.some((item) => item.id == el.id);
				if (!found) this.list.push(el);
			},
			rearrange(list) {
				this.list = list;
				localStorage.setItem("apiData", JSON.stringify(this.list));
			},
		},
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
