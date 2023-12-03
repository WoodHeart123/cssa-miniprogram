<template>
	<view style="background-color: white; height: 100vh; width: 100%;">
		<div class="find-friend-navbar">
			<div v-for="(item, index) in navbarItems" v-bind:key="item">
				<div v-bind:class="navBarItemStyle(index)" @click="changeTab(index)">{{ item }}</div>
			</div>
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
		
		<div v-if="unreadNotifications" class="unread-notification" v-on:click="readNotifications()">
			<text style="color: whitesmoke;">您互动的帖子有新消息</text>
		</div>
		
		<div class="compose-button">
			<div style="height: 100%; display: flex; justify-content: center; align-items: center;">
				<uni-icons type="compose" size="25" color="white" style="left: 50%; top: 50%;" />
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
				navbarItems: ['全部', '吃饭', '运动', '旅游', '游戏'], 
				
				// TODO: Get whether the user has unread notifications from backend
				// TODO: Get the posts from backend in onLoad() function
				// TODO: Get posts that have user's unread notifications
				unreadNotifications: true, 
				allPosts: [
					[
						{
							id: 1, 
							OP: "用户 1", 
							avatar: "https://i.imgur.com/PYjj1mI.png", 
							postTime: null, 
							eventTimeFrame: null, 
							title: "标题 1", 
							text: "这是一个测试通告", 
							images: ["https://i.imgur.com/xJCROfR.jpg"], 
							tag: []
						}, 
						{ id: 2, OP: "用户 2", avatar: "https://i.imgur.com/KiOByze.png", postTime: null, eventTimeFrame: null, title: "标题 2", text: "这还是一个测试通告", images: ["https://i.imgur.com/OK0SAIp.jpg"], tag: []}, 
						{ id: 3, OP: "用户 3", avatar: "https://i.imgur.com/V2pGpCC.png", postTime: null, eventTimeFrame: null, title: "标题 3", text: "这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告", images: ["https://i.imgur.com/QvaszPR.png", "https://i.imgur.com/RayNQyw.png"], tag: []}, 
						{ id: 4, OP: "用户 4", avatar: "https://i.imgur.com/Ml0LdJ1.png", postTime: null, eventTimeFrame: null, title: "标题 4", text: "这还是一个测试通告", images: ["https://i.imgur.com/3PbyN51.jpg", "https://i.imgur.com/OK0SAIp.jpg", "https://i.imgur.com/rNEs9p4.jpg", "https://i.imgur.com/aT9fyff.png"], tag: []}, 
						{ id: 5, OP: "用户 5", avatar: "https://i.imgur.com/AswImhg.png", postTime: null, eventTimeFrame: null, title: "标题 5标题 5标题 5标题 5标题 5标题 5标题 5标题 5", text: "这还是一个测试通告", images: ["https://i.imgur.com/rNEs9p4.jpg"], tag: []}, 
						{ id: 6, OP: "用户 6", avatar: "https://i.imgur.com/32enhJ3.png", postTime: null, eventTimeFrame: null, title: "标题 6", text: "这还是一个测试通告", images: ["https://i.imgur.com/aT9fyff.png"], tag: []}, 
						{ id: 7, OP: "用户 7", avatar: "https://i.imgur.com/sclIw5q.png", postTime: null, eventTimeFrame: null, title: "标题 7", text: "这还是一个测试通告", images: ["https://i.imgur.com/nhTiMwb.jpg", "https://i.imgur.com/yz1KHBk.jpg", "https://i.imgur.com/slkAGmA.png"], tag: []}, 
						{ id: 8, OP: "用户 8", avatar: "https://i.imgur.com/nEhdq1e.png", postTime: null, eventTimeFrame: null, title: "一个很长的标题一个很长的标题一个很长的标题", text: "这还是一个测试通告", images: ["https://i.imgur.com/AoZTdk2.jpg", "https://i.imgur.com/yW82HKT.jpg"], tag: []}, 
						{ id: 9, OP: "用户 9", avatar: "https://i.imgur.com/vfzqviR.png", postTime: null, eventTimeFrame: null, title: "标题 9", text: "这还是一个测试通告", images: ["https://i.imgur.com/ocmwopm.jpg", "https://i.imgur.com/r4yxUO4.jpg"], tag: []}, 
						{ id: 10, OP: "用户 10", avatar: "https://i.imgur.com/kUuvtN7.png", postTime: null, eventTimeFrame: null, title: "标题 10", text: "这还是一个测试通告", images: ["https://i.imgur.com/g6mPio7.jpg", "https://i.imgur.com/uKELo6M.jpg"], tag: []}, 
						{ id: 11, OP: "用户 11", avatar: "https://i.imgur.com/Ps6Ak10.png", postTime: null, eventTimeFrame: null, title: "标题 11", text: "这还是一个测试通告", images: ["https://i.imgur.com/Qym9Nnk.png"], tag: []}, 
						{ id: 12, OP: "用户 12", avatar: "https://i.imgur.com/MINKbXv.png", postTime: null, eventTimeFrame: null, title: "标题 12", text: "这还是一个测试通告", images: [], tag: []}
					], 
					[
						{ id: 2, OP: "用户 2", avatar: "https://i.imgur.com/KiOByze.png", postTime: null, eventTimeFrame: null, title: "标题 2", text: "这还是一个测试通告", images: ["https://i.imgur.com/OK0SAIp.jpg"], tag: []}, 
						{ id: 3, OP: "用户 3", avatar: "https://i.imgur.com/V2pGpCC.png", postTime: null, eventTimeFrame: null, title: "标题 3", text: "这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告", images: ["https://i.imgur.com/yyLqiFv.jpg", "https://i.imgur.com/RayNQyw.png"], tag: []}
					], 
					[
						{ id: 4, OP: "用户 4", avatar: "https://i.imgur.com/Ml0LdJ1.png", postTime: null, eventTimeFrame: null, title: "标题 4", text: "这还是一个测试通告", images: ["https://i.imgur.com/3PbyN51.jpg", "https://i.imgur.com/OK0SAIp.jpg", "https://i.imgur.com/rNEs9p4.jpg", "https://i.imgur.com/aT9fyff.png"], tag: []}, 
						{ id: 5, OP: "用户 5", avatar: "https://i.imgur.com/AswImhg.png", postTime: null, eventTimeFrame: null, title: "标题 5标题 5标题 5标题 5标题 5标题 5标题 5标题 5", text: "这还是一个测试通告", images: ["https://i.imgur.com/rNEs9p4.jpg"], tag: []}, 
						{ id: 6, OP: "用户 6", avatar: "https://i.imgur.com/32enhJ3.png", postTime: null, eventTimeFrame: null, title: "标题 6", text: "这还是一个测试通告", images: ["https://i.imgur.com/aT9fyff.png"], tag: []}
					],
					[
						{ id: 8, OP: "用户 8", avatar: "https://i.imgur.com/nEhdq1e.png", postTime: null, eventTimeFrame: null, title: "一个很长的标题一个很长的标题一个很长的标题", text: "这还是一个测试通告", images: ["https://i.imgur.com/AoZTdk2.jpg", "https://i.imgur.com/yW82HKT.jpg"], tag: []}, 
						{ id: 9, OP: "用户 9", avatar: "https://i.imgur.com/vfzqviR.png", postTime: null, eventTimeFrame: null, title: "标题 9", text: "这还是一个测试通告", images: ["https://i.imgur.com/ocmwopm.jpg", "https://i.imgur.com/r4yxUO4.jpg"], tag: []}, 
						{ id: 10, OP: "用户 10", avatar: "https://i.imgur.com/kUuvtN7.png", postTime: null, eventTimeFrame: null, title: "标题 10", text: "这还是一个测试通告", images: ["https://i.imgur.com/g6mPio7.jpg", "https://i.imgur.com/uKELo6M.jpg"], tag: []}
					],
					[
						{ id: 11, OP: "用户 11", avatar: "https://i.imgur.com/Ps6Ak10.png", postTime: null, eventTimeFrame: null, title: "标题 11", text: "这还是一个测试通告", images: ["https://i.imgur.com/Qym9Nnk.png"], tag: []}, 
						{ id: 12, OP: "用户 12", avatar: "https://i.imgur.com/MINKbXv.png", postTime: null, eventTimeFrame: null, title: "标题 12", text: "这还是一个测试通告", images: [], tag: []}
					], 
					[
						{ id: 8, OP: "用户 8", avatar: "https://i.imgur.com/nEhdq1e.png", postTime: null, eventTimeFrame: null, title: "一个很长的标题一个很长的标题一个很长的标题", text: "这还是一个测试通告", images: ["https://i.imgur.com/AoZTdk2.jpg", "https://i.imgur.com/yW82HKT.jpg"], tag: []},
						{ id: 9, OP: "用户 9", avatar: "https://i.imgur.com/vfzqviR.png", postTime: null, eventTimeFrame: null, title: "标题 9", text: "这还是一个测试通告", images: ["https://i.imgur.com/ocmwopm.jpg", "https://i.imgur.com/r4yxUO4.jpg"], tag: []}, 
						{ id: 10, OP: "用户 10", avatar: "https://i.imgur.com/kUuvtN7.png", postTime: null, eventTimeFrame: null, title: "标题 10", text: "这还是一个测试通告", images: ["https://i.imgur.com/g6mPio7.jpg", "https://i.imgur.com/uKELo6M.jpg"], tag: []}
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
			}, 
			readNotifications() {
				this.unreadNotifications = false
				this.selectedTab = 5
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
		padding-right: 0.5rem;
		padding-bottom: 1rem;
		margin-bottom: 1rem;
		width: 100%;
		background-color: #9B0009;
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
		padding-top: 0.5rem;
		padding-bottom: 7rem;
		background-color: white;
	}
	.div-line-bottom {
		width: 35%;
		height: 1px;
		background-color: #f2f2f2;
		margin-left: 1rem;
		margin-right: 1rem;
	}
	.unread-notification {
		position: fixed;
		bottom: 2rem;
		left: 10%;
		width: 60%;
		height: 3rem;
		border-top-left-radius: 1.5rem;
		border-top-right-radius: 1.5rem;
		border-bottom-left-radius: 1.5rem;
		border-bottom-right-radius: 1.5rem;
		background-color: #D3D3D370;
		backdrop-filter: blur(8px);
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: center;
		padding-left: 1rem;
		padding-right: 1rem;
	}
	.compose-button {
		position: fixed; 
		height: 3rem; 
		width: 3rem; 
		bottom: 2rem; 
		right: 2rem; 
		background-color: #9B0009A0; 
		backdrop-filter: blur(8px);
		border-radius: 50%;
	}
</style>