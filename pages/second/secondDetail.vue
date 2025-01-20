<template>
	<view class="second-detail">
		<top-bar text="物品信息" navigate-back position="fixed"></top-bar>
		<swiper class="swiper" indicator-dots>
			<swiper-item style="display:flex;align-items: center;justify-content: center;"
				v-for="(image, index) in product.images" @click="previewImage">
				<u--image mode="aspectFill" :src="image">
					<template v-slot:loading>
						<u-loading-icon color="red"></u-loading-icon>
					</template>
				</u--image>
			</swiper-item>
		</swiper>
		<view class="basic">
			<view class='time-box'><text class="paragraph-1 time-text">{{this.productPublishTime}}</text></view>
			<view class="title-box"><text class="heading-1">{{product.productTitle}}</text></view>
			<view class="price-box">
				<text class="heading-3 price-text">{{"$" + product.price}}</text>
			</view>
			<view class="tag-box">
				<view class="tag delivery-tag"><text style="color:white">{{this.delivery[product.delivery]}}</text></view>
				<view class='tag condition-tag'><text style="color:#7F0019">{{this.condition[product.productCondition]}}</text></view>
			</view>
			<view class="contact-box">
				<view class="avatar-box">
					<img class="avatar"
						:src="'https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/' + product.sellerAvatar + '.jpg'">
				</view>
					<view class="info-box">
						<view class="nickname-box"><text class="heading-3">{{product.sellerNickname}}</text></view>
						<view class="copy-box"  @click="setClipboardData">
							<view class="wechat-tag" v-show="this.isLogin">
								<uni-icons type="weixin" color="#FFFFFF"></uni-icons>
								<text style="margin-left: 5px;" class="paragraph-1">微信号</text>
								<text style="margin-left: 5px;" class="paragraph-1">{{product.contact}}</text>
							</view>
							<img style="margin-left: 5px;" class="copy-img" src="/static/fuzhi.svg">
						</view>
					</view>
				<view class="contact-overlay" v-show="!this.isLogin">
					<button class="login-button" plain="true"
						@click="getUserProfile">点击登录可查看联系方式</button>
				</view>
			</view>
			<view class="description">
				<view class="description-title">
					<text class="heading-3">物品描述</text>
				</view>
				<view class="scroll-page">
					<rich-text class="paragraph-1">
						{{product.productDescription}}
					</rich-text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isSaved: false,
				product: {},
				userInfo: {
					nickname: '小红豆',
					avatar: 1,
				},
				condition: {"NEW":'全新', "ALMOST_NEW":'几乎全新', 'USED':'明显使用痕迹', "IMPAIRED":'部分损毁'},
				delivery: {
					'pickup': '自取',
					'deliver': '送货',
					'all': '送/取',
				},
				collectProductList: [],
				isLogin: false,
				productPublishTime: ''
			}
		},
		onLoad(options) {
			wx.cloud.init();
			this.product = JSON.parse(decodeURIComponent(options.product));
			let launchOptions = wx.getLaunchOptionsSync()
			if(launchOptions.scene === 1007 || launchOptions.scene === 1154){
				uni.showLoading()
				const opts = {
					path: "/secondhand/getProduct?productID=" + encodeURI(this.product.productID),
					type: 'GET',
				};
				requestAPI(opts)
					.then(response => {
						this.product = response.data.data;
						console.log(response)
					})
					.catch(error => {
						console.error("failed to get new product info", error);
					});
				uni.hideLoading()
			}
			if (moment().year() - moment(this.product.time).year() > 0) {
				this.productPublishTime = moment(this.product.time).format("YYYY-MM-DD");
			} else if (Date.now() - moment(this.product.time).valueOf() > 86400000 * 7) {
				this.productPublishTime = moment(this.product.time).format("MM-DD");
			} else {
				this.productPublishTime = moment(this.product.time).locale('zh-cn').fromNow();
			}
		},

		onShow() {
			uni.getStorage({
				key: 'userInfo-2',
				success: (res) => {
					this.userInfo = res.data;
					this.isLogin = true;
				},
				fail: (res) => {
					this.isLogin = false;
				}
			});
			
			if(this.userInfo.savedProductJSON != null && this.userInfo.savedProductJSON.contains(this.product.productID)){
				this.isSaved = true;
			}
		},

		onShareTimeline() {
			return {
				title: "【出售】" + this.product.productTitle,
				imageUrl: this.product.images[0],
				path: '/pages/second/secondDetail?product=' + encodeURIComponent(JSON.stringify(this.product))
			}
		},

		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: "【出售】" + this.product.productTitle,
				desc: "CSSA二手交易平台",
				content: this.product.productType,
				imageUrl: this.product.images[0],
				path: '/pages/second/secondDetail?product=' + encodeURIComponent(JSON.stringify(this.product))
			}
		},
		
		beforeUnmount(){
			console.log("Happy!")
			uni.setStorageSync("userInfo-2",this.userInfo);
			if(this.isSaved == true){
				this.save();
			}
		},
		
		methods: {
			setClipboardData: function() {
				uni.setClipboardData({
					data: this.product.contact,
					success: (res) => {
						uni.showToast({
							icon:'none',
							title:'复制成功'
						})
					}
				});
			},
			getUserProfile: function() {
				uni.getUserProfile({
					desc: "获取用户昵称",
					success: (userProfile) => {
						this.login(userProfile.userInfo.nickName);
					},
				});
			},
			async login(nickname) {
				uni.showLoading()
				const opts = {
					path: "/user/login?nickname=" + encodeURI(nickname),
					type: 'GET',
				};
				requestAPI(opts)
					.then(response => {
						this.userInfo = res.data.data;
						this.isLogin = true;
						uni.setStorageSync("userInfo-2", response.data.data);
					})
					.catch(error => {
						console.error("Login request failed:", error);
					});
				uni.hideLoading();
			},
			previewImage: function() {
				wx.previewImage({
					current: this.product.images[0],
					urls: this.product.images
				});
			}
		}
	}
	import requestAPI from '@/api/request.js';
	import moment from "moment/min/moment-with-locales";
	import 'moment/locale/zh-cn';
