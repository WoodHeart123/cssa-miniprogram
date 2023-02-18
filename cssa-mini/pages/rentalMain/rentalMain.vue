<template>
	<view id="rental-main">
		<view class="menu row-container">
			<!-- <view class="search-box" @click="toSearch">
				<uni-icons type="search" size="30"></uni-icons>
			</view> -->
			<view class="menu-box row-container">
				<view class="row-container rental-selection">
					<text @click="clickMenu(0)" :class="{selected:menuIndex==0}">转租</text>
<!-- 					<text>/</text>
					<text @click="clickMenu(1)" :class="{selected:menuIndex==1}">找室友</text> -->
				</view>
			</view>
		</view>
		<view class="row-container filter-box">
			<view class="setting-icon">
				<uni-icons type="settings-filled" size="30"></uni-icons>
			</view>

			<view id="price-filter-item" class="row-container filter-item" @click="popFilter('price')">
				<view class="filter-tag">价格：</view>
				<view class="filter-value">{{this.filter.priceLimit==5000?"无上限":"0 - " + this.filter.priceLimit}}
				</view>
			</view>
			<view class="row-container filter-item" @click="popFilter('price')">
				<view class="filter-tag">时间：</view>
				<view class="filter-value">{{this.filter.time[0]==0?"不限":this.filter.time[0] + ' - ' + this.filter.time[1]}}</view>
			</view>
			<view class="row-container filter-item" @click="popFilter('price')">
				<view class="filter-tag">户型：</view>
				<view class="filter-value">
					{{this.selectedFloorplan.length==this.floorplanList.length?"不限":this.selectedFloorplan.join("；")}}
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" show-scrollbar="true" refresher-enabled="true"
			class="column-container rental-scroll" refresher-background="white" @refresherrefresh="refresh"
			enable-back-to-top="true" :refresher-triggered="triggered" @scrolltolower="onScrollLower">
			<view class="rental-box-container" v-for="(rentalInfo,index) in rentalList" :key="index">
				<rentalBoxVue :rentalInfo="rentalInfo"></rentalBoxVue>
			</view>
			<uni-load-more style="padding-bottom: 50px;" :status="status"></uni-load-more>
		</scroll-view>
		<uni-fab :pattern="pattern" horizontal="right" vertical="bottom" popMene="false" @fabClick="toPostRental" />
		<uni-popup ref="filter" type="bottom" background-color="#fff" :safeArea="safeArea" @maskClick="maskClick" :is-mask-click="safeArea">
			<view class="column-container filter-popup">
				<view class="pop-sub-title">价格</view>
				<view class="row-container price-filter-pop">
					<view class="price-slider">
						<slider :value="this.filter.priceLimit" min="0" max="5000" step="100" block-size="15"
							@change="priceLimitChange" @changing="priceLimitChange" />
					</view>
					<view class="price-input">
						<uni-easyinput v-model="this.filter.priceLimit" clearable="false" clearSize="0" type="number">
						</uni-easyinput>
					</view>
				</view>
				<view class="pop-sub-title">时间</view>
				<view class="time-picker">
					<view style="margin-bottom: 5px;">
						<text style="margin-right: 5px;">开启时间筛选</text>
						<switch @change="switchTimePicker" style="transform:scale(0.7)"/>
					</view>
					<uni-datetime-picker v-show="this.timeFilter" v-model="this.filter.time" type="daterange" :start="start" :end="end"
						:clear-icon=false />
				</view>
				<view class="pop-sub-title">户型</view>
				<view class="floorplan-filter-pop">
					<view class="floorplan-tag" v-for="(floorplan,index) in floorplanList" :key='index'>
						<uni-tag v-show="this.selectedFloorplan.indexOf(floorplan)==-1" :text="floorplan"
							@click="select(floorplan)"></uni-tag>
						<uni-tag v-show="this.selectedFloorplan.indexOf(floorplan)!=-1" type='primary' :text="floorplan"
							@click="remove(floorplan)"></uni-tag>
					</view>
					<view class="all-floorplan-tag"
						v-show="this.selectedFloorplan.length==this.floorplanList.length||this.selectedFloorplan.length==0"
						@click="clickAll">
						{{this.selectedFloorplan.length==0?"选中全部":"取消全部"}}
					</view>
				</view>
				<view class="pop-button-box">
					<button class="pop-button" @click="search">搜索</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		components:{
			rentalBoxVue
		},
		data() {
			return {
				menuIndex: 0,
				filter: {
					priceLimit: 5000,
					time: [0, 0],
				},
				floorplanList: ['Studio', '1B1B', '2B1B', '2B2B', '3B2B', '3B3B', '4B2B', "4B3B", "其他"],
				selectedFloorplan: ['Studio', '1B1B', '2B1B', '2B2B', '3B2B', '3B3B', '4B2B', "4B3B", "其他"],
				start: Date.now(),
				end: Date.now() + 10000000000,
				timeFilter:false,
				status:"loading",
				safeArea:false,
				limit:20,
				offset:0,
				rentalList:[],
				triggered:false,
				pattern: {
					buttonColor: "#9b0000"
				},
				
			}
		},
		onLoad(){
			wx.cloud.init();
			this.refresh();
		},
		onShow(){
			uni.$on("uploadRentalSuccess",this.uploadSuccess);
		},
		methods: {
			clickMenu: function(e) {
				this.menuIndex = e;
			},
			uploadSuccess:function(){
				this.refresh();
				uni.showToast({
					title: "上传成功",
					duration: 5000,
				});
			},
			toPostRental: function() {
				uni.navigateTo({
					url: "/pages/rental/rentalPost",
				})
			},
			popFilter: function(e) {
				if (e == 'price') {
					this.$refs.filter.open();
				}
			},
			priceLimitChange: function(e) {
				this.filter.priceLimit = e.detail.value;
			},
			clickAll: function() {
				if (this.selectedFloorplan.length == 0) {
					this.selectedFloorplan = Array.from(this.floorplanList);
				} else {
					this.selectedFloorplan = [];
				}
			},
			remove: function(floorplan) {
				this.selectedFloorplan.splice(this.selectedFloorplan.indexOf(floorplan), 1);
			},
			select: function(floorplan) {
				this.selectedFloorplan.push(floorplan);
			},
			switchTimePicker:function(e){
				if(e.detail.value){
					this.filter.time = [moment().format("YYYY-MM-DD"), moment().add(1,"M").format("YYYY-MM-DD")];	
				}else{
					this.filter.time = [0,0];
				}
				this.timeFilter = e.detail.value;			
			},
			maskClick:function(){
				if(this.selectedFloorplan.length == 0){
					uni.showToast({
						title: '请至少选择一个户型',
						duration: 2000,
						icon:"none"
					});
					return;
				}
				this.$refs.filter.close();
			},
			search:function(){
				
				this.refresh();
			},
			refresh:function(){
				if (!this.triggered) {
					this.triggered = true;
					this.limit = 20;
					this.offset = 0;
					this.rentalList = [];
					this.status = "loading"
					this.getRentalList();
				}
			},
			getRentalList:async function(){
				if(this.status == "noMore"){
					return;
				}
				let temp = [0,0];
				if(this.filter.time[0] != 0){
					temp = [moment(this.filter.time[0],"YYYY-MM-DD").valueOf(),moment(this.filter.time[1],"YYYY-MM-DD").valueOf()]
				}
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9gip97mx4bfa32a3',
					},
					path: `/rental/getRentalList?limit=${this.limit}&offset=${this.offset}&floorPlanList=${this.selectedFloorplan}&priceLimit=${this.filter.priceLimit}&time=${temp}`,
					method: 'GET',
					header: {
						'X-WX-SERVICE': 'springboot-ds71',
					},
				});
				if(res.data.status == 100){
					this.rentalList = this.rentalList.concat(res.data.data);
				}
				this.offset += res.data.data.length;
				if(res.data.data.length != this.limit){
					this.status = "noMore";
				}else{
					this.status = "more";
				}
				this.$nextTick(() => {
					this.triggered = false;
				});
			},
			onScrollLower:function(){
				this.status = "loading";
				this.getRentalList();
			}
		}
	}
	import moment from "moment/min/moment-with-locales";
	import 'moment/locale/zh-cn';
	import rentalBoxVue from "@/components/rental-box/rental-box.vue"
