<template>
	<view class="my-secondhand">
<!-- 		<view class="hint">左划编辑/擦亮，右划删除/下架</view> -->
		<view class="my-product-box">
			<view class= "row-container">
				<view class="photo">
					<image src="../../static/aboutCSSA-p2.png"></image>
				</view>
				<view class="product-info">
					<view class="product-name">一只仓鼠</view>
					<view class="product-price">$35</view>
				</view>
			</view>
			<view class="button row-container">
				<view class="edit">编辑</view>
				<view class="polish">擦亮</view>
				<view class="takeoff">下架</view>
				<view class="delete">删除</view>
			</view>
		</view>
<!-- 		<uni-swipe-action ref="swipeAction">
			<uni-swipe-action-item :left-options="options1" :right-options="options2" :show="(isOpened,index)"
				:auto-close="false" @change="change" @click="swipeClick($event, index)" v-for="(product, index) in mySecondhand"
				:key="index">
				<view class="content-box">
					<text>{{product.productTitle}}</text>
					<text>{{'$' + product.price}}</text>
				</view>
			</uni-swipe-action-item>
		</uni-swipe-action> -->
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
				isOpened: 'none',
				options1: [{
						text: '编辑',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '擦亮',
						style: {
							backgroundColor: '#F56C6C'
						}
					}
				],
				options2: [{
						text: '删除',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '下架',
						style: {
							backgroundColor: '#F56C6C'
						}
					}
				],
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
			change(e) {
				this.isOpened = e;
				console.log('返回：', e);
			},
			setOpened() {
				if (this.isOpened === 'none') {
					this.isOpened = 'left';
					return;
				}
				if (this.isOpened === 'left') {
					this.isOpened = 'right';
					return;
				}
				if (this.isOpened === 'right') {
					this.isOpened = 'none';
					return;
				}
			},
			swipeClick(e, index) {
				let {
					content
				} = e;
				if (content.text === '删除') {//deleteMySecondhand
					uni.showModal({
						title: '提示',
						content: '是否删除',
						success: () => {this.deleteMySecondhand(this.mySecondhand[index].productID)},
					});
				} else if (content.text === '下架'){//takeoffMySecondhand
					uni.showModal({
						title: '提示',
						content: '是否下架',
						success: this.takeoffMySecondhand(this.mySecondhand),
					});
				} else if (content.text === '擦亮'){//polishMySecondhand
					uni.showModal({
						title: '提示',
						content: '是否擦亮',
						success: this.polishMySecondhand(this.mySecondhand),
					});
				} else if (content.text === '编辑'){//editMySecondhand
					this.editMySecondhand(index)
				}
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
			polishMySecondhand: async function(mySecondhand) {
				// this.mySecondhand.time = moment(now());
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
			takeoffMySecondhand: async function(mySecondhand) {
				this.mySecondhand.time = moment(0);
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
		components: {
			productBoxVue
		}
	}
	import productBoxVue from '@/components/product-box/product-box.vue'
import { now } from 'moment';
</script>

<style>
	@import '@/static/iconfont/iconfont.css';

	.my-secondhand {
		width: 100vw;
		height: 100vh;
		overflow-y: scroll;
		transition: all 3s ease;
	}

	.hint {
		position: fixed;
		top: 0;
		width: 100%;
		background-color: white;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		color: #ccc;
	}

	.row-container {
		display: flex;
		flex-direction: row;
	}
	
	.my-product-box{
		padding: 5%;
		background-color: white;
		width: 100%;
		height: 120px;
		margin: 10px 10px 10px 10px;
	}
	
	.photo{
		width: 80px;
		height: 80px;
		overflow: hidden;
	}
	.product-info{
		padding:5%;
	}
	
	.product-name{
		font-size: 20pt;
		font-weight: 600;
		
	}
	.product-price{
		font-size: 20pt;
	}
	.button{
		height: 40px;
	}
	.edit{
		padding:2%;
		width: 20%;
		margin: 5px 5px 5px 5px;
		background-color: royalblue;
	}
	.polish{
		padding:2%;
		width: 20%;
		margin: 5px 5px 5px 5px;
		background-color: greenyellow;
	}
	.takeoff{
		padding:2%;
		width: 20%;
		margin: 5px 5px 5px 5px;
		background-color: grey;
	}
	.delete{
		padding:2%;
		width: 20%;
		margin: 5px 5px 5px 5px;
		background-color: darkred;
	}
</style>
