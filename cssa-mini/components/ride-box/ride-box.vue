<template>
	<view class="ride-box row-container" @click="toRideDetail">
		<view class="image-box">
			<image mode="widthFix" class="image" :src="this.rideInfo.imageList[0]"/>
		</view>
		<view class="column-container content-box">
			
		</view>
	</view>
</template>

<script>
	import moment from "moment/min/moment-with-locales";
	import 'moment/locale/zh-cn';
	export default {
		name:"ride-box",
		props:["rideInfo"],mounted(){
			
		},
		data() {
			return {
				rideType: ["往返","单程"]
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
