<template>
	<view>
		<uni-segmented-control :current="displayedType" :values="tabValues" active-color="#9b0000" inactive-color="#333" style="text-align: center; justify-content: center; line-height: 40px;" @clickItem="onDisplayedTypeClick" />

	</view>
</template>

<script>
	import moment from "moment/min/moment-with-locales";
	import 'moment/locale/zh-cn';
	import requestAPI from '@/api/request.js'
	import rideBoxVue from "@/components/ride-box/ride-box.vue"
	
	export default {
		data() {
			return {
				offset: 0, // 当前数据偏移量
				limit: 20, // 每次加载的数据数量
				rideList: [], // 全部顺风车列表
				tabValues: ["已发布", "已过期"],
				displayedType: 0, // 显示内容的种类，默认为0-“已发布”
			};
		},
		methods: {
			onDisplayedTypeClick(e) {
				if (this.displayedType !== e.currentIndex) {
					this.displayedType = e.currentIndex;
					
					if (this.displayedType === 0) {
						loadPublishedRideInfo();
					} else {
						loadExpiredRideInfo();
					}
				}
			},
			async loadPublishedRideInfo() {
				
			},
			async loadExpiredRideInfo() {
				
			}
		}
	}
</script>

<style>
	.row-container {
		display: flex;
		flex-direction: row;
	}
	
	.filter-box {
		padding-top: 2px;
		position: relative;
		height: 42px;
		width: 100%;
		overflow-y: scroll;
		align-items: center;
		background-color: rgba(255, 255, 255, 0.9);
		box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 5px;
		box-sizing: border-box;
		flex-shrink: 0 !important;
	}
</style>