</script>

<style lang="scss">
	.second-detail {
		width: 100vw;
		height: 100vh;
		overflow-x: hidden;
	}

	.weixin {
		margin: 10px 0 10vw 40px;
		color: dimgray;
		user-select: text;
	}

	.row-container {
		display: flex;
		flex-direction: row;
	}
	
	.tag-box{
		display: flex;
		flex-direction: row;
		
		.tag {
			height: 30px;
			line-height: 30px;
			padding: 1px 30px;
			text-align: center;
			font-size: 15px;
			border-radius: 20px;
			margin-right: 20px;
		}
		
		.tag.condition-tag{
			color: $main-primary-color;
			background-color: $main-background-color-2;
		}
		
		.tag.delivery-tag{
			background-color: $main-primary-color;
			color: $main-background-color-2;
		}
		
	}
	
	.time-box {
		
		.time-text{
			color: $shade-darker-gray;
		}
	}


	.title-box{
		margin-top: 5px;
	}

	


	.type {
		display: inline;
	}

	.iconfont {
		font-size: 30px;
	}

	.price {
		color: $main-primary-color!important;
	}

	.price-box {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		height: 40px;
		
		.price-text{
			color: $main-primary-color;
		}
	}

	.basic {
		padding: 20px;
		margin-bottom: 2vh;
		margin-top: 1vh;
		user-select: text;
	}

	.contact-box{
		display: flex;
		position: relative;
		margin-top: 20px;
		display: flex;
		flex-direction: row;
		align-items: center;
		width: calc(100vw - 40px);
		height: 120px;
		box-shadow: 0 0px 6px 1px rgba(165, 165, 165, 0.2);
		border-radius: 15px;
		background-color: $main-background-color-2;
		
		.avatar {
			height: 22vw;
			width: 22vw;
			border-radius: 50%;
			margin: 3vw;
		}
	}

	.contact-overlay {
		top: 0;
		position: absolute;
		height: 100%;
		width: 100%;
		background-color: rgba(139, 139, 139, 1.0);
		line-height: 110px;
		text-align: center;
		font-size: 30px;
		color: rgba(155, 0, 0, 0.5);
		border-radius: 5px;
		border: 5px rgba(34, 34, 34, 0.5);
	}

	.login-button {
		color: rgba(155, 0, 0, 0.5) !important;
		border: none !important;
		height: 100%;
		width: 100%;
		background-color: rgba(139, 139, 139, 1.0) !important;
		line-height: 100px;
	}
	


	.nickname-box {
		display: flex;
		align-items: center;
	}
	
	.info-box{
		height: 100%;
		display:flex;
		flex-direction: column;
		justify-content: center;
		padding-bottom: 10px;
	}

	.copy-box {
		display: flex;
		flex-direction: row;
		font-size: 11px;
		align-items: center;
		justify-content: center;
		margin-top: 15px;
		
		.wechat-tag{
			padding: 7px 10px;
			background-color: #9EC785;
			border-radius: 20px;
			
			text{
				color: $main-background-color-2 !important;
			}

		}
	}

	.copy-img {
		height: 30px;
		width: 30px;
	}

	.swiper {
		margin-top: 7vh;
		height: 500rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.description {
		margin-top: 20px;
		
		.description-title{
			border-bottom: 3px solid  $main-primary-color;
			width: fit-content;
			padding-bottom: 5px;
			border-radius: 2px;
		}
	}

	.scroll-page {
		margin-top: 20px;
		color: $shade-darker-gray;
	}
</style>
