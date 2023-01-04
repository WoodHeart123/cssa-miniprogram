<template>
	<view>
		<swiper class="swiper" indicator-dots>
			<swiper-item v-for="(image, index) in houseInfo.imageList">
				<image :src="image"></image>
			</swiper-item>
		</swiper>
		<view class="basic">
			<view class="price-box">
				<view class="row-container" style="align-items: center;">
					<view class="row-container tag"><text>{{houseInfo.time}}</text></view>
					<view class="row-container tag"><text>{{houseInfo.condition}}</text></view>
				</view>
				<view class="shoucang-box">
					<text class="iconfont save-icon" :class="{'save-icon-selected' : isSaved}" @click="onClickSave()">&#xe6c9;</text>
				</view>
			</view>
			<view class="row-container" style="margin-top: 5px; margin-left: 4px;">
				<view class="iconfont" id="dollar-icon">&#xe70b;</view>
				<view class="price"><text>{{houseInfo.price}}/m</text></view>
			</view>
			<view class="house-name"><text>{{houseInfo.name}}</text></view>
		</view>
		<view class="row-container">
			<view class="info-box"><text>女</text></view>
			<view class="info-box"><text>2B1B</text></view>
		</view>
		<view class="contact">
			<view class="contact-box">
				<img class="avatar"
					:src="'https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/' + 1 + '.jpg'">
				<text class="nickname">小红豆</text>
				<view class="copy-box">
					<text>复制</text>
					<img class="copy-img" src="/static/fuzhi.png" @click="setClipboardData">
				</view>
			</view>
			<view class="weixin">微信号：{{houseInfo.contact[0]}}</view>
		</view>
		<view class="description">
			<view class="scroll-page">
				<rich-text>
					{{houseInfo.content}}
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
				houseInfo: {
					price:1300,
					time:"2011.08-2012.12",
					name: "London Luxury Apartment",
					imageList: ["/static/housing.jpg", "/static/housing.jpg", "/static/housing.jpg"],
					type:"1B1B",
					condition:"有现房",
					contact: ["123456"],
					quantity: "几乎全新",
					content: "Beech Townhomes隶属于东兰辛当地大型公寓商DTN旗下。Beech Townhomes位于密歇根州的东兰辛，密歇根州立大学附近，拥有全新的一卧室和两卧室联排别墅。 公寓距离东兰辛市中心，夜生活场所，餐馆和购物场所仅有几个街区，步行即可抵达斯巴达体育场，布雷斯林中心和伊莱和艾迪斯博物馆。 别墅内有洗衣机和烘干机，生活便利。临近学校，可步行上课。"
				},
			}
		},
		
		/*
		onLoad(options){
			console.log(options);
			wx.cloud.init();
			this.houseInfo = JSON.parse(decodeURIComponent(options.houseInfo));
			console.log(this.houseInfo);
			save();
		},
		*/
	   
	   /*
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
	   		*/

		
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
				}
			},
			
			setClipboardData: function() {
				uni.setClipboardData({
					data: " 微信号: " + this.houseInfo.contact[0]
				});
			},
			
			async save(){
				console.log('success');
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
			}
		}
	}
</script>

<style lang="scss">
	#dollar-icon{
		font-size:28px;
		color: darkblue;
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
		background-color: #1e90ff;
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
		color: darkblue;
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
		padding: 15px;
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
