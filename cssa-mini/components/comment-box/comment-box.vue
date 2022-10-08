<template>
	<view class="comment-box">
		<view class="comment-head-area row-container">
			<image class="avatar" src="../../static/index/maomao.jpg"></image>
			<view class="rate-box">
				<view class="row-container">
					<view><text>难度：</text></view>
					<uni-rate readonly="true" :value="comment.difficulty" allowHalf="true" size="15"></uni-rate>
					<view><text>{{comment.difficulty}}</text></view>
				</view>
				<view class="row-container">
					<view><text>喜爱： </text></view>
					<uni-rate readonly="true" :value="comment.prefer" allowHalf="true" size="15"></uni-rate>
					<view><text>{{comment.prefer}}</text></view>
				</view>
			</view>
			<view class="comment-time"><text>{{comment.commentTime}}</text></view>
		</view>
		<view class="wrap">
			<view  :class="this.more?'comment-body comment-body-more':'comment-body'">
				<text v-if="!more" class="more-button" @click="moreText">更多</text>
				<text id="comment-text">{{comment.comment}}</text>
			</view>
		</view>

		<view class="row-container comment-end">
			<view class="row-container">
				<text class="time-professor">{{comment.courseTime}}</text>
				<text>;</text>
				<text class="time-professor">{{comment.professor}}</text>
			</view>
			<view class="row-container">
				<view class="iconfont icon-like"></view>
				<text class="zan_count">{{comment.likeCount}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ["comment"],
		name: "comment-box",
		data() {
			return {
				more:false,
			};
		},
		onShow(){
			const query = uni.createSelectorQuery().in(this);
			query.select('#comment-text').boundingClientRect(data => {
			  console.log(JSON.stringify(data));
			  if(data.height < 100){
				  this.more = true;
			  }
			}).exec();
		},
		methods:{
			moreText:function(){
				this.more = true;
			}
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

	.more-button {
		color: #1684FC;
		float: right;
		clear: both;
		line-height: 25px;
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
	
	.wrap{
		display: flex;
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
		margin-left: 10px;
		width: calc(100% - 140px);
	}

	.comment-time {
		color: #aaa;
		width: 80px;
		font-size: 10px;
		text-align: right;
		margin-top: 5px;
	}

	.comment-body {
		width: calc(99vw - 50px);
		margin-top: 10px;
		margin-bottom: 5px;
		max-height: 100px;
		font-size: 13px;
		margin-left: 50px;
		margin-right: 1vw;
		line-height: 25px;
		overflow: hidden;
		overflow-x: hidden;
		/* white-space: pre-wrap; */
		text-overflow: ellipsis;
		/* display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical; */
		transition: .3s max-height;
	}
	.comment-body-more{
		max-height: 500px;
		-webkit-line-clamp: 999;
	}

	.comment-body::before {
		content: ' ';
		float: right;
		width:0;
		height: calc(100% - 25px);
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
