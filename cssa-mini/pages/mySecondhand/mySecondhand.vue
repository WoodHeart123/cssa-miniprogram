<template>
	<view class="my-secondhand">
		<view class="hint">左划编辑/擦亮，右划删除/下架</view>
		<uni-swipe-action ref="swipeAction">
			<uni-swipe-action-item :left-options="options1" :right-options="options2" :show="(isOpened,index)"
				:auto-close="false" @change="change" @click="swipeClick($event, index)" v-for="(product, index) in mySecondhand"
				:key="index">
				<view class="content-box">
					<text>{{product.productTitle}}</text>
					<text>{{'$' + product.price}}</text>
				</view>
			</uni-swipe-action-item>
		</uni-swipe-action>
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
						success: this.deleteMySecondhand(this.mySecondhand.productID),
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
					this.editMySecondhand(this.mySecondhand)
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
			editMySecondhand: async function(product) {
				uni.navigateTo({
					url: "../second/secondEdit?product="+ encodeURIComponent(JSON.stringify(product))
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

	.box {
		width: 100vw;
		display: flex;
		flex-direction: row;

	}

	.right-bar {
		width: 8vw;
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.left-bar {
		width: 92vw;
	}

	.slot {
		width: 20vw;
		display: flex;
		flex-direction: column;
		height: 100%;
		background-color: white;
	}

	.slot-button {
		height: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #777;
	}

	.content-box {

		justify-content: center;
		height: 44px;
		line-height: 44px;
		padding: 0 15px;
		position: relative;
		background-color: #fff;
		border-bottom-color: #f5f5f5;
		border-bottom-width: 1px;
		border-bottom-style: solid;
	}
	
	.row-container {
		display: flex;
		flex-direction: row;
	
	}
</style>
