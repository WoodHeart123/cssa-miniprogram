<template>
	<view class="post-detail-background">
		<div class="post-content">
			<div class="post-meta-data">
				<image v-bind:src="`${post.avatar}`" class="avatar" mode="aspectFit" />
				<div class="post-title">{{ post.title }}</div>
			</div>
			
			<div class="post-OP">{{ post.OP }} <span style="font-size: 200%; vertical-align: middle; color: darkgray; padding-left: 0.25rem; padding-right: 0.1rem;">·</span> 于 {{ timeElapsedSincePost }}</div>
			<div style="width: 90%; font-weight: 500;">(活动时间：{{ eventTime }})</div>
			
			<div class="post-text">{{ post.text }}</div>
			<div v-if="post.images.length > 0" class="post-images">
				<image v-for="(image, index) in post.images" v-bind:src="image" class="individual-post-image" mode="aspectFill" v-on:click="activateLargeImages(index)"/>
				<div v-if="post.images.length % 3 >= 1" class="individual-post-image" />
				<div v-if="post.images.length % 3 == 1" class="individual-post-image" />
			</div>
			
			<div v-if="comments.length > 0" class="post-comments">
				<div v-for="comment in comments" class="individual-post-comment">
					<div style="color: cadetblue; float: left; padding-right: 0.5rem;">{{ comment.userName + " :" }}</div>
					<div>{{ comment.comment }}</div>
				</div>
			</div>
			
			<div class="add-comment">
				<uni-easyinput type="textarea" v-model="userComment" placeholder="留言" />
			</div>
			<div class="send-button" v-on:click="addComment">
				<div style="height: 100%; display: flex; justify-content: center; align-items: center;">
					<uni-icons type="paperplane-filled" size="20" color="white" />
				</div>
			</div>
			<div style="height: 3rem;" />
		</div>
		
		<div v-if="showLargeImage && post.images.length > 0" class="large-images">
			<swiper class="swiper" circular indicator-dots="true" style="height: 100%; width: 100%;">
				<swiper-item v-for="i in post.images.length" style="height: 100%; width: 100%;">
					<view style="width: 100%; height: 100%;" v-on:click="deactivateLargeImages">
						<image v-bind:src="post.images[(i - 1 + clickedImageIndex) % post.images.length]" style="width: 100%; height: 100%;" mode="aspectFit" />
					</view>
				</swiper-item>
			</swiper>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userName: "", 
				userComment: "", 
				post: {}, 
				comments: [], 
				showLargeImage: false, 
				clickedImageIndex: -1
			}
		},
		onLoad(option) {
			this.post = JSON.parse(decodeURIComponent(option.post));
			try {
				const value = uni.getStorageSync('userInfo-2');
				if (value) {
					console.log(value)
					this.userName = value.nickname
				}
			} catch (e) {
				console.log(e)
			}
			
			// TODO: get comments of this post from backend
			this.comments = [{userName: "用户 1", comment: "评论评论"}, {userName: "用户 2", comment: "互动一下, 互动一下, 互动一下, 互动一下, 互动一下, 互动一下, 互动一下, 互动一下, 互动一下, 互动一下, 互动一下, 互动一下, 互动一下, 互动一下"}]
		},
		
		// TODO: update the comment section to the backend database when the user quits this page
		
		computed: {
			eventTime() {
				// TODO: display event time frame in type DATE
				return "Nov. 23"
			},
			
			timeElapsedSincePost() {
				// TODO: actually compute time elapsed since post
				return "50 分钟前"
			}
		},
		methods: {
			addComment(e) {
				this.comments.push({userName: this.userName, comment: this.userComment});
				this.userComment = ""
			},
			activateLargeImages(index) {
				this.showLargeImage = true
				this.clickedImageIndex = index
			},
			deactivateLargeImages() {
				this.showLargeImage = false
				this.clickedImageIndex = -1
			}
		}
	}
</script>

<style scoped>
	.post-detail-background {
		height: 100vh;
		width: 100vw;
		background-color: white;
	}
	.post-content {
		width: 100vw;
		background-color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-wrap: nowrap;
		padding-top: 3rem;
	}
	.post-meta-data {
		width: 90%;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}
	.post-title {
		width: 80%; 
		font-size: 110%; 
		font-weight: 500;
		overflow-wrap: break-word; 
		text-align: left;
	}
	.avatar {
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
	}
	.post-OP {
		width: 90%; 
		color: darkgray; 
		font-size: 80%; 
		overflow-wrap: break-word;
		margin-bottom: 2rem;
	}
	.post-text {
		width: 90%;
		margin-top: 1rem;
		margin-bottom: 2rem;
	}
	.post-images {
		width: 90%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.individual-post-image {
		width: 32%;
		height: 30vw;
		margin-bottom: 0.5rem;
	}
	.large-images {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100%;
		z-index: 4;
		background-color: whitesmoke;
	}
	.post-comments {
		width: 90%;
		background-color: white;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		padding-top: 2rem;
	}
	.individual-post-comment {
		margin-bottom: 0.5rem;
		width: 100%;
	}
	.add-comment {
		width: 90%;
		margin-top: 2rem;
	}
	.send-button {
		position: relative;
		bottom: 1rem;
		left: 43%;
		height: 2rem; 
		width: 2rem;
		background-color: cadetblue; 
		border-radius: 50%;
		z-index: 3;
	}
</style>
