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
				<text v-if="this.actDetail.price != 0" class="new_price">{{this.userInfo.ifJoined?actDetail.price:Math.round(actDetail.price * discount)}}</text>
				<text v-if="this.actDetail.price == 0" class="new_price">免费</text>
				<text v-if="show_price&&!userInfo.ifJoined" class="original_price">{{actDetail.price}}</text>
			</view>
			<view class="act_name"><span>{{actDetail.title}}</span></view>
		</view>
		<view class="blank_line"></view>
		<view class="act_count" v-if="!this.userInfo.ifJoined">
			<view class="number">人数/上限：{{actDetail.userJoinedNum}}/{{actDetail.capacity}}</view>
		</view>
		<view class="blank_line"></view>
		<view class="act_count">
			<view class="number">活动开始时间：{{actDateFormat}}</view>
		</view>
		<view class="blank_line"></view>
		<view class="act_count">
			<view class="number">报名截止时间：{{endDateFormat}}</view>
		</view>
		<view class="blank_line"></view>
		<view class="description">
			<view class="tit">详情介绍</view>
			<scroll-view class="scroll_page" scroll-y="true" :style="height">
				<rich-text :nodes="actDetail.description" class="content">{{actDetail.description}}</rich-text>
			</scroll-view>
		</view>
		<view class="act_buy">
			<uni-goods-nav class="buy" :buttonGroup="buttonGroup" :options="options" fill="true" @buttonClick="toPay"></uni-goods-nav>
		</view>
		<loading :show="loadShow"></loading>
	</view>
</template>

<script>
	export default {
		 onShareAppMessage(res) {
		    if (res.from === 'button') {// 来自页面内分享按钮
		      console.log(res.target)
		    }
		    return {
		      title: this.actDetail.title,
		      path: '/pages/detail/detail?actDetail=' + encodeURIComponent(JSON.stringify(this.actDetail)),
		    }
		  },
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
				options: [],
				enable:false,
				show:false,
				loadShow:false,
				
			}
		},
		onLoad(options) {
			this.actDetail = JSON.parse(decodeURIComponent(options.actDetail));
			console.log(this.actDetail);
			this.update_number();
			for(let i = 0;i < this.actDetail.additionalInfo.length;i++){
				if(this.actDetail.additionalInfo[i].type == "select"){
					this.actDetail.additionalInfo[i].index = 0;
					this.actDetail.additionalInfo[i].value = this.actDetail.additionalInfo[i].options[0];
				}
			}
		},
		methods: {
			update_price() {
				if (this.userInfo.discount == 1 || this.actDetail.price == 0) {
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
					this.buttonGroup[0].text = "已参加/查看付款方式";
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
				if(this.userInfo.ifJoined){
					uni.navigateTo({
						url: '/pages/activity/finished',
					});
				}
				else if(this.remain != 0 && this.actDetail.additionalInfo.length == 0){
					this.register();
				}
				else if(this.remain != 0){
					this.actDetail.payment = Math.floor(this.actDetail.price * this.discount);
					uni.navigateTo({
						url: '/pages/activity/remark?actDetail=' + encodeURIComponent(JSON.stringify(this.actDetail)),
					});
				}else{
					uni.showToast({
						title:"人数已满"
					})
				}
			},
			async checkSignUp(){
				const res = await wx.cloud.callContainer({
				  config: {
				    env: 'prod-9go38k3y9fee3b2e', // 微信云托管的环境ID
				  },
				  path: '/activity/checksignup?actID=' + this.actDetail.actID +'&date=0',
				  method: 'GET', // 按照自己的业务开发，选择对应的方法
				  header: {
				    'X-WX-SERVICE': 'springboot-f8i8',
				  }
				});
			   this.userInfo = res.data.data;
			   this.update_number();
			   this.update_price();
			   this.update_button();
			},
			async register(){
				this.loadShow = true;
				let bodyData = {
					actId: this.actDetail.actID,
					response: [],
					payment: 0,
				};
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9go38k3y9fee3b2e', // 微信云托管的环境ID
					},
					path: '/activity/register',
					method: 'POST', 
					header: {
						'X-WX-SERVICE': 'springboot-f8i8',
					},
					data: bodyData
				});
				this.loadShow = true;
				if(res.data.status == 100){
					uni.reLaunch({
						url: '/pages/activity/finished',
					});
				}else{
					uni.showToast({title:res.data.message});
				}
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
				this.height = "height: " + (this.distance_2 - this.distance_1 - 20) + "px;";
				console.log(this.height);
			});
			wx.cloud.init();
			this.checkSignUp();
		},
		computed: {
			actDateFormat() {
				return moment(this.actDetail.startDate).format("YYYY-MM-DD h:mm a");
			},
			endDateFormat(){
				return moment(this.actDetail.endDate).format("YYYY-MM-DD h:mm a");
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
				
				.new_price{
					line-height: 30rpx;
					font-size:30rpx;
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
			
			.scroll_page{
				padding: 10px;
				width:calc(100% - 20px);
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
