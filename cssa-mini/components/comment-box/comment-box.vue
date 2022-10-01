<template>
	<view class="comment-box">
		<view class="comment-head-area row-container">
			<image class="avatar" src="../../static/index/maomao.jpg"></image>
			<view class = "rate-box">
				<view class="row-container">
					<view><text>难度：</text></view>
					<uni-rate readonly="true" :value="4.5" allowHalf="true" size="15"></uni-rate>
					<view><text>(4.5)</text></view>
				</view>
				<view class="row-container">
					<view><text>喜爱： </text></view>
					<uni-rate readonly="true" :value="4.5" allowHalf="true" size="15"></uni-rate>
					<view><text>(4.5)</text></view>
				</view>
			</view>
			<view class="comment-time"><text>2022-09-16</text></view>
		</view>
		<view class="comment-body">
			<text>{{comment.comment}}</text>
		</view>
		<view class="row-container comment-end">
			<view class="row-container">
				<text class="time-professor">2019 Fall</text>
				<text>;</text>
				<text class="time-professor">Jack</text>
			</view>
			<view class="row-container">
				<view class="iconfont icon-like"></view>
				<text class="zan_count">50</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:["comment"],
		name: "comment-box",
		data() {
			return {

			};
		}
	}
</script>

<style>
	@import "../../static/iconfont/iconfont.css";

	.comment-box {
		background-color: white;
		width: 100vw;
		border-radius: 10px;

	}

	.comment-head-area {
		height: 50px;
		margin: 5px 5px 5px 5px;
	}

	.row-container {
		display: flex;
		flex-direction: row;
		margin: 5px 5px 0px 0px;
	}

	.column-container {
		display: flex;
		flex-direction: column;
	}

	.avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		margin: 5px 5px 5px 5px;

	}

	.rate-box {
		font-size: 10pt;
		height: 50px;
		text-align: left;
		margin-left:10px;
		width : calc(100% - 140px);
	}

	.comment-time {
		color: #aaa;
		width: 80px;
		font-size: 10px;
		text-align: right;
		margin-top: 5px;
	}

	.comment-body {
		margin-top: 10px;
		margin-bottom: 5px;
		max-height: 100px;
		font-size: 13px;
		margin-left: 50px;
		margin-right: 1vw;
		line-height: 25px;
		overflow: hidden;
		white-space: pre-wrap;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
	}

	.comment-end {
		justify-content: space-between;
		height: 20px;
		font-size: 10px;
		color: #aaa;
		margin-top: 0pt;
		margin-left: 2pt;
		margin-right: 2pt;
	}

	.time-professor {
		margin-left: 4pt;
	}
</style>