</script>

<style>
	#rental-main {
		position: absolute;
		width: 100vw;
		height: 100vh;
		top: 0;
		background-color: white;
		scroll-y: false;
	}

	.column-container {
		display: flex;
		flex-direction: column;
	}

	.row-container {
		display: flex;
		flex-direction: row;
	}

	.menu {
		position: fixed;
		width: 100vw;
		height: 50px;
		align-items: center;
		background-color: white;
	}

	.menu-scroll {
		padding-bottom: 0;
	}

	.menu-box {
		width: 100vw;
		overflow-x: scroll;
		height: 50px;
		-ms-overflow-style: none;
		scrollbar-width: none;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
	}

	.rental-selection {
		margin-bottom: 3px;
		width: 40%;
		align-items: center;
		justify-content: space-around;
		flex-shrink: 0;
		font-size: 20px;
		color: rgba(, 132, 253, 0.4);
	}

	.selected {
		font-size: 21px;
		transition: all 0.5s;
		font-weight: 700;
		color: #9b0000;
	}

	.filter-box {
		padding-top: 2px;
		position: relative;
		margin-top: 50px;
		height: 42px;
		width: 100%;
		overflow-y: scroll;
		align-items: center;
		background-color: rgba(255, 255, 255, 0.9);
		box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 5px;
		box-sizing: border-box;
		flex-shrink: 0 !important;
	}

	.right-arrow-box {
		position: absolute;
		right: 0;
		width: 30px;
		height: 30px;
	}

	.filter-item {
		border: 0.5px solid rgb(111, 111, 111, 0.2);
		background-color: rgba(22, 132, 253, 0.05);
		margin: 0 7px 0 7px;
		border-radius: 15px;
		padding: 0 8px 0 8px;
		font-size: 14px;
		height: 25px;
		line-height: 25px;
		flex-shrink: 0;
	}

	#price-filter-item {
		margin-left: 35px;
	}

	.tag {
		color: #aaa;
	}

	.filter-tag {
		color: #444;
	}

	.setting-icon {
		position: absolute;
		left: 0;
		width: 30px;
	}

	.filter-popup {
		width: 100vw;
		min-height: 60vh;
		position:relative;
	}

	.price-filter-pop {
		width: 90vw;
		margin-left: 5vw;
	}

	.price-slider {
		width: 80%;
	}

	.price-input {
		width: 20%;
	}

	.time-picker {
		width: 80%;
		margin-left: 10%;
		margin-bottom: 20px;
	}

	.pop-sub-title {
		font-weight: 600;
		font-size: 15px;
		margin: 10px 0 10px 5vw;
	}

	.floorplan-tag {
		margin: 0 5px 5px 5px;
		height: 30px;
		box-sizing: border-box;
	}

	.floorplan-filter-pop {
		display: flex;
		flex-wrap: wrap;
		height: fit-content;
		width: 80vw;
		margin-left: 10vw;
	}

	.all-floorplan-tag {
		font-size: 10px;
		color: blue;
		line-height: 25px;
		margin-left: 2px;
	}
	.pop-button{
		margin-top: 20px;
		width: 100vw;
		height: 60px;
	}
	.pop-button-box{
		position:absolute;
		bottom:0;
		
	}
	.rental-box-container{
		width: 100vw;
		height: 200px;
		margin-bottom: 10px;
	}
	.rental-scroll{
		height: calc(100vh - 92px);
		width: 100%;
		overflow: hidden;
		background-color: white;
		overflow-y:scroll ;
	}
</style>
