<template>
	<view class="comment-box">
		<view class="comment-head-area row-container">
			<image class="avatar"
				:src="'https://cssa-mini.oss-cn-shanghai.aliyuncs.com/cssa-mini-avatar/' + this.comment.userAvatar + '.png'">
			</image>
			<view class="user-rate-box">
				<view class="row-container rate-sub-box">
					<view><text class="user-rate-text">难度:</text></view>
					<uni-rate readonly="true" :value="comment.difficulty" allowHalf="true" size="17"></uni-rate>
					<view><text class="user-rate-text">{{comment.difficulty}}</text></view>
				</view>
				<view class="row-container rate-sub-box">
					<view><text class="user-rate-text">喜爱:</text></view>
					<uni-rate readonly="true" :value="comment.prefer" allowHalf="true" size="17"></uni-rate>
					<view><text class="user-rate-text">{{comment.prefer}}</text></view>
				</view>
			</view>
			<view class="comment-time"><text>{{computeCommentTime}}</text></view>
		</view>
		<view class="wrap">
			<view :class="this.more?'comment-body comment-body-more':'comment-body'">
				<text v-if="this.more" class="more-button" @click="moreText">更多</text>
				<text id="comment-text">{{comment.comment}}</text>
			</view>
		</view>

		<view class="row-container comment-end">
			<view class="row-container">
				<text class="time-professor">{{comment.courseTime}}</text>
				<text style="font-size: 10px">|</text>
				<text class="time-professor">{{comment.professor}}</text>
			</view>
			<view class="row-container">
				<text class="iconfont icon" v-show="this.liked==false" @click="addZan">&#xe839</text>
				<text class="iconfont icon zan" v-show="this.liked==true">&#xe876</text>
				<!-- <view :class="liked==false?'iconfont icon-like1':'iconfont icon-like-fill'"></view> -->
				<text class="zan-count">&nbsp{{comment.likeCount}}</text>
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
				more: false,
				liked: false,
			};
		},
		onShow() {
			const query = uni.createSelectorQuery().in(this);
			query.select('#comment-text').boundingClientRect(data => {
				if (data.height < 100) {
					this.more = true;
				}
			}).exec();
			// uni.getStorage({
			// 	fail: () -> {
			// 		const res;
					
			// 		uni.setStorage({
			// 			key:zanList,
			// 			value: res.data.data,
			// 		});
			// 		// addZanList();
			// 	}
			// })
		},
		methods: {
			moreText: function() {
				this.more = true;
			},
			async addZan() {
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
				
				
				if (res.data.status == 107) {
					uni.showToast({
						title: '您已经点过赞啦',
						duration: 2000
					});
					this.liked = true;
				}else if (res.data.status == 100) {
					this.liked = true;
					this.comment.likeCount += 1;
				}else{
					uni.showToast({
						title: '出现未知错误',
						duration: 2000,
						image: "../../static/wrong.png"
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
		
		color: #aaa;
		margin-top: 0pt;
		margin-left: 2pt;
		margin-right: 2pt;
	}

	.time-professor {
		margin-left: 4px;
		margin-right: 5px;
		font-size: 10px;
	}

	.rate-sub-box {
		height: 17px;
		line-height: 17px;
		align-items: center;
		font-size: 14px;
	}

	.user-rate-text {
		color: #aaa;
		font-size: 12px;
		margin-right: 5px;
		margin-left: 5px;
	}
	
	.zan-count{
		font-size: 12px;
	}
	
	.icon {
		font-size: 15px;
	}
	.zan{
		color:red;
	}
</style>
