<template>
	<view class="user-product-box">
		<view class="content-box row-container">
			<view class="image-box">
				<image mode="aspectFill" class="photo" :src="product.images[0]"></image>
			</view>
			<view class="content">
				<view class="product-title">{{product.productTitle}}</view>
				<view class="row-container price-time">
					<view class="price">{{'$' + product.price}}</view>
					<view class="time" v-show="product.time!=0">{{this.productPublishTime}}</view>
				</view>
				<view class="is-takeoff" v-if="product.time == 0">已下架</view>
			</view>
		</view>
		<view class="row-container button-box">
			<view class="button row-container" @click="editMySecondhand()" v-if="product.time != 0">
				<view class="icon iconfont">&#xe646</view>
				<view class="button-text">编辑</view>
			</view>
			<view class="button row-container" @click="polishMySecondhand(1)" v-if="product.time != 0">
				<view class="icon iconfont">&#xe76f</view>
				<view class="button-text">擦亮</view>
			</view>
			<view class="button row-container" @click="takeoffMySecondhand()" v-if="product.time != 0">
				<view class="icon iconfont">&#xe620</view>
				<view class="button-text">下架</view>
			</view>
			<view class="button row-container" @click="polishMySecondhand(2)" v-if="product.time == 0">
				<view class="icon iconfont">&#xe64b</view>
				<view class="button-text">上架</view>
			</view>
			<view class="button row-container" @click="delet()" v-if="product.time != 0">
				<view class="icon iconfont">&#xe74b</view>
				<view class="button-text">删除</view>
			</view>
		</view>
	</view>
</template>

<script>
	import moment from "moment/min/moment-with-locales";
	import 'moment/locale/zh-cn';
	export default {
		props: ["product","index"],
		data() {
			return {
				productPublishTime:""
			};
		},
		mounted(){
			console.log(this.product)
			if(moment().year() - moment.utc(this.product.UTCtime).year() > 0){
				this.productPublishTime = moment.utc(this.product.UTCtime).format("YYYY-MM-DD");
			}else if(Date.now() - moment.utc(this.product.UTCtime).valueOf() > 86400000 * 7){
				this.productPublishTime = moment.utc(this.product.UTCtime).format("MM-DD");
			}else{
				this.productPublishTime = moment.utc(this.product.UTCtime).locale('zh-cn').fromNow();
			}
		},
		methods: {
			delet:function(){
				uni.showModal({
					title: '提示',
					content: '是否删除?删除后不可恢复',
					success: (res) => {
						if(res.confirm){
							this.deleteMySecondhand(this.product.productID);
						}
					}
				});
			},
			deleteMySecondhand: async function(productID) {
				uni.showLoading({
					mask:true
				})
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9gip97mx4bfa32a3',
					},
					path: `/user/deleteMySecondHand?productID=${this.product.productID}`,
					method: 'POST',
					header: {
						'X-WX-SERVICE': 'springboot-ds71',
					},
				});
				uni.hideLoading()
				if (res.data.status == 100) {
					uni.showToast({
						title: "成功删除",
					});
					uni.$emit("mySecondhandDelete",this.index)
				} else {
					uni.showToast({
						title: "删除失败",
						icon: "error"
					});
				}
			},
			polishMySecondhand: async function(index) {
				uni.showLoading({
					mask:true
				});
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9gip97mx4bfa32a3',
					},
					path: `/user/setProductTime?UTCtime=${moment.utc().format()}&productID=${this.product.productID}`,
					method: 'GET',
					header: {
						'X-WX-SERVICE': 'springboot-ds71',
					},
				});
				uni.hideLoading();
				if(index == 1){
					if (res.data.status == 100) {
						uni.showToast({
							title: "擦亮成功",
							icon: "success"
						})
						uni.$emit("mySecondhandRefresh",this.index);
					} else {
						uni.showToast({
							title: "擦亮失败",
							icon: "error"
						});
				}}
				if(index == 2){
					if (res.data.status == 100) {
						uni.showToast({
							title: "上架成功",
							icon: "success"
						});
						uni.$emit("mySecondhandRefresh",this.index);
					} else {
						uni.showToast({
							title: "上架失败",
							icon: "error"
						});
					}
				}
			},
			takeoffMySecondhand: async function() {
				uni.showLoading({
					mask:true
				});
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9gip97mx4bfa32a3',
					},
					path: `/user/setProductTime?UTCtime=1970-01-01T00:00:00Z&productID=${this.product.productID}`,
					method: 'GET',
					header: {
						'X-WX-SERVICE': 'springboot-ds71',
					},
				});
				uni.hideLoading();
				if (res.data.status == 100) {
					uni.showToast({
						title: "下架成功",
						icon: "success"
					});
					this.product.time = 0
				} else {
					uni.showToast({
						title: "下架失败",
						icon: "error"
					});
				}
			},
			editMySecondhand: async function() {
				uni.navigateTo({
					url: "../second/secondMainPost?product=" + encodeURIComponent(JSON.stringify(this.product))
				})
			},
		}
	}
</script>

<style>
	.user-product-box {
		min-height: 180px;
		width: 100%;
		height: 100%;
		padding: 15px 10px 10px 10px;
		background-color: white;
		position: relative;
	}

	.row-container {
		display: flex;
		flex-direction: row;
	}

	.my-secondhand {
		width: 100vw;
		height: 100vh;
		overflow-y: scroll;
		background-color: #e4e4e4;
	}

	.row-container {
		display: flex;
		flex-direction: row;
	}

	.my-product-box {
		border: 1px solid white;
		box-shadow: 0 3px 3px 0 #cbcbcb;
		width: 96vw;
		height: 180px;
		margin: 10px 2vw;
	}

	.button-box {
		height: 30%;
		width: 100%;
		margin: 5% 0 0 0;
	}

	.content-box {
		width: 100%;
		height: 70%;
	}

	.image-box {
		width: 30%;
		height: 100%;
		box-shadow: 0 3px 3px 0 #9b0000;
		overflow:hidden;

	}

	.photo {
		width: 100%;
		height: 100%;
	}

	.content {
		width: 70%;
		height: 100%;
	}

	.product-title {
		line-height: 20px;
		margin: 0px 15px 10px 15px;
		font-size: 18px;
		width: calc(100% - 20px);
		height: 40px;
		overflow: hidden;
		color: #1e1e1e;
		font-weight: 600;
	}

	.price-time {
		margin-top: 10px;
		width: calc(100% - 20px);
		height: calc(100% - 80px);
		margin-left: 15px;
	}

	.price {
		width: 30%;
		font-size: 20px;
		color: #9B0000;
	}

	.time {
		width: 70%;
		text-align: right;
		vertical-align: bottom;
		margin: 5px 0px 0px 0px;
		color: #7f7f7f;
	}

	.button {
		height: 50%;
		width: 20%;
		margin: 0 2.5% 0 2.5%;
		border-radius: 10px;
		border: 2px solid #9b0000;
		box-shadow: 0 2px 2px 0 #9b0000;
	}

	.button-text {
		text-align: center;
		color: #505050;
		font-weight: 550;
		height: 55%;
		font-size: 100%;
		width: 100%;
		height: 100%;
	}

	.icon {
		margin: 2px;
		font-size: 16px;
	}

	.is-takeoff {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 75%;
		background-color: rgba(34, 34, 34, 0.5);
		text-align: center;
		font-size: 50px;
		color: rgba(155, 0, 0, 0.5);
		border-radius: 10px 10px 0 0;
		border: 5px rgba(34, 34, 34, 0.5);
	}
</style>
