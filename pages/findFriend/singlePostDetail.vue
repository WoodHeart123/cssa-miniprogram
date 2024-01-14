<template>
	<view class="post-detail-background">
		<scroll-view scroll-y="true" scroll-with-animation="true" v-bind:scroll-into-view="scrollTo" style="height: 100%;">
			<div class="post-content">
				<div class="post-meta-data">
					<image v-bind:src="`${post.avatar}`" class="avatar" mode="aspectFit" />
					<div class="post-title">{{ post.title }}</div>
				</div>
				
				<div class="post-OP">{{ post.OP }} <span style="font-size: 200%; vertical-align: middle; color: darkgray; padding-left: 0.25rem; padding-right: 0.1rem;">·</span> 于 {{ timeElapsedSincePost }}</div>
				<div style="width: 90%; font-weight: 500;">( 活动时间：{{ post.eventTimeFrame }} )</div>
				
				<div class="post-text">{{ post.text }}</div>
				<div v-if="post.images.length > 0" class="post-images">
					<image v-for="(image, index) in post.images" v-bind:src="image" class="individual-post-image" mode="aspectFill" v-on:click="activateLargeImages(index)" />
					<div v-if="post.images.length % 3 >= 1" class="individual-post-image" />
					<div v-if="post.images.length % 3 == 1" class="individual-post-image" />
				</div>
				
				<div class="leave-message-button">
					<uni-transition ref="ani" v-bind:mode-class="transitionAni" v-bind:show="leaveMessage">
						<div class="leave-message-button-body">
							<text style="color: cadetblue; font-size: 80%;" v-on:click="addComment">留言</text><text style="color: white;">|</text><text style="color: cadetblue; font-size: 80%;" v-on:click="addDM">私信</text>
						</div>
					</uni-transition>
					<div v-on:click="addMessage">
						<uni-icons type="chat" size="25" color="cadetblue" />
					</div>
				</div>
				
				<div class="post-divide-line">
					<div style="width: 45%; height: 1px; background-color: lightgray;" />
					<div style="font-size: 200%; vertical-align: middle; color: lightgray;">·</div>
					<div style="width: 45%; height: 1px; background-color: lightgray;" />
				</div>
			</div>
			
			<div class="post-likes-comments" id="post-likes-comments-id">
				<div style="width: 90%;">
					<uni-icons v-if="!clickLike" type="heart" size="20" color="cadetblue" style="float: left; padding-right: 1rem;" v-on:click="likePost"/>
					<uni-icons v-else type="heart-filled" size="20" color="cadetblue" style="float: left; padding-right: 1rem;" v-on:click="unlikePost" />
					<div v-if="likes.length > 0" style="display: flex; flex-direction: row; flex-wrap: wrap; align-content: center;">
						<div v-for="(name, index) in likes">
							<div v-if="index < likes.length - 1" style="padding-right: 0.5rem;">{{ name + " ," }}</div>
						</div>
						<div>{{ likes[likes.length - 1] }}</div>
					</div>
				</div>
					
				<div v-if="comments.length > 0" class="post-comments">
					<div v-for="(comment, index) in comments" class="individual-post-comment" v-bind:id="'individual-post-comment-' + index" v-on:click="reply(comment.userName, index)">
						<div style="color: cadetblue; float: left; padding-right: 0.15rem;">{{ displayCommentName(comment) }}</div>
						<div style="color: cadetblue;">: <span style="color: black;">{{ comment.comment }}</span></div>
					</div>
				</div>
			</div>
				
			<div v-if="commentBox" class="add-comment" id="my-comment">
				<div class="comment-text">
					<uni-easyinput type="textarea" v-model="userComment" v-bind:placeholder="placeHolder" />
				</div>
				<div class="send-button" v-on:click="commitComment">
					<text style="color: white; font-size: 80%;">发布</text>
				</div>
				<div class="cancel-button" v-on:click="cancelComment">
					<text style="color: darkgray; font-size: 80%;">取消</text>
				</div>
			</div>
			
			<div style="height: 3rem; width: 100vw; background-color: whitesmoke;" />
		</scroll-view>
		
		<div v-if="showLargeImage && post.images.length > 0" class="large-images">
			<swiper class="swiper" circular indicator-dots="true" style="height: 100%; width: 100%;">
				<swiper-item v-for="i in post.images.length" style="height: 100%; width: 100%;">
					<view style="width: 100%; height: 100%;" v-on:click="deactivateLargeImages">
						<movable-area style="width: 100%; height: 100%;">
							<movable-view direction="all" out-of-bounds="true" scale="true" style="width: 100%; height: 100%;">
								<image v-bind:src="post.images[(i - 1 + clickedImageIndex) % post.images.length]" style="width: 100%; height: 100%;" mode="aspectFit" />
							</movable-view>
						</movable-area>
					</view>
				</swiper-item>
			</swiper>
		</div>
		
		<div v-if="composeDM" class="compose-DM">
			<div class="DM-card">
				<div style="width: 80%;">
					<uni-easyinput type="textarea" v-model="userDM" v-bind:placeholder="`私信 @ ${post.OP}`" />
				</div>
				<div style="width: 40%;">
					<div class="DM-send-button" v-on:click="commitDM">发送</div>
					<div class="DM-cancel-button" v-on:click="cancelDM">取消</div>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userName: "", 
				userComment: "", 
				userDM: "", 
				post: {}, 
				likes: [], 
				clickLike: false, 
				comments: [], 
				commentBox: false, 
				leaveMessage: false, 
				composeDM: false, 
				showLargeImage: false, 
				clickedImageIndex: -1, 
				scrollTo: "", 
				scrollBack: "post-likes-comments-id", 
				isTyping: false, 
				isReply: false, 
				replyTo: "", 
				placeHolder: "留言", 
				transitionAni: ['fade']
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
			
			// TODO: get likes & comments info of this post from backend
			this.likes = ["用户 1", "用户 2"]
			this.comments = [{userName: "用户 1", isReply: false, replyTo: null, comment: "评论评论"}, {userName: "用户 2", isReply: false, replyTo: null, comment: "互动一下, 互动一下, 互动一下, 互动一下, 互动一下, 互动一下, 互动一下, 互动一下, 互动一下, 互动一下, 互动一下, 互动一下, 互动一下, 互动一下"}]
		},
		computed: {
			eventTime() {
				// TODO: is it possible that the backend sends back the string of date in format "yyyy-mm-dd"
				return this.post.eventTimeFrame
			},
			
			timeElapsedSincePost() {
				let now = new Date()
				let elapsed = now - new Date(this.post.postTime)
				if (elapsed > 24 * 60 * 60 * 1000) {
					return (Math.round(elapsed / (24 * 60 * 60 * 1000))).toString() + " 天前"
				} else if (elapsed > 60 * 60 * 1000) {
					return (Math.round(elapsed / (60 * 60 * 1000))).toString() + " 小时前"
				} else {
					return (Math.round(elapsed / (60 * 1000))).toString() + " 分钟前"
				}
			}
		},
		methods: {
			likePost(e) {
				this.likes.push(this.userName); 
				this.clickLike = true;
			}, 
			unlikePost(e) {
				this.likes.pop();
				this.clickLike = false;
			}, 
			addMessage(e) {
				this.leaveMessage = !this.leaveMessage;
			}, 
			addDM(e) {
				this.composeDM = true;
			}, 
			addComment(e) {
				this.commentBox = !this.commentBox;
				if (this.commentBox) {
					this.scrollTo = "my-comment";
				} else {
					this.scrollTo = "post-likes-comments-id";
				}
				this.scrollBack = "post-likes-comments-id";
				this.isTyping = this.commentBox;
				this.isReply = false;
				this.userComment = "";
				this.placeHolder = "留言";
			}, 
			commitComment(e) {
				if (this.userComment == "") {
					return;
				}
				if (this.isReply) {
					this.comments.push({userName: this.userName, isReply: true, replyTo: this.replyTo, comment: this.userComment});
				} else {
					this.comments.push({userName: this.userName, isReply: false, replyTo: null, comment: this.userComment});
				}
				this.userComment = "";
				this.replyTo = "";
				this.placeHolder = "留言";
				this.isTyping = false;
				this.isReply = false;
				this.commentBox = false;
				this.scrollTo = this.scrollBack;
				
				// TODO: send comment to backend
			}, 
			cancelComment(e) {
				this.userComment = "";
				this.replyTo = "";
				this.placeHolder = "留言";
				this.isTyping = false;
				this.isReply = false;
				this.commentBox = false;
				this.scrollTo = this.scrollBack;
			}, 
			reply(replyTo, index) {
				if (!this.isTyping) {
					this.commentBox = true;
					this.userComment = "";
					this.placeHolder = "回复 " + replyTo + ": ";
					this.isTyping = true;
					this.isReply = true;
					this.replyTo = replyTo;
					this.scrollTo = "my-comment";
					this.scrollBack = "individual-post-comment-" + index.toString();
				}
			}, 
			displayCommentName(comment) {
				if (comment.isReply) {
					return comment.userName + ' @ ' + comment.replyTo;
				} else {
					return comment.userName;
				}
			}, 
			commitDM(e) {
				if (this.userDM != "") {
					// TODO: send DM to backend
					this.composeDM = false;
				}
			}, 
			cancelDM(e) {
				this.composeDM = false;
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
		background-color: whitesmoke;
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
	.leave-message-button {
		width: 90%;
		margin-top: 3rem;
		display: flex; 
		flex-direction: row; 
		align-items: center; 
		justify-content: flex-end; 
		height: 2rem;
	}
	.leave-message-button-body {
		display: flex; 
		flex-direction: row; 
		align-items: center; 
		justify-content: space-evenly; 
		height: 2rem; 
		width: 7rem; 
		background-color: whitesmoke; 
		border-radius: 5px; 
		margin-right: 0.5rem;
	}
	.post-divide-line {
		width: 90%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		margin-top: 2rem;
		margin-bottom: 2rem;
	}
	.post-likes-comments {
		width: 100vw;
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		align-items: center;
		background-color: whitesmoke;
	}
	.post-comments {
		width: 90%;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		padding-top: 1rem;
	}
	.individual-post-comment {
		margin-bottom: 0.5rem;
		width: 100%;
	}
	.add-comment {
		width: 100vw; 
		background-color: whitesmoke; 
		display: flex; 
		flex-direction: column; 
		align-items: center; 
		flex-wrap: nowrap;
	}
	.comment-text {
		width: 90%;
		margin-top: 2rem;
	}
	.send-button {
		position: relative;
		bottom: 2rem;
		left: 35%;
		height: 1.5rem; 
		width: 3.5rem;
		background-color: cadetblue; 
		border-radius: 7px;
		z-index: 3;
		display: flex; 
		justify-content: center; 
		align-items: center;
	}
	.cancel-button {
		position: relative;
		bottom: 3.5rem;
		left: 18%;
		height: 1.5rem;
		width: 3.5rem;
		border-style: solid;
		border-color: cadetblue;
		border-width: 1px;
		border-radius: 7px;
		z-index: 3;
		display: flex; 
		flex-direction: column; 
		justify-content: center; 
		align-items: center;
	}
	.compose-DM {
		position: fixed; 
		top: 0; 
		width: 100vw; 
		height: 100vh; 
		background-color: rgba(0, 0, 0, 20%); 
		display: flex; 
		justify-content: center; 
		align-items: center; 
		z-index: 5;
	}
	.DM-card {
		width: 70%; 
		height: 14rem; 
		display: flex; 
		flex-direction: column; 
		align-items: center; 
		justify-content: space-around; 
		background-color: rgb(255, 255, 255); 
		border-radius: 10px;
	}
	.DM-send-button {
		width: 100%; 
		height: 1.5rem; 
		border-radius: 10px; 
		background-color: cadetblue; 
		display: flex; 
		justify-content: center; 
		align-items: center; 
		color: white; 
		font-size: 80%; 
		margin-bottom: 0.5rem;
	}
	.DM-cancel-button {
		width: 100%; 
		height: 1.5rem; 
		border-radius: 10px; 
		border-style: solid; 
		border-color: cadetblue; 
		border-width: 1px; 
		display: flex; 
		justify-content: center; 
		align-items: center; 
		color: darkgray; 
		font-size: 80%;
	}
</style>
