<template>
	<view class="my-secondhand">
			<!-- <view class="my-product-box">
					<view class="content-box row-container">
						<view class="image-box">
							<image src="../../static/bg.png"></image>
						</view>
						<view class="content">
							<view class="product-title">你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好</view>
							<view class="row-container price-time">
								<view class="price">￥123</view>
								<view class="time">一个月前</view>
							</view>
							<view class="is-takeoff">已下架</view>
						</view>
					</view>
					<view class="row-container button-box">
						<view class="button row-container">
							<view class="iconfont icon">&#xe646</view>
							<view class="button-text">编辑</view>
						</view>
						<view class="button row-container">
							<view class="iconfont icon">&#xe76f</view>
							<view class="button-text">擦亮</view>
						</view>
						<view class="button row-container">
							<view class="iconfont icon">&#xe620</view>
							<view class="button-text">下架</view>
						</view>
						<view class="button row-container">
							<view class="iconfont icon">&#xe74b</view>
							<view class="button-text">删除</view>
						</view>
					</view>
				</view> -->
		<view class="my-product-box" v-for="(product, index) in mySecondhand" :key="index">
			<view class="content-box row-container">
				<view class="image-box">
					<image :src="product.images[0]"></image>
				</view>
				<view class="content">
					<view class="product-title">{{product.productTitle}}</view>
					<view class="row-container price-time">
						<view class="price">{{'$' + product.price}}</view>
						<view class="time">{{computeProductTime}}</view>
					</view>
					<view class="is-takeoff" v-if="product.time == 0">已下架</view>
				</view>
			</view>
			<view class="row-container button-box">
				<view class="button row-container" @click= "editMySecondhand(index)">
					<view class="icon iconfont">&#xe646</view>
					<view class="button-text">编辑</view>
				</view>
				<view class="button row-container" @click= "polishMySecondhand(index, 1)" >
					<view class="icon iconfont">&#xe76f</view>
					<view class="button-text">擦亮</view>
				</view>
				<view class="button row-container" @click= "takeoffMySecondhand(index)"  v-if="product.time != 0">
					<view class="icon iconfont">&#xe620</view>
					<view class="button-text">下架</view>
				</view>
				<view class="button row-container" @click= "polishMySecondhand(index, 2)"  v-if="product.time == 0">
					<view class="icon iconfont">&#xe64b</view>
					<view class="button-text">上架</view>
				</view>
				<view class="button row-container" @click= "deleteMySecondhand(product.productID)" v-if="product.time != 0">
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
		onLoad() {},
		onShow() {
			this.getMySecondhand();
			uni.$on("uploadSecondSuccess",this.uploadSecondSuccess);
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
		methods: {
			uploadSecondSuccess:function(){
					this.refresh();
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
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9gip97mx4bfa32a3',
					},
					path: `/user/getMySecondhand?limit=${this.limit}&offset=${this.offset}`,
					method: 'GET',
					header: {
						'X-WX-SERVICE': 'springboot-ds71',
					},
				});
				if (res.data.status == 100) {
					if (res.data.data.length < this.limit) {
						this.status = "noMore";
					}
					this.offset = res.data.data[res.data.data.length - 1].productID;
				}
				this.mySecondhand = this.mySecondhand.concat(res.data.data);
			},
			deleteMySecondhand: async function(productID) {
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9gip97mx4bfa32a3',
					},
					path: `/user/deleteMySecondHand`,
					method: 'POST',
					header: {
						'X-WX-SERVICE': 'springboot-ds71',
					},
					data: this.productID
				});
				if (res.data.status == 100) {
					this.mySecondhand.splice(index, 1);
					uni.showToast({
						title: "成功删除",
					});
				} else {
					uni.showToast({
						title: "删除失败",
						icon: "error"
					});
				}
			},
			polishMySecondhand: async function(index, para) {
				this.mySecondhand[index].time = Date.now();
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9gip97mx4bfa32a3',
					},
					path: `/user/updateSecondHand`,
					method: 'POST',
					header: {
						'X-WX-SERVICE': 'springboot-ds71',
					},
					data: this.mySecondhand[index]
				});
				uni.hideLoading();
				if (res.data.status == 100) {
					if(para == 1){
						uni.showToast({
							title: "擦亮成功",
							icon: "success"
						})
					} else if(para == 2){
						uni.showToast({
							title: "上架成功",
							icon: "success"
						})
					};
				} else {
					uni.showToast({
						title: "擦亮失败",
						icon: "error"
					});
				}
			},
			takeoffMySecondhand: async function(index) {
				this.mySecondhand[index].time = 0;
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9gip97mx4bfa32a3',
					},
					path: `/user/updateSecondHand`,
					method: 'POST',
					header: {
						'X-WX-SERVICE': 'springboot-ds71',
					},
					data: this.mySecondhand[index]
				});
				uni.hideLoading();
				if (res.data.status == 100) {
					uni.showToast({
						title: "下架成功",
						icon: "success"
					});
					
				} else {
					uni.showToast({
						title: "下架失败",
						icon: "error"
					});
				}
			},
			editMySecondhand: async function(index) {
				uni.navigateTo({
					url: "../second/secondMainPost?product="+ encodeURIComponent(JSON.stringify(this.mySecondhand[index]))
				})
			},
		},
		computed: {
			computeProductTime() {
				moment.locale('zh-cn');
				return Date.now() - this.mySecondhand.time > 86400000 * 7 ? moment(this.mySecondhand.time).format("MM-DD") : moment(this.mySecondhand.time).fromNow();
			}
		},
	}
	import moment from "moment/min/moment-with-locales";
	import 'moment/locale/zh-cn';
