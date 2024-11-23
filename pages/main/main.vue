<template>
	<view id="main" class="column-container">
		<view class="top-bar" :style="{
					top:menuButtonInfo.top + 'px',
					 left: menuButtonInfo.height + 'px'}">
			<view class="top-icon" :style="{
					width: menuButtonInfo.height + 'px', 
					height: menuButtonInfo.height + 'px'}">
				<image src="@/static/cssa-logo-black.png"></image>
			</view>
			<view class="heading-3 top-text">
				<text>CSSA麦屯圈</text>
			</view>
		</view>

		<view class="background-image">
		</view>

		<!-- 广告轮播部分 -->
		<view class="ads-swiper-container" style="margin-top: 10vh">
		    <swiper autoplay="true" interval="3000" circular="true" indicator-dots="true" class="swiper">
		        <swiper-item v-for="(ad, index) in ads" :key="index" @click="openAdLink(ad.link)">
		            <image :src="ad.imgUrl" mode="scaleToFill" class="ad-image" />
		        </swiper-item>
		    </swiper>
		</view>
		
		<!-- 功能部分 -->
		<view class="row-container function-box" style="margin-top: 5vh">
			<view class="column-container function-button" @click="toCourse">
				<img style="width: 29px;height: 26px; margin-bottom:10px;" src="@/static/main/course-rate.svg" />
				<text class="paragraph-1">Course Rate</text>
				<text class="heading-3">课程吐槽</text>
			</view>
			<view class="column-container function-button" @click="toSecond">
				<img style="width: 32px;height: 30px; margin-bottom:10px;" src="@/static/main/second-hand.svg" />
				<text class="paragraph-1">Second Hand</text>
				<text class="heading-3">二手市场</text>
			</view>

		</view>
		
		<view class="row-container function-box">
			<view class="column-container function-button" @click="toRental">
				<img style="width: 30px;height: 32px; margin-bottom:10px;" src="@/static/main/subleasing.svg" />
				<text class="paragraph-1">Subleasing</text>
				<text class="heading-3">公寓转租</text>
			</view>
			
			<view class="column-container function-button" @click="toRide">
				<img style="width: 32px;height: 32px; margin-bottom:10px;" src="@/static/main/ride.svg" />
				<text class="paragraph-1">Ride</text>
				<text class="heading-3">顺风车</text>
			</view>

			<!-- <view class="column-container function-button" @click="toEvent">
				<img style="width: 32px;height: 30px; margin-bottom:10px;" src="@/static/main/second-hand.svg" />
				<text class="paragraph-1">Events Hub</text>
				<text class="heading-3">麦屯社交圈</text>
			</view> -->
			<!-- <navigator class="column-container function-button" url='../findFriend/findClassmate'>
				<img class="image" src="https://cssa-mini-na.oss-us-west-1.aliyuncs.com/main/community.png" />
				<view class="column-container function-text">
					<text>官方社群</text>
				</view>
			</navigator> -->
		</view>
		<view class="row-container function-box whole">
			<view class="image-box">
				<img style="width: 100%;height: 100%;" class="image" src="https://7072-prod-9gip97mx4bfa32a3-1312104819.tcb.qcloud.la/asset/main/badger-book.png" />
			</view>

			<view class="right-function-box">
				<img style="width: 40%;height: 23%;" class="image" src="@/static/cssa.jpg" />
				<text class="badger-book-text">2024新生手册</text>
				<view class="gradient-border"></view>
				<view class="button" @click="showBadgerBook"><text class="button-text">领取新生手册</text></view>
			</view>


		</view>

		<uni-popup ref="progress" type="center" :mask-click="false" background-color="#fff">
			<view style="width: 80vw;padding:5px;display: flex;flex-direction: row;flex-shrink: 0;">
				<progress stroke-width="8" :percent="downloadProgress" show-info active-color="#7F0019"></progress>
				<icon style="margin-left: 2px;" type="cancel" size="26" @click="cancelTask" />
			</view>

		</uni-popup>
		
		<uni-popup ref="badgerbook" type="bottom" borderRadius="20px 20px 0 0" :safe-area="false">
			<view style="width: 100vw;display: flex;flex-direction: row;flex-shrink: 0;background-color: white;border-radius: 20px 20px 0 0;">
				<view class="badger-button-box" @click="showGuide">
					<uni-icons type="download-filled" size="35" color="#7F0019"></uni-icons>
					<text class="heading-3">下载</text>
				</view>
