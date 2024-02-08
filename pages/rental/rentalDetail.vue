<template>
	<view class="house-detail">
		<swiper class="swiper" indicator-dots>
			<swiper-item style="display:flex;align-items: center;justify-content: center;" v-for="(image, index) in houseInfo.images" @click="previewImage">
				<image mode="heightFix" :src="image"></image>
			</swiper-item>
		</swiper>
		<view class="basic">
			<view class="price-box">
				<view class="row-container" style="align-items: center;">
					<view class="row-container tag"><text>{{rentalTime}}</text></view>
				</view>
			</view>
			<view class="row-container" style="margin-top: 5px; margin-left: 4px;">
				<view class="iconfont" id="dollar-icon">&#xe70b;</view>
				<view class="price"><text>{{houseInfo.price}}/m</text></view>
			</view>
			<view class="house-name"><text>{{houseInfo.location}}</text></view>
		</view>
		<view class="row-container">
			<view class="info-box"><text>{{sexContraintValue[this.houseInfo.sexConstraint]}}</text></view>
			<view class="info-box"><text>{{houseInfo.floorPlan}}</text></view>
		</view>
		<view class="contact">
			<view class="contact-box">
				<img class="avatar"
					:src="'https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/'+houseInfo.sellerAvatar+'.jpg'">
				<text class="nickname">{{houseInfo.sellerNickname}}</text>
				<view class="copy-box"  @click="copy">
					<text>复制</text>
					<img class="copy-img" src="/static/fuzhi.png">
				</view>
			</view>
			<view class="weixin">微信号：{{houseInfo.contact}}</view>
			<view class="contact-overlay" v-show="!this.isLogin">
				<button class="login-button" plain="true"
					@click="getUserProfile">点击登录可查看联系方式</button>
			</view>
		</view>
		<view class="description">
			<view class="scroll-page">
				<rich-text>
					{{houseInfo.description}}
				</rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	import moment from "moment/min/moment-with-locales";
	import 'moment/locale/zh-cn';
	export default {
		data() {
			return {
				sexContraintValue:["仅限男生","仅限女生","性别不限"],
				imageList: ["/static/housing.jpg", "/static/housing.jpg", "/static/housing.jpg"],
				houseInfo: {},
				isLogin:false,
			}
		},
		
		onLoad(options){
			wx.cloud.init();
			this.houseInfo = JSON.parse(decodeURIComponent(options.rentalInfo));
			console.log(this.houseInfo)
		},

	   	onShow() {
	   		uni.getStorage({
	   			key: 'userInfo-2',
				success: (res) => {
   					this.userInfo = res.data;
					this.isLogin = true;
				},
	   			fail: () => {
	   				console.log("fail");
	   			},
	   		});
	   	},

		onShareTimeline() {
			return {
				title: "【转租】" + this.houseInfo.location,
				imageUrl: this.houseInfo.images[0],
				path: '/pages/detail/houseDetail?rentalInfo=' + encodeURIComponent(JSON.stringify(this.houseInfo))
			}
		},

		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: "【转租】" + this.houseInfo.location,
				desc: "CSSA转租分享平台",
				content:"转租",
				imageUrl: this.houseInfo.images[0],
				path: '/pages/detail/housedDetail?rentalInfo=' + encodeURIComponent(JSON.stringify(this.houseInfo))
			}
		},
		methods: {
			
			copy: function() {
				console.log(this.houseInfo.contact)
				uni.setClipboardData({
					data: this.houseInfo.contact,
					success: (res) => {
						uni.showToast({
							icon:'none',
							title:'微信号复制成功'
						})
					},
					fail: (res) => {
						console.log(res);
					}
				});
			},
			previewImage: function(){
				wx.previewImage({
					current:this.houseInfo.images[0],
					urls:this.houseInfo.images
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
				uni.hideLoading()
			},
		},
		computed: {
			rentalTime(){
				return moment(this.houseInfo.rentalStartTime).format("YYYY-MM-DD") + " 至 " + moment(this.houseInfo.rentalEndTime).format("YYYY-MM-DD")
			}
		}
	}
	import requestAPI from '@/api/request.js'
</script>

<style lang="scss">
	.house-detail{
		width: 100vw;
		height: 100vh;
		overflow-x:hidden;
	}
	#dollar-icon{
		font-size:28px;
		color: #9b0000;
	}
	.save-icon{
		font-size: 25px;
		transition: all 0.5s;
	}
	.save-icon-selected{
		color:#FFDE03;
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
		background-color: #9b0000;
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
		color: #9b0000;
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

	.house-name {
		padding: 10px;
		font-size: 18px;
		font-weight: 700;
	}

	.basic {
		//margin-bottom: 2vh;
		margin-top: 1vh;
	}
	
	.contact{
		position: relative;
		width: 90vw;
		height: 110px;
		margin-left: 5vw;
		box-shadow: 0 0px 6px 1px rgba(165, 165, 165, 0.2);
		border-radius: 5px;
	}
	
	.contact-box {
		padding-top: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 50px;
		width: 100vw;
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
	
	.description{
		margin-top: 10px;
	}
	.scroll-page {
		padding-left: 15px;
		padding-top: 10px;
		padding-bottom: 15px;
		width: calc(100% - 30px);
		line-height: 30px;
		font-size: 15px;
	}
	.info-box{
		padding-top: 10px;
		padding-bottom: 10px;
		width: 50vw;
		//background-color: #FFDE03;
		text-align: center;
		margin-bottom: 15px;
		border: 1px solid #ACACAC;
	}
</style>
