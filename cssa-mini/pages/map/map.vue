<template>
	<view>
		<map 
			class="map"
			:latitude="location.latitude"
			:longitude="location.longtitude"
		>
			
		</map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				location:{}
			}
		},
		onLoad(options) {
			this.location = JSON.parse(decodeURIComponent(options.location));
		},
		methods: {
			
		}
	}
</script>

<style>
	.map {
		height: 100vh;
		width: 100vw;
	}
</style>
