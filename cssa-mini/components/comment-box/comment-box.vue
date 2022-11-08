<template>
	<view class="comment-box">
		<view class="row-container course-title" v-if="user">
			<text class="course-num">{{comment.departmentAbrev + " " + comment.courseNum}}</text>
			<text>-</text>
			<text class="course-name">{{comment.courseName}}</text>
		</view>
		<view class="comment-head-area row-container">
			<image class="avatar"
				:src="'https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/' + this.comment.userAvatar + '.jpg'">
			</image>
			<view class="user-rate-box">
				<view class="row-container rate-sub-box">
					<view><text class="user-rate-text">难度:</text></view>
					<uni-rate readonly="true" :value="comment.difficulty" allowHalf="true" size="17"></uni-rate>
					<view><text class="user-rate-text">{{comment.difficulty}}</text></view>
				</view>
				<view class="row-container rate-sub-box">
					<view><text class="user-rate-text">推荐:</text></view>
					<uni-rate readonly="true" :value="comment.prefer" allowHalf="true" size="17"></uni-rate>
					<view><text class="user-rate-text">{{comment.prefer}}</text></view>
				</view>
			</view>
			<view class="comment-time"><text>{{computeCommentTime}}</text></view>
		</view>
		<view class="wrap">
			<view :class="this.more?'comment-body comment-body-more':'comment-body'">
				<text v-if="!this.more" class="more-button" @click="moreText">更多</text>
				<text id="comment-text">{{comment.comment}}</text>
			</view>
		</view>

		<view class="row-container comment-end">
			<view class="row-container">
				<text class="time-professor">{{comment.courseTime}}</text>
				<text>|</text>
				<text class="time-professor">{{comment.professor}}</text>
			</view>
			<view class="row-container" @click="addZan">
				<text class="iconfont icon" :class="{'thumb-liked': this.comment.liked,'.thumb-liked-animated':this.liked}">&#xe876</text>
				<text class="like-count">&nbsp{{comment.likeCount + this.count}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ["comment","user"],
		name: "comment-box",
		data() {
			return {
				more: true,
				liked: false,
				count: 0,
			};
		},
		onReady(){
			const query = uni.createSelectorQuery().in(this);
			query.select('#comment-text').boundingClientRect(data => {
				if (data.height > 150) {
					this.more = false;
				}
			}).exec();
		},
		methods: {
			moreText: function() {
				this.more = true;
			},
			async addZan() {
				if (this.comment.liked) {
					return;
				}
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9go38k3y9fee3b2e',
					},
					path: "/course/zan?commentID=" + this.comment.commentID,
					method: 'GET',
					header: {
						'X-WX-SERVICE': 'springboot-f8i8',
					},
				});
				if (res.data.status == 100 || res.data.status == 107) {
					this.liked = true;
					this.count = 1;
					let userInfo = uni.getStorageSync("userInfo");
					userInfo.likedComment.push(this.comment.commentID);
					uni.setStorageSync("userInfo",userInfo);
				}
				if (res.data.status == 107) {
					uni.showToast({
						title: '您已经点过赞啦',
						duration: 2000
					});
				}

			},
		},
		computed: {
			computeCommentTime() {
				moment.locale('zh-cn');
				return Date.now() - this.comment.commentTime >= 86400000 * 7 ? moment(this.comment.commentTime).format(
					"MM-DD") : moment(this.comment.commentTime).fromNow();
			}
		}
	}
	import moment from "moment/min/moment-with-locales";
	import 'moment/locale/zh-cn';
</script>

<style>
	@import "../../static/iconfont/iconfont.css";

	.comment-box {
		background-color: white;
		width: 100%;

	}
	.course-title{
		width: 100%;
		height: 40px;
		line-height: 40px;
		font-size: 12px;
		overflow: hidden;
	}
	.course-num{
		font-size: 15px;
		font-weight: 500;
		margin-left: 5px;
		margin-right: 5px;
	}
	.course-name{
		font-size: 12px;
		margin-left: 5px;
		color:#aaa;
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

	}

	.column-container {
		display: flex;
		flex-direction: column;
	}

	.wrap {
		display: flex;
	}

	.avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		margin: 5px 5px 5px 5px;

	}

	.user-rate-box {
		font-size: 10pt;
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
		width: calc(99% - 50px);
		margin-top: 10px;
		margin-bottom: 5px;
		max-height: 150px;
		font-size: 13px;
		margin-left: 50px;
		margin-right: 1%;
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

	.comment-body-more {
		max-height: 500px;
		-webkit-line-clamp: 999;
	}

	.comment-body::before {
		content: ' ';
		float: right;
		width: 0;
		height: calc(100% - 25px);
	}

	.comment-end {
		justify-content: space-between;
		height: 20px;
		font-size: 10px;
		color: #aaa;
		margin-left: 5px;
		margin-right: 5px;
	}

	.time-professor {
		margin-left: 4px;
		margin-right: 5px;
	}

	.rate-sub-box {
		height: 17px;
		line-height: 17px;
		align-items: center;
		font-size: 14px;
		margin: 5px 5px 0px 0px;
	}

	.user-rate-text {
		color: #aaa;
		font-size: 12px;
		margin-right: 5px;
		margin-left: 5px;
	}

	.like-count {
		font-size: 12px;
		line-height: 20px;
		width: 20px;
		text-align: left;
	}

	.icon {
		font-size: 15px;
		line-height: 20px;
	}

	.thumb-liked-animated{
		color:red;
		animation: beat 0.5s ease-in-out forwards;	
	}
	.thumb-liked{
		color: red;
	}
	@keyframes beat {
	    0%{
	        transform: scale(0.1);
	    }
	    50%{
	        transform: scale(1);
	    }
	    75%{
	        transform: scale(1.5);
	    }
	    100%{
	        transform: scale(1);
	    }
	}
</style>