<!-- 				<view class="badger-button-box">
					<uni-icons type="eye-filled" size="35" color="#7F0019"></uni-icons>
					<text class="heading-3">预览</text>
				</view> -->
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
				menuButtonInfo: {},
				ads: [
					{imgUrl:'https://prod-9gip97mx4bfa32a3-1312104819.tcloudbaseapp.com/ads/main%20page%20ads/2025%E6%98%A5%E6%99%9A%E4%B8%BB%E6%8C%81%E4%BA%BA%E6%8B%9B%E5%8B%9F.png?sign=b9aa28b04686b9cb2dc41e85d3c001a9&t=1731120159',
					 link: 'https://mp.weixin.qq.com/s/r21LNuaNVVmwSr09VOamcA'},
					{imgUrl: 'https://prod-9gip97mx4bfa32a3-1312104819.tcloudbaseapp.com/ads/main%20page%20ads/ad%20test%201.png?sign=b6464c3631544f6ba9453ca2856a71b8&t=1731033041',
					 link: ''},
					{imgUrl: 'https://prod-9gip97mx4bfa32a3-1312104819.tcloudbaseapp.com/ads/main%20page%20ads/ad%20test%202.png?sign=d1fe262d2972c82f3f1c82c37e21157b&t=1731033076',
					 link: ''}
				]
			}
		},
		onLoad() {
			this.menuButtonInfo = wx.getMenuButtonBoundingClientRect();
			console.log(this.menuButtonInfo)
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
			toEvent: function(){
				uni.navigateTo({
					url: "/pages/event/main"
				})
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

			toRide: function() {
				if (!this.isLogin) {
					uni.switchTab({
						url: "/pages/user/index"
					});
					return;
				}
				uni.navigateTo({
					url: "/pages/ride/main",
				})
			},
			showBadgerBook: function(){
				this.$refs.badgerbook.open()
			},
			showGuide: function() {
				this.$refs.badgerbook.close()
				if (this.isDownloaded) {
					wx.openDocument({
						filePath: wx.env.USER_DATA_PATH + "/新生手册.pdf",
						showMenu: true,
						fileType: "pdf"
					})
					return;
				}
				if(this.downloadProgress != 0){
					this.$refs.progress.open()
					return;
				}
				this.downloadProgress = 0;
				this.abortTask = false;
				this.$refs.progress.open()
				const downloadTask = wx.downloadFile({
					url: "https://7072-prod-9gip97mx4bfa32a3-1312104819.tcb.qcloud.la/%E6%96%B0%E7%94%9F%E6%89%8B%E5%86%8C.pdf",
					filePath: wx.env.USER_DATA_PATH + "/新生手册.pdf",
					success: (event) => {
						uni.hideLoading();
						if (!this.abortTask) {
							wx.openDocument({
								filePath: wx.env.USER_DATA_PATH + "/新生手册.pdf",
								showMenu: true,
								fileType: "pdf"
							})
						}
						this.isDownloaded = true;
					},
					fail: (event) => {
						if (!this.abortTask) {
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
			cancelTask: function() {
				this.abortTask = true;
				this.$refs.progress.close();
			},
			openAdLink(link) {
			    if (link) {
			        uni.navigateTo({
						url: `/pages/adsAndActivityWebPage/webView?link=${encodeURIComponent(link)}`
			        });
			    }
			}
		}
	}
	import actBoxVue from '@/components/act-box/act-box.vue';
	import mainAdvertisementVue from '@/components/main-advertisement/main-advertisement.vue'
</script>

<style lang="scss">
	@import '@/static/iconfont/iconfont.css';

	#main {
		width: 100vw;
		overflow-x: hidden;
	}
	
	.background-image{
		background-image: url("https://7072-prod-9gip97mx4bfa32a3-1312104819.tcb.qcloud.la/asset/main/background.jpg");
		min-height: 40vh;min-width: 100vw;position: fixed;top:0;
		background-size: 100% 100%;
		z-index: 0;
	}

	.top-bar {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		z-index: 12;

		.top-icon {
			image {
				width: 100%;
				height: 100%;
			}
		}

		.top-text {
			margin-left: 5px;
		}
	}
	
	.background-image{
		background-image: url("https://7072-prod-9gip97mx4bfa32a3-1312104819.tcb.qcloud.la/asset/main/background.jpg");
		min-height: 40vh;min-width: 100vw;position: fixed;top:0;
		background-size: 100% 100%;
		z-index: 0;
	}
	
	.badger-button-box{
		width: 25vw;
		height: 20vw;
		padding: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		
		image{
			width: 10vw;
			height: 10vw;
		}
	}

	.top-bar {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		z-index: 12;

		.top-icon {
			image {
				width: 100%;
				height: 100%;
			}
		}

		.top-text {
			margin-left: 5px;
		}
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

	.function-box.whole {
		justify-content: space-around;
		align-items: center;
		background-color: $main-background-color-2;
		z-index: 10;
		
		.image-box{
			width: 40%;
			height: 65%;
		}
		.right-function-box {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 35%;
			height: 80%;
			
			.gradient-border {
			  border-bottom: 1px solid transparent;
			  border-image-slice: 1;
			  border-image-source: linear-gradient(90deg, #FFFFFF 0%, #7F0019 49.25%, #FFFFFF 100%);
			  width: 80%;
			  margin-bottom: 10%;
			}
			
			.badger-book-text {
				font-size: 10px;
				line-height: 24px;
				font-weight: 600;
			}

			.button {
				width: 100%;
				height: 25%;
				
				text{
					font-size: 8px;
					font-weight: 500;
					line-height: 24px;
				}

			}
		}
	}

	.function-box {
		flex-shrink: 0;
		height: 160px;
		width: 86vw;
		margin: 0 7vw 17px 7vw;
		justify-content: space-between;
		z-index: 10;

		.function-button {
			min-width: 47%;
			border-radius: 5px;
			background-color: $main-background-color-2;
			align-items: center;
			justify-content: center;
		}
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

	.disabled {
		color: #ccc !important;
	}

	.wx-progress-inner-bar {
		border-radius: 5px;
	}

	progress {
		flex: 1;
	}

	.ads-swiper-container {
	    width: 95vw;
	    height: 50vw;
	    margin-left: 2.5vw;
	    border-radius: 8px;
	    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
	    overflow: hidden;
	    position: relative;
	}
	
	.swiper {
	    width: 100%;
	    height: 100%;
	}
	
	.ad-image {
	    width: 100%;
	    height: 100%;
	    object-fit: cover; /* 确保图片按比例填满容器 */
	    border-radius: 8px;
	}
</style>