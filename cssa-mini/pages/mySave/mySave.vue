<template>
	<view>
		<view class="row-container">
			<view class="info-box"><text>全部</text></view>
			<view class="info-box"><text>收藏</text></view>
			<view class="info-box"><text>点赞</text></view>
		</view>
		<scroll-view scroll-y="true" show-scrollbar="true" refresher-enabled="true"
			class="column-container rental-scroll" refresher-background="white" @refresherrefresh="refresh"
			enable-back-to-top="true" :refresher-triggered="triggered" @scrolltolower="onScrollLower">
			<view class="boxes" v-for="(shoucangDetail,index) in shoucangDetailList">
				<shoucang-box-vue v-on:delete="receive" :product="shoucangDetail"></shoucang-box-vue>
			</view>
			<uni-load-more style="padding-bottom: 50px;" :status="status"></uni-load-more>
		</scroll-view>
	</view>
</template>

<script>
	import shoucangBoxVue from "@/components/shoucang-box/shoucang-box.vue"
	export default {
		components:{
			shoucangBoxVue
		},
		data() {
			return {
				shoucangDetailList:[
					{	
						productID: 1,
						productTitle: "Madison周围都有什么好玩的呢",
						productDescription: "Madison周围都有什么好玩的呢，有谁推荐一下吗，如果有推荐可以联系我：123456789. 大家可以一起玩，开心最重要了。",
						delivery:'pickup',
						price:100,
						sellerNickname:"Peter",
						productCondition:0,
						sellerAvatar:1,
						images: ["https://cssa-mini.oss-cn-shanghai.aliyuncs.com/cssa-community-image/renwu.jpeg"],
					},
					{
						productID: 2,
						productTitle: "lalalalasdsad",
						productDescription: "Madison周围都有什么好玩的呢，有谁推荐一下吗，如果有推荐可以联系我：123456789. 大家可以一起玩，开心最重要了。",
						delivery:'pickup',
						price:100,
						sellerNickname:"Peter",
						productCondition:0,
						sellerAvatar:1,
						images: ["https://cssa-mini.oss-cn-shanghai.aliyuncs.com/cssa-community-image/renwu.jpeg"],
					}
				],
				triggered:false,
				status:"loading"
			}
		},
		onLoad() {
			wx.cloud.init();
			this.refresh();
		},
		
		methods: {
			receive: function(key1){
				console.log(key1)
				console.log(this.shoucangDetailList)
				this.shoucangDetailList = this.shoucangDetailList.filter(product=> product.productID != key1)
				console.log(this.shoucangDetailList)
			},
			
			refresh:function(){
				if (!this.triggered) {
					this.triggered = true;
					this.limit = 20;
					this.offset = 1;
					this.rentalList = [];
					this.status = "loading"
					//this.getRentalList();
				}
			},
			
			onScrollLower:function(){
				this.status = "loading";
				this.status = "noMore";
				console.log("success")
				//this.getRentalList();
			}
		}
	}
</script>

<style>
	.row-container {
		display: flex;
		flex-direction: row;
	}
	
	.info-box{
		padding-top: 10px;
		padding-bottom: 10px;
		width: 50vw;
		text-align: center;
		margin-bottom: 15px;
		border: 1px solid #ACACAC;
		background-color: rgba(255, 255, 255, 0.9);
	}
	
	.rental-scroll{
		height: calc(100vh - 92px);
		width: 100%;
		overflow: hidden;
		background-color: white;
		overflow-y:scroll ;
	}
	
	.column-container {
		display: flex;
		flex-direction: column;
	}
</style>
