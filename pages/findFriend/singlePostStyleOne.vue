<template>
	<div class="post" v-bind:key="post.id">
		<div class="post-title">
			<div style="font-weight: 500;">{{ post.title }}</div>
			<div style="font-size: 0.7rem;">{{ post.OP }}</div>
		</div>
		<div class="post-title post-time">
			<div>{{ displayEventTimeFrame }}</div>
			<div>{{ timeElapasedSincePost }}</div>
		</div>
		
		<div class="post-content">
			<div v-if="post.images.length > 0" style="width: 40%;">
				<image v-bind:src="`${post.images[0]}`" class="post-image" mode="aspectFill" />
			</div>
			<div v-bind:class="postTextStyle">{{ postText }}</div>
		</div>
		
		<div v-if="!lastOne" class="div-line" />
		<div v-else class="div-bottom">
			<div class="div-line-bottom"></div>
			<div style="color: lightgray;">到底啦</div>
			<div class="div-line-bottom"></div>
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
			lastOne: {
				type: Boolean,
				required: true
			}
		},
		computed: {
			displayEventTimeFrame() {
				if (this.post.eventTimeFrame == "") {
					return "不限"
				}
				else {
					return this.post.eventTimeFrame
				}
			},
			
			// TODO: actually compute time elapsed since post
			
			timeElapasedSincePost() {
				return "50 分钟前"
			},
			postText() {
				if (this.post.text.length > 30) {
					return (this.post.text.slice(0, 100) + "  ...")
				}
				else {
					return this.post.text
				}
			},
			postTextStyle() {
				if (this.post.images.length == 0) {
					return {
						"post-text-full": true
					}
				} else {
					return {
						"post-text-half": true
					}
				}
			}
		}
	}
</script>

<style scoped>
	.post {
		width: 100%;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		align-items: center;
		margin-top: 0.7rem;
	}
	.post-title {
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-bottom: 0.2rem;
	}
	.post-time {
		color: darkgray;
		font-size: 0.7rem;
	}
	.post-content {
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		margin-top: 1rem;
		margin-bottom: 1rem;
	}
	.post-image {
		width: 100%; 
		height: 30vw;
		border-radius: 7px;
	}
	.post-text-half {
		width: 40%;
	}
	.post-text-full {
		width: 100%;
	}
	.div-line {
		width: 100%;
		height: 1rpx;
		margin-top: 1rem;
		margin-bottom: 1rem;
		background-color: #f2f2f2;
	}
	.div-bottom {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 4rem;
	}
	.div-line-bottom {
		background-color: lightgray;
		width: 40%;
		height: 1rpx;
	}
</style>
