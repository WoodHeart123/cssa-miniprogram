<template>
	<view>
		<view class="column-container course-box">
			<view class="course-name-box">
				<view class="course-name"><Text>{{course.courseName}}</Text></view>
			</view>
			<view class="row-container course-intro-box">
				<view class="course-diff-like">
					<view class="row-container rate-box">
						<view class="rate-text"><text>难度:</text></view>
						<uni-rate readonly="true" :value="course.avgDifficulty" allowHalf="true" size="20"></uni-rate>
						<view class="rate-num"><text>{{course.avgDifficulty}}</text></view>
					</view>
					<view class="row-container rate-box">
						<view class="rate-text"><text>推荐:</text></view>
						<uni-rate readonly="true" :value="course.avgPrefer" allowHalf="true" size="20"></uni-rate>
						<view class="rate-num"><text>{{course.avgPrefer}}</text></view>
					</view>
				</view>
				<view class="column-container credit-box">
					<text class="credit">{{course.credit}}</text>
					<text style="font-size: 10pt; text-align: center;">学分</text>
				</view>
			</view>
			<view class="footnote">{{course.commentCount}}人参与讨论</view>
		</view>
		<view class="row-container filter-box">
			<view :class="key==0?'row-container filter filter-selected':'row-container filter'" @click="changeKey(0)">
				<text>最新</text>
			</view>
			<view :class="key==1?'row-container filter filter-selected':'row-container filter'" @click="changeKey(1)">
				<text>热度</text>
			</view>
		</view>
		<scroll-view scroll-y="true" show-scrollbar="true" refresher-enabled="true" 
			class="column-container comment-container" @scrolltolower="moreComments()">
			<view class="box" v-for="(comment, index) in commentList" :key="index">
				<commentBoxVue :comment="comment"></commentBoxVue>
			</view>
			<uni-load-more status="more"></uni-load-more>
		</scroll-view>
		<uni-fab :pattern="pattern" horizontal="left" vertical="bottom" popMene="false" @fabClick="toComment" />
		</view>
</template>

<script>
	export default {
		components: {
			commentBoxVue
		},
		data() {
			return {
				pattern: {
					buttonColor: "#1684FC"
				},
				course: {},
				showLoad: false,
				status: "load",
				currentPage: 0,
				key: 0,
				orderType: ["SORT_BY_TIME", "SORT_BY_LIKE"],
				isStudent: false,
				isLogin: true,
				userInfo: {},
				commentList:[],
				offset: 0,
				limit: 10,
				order: [],
			}
		},
		methods: {
			changeKey: function(num) {
				if (this.key != num) {
					this.currentPage = 0;
					this.getCommentList();
					this.key = num;
				}
			},
			moreComments: function() {
				this.getCommentList();
				offset += limit;
				limit *= 2;
			},
			async getCommentList() {
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9go38k3y9fee3b2e',
					},
					path: "/course/getCommentList?courseID=" + this.courseID + "&offset=" + this.offset + "&limit=" + this.limit + "&order=" + this.orderType[this.key],
					method: 'GET',
					header: {
						'X-WX-SERVICE': 'springboot-f8i8',
					}
				});
				this.commentList = res.data.data;
			},
			async login() {
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9go38k3y9fee3b2e',
					},
					path: "/user/login?nickname=" + encodeURI(this.userInfo.nickName),
					method: 'GET',
					header: {
						'X-WX-SERVICE': 'springboot-f8i8',
					}
				});
				this.isLogin = true;
				this.isStudent = res.data.data.isStudent;
				uni.setStorage({
					key: "userInfo",
					data: this.userInfo
				});
				this.toComment();
			},
			toComment: function() {
				if (!this.isLogin) {
					uni.getUserProfile({
						desc: "获取用户信息",
						success: (userProfile) => {
							this.userInfo = userProfile.userInfo;
							this.login();
						},
						fail: () => {
							uni.showToast({
								title: "请先登陆",
								icon: "none"
							});
						}
					});
					return;
				}
				// if (!this.isStudent) {
				// 	uni.showModal({
				// 		title: "请先认证学生身份",
				// 		content: "我们希望以此能过滤一些代写，谢谢配合",
				// 		confirmText: "前往认证",
				// 		success: (res) => {
				// 			if (res.confirm) {
				// 				uni.navigateTo({
				// 					url: "/pages/index/userInfo",
				// 				});
				// 			}
				// 		},
				// 	});
				// 	return;
				// }
				uni.navigateTo({
					url: "/pages/postComment/postComment"
				});
			}
		},
		onLoad(options) {
			this.course = JSON.parse(decodeURIComponent(options.course));
			uni.setNavigationBarTitle({
				title: this.course.departmentAbrev + " " + String(this.course.courseNum)
			});
			this.getCommentList();
		},
		onShow() {
			uni.getStorage({
				key: "userInfo",
				success: (res) => {
					this.isStudent = res.data.isStudent;
				},
				fail: () => {
					this.isLogin = false;
				},
			});
		}
	}
	import commentBoxVue from '@/components/comment-box/comment-box.vue'
</script>

<style>
	@import '@/static/iconfont/iconfont.css';

	.column-container {
		display: flex;
		flex-direction: column;
		background-color: white;
	}

	.row-container {
		display: flex;
		flex-direction: row;
		background-color: white;
	}

	.filter-box {
		height: 50px;
		width: 100%;
		align-items: center;
		background-color: white;
		margin-top: 5px;
		border-radius: 5px 5px 0 0;
	}

	.course-intro-box {
		width: 100%;
		height: 80px;
		justify-content: space-between;
		align-items: center;
		margin: 5px;
	}

	.course-name-box {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 40px;
		margin: 10px 10px 10px 10px;
	}

	.course-name {
		min-height: 20px;
		max-height: 40px;
		width: calc(100% - 20px);
		font-weight: 700;
		text-align: left;
		line-height: 20px;
		overflow: hidden;
		white-space: pre-wrap;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.course-diff-like {
		font-weight: 250;
	}
	
	.course-box{
		height: 168px;
		margin-bottom: 2px;
	}
	.credit-box {
		width: 80px;
		height: 80%;
		background-color: #868686;
		border-radius: 10px 0 0 10px;
		color: white;
		justify-content: center;
	}

	.credit {
		font-size: 30px;
		text-align: center;
	}

	.footnote {
		color: #aaa;
		font-size: 10px;
		text-align: right;
		margin-right: 2px;
	}

	.filter-selected {
		background-color: #c9d4fc !important;
	}

	.filter {
		min-width: 50px;
		padding: 0 10px 0 10px;
		font-size: 12px;
		height: 30px;
		border-radius: 20px;
		text-align: center;
		margin-left: 10px;
		background-color: #f2f2f2;
		justify-content: space-around;
		align-items: center;
	}

	.box {
		padding-bottom: 20px;
	}

	.rate-box {
		height: 20px;
		margin-bottom: 10px;
		margin-left: 10px;
	}

	.rate-text {
		margin-right: 10px;
		font-size: 14px;
		font-weight: 500;
	}

	.rate-num {
		margin-left: 20px;
		font-size: 13px;
		line-height: 20px;
		font-weight: 400;
	}

	.comment-container{
		height: calc(100vh - 225px);
		width: 100%;
		overflow: hidden;
		background-color: white;
	}
</style>
