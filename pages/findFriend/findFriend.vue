<template>
	<view style="background-color: white; height: 100vh; width: 100%;">
		<div class="find-friend-navbar">
			<div v-for="(item, index) in navbarItems" v-bind:key="item.name">
				<div v-bind:class="navBarItemStyle(index)" @click="changeTab(index)">{{ item.name }}</div>
			</div>
			
			<!-- TODO: Add search function -->
			
			<uni-icons type="search" size="25" color="white" style="margin-right: 1rem;"/>
		</div>
		
		<div class="find-friend-posts">
			<div v-for="post in allPosts[selectedTab]" style="width: 45%;">
				<navigator v-bind:url="'./singlePostDetail?post=' + encodeURIComponent(JSON.stringify(post))">
					<singlePostStyleTwo v-bind:post="post" useBorderStyle="show-border" />
				</navigator>
			</div>
			<div v-if="allPosts[selectedTab].length % 2 == 1" style="width: 45%;" />
		</div>
		
		<div class="div-bottom">
			<div class="div-line-bottom" />
			<div style="color: lightgray;">到底啦</div>
			<div class="div-line-bottom" />
		</div>
		
		<div class="compose-button">
			<div style="height: 100%; display: flex; justify-content: center; align-items: center;">
				<uni-icons type="compose" size="30" color="white" style="left: 50%; top: 50%;" />
			</div>
		</div>
	</view>
</template>

