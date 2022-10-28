<template>
	<view class="my-comment">
		<uni-swipe-action>
			<uni-swipe-action-item :right-options="options1" v-for="(comment, index) in myComment"
				:key="index">
				<view class="box">
					<view class="left-bar">
						<commentBoxVue :comment="comment" user="true"></commentBoxVue>
					</view>
					<view class="right-bar"><span class="iconfont icon">&#xe66d;</span></view>
				</view>
			</uni-swipe-action-item>

		</uni-swipe-action>
		<uni-load-more :status="status" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	export default {
		onLoad() {
			wx.cloud.init();
			this.getMyComment();
			uni.getStorage({
				key: "userInfo",
				success: (res) => {
					this.likedComment = res.data.likedComment;
				},
			});
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
					text: '修改评论'
				},
				{
					text:'删除'
				}],
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
	}

	.box {
		width: 100vw;
		display: flex;
		flex-direction: row;
	}
	.right-bar{
		width: 8vw;
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.left-bar{
		width:92vw;
	}
	.icon{
		font-size: 15px;
		color:#ccc;
	}
	.uni-swipe{
		margin-bottom: 10px;
	}
</style>
