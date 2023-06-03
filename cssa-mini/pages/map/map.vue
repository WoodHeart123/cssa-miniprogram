<template>
	<view>
		<map 
			class="map"
			latitude=12
			longitude=13
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
		/*
		onLoad(options) {
			this.location = JSON.parse(decodeURIComponent(options.location));
		},
		*/
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
