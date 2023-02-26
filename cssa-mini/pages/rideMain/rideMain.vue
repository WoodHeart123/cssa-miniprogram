<template>
	<view id="ride-main">
		<view class="menu row-container">
			<view class="menu-box row-container">
				<view class="row-container rental-selection">
					<text @click="clickMenu(0)" :class="{selected:menuIndex==0}">顺风车</text>
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" show-scrollbar="true" refresher-enabled="true"
			class="column-container rental-scroll" refresher-background="white" @refresherrefresh="refresh"
			enable-back-to-top="true" :refresher-triggered="triggered" @scrolltolower="onScrollLower">
			<view class="ride-box-container" v-for="(rideInfo,index) in rideList" :key="index">
				<rideBoxVue :rideInfo="rideInfo"></rideBoxVue>
			</view>
			<uni-load-more style="padding-bottom: 50px;" :status="status"></uni-load-more>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				make: "汽车品牌（例：雪佛兰，大众）",
				bodyType: "车身形式（例：SUV, CRV）",
				licensePlateNum: "车牌号",
				from: "始发地（例：麦迪逊）",
				to: "目的地（例：芝加哥）",
				date1: Date.now(),
				date2: Date.now() + 10000000000,
				availableSeats: 5,
				price: 0,
				numOfSuitcase: 1,
				contact: "联系方式（例：微信号/电话号）",
				rideList:[],
			}
		},
		onLoad(){
			wx.cloud.init();
			this.refresh();
		},
		methods: {
			clickMenu: function(e) {
				this.menuIndex = e;
			}
		}
	}
</script>

<style>

</style>
