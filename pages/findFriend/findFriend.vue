<template>
	<view style="background-color: whitesmoke; height: 100vh; width: 100%;">
		<div class="find-friend-navbar">
			<!-- <image v-if="selectedTab == 0" src="/pages/findFriend/images/home-click.png" style="height: 2rem; width: 2rem;" mode="aspectFit" />
			<image v-else src="/pages/findFriend/images/home.png" style="height: 2rem; width: 2rem;" mode="aspectFit" v-on:click="changeTab(0)" />
			<image v-if="selectedTab == 1" src="/pages/findFriend/images/food-click.png" style="height: 2rem; width: 2rem;" mode="aspectFit" />
			<image v-else src="/pages/findFriend/images/food.png" style="height: 2rem; width: 2rem;" mode="aspectFit" v-on:click="changeTab(1)" />
			<image v-if="selectedTab == 2" src="/pages/findFriend/images/sports-click.png" style="height: 2rem; width: 2rem;" mode="aspectFit" />
			<image v-else src="/pages/findFriend/images/sports.png" style="height: 2rem; width: 2rem;" mode="aspectFit" v-on:click="changeTab(2)" />
			<image v-if="selectedTab == 3" src="/pages/findFriend/images/travel-click.png" style="height: 1.8rem; width: 1.8rem;" mode="aspectFit" />
			<image v-else src="/pages/findFriend/images/travel.png" style="height: 1.8rem; width: 1.8rem;" mode="aspectFit" v-on:click="changeTab(3)" />
			<image v-if="selectedTab == 4" src="/pages/findFriend/images/game-click.png" style="height: 1.8rem; width: 1.8rem;" mode="aspectFit" />
			<image v-else src="/pages/findFriend/images/game.png" style="height: 1.8rem; width: 1.8rem;" mode="aspectFit" v-on:click="changeTab(4)" /> -->
			<div v-for="(item, index) in navbarItems" v-bind:key="item">
				<div class="find-friend-navbar-item" v-on:click="changeTab(index)">
					<text v-bind:class="navBarItemTextStyle(index)">{{ item }}</text>
					<div v-if="index == selectedTab" style="height: 1.5px; width: 2rem; margin-top: 0.2rem; background-color: #C5050C;" />
				</div>
			</div>
		</div>
		
		<div class="find-friend-posts">
			<div v-for="post in allPosts[selectedTab]" style="width: 48%; margin-bottom: 0.3rem;" v-on:click="gotoPostDetail(post)">
				<singlePostStyleTwo v-bind:post="post" useBorderStyle="show-border" />
			</div>
			<div v-if="allPosts[selectedTab].length % 2 == 1" style="width: 48%;" />
		</div>
		
		<!-- <div class="div-bottom">
			<div class="div-line-bottom" />
			<div style="color: darkgray;">到底啦</div>
			<div class="div-line-bottom" />
		</div> -->
		
		<!-- <div v-if="unreadNotifications" class="unread-notification" v-on:click="readNotifications()">
			<text style="color: lightgray;">您互动的帖子有新消息</text>
		</div>
		
		<div class="compose-button">
			<div style="height: 100%; display: flex; justify-content: center; align-items: center;">
				<uni-icons type="compose" size="25" color="white" style="left: 50%; top: 50%;" />
			</div>
		</div> -->
		
		<div v-if="reachEnd" style="width: 100%; height: 5rem; background-color: whitesmoke;" />
		
		<div class="bottom-bar">
			<div style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
				<image src="/pages/findFriend/images/home.png" style="height: 1.2rem; width: 1.2rem; margin: 0.1rem 0rem;" mode="aspectFit" />
				<text style="font-size: 60%; color: darkgray;">主页</text>
			</div>
			
			<div style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
				<image v-if="unreadPostNotifications" src="/pages/findFriend/images/bell-notification.png" style="height: 1.4rem; width: 1.4rem;" mode="aspectFit" />
				<image v-else src="/pages/findFriend/images/bell.png" style="height: 1.4rem; width: 1.4rem; margin-top: 0.05rem;" mode="aspectFit" />
				<text style="font-size: 60%; color: darkgray;">动态</text>
			</div>
			
			<div style="height: 1.5rem; width: 2rem; border-radius: 3px; background-color: #C5050C; display: flex; justify-content: center; align-items: center;">
				<uni-icons type="plusempty" size="15" color="white" />
			</div>
				
			<div style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
				<image v-if="unreadDM" src="/pages/findFriend/images/incoming-DM.png" style="height: 1.4rem; width: 1.4rem;" mode="aspectFit" />
				<image v-else src="/pages/findFriend/images/DM.png" style="height: 1.4rem; width: 1.4rem;" mode="aspectFit" />
				<text style="font-size: 60%; color: darkgray;">私信</text>
			</div>
			
			<div style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
				<image src="/pages/findFriend/images/me.png" style="height: 1.2rem; width: 1.2rem;" mode="aspectFit" />
				<text style="font-size: 60%; color: darkgray; padding-top: 0.1rem;">我的</text>
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
				navbarItems: ['全部', '吃饭', '运动', '旅游', '娱乐'], 
				// navbarIcons: ['/pages/findFriend/images/home.png', '/pages/findFriend/images/food.png', '/pages/findFriend/images/sports.png', '/pages/findFriend/images/travel.png', '/pages/findFriend/images/game.png'], 
				// navbarSelectedIcons: ['/pages/findFriend/images/home-click.png', '/pages/findFriend/images/food-click.png', '/pages/findFriend/images/sports-click.png', '/pages/findFriend/images/travel-click.png', '/pages/findFriend/images/game-click.png'], 
				// TODO: Get whether the user has unread notifications from backend
				// TODO: Get the posts from backend in onLoad() function
				// TODO: Get posts that have user's unread notifications
				unreadPostNotifications: true, 
				unreadDM: true, 
				reachEnd: true, 
				allPosts: [
					[
						{
							id: 1, 
							OP: "用户 1", 
							avatar: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/1.jpg", 
							postTime: "2023-12-23", 
							eventTimeFrame: "2023-12-23", 
							title: "标题 1", 
							text: "这是一个测试通告", 
							images: ["https://i.imgur.com/xJCROfR.jpg"], 
							tag: []
						}, 
						{ id: 2, OP: "用户 2", avatar: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/2.jpg", postTime: "2023-12-23", eventTimeFrame: "2023-12-23", title: "标题 2", text: "这还是一个测试通告", images: ["https://i.imgur.com/OK0SAIp.jpg"], tag: []},
						{ id: 3, OP: "用户 3", avatar: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/3.jpg", postTime: "2023-12-23", eventTimeFrame: "2023-12-23", title: "标题 3", text: "这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告", images: ["https://i.imgur.com/QvaszPR.png", "https://i.imgur.com/RayNQyw.png"], tag: []}, 
						{ id: 4, OP: "用户 4", avatar: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/4.jpg", postTime: "2023-12-23", eventTimeFrame: "2023-12-23", title: "标题 4", text: "这还是一个测试通告", images: ["https://i.imgur.com/3PbyN51.jpg", "https://i.imgur.com/OK0SAIp.jpg", "https://i.imgur.com/rNEs9p4.jpg", "https://i.imgur.com/aT9fyff.png"], tag: []}, 
						{ id: 5, OP: "用户 5", avatar: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/5.jpg", postTime: "2023-12-23", eventTimeFrame: "2023-12-23", title: "标题 5标题 5标题 5标题 5标题 5标题 5标题 5标题 5", text: "这还是一个测试通告", images: ["https://i.imgur.com/rNEs9p4.jpg"], tag: []}, 
						{ id: 6, OP: "用户 6", avatar: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/6.jpg", postTime: "2023-12-23", eventTimeFrame: "2023-12-23", title: "标题 6", text: "这还是一个测试通告", images: ["https://i.imgur.com/aT9fyff.png"], tag: []}, 
						{ id: 7, OP: "用户 7", avatar: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/7.jpg", postTime: "2023-12-23", eventTimeFrame: "2023-12-23", title: "标题 7", text: "这还是一个测试通告", images: ["https://i.imgur.com/nhTiMwb.jpg", "https://i.imgur.com/yz1KHBk.jpg", "https://i.imgur.com/slkAGmA.png"], tag: []}, 
						{ id: 8, OP: "用户 8", avatar: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/8.jpg", postTime: "2023-12-23", eventTimeFrame: "2023-12-23", title: "一个很长的标题一个很长的标题一个很长的标题", text: "这还是一个测试通告", images: ["https://i.imgur.com/AoZTdk2.jpg", "https://i.imgur.com/yW82HKT.jpg"], tag: []}, 
						{ id: 9, OP: "用户 9", avatar: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/9.jpg", postTime: "2023-12-23", eventTimeFrame: "2023-12-23", title: "标题 9", text: "这还是一个测试通告", images: ["https://i.imgur.com/ocmwopm.jpg", "https://i.imgur.com/r4yxUO4.jpg"], tag: []}, 
						{ id: 10, OP: "用户 10", avatar: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/10.jpg", postTime: "2023-12-23", eventTimeFrame: "2023-12-23", title: "标题 10", text: "这还是一个测试通告", images: ["https://i.imgur.com/g6mPio7.jpg", "https://i.imgur.com/uKELo6M.jpg"], tag: []}, 
						{ id: 11, OP: "用户 11", avatar: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/11.jpg", postTime: "2023-12-23", eventTimeFrame: "2023-12-23", title: "标题 11", text: "这还是一个测试通告", images: ["https://i.imgur.com/Qym9Nnk.png"], tag: []}, 
						{ id: 12, OP: "用户 12", avatar: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/12.jpg", postTime: "2023-12-23", eventTimeFrame: "2023-12-23", title: "标题 12", text: "这还是一个测试通告", images: [], tag: []}
					],
					[
						{ id: 2, OP: "用户 2", avatar: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/2.jpg", postTime: "2023-12-23", eventTimeFrame: "2023-12-23", title: "标题 2", text: "这还是一个测试通告", images: ["https://i.imgur.com/OK0SAIp.jpg"], tag: []}, 
						{ id: 3, OP: "用户 3", avatar: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/3.jpg", postTime: "2023-12-23", eventTimeFrame: "2023-12-23", title: "标题 3", text: "这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告", images: ["https://i.imgur.com/QvaszPR.png", "https://i.imgur.com/RayNQyw.png"], tag: []}
					], 
					[
						{ id: 4, OP: "用户 4", avatar: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/4.jpg", postTime: "2023-12-23", eventTimeFrame: "2023-12-23", title: "标题 4", text: "这还是一个测试通告", images: ["https://i.imgur.com/3PbyN51.jpg", "https://i.imgur.com/OK0SAIp.jpg", "https://i.imgur.com/rNEs9p4.jpg", "https://i.imgur.com/aT9fyff.png"], tag: []}, 
						{ id: 5, OP: "用户 5", avatar: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/5.jpg", postTime: "2023-12-23", eventTimeFrame: "2023-12-23", title: "标题 5标题 5标题 5标题 5标题 5标题 5标题 5标题 5", text: "这还是一个测试通告", images: ["https://i.imgur.com/rNEs9p4.jpg"], tag: []}, 
						{ id: 6, OP: "用户 6", avatar: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/6.jpg", postTime: "2023-12-23", eventTimeFrame: "2023-12-23", title: "标题 6", text: "这还是一个测试通告", images: ["https://i.imgur.com/aT9fyff.png"], tag: []}
					],
					[
						{ id: 8, OP: "用户 8", avatar: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/8.jpg", postTime: "2023-12-23", eventTimeFrame: "2023-12-23", title: "一个很长的标题一个很长的标题一个很长的标题", text: "这还是一个测试通告", images: ["https://i.imgur.com/AoZTdk2.jpg", "https://i.imgur.com/yW82HKT.jpg"], tag: []}, 
						{ id: 9, OP: "用户 9", avatar: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/9.jpg", postTime: "2023-12-23", eventTimeFrame: "2023-12-23", title: "标题 9", text: "这还是一个测试通告", images: ["https://i.imgur.com/ocmwopm.jpg", "https://i.imgur.com/r4yxUO4.jpg"], tag: []}, 
						{ id: 10, OP: "用户 10", avatar: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/10.jpg", postTime: "2023-12-23", eventTimeFrame: "2023-12-23", title: "标题 10", text: "这还是一个测试通告", images: ["https://i.imgur.com/g6mPio7.jpg", "https://i.imgur.com/uKELo6M.jpg"], tag: []}
					],
					[
						{ id: 11, OP: "用户 11", avatar: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/11.jpg", postTime: "2023-12-23", eventTimeFrame: "2023-12-23", title: "标题 11", text: "这还是一个测试通告", images: ["https://i.imgur.com/Qym9Nnk.png"], tag: []}, 
						{ id: 12, OP: "用户 12", avatar: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/12.jpg", postTime: "2023-12-23", eventTimeFrame: "2023-12-23", title: "标题 12", text: "这还是一个测试通告", images: [], tag: []}
					], 
					[
						{ id: 8, OP: "用户 8", avatar: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/8.jpg", postTime: "2023-12-23", eventTimeFrame: "2023-12-23", title: "一个很长的标题一个很长的标题一个很长的标题", text: "这还是一个测试通告", images: ["https://i.imgur.com/AoZTdk2.jpg", "https://i.imgur.com/yW82HKT.jpg"], tag: []},
						{ id: 9, OP: "用户 9", avatar: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/9.jpg", postTime: "2023-12-23", eventTimeFrame: "2023-12-23", title: "标题 9", text: "这还是一个测试通告", images: ["https://i.imgur.com/ocmwopm.jpg", "https://i.imgur.com/r4yxUO4.jpg"], tag: []}, 
						{ id: 10, OP: "用户 10", avatar: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/10.jpg", postTime: "2023-12-23", eventTimeFrame: "2023-12-23", title: "标题 10", text: "这还是一个测试通告", images: ["https://i.imgur.com/g6mPio7.jpg", "https://i.imgur.com/uKELo6M.jpg"], tag: []}
					]
				]
			}
		},
		methods: {
			navBarItemTextStyle(index) {
				if (index == this.selectedTab) {
					return {
						"find-friend-navbar-selected-item-text": true
					}
				} else {
					return {
						"find-friend-navbar-item-text": true
					}
				}
			},
			changeTab(index) {
				this.selectedTab = index;
			}, 
			readNotifications() {
				this.unreadNotifications = false;
				this.selectedTab = 5;
			}, 
			gotoPostDetail(post) {
				uni.navigateTo({
					url: "./singlePostDetail?post=" + encodeURIComponent(JSON.stringify(post))
				})
			}
		}
	}
</script>

<style scoped>
	.find-friend-navbar {
		position: fixed;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		top: 0;
		padding-top: 1rem;
		padding-left: 1.5rem;
		padding-right: 1.5rem;
		padding-bottom: 0.5rem;
		width: 100%;
		background-color: white;
		box-shadow: 0px 0px 15px 0px rgb(0 0 0 / 15%);
	}
	.find-friend-navbar-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-wrap: nowrap;
	}
	.find-friend-navbar-item-text {
		color: darkgray;
	}
	.find-friend-navbar-selected-item-text {
		color: black;
		font-size: 110%;
		font-weight: 500;
	}
	.find-friend-posts {
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-evenly;
		background-color: whitesmoke;
		padding-top: 4rem;
	}
	.div-bottom {
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: center;
		padding-top: 1.5rem;
		padding-bottom: 7rem;
		background-color: whitesmoke;
	}
	.div-line-bottom {
		width: 30%;
		height: 1px;
		background-color: lightgray;
		margin-left: 1rem;
		margin-right: 1rem;
	}
	.bottom-bar {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 4rem;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		background-color: white;
		padding-bottom: 1rem;
		box-shadow: 0px 0px 15px 0px rgb(0 0 0 / 25%);
		z-index: 3;
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
		background-color: rgb(196, 90, 101); 
		backdrop-filter: blur(8px);
		border-radius: 50%;
	}
</style>