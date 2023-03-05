<template>
	<view class="rental-box row-container" @click="toRentalDetail">
		<view class="image-box">
			<image mode="widthFix" class="image" :src="this.rentalInfo.images[0]"/>
		</view>
		<view class="column-container content-box">
			<view class="row-container title-box">
				<view class="row-container tag sex">{{sexContraintValue[this.rentalInfo.sexConstraint]}}</view>
				<view class="row-container tag floorplan">{{this.rentalInfo.floorPlan}}</view>
				<view class="rental-title">{{this.rentalInfo.location}}</view>
			</view>
			<view class="time-box">{{rentalTime}}</view>
			<view class="price-box">${{this.rentalInfo.price}}</view>
			<view class="description-box">{{this.rentalInfo.description}}</view>
			<view class="publish-time-box">{{this.rentalPublishTime}}</view>
		</view>
	</view>
</template>

<script>
	import moment from "moment/min/moment-with-locales";
	import 'moment/locale/zh-cn';
	export default {
		name:"rental-box",
		props:["rentalInfo"],
		mounted(){
			if(moment().year() - moment.utc(this.rentalInfo.UTCPublishedTime).year() > 0){
				this.rentalPublishTime = moment.utc(this.rentalInfo.UTCPublishedTime).format("YYYY-MM-DD");
			}else if(Date.now() - moment.utc(this.rentalInfo.UTCPublishedTime).valueOf() > 86400000 * 7){
				this.rentalPublishTime = moment.utc(this.rentalInfo.UTCPublishedTime).format("MM-DD");
			}else{
				this.rentalPublishTime = moment.utc(this.rentalInfo.UTCPublishedTime).locale('zh-cn').fromNow();
			}
		},
		data() {
			return {
				sexContraintValue:["仅限男生","仅限女生","性别不限"],
				houseInfo: {
					imageList: ["/static/housing.jpg", "/static/housing.jpg", "/static/housing.jpg"],
				},
				rentalPublishTime:""
			};
		},
		methods:{
			toRentalDetail:function(){
				uni.navigateTo({
					url:"/pages/detail/houseDetail?rentalInfo=" + encodeURIComponent(JSON.stringify(this.rentalInfo)),
				})
			}
		},
		computed:{
			rentalTime(){
				return moment(this.rentalInfo.rentalStartTime).format("YYYY-MM-DD") + " 至 " + moment(this.rentalInfo.rentalEndTime).format("YYYY-MM-DD")
			},
		}
	}
</script>

<style>
	.sex{
		width: 60px !important; 
	}
	.floorplan{
		margin-left: 65px;
		
	}
	.column-container{
		display: flex;
		flex-direction: column;
	}
	.row-container {
		display: flex;
		flex-direction: row;
	}
	.rental-box{
		display:flex;
		width: 100%;
		height: 100%;
		background-color: white;
		border-bottom: 1px solid rgba(238, 238, 238, 0.6);
		border-top: 1px solid rgba(238, 238, 238, 0.6);
	}
	.image-box{
		display: flex;
		width: 30%;
		height: 100%;
		background-color: rgba(245, 245, 245, 0.5);
		align-items: center;
		justify-content: center;
		z-index: 10;
		overflow:hidden;
	}
	.content-box{
		width: 68%;
		height: 98%;
		margin: 2% 0 0 2%;
		position: relative;
		justify-content: space-between;
	}
	.image{
		width:95%;
		height:80%;
	}
	.tag{
		position: absolute;
		justify-content: center;
		align-items: center;
		background-color: #9b0000;
		color: white;
		border-radius: 5px;
		font-size: 12px;
		height: 20px;
		width: 40px;
		margin-right: 5px;
	}
	.rental-title {	
		min-height: 20px;
		max-height: 40px;
		font-size: 15px;
		font-weight: 600;
		line-height: 20px;
		white-space: normal;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.rental-title::before {
			margin-left: 110px;
			content: '';
	}
	.time-box{
		margin-top: 2px;
	}
	.price-box{
		margin-top:5px;
		font-size: 20px;
		font-weight: 600;
		height: 15%;
		color: #9b0000;
	}
	.description-box{
		font-size: 10px;
		color: rgba(132, 132,132, 0.6);
		margin-top:2px;
		height: 40px;
		line-height: 20px;
		white-space: normal;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}
	.publish-time-box{
		height: 15px;
		width: 95%;
		margin-right:5%;
		font-size:10px;
		text-align: right;
		margin-bottom:10px;
	}
</style>