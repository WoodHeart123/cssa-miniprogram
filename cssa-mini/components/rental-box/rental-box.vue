<template>
	<view class="rental-box row-container" @click="toRentalDetail">
		<view class="image-box">
			<image mode="widthFix" class="image" :src="this.houseInfo.imageList[0]"/>
		</view>
		<view class="content-box">
			<view class="row-container title-box">
				<view class="row-container tag sex">{{this.houseInfo.sexConstraint}}</view>
				<view class="row-container tag floorplan">{{this.houseInfo.floorplan}}</view>
				<view class="rental-title">{{this.houseInfo.name}}</view>
			</view>
			<view class="time-box">{{rentalTime}}</view>
			<view class="price-box">${{this.houseInfo.price}}</view>
			<view class="description-box">{{this.houseInfo.description}}</view>
		</view>
	</view>
</template>

<script>
	import moment from "moment/min/moment-with-locales";
	import 'moment/locale/zh-cn';
	export default {
		name:"rental-box",
		mounted(){
			console.log(encodeURIComponent(JSON.stringify(this.houseInfo.contact)))
		},
		data() {
			return {
				houseInfo: {
					price:1300,
					rentalStartTime:1676155756000,
					rentalEndTime:1976955756000,
					name: "London Luxury Apartment London Luxury Apartment",
					imageList: ["/static/housing.jpg", "/static/housing.jpg", "/static/housing.jpg"],
					floorplan:"1B1B",
					contact: [1530673838,1536030638],
					description: "Beech Townhomes隶属于东兰辛当地大型公寓商DTN旗下。Beech Townhomes位于密歇根州的东兰辛，密歇根州立大学附近，拥有全新的一卧室和两卧室联排别墅。 公寓距离东兰辛市中心，夜生活场所，餐馆和购物场所仅有几个街区，步行即可抵达斯巴达体育场，布雷斯林中心和伊莱和艾迪斯博物馆。 别墅内有洗衣机和烘干机，生活便利。临近学校，可步行上课。",
					sexConstraint: "仅限男生"
				},
			};
		},
		methods:{
			toRentalDetail:function(){
				uni.navigateTo({
					url:"/pages/detail/houseDetail"
				})
			}
		},
		computed:{
			rentalTime(){
				return moment(this.houseInfo.rentalStartTime).format("YYYY-MM-DD") + " 至 " + moment(this.houseInfo.rentalEndTime).format("YYYY-MM-DD")
			}
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
	}
	.content-box{
		width: 68%;
		height: 98%;
		margin: 2% 0 0 2%;
	}
	.image{
		width:95%;
		height:80%;
	}
	.tag{
		position: absolute;
		justify-content: center;
		align-items: center;
		background-color: #4169E1;
		color: white;
		border-radius: 5px;
		font-size: 12px;
		height: 20px;
		width: 40px;
		margin-right: 5px;
	}
	.rental-title {	
		height: 40px;
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
		height: 10%;
		color: darkblue;
	}
	.description-box{
		font-size: 10px;
		color: rgba(132, 132,132, 0.6);
		margin-top:10px;
		height: 80px;
		line-height: 20px;
		white-space: normal;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
	}
</style>