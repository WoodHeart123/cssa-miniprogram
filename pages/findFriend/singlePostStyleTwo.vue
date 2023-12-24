<template>
	<div v-bind:class="borderStyle" v-bind:key="post.id">
		<div v-if="post.images.length > 0" style="width: 100%;">
			<image v-bind:src="`${post.images[0]}`" class="post-image" mode="aspectFill" />
		</div>
		<div v-else style="width: 100%;">
			<image src="https://i.imgur.com/kWQpPbL.png" class="post-image" mode="aspectFill" />
		</div>
		
		<div class="post-title">
			<image v-bind:src="`${post.avatar}`" class="avatar" mode="aspectFill" />
			<div style="font-weight: 500; font-size: 90%; width: 70%; text-align: right; overflow-wrap: break-word;">{{ postTitle }}</div>
		</div>
		
		<div class="post-title post-time">
			<div>{{ postOP }}</div>
			<div>{{ timeElapsedSincePost() }}</div>
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
				if (this.post.title.length > 12) {
					return this.post.title.slice(0, 12) + " ..."
				} else {
					return this.post.title
				}
			},
			postOP() {
				if (this.post.OP.length > 9) {
					return this.post.OP.slice(0, 9) + " ..."
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
		height: 13.5rem;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		align-items: center;
	}
	.post-title {
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.2rem;
	}
	.avatar {
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
	}
	.post-time {
		color: darkgray;
		font-size: 0.7rem;
	}
	.post-image {
		width: 100%; 
		height: 8rem; 
		border-radius: 10px;
		margin-bottom: 0.5rem;
	}
	.show-border {}
	.hide-border {}
</style>