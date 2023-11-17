<template>
	<view class="act_detail">
		<view class="privacy" v-show="showPrivacy">
			<view class="privacy-content">
				<view class="privacy-title">隐私保护指引</view>
				<view class="des">
					在使用当前小程序服务之前，请仔细阅读
					<text class="link" @click="handleOpenPrivacyContract">《麦屯小助手小程序隐私保护指引》</text>。如你同意《麦屯小助手小程序隐私保护指引》，请点击“同意”开始使用。
				</view>
				<view class="btns">
					<button class="item reject" @click="exitMiniProgram">拒绝</button>
					<button id="agree-btn" class="item agree" open-type="agreePrivacyAuthorization" @click="handleAgreePrivacyAuthorization">同意</button>
				</view>
			</view>
		</view>
		<swiper class="swiper-container" indicator-dots>
			<swiper-item v-for="(image_url, index) in this.actDetail.images" :key="index">
				<image mode="widthFix" :src="image_url" @click="toPreview(index)"></image>
			</swiper-item>
		</swiper>
		<view class="content-box"> 
			<view class="price">
				<text v-if="this.actDetail.price != 0" class="dollar-sign">$</text><text v-if="this.actDetail.price != 0" class="new-price">{{actDetail.price}}</text>
				<text v-if="this.actDetail.price == 0" class="new-price">免费</text>
			</view>
			<view class="act-count">
				<view class="number">{{actDetail.userJoinedNum}}/{{actDetail.capacity}}</view>
			</view>
			<view class="weekday-box">
				<view class="weekday">{{startDateWeekDay}}</view>
				<view class="date">{{startDateFormat}}</view>
			</view>
			<view class="info-box">
				<view class="title">{{this.actDetail.title}}</view>
			<div class="icon-row">
				<text class="iconfont icon">&#xe65e;</text>
				<text class="font-small" style="margin-left: 3px;">{{this.actDetail.location}}</text>
			</div>
			<div class="icon-row">
				<text class="iconfont icon" style="font-size: 13px;margin-left: 1px;">&#xe8c5;</text>
				<text class="font-small" style="margin-left: 3px;">{{actDateDurationFormat}}</text>
			</div>
			</view>
		</view>
		<view class="description">
			<rich-text :nodes="actDetail.description" class="content">{{actDetail.description}}</rich-text>
		</view>
		<view class="act_buy">
			<uni-goods-nav class="buy" :buttonGroup="buttonGroup" :options="options" fill="true"
				@buttonClick="toPay"></uni-goods-nav>
		</view>
	</view>
</template>

