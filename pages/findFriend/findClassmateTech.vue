<template>
	<view class="find-classmate-tech-background">
		<div class="find-class-bar">
			<div class="course-selection">
				<div style="width: 6rem; padding-left: 1rem;">
					<picker v-on:change="selectSubject" v-bind:value="index" v-bind:range="subject">
						<view style="color: darkgray;">{{ subject[index] }}</view>
					</picker>
				</div>
				<div style="width: 6rem;">
					<uni-easyinput type="text" v-model="userCourseNumber" placeholder="请输入课号" />
				</div>
			</div>
			<div class="go-button" @click="formSubmit">群二维码</div>
		</div>
		<div class="tech-news-board">
			<div class="news">
				<div v-for="(post, index) in posts" style="width: 90%;">
					<navigator v-bind:url="'./singlePostDetail?post=' + encodeURIComponent(JSON.stringify(post))" style="width: 100%;">
						<singlePostStyleOne v-if="index == posts.length - 1" v-bind:key="post.id" v-bind:post="post" v-bind:lastOne="true" />
						<singlePostStyleOne v-else v-bind:key="post.id" v-bind:post="post" v-bind:lastOne="false" />
					</navigator>
				</div>
			</div>
			<div class="compose-button">
				<div style="height: 100%; display: flex; justify-content: center; align-items: center;">
					<uni-icons type="compose" size="25" color="white" />
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	import singlePostStyleOne from "./singlePostStyleOne.vue"
	export default {
		components: {
			singlePostStyleOne,
		},
		data() {
			return {
				subject: ['请选择专业', 'COMP SCI', 'MATH', 'STAT', "ECON", 'PHYSICS', 'BIOLOGY', 'CHEM'],
				userSubject: null,
				userCourseNumber: null,
				index: 0,
				
				// TODO: get posts from backend server
				
				posts: [
					{
						id: 8,
						OP: "用户 1", 
						title: "标题 1", 
						postTime: null,
						eventTimeFrame: "Oct.1", 
						text: "这是一个 Tech News",
						images: ["https://i.imgur.com/xJCROfR.jpg"],
						tag: [],
						comments: [{ userName: "一个用户", comment: "一些内容" }]
					},
					{
						id: 9,
						OP: "用户 1", 
						title: "标题 1", 
						postTime: null,
						eventTimeFrame: "Oct.1", 
						text: "这还是一个 Tech News这还是一个 Tech News这还是一个 Tech News这还是一个 Tech News这还是一个 Tech News这还是一个 Tech News这还是一个 Tech News这还是一个 Tech News这还是一个 Tech News",
						images: [],
						tag: [],
						comments: [{ userName: "一个用户", comment: "一些内容" }]
					},
					{
						id: 8,
						OP: "用户 1", 
						title: "标题 1", 
						postTime: null,
						eventTimeFrame: "Oct.1", 
						text: "这是一个 Tech News",
						images: ["https://i.imgur.com/xJCROfR.jpg"],
						tag: [],
						comments: [{ userName: "一个用户", comment: "一些内容" }]
					}
				]
			}
		},
		methods: {
			selectSubject(e) {
				this.index = e.detail.value
				this.userSubject = this.subject[this.index]
				console.log('user selected subject: ', this.userSubject)
			},
			formSubmit(e) {
				console.log('user course number: ', this.userCourseNumber)
			}
		}
	}
</script>

<style scoped>
	.find-classmate-tech-background {
		height: 100vh;
		width: 100%;
		background-image: url("https://i.imgur.com/5YBhd6S.png");
		background-repeat: no-repeat;
		background-position: bottom;
		background-size: cover;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: space-evenly;
	}
	.find-class-bar {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		width: 90%;
		height: 3rem;
		border-radius: 30px;
		background-color: rgba(255, 255, 255, 0.3);
		backdrop-filter: blur(8px);
		box-shadow: 0px 5px 10px 5px rgb(0 0 0 / 10%);
	}
	.course-selection {
		height: 3rem;
		width: 12rem;
		display: flex; 
		flex-direction: row; 
		flex-wrap: nowrap;
		justify-content: space-around;
		align-items: center;
	}
	.go-button {
		height: 3rem;
		width: 6rem;
		color: white; 
		background-color: #8ECDDD; 
		border-color: #8ECDDD;
		border-top-right-radius: 30px;
		border-bottom-right-radius: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.tech-news-board {
		width: 90%;
		height: 83%;
		border-radius: 10px;
		background-color: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(7px);
		box-shadow: 0px 5px 10px 5px rgb(0 0 0 / 10%);
	}
	.news {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		align-items: center;
		overflow-y: scroll;
	}
	.compose-button {
		position: absolute;
		height: 3rem; 
		width: 3rem; 
		bottom: 1rem; 
		right: 1rem; 
		background-color: indianred; 
		border-radius: 50%;
	}
</style>