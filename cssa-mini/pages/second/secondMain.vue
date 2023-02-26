<template>
	<view id="second-main">
		<view class="menu row-container">
			<view class="search-box" @click="toSearch">
				<uni-icons type="search" size="30"></uni-icons>
			</view>
			<view class="menu-box row-container">
				<view class="row-container product-type-item" v-for="(productType, index) in productTypeList"
					:key="index" @click="onClickMenu(index)">
					<text
						:class="currentIndex==index?'product-text selected':'product-text'">{{productType.name}}</text>
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" show-scrollbar="true" refresher-enabled="true"
			class="column-container comment-container" refresher-background="white" @refresherrefresh="refresh"
			enable-back-to-top="true" :refresher-triggered="triggered" @scrolltolower="onScrollLower">
			<view class="box">
				<view v-for="(product,index) in productList" :key="index">
					<productBoxVue :product="product"></productBoxVue>
				</view>
			</view>
			<uni-load-more :contentText="contentText" :status="status"></uni-load-more>
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
				productTypeList: productTypeList,
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
			}
		},
		onLoad(){
			wx.cloud.init();
			this.refresh();
		},
		onShow() {
			uni.$on("uploadSuccess",this.uploadSuccess);
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
					this.offset = 1;
					this.productList = [];
					this.status = "loading"
					this.getProductList();
				}
			},
			getProductList:async function(){
				if(this.status == "noMore"){
					return;
				}
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9gip97mx4bfa32a3',
					},
					path: `/secondhand/getProductList?productType=${this.productTypeList[this.currentIndex].type}&limit=${this.limit}&offset=${this.offset}`,
					method: 'GET',
					header: {
						'X-WX-SERVICE': 'springboot-ds71',
					},
				});
				if(res.data.status == 100){
					this.productList = this.productList.concat(res.data.data);
				}
				this.offset += res.data.data.length;
				if(res.data.data.length != this.limit){
					this.status = "noMore";
				}else{
					this.status = "more";
				}
				this.$nextTick(() => {
					this.triggered = false;
				});
			},
			toPostProduct: function(index) {
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

		}
	}
	import productTypeList from './secondMain.js';
	import productBoxVue from '@/components/product-box/product-box.vue';
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

	.comment-container {
		margin-top: 55px;
		height: calc(100vh - 55px);
		width: 100vw;
		background-color: white;
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
		-ms-overflow-style: none;
		scrollbar-width: none;
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

	.menu-box::-webkit-scrollbar {
		display: none;
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