<script>
	export default {
		onShareTimeline(res) {
			return {
				title: "CSSA邀请你参加" + this.actDetail.title,
				imageUrl: this.actDetail.images[0],
				path: '/pages/detail/detail?actDetail=' + encodeURIComponent(JSON.stringify(this.actDetail)),
			}
		},
		onShareAppMessage(res) {
			return {
				title: "CSSA邀请你参加" + this.actDetail.title,
				desc: "CSSA" + this.actDetail.title + "活动报名",
				content: "活动",
				imageUrl: this.actDetail.images[0],
				path: '/pages/detail/detail?actDetail=' + encodeURIComponent(JSON.stringify(this.actDetail))
			}
		},
		data() {
			return {
				buttonGroup: [{
					text: '立即参加',
					backgroundColor: "#1684FC",
					color: '#fff'
				}],
				actDetail: {},
				signupInfo: {},
				options: [],
				isLogin: false,
				weekday: ["", "周一","周二","周三","周四","周五","周六","周天"],
				showPrivacy: false,
				needPrivacy: false,
			}
		},
		onLoad(options) {
			this.actDetail = JSON.parse(decodeURIComponent(options.actDetail));
			console.log(this.actDetail.additionalInfoJSON)
			this.actDetail.additonalInfo = JSON.parse(this.actDetail.additionalInfoJSON);
			wx.cloud.init();
			uni.setNavigationBarTitle({
				title: this.actDetail.title
			})
			uni.getStorage({
				key: 'userInfo-2',
				success: (res) => {
					this.isLogin = true;
					this.checkSignUp()
				},
				fail: () => {
					this.isLogin = false;
					this.updateButton()
				},
			});
			wx.onNeedPrivacyAuthorization((resolve, eventInfo) => {
				  this.showPrivacy = true;
			      this.resolvePrivacyAuthorization = resolve
			})
		},
		methods: {
			handleAgreePrivacyAuthorization: function(){
				this.showPrivacy = false;
				this.needPrivacy = false;
				this.toPay()
			},
			handleOpenPrivacyContract: function(){
				 wx.openPrivacyContract()
			},
			toPreview: function(index) {
				wx.previewImage({
					current: this.actDetail.images[index],
					urls: this.actDetail.images
				});
			},
			updateButton() {
				console.log(this.isLogin)
				this.buttonGroup = [{
					text: '立即参加',
					backgroundColor: "#1684FC",
					color: '#fff'
				}];
				if(!this.isLogin){
					this.buttonGroup[0].text = "登录";
				}else if (this.signupInfo.ifJoined && Object.keys(this.actDetail.additonalInfo) === 0) {
					this.buttonGroup[0].text = "已参加";
					this.buttonGroup[0].backgroundColor = "#A8A8A8";
					this.buttonGroup[0].color = "#101010";
				}else if(this.signupInfo.ifJoined && Object.keys(this.actDetail.additonalInfo) !== 0){
					this.buttonGroup[0].text = "修改报名"
					this.buttonGroup.push({
						text: "取消报名",
						backgroundColor: "#9b0000",
						color: "#fff"
					})
				} else if (this.actDetail.capacity - this.actDetail.userJoinedNum <= 0) {
					this.buttonGroup[0].text = "人数已满";
					this.buttonGroup[0].backgroundColor = "#A8A8A8";
					this.buttonGroup[0].color = "#101010";
					this.enable = false;
				}
			},
			toPay(index) {
				const remain = this.actDetail.capacity - this.actDetail.userJoinedNum;
				if(!this.isLogin){
					if(this.needPrivacy === true){
						this.showPrivacy = true;
						return;
					}
					wx.getUserProfile({
						desc: "获取用户昵称",
						success: (userProfile) => {
							uni.showLoading({
								title: "正在登录"
							})
							this.login(userProfile.userInfo.nickName);
						},
					});
				}else if (this.signupInfo.ifJoined && this.actDetail.additionalInfoJSON === '{}') {
					uni.showToast({
						title: "您已报名该活动",
					})
				}else if(this.signupInfo.ifJoined && this.actDetail.additionalInfoJSON !== '{}'){
					console.log(index);
					if(index.index === 0){
						uni.navigateTo({
							url: `/pages/activity/remark?actDetail=${encodeURIComponent(JSON.stringify(this.actDetail))}&signupInfo=${encodeURIComponent(JSON.stringify(this.signupInfo))}`,
						});
					}else{
						uni.showModal({
							title: "取消报名",
							content: "您是否确认取消活动报名。",
							success: (res) => {
								if(res.confirm){
									this.cancelRegister()
								}
							}
						})	
					}
				} else if (remain != 0 && this.actDetail.additionalInfoJSON === '{}') {
					this.register();
				} else if (remain != 0) {
					uni.navigateTo({
						url: `/pages/activity/remark?actDetail=${encodeURIComponent(JSON.stringify(this.actDetail))}&signupInfo=${encodeURIComponent(JSON.stringify(this.signupInfo))}`,
					});
				} else {
					uni.showToast({
						title: "人数已满"
					})
				}
			},
			async login(nickname = "微信用户") {
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9gip97mx4bfa32a3',
					},
					path: "/user/login?nickname=" + encodeURI(nickname),
					method: 'GET',
					header: {
						'X-WX-SERVICE': 'springboot-ds71',
					}
				});
				this.isLogin = true;
				uni.setStorageSync("userInfo-2", res.data.data);
				this.updateButton()
				uni.hideLoading()
			},
			async cancelRegister(){
				uni.showLoading({
					mask: true,
					title: "取消中"
				})
				const res = await requestAPI({
					path: `/activity/register/${this.actDetail.id}`,
					type: "DELETE"
				})
				if(res.data&&res.data.status === 100){
					this.signupInfo.ifJoined = false;
					uni.showToast({
						icon: "success",
						title: "取消成功"
					})
					this.updateButton()
				}else{
					uni.showToast({
						title: "取消失败",
						icon: "error"
					})
				}
				uni.hideLoading()
			},
			async checkSignUp() {
				uni.showLoading({
					title: "查询报名信息",
					mask: true
				})
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9gip97mx4bfa32a3', // 微信云托管的环境ID
					},
					path: `/activity/events/signup/${this.actDetail.id}`,
					method: 'GET', // 按照自己的业务开发，选择对应的方法
					header: {
						'X-WX-SERVICE': 'springboot-ds71',
					}
				});
				uni.hideLoading()
				this.signupInfo = res.data.data;
				this.updateButton();
			},
			async register() {
				uni.showLoading({
					title: "记录报名信息中",
					mask: true,
				});

				let bodyData = {
					actID: this.actDetail.id,
					responseJSON: "{}",
				};
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9gip97mx4bfa32a3', // 微信云托管的环境ID
					},
					path: '/activity/register',
					method: 'POST',
					header: {
						'X-WX-SERVICE': 'springboot-ds71',
					},
					data: bodyData
				});
				uni.hideLoading()
				if (res.data.status == 100) {
					uni.reLaunch({
						url: '/pages/activity/finished?actDetail=' + encodeURIComponent(JSON.stringify(this.actDetail)),
					});
				} else {
					uni.showToast({
						title: res.data.message
					});
				}
			}
		},
		computed: {
			startDateFormat() {
				return moment(this.actDetail.startDate).format("MM月DD号");
			},
			actDateDurationFormat() {
				return moment(this.actDetail.startDate).format("MM-DD ") + this.weekday[moment(this.actDetail.startDate).isoWeekday()] + moment(this.actDetail.startDate).format(" HH:MM - ") + moment(this.actDetail.endDate).format("HH:MM");
			},
			startDateWeekDay(){
				return this.weekday[moment(this.actDetail.startDate).isoWeekday()]
			}
		},
	}
	import moment from 'moment';
	import requestAPI from '@/api/request.js'
