<template>
	<view style="background-color: whitesmoke; height: 100vh; width: 100%;">
		<div class="find-friend-posts">
			<div ref="findFriendPosts" v-for="post in allPosts" style="width: 47%; position: absolute;" v-on:click="gotoPostDetail(post)">
				<singlePostStyleTwo v-bind:post="post" useBorderStyle="show-border" v-bind:postHeight="computePostHeight(post)" />
			</div>
			<!-- <div v-if="allPosts.length % 2 == 1" style="width: 48%;" /> -->
		</div>
		
		<div v-if="reachEnd" style="width: 100%; height: 5rem; background-color: whitesmoke;" />
		
		<div class="bottom-bar">
			<div class="bottom-bar-item">
				<uni-icons type="home" color="#C5050C90" size="20" />
				<text style="font-size: 60%; color: darkgray;">刷新</text>
			</div>
			
			<div class="bottom-bar-item" v-on:click="gotoPost()">
				<uni-icons type="compose" color="#C5050C90" size="20" />
				<text style="font-size: 60%; color: darkgray;">发布动态</text>
			</div>
		</div>
	</view>
</template>

<script>
	import singlePostStyleTwo from './singlePostStyleTwo.vue'
	import requestAPI from '@/api/request.js'
	export default{
		components: {
			singlePostStyleTwo,
		},
		data() {
			return {
				selectedTab: 0, 
				navbarItems: ['全部', '吃饭', '运动', '旅游', '娱乐'], 
				// TODO: Check whether the user has unread post activities from backend
				// TODO: Check whether the user has unread DM from backend
				// TODO: Get the posts from backend in onLoad() function
				unreadPostNotifications: true, 
				unreadDM: true, 
				reachEnd: true, 
				verticalPos: [1, 1],
				allPosts:
					[
											{
												id: 1, 
												userNickname: "用户 1", 
												userAvatar: 1, 
												postTime: "2023-12-23", 
												createdAt: "2023-12-23", 
												title: "标题 1", 
												description: "这是一个测试通告", 
												images: ["https://i.imgur.com/xJCROfR.jpg"], 
											}, 
											{ id: 2, userNickname: "用户 2", userAvatar: 2, createdAt: "2023-12-23", eventTimeFrame: "2023-12-23", title: "标题 2", description: "这还是一个测试通告", images: ["https://i.imgur.com/OK0SAIp.jpg"], tag: []},
											{ id: 3, userNickname: "用户 3", userAvatar: 3, createdAt: "2023-12-23", eventTimeFrame: "2023-12-23", title: "标题 3", description: "这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告这是一个特别长的测试通告", images: ["https://i.imgur.com/QvaszPR.png", "https://i.imgur.com/RayNQyw.png"], tag: []}, 
											{ id: 4, userNickname: "用户 4", userAvatar: 4, createdAt: "2023-12-23", eventTimeFrame: "2023-12-23", title: "标题 4", description: "这还是一个测试通告这还是一个测试通告这还是一个测试通告这还是一个测试通告这还是一个测试通告这还是一个测试通告这还是一个测试通告这还是一个测试通告这还是一个测试通告这还是一个测试通告这还是一个测试通告这还是一个测试通告这还是一个测试通告这还是一个测试通告这还是一个测试通告这还是一个测试通告这还是一个测试通告这还是一个测试通告这还是一个测试通告这还是一个测试通告这还是一个测试通告这还是一个测试通告这还是一个测试通告这还是一个测试通告这还是一个测试通告", images: ["https://i.imgur.com/3PbyN51.jpg", "https://i.imgur.com/OK0SAIp.jpg", "https://i.imgur.com/rNEs9p4.jpg", "https://i.imgur.com/aT9fyff.png"], tag: []}, 
											{ id: 5, userNickname: "用户 5", userAvatar: 5, createdAt: "2023-12-23", eventTimeFrame: "2023-12-23", title: "标题 5标题 5标题 5标题 5标题 5标题 5标题 5标题 5", description: "这还是一个测试通告", images: ["https://i.imgur.com/rNEs9p4.jpg"], tag: []}, 
											{ id: 6, userNickname: "用户 6", userAvatar: 6, createdAt: "2023-12-23", eventTimeFrame: "2023-12-23", title: "标题 6", description: "这还是一个测试通告", images: ["https://i.imgur.com/aT9fyff.png"], tag: []}, 
											{ id: 7, userNickname: "用户 7", userAvatar: 7, createdAt: "2023-12-23", eventTimeFrame: "2023-12-23", title: "标题 7", description: "这还是一个测试通告", images: ["https://i.imgur.com/nhTiMwb.jpg", "https://i.imgur.com/yz1KHBk.jpg", "https://i.imgur.com/slkAGmA.png"], tag: []}, 
											{ id: 8, userNickname: "用户 8", userAvatar: 8, createdAt: "2023-12-23", eventTimeFrame: "2023-12-23", title: "一个很长的标题一个很长的标题一个很长的标题", description: "这还是一个测试通告", images: ["https://i.imgur.com/AoZTdk2.jpg", "https://i.imgur.com/yW82HKT.jpg"], tag: []}, 
											{ id: 9, userNickname: "用户 9", userAvatar: 9, createdAt: "2023-12-23", eventTimeFrame: "2023-12-23", title: "标题 9", description: "这还是一个测试通告", images: ["https://i.imgur.com/ocmwopm.jpg", "https://i.imgur.com/r4yxUO4.jpg"], tag: []}, 
											{ id: 10, userNickname: "用户 10", userAvatar: 10, createdAt: "2023-12-23", eventTimeFrame: "2023-12-23", title: "标题 10", description: "这还是一个测试通告", images: ["https://i.imgur.com/g6mPio7.jpg", "https://i.imgur.com/uKELo6M.jpg"], tag: []}, 
											{ id: 11, userNickname: "用户 11", userAvatar: 11, createdAt: "2023-12-23", eventTimeFrame: "2023-12-23", title: "标题 11", description: "这还是一个测试通告", images: ["https://i.imgur.com/Qym9Nnk.png"], tag: []}, 
											{ id: 12, userNickname: "用户 12", userAvatar: 12, createdAt: "2023-12-23", eventTimeFrame: "2023-12-23", title: "标题 12", description: "", images: [], tag: []}
					],
				hasMore: true,
				userName: "",
				userAvatar: ""
			}
		},
		async onLoad(option) {
			const res = await requestAPI({
				path: "/friendpost/get?offset=0&limit=50",
				type: "GET"
			});
			if (res.data.status == 100) {
				// this.allPosts = res.data.data;
			} else {
				// this.allPosts = [];
			}
			
			try {
				const value = uni.getStorageSync('userInfo-2');
				if (value) {
					console.log(value)
					this.userName = value.nickname
				}
			} catch (e) {
				console.log(e)
			}
		},
		mounted() {
			this.getWaterfall();
		},
		methods: {
			getAbovePostHeight(post) {
				if (post.images.length > 0 && post.title.length > 13) {
					return 14.5;
				} else if (post.images.length > 0) {
					return 13.5;
				} else if (post.title.length > 13) {
					return 9.5;
				} else {
					return 8.5;
				}
			},
			getWaterfall() {
				console.log(this.$refs);
				let item = this.$refs['findFriendPosts'];
				console.log("here");
				console.log(item);
				for (let i = 0; i < item.length; i++) {
					item[i].style.left = (i == 0 ? '1rem' : '20rem');
					if (i < 2) {
						item[i].style.top = this.verticalPos[i] + 'rem';
					} else {
						this.verticalPos.push(this.verticalPos[i - 2] + this.getAbovePostHeight(this.allPosts[i - 2]) + 0.3);
						item[i].style.top = this.verticalPos[i] + 'rem';
					}
				}
			},
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
			}, 
			toggleNotification(e) {
				this.unreadPostNotifications = !this.unreadPostNotifications;
			}, 
			toggleDM(e) {
				this.unreadDM = !this.unreadDM;
			},
			gotoPost() {
				uni.navigateTo({
					url: "./findFriendPost?userName=" + this.userName + "&avatar=" + this.userAvatar
				})
			},
			computePostHeight(post) {
				if (post.images.length > 0 && post.title.length > 13) {
					return "post-height-1";
				} else if (post.images.length > 0 && post.title.length <= 13) {
					return "post-height-2";
				} else if (post.images.length == 0 && post.title.length > 13) {
					return "post-height-3";
				} else {
					return "post-height-4";
				}
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
		background-color: whitesmoke;
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
	.bottom-bar-item {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
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