<script>
	import singlePostStyleTwo from './singlePostStyleTwo.vue'
	export default{
		components: {
			singlePostStyleTwo,
		},
		data() {
			return {
				selectedTab: 0,
				navbarItems: [
					{
						name: '全部',
						url: ''
					},
					{ name: '吃饭', url: '' }, { name: '运动', url: '' }, { name: '旅游', url: '' }, { name: '游戏', url: '' }
				],
				
				// TODO: Get the posts from backend
				
				allPosts: [
					[
						{
							id: 1, 
							OP: "用户 1", 
							title: "标题 1", 
							postTime: null,
							eventTimeFrame: "Oct.1", 
							text: "这是一个测试通告",
							images: ["https://i.imgur.com/xJCROfR.jpg"],
							tag: ["tag 1", "tag 1.1", "tag 1.2", "tag 1.3", "tag 1.4", "tag 1.5"],
							comments: [
								{
									userName: "用户 1",
									comment: "评论。。。"
								}, 
								{
									userName: "用户 2",
									comment: "一些评论。。"
								}
							]
						},
						{ id: 2, OP: "用户 2", title: "标题 2", postTime: null, eventTimeFrame: "", text: "这还是一个测试通告", images: ["https://i.imgur.com/OK0SAIp.jpg"], tag: ["tag 2", "tag 2.1"], comments: [{ userName: "用户 2", comment: "评论。。。" }, { userName: "用户 3", comment: "很多评论。。。" }]},
						{ id: 3, OP: "用户 3", title: "标题 3", postTime: null, eventTimeFrame: "Oct. 2", text: "这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告", images: ["https://i.imgur.com/JwEzAh8.jpg"], tag: ["tag 3"], comments: [{ userName: "用户 2", comment: "评论。。。" }, { userName: "用户 3", comment: "评论。。。" }, { userName: "用户 4", comment: "评论。。。评论" }]},
						{ id: 4, OP: "用户 4", title: "标题 4", postTime: null, eventTimeFrame: "", text: "这还是一个测试通告", images: ["https://i.imgur.com/3PbyN51.jpg", "https://i.imgur.com/OK0SAIp.jpg", "https://i.imgur.com/rNEs9p4.jpg", "https://i.imgur.com/aT9fyff.png"], tag: ["tag 4", "tag 4.1"], comments: []},
						{ id: 5, OP: "用户 5", title: "标题 5", postTime: null, eventTimeFrame: "", text: "这还是一个测试通告", images: ["https://i.imgur.com/rNEs9p4.jpg"], tag: ["tag 5"], comments: []},
						{ id: 6, OP: "用户 6", title: "标题 6", postTime: null, eventTimeFrame: "", text: "这还是一个测试通告", images: ["https://i.imgur.com/aT9fyff.png"], tag: ["tag 6"], comments: []},
						{ id: 7, OP: "用户 7", title: "标题 7", postTime: null, eventTimeFrame: "", text: "这还是一个测试通告", images: [], tag: ["tag 7"], comments: []}
					], 
					[],
					[
						{ id: 2, OP: "用户 2", title: "标题 2", postTime: null, eventTimeFrame: "", text: "这还是一个测试通告", images: ["https://i.imgur.com/OK0SAIp.jpg"], tag: ["tag 2", "tag 2.1"], comments: [{ userName: "用户 2", comment: "评论。。。" }, { userName: "用户 3", comment: "很多评论。。。" }]},
						{ id: 3, OP: "用户 3", title: "标题 3", postTime: null, eventTimeFrame: "Oct. 2", text: "这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告", images: ["https://i.imgur.com/JwEzAh8.jpg"], tag: ["tag 3"], comments: [{ userName: "用户 2", comment: "评论。。。" }, { userName: "用户 3", comment: "评论。。。" }, { userName: "用户 4", comment: "评论。。。评论" }]}
					], 
					[
						{ id: 4, OP: "用户 4", title: "标题 4", postTime: null, eventTimeFrame: "", text: "这还是一个测试通告", images: ["https://i.imgur.com/3PbyN51.jpg", "https://i.imgur.com/OK0SAIp.jpg", "https://i.imgur.com/rNEs9p4.jpg", "https://i.imgur.com/aT9fyff.png"], tag: ["tag 4", "tag 4.1"], comments: []}
					],
					[
						{ id: 5, OP: "用户 5", title: "标题 5", postTime: null, eventTimeFrame: "", text: "这还是一个测试通告", images: ["https://i.imgur.com/rNEs9p4.jpg"], tag: ["tag 5"], comments: []},
						{ id: 6, OP: "用户 6", title: "标题 6", postTime: null, eventTimeFrame: "", text: "这还是一个测试通告", images: ["https://i.imgur.com/aT9fyff.png"], tag: ["tag 6"], comments: []}
					],
					[
						{ id: 7, OP: "用户 7", title: "标题 7", postTime: null, eventTimeFrame: "", text: "这还是一个测试通告", images: [], tag: ["tag 7"], comments: []}
					]
				]
			}
		},
		methods: {
			navBarItemStyle(index) {
				if (index == this.selectedTab) {
					return {
						"find-friend-navbar-selected-item": true
					}
				} else {
					return {
						"find-friend-navbar-item": true
					}
				}
			},
			changeTab(index) {
				this.selectedTab = index
			}
		}
	}
</script>

<style scoped>
	.find-friend-navbar {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		top: 0;
		padding-top: 1rem;
		padding-left: 1.5rem;
		padding-bottom: 1rem;
		margin-bottom: 1rem;
		width: 100%;
		background-color: indianred;
	}
	.find-friend-navbar-item {
		padding-right: 1rem;
		color: white;
	}
	.find-friend-navbar-selected-item {
		padding-right: 1rem;
		color: white;
		font-size: 130%;
		font-weight: 500;
	}
	.find-friend-posts {
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-evenly;
		background-color: white;
		padding-top: 1rem;
	}
	.div-bottom {
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: center;
		padding-top: 2rem;
		padding-bottom: 4rem;
		background-color: white;
	}
	.div-line-bottom {
		width: 35%;
		height: 1px;
		background-color: #f2f2f2;
		margin-left: 1rem;
		margin-right: 1rem;
	}
	.compose-button {
		position: fixed; 
		height: 3.5rem; 
		width: 3.5rem; 
		bottom: 2rem; 
		right: 2rem; 
		background-color: indianred; 
		border-radius: 50%;
	}
</style>