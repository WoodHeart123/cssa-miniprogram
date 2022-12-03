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
				success: (res) => {
					this.likedComment = res.data.likedComment;
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
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9go38k3y9fee3b2e',
					},
					path: `/user/getMyComment?limit=${this.limit}&offset=${this.offset}`,
					method: 'GET',
					header: {
						'X-WX-SERVICE': 'springboot-f8i8',
					},
				});
				if (res.data.status == 100) {
					if (res.data.data.length < this.limit) {
						this.status = "noMore";
					}
					for (let i = 0; i < res.data.data.length; i++) {
						res.data.data[i].liked = (this.likedComment.indexOf(res.data.data[i].commentID) != -1)
					}
					this.offset = res.data.data[res.data.data.length - 1].commentID;
				}
				this.myComment = this.myComment.concat(res.data.data);
			},
			deleteComment: async function(index, commentID) {
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9go38k3y9fee3b2e',
					},
					path: `/user/deleteComment`,
					method: 'POST',
					header: {
						'X-WX-SERVICE': 'springboot-f8i8',
					},
					data: commentID
				});
				if (res.data.status == 100) {
					this.myComment.splice(index, 1);
					uni.showToast({
						title: "成功删除",
					});
				} else {
					uni.showToast({
						title: "删除失败",
						icon: "error"
					});
				}
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
