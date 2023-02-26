<template>
	<view class="my-secondhand">		
		<view class="my-product-box">
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
				</view>
			</view>
			<view class="row-container button-box">
				<view class="button row-container" @click= "">
					<view class="icon"></view>
					<view class="button-text">编辑</view>
				</view>
				<view class="button row-container">
					<view class="icon"></view>
					<view class="button-text">擦亮</view>
				</view>
				<view class="button row-container">
					<view class="icon"></view>
					<view class="button-text">下架</view>
				</view>
				<view class="button row-container">
					<view class="icon"></view>
					<view class="button-text">删除</view>
				</view>
			</view>
		</view>
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
				</view>
			</view>
			<view class="row-container button-box">
				<view class="button row-container" @click= "editMySecondhand(this.index)">
					<view class="icon"></view>
					<view class="button-text">编辑</view>
				</view>
				<view class="button row-container" @click= "polishMySecondhand(this.index)">
					<view class="icon"></view>
					<view class="button-text">擦亮</view>
				</view>
				<view class="button row-container" @click= "takeoffMySecondhand(this.index)">
					<view class="icon"></view>
					<view class="button-text">下架</view>
				</view>
				<view class="button row-container" @click= "deleteMySecondhand(this.product.productID)">
					<view class="icon"></view>
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
		},
		data() {
			return {
				show: false,
				offset: 0,
				limit: 20,
				status: "more",
				mySecondhand: [],
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多了"
				},
			}
		},
		methods: {
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
					path: `/user/deleteMySecondhand`,
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
			polishMySecondhand: async function(index) {
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
						title: "擦亮成功",
						icon: "success"
					});
				} else {
					uni.showToast({
						title: "擦亮失败",
						icon: "error"
					});
				}
			},
			takeoffMySecondhand: async function(index) {
				this.mySecondhand[index].time = moment(0);
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9gip97mx4bfa32a3',
					},
					path: `/user/updateSecondHand`,
					method: 'POST',
					header: {
						'X-WX-SERVICE': 'springboot-ds71',
					},
					data: this.mySecondhand
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
		}
	}
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
		height: calc(100% - 60px);
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
		height: 100%;
		width: 20%;
		margin: 0 2.5% 0 2.5%;
	}

	.button-text{
		padding: 0 5% 0 5%;
		border-radius: 10px;
		border: 2px solid #9b0000;
		box-shadow: 0 2px 2px 0 #9b0000;
		text-align: center;
		color: #505050;
		font-weight: 550;
		height:55%;
		font-size: 100%;
		width: 100%;
	}
	
	.icon {
		font-size: 100%;
	
	}
	

</style>
