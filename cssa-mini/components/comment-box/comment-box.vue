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
			<text>叽里呱啦叽里呱啦叽里呱啦叽里呱啦叽里呱啦叽里呱啦叽里呱啦叽里呱啦叽里呱啦叽里呱啦叽里呱啦叽里呱啦叽里呱啦叽里呱啦叽里呱啦叽里呱啦叽里呱啦叽里呱啦叽里呱啦叽里呱啦叽里呱啦叽里呱啦</text>
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
		width: 100%vw;
		height: 115px;
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
		height: 20px;
		text-align: left;
		/*width : calc(100% - 130px);*/
	}

	.comment-time {
		color: #aaa;
		width: 80px;
		font-size: 10px;
		text-align: right;
		margin-top: 5px;
	}

	.comment-body {
		height: 45px;
		font-size: 10pt;
		margin-left: 50px;
		margin-right: 1vw;
		margin-bottom: 0%;
		line-height: 170%;
		overflow: hidden;
		white-space: pre-wrap;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
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
