<template>
	<div class="widget" v-if="item">
		<div class="widget__city">{{ item.name }}, {{ item.sys.country }}</div>

		<div class="widget__temp">
			<img
				:src="
					'http://openweathermap.org/img/wn/' +
					item.weather[0].icon +
					'@2x.png'
				"
				alt=""
			/>

			{{ Math.round(item.main.temp - 273) }}°C
		</div>
		<div class="widget__weather">
			Feels like {{ Math.round(item.main.feels_like - 273) }}°C,
			{{ item.weather[0]?.description }}
		</div>
		<!-- <div class="widget__desc">{{ item.weather[0]?.description }}</div> -->
		<div class="widget__desc">
			<img
				class="widget__gps-icon"
				src="/gps-arrow.png"
				alt=""
				:style="{ transform: 'rotate(' + item.wind.deg - 30 + 'deg)' }"
			/>
			{{ item.wind.speed }}.0 m/s SSE
		</div>
		<div class="widget__desc">
			visibility: {{ item.visibility / 1000 }}.0 km
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		item: Object,
	});
	let { item } = props;
	console.log(item);
</script>

<style scoped>
	.widget {
		position: relative;
		padding: 20px;
		display: flex;
		gap: 10px;
		flex-direction: column;
		margin-bottom: 20px;
		background: rgb(234, 241, 241);
		width: 300px;
	}
	.widget__city {
		font-size: 18px;
		line-height: 18px;
	}
	.widget__temp {
		width: 100%;
		/* display: grid;
																																																									place-items: center flex-start;
																																																									grid-template: auto/auto auto; */
		display: flex;
		align-items: center;
		font-size: 28px;
		line-height: 28px;
		font-weight: 600;
	}
	.widget__gps-icon {
		width: 20px;
	}
</style>