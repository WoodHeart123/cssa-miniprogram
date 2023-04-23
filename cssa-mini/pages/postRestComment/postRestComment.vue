<template>
	<scroll-view id="post-comment" :scroll-y="true">
		<view class="comment-form">
			<view class="title">
				<text>{{this.comment.courseName}}</text>
			</view>
			<uni-forms ref="form" :model="comment" label-align="left" :rules="rules" v-if="!edit">
				<view class="blank"></view>
				<uni-forms-item name="good" label="好吃">
					<uni-rate v-model="comment.difficulty" size="36" :is-fill="false"></uni-rate>
				</uni-forms-item>
				<uni-forms-item name="prefer" label="推荐">
					<uni-rate v-model="comment.prefer" size="36" :is-fill="false"></uni-rate>
				</uni-forms-item>
				<view class="blank"></view>
				<uni-forms-item name="comment" label-position="top">
					<uni-easyinput class="input" autoHeight :clearable="false" type="textarea" v-model="comment.comment"
						placeholder="可以从课程内容，作业量，需要的前置知识等方面进行评价" maxlength="400" />
				</uni-forms-item>
			</uni-forms>
			<button class="button" style="background-color: #9b0000; color: #ffffff;" type="default" @click="submit">提交</button>
		</view>

	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				comment: {},
				range: [],
				edit: false,
				commentMap: {},
				rules: {
					comment: {
						rules: [{
								required: true,
								errorMessage: '请填写评论',
							},
							{
								maxLength: 400,
								errorMessage: '评论最长为400字符',
							}
						]
					},

				},
				path:"/course/postcomment",
				course: {},

			}
		},
		onLoad(options) {
			if (options.edit == "false") {
				this.edit = false;
				this.path = "/course/postcomment";
			} else {
				this.edit = true;
				this.path = "/user/updateComment"
			}
			if (!this.edit) {
				this.initTimePicker();
				this.restaurant = JSON.parse(decodeURIComponent(options.restaurant));
				this.rules["good"] = {
					rules: [{
						required: true,
						errorMessage: '请选择好吃程度',
					}]
				};
				this.rules["prefer"] = {
					rules: [{
						required: true,
						errorMessage: '请选择推荐度',
					}]
				};
				this.comment.restID = this.restaurant.restID;
				this.comment.restName = this.restaurant.Name;
				//this.comment.userAvatar = uni.getStorageSync("userInfo-2").avatar;
				this.comment.userAvatar = 2;
			}else{
				this.comment = JSON.parse(decodeURIComponent(options.comment));
			}		
			uni.getStorage({
				key: "commentMap",
				success: (res) => {
					this.commentMap = res.data;
				},
				fail: () => {
					this.commentMap = {};
				}
			});
		},
		methods: {
			initTimePicker: function() {
				let year = new Date().getFullYear();
				let month = new Date().getMonth();
				for (let i = 2018; i <= year; i++) {
					let temp = {
						text: String(i),
						value: String(i),
						children: [{
							text: "Spring",
							value: String(i) + " Spring"
						}]
					}
					if ((i == year && month >= 6) || i < year) {
						temp.children.push({
							text: "Summer",
							value: String(i) + " Summer"
						})
					}
					if ((i == year && month >= 9) || i < year) {
						temp.children.push({
							text: "Fall",
							value: String(i) + " Fall"
						})
					}
					this.range.push(temp)
				}
			},
			async postComment() {
				uni.showLoading({
					title: "正在上传中",
					mask: true
				});
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9gip97mx4bfa32a3',
					},
					path: this.path,
					method: 'POST',
					header: {
						'X-WX-SERVICE': 'springboot-ds71',
					},
					data: this.comment,
				});
				if (res.data.status == 500) {
					uni.showToast({
						icon: "fail",
						title: "服务发生错误，请稍后尝试"
					});
					uni.hideLoading()
					return;
				} else if (res.data.status == 110) {
					this.commentMap[this.comment.courseID] = 2;
					uni.showToast({
						title: "超过两条评论",
						icon: "error",
						mask: true,
						complete: () => {
							uni.setStorageSync("commentMap", this.commentMap);
						}
					});
					setTimeout(() => {
						uni.hideLoading();
						uni.navigateBack();
					}, 1500);
					return;
				} else if (res.data.status == 100 && !this.edit) {
					if (this.commentMap[this.comment.courseID] == undefined) {
						this.commentMap[this.comment.courseID] = 1;
					} else {
						this.commentMap[this.comment.courseID] += 1;
					}
					uni.setStorageSync("commentMap", this.commentMap);
					this.course.avgPrefer = (this.course.avgPrefer * this.course.commentCount + this.comment.prefer) / (this.course.commentCount + 1);
					this.course.avgDifficulty = (this.course.avgDifficulty * this.course.commentCount + this.comment.difficulty) / (this.course.commentCount + 1);
					this.course.commentCount+=1;
				}
				uni.hideLoading();
				uni.$emit("updateRestaurant",{restaurant:this.res});
				this.$emit("refreshPage");
				uni.navigateBack();
			},
			submit: function() {	
				this.$refs["form"].validate().then(res => {
						this.postComment();
				}).catch(err => {
					console.log('err', err);
				})
			}
		}
	}
</script>

<style>
	#post-comment {
		height: 100vh;
		width: 100vw;
		background-color: white;
	}

	.comment-form {
		padding: 15px;
		width: calc(100vw - 30px);
	}

	.title {
		margin-top: 2vh;
		height: 5vh;
		line-height: 5vh;
		margin-bottom: 2vh;
		font-size: 18px;
		font-weight: 700;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.button {
		background-color: #1684FC !important;
		color: white !important;
		margin-top: 10px;
	}

	.box {
		align-items: center;
	}

	.input {
		min-height: 200px;
	}

	.blank {
		margin-top:20px;
		height: 1px;
		background-color: #f5f5f5;
		margin-bottom: 22px;
	}
</style>
