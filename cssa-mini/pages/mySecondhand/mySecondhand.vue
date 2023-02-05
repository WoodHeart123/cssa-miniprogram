<template>
	<view class="my-secondhand">
		<view class="hint">向左划可修改或删除二手商品</view>
			<uni-swipe-action>
				<uni-swipe-action-item v-for="(product, index) in mySecondHand" :key="index">
					<view class="box">
						<view class="left-bar">
							<productBoxVue :product="product" user="true"></productBoxVue>
						</view>
						<view class="right-bar"><span class="iconfont icon">&#xe66d;</span></view>
					</view>
					<template v-slot:right>
						<view class="slot">
							<view class="slot-button" @click="bindClick({key:0,index:index})">
								<uni-icons type="gear" size="20" color="#007aff"></uni-icons>
								<text class="slot-button-text" >修改</text>
							</view>
							<view class="slot-button" @click="bindClick({key:1,index:index})">
								<uni-icons type="trash" size="20" color="#F56C6C"></uni-icons>
								<text class="slot-button-text">删除</text>
							</view>
						</view>
					</template>
				</uni-swipe-action-item>
			</uni-swipe-action>
			<uni-load-more :status="status" :contentText="contentText"></uni-load-more>
		</view>
</template>

<script>
	export default {
		onLoad() {
		},
		onShow() {
			this.getMySecondhand();
		},
		data() {
			return {
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
			async getMySecondhand() {
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
			deleteMySecondhand: async function(index, productID) {
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9gip97mx4bfa32a3',
					},
					path: `/user/deleteMySecondhand`,
					method: 'POST',
					header: {
						'X-WX-SERVICE': 'springboot-ds71',
					},
					data: productID
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
			bindClick: function(e) {
				if(e.key == 0){
					uni.navigateTo({
						url: "/pages/postSecondHand/postSecondHand?product=" + encodeURIComponent(JSON.stringify(this.myProduct[e.index])) + "&edit=true",
					});
				}else{
					uni.showModal({
						title: "删除商品",
						content: "是否删除商品？删除后将无法恢复",
						confirmColor: "#1684FC",
						success: function(res) {
							var that = this;
							if (res.confirm) {
								this.deleteMySecondhand(e.index,this.mySecondhand[e.index].productID);
								
							}
						}.bind(this)
					});	
				}
			}
		},
		components: {
			productBoxVue
		}
	}
	import productBoxVue from '@/components/product-box/product-box.vue'
</script>

<style>
	@import '@/static/iconfont/iconfont.css';
	.my-secondhand {
		width: 100vw;
		height: 100vh;
		overflow-y: scroll;
		transition: all 3s ease;
	}
	
	.hint{
		position: fixed;
		top:0;
		width: 100%;
		background-color: white;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		color:#ccc;
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
	
	.slot{
		width: 20vw;
		display: flex;
		flex-direction: column;
		height: 100%;
		background-color: white;
	}
	.slot-button{
		height: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color:#777;
	}
	
</style>
