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
						<view class="rate-num"><text>{{course.avgDifficulty.toFixed(1)}}</text></view>
					</view>
					<view class="row-container rate-box">
						<view class="rate-text"><text>推荐:</text></view>
						<uni-rate readonly="true" :value="course.avgPrefer" allowHalf="true" size="20"></uni-rate>
						<view class="rate-num"><text>{{course.avgPrefer.toFixed(1)}}</text></view>
					</view>
				</view>
				<view class="column-container credit-box">
					<text class="credit">{{course.credit}}</text>
					<text style="font-size: 10pt; text-align: center;">学分</text>
				</view>
			</view>
			<view class="footnote">{{course.commentCount}}人参与讨论</view>
		</view>
		<view class = "doc-box">
			<view class="icon iconfont">&#xe650</view>
		</view>
		<view class="row-container filter-box">
			<view :class="key==0?'row-container filter filter-selected':'row-container filter'" @click="changeKey(0)">
				<text>最新</text>
			</view>
			<!-- <view :class="key==1?'row-container filter filter-selected':'row-container filter'" @click="changeKey(1)">
				<text>热度</text>
			</view> -->
		</view>
		<view scroll-y="true" show-scrollbar="true" refresher-enabled="false" refresher-triggered="false"
			class="column-container comment-container" @scrolltolower="getCommentList()">
			<view class="box" v-for="(comment, index) in commentList" :key="index">
				<commentBoxVue :comment="comment" :user="false"></commentBoxVue>
			</view>
			<uni-load-more :status="status" :contentText="contentText"></uni-load-more>
		</view>
		<uni-fab :pattern="pattern" horizontal="right" vertical="bottom" popMene="false" @fabClick="toComment" />
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
					buttonColor: "#9B0000"
				},
				course: {},
				showLoad: false,
				status: "more",
				key: 0,
				orderType: ["SORT_BY_TIME", "SORT_BY_LIKE"],
				isStudent: false,
				isLogin: true,
				likedComment:[],
				userInfo: {},
				commentList: [],
				offset: 0,
				limit: 10,
				order: [],
				contentText:{
					contentdown:"上拉显示更多",
					contentrefresh:"正在加载...",
					contentnomore:"没有更多评论了"
				},
				commentMap:{},
				sharing:false,
			}
		},
		onShareAppMessage(res) {
			this.sharing = true;
			return {
				title: this.course.departmentAbrev + " " + String(this.course.courseNum) + "-" + this.course.courseName,
				path: '/pages/coursePage/coursePage?course=' + encodeURIComponent(JSON.stringify(this.course)),
				imageUrl: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-share/forum.png"
			}
		},
		onShareTimeline(res) {
			this.sharing = true;
			return {
				title: this.course.courseName,
				path: '/pages/coursePage/coursePage?course=' + encodeURIComponent(JSON.stringify(this.course)),	
			}
		},
		methods: {
			changeKey: function(num) {
				if (this.key != num) {
					this.offset = 0;
					this.key = num;
					this.getCommentList();
					
				}
			},
			async getCommentList() {
				if (this.status == "noMore") {
					return;
				}
				this.status = "loading"
				const opts = {
				    path: "/course/getCommentList?courseID=" + this.course.courseID +
				          "&offset=" + this.offset + "&limit=" + this.limit +
				          "&order=" + this.orderType[this.key],
				    type: 'GET',
				};
				requestAPI(opts).then(response => {
				    if (response.data.data.length < this.limit) {
				        this.status = 'noMore';
				    } else {
				        this.status = "more";
				    }
				    if (response.data.status == 100 && this.limit <= 40) {
				        this.offset += this.limit;
				        if (this.limit <= 40) {
				            this.limit *= 2; // Increase limit, but ensure it doesn't exceed 40
				        }
				        // Update 'liked' status for each comment based on local preferences
				        response.data.data.forEach(comment => {
				            comment.liked = this.likedComment.includes(comment.commentID);
				        });
				    } else {
				        uni.showToast({
				            title: '出现未知错误',
				            duration: 2000,
				            image: "../../static/wrong.png"
				        });
				    }
				    // Append new comments to the existing list
				    this.commentList = this.commentList.concat(response.data.data);
				}).catch(error => {
				    console.error("Error fetching comment list:", error);
				    uni.showToast({
				        title: '加载评论失败',
				        icon: 'none',
				        duration: 2000
				    });
				});

			},
			async login() {
				uni.showLoading();
				const opts = {
				    path: "/user/login?nickname=" + encodeURI(this.userInfo.nickName),
				    type: 'GET',
				};
				
				requestAPI(opts)
				    .then(response => {
				        this.isLogin = true;
				        this.isStudent = response.data.data.isStudent;
				        uni.setStorage({
				            key: "userInfo-2",
				            data: response.data.data
				        });
				    })
				    .catch(error => {
				        console.error("Login request failed:", error);
				    });
				uni.hideLoading();
			},
			toComment: function() {
				if(this.commentMap[this.course.courseID] != undefined && this.commentMap[this.course.courseID] >= 2){
					uni.showToast({
						title:"超过两条评论",
						icon: "error",
					});
					return;
				}
				if (!this.isLogin) {
					uni.getUserProfile({
						desc: "获取用户信息",
						success: (userProfile) => {
							this.login(userProfile.userInfo.nickName);
							this.toComment();
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
				uni.$once("updateCourse", data => {
					this.course = data.course;
				})
				uni.navigateTo({
					url: "/pages/coursePage/postComment?course=" + encodeURIComponent(JSON.stringify(this.course)) + "&edit=false",
				});
			}
		},
		onLoad(options) {
			this.course = JSON.parse(decodeURIComponent(options.course));
			uni.setNavigationBarTitle({
				title: this.course.departmentAbrev + " " + String(this.course.courseNum)
			});	
		},
		onHide(){
			if(!this.sharing){
				this.status = "more";
				this.offset = 0;
				this.commentList = [];
			}	
		},
		onShow() {
			this.sharing = false;
			uni.getStorage({
				key: "commentMap",
				success: (res) => {
					this.commentMap = res.data;
				},
				fail: () => {
					this.commentMap = {};
					uni.setStorage({
						key: "commentMap",
						data: {}
					});
				}
			})
			this.getCommentList();
			uni.getStorage({
				key: "userInfo-2",
				success: (res) => {
					this.isStudent = res.data.isStudent;
					this.likedComment = res.data.likedComment;
				},
				fail: () => {
					this.isLogin = false;
				},
			});
		}
	}
	import commentBoxVue from '@/components/comment-box/comment-box.vue'
	import requestAPI from '@/api/request.js'
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

	.course-box {
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
		background-color: #9B0000 !important;
		color: white;
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

	.comment-container {
		height: calc(100vh - 225px);
		width: 100%;
		overflow: hidden;
		background-color: white;
		overflow-y:scroll ;
	}
	
	.icon {
		font-size: 30px;
	}
	.doc-box{
		background-color: white;
		padding: 5px;
	}
</style>
