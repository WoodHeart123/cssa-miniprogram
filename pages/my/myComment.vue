<template>
	<view class="my-comment">
		<!-- <view class="hint">向左划可修改或删除评论</view> -->
		<view class="box" v-for="(comment, index) in myComment" :key="index">
				<commentBoxVue :comment="comment" user="true"></commentBoxVue>
		</view>
		<uni-load-more :status="status" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	export default {
		onLoad() {
			wx.cloud.init();
			uni.getStorage({
				key: "userInfo-2",
				success: (res)=> {
					this.likedComment = res.data.likedComment;
					this.avatar = res.data.avatar
				},
			});
		},
		onShow() {
			this.getMyComment();
		},
		onHide() {
			this.status = "more";
			this.offset = 0;
			this.myComment = [];
		},
		data() {
			return {
				offset: 0,
				limit: 20,
				status: "more",
				myComment: [],
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多了"
				},
				avatar: 2,
				likedComment: [],
				options1: [{
						text: '修改评论',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#F56C6C'
						}
					}
				],
			}
		},
		methods: {
			async getMyComment() {
				if (this.status == "noMore") {
					return;
				}
				this.status = "loading";
				const opts = {
				    path: `/user/getMyComment?limit=${this.limit}&offset=${this.offset}`,
				    type: 'GET',
				};
				requestAPI(opts).then(response => {
				    if (response.data.status === 100) {
				        this.status = response.data.data.length < this.limit ? "noMore" : "more";
				        response.data.data.forEach(comment => {
				            comment.liked = this.likedComment.includes(comment.commentID);
				            comment.userAvatar = this.avatar;
				        });
				        this.offset = response.data.data.length > 0 ? response.data.data[response.data.data.length - 1].commentID : this.offset;
				        this.myComment = [...this.myComment, ...response.data.data];
				    } else {
						uni.showToast({
						    title: "记载失败，请重新尝试",
						    icon: "error"
						});
				        this.status = "more"; 
				    }
				}).catch(error => {
				    console.error("Failed to fetch comments:", error);
				    this.status = "error"; 
				});
			},
			deleteComment: async function(index, commentID) {
				const opts = {
				    path: `/user/deleteComment`,
				    type: 'POST',
				    data: { commentID: this.commentID }
				};
				
				requestAPI(opts).then(response => {
				    if (response.data.status === 100) {
				        this.myComment.splice(this.index, 1); 
				        uni.showToast({
				            title: "成功删除",
				        });
				    } else {
				        uni.showToast({
				            title: "删除失败",
				            icon: "error"
				        });
				    }
				}).catch(error => {
				    console.error("Comment deletion failed:", error);
				    uni.showToast({
				        title: "请求失败",
				        icon: "error"
				    });
				});
			},
			bindClick: function(e) {
				if (e.key == 0) {
					uni.navigateTo({
						url: "/pages/postComment/postComment?comment=" + encodeURIComponent(JSON.stringify(this
							.myComment[e.index])) + "&edit=true",
					});
				} else {
					uni.showModal({
						title: "删除吐槽",
						content: "是否删除吐槽？删除后将无法恢复",
						confirmColor: "#1684FC",
						success: function(res) {
							var that = this;
							if (res.confirm) {
								this.deleteComment(e.index, this.myComment[e.index].commentID);

							}
						}.bind(this)
					});
				}
			}
		},
		components: {
			commentBoxVue
		}
	}
	import commentBoxVue from '@/components/comment-box/comment-box.vue'
	import requestAPI from '@/api/request.js'
</script>

<style>
	@import '@/static/iconfont/iconfont.css';

	.my-comment {
		width: 100vw;
		height: 100vh;
		overflow-y: scroll;
		transition: all 3s ease;
	}

	.box {
		width: 100vw;
		display: flex;
		flex-direction: row;
		margin-bottom: 5px;
	}

	.right-bar {
		width: 8vw;
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.left-bar {
		width: 92vw;
	}

	.icon {
		font-size: 15px;
		color: #ccc;
	}

	.hint {
		position: fixed;
		top: 0;
		width: 100%;
		background-color: white;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		color: #ccc;
	}

	.uni-swipe {
		margin-bottom: 10px;
	}

	.slot {
		width: 20vw;
		display: flex;
		flex-direction: column;
		height: 100%;
		background-color: white;
	}

	.slot-button {
		height: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #777;
	}
</style>
