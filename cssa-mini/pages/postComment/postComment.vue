<template>
	<scroll-view id="post-comment" :scroll-y="true">
		<view class="title"><text>CS537 Introduction to Operating System CS537 Introduction to Operating System</text>
		</view>
		<uni-forms ref="form" :model="comment" label-align="left" :rules="rules">
			<uni-forms-item name="professor" label="教授名">
				<uni-easyinput :clearable="false" v-model="comment.professor" placeholder="教授名" />
			</uni-forms-item>
			<view class="blank"></view>
			<uni-forms-item name="difficulty" label="难度">
				<uni-rate v-model="comment.difficulty" size="36" :is-fill="false"></uni-rate>
			</uni-forms-item>
			<uni-forms-item name="prefer" label="推荐">
				<uni-rate v-model="comment.prefer" size="36" :is-fill="false"></uni-rate>
			</uni-forms-item>
			<view class="blank"></view>
			<uni-forms-item name="time" label="时间">
				<uni-data-picker v-model="comment.courseTime" :localdata="range" @change="change"></uni-data-picker>
			</uni-forms-item>
			<view class="blank"></view>
			<uni-forms-item name="comment" label="评论" label-position="top">
				<uni-easyinput class="input" autoHeight :clearable="false" type="textarea" v-model="comment.comment"
					placeholder="请输入评论" maxlength="400" />
			</uni-forms-item>
		</uni-forms>
		<button class="button" type="default" @click="submit">提交</button>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				comment: {},
				range: [],
				rules: {
					professor: {
						rules: [{
							required: true,
							errorMessage: '请填写教授名字',
						}, ]
					},
					courseTime: {
						rules: [{
							required: true,
							errorMessage: '请选择教学时间',
						}]
					},
					difficulty: {
						rules: [{
								required: true,
								errorMessage: '请选择难度',
							},
							{
								minimum: 1,
								maximum: 5,
								errorMessage: '难度应为1-5',
							}
						]
					},
					prefer: {
						rules: [{
								required: true,
								errorMessage: '请选择推荐度',
							},
							{
								minimum: 1,
								maximum: 5,
								errorMessage: '难度应为1-5',
							}
						]
					},
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

				}

			}
		},
		onLoad(options) {
			this.initTimePicker();
		},
		methods: {
			initTimePicker: function() {
				let year = new Date().getFullYear();
				let month = new Date().getMonth();
				console.log(month)
				for (let i = 2018; i <= year; i++) {
					let temp = {
						text: String(i),
						value: String(i),
						children: [{
							text: "Spring",
							value: String(i) + "Spring"
						}]
					}
					if ((i == year && month >= 6) || i < year) {
						temp.children.push({
							text: "Summer",
							value: String(i) + "Summer"
						})
					}
					if ((i == year && month >= 9) || i < year) {
						temp.children.push({
							text: "Fall",
							value: String(i) + "Fall"
						})
					}
					this.range.push(temp)
				}
			},
			async postComment() {
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9go38k3y9fee3b2e',
					},
					path: "/course/postcomment",
					method: 'POST',
					header: {
						'X-WX-SERVICE': 'springboot-f8i8',
					},
					data: this.comment,
				});
				if (res.data.status != 100) {
					uni.showToast({
						title: "失败"
					})
				}else{
					uni.navigateBack();
				}
				
			},
			submit: function() {
				console.log(this.comment);
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
		width: 86vw;
		height: 100vh;

		padding-left: 7vw;
		padding-right: 7vw;
		background-color: white;
	}

	.title {
		margin-top: 5vh;
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
	}

	.box {
		align-items: center;
	}

	.input {
		height: 200px;
	}

	.blank {
		height: 1px;
		background-color: #f5f5f5;
		margin-bottom: 22px;
	}
</style>
