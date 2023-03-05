<template>
	<view class="second-detail">
		<swiper class="swiper" indicator-dots>
			<swiper-item  style="display:flex;align-items: center;justify-content: center;" v-for="(image, index) in product.images" @click="previewImage">
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
<!-- 				<view class="shoucang-box">
					<text class="iconfont save-icon" :class="{'save-icon-selected' : isSaved}" @click="save">&#xe6c9;</text>
				</view> -->
			</view>
			<view class="second-name"><text>{{product.productTitle}}</text></view>
		</view>
		<view class="contact">
			<view class="contact-box">
				<img class="avatar"
					:src="'https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/' + product.sellerAvatar + '.jpg'">
				<text class="nickname">{{product.sellerNickname}}</text>
				<view class="copy-box">
					<text>复制</text>
					<img class="copy-img" src="/static/fuzhi.png" @click="setClipboardData">
				</view>
			</view>
			<view class="weixin">微信号：{{product.contact}}</view>
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
				isSaved:false,
				product: {},
				userInfo:{
					nickname:'小红豆',
					avatar:1,
				},
				condition: ['全新','几乎全新', '明显使用痕迹','部分损毁' ],
				delivery: {
					'pickup': '自取',
					'deliver': '送货',
					'all': '送/取',
				},
				collectProductList:[]
				
			}
		},	
		onLoad(options){
			wx.cloud.init();
			this.product = JSON.parse(decodeURIComponent(options.product));
			this.collectProductList = uni.getStorageSync("collectProductList");
			if(!this.collectProductList){
				this.getCollectList();
			}else{
				if(this.collectProductList.indexOf(this.product.productID) != -1){
					this.isSaved = true;
				}
			}
		},
	
		onShow() {
			uni.getStorage({
				key: 'userInfo-2',
				success: (res) => {
					this.userInfo = res.data;
				},
			});
		},
	   
		onShareTimeline() {
			return {
				title: this.product.productTitle,
				imageUrl: this.product.images[0],
				path: '/pages/detail/secondDetail?product=' + encodeURIComponent(JSON.stringify(this.product))
			}
		},

		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: this.product.productTitle + ": $" + this.product.price,
				desc: "CSSA二手交易平台",
				content: this.product.productType,
				imageUrl: this.product.images[0],
				path: '/pages/detail/secondDetail?product=' + encodeURIComponent(JSON.stringify(this.product))
			}
		},
		methods: {
			getCollectList:async function(){
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9gip97mx4bfa32a3', // 微信云托管的环境ID
					},
					path: `/user/getCollectID?collectType=SECONDHAND`,
					method: 'GET', 
					header: {
						'X-WX-SERVICE': 'springboot-ds71',
					}
				});
				if(res.data.status && res.data.status == 100){
					this.collectProductList = res.data.data;
					uni.setStorage({
						key:"collectProductList",
						data: this.collectProductList
					})
				}
			},
			setClipboardData: function() {
				uni.setClipboardData({
					data: " 微信号: " + this.product.contact
				});
			},			
			async save(){
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9gip97mx4bfa32a3', // 微信云托管的环境ID
					},
					path: `/user/collect?save=${!this.isSaved}`,
					method: 'POST', 
					header: {
						'X-WX-SERVICE': 'springboot-ds71',
					},
					data:{
						collectType:"SECONDHAND",
						contentID: this.product.productID
					}
				});
				if(res.data.status == "100"){
					this.isSaved = !this.isSaved;
					if(this.isSaved){
						this.collectProductList.push(this.product.productID)
						uni.showToast({
							mask:true,
							title:"收藏成功"
						})
					}else{
						this.collectProductList.splice(this.collectProductList.indexOf(this.product.productID), 1)
						uni.showToast({
							mask:true,
							title:"取消收藏成功"
						})
					}
					uni.setStorage({
						key:"collectProductList",
						data: this.collectProductList
					})
				}
			},			
			previewImage: function(){
				wx.previewImage({
					current:this.product.images[0],
					urls:this.product.images
				});
			}
		}
	}
</script>

<style lang="scss">
	.second-detail{
		width: 100vw;
		height: 100vh;
		overflow-x: hidden;
	}
	#dollar-icon{
		font-size:28px;
		color: #9B0000;
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
</style>
