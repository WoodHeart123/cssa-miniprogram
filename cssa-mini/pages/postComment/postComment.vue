<template>
	<scroll-view id="post-comment" :scroll-y="true">
		<uni-forms ref="form" :model="comment" label-align="left" :rules="rules">
			<uni-forms-item class="professor-box" label="教授名">
				<uni-easyinput :clearable="false" v-model="comment.professor" placeholder="教授名" />
			</uni-forms-item>
			<view class="blank"></view>
			<uni-forms-item label="难度">
				<uni-rate v-model="comment.difficulty" size="36" :is-fill="false"></uni-rate>
			</uni-forms-item>
			<uni-forms-item label="推荐">
				<uni-rate v-model="comment.prefer" size="36" :is-fill="false"></uni-rate>
			</uni-forms-item>
			<view class="blank"></view>
			<uni-forms-item label="时间">
				<uni-data-picker v-model="comment.time" :localdata="range" @change="change"></uni-data-picker>
			</uni-forms-item>
			<view class="blank"></view>
			<uni-forms-item label="评论" label-position="top">
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
					time: {
						rules: [{
							required: true,
							errorMessage: '请选择教学时间',
						}]
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
		onLoad() {
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
			submit: function() {
				console.log(this.comment);
				this.$refs["form"].validate().then(res => {
					console.log('success', res);
					uni.showToast({
						title: `校验通过`
					})
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
		padding-top: 10vh;
		padding-left: 7vw;
		padding-right: 7vw;
		background-color: white;
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