</script>

<style>
	@import '@/static/iconfont/iconfont.css';

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
	
	.my-product-box{
		border: 1px solid white;
		box-shadow: 0 3px 3px 0 #cbcbcb;
		width: 96vw;
		height: 180px;
		margin: 10px 2vw;
		border-radius: 10px;
		padding: 15px 10px 10px 10px;
		background-color: white;
		position: relative;
	}
	
	.button-box{
		height: 30%;
		width: 100%;
		margin:5% 0 0 0;
	}
	.content-box{
		width: 100%;
		height: 70%;
	}
	.image-box{
		width: 30%;
		height: 100%;
		box-shadow: 0 3px 3px 0 #9b0000;
		
	}
	image{
		width: 100%;
		height: 100%;
	}
	.content{
		width: 70%;
		height: 100%;
	}
	.product-title{
		line-height: 20px;
		margin: 0px 15px 10px 15px;
		font-size: 18px;
		width: calc(100% - 20px);
		height: 40px;
		overflow: hidden;
		color: #505050;
	}
	.price-time{
		margin-top:10px;
		width: calc(100% - 20px);
		height: calc(100% - 80px);
		margin-left: 15px;
	}
	.price{
		width: 30%;
		font-size: 20px;
		color: #505050;
	}
	.time{
		width: 70%;
		text-align: right;
		vertical-align: bottom;
		margin: 5px 0px 0px 0px;
		color: #7f7f7f;
	}
	
	.button{
		height: 50%;
		width: 20%;
		margin: 0 2.5% 0 2.5%;
		border-radius: 10px;
		border: 2px solid #9b0000;
		box-shadow: 0 2px 2px 0 #9b0000;
	}

	.button-text{
		text-align: center;
		color: #505050;
		font-weight: 550;
		height:55%;
		font-size: 100%;
		width: 100%;
		height: 100%;
	}
	
	.icon {
		margin: 2px;
		font-size: 16px;
	}
	.is-takeoff{
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 75%;
		background-color: rgba(34,34,34,0.5);
		text-align: center;
		font-size: 50px;
		color: rgba(155,0,0,0.5);
		border-radius: 10px 10px 0 0;
		border: 5px rgba(34,34,34,0.5);
	}
	

</style>
