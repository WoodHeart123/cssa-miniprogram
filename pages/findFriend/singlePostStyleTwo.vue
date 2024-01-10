<template>
	<div v-bind:class="borderStyle" v-bind:key="post.id">
		<div v-if="post.images.length > 0" style="width: 100%;">
			<image v-bind:src="`${post.images[0]}`" class="post-image" mode="aspectFill" />
		</div>
		<div v-else style="width: 100%;">
			<image src="https://i.imgur.com/kWQpPbL.png" class="post-image" mode="aspectFill" />
		</div>
		
		<text class="post-title">{{ postTitle }}</text>
		
		<div class="post-info post-info-text">
			<div style="display: flex; flex-direction: row; align-items: center;">
				<image v-bind:src="`${post.avatar}`" class="avatar" mode="aspectFill" />
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
			}
		},
		computed: {
			borderStyle() {
				return {
					"post": true,
					[this.useBorderStyle]: true,
				}
			},
			postTitle() {
				if (this.post.title.length > 22) {
					return this.post.title.slice(0, 22) + " ..."
				} else {
					return this.post.title
				}
			},
			postOP() {
				if (this.post.OP.length > 7) {
					return this.post.OP.slice(0, 7) + " ..."
				} else {
					return this.post.OP
				}
			}
		}, 
		methods: {
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
		}
	}
</script>

<style scoped>
	.post {
		width: 100%;
		height: 14.5rem;
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
	.post-title {
		font-weight: 500; 
		font-size: 85%; 
		width: 90%; 
		overflow-wrap: break-word;
		height: 1.85rem;
		margin-bottom: 0.5rem;
	}
	.post-info {
		width: 90%;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		margin: 0.2rem auto 0.2rem;
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