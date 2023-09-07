<template>
	<view>
		<!-- 图片 -->
		<swiper class="swiper" indicator-dots>
			<swiper-item v-for="(image, index) in rideInfo.images">
				<image :src="image" @click="getImageIndex(index)"></image>
			</swiper-item>
		</swiper>
		
		<view class="basic">
			<!-- 标题：显示始发地和目的地 -->
			<view class="row-container title-box">
				<view class="ride-title">{{rideTrip}}</view>
			</view>
			<!-- 时间栏 -->
			<view class = "time-box">
				<view class="row-container" style="align-items: center;">
					<view class="row-container tag"><text>{{rideTime}}</text></view>
				</view>
				<!-- 收藏 -->
				<view class="shoucang-box">
					<text class="iconfont save-icon" :class="{'save-icon-selected' : isSaved}" @click="onClickSave()">&#xe6c9;</text>
				</view>
			</view>
			<!-- 价格栏 -->
			<view class ="price-box">
				<view class = "iconfont" id="dollar-icon">&#xe70b;</view>
				<view class = "price"><text>{{rideInfo.price}}/人</text></view>
			</view>
			<!-- 车辆信息 -->
			<view class = "vehicle-box">
				<view class = "card text-box"> 
					<text>车辆品牌： {{rideInfo.make}}</text>
					<text>车辆牌照: {{ideInfo.plate}}</text>
					<!-- 如果有车辆型号信息，显示 -->
					<text v-show= "isModel">{{rideInfo.model}}</text>				
				</view>
			</view>
			<!-- 如果有其它描述信息，显示 -->
			<view class="description" v-show="isDescription">
				<view class="scroll-page">
					<rich-text> {{rideInfo.description}} </rich-text>
				</view>
			</view>
			<!-- 联系方式 -->
			<view class="contact">
				<view class="contact-box">
					<img class="avatar"
						:src="'https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/'+rideInfo.sellerAvatar+'.jpg'">
					<view class="copy-box">
						<text>复制</text>
						<img class="copy-img" src="/static/fuzhi.png" @click="setClipboardData">
					</view>
				</view>
				<view class="weixin">微信号：{{rideInfo.contact}}</view>
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
				isModel: false,
				isDescription: false,
				rideInfo: {},
			}
		},
		onLoad(options){
			console.log(options);
			wx.cloud.init();
			this.rideInfo = JSON.parse(decodeURIComponent(options.rideInfo));
			console.log(this.houseInfo);
			if (this.houseInfo.model != "") this.isModel = true
			if (this.rideInfo.isDescription != "") this.isDescription = true
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
				title: rideTrip(),
				imageUrl: "/static/renwu.jpeg",
				path: '/pages/detail/rideDetail?rideInfo=' + encodeURIComponent(JSON.stringify(this.rideInfo))
			}
		},
		
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: rideTrip() + " " + rideTime()+ this.rideInfo.price + "/人。" ,
				desc: "CSSA二手交易平台",
				content: "very happy",
				imageUrl: "/static/renwu.jpeg",
				path: '/pages/detail/rideDetail?rideInfo=' + encodeURIComponent(JSON.stringify(this.rideInfo))
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
					current:this.rideInfo.imageList[index],
					urls:this.rideInfo.imageList,
				})
			},
			async save(){
				console.log('success');
				this.isSaved = true;
			},
			async unsave(){
				console.log('success');
				this.isSaved = false;
			}
		},
		
		computed:{
			rideTrip(){
				return "从 " + this.rideInfo.orign + " 至 " + this.ideInfo.destination
			},
			rideTime(){
				return moment(this.rideInfo.dateAndTime).format()
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