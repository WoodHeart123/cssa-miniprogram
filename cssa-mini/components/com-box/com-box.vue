<template>
	<view class="container">
		<view class="top-container">
			<image class= "image" src="../../static/renwu.jpeg"></image>
			<text class="user-name">Jucy</text>
		</view>
		<view class="content-container">
			<view class="title">有没有周末推荐去玩的地方吗？</view>
			<view class="content">
				<view class="content-text">{{shrinkContent}}</view>
				<template v-if="content != null && content.length > 52">
					<text class="content-description" v-if="isShow" @click="toggleDescription">全文</text>
					<text class="content-description" v-else @click="toggleDescription">收起</text>
				</template>
			</view>
		</view>
		<view class="image-box">
			<view class="image-1" v-if="imageNum == 1">
				<view v-for="(url,index) in imageUrls">
					<image class="picture-1" :src="url" @tap="previewImage(url)" mode="heightFix"/>
				</view>
			</view>
			<view class="image-more" v-else-if="imageNum == 2">
				<view v-for="(url,index) in imageUrls">
					<image class="picture-2" :src="url" @tap="previewImage(url)"/>
				</view>
			</view>
			<view class="image-more" v-else="imageNum > 2">
				<view v-for="(url,index) in imageUrls">
					<image class="picture-more" :src="url" @tap="previewImage(url)"/>
				</view>
			</view>
		</view>
		<view class="whitespace"/>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				isShow: false,
				content:"Madison周围都有什么好玩的呢，有谁推荐一下吗，如果有推荐可以联系我：123456789. 大家可以一起玩，开心最重要了",
				shrinkContent:"",
				imageUrls:["../../static/renwu.jpeg","../../static/renwu.jpeg","../../static/renwu.jpeg","../../static/renwu.jpeg","../../static/renwu.jpeg","../../static/renwu.jpeg"],
				imageNum:0
			}
		},
		
		onLoad() {
			this.imageNum = this.imageUrls.length;
			console.log(this.imageNum);
			var contentLength = this.content.length;
			if (contentLength > 52){
				this.isShow = true;
				this.shrinkContent = this.content.substr(0, 51) + "..."
			} else {
				this.isShow = false;
				this.shrinkContent = this.content;
			}
		},
		
		methods: {
			toggleDescription: function(){
				if (this.isShow) {
				    this.isShow = false;
				    this.shrinkContent = this.content;
				} else {
				    this.isShow = true;
				    this.shrinkContent = this.content.substr(0, 51) + "...";
				}
			},
			previewImage: function(url){
				var arr = [];
				arr.push(url);
				uni.previewImage({
					current:arr[0],
					urls:arr
				})
			}
		}
	}
</script>

<style>
	.container {
		width: 94vw;
		margin-left: 3vw;
		margin-top: 20px;
		border-radius: 5px;
		box-shadow: rgba(0, 0, 0, 0.2) 0 0 5px;
		background-color: white;
	}
	.top-container{
		display: flex;
		width: 50vw;
		height: 17vw;
	}
	.image {
		height: 13vw;
		width: 13vw;
		border-radius: 50%;
		margin-left: 3vw;
		margin-top: 3vw;
	}
	.user-name{
		margin-left: 2.5vw;
		font-size: 80%;
		margin-top: 4vh;
	}
	.content-container{
		margin-top: 1vh;
	}
	.title{
		margin-left: 3vw;
		margin-right:3vw;
		font-weight: 450;
	}
	.content{
		margin-top: 1vh;
		margin-left: 3vw;
		margin-right: 3vw;
	}
	.content-text{
		font-size: 50%;
		font-weight: 200;
		line-height: 140%;
	}
	.image-box{
		margin-top: 1vh;
		margin-left: 3vw;
		margin-right: 3vw;
		display: flex;
	}
	.image-more{
		display: flex;
		flex-wrap: wrap;
	}
	.picture-more{
		height: 15vh;
		width: 25vw;
		border-radius: 5%;
		margin: 2px;
	}
	.picture-2{
		height: 20vh;
		width: 40vw;
		border-radius: 5%;
		margin: 5px;
	}
	.picture-1{
		height: 20vh;
		border-radius: 5%;
		margin: 5px;
	}
	.whitespace{
		height: 3vw;
	}
	.content-description{
		font-size: 50%;
		font-weight: 200;
		line-height: 140%;
		color: cornflowerblue;
	}
</style>