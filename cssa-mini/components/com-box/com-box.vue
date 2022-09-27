<template>
	<view class="container">
		<view class="top-container">
			<image class= "image" src="../../static/renwu.jpeg"></image>
			<text class="user-name">Jucy</text>
		</view>
		<view class="content-container">
			<view class="title">有没有周末推荐去玩的地方吗？</view>
			<view class="content">
				<view class="content-text">Madison周围都有什么好玩的呢，有谁推荐一下吗，如果有推荐可以联系我：123456789.</view>
			</view>
		</view>
		<view class="image-box">
			<image class="picture" src="../../static/renwu.jpeg"></image>
			<image class="picture" src="../../static/renwu.jpeg"></image>
		</view>
		<view class="whitespace"/>
	</view>
</template>

<script>
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
		justify-content: space-between;
	}
	.picture{
		height: 20vh;
		width: 43.5vw;
		border-radius: 5%;
	}
	.whitespace{
		height: 3vw;
	}
</style>