<template>
	<view style="background-color: whitesmoke; height: 100vh; width: 100%;">
		<div v-if="loading" style="width: 100vw; height: 3rem; display: flex; justify-content: center; align-items: center;">
			<text style="color: darkgray;">
				正在加载，请稍后。。。
			</text>
		</div>
		
		<div style="height: 0.7rem;" />
		
		<div class="find-friend-posts">
			<div class="find-friend-posts-pane">
				<div v-for="i in leftPosts" style="width: 100%; margin-bottom: 0.3rem;" v-on:click="gotoPostDetail(allPosts[i])">
					<singlePostStyleTwo v-bind:post="allPosts[i]" v-bind:postHeight="getPostHeightStyle(getPostHeightIdx(allPosts[i]))" />
				</div>
			</div>
			<div class="find-friend-posts-pane">
				<div v-for="i in rightPosts" style="width: 100%; margin-bottom: 0.3rem;" v-on:click="gotoPostDetail(allPosts[i])">
					<singlePostStyleTwo v-bind:post="allPosts[i]" v-bind:postHeight="getPostHeightStyle(getPostHeightIdx(allPosts[i]))" />
				</div>
			</div>
		</div>
		
		<div style="height: 7rem;" />
		
		<div class="bottom-bar">
			<div class="bottom-bar-item" v-on:click="reload">
				<uni-icons type="home" color="#C5050C90" size="20" />
				<text style="font-size: 60%; color: darkgray;">刷新</text>
			</div>
			
			<div class="bottom-bar-item" v-on:click="gotoUploadPost">
				<uni-icons type="compose" color="#C5050C90" size="20" />
				<text style="font-size: 60%; color: darkgray;">发布动态</text>
			</div>
		</div>
	</view>
</template>

<script>
	import singlePostStyleTwo from './singlePostStyleTwo.vue'
	import requestAPI from '@/api/request.js'
	export default {
		components: {
			singlePostStyleTwo,
		},
		data() {
			return {
		 		loading: true,
		 		leftY: 0,
		 		rightY: 0,
		 		leftPosts: [],
		 		rightPosts: [],
		 		currentPostIdx: 0,
		 		postHeightValue: [14.5, 13.5, 9.5, 8.5],
		 		postHeightStyle: ['post-height-1', 'post-height-2', 'post-height-3', 'post-height-4'],
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
					]
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
			
			this.getWaterfall();
			this.loading = false;
		},
		methods: {
			getPostHeightIdx(post) {
				if (post.images.length > 0 && post.title.length > 13) {
					return 0;
				} else if (post.images.length > 0) {
					return 1;
				} else if (post.title.length > 13) {
					return 2;
				} else {
					return 3;
				}
			},
			getPostHeightStyle(i) {
				return this.postHeightStyle[i];
			},
			getPostHeightValue(i) {
				return this.postHeightValue[i];
			},
			getWaterfall() {
				for (let i = this.currentPostIdx; i < this.allPosts.length; i++) {
					if (this.leftY <= this.rightY) {
						this.leftPosts.push(i);
						this.leftY += this.getPostHeightValue(this.getPostHeightIdx(this.allPosts[i]));
					} else {
						this.rightPosts.push(i);
						this.rightY += this.getPostHeightValue(this.getPostHeightIdx(this.allPosts[i]));
					}
				}
				this.currentPostIdx = this.allPosts.length;
			},
			gotoPostDetail(post) {
				uni.navigateTo({
					url: "./singlePostDetail?post=" + encodeURIComponent(JSON.stringify(post))
				})
			},
			gotoUploadPost() {
				uni.navigateTo({
					url: "./findFriendPost?name=" + this.userName
				})
			},
			async reload() {
				this.loading = true;
				const res = await requestAPI({
					path: "/friendpost/get?offset=0&limit=20",
					type: "GET"
				});
				console.log('reload finished');
				console.log(res.data.data);
				this.loading = false;
				this.allPosts = res.data.data;
			}
		}
	}
</script>

<style scoped>
	.find-friend-posts {
		width: 100%;
		background-color: whitesmoke;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-evenly;
	}
	.find-friend-posts-pane {
		width: 47%;
		background-color: whitesmoke;
		display: flex;
		flex-direction: column;
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
</style>
