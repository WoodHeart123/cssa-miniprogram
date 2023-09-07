<template>
	<view id="main" class="column-container">
		<uni-popup ref="ad" background-color="#fff" type="message">
			<div>aaa</div>
		</uni-popup>
		<view class="swiper-container">
			<main-advertisement width="90vw" height="200px"></main-advertisement>
		</view>
		<view class="row-container function-box">
			<view class="column-container function-button" @click="toCourse">
				<img class="image" mode="aspectFit"
					src="https://cssa-mini-na.oss-us-west-1.aliyuncs.com/main/course.png" />
				<view class="column-container function-text">
					<text>课程吐槽</text>
				</view>
			</view>
			<view class="column-container function-button" @click="toSecond">
				<img class="image" src="https://cssa-mini-na.oss-us-west-1.aliyuncs.com/main/secondhand.png" />
				<view class="column-container function-text">
					<text>二手市场</text>
				</view>
			</view>
			<view class="column-container function-button" @click="toRental">
				<img class="image" src="https://cssa-mini-na.oss-us-west-1.aliyuncs.com/main/rental.png" />
				<view class="column-container function-text">
					<text>公寓转租</text>
				</view>
			</view>
		</view>
		<view class="row-container function-box">
			<view class="column-container function-button" @click="toSecond">
				<img class="image" src="https://cssa-mini-na.oss-us-west-1.aliyuncs.com/main/handbook.png" />
				<view class="column-container function-text">
					<text>新生手册</text>
				</view>
			</view>
			<view class="column-container function-button" @click="toRental">
				<img class="image" src="https://cssa-mini-na.oss-us-west-1.aliyuncs.com/main/community.png" />
				<view class="column-container function-text">
					<text>官方社群</text>
				</view>
			</view>
<!-- 			<view class="row-container function-button">
			<view class="row-container function-button" @click="toRide()">
					<view class="column-container function-text">
						<text>顺风车</text>
					</view>
					<img class="image" src="" />这里补一个顺风车的图片
				</view>
			</view> -->
		</view>
		<!-- 		<view class="leader-list">
			<text class="cssa-intro-text">CSSA介绍</text>
			<scroll-view class="row-container leader-intro" :scroll-x="true">
				<president-box v-for="(leader, index) in leaderInfo" :key="index" :index="index" :leader="leader" />
			</scroll-view>
		</view>
		<uni-popup ref="leaderPopup" type="bottom" backgroundColor="#ffffff">
			<image class="pop-img" :src="popupLeader.image" />
			<view class="pop-name">{{popupLeader.name}}</view>
			<view class="pop-div" />
			<view class="pop-intro">{{popupLeader.intro}}</view>
			<view style="height: 4vh;" />
		</uni-popup> -->

	</view>
</template>

<script>
	export default {
		components: {
			actBoxVue,
			presidentBoxVue,
			mainAdvertisementVue
		},
		data() {
			return {
				info: [{}, {}, {}],
				dotStyle: {
					backgroundColor: 'rgba(83, 200, 249,0.3)',
					border: '1px rgba(83, 200, 249,0.3) solid',
					color: '#fff',
					selectedBackgroundColor: 'rgba(83, 200, 249,0.9)',
					selectedBorder: '1px rgba(83, 200, 249,0.9) solid'
				},
			}
		},
		onLoad() {
			wx.cloud.init();
			uni.getStorage({
				key: "userInfo-2",
				fail: () => {
					uni.switchTab({
						url: "/pages/index/index"
					})
				}
			});
		},
		onShow() {
			//this.popMask("ad")
		},
		onShareAppMessage(res) {
			return {
				title: "麦屯小助手",
				path: '/pages/main/main'
			}
		},
		onShareTimeline(res) {
			return {
				title: "麦屯小助手",
				path: '/pages/activity/act'
			}
		},
		methods: {
			popMask: function(e) {
				this.$refs.ad.open()
			},
			openLeaderPop: function(index) {
				this.popupLeader = this.leaderInfo[index];
				this.$refs.leaderPopup.open('bottom');
			},
			clickItem(e) {
				console.log(e);
			},
			toAct: function() {
				uni.switchTab({
					url: '/pages/activity/act'
				});
			},
			toCourse: function() {
				uni.navigateTo({
					url: "/pages/courseMain/courseMain"
				})
			},
			toSecond: function() {
				uni.navigateTo({
					url: "/pages/second/secondMain",
				})
			},
			toRental: function() {
				uni.navigateTo({
					url: "/pages/rentalMain/rentalMain",
				})
			},
			toRide: function() {
				uni.navigateTo({
					url: "/pages/rideMain/rideMain",
				})
			},
			toRest: function() {
				uni.navigateTo({
					url: "/pages/restMain/restMain",
				})
			},
		}
	}
	import actBoxVue from '@/components/act-box/act-box.vue';
	import presidentBoxVue from '../../components/president-box/president-box.vue'
	import mainAdvertisementVue from '../../components/main-advertisement/main-advertisement.vue'
</script>

<style>
	@import '@/static/iconfont/iconfont.css';

	#main {
		width: 100vw;
		height: 100vh;
		background-image: url("https://cssa-mini-na.oss-us-west-1.aliyuncs.com/main/main-background.png");
		background-position: bottom;
		background-size: cover;
		background-repeat: no-repeat;
	}

	.intro-box {
		position: absolute;
		margin-left: 10px;
		margin-right: 10px;
		margin-top: 30px;
		width: 130px;
	}

	.introduction {
		height: 100rpx;
	}

	.leader-list {
		margin-top: 10vh;
	}

	.leader-intro {
		white-space: nowrap;
		width: 100%;
		height: 180px;
	}

	.cssa-intro-text {
		margin-left: 20rpx;
		width: 50%;
		justify-content: center;
		font-weight: 700;
		align-items: center;
	}



	.pop-img {
		margin-left: 35vw;
		margin-top: 5vh;
		border-radius: 50%;
		height: 30vw;
		width: 30vw;
	}

	.pop-name {
		margin-top: 2vh;
		text-align: center;
		font-weight: 700;
	}

	.pop-div {
		background-color: lightgray;
		height: 0.2vh;
		width: 94vw;
		margin-top: 4vh;
		margin-left: 3vw;
	}

	.pop-intro {
		margin-top: 4vh;
		width: 92vw;
		margin-left: 4vw;
		font-weight: 200;
		font-size: 30rpx;
	}



	.column-container {
		display: flex;
		flex-direction: column;
	}

	.row-container {
		display: flex;
		flex-direction: row;
	}



	.function-box {
		height: 140px;
		width: 90vw;
		margin: 2vh 5vw 2vh 5vw;
		justify-content: space-between;
	}

	.function-button {
		flex: 0;
		width: 25vw;
		min-width: 25vw;
		border-radius: 10px;
		background-color: white;
		box-shadow: 0 0px 6px 1px rgba(165, 165, 165, 0.2);
		transition: width 0.05s;
		align-items: center;
		justify-content: space-around;
	}


	.image {
		margin-top: 10px;
		width: 54px;
		height: 54px;
	}

	.function-text {
		font-size: 16px;
		justify-content: center;
		font-weight: 700;
		align-items: center;
		margin-bottom: 10px;
		color: #636668;
	}

	.act-box {
		width: 94vw;
		height: 25vh;
	}

	.swiper-container {
		height: 30vh;
		width: 90vw;
		margin-left: 5vw;
	}


	.disabled {
		color: #ccc !important;
	}

	.button {
		margin: 20px 10px 20px 10px;
		border-radius: 10px;
		border: 1px solid #AAAAAA;
		background-color: #1684FC;
		color: white;
	}
</style>