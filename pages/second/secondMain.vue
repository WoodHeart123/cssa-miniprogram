<template>
	<view id="second-main">
		<scroll-view scroll-y="true" show-scrollbar="true" refresher-enabled="true"
			class="column-container secondhand-container" refresher-background="white" @refresherrefresh="refresh"
			enable-back-to-top="true" :refresher-triggered="triggered" @scrolltolower="onScrollLower">
			<view class="box">
				<view v-for="(product,index) in productList" :key="index">
					<productBoxVue :product="product"></productBoxVue>
				</view>
			</view>
			<uni-load-more :contentText="contentText" :status="status"></uni-load-more>
			<view style="height: 100px;"></view>
		</scroll-view>
		<uni-fab :pattern="pattern" horizontal="right" vertical="bottom" popMene="false" @fabClick="toPostProduct" />
	</view>
</template>

<script>
	export default {
		components: {
			productBoxVue
		},
		data() {
			return {
				offset:0,
				limit: 20,
				currentIndex: 0,
				pattern: {
					buttonColor: "#9b0000"
				},
				triggered: false,
				status: "loading",
				productList:[],
				contentText:{
					contentdown:"上拉显示更多",
					contentrefresh:"正在加载...",
					contentnomore:"没有更多商品了"
				},
				isLogin: false,
			}
		},
		onLoad(){
			wx.cloud.init();
			this.refresh();
		},
		onShow() {
			uni.$on("uploadSuccess",this.uploadSuccess);
			uni.getStorage({
				key: "userInfo-2",
				success:() => {
					this.isLogin = true;
				}
			});
		},
		methods: {
			uploadSuccess:function(){
				this.refresh();
				uni.showToast({
					title: "上传成功",
				});
			},
			onClickMenu: function(index) {
				if (this.currentIndex != index) {
					this.currentIndex = index;
					this.refresh();
				}
			},
			refresh:function(){
				if (!this.triggered) {
					this.triggered = true;
					this.limit = 20;
					this.offset = 0;
					this.productList = [];
					this.status = "loading"
					this.getProductList();
				}
			},
			async login(name) {
				uni.showLoading({
					mask:true
				});
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9gip97mx4bfa32a3',
					},
					path: "/user/login?nickname=" + encodeURI(name),
					method: 'GET',
					header: {
						'X-WX-SERVICE': 'springboot-ds71',
					}
				});
				this.isLogin = true;
				uni.setStorage({
					key: "userInfo-2",
					data: res.data.data
				});
				uni.hideLoading();
				this.toPostProduct();
			},
			getProductList:async function(){
				if(this.status == "noMore"){
					return;
				}
				const opts = {
				    path: `/secondhand/getProductList?productType=all&limit=${this.limit}&offset=${this.offset}`,
				    type: 'GET',
				};
				
				requestAPI(opts).then(response => {
				    if (response.data.status == 100) {
				        this.productList = this.productList.concat(response.data.data);
				        this.offset += response.data.data.length;
						console.log(response.data.data.length)
				        this.status = response.data.data.length != this.limit ? "noMore" : "more";
				    }
					console.log(this.status)
				    this.triggered = false;
				}).catch(error => {
				    console.error("Fetch product list failed:", error);
				    this.triggered = false; 
				});
			},
			toPostProduct: function() {
				if (!this.isLogin) {
					uni.showToast({
						title:"请先登录",
						icon:"none"
					});
					uni.getUserProfile({
						desc: "获取用户信息",
						success: (userProfile) => {
							this.login(userProfile.userInfo.nickName);
						},
						fail: () => {
							uni.showToast({
								title: "请先登陆",
								icon: "none"
							});
						}
					});
					return;
				}
				uni.navigateTo({
					url: "/pages/second/secondMainPost"
				})
			},
			toSearch: function() {
				uni.navigateTo({
					url: "/pages/second/secondMainSearch",
					animationType: "pop-in"
				})
			},
			onScrollLower: function() {
				this.status = "loading";
				this.getProductList();
			}

		}
	}
	import productBoxVue from '@/components/product-box/product-box.vue';
	import requestAPI from '@/api/request.js'
</script>

<style>
	#second-main {
		position: absolute;
		width: 100vw;
		height: 100vh;
		top: 0;
	}

	.column-container {
		display: flex;
	}

	.secondhand-container {
		height: 100vh;
		width: 100vw;
		background-color: white;
		padding-top: 10px;
	}

	.row-container {
		display: flex;
		flex-direction: row;
	}

	.menu {
		position: fixed;
		width: 100vw;
		height: 50px;
		align-items: center;
		background-color: white;
		/* border-bottom:1px solid #ccc; */
		box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 5px;
		box-sizing: border-box;
	}

	.menu-scroll {
		padding-bottom: 0;
	}

	.search-box {
		margin-left: 5px;
		width: 30px;
	}

	.menu-box {
		width: calc(100vw - 35px);
		overflow-x: scroll;
		height: 50px;
		flex-shrink: 0;
	}

	.product-type-item {
		margin-left: 10px;
		height: 100%;
		align-items: center;
		justify-content: center;
		width: fit-content;
		flex-shrink: 0;
	}

	.product-text {
		font-size: 15px;
		color: #aaa;
		margin-right: 10px;
		transition: all 0.3s;
	}

	.selected {
		font-size: 18px;
		font-weight: 700;
		color: #9b0000;
	}

	.container {
		display: flex;
		height: 500px;
		width: 80vw;

	}

	.box {
		display: flex;
		justify-content: left;
		flex-direction: row;
		flex-wrap: wrap;
		margin-left: 1vw;
	}
</style>
