<template>
	<view class="my-ride">
		<!-- 分段控制器 -->
		<uni-segmented-control 
			:current="displayedType" 
			:values="tabValues" 
			active-color="#9b0000" 
			inactive-color="#333" 
			style="text-align: center; justify-content: center; line-height: 40px;" 
			@clickItem="onDisplayedTypeClick" 
		/>

		<!-- Ride 列表区域 -->
		<scroll-view 
			scroll-y="true"
			show-scrollbar="true"
			refresher-enabled="true"
			class="column-container ride-scroll"
			refresher-background="white"
			@refresherrefresh="refresh"
			enable-back-to-top="true"
			:refresher-triggered="triggered"
			@scrolltolower="onScrollLower"
		>
			<view class="my-ride-box" v-for="(ride, index) in rideList" :key="index">
				<view class="my-ride-container">
					<ride-box-vue :rideInfo="ride"></ride-box-vue>
					<view class="is-takeoff" v-if="ride.removedTime !== null">已下架</view>
				</view>

				<!-- 操作按钮 -->
				<view class="row-container button-box">
					<!-- 编辑按钮（所有顺风车都有） -->
					<view class="button row-container" @click="editRide(index)">
						<view class="icon iconfont">&#xe646;</view>
						<view class="button-text">编辑</view>
					</view>

					<!-- 未过期的顺风车显示下架按钮 -->
					<template v-if="ride.removedTime === null">
						<view class="button row-container" @click="hideRide(index)">
							<view class="icon iconfont">&#xe620;</view>
							<view class="button-text">下架</view>
						</view>
					</template>

					<!-- 删除按钮（所有顺风车都有） -->
					<view class="button row-container" @click="deleteRide(index)">
						<view class="icon iconfont">&#xe74b;</view>
						<view class="button-text">删除</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="status" :contentText="contentText"></uni-load-more>
		</scroll-view>
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
				offset: 0,
				limit: 20,
				rideList: [],
				tabValues: ["已发布", "已过期"],
				displayedType: 0, // 0: 已发布, 1: 已过期
				status: "more",
				triggered: false,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多了"
				},
			};
		},
		onShow() {
			this.refresh();
		},
		components: {
			rideBoxVue
		},
		methods: {
			// 切换分段控制器
			onDisplayedTypeClick(e) {
				if (this.displayedType !== e.currentIndex) {
					this.displayedType = e.currentIndex;
					this.offset = 0;
					this.rideList = [];
					this.status = "more";
					this.refresh();
				}
			},

			// 加载已发布的顺风车
			async loadPublishedRideInfo() {
				this.status = "loading";
				const opts = {
					path: `/ride/getRideListByUserId?offset=${this.offset}&limit=${this.limit}`,
					type: 'GET',
				};
				const response = await requestAPI(opts);
				this.handleRideResponse(response);
			},

			// 加载已下架的顺风车
			async loadRemovedRideInfo() {
				this.status = "loading";
				const opts = {
					path: `/ride/getHiddenRideList?offset=${this.offset}&limit=${this.limit}`,
					type: 'GET',
				};
				const response = await requestAPI(opts);
				this.handleRideResponse(response);
			},

			// 处理接口响应
			handleRideResponse(response) {
				if (response.data && response.data.status === 100) {
					if (response.data.data.length < this.limit) {
						this.status = "noMore";
					}
					this.offset += this.limit;
					this.rideList = this.rideList.concat(response.data.data);
				} else {
					this.status = "noMore";
				}
				this.triggered = false;
			},

			// 上拉加载更多
			onScrollLower() {
				if (this.status === "noMore") return;
				this.displayedType === 0 ? this.loadPublishedRideInfo() : this.loadRemovedRideInfo();
			},

			// 刷新数据
			refresh() {
				this.offset = 0;
				this.rideList = [];
				this.status = "more";
				this.triggered = true;
				this.displayedType === 0 ? this.loadPublishedRideInfo() : this.loadRemovedRideInfo();
			},


			// 编辑 Ride
			async editRide(index) {
				uni.navigateTo({
					url: `../ride/ridePost?ride=` + encodeURIComponent(JSON.stringify(this.rideList[index]))
				});
			},

			// 移除 Ride
			async hideRide(index) {
				await requestAPI({
					path: `/ride/hideRide?rideId=${this.rideList[index].rideId}`,
					type: 'POST',
				});
				this.refresh();
			},

			// 删除 Ride
			deleteRide(index) {
				uni.showModal({
					title: '提示',
					content: '确定要删除吗？删除后不可恢复！',
					success: async (res) => {
						if (res.confirm) {
							await requestAPI({
								path: `/ride/removeRide?rideId=${this.rideList[index].rideId}`,
								type: 'POST',
							});
							this.rideList.splice(index, 1);
						}
					}
				});
			}
		}
	};
