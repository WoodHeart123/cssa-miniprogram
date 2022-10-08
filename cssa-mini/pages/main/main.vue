<template>
	<view id="main" class="column-container">
		<uni-swiper-dot class="uni-swiper-dot-box" @clickItem="clickItem" :info="actDetailList" :current="current"
			mode="dot" :dots-styles="dotStyle" field="content">
			<swiper class="swiper-box" @change="change">
				<swiper-item v-for="(actDetail, index) in actDetailList" :key="index">
					<img class='swiper-image' :src="actDetail.imgs" @click="toAct" />
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view class="row-container function-box">
			<view class="row-container function-button" @click="toCourse">
				<view class="column-container function-text">
					<text>课程论坛</text>
				</view>
				<img class="image" src="../../static/forum.svg" />
			</view>
			<view class="row-container function-button disabled">
				<view class="row-container function-button">
					<view class="column-container function-text">
						<text>二手商品</text>
					</view>
					<img class="image" src="../../static/ebay.svg" />
				</view>
			</view>
		</view>
		<view class="row-container function-box disabled">
			<view class="row-container function-button">
				<view class="row-container function-button">
					<view class="column-container function-text">
						<text>公寓转租</text>
					</view>
					<img class="image" src="../../static/apartment.svg" />
				</view>
			</view>
			<view class="row-container function-button disabled">
				<view class="row-container function-button">
					<view class="column-container function-text">
						<text>生活手册</text>
					</view>
					<img class="image" src="../../static/handbook.svg" />
				</view>
			</view>
		</view>

		<view class="leader-list">
			<text class="cssa-intro-text">CSSA介绍</text>
			<scroll-view class="row-container leader-intro" :scroll-x="true">
				<president-box v-for="(leader, index) in leaderInfo" :key="index" :index="index" :leader="leader">
				</president-box>
			</scroll-view>
		</view>


		<uni-popup ref="leaderPopup" type="bottom" backgroundColor="#ffffff">
			<image class="pop-img" :src="popupLeader.image" />
			<view class="pop-name">{{popupLeader.name}}</view>
			<view class="pop-div" />
			<view class="pop-intro">{{popupLeader.intro}}</view>
			<view style="height: 4vh;" />
		</uni-popup>
	</view>
</template>

<script>
	export default {
		components: {
			actBoxVue,
			presidentBoxVue
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
				current: 0,
				actDetailList: [],
				leaderInfo: list,
				popupLeader: {}

			}
		},
		onLoad() {
			wx.cloud.init();
			uni.$on("openPopUp", (index) => this.openLeaderPop(index));
		},
		methods: {
			openLeaderPop: function(index) {
				this.popupLeader = this.leaderInfo[index];
				console.log(index)
				this.$refs.leaderPopup.open('bottom');
			},
			change: function(e) {
				this.current = e.detail.current;
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
		}
	}
	import actBoxVue from '@/components/act-box/act-box.vue';
	import presidentBoxVue from '../../components/president-box/president-box.vue'
	import list from '@/pages/main/main.js'
</script>

<style>
	@import '@/static/iconfont/iconfont.css';

	#main {
		width: 100vw;
		height: 100vh;
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

	.uni-swiper-dot-box {
		margin-top: 2vh;
		height: 25vh;

		margin-bottom: 2vh;
	}

	.swiper-box {
		width: 90vw;
		margin-left: 5vw;
		height: 25vh;
		background-color: #e5e5e5;
		border-radius: 10px;
	}

	.function-box {
		height: 10vh;
		margin-top: 2vh;
		justify-content: space-around;
	}

	.function-button {
		width: 45vw;
		border-radius: 5px;
		background-color: white;
		box-shadow: 0 0px 6px 1px rgba(165, 165, 165, 0.2)
	}

	.image {
		width: 40%;
		height: 100%;
		margin-right: 10%;
	}

	.function-text {
		width: 50%;
		justify-content: center;
		font-weight: 700;
		align-items: center;
	}

	.act-box {
		width: 94vw;
		height: 25vh;
	}

	.swiper-image {
		width: 100%;
		height: 100%;
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
