<template>
	<div v-bind:class="borderStyle" v-bind:key="post.id">
		<div v-if="post.images.length > 0" style="width: 100%;">
			<image v-bind:src="`${post.images[0]}`" class="post-image" mode="aspectFill" />
		</div>
		<div v-else-if="post.description.length > 0" class="post-content">
			<text style="width: 90%;">{{ postContent }}</text>
		</div>
		<div v-else style="width: 100%;">
			<image src="https://i.imgur.com/4BuEzrB.png" class="post-image" style="height: 5rem;" mode="aspectFit" />
		</div>
		
		<div class="post-title">
			<text v-if="post.title.length > 13" style="height: 1.85rem;">{{ postTitle }}</text>
			<text v-else style="height: 0.85rem;">{{ postTitle }}</text>
		</div>
		
		<div class="post-info post-info-text">
			<div style="display: flex; flex-direction: row; align-items: center;">
				<image v-bind:src="'https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/' + post.userAvatar + '.jpg'" class="avatar" mode="aspectFill" />
				<text>{{ postOP }}</text>
			</div>
			<text>{{ timeElapsedSincePost() }}</text>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			post: {
				type: Object,
				required: true
			},
			useBorderStyle: {
				type: String,
				required: true
			},
			postHeight: {
				type: String,
				required: true
			}
		},
		computed: {
			borderStyle() {
				return {
					"post": true,
					[this.useBorderStyle]: true,
					[this.postHeight]: true
				}
			},
			postTitle() {
				if (this.post.title.length > 25) {
					return this.post.title.slice(0, 25) + " ...";
				} else {
					return this.post.title;
				}
			},
			postOP() {
				if (this.post.userNickname.length > 7) {
					return this.post.userNickname.slice(0, 7) + " ...";
				} else {
					return this.post.userNickname;
				}
			},
			postContent() {
				if (this.post.description.length > 30) {
					return this.post.description.slice(0, 30) + " ...";
				} else {
					return this.post.description;
				}
			}
		}, 
		methods: {
			timeElapsedSincePost() {
				let now = new Date();
				let elapsed = now - new Date(this.post.createdAt);
				if (elapsed > 24 * 60 * 60 * 1000) {
					return (Math.round(elapsed / (24 * 60 * 60 * 1000))).toString() + " 天前";
				} else if (elapsed > 60 * 60 * 1000) {
					return (Math.round(elapsed / (60 * 60 * 1000))).toString() + " 小时前";
				} else {
					return (Math.round(elapsed / (60 * 1000))).toString() + " 分钟前";
				}
			}
		}
	}
</script>

<style scoped>
	.post-height-1 {
		height: 14.5rem;
	}
	.post-height-2 {
		height: 13.5rem;
	}
	.post-height-3 {
		height: 9.5rem;
	}
	.post-height-4 {
		height: 8.5rem;
	}
	.post {
		width: 100%;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		align-items: center;
		background-color: white;
		border-radius: 5px;
	}
	.post-image {
		width: 100%; 
		height: 10rem; 
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
	}
	.post-content {
		width: 100%;
		height: 5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow-wrap: break-word;
		font-size: 90%;
		font-family: 'Courier New', Courier, monospace;
	}
	.post-title {
		font-weight: 500; 
		font-size: 85%; 
		width: 90%; 
		overflow-wrap: break-word;
		margin-bottom: 0.5rem;
	}
	.post-info {
		width: 90%;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		margin: 0.1rem auto 0.2rem;
	}
	.avatar {
		width: 1.2rem;
		height: 1.2rem;
		border-radius: 50%;
		float: left;
		margin-right: 0.5rem;
	}
	.post-info-text {
		color: darkgray;
		font-size: 0.7rem;
	}
	.show-border {}
	.hide-border {}
</style>