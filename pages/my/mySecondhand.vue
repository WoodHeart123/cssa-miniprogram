<template>
	<view class="my-secondhand">
		<view class="my-product-box" v-for="(product, index) in mySecondhand" :key="index">
			<userProductBoxVue :product="product" :index="index"></userProductBoxVue>
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
			uni.$on("uploadSecondSuccess", this.uploadSecondSuccess);
			uni.$on("mySecondhandDelete", this.delete);
			uni.$on("mySecondhandRefresh", this.refresh);
			this.userInfo = uni.getStorageSync('userInfo-2');
		},
		data() {
			return {
				show: false,
				offset: 0,
				limit: 20,
				status: "more",
				mySecondhand: [],
				product: [],
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多了"
				},
			}
		},
		components: {
			userProductBoxVue
		},
		onPullDownRefresh() {
			console.log(1)
			this.limit = 20;
			this.offset = 0;
			this.status = "more";
			this.mySecondhand = [];
			this.getMySecondhand();
		},
		methods: {
			delete: function(index) {
				this.mySecondhand.splice(index, 1);
			},
			uploadSecondSuccess: function() {
				uni.startPullDownRefresh();
				uni.showToast({
					title: "更新成功",
					duration: 5000,
				});
			},
			getMySecondhand: async function() {
				if (this.status == "noMore") {
					return;
				}
				this.status = "loading";
				const opts = {
					path: `/user/getMySecondhand?limit=${this.limit}&offset=${this.offset}`,
					type: 'GET',
				};
				requestAPI(opts).then(response => {
					if (response.data.status === 100) {
						if (response.data.data.length < this.limit) {
							this.status = "noMore";
						}
						response.data.data.forEach(item => {
							item.sellerAvatar = this.userInfo.avatar;
							item.sellerNickname = this.userInfo.nickname;
						});
						this.offset += this.limit;
						this.mySecondhand = this.mySecondhand.concat(response.data.data);
					}
				}).catch(error => {
					console.error("Error fetching my secondhand items:", error);
				});
				uni.stopPullDownRefresh();
			},
			refresh: function() {
				uni.startPullDownRefresh();
			},
		},
	}
	import moment from "moment/min/moment-with-locales";
	import 'moment/locale/zh-cn';
	import requestAPI from '@/api/request.js'
	import userProductBoxVue from '@/components/user-product-box/user-product-box.vue'
</script>

<style>
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
		border-radius: 10px;
	}
</style>