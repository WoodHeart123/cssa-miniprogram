<template>
	<div v-bind:class="borderStyle" v-bind:key="post.id">
		<div v-if="post.images.length > 0" style="width: 100%;">
			<image v-bind:src="`${post.images[0]}`" class="post-image" mode="aspectFill" />
		</div>
		<div v-else style="width: 100%;">
			<image src="https://i.imgur.com/kWQpPbL.png" class="post-image" mode="aspectFill" />
		</div>
		
		<div class="post-title">
			<div style="font-weight: 500;">{{ post.title }}</div>
			<div style="font-size: 0.7rem;">{{ post.OP }}</div>
		</div>
		<div class="post-title post-time">
			<div>{{ displayEventTimeFrame }}</div>
			<div>{{ timeElapasedSincePost }}</div>
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
			borderStyle() {
				return {
					"post": true,
					[this.useBorderStyle]: true,
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
		flex-wrap: wrap;
		justify-content: space-between;
		margin-bottom: 0.2rem;
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