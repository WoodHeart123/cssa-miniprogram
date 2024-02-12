<template>
	<view id="act">
		<uni-segmented-control class="topBar" :current="current" :values="items" style-type="text"
			active-color="#9b0000" @clickItem="onClickItem" />
		<scroll-view class="scroll" scroll-top="0" scroll-y="true">
			<view v-if="current == 0" v-for="(actDetail,index) in actDetailList" :key="index">
				<act-box-vue class="act-box" :actDetail="actDetail" :ifJoined="false"></act-box-vue>
			</view>
			<view v-if="current == 1" v-for="(actDetail,index) in registerList" :key="index">
				<act-box-vue class="act-box" :actDetail="actDetail" :ifJoined="true"></act-box-vue>
			</view>
			<view class="footnote"></view>
		</scroll-view>
		<view v-if="current == 1" v-for="(actDetail,index) in registerList" :key="index"></view>
	</view>
</template>

<script>
	export default {
		onShareAppMessage(res) {
			return {
				title: "麦屯小助手-活动报名",
				path: '/pages/activity/act'
			}
		},
		components: {
			actBoxVue,
		},
		data() {
			return {
				userInfo: {},
				actDetailList: [],
				registerList: [],
				items: ['举办中', '已报名/已参加'],
				current: 0,
				count: 0,
				mode: "",
			}
		},
		onLoad() {
			wx.cloud.init();
			uni.getStorage({
				key: 'userInfo-2',
				success: (res) => {
					this.userInfo = res.data;
				}
			});
			uni.$on("refreshAct", uni.startPullDownRefresh)
			this.mode = "first";
			uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			if (this.mode == "first") {
				this.getActivityList();
				this.getRegisterList();
				this.mode = "more";
			} else {
				if (this.current == 0) {
					this.getActivityList();
				} else {
					this.getRegisterList();
				}
			}
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 2000);

		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			async getActivityList() {
				const opts = {
				    path: "/activity/events",
				    type: 'GET',
				};
				
				requestAPI(opts).then(response => {
				    this.actDetailList = response.data.data;
				    uni.stopPullDownRefresh();
				}).catch(error => {
				    console.error("Error fetching activity events:", error);
				});

			},
			async getRegisterList() {
				const opts = {
				    path: "/activity/register",
				    type: 'GET',
				};
				requestAPI(opts).then(response => {
				    this.registerList = response.data.data;
				    uni.stopPullDownRefresh();
				}).catch(error => {
				    console.error("Failed to fetch registration list:", error);
				});
			},
		}
	}
	import actBoxVue from '@/components/act-box/act-box.vue';
	import moment from 'moment';
	import requestAPI from '@/api/request.js'
</script>

<style>
	#act {
		display: flex;
	}

	.avatar-box {
		width: 100vw;
		height: 50px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.button {
		margin: 20px 10px 20px 10px;
		border-radius: 10px;
		border: 1px solid #AAAAAA;
		background-color: #1684FC;
		color: white;
	}

	.topBar {
		width: 100%;
		height: 50px;
		position: fixed;
		z-index: 5;
		background-color: #efeff4;
	}

	.scroll {
		padding-top: 50px;
		height: calc(100% - 30px);
		z-index: 1;
	}

	.footnote {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-width: 100%;
		min-height: 50px;
	}

	.central-text {
		font-size: 30px;
		color: #AAA;
	}
</style>
