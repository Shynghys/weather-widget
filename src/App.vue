
<template>
	<div class="container">
		<img
			class="widget__gear-icon"
			src="public/gear.svg"
			alt=""
			@click="change"
		/>
		<the-settings v-if="isSettingsOpen" :list="list" />
		<div v-for="(item, index) in list" :key="index">
			<the-widget :item="item" />
		</div>

		<the-input @getLocation="getWeather" />
	</div>
</template>
<script >
	import TheInput from "./components/TheInput.vue";
	import TheWidget from "./components/TheWidget.vue";
	import TheSettings from "./components/TheSettings.vue";
	export default {
		name: "App",

		components: {
			TheInput,
			TheWidget,
			TheSettings,
		},
		data() {
			return {
				list: [],
				isSettingsOpen: false,
				//
			};
		},
		mounted() {
			try {
				this.list = JSON.parse(localStorage.getItem("apiData"));
				if (this.list.length == 0) {
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
				}
			} catch (e) {
				console.log(e);
			}
		},
		methods: {
			async getWeather(location) {
				console.log(location);
				// bac0994b0aba261ed63bc5edfb7a3296
				let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=bac0994b0aba261ed63bc5edfb7a3296`;
				console.log(url);
				await this.axios.get(url).then((response) => {
					console.log(response.data);
					this.list.push(response.data);
				});
				localStorage.setItem("apiData", JSON.stringify(this.list));
			},
			async getByPointsWeather(lat, lon) {
				// bac0994b0aba261ed63bc5edfb7a3296
				let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bac0994b0aba261ed63bc5edfb7a3296`;
				console.log(url);
				await this.axios.get(url).then((response) => {
					console.log(response.data);
					this.list.push(response.data);
				});
				localStorage.setItem("apiData", JSON.stringify(this.list));
			},
			change() {
				this.isSettingsOpen = !this.isSettingsOpen;
				console.log(this.isSettingsOpen);
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