</script>

<style>
	@import '@/static/iconfont/iconfont.css';
	
	/* 页面整体样式 */
	.my-ride {
		width: 100vw;
		height: 100vh;
		overflow-y: scroll;
		background-color: #e4e4e4;
	}

	/* 滚动区域样式 */
	.ride-scroll {
		width: 100vw;
		height: calc(100vh - 50px);
		background-color: #f9f9f9;
	}

	/* 列表项容器 */
	.my-ride-box {
		border: 1px solid white;
		box-shadow: 0 3px 3px 0 #cbcbcb;
		width: 96vw;
		margin: 10px 2vw;
		border-radius: 10px;
		overflow: hidden;
		background-color: white;
		padding-bottom: 10px;
	}

	/* 单个 Ride 容器 */
	.my-ride-container {
		height: 150px;
		width: 100%;
		position: relative;
		margin-bottom: 10px;
	}

	/* 操作按钮容器 */
	.button-box {
		height: 50px;
		width: 96vw;
		align-items: center;
		background-color: white;
		justify-content: space-around;
		display: flex;
	}

	/* 操作按钮样式 */
	.button {
	    height: 50%;
	    width: 20%;
	    border-radius: 10px;
	    border: 2px solid #9b0000;
	    box-shadow: 0 2px 2px 0 #9b0000;
	    align-items: center;
	    display: flex;
	    flex-direction: row;
	    justify-content: center;
		margin-top: 20px;
	}

	.button-text {
		text-align: center;
		color: #505050;
		font-weight: 550;
		height: 55%;
		font-size: 100%;
		width: 100%;
		height: 100%;
	}

	.icon {
		margin: 2px;
		font-size: 16px;
	}

	/* 下架状态覆盖层 */
	.is-takeoff {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(34, 34, 34, 0.7);
		text-align: center;
		line-height: 120px;
		font-size: 20px;
		color: rgba(255, 255, 255, 0.8);
		border-radius: 10px 10px 0 0;
		z-index: 10;
	}

	/* 分段控制器样式 */
	.uni-segmented-control {
		margin: 10px 0;
		background-color: #fff;
		border-radius: 5px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	}

	/* 上拉加载更多样式 */
	.uni-load-more {
		margin: 20px 0;
		text-align: center;
		font-size: 14px;
		color: #9b0000;
	}

	/* 分段控制器容器 */
	.segmented-container {
		margin: 10px 2vw;
		background-color: #fff;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		border-radius: 10px;
	}

	/* 加载中提示样式 */
	.loading-text {
		text-align: center;
		margin-top: 20px;
		color: #9b0000;
		font-size: 14px;
	}

	/* 提示信息 */
	.empty-message {
		text-align: center;
		color: #999;
		font-size: 14px;
		margin-top: 20px;
	}

	/* 刷新动画样式 */
	.refresher {
		text-align: center;
		padding: 10px 0;
		color: #9b0000;
		font-size: 14px;
	}
</style>