<template>
	<view>
		<view class="row-container">
			<view class="info-box"><text>全部</text></view>
			<view class="info-box"><text>收藏</text></view>
			<view class="info-box"><text>点赞</text></view>
		</view>
		<view class="boxes" v-for="(shoucangDetail,index) in shoucangDetailList">
			<shoucang-box-vue v-on:delete="receive" :shoucangDetail="shoucangDetail"></shoucang-box-vue>
		</view>
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
						ID: 1,
						avator: "https://cssa-mini.oss-cn-shanghai.aliyuncs.com/cssa-community-image/renwu.jpeg",
						nickname:"Peter",
						title: "Madison周围都有什么好玩的呢",
						content: "Madison周围都有什么好玩的呢，有谁推荐一下吗，如果有推荐可以联系我：123456789. 大家可以一起玩，开心最重要了。",
						shrinkContent: "",
						imageUrls: ["https://cssa-mini.oss-cn-shanghai.aliyuncs.com/cssa-community-image/renwu.jpeg"],
					}
				]
			}
		},
		methods: {
			receive: function(key1){
				console.log(key1)
				console.log(this.shoucangDetailList)
				this.shoucangDetailList = this.shoucangDetailList.filter(user=> user.ID != key1)
				console.log(this.shoucangDetailList)
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
</style>
