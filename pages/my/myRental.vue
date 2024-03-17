<template>
	<view class="my-rental">
		<view class="my-rental-box" v-for="(rental, index) in myRental" :key="index">
			<view class="my-rental-container">
				<rental-box-vue :rentalInfo="rental"></rental-box-vue>
				<view class="is-takeoff" v-if="rental.publishedTimestamp == 0">已下架</view>
			</view>
			<view class="row-container button-box">
				<view class="button row-container" @click="editMyRental(index)" v-if="rental.publishedTimestamp != 0">
					<view class="icon iconfont">&#xe646</view>
					<view class="button-text">编辑</view>
				</view>
				<view class="button row-container" @click="setRentalTime(index,0)" v-if="rental.publishedTimestamp != 0">
					<view class="icon iconfont">&#xe620</view>
					<view class="button-text">下架</view>
				</view>
				<view class="button row-container" @click="setRentalTime(index,1)" v-if="rental.publishedTimestamp == 0">
					<view class="icon iconfont">&#xe64b</view>
					<view class="button-text">上架</view>
				</view>
				<view class="button row-container" @click="deleteShow(index)" v-if="rental.publishedTimestamp != 0">
					<view class="icon iconfont">&#xe74b</view>
					<view class="button-text">删除</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="status" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	export default {
		onLoad() {
			uni.startPullDownRefresh();
		},
		onShow() {
			uni.$on("uploadRentalSuccess", this.uploadRentalSuccess);
			this.userInfo = uni.getStorageSync('userInfo-2');
		},
		data() {
			return {
				show: false,
				offset: 0,
				limit: 20,
				status: "more",
				myRental: [],
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多了"
				},
			}
		},
		components: {
			rentalBoxVue
		},
		onPullDownRefresh() {
			this.limit = 20;
			this.offset = 0;
			this.status = "more";
			this.myRental = [];
			this.getMyRental();
		},
		methods: {
			setRentalTime: async function(index, flag) {
				let UTCtime;
				flag == 0 ? UTCtime = "1970-01-01T00:00:00Z" : UTCtime = moment.utc().format();
				uni.showLoading({
					mask: true
				});
				const opts = {
					path: `/user/setTime?UTCtime=${UTCtime}&itemID=${this.myRental[index].rentalID}&service=rental`,
					type: 'GET',
				};

				requestAPI(opts).then(response => {
					uni.hideLoading();
					if (response.data.status === 100) {
						uni.showToast({
							title: "操作成功",
							icon: "success"
						});
						if (flag === 0) {
							this.myRental[index].publishedTime = 0;
						} else {
							this.myRental[index].publishedTime = moment().utc(UTCtime).valueOf();
						}
						this.myRental[index].UTCPublishedTime = UTCtime;
						console.log(this.myRental[index]);
					}
				}).catch(error => {
					uni.hideLoading();
					console.error("Set time operation failed:", error);
				});
			},
			deleteShow: function(index) {
				uni.showModal({
					title: '提示',
					content: '是否删除?删除后不可恢复',
					success: (res) => {
						if (res.confirm) {
							this.deleteMySecondhand(this.deleteMyRental(index));
						}
					}
				});
			},
			deleteMyRental: async function(index) {
				uni.showLoading({
					mask: true
				})
				const opts = {
					path: `/user/deleteMyItem?itemID=${encodeURI(this.myRental[index].rentalID)}&service=rental`,
					type: 'DELETE',
				};
				requestAPI(opts)
					.then(response => {
						uni.hideLoading();
						if (response.data && response.data.status === 100) {
							uni.showToast({
								title: "成功删除",
							});
							this.myRental.splice(index, 1);
							this.myRental = [...this.myRental];
							uni.startPullDownRefresh();
						} else {
							uni.showToast({
								title: "删除失败",
								icon: "error"
							});
						}
					})
					.catch(error => {
						uni.hideLoading();
						console.error("Failed to delete item:", error);
						uni.showToast({
							title: "请求错误",
							icon: "error"
						});
					});
			},
			uploadRentalSuccess: function() {
				uni.startPullDownRefresh();
				uni.showToast({
					title: "更新成功",
					duration: 5000,
				});
			},
			getMyRental: async function() {
				if (this.status == "noMore") {
					return;
				}
				this.status = "loading";
				const opts = {
					path: `/user/getMyList?limit=${encodeURI(this.limit)}&offset=${encodeURI(this.offset)}&service=rental`,
					type: 'GET',
				};
				requestAPI(opts).then(response => {
					if (response.data && response.data.status === 100) {
						if (response.data.data.length < this.limit) {
							this.status = "noMore";
						}
						this.offset += this.limit;
						response.data.data.forEach(item => {
							item.publishedTimestamp = moment(item.publishedTime).valueOf();
							item.sellerAvatar = this.userInfo.avatar;
							item.sellerNickname = this.userInfo.nickname;
						});
						this.myRental = this.myRental.concat(response.data.data);
					}
				}).catch(error => {
					console.error("Failed to fetch my rental list:", error);
				});
				uni.stopPullDownRefresh();
			},
			refresh: function() {
				uni.startPullDownRefresh();
			},
			editMyRental: async function(index) {
				uni.navigateTo({
					url: "pages/rentalPost/rentalPost?rental=" + encodeURIComponent(JSON.stringify(this
						.myRental[index]))
				})
			},
		},
	}
	import moment from "moment/min/moment-with-locales";
	import 'moment/locale/zh-cn';
	import requestAPI from '@/api/request.js'
	import rentalBoxVue from "@/components/rental-box/rental-box.vue"
</script>

<style>
	@import '@/static/iconfont/iconfont.css';

	.my-rental-container {
		height: 150px;
		width: 100%;
		position: relative;
	}

	.my-rental {
		width: 100vw;
		height: 100vh;
		overflow-y: scroll;
		background-color: #e4e4e4;
	}

	.row-container {
		display: flex;
		flex-direction: row;
	}

	.my-rental-box {
		border: 1px solid white;
		box-shadow: 0 3px 3px 0 #cbcbcb;
		width: 96vw;
		margin: 10px 2vw;
		border-radius: 10px;
		overflow: hidden;
	}

	.button-box {
		height: 50px;
		width: 96vw;
		align-items: center;
		background-color: white;
		justify-content: space-around;
	}

	.button {
		height: 50%;
		width: 20%;
		border-radius: 10px;
		border: 2px solid #9b0000;
		box-shadow: 0 2px 2px 0 #9b0000;
		align-items: center;
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
		width: 100%;
		height: 100%;
		background-color: rgba(34, 34, 34, 0.7);
		text-align: center;
		line-height: 120px;
		font-size: 50px;
		color: rgba(155, 155, 155, 0.5);
		border-radius: 10px 10px 0 0;
		border: 5px rgba(34, 34, 34, 0.5);
		z-index: 10;
	}
</style>