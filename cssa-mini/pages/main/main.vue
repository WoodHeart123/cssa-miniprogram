<template>
	<view id="main" class="column-container">
		<uni-popup ref="popup" type="bottom" background-color="#fff">
			<button class="button" @click="getUserProfile">授权信息</button>
		</uni-popup>
		<uni-popup ref="welcome" background-color="fff">
			<welcome></welcome>
		</uni-popup>
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
			<view class="row-container function-button">
				<view class="row-container function-button">
					<view class="column-container function-text">
						<text>二手商品</text>
					</view>
					<img class="image" src="../../static/ebay.svg" />
				</view>
			</view>
		</view>
		<view class="row-container function-box">
			<view class="row-container function-button">
				<view class="row-container function-button">
					<view class="column-container function-text">
						<text>公寓转租</text>
					</view>
					<img class="image" src="../../static/apartment.svg" />
				</view>
			</view>
			<view class="row-container function-button">
				<view class="row-container function-button">
					<view class="column-container function-text">
						<text>生活手册</text>
					</view>
					<img class="image" src="../../static/handbook.svg" />
				</view>
			</view>
		</view>
		<view class="leader-list">
			<text class="stu">CSSA介绍</text>
			<scroll-view class="leader-intro" scroll-x="true">
				<view class="scroll-view-item-X" v-for="(leader,key) in leaderInfo" :key="key" @click="open(leader)">
					<image class="scroll-view-item-M" :src="leader.image" />
					<view class="scroll-view-item-H">
						<view class="intro-box">
							<view class="name">
								{{leader.name}}
							</view>
							<view class="position">
								{{leader.postion}}
							</view>
							<view class="intro">
								{{leader.intro}}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<uni-popup ref="popup" type="bottom" backgroundColor="#ffffff">
				<image v-if="popupLeader.image != ''" class="pop-img" :src="popupLeader.image" />
				<view class="pop-name">{{popupLeader.name}}</view>
				<view class="pop-div" />
				<view class="pop-intro">{{popupLeader.intro}}</view>
				<view style="height: 4vh;" />
			</uni-popup>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
			actBoxVue
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
				leaderInfo: [{
						'name': '张三一 ',
						'postion': '主席',
						'intro': '你好我是谁你好我是谁你好我是谁你好我是谁你好我是谁你好我是谁你好我是谁你好我是谁你好我是谁你好我是谁你好我是谁你好我是谁你好我是谁你好我是好我是谁你好我是谁你好我是谁你好我是谁你好我是谁你好我是谁你好我是谁你好我是谁你好我是谁你好我是谁你好我是谁你好我是谁你好我是谁你好我是谁你好我是谁你好我是好我是谁你好我是谁',
						'image': '../../static/renwu.jpeg'
					},
					{
						'name': 'XXX',
						'postion': 'PPP',
						'intro': '你好我是谁',
						'image': "../../static/renwu.jpeg"
					},
					{
						'name': 'XXX',
						'postion': 'PPP',
						'intro': '你好我是谁',
						'image': "../../static/renwu.jpeg"
					},
					{
						'name': 'XXX',
						'postion': 'PPP',
						'intro': '你好我是谁',
						'image': "../../static/renwu.jpeg"
					}
				],
				popupLeader: {
					'name': '',
					'postion': '',
					'intro': '',
					'image': ''
				}

			}
		},
		onLoad() {
			wx.cloud.init();
			uni.$on('close-welcome', (data) => {
				this.$refs.welcome.close();
				console.log(data);
			})
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					this.userInfo = res.data;
					this.login();
				},
				fail: () => {
					this.$refs.popup.open();
				},
			});
		},
		methods: {
			open(leader) {
				console.log(leader);
				this.popupLeader.name = leader.name;
				this.popupLeader.postion = leader.postion;
				this.popupLeader.intro = leader.intro;
				this.popupLeader.image = leader.image;
				this.$refs.popup.open('bottom');
			},
			change(e) {
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
			async login() {
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9go38k3y9fee3b2e',
					},
					path: "/activity/login?nickname=" + encodeURI(this.userInfo.nickName),
					method: 'GET',
					header: {
						'X-WX-SERVICE': 'springboot-f8i8',
					}
				});
				if (res.data.status == 103) {
					this.$refs.popup.close();
					this.$refs.welcome.open();
					return;
				}
				this.userInfo.email = res.data.data.email;
				this.userInfo.isStudent = res.data.data.isStudent;
				console.log(this.userInfo);
				uni.setStorage({
					key: "userInfo",
					data: this.userInfo
				});

			}
		}
	}
	import actBoxVue from '@/components/act-box/act-box.vue';
</script>

<style>
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
	}

	.stu {
		margin-left: 20rpx;
		width: 50%;
		justify-content: center;
		font-weight: 700;
		align-items: center;
	}

	.scroll-view-item-M {
		position: absolute;
		height: 90rpx;
		width: 90rpx;
		border-radius: 50%;
		background-size: 100% 100%;
	}

	.scroll-view-item-X {
		display: inline-block;
		border-radius: 10px;
		margin: 10px;
		height: 180px;
		width: 180px;
	}

	.scroll-view-item-H {
		margin-left: 20px;
		margin-top: 20px;
		height: 150px;
		width: 150px;
		border-radius: 5px;
		background-color: white;
		box-shadow: 0 0px 6px 1px rgba(165, 165, 165, 0.2)
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

	.name {
		font-size: 28rpx;
		font-weight: 700;
	}

	.position {
		height: 15px;
		line-height: 15px;
		font-size: 12px;
	}

	.intro {
		flex: 1;
		max-height: 70px;
		overflow: hidden;
		white-space: pre-wrap;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		margin-top: 10px;
		font-size: 10px;
		font-weight: 200;
		line-height: 16px;
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
</style>
