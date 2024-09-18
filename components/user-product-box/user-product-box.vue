<template>
	<view class="user-product-box">
		<view class="content-box row-container">
			<view class="image-box">
				<image mode="aspectFill" class="photo" :src="product.images[0]"></image>
			</view>
			<view class="content" @click="toDetail">
				<view class="product-title">{{product.productTitle}}</view>
				<view class="row-container price-box">
					<view class="price">{{'$' + product.price}}</view>
				</view>
				<view class="is-takeoff" v-if="this.product.timestamp  == 0">已下架</view>
				<view class="row-container price-box">
					<view class="time" v-show="this.product.timestamp!=0">
						<span>发布时间：</span>
						<span style="color:#333">{{this.productPublishTime}}</span>
					</view>
				</view>
			</view>
		</view>
		<view class="row-container button-box">
			<view class="button row-container" @click="editMySecondhand()" v-if="this.product.timestamp != 0">
				<view class="icon iconfont">&#xe646</view>
				<view class="button-text">编辑</view>
			</view>
			<view class="button row-container" @click="polishMySecondhand(1)"
				v-if="this.product.timestamp != 0 && Date.now() - this.product.timestamp >= 43200000">
				<view class="icon iconfont">&#xe76f</view>
				<view class="button-text">擦亮</view>
			</view>
			<view class="button row-container" @click="takeoffMySecondhand" v-if="this.product.timestamp != 0">
				<view class="icon iconfont">&#xe620</view>
				<view class="button-text">下架</view>
			</view>
			<view class="button row-container" @click="polishMySecondhand(2)" v-if="this.product.timestamp == 0">
				<view class="icon iconfont">&#xe64b</view>
				<view class="button-text">上架</view>
			</view>
			<view class="button row-container" @click="deleteShow" v-if="this.product.timestamp != 0">
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
		props: ["product", "index"],
		data() {
			return {
				productPublishTime: ""
			};
		},
		mounted() {
			this.product.timestamp = moment(this.product.time).valueOf()
			if (moment().year() - moment(this.product.time).year() > 0) {
				this.productPublishTime = moment(this.product.time).format("YYYY-MM-DD");
			} else if (Date.now() - moment(this.product.time).valueOf() > 86400000 * 7) {
				this.productPublishTime = moment(this.product.time).format("MM-DD");
			} else {
				this.productPublishTime = moment(this.product.time).locale('zh-cn').fromNow();
			}
		},
		methods: {
			toDetail: function() {
				uni.navigateTo({
					url: '/pages/second/secondDetail?product=' + encodeURIComponent(JSON.stringify(this
						.product)),
				});
			},
			deleteShow: function() {
				uni.showModal({
					title: '提示',
					content: '是否删除?删除后不可恢复',
					success: (res) => {
						if (res.confirm) {
							this.deleteMySecondhand(this.product.productID);
						}
					}
				});
			},
			deleteMySecondhand: async function(productID) {
				uni.showLoading({
					mask: true
				})
				const opts = {
					path: `/user/deleteMyItem?itemID=${this.product.productID}&service=secondhand`,
					type: 'DELETE',
				};

				requestAPI(opts).then(res => {
					uni.hideLoading();
					if (res.data.status === 100) {
						uni.showToast({
							title: "成功删除"
						});
						uni.$emit("mySecondhandDelete", this.index);
					} else {
						uni.showToast({
							title: "删除失败",
							icon: "error"
						});
					}
				}).catch(error => {
					uni.hideLoading();
					console.error("Item deletion failed:", error);
					uni.showToast({
						title: "请求失败",
						icon: "error"
					});
				});
			},
			polishMySecondhand: async function(index) {
				uni.showLoading({
					mask: true
				});
				const opts = {
					path: `/user/setProductTime?UTCtime=${moment.utc().format()}&productID=${this.product.productID}&service=product`,
					type: 'GET',
				};

				requestAPI(opts).then(res => {
					uni.hideLoading();
					if (res.data.status === 100) {
						let toastTitle = index === 1 ? "擦亮成功" : "上架成功";
						uni.showToast({
							title: toastTitle,
							icon: "success"
						});
						uni.$emit("mySecondhandRefresh", this.index);
					} else {
						let toastTitle = index === 1 ? "擦亮失败" : "上架失败";
						uni.showToast({
							title: toastTitle,
							icon: "error"
						});
					}
				}).catch(error => {
					uni.hideLoading();
					console.error("Product time set failed:", error);
					uni.showToast({
						title: "请求失败",
						icon: "error"
					});
				});
			},
			takeoffMySecondhand: async function() {
				uni.showLoading({
					mask: true
				});
				const opts = {
					path: `/user/setProductTime?UTCtime=1970-01-01T00:00:00Z&productID=${this.product.productID}`,
					type: 'GET',
				};
				requestAPI(opts).then(res => {
					uni.hideLoading();
					if (res.data.status === 100) {
						uni.showToast({
							title: "下架成功",
							icon: "success"
						});
						this.product.time = 0;
					} else {
						uni.showToast({
							title: "下架失败",
							icon: "error"
						});
					}
				}).catch(error => {
					uni.hideLoading();
					console.error("Product time setting failed:", error);
					uni.showToast({
						title: "请求失败",
						icon: "error"
					});
				});
			},
			editMySecondhand: async function() {
				uni.navigateTo({
					url: "../second/secondMainPost?product=" + encodeURIComponent(JSON.stringify(this.product))
				})
			},
		}
	}
	import requestAPI from '@/api/request.js'
</script>

<style>
	.user-product-box {
		min-height: 180px;
		width: 100%;
		height: 100%;
		padding: 15px 10px 10px 10px;
		background-color: white;
		position: relative;
		border-radius: 10px;
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
		overflow: hidden;

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

	.price-box {
		position: relative;
		margin-top: 2px;
		width: calc(100% - 20px);
		height: calc(100% - 80px);
		margin-left: 15px;
	}

	.price {
		font-size: 20px;
		color: #9B0000;
	}

	.time {
		position: absolute;
		right: 0;
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
		background-color: rgba(34, 34, 34, 0.7);
		text-align: center;
		line-height: 120px;
		font-size: 50px;
		color: rgba(155, 155, 155, 0.5);
		border-radius: 10px 10px 0 0;
		border: 5px rgba(34, 34, 34, 0.5);
	}
</style>