</script>

<style>
	@import '@/static/iconfont/iconfont.css';
</style>
<style lang="scss">
	
	.content-box{
		width: 100vw;
		height: 100px;
		padding: 10px;
		display: flex;
		flex-direction: row;
		position: relative;
		
		.act-count {
			position: absolute;
			font-size: 12px;
			color: #ccc;
			right: 5px;
			bottom: 0px;
		}
		
		.price{
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			font-size: 28px;
			top: 10px;
			color: #9b0000;
			right:5px;
			font-weight: 700;
			
			.dollar-sign{
				font-size: 18px;
				margin-top: 3px;
			}
		}
		
		.weekday-box{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 25%;
			border-right: 1px black dotted;
			
			.weekday{
				font-size: 18px;
				font-weight: 700;
			}
			
			.date{
				font-size: 12px;
				color: #999;
				margin-top: 3px;
			}
		}
		
		.info-box{
			display: flex;
			flex-direction: column;
			width: 72%;
			margin-left: 3%;
			justify-content: center;
			
			.title{
				font-size: 18px;
				font-weight: 700;
			}
			
			.icon-row{
				display: flex;
				flex-direction: row;
				margin: 7px 0 0 0;
				line-height: 15px;
				.icon {
					color: #1684FC;
				}
				
				.font-small {
					font-size: 12px;
					color: #777;
				}				
			}

		}
	}

	.act_detail {
		swiper {
			overflow: auto !important;
			min-height: 50vh;
			max-height: 80vh;

			swiper-item {
				display: flex;
				justify-content: center;
			}
		}

		.countdown{
			padding: 10px;
			width: 100vw;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.basic {
			position: relative;
			display: flex;
			flex-direction: row;
			padding: 10px;
			align-items: center;

			.price {
				display: flex;
				flex-direction: row;
				align-items: center;
				font-size: 20px;

				font-weight: 700;
				margin-left: 5px;

				.new-price {
					font-size: 20px;
				}
			}

			.act-name {
				font-size: 30px;
				font-weight: 600;
			}
		}

		.act-time {
			padding: 0 15px 0 15px;
			font-size: 12px;
		}

		.blank-line {
			height: 10rpx;
			width: 100%;
			background: #eee;
		}


		.description {
			padding: 10px;
		}

		.act_buy {
			display: flex;
			flex-direction: column;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
		}
	}
	
	.privacy {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgba(0, 0, 0, .5);
		z-index: 9999999;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.privacy-content {
		width: 632rpx;
		min-height: 200px;
		padding: 48rpx;
		box-sizing: border-box;
		background: #fff;
		border-radius: 16rpx;
	}
	
	.privacy-content .privacy-title {
		text-align: center;
		color: #333;
		font-weight: bold;
		font-size: 32rpx;
	}
	
	.content .des {
		font-size: 26rpx;
		color: #666;
		margin-top: 40rpx;
		text-align: justify;
		line-height: 1.6;
	}
	
	.content .des .link {
		color: #07c160;
		text-decoration: underline;
	}
	
	.btns {
		margin-top: 48rpx;
		display: flex;
	}
	
	.btns .item {
		justify-content: space-between;
		width: 244rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 16rpx;
		box-sizing: border-box;
		border: none;
	}
	
	.btns .reject {
		background: #f4f4f5;
		color: #909399;
	}
	
	.btns .agree {
		background: #07c160;
		color: #fff;
	}
</style>