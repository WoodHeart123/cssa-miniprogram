<template>
	<view id="act">
		<top-bar text="CSSA官方活动"></top-bar>
		<view class="segment">
			<uni-segmented-control  :current="current" :values="items" style-type="text"
				active-color="#9b0000" @clickItem="onClickItem" />
		</view>
		<scroll-view class="scroll" scroll-top="0" scroll-y="true" show-scrollbar="true" refresher-enabled="true" 
				refresher-background="#F5F5F5" @refresherrefresh="refresh"
					enable-back-to-top="true" :refresher-triggered="triggered" @scrolltolower="onScrollLower">
			<view v-if="current == 0" v-for="(actDetail,index) in actDetailList" :key="index">
				<act-box-vue class="act-box" :actDetail="actDetail" :ifJoined="false"></act-box-vue>
			</view>
			<view v-if="current == 1" v-for="(actDetail,index) in registerList" :key="index">
				<act-box-vue class="act-box" :actDetail="actDetail" :ifJoined="true"></act-box-vue>
			</view>
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
				items: ['最新活动', '往期活动'],
				current: 0,
				count: 0,
				mode: "",
				triggered: false
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
			uni.$on("refreshAct", this.refresh)
			this.mode = "first";
			this.refresh();
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			refresh: function(){
				if (!this.triggered) {
					this.triggered = true;
				} else {
					return;
				}
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
			},
			async getActivityList() {
				const opts = {
				    path: "/activity/events",
				    type: 'GET',
				};
				
				requestAPI(opts).then(response => {
				    this.actDetailList = response.data.data;
				    this.$nextTick(() => {
				    	this.triggered = false;
				    });
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
				    this.$nextTick(() => {
				    	this.triggered = false;
				    });
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
	#act{
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
	}


	.segment {
		width: 100%;
		z-index: 5;
		margin-top: 20px;
	}

	.scroll {
		flex-grow: 1;
		z-index: 1;
	}

	.central-text {
		font-size: 30px;
		color: #AAA;
	}
</style>
