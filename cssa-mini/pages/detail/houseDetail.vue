<template>
	<view>
		<swiper class="swiper" indicator-dots>
			<swiper-item v-for="(image, index) in houseInfo.images">
				<image :src="image" @click="getImageIndex(index)"></image>
			</swiper-item>
		</swiper>
		<view class="basic">
			<view class="price-box">
				<view class="row-container" style="align-items: center;">
					<view class="row-container tag"><text>{{rentalTime}}</text></view>
				</view>
				<view class="shoucang-box">
					<text class="iconfont save-icon" :class="{'save-icon-selected' : isSaved}" @click="onClickSave()">&#xe6c9;</text>
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
				<view class="copy-box">
					<text>复制</text>
					<img class="copy-img" src="/static/fuzhi.png" @click="setClipboardData">
				</view>
			</view>
			<view class="weixin">微信号：{{houseInfo.contact}}</view>
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
				isSaved: false,
				sexContraintValue:["仅限男生","仅限女生","性别不限"],
				imageList: ["/static/housing.jpg", "/static/housing.jpg", "/static/housing.jpg"],
				houseInfo: {},
			}
		},
		
		onLoad(options){
			console.log(options);
			wx.cloud.init();
			this.houseInfo = JSON.parse(decodeURIComponent(options.rentalInfo));
			console.log(this.houseInfo);
			this.isSaved = true;
		},

	   	onShow() {
	   		uni.getStorage({
	   			key: 'userInfo-2',
				success: (res) => {
   					this.userInfo = res.data;
				},
	   			fail: () => {
	   				console.log("fail");
	   			},
	   		});
	   	},

		onShareTimeline() {
			return {
				title: this.houseInfo.name,
				imageUrl: "/static/renwu.jpeg",
				path: '/pages/detail/houseDetail?houseInfo=' + encodeURIComponent(JSON.stringify(this.houseInfo))
			}
		},

		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: this.houseInfo.name + ": $" + 1200,
				desc: "CSSA二手交易平台",
				content: "very happy",
				imageUrl: "/static/renwu.jpeg",
				path: '/pages/detail/housedDetail?houseInfo=' + encodeURIComponent(JSON.stringify(this.houseInfo))
			}
		},
		methods: {
			onClickSave:function(){
				if(!this.isSaved){
					this.save();
				}else{
					this.unsave();
				}
			},
			getImageIndex(index){
				console.log(index);
				uni.previewImage({
					current:this.houseInfo.imageList[index],
					urls:this.houseInfo.imageList,
				})
			},
			
			setClipboardData: function() {
				uni.setClipboardData({
					data: this.houseInfo.contact[0],
					success: (res) => {
						uni.showToast({
							icon:'none',
							title:'微信号复制成功'
						})
					}
				});
			},
			async save(){
				console.log('success');
				this.isSaved = true;
				/*
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9go38k3y9fee3b2e', // 微信云托管的环境ID
					},
					path: '/secondhand/collect?productID='+this.product.productID,
					method: 'GET', 
					header: {
						'X-WX-SERVICE': 'springboot-f8i8',
					}
				});
				if(res.status == "101"){
					this.isSaved = True;
				}
				*/
			},
			async unsave(){
				console.log('success');
				this.isSaved = false;
			}
		},
		computed: {
			rentalTime(){
				return moment(this.houseInfo.rentalStartTime).format("YYYY-MM-DD") + " 至 " + moment(this.houseInfo.rentalEndTime).format("YYYY-MM-DD")
			}
		}
	}
</script>

<style lang="scss">
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
