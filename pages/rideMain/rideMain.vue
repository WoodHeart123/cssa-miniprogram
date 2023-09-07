<template>
	<view id="ride-main">
		<view class="menu row-container">
			<view class="menu-box row-container">
				<view class="row-container ride-selection">
					<text @click="clickMenu(0)" :class="{selected:menuIndex==0}">顺风车</text>
				</view>
			</view>
			<!-- 这里做一个弹窗，进入界面自动弹出免责声明-->
		</view>
		
		<!-- 这里可以添加filter-->
		
		<scroll-view scroll-y="true" show-scrollbar="true" refresher-enabled="true"
			class="column-container rental-scroll" refresher-background="white" @refresherrefresh="refresh"
			enable-back-to-top="true" :refresher-triggered="triggered" @scrolltolower="onScrollLower">
			<view class="ride-box-container" v-for="(rideInfo,index) in rideList" :key="index">
				<rideBoxVue :rideInfo="rideInfo"></rideBoxVue>
			</view>
			<uni-load-more style="padding-bottom: 50px;" :status="status"></uni-load-more>
		</scroll-view>
		<uni-fab :pattern="pattern" horizontal="right" vertical="bottom" popMene="false" @fabClick="toPostRide" />
	</view>
</template>

<script>
	export default {
		components:{
			rideBoxVue
		},
		data() {
			return {
				
			}
		},
		onLoad() {
			wx.cloud.init();
		},
		methods: {
			clickMenu: function(e) {
				this.menuIndex = e;
			},
			toPostRide: function() {
				uni.navigateTo({
					url: "/pages/ride/ridePost",
				})
			},
			toggle(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
		}
	}
	import moment from "moment/min/moment-with-locales";
	import 'moment/locale/zh-cn';
	import rideBoxVue from "@/components/ride-box/ride-box.vue"
</script>

<style>
	#ride-main {
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
	
	.ride-selection {
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
</style>
