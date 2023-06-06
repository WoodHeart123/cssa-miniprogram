<template>
	<view class="ride-box row-container" @click="toRideDetail">
		<view class="image-box">
			<image mode="widthFix" class="image" :src="this.rideInfo.imageList[0]"/>
		</view>
		
		<view class="column-container content-box">
			<view class="row-container title-box">
				<view class="ride-title">{{rideTrip}}</view>
			</view>
			<view class="time-box">{{rideTime}}</view>
			<view class="price-box">${{this.rideInfo.price}}</view>
			<view class="description-box">{{this.rideInfo.description}}</view>		
		</view>
		
	</view>
</template>

<script>
	import moment from "moment/min/moment-with-locales";
	import 'moment/locale/zh-cn';
	export default {
		name:"ride-box",
		props:["rideInfo"],
		mounted(){
			
		},
		data() {
			return {
			}
		},
		methods:{
			toRideDetail:function(){
				uni.navigateTo({
					url:"/pages/detail/rideDetail?rideInfo=" + encodeURIComponent(JSON.stringify(this.rideInfo)),
				})
			}
		},
		computed:{
			rideTrip(){
				return "从 " + this.rideInfo.orign + " 至 " + this.rideInfo.destination
			},
			rideTime(){
				return moment(this.rentalInfo.dateAndTime).format()
			}
		}
	}
</script>

<style>

</style>
