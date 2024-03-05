<template>
	<view id="main" class="column-container">
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
			<view class="column-container function-button" @click="showGuide">
				<img class="image" src="https://cssa-mini-na.oss-us-west-1.aliyuncs.com/main/handbook.png" />
				<view class="column-container function-text">
					<text>新生手册</text>
				</view>
			</view>
			<!-- <navigator class="column-container function-button" url='../findFriend/findClassmate'>
				<img class="image" src="https://cssa-mini-na.oss-us-west-1.aliyuncs.com/main/community.png" />
				<view class="column-container function-text">
					<text>官方社群</text>
				</view>
			</navigator> -->
			<!-- 			<view class="row-container function-button">
			<view class="row-container function-button" @click="toRide()">
					<view class="column-container function-text">
						<text>顺风车</text>
					</view>
					<img class="image" src="" />这里补一个顺风车的图片
				</view>
			</view> -->
		</view>
		
		
		<uni-popup ref="progress" type="center" :mask-click="false" background-color="#fff" >
			<view style="width: 80vw;padding:5px;display: flex;flex-direction: row;flex-shrink: 0;">
				<progress stroke-width="5" :percent="downloadProgress"></progress>
				<icon style="margin-left: 2px;" type="cancel" size="26" @click="cancelTask"/>
			</view>

		</uni-popup>

	</view>
</template>

<script>
	export default {
		components: {
			actBoxVue,
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
				isLogin: true,
				downloadProgress: 0,
				isDownloaded: false,
				abortTask: false,
			}
		},
		onLoad() {
			wx.cloud.init();
			uni.getStorage({
				key: "userInfo-2",
				fail: () => {
					this.isLogin = false;
					uni.switchTab({
						url: "/pages/user/index"
					})
				},
				success: (res) => {
					this.isLogin = true;
				}
			});
		},
		onShow() {
			uni.getStorage({
				key: "userInfo-2",
				success: (res) => {
					this.isLogin = true;
				}
			});
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
					url: "/pages/coursePage/courseMain"
				})
			},
			toSecond: function() {
				if (!this.isLogin) {
					uni.switchTab({
						url: "/pages/user/index"
					})
					return;
				}
				uni.navigateTo({
					url: "/pages/second/secondMain",
				})
			},
			toRental: function() {
				if (!this.isLogin) {
					uni.switchTab({
						url: "/pages/user/index"
					});
					return;
				}
				uni.navigateTo({
					url: "/pages/rental/main",
				})
			},
			showGuide: function() {
				if(this.isDownloaded){
					wx.openDocument({
						filePath: wx.env.USER_DATA_PATH + "/新生手册.pdf",
						showMenu: true,
						fileType: "pdf"
					})
					return;
				}
				this.downloadProgress = 0;
				this.abortTask = false;
				this.$refs.progress.open()
				const downloadTask = wx.downloadFile({
					url: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/%E6%96%B0%E7%94%9F%E6%89%8B%E5%86%8C.pdf",
					filePath: wx.env.USER_DATA_PATH + "/新生手册.pdf",
					success: (event) => {
						uni.hideLoading();
						if(!this.abortTask){
							wx.openDocument({
								filePath: wx.env.USER_DATA_PATH + "/新生手册.pdf",
								showMenu: true,
								fileType: "pdf"
							})
						}
						this.isDownloaded = true;
					},
					fail: (event) => {
						if(!this.abortTask){
							uni.showToast({
								icon: "error",
								title: "下载文件失败"
							})
						}
					},
					complete: () => {
						this.$refs.progress.close();
					}
				})
				downloadTask.onProgressUpdate((res) => {
					this.downloadProgress = res.progress;
				});
			},
			cancelTask:function(){
				this.abortTask = true;
				this.$refs.progress.close();
			}
		}
	}
	import actBoxVue from '@/components/act-box/act-box.vue';
	import mainAdvertisementVue from '@/components/main-advertisement/main-advertisement.vue'
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

	.cssa-intro-text {
		margin-left: 20rpx;
		width: 50%;
		justify-content: center;
		font-weight: 700;
		align-items: center;
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
		height: 200px;
		width: 90vw;
		margin-left: 5vw;
	}


	.disabled {
		color: #ccc !important;
	}
	
	.wx-progress-inner-bar {  border-radius: 5px;}
	
	progress {
	    flex:1;
	}
</style>
