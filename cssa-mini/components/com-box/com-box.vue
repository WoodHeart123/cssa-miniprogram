<template>
	<view class="container">
		<view class="top-container">
			<image class= "image" src="../../static/renwu.jpeg"></image>
			<text class="user-name">{{this.comDetail.nickname}}</text>
		</view>
		<view class="content-container">
			<view class="title">{{this.comDetail.title}}</view>
			<view class="content">
				<view class="content-text">{{this.comDetail.shrinkContent}}</view>
				<template v-if="this.comDetail.content != null && this.comDetail.content.length > 100">
					<text class="content-description" v-if="isShow" @click="toggleDescription">全文</text>
				</template>
			</view>
		</view>
		<view class="image-box">
			<view class="image-1" v-if="this.comDetail.imageUrls.length == 1">
				<view v-for="(url,index) in comDetail.imageUrls">
					<image class="picture-1" :src="url" @tap="previewImage" mode="heightFix"/>
				</view>
			</view>
			<view class="image-more" v-else>
				<view v-for="(url,index) in this.comDetail.imageUrls">
					<image class="picture-more" :src="url" @tap="previewImage"/>
				</view>
			</view>
		</view>
		<view class="whitespace"/>
	</view>
</template>

<script>
	export default {
		props:['comDetail'],
		data(){
			return{
				isShow: false,
				shrinkContent:"",
			}
		},
		
		onLoad() {
			this.comDetail.imageNum = this.comDetail.imageUrls.length;
			console.log(this.comDetail.imageNum);
			console.log(this.comDetail.content);
			var contentLength = this.comDetail.content.length;
			if (contentLength > 100){
				this.isShow = true;
				this.comDetail.shrinkContent = this.comDetail.content.substr(0, 100) + "...";
			} else {
				this.isShow = false;
				this.comDetail.shrinkContent = this.comDetail.content;
			}
		},
		
		methods: {
			toggleDescription: function(){
				if (this.isShow) {
				    this.isShow = false;
				    this.comDetail.shrinkContent = this.comDetail.content;
				} else {
				    this.isShow = true;
				    this.comDetail.shrinkContent = this.comDetail.content.substr(0, 100) + "...";
				}
			},
			previewImage: function(){
				uni.previewImage({
					current:this.comDetail.imageUrls[0],
					urls:this.comDetail.imageUrls,
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