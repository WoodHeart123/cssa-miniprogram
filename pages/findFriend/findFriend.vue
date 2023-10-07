<template>
	<view>
		<text>Hi there</text>
		<div class="find-friend-navbar">
			<div class="find-friend-navbar-item" v-for="item in navbarItems" v-bind:key="item">
				{{ item }}
			</div>
		</div>
		
		<div class="find-friend-posts">
			<ol>
				<singlePost v-for="post in posts" v-bind:key="post.id" v-bind:post="post" />
			</ol>
		</div>
	</view>
</template>

<script>
	import singlePost from './singlePost.vue'
	export default{
		components: {
			singlePost
		},
		data() {
			return {
				navbarItems: ['全部', '课友', '游戏', '运动', '旅游', '吃饭'],
				posts: []
			}
		},
	}
</script>

<style scoped>
	.find-friend-navbar {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		top: 0;
		margin-bottom: 4rem;
		width: 100%;
		position: fixed;
		background-color: whitesmoke;
	}
	.find-friend-navbar-item {
		padding-right: 2rem;
	}
	.find-friend-posts {
		margin-bottom: 4rem;
		background-color: white;
	}
</style>