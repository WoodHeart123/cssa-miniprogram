<template>
	<view class="act_detail">
		<swiper indicator-dots>
			<swiper-item>
				<image :src="actDetail.imgs"></image>
			</swiper-item>
		</swiper>
		<view class="basic">
			<view class="price">
				<text class="iconfont icon">&#xe70b;</text>
				<text class="new_price">{{actDetail.price * discount}}</text>
				<text v-if="show_price" class="original_price">{{actDetail.price}}</text>
			</view>
			<view class="act_name"><span>{{actDetail.title}}</span></view>
		</view>
		<view class="blank_line"></view>
		<view class="act_count">
			<view class="number">人数/上限：{{actDetail.userJoinedNum}}/{{actDetail.capacity}}</view>
		</view>
		<view class="blank_line"></view>
		<view class="act_count">
			<view class="number">活动开始时间：{{actDateFormat}}</view>
		</view>
		<view class="blank_line"></view>
		<view class="description">
			<view class="tit">详情介绍</view>
			<scroll-view class="scroll_page" scroll-y="true" :style="height">
				<view class="content">{{actDetail.description}}</view>
			</scroll-view>
		</view>
		<view class="act_buy">
			<uni-goods-nav v-if="enable" class="buy" :buttonGroup="buttonGroup" :options="options" fill="true" @buttonClick="toPay"></uni-goods-nav>
			<uni-goods-nav v-else class="buy" :buttonGroup="buttonGroup" :options="options" fill=true></uni-goods-nav>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show_price: false,
				remain: 0,
				discount: 0,
				distance_1: 0,
				distance_2: 0,
				height: "",
				sample: "hao",
				buttonGroup: [{
					text: '立即参加',
					backgroundColor: "#1684FC",
					color: '#fff'
				}],
				actDetail:{},
				userInfo:{},
				options: []
			}
		},
		onLoad(options) {
			this.actDetail = JSON.parse(decodeURIComponent(options.actDetail));
		},
		methods: {
			update_price() {
				if (this.userInfo.discount == 1) {
					this.discount = 1;
				} else {
					this.discount = this.userInfo.discount;
					this.show_price = true;
				}
			},
			update_number(){
				this.remain = this.actDetail.capacity - this.actDetail.userJoinedNum;
			},
			update_button(){
				if (this.userInfo.ifJoined) {
					this.buttonGroup[0].text = "已参加";
					this.buttonGroup[0].backgroundColor = "#A8A8A8";
					this.buttonGroup[0].color = "#101010";
					this.enable = false;
				} else if(this.remain == 0){
					this.buttonGroup[0].text = "人数已满";
					this.buttonGroup[0].backgroundColor = "#A8A8A8";
					this.buttonGroup[0].color = "#101010";
					this.enable = false;
				}
			},
			toPay(){
				uni.navigateTo({
					url: '/pages/activity/remark?actDetail=' + encodeURIComponent(JSON.stringify(this.actDetail)),
				});
			},
			async checkSignUp(){
				const res = await wx.cloud.callContainer({
				  config: {
				    env: 'prod-9go38k3y9fee3b2e', // 微信云托管的环境ID
				  },
				  path: '/activity/checksignup?actID=' + this.actDetail.actID +'&date=' + this.actDetail.date,
				  //path: '/activity/checksignup?actID=8&date=100',
				  method: 'GET', // 按照自己的业务开发，选择对应的方法
				  header: {
				    'X-WX-SERVICE': 'springboot-f8i8',
				  }
				});
			   this.userInfo = res.data.data;
			   this.update_number();
			   this.update_price();
			   this.update_button();
			}
		},
		mounted() {
			const query = uni.createSelectorQuery().in(this);
			let a = 0;
			query.select('.tit').boundingClientRect();
			query.select('.buy').boundingClientRect();
			query.exec((res) => {
				this.distance_1 = res[0].bottom;
				this.distance_2 = res[1].top;
				console.log(this.distance_2 - this.distance_1);
				this.height = "height: " + (this.distance_2 - this.distance_1) + "px;";
				console.log(this.height);
			});
			wx.cloud.init();
			this.checkSignUp();
		},
		computed: {
			actDateFormat() {
				return moment(this.actDetail.date).format("YYYY-MM-DD h:mm a");
			}
		},
	}
	import moment from 'moment';
</script>

<style>
@import "@/static/iconfont.css";
</style>
<style lang="scss">
	.icon{
		font-size:45rpx;
		font-weight:300;
	}
	.act_detail {
		swiper {
			height: 500rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.basic {
			padding: 10px;
			.price {
				display:flex;
				flex-direction: row;
				align-items: center;
				font-size: 30rpx;
				color: darkred;

				text:nth-child(3) {
					color: #ccc;
					font-size: 28rpx;
					text-decoration: line-through;
					margin-left: 20rpx;
				}
			}

			.act_name {
				font-size: 32rpx;
				line-height: 60rpx;
				font-weight: 600;
			}
		}

		.blank_line {
			height: 10rpx;
			width: 100%;
			background: #eee;
		}

		.number {
			padding: 0 10px;
			font-size: 32rpx;
			line-height: 50rpx;
		}

		.description {
			.tit {
				font-size: 32rpx;
				padding-left: 10px;
				border-bottom: 2px solid #eee;
				line-height: 70rpx;
			}

			.content {
				padding: 10px;
				font-size: 28rpx;
				color: #333;
			}
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
</style>
