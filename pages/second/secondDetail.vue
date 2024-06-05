<template>
	<view class="second-detail">
		<swiper class="swiper" indicator-dots>
			<swiper-item style="display:flex;align-items: center;justify-content: center;"
				v-for="(image, index) in product.images" @click="previewImage">
				<image mode="heightFix" :src="image"></image>
			</swiper-item>
		</swiper>
		<view class="basic">
			<view class="price-box">
				<view class="row-container" style="align-items: center;">
					<view class="price"><text>{{"$" + product.price}}</text></view>
					<view class="row-container tag"><text>{{this.condition[product.productCondition]}}</text></view>
					<view class="row-container tag"><text>{{this.delivery[product.delivery]}}</text></view>
				</view>
			</view>
			<view class="second-name"><text>{{product.productTitle}}</text></view>
		</view>
		<view class="contact">
			<view class="contact-box">
				<img class="avatar"
					:src="'https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/' + product.sellerAvatar + '.jpg'">
				<text class="nickname">{{product.sellerNickname}}</text>
				<view class="copy-box"  @click="setClipboardData">
					<text>复制</text>
					<img class="copy-img" src="/static/fuzhi.png">
				</view>
			</view>
			<view class="weixin" v-show="this.isLogin">微信号：{{product.contact}}</view>
			<view class="contact-overlay" v-show="!this.isLogin">
				<button class="login-button" plain="true"
					@click="getUserProfile">点击登录可查看联系方式</button>
			</view>
		</view>
		<view class="description">
			<view class="scroll-page">
				<rich-text>
					{{product.productDescription}}
				</rich-text>
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
							title:'联系方式复制成功'
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
	import requestAPI from '@/api/request.js'
</script>

<style lang="scss">
	.second-detail {
		width: 100vw;
		height: 100vh;
		overflow-x: hidden;
	}

	#dollar-icon {
		font-size: 28px;
		color: #9B0000;
	}

	.save-icon {
		font-size: 25px;
		transition: all 0.5s;
	}

	.save-icon-selected {
		color: #FFDE03;
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

	.tag {
		padding: 2px 10px 2px 10px;
		font-size: 13px;
		margin-left: 10px;
		background-color: #9B0000;
		height: 25px;
		border-radius: 5px;
		color: #f5f5f5;
		align-items: center;
	}

	.type {
		display: inline;
	}

	.iconfont {
		font-size: 30px;
	}

	.price {
		font-size: 24px;
		line-height: 30px;
		font-weight: bold;
		color: #9B0000;
		margin-left: 5px;
	}

	.shoucang-box {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 50px;
		font-size: 11px;
		color: #999999;
		align-items: center;
		justify-content: center;
		margin-right: 10px;
	}

	.price-box {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		height: 40px;
	}

	.second-name {
		padding: 10px;
		font-size: 18px;
		font-weight: 700;
	}

	.basic {
		margin-bottom: 2vh;
		margin-top: 1vh;
		user-select: text;
	}

	.contact {
		position: relative;
		width: 90vw;
		height: 110px;
		margin-left: 5vw;
		box-shadow: 0 0px 6px 1px rgba(165, 165, 165, 0.2);
		border-radius: 5px;
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
	
	.contact-box {
		padding-top: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 50px;
		width: 100vw;
	}

	.avatar {
		height: 50px;
		width: 58.5px;
		border-radius: 50%;
		margin-left: 10px;
	}

	.nickname {
		margin-left: 15px;
		width: calc(100vw - 120px);
	}

	.copy-box {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 50px;
		font-size: 11px;
		color: #999999;
		align-items: center;
		justify-content: center;
		margin-right: 50px;
	}

	.copy-img {
		height: 30px;
		width: 30px;
	}

	.swiper {
		height: 500rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.description {
		margin-top: 10px;
	}

	.scroll-page {
		padding: 15px;
		width: calc(100% - 30px);
		line-height: 30px;
		font-size: 15px;
	}
</style>
