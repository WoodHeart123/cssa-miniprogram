<template>
	<view id="findFriendPost">
		<uni-forms ref="findFriendForm" :modelValue="friendPost" :rules="rules">
			<view class="card uni-textarea textbox">
				<uni-forms-item name="title">
					<span class="span">标题</span>
					<uni-easyinput type="textarea" v-model="friendPost.title" placeholder="请输入标题"
						maxlength="400" placeholderStyle="font-size:14px;color:gray" :clearable="clearable">
					</uni-easyinput>
				</uni-forms-item>
			</view>
			
			<view class="card uni-textarea textbox">
				<uni-forms-item name="description">
					<span class="span">内容</span>
					<uni-easyinput type="textarea" v-model="friendPost.description" placeholder="请描述找搭子详情,如/地点/日期等"
						maxlength="400" placeholderStyle="font-size:14px;color:gray" :clearable="clearable">
					</uni-easyinput>
				</uni-forms-item>
			</view>
			
			<view class="card uni-form-item uni-column" v-if="!this.edit">
				<uni-forms-item name="imageList">
					<view class="image_upload">
						<uni-file-picker limit="5" fileMediatype="image" :auto-upload="false" @select="onSelectImage"
							@delete="onDeleteImage"></uni-file-picker>
					</view>
				</uni-forms-item>
			</view>
			
			<view class="uni-padding-wrap uni-common-mt confirm-button">
				<button type="default" style="background-color: #9b0000; color: #ffffff;" plain="true"
					@click="submit('findFriendForm')">发布</button>
			</view>

		</uni-forms>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				friendPost: {
					description: "",
					title: "",
				},
				images: [],
				rules: {
					title: {
						rules: [{
							required: true,
							errorMessage: '请输入标题',
							imageList: [],
						}]
					},
					description: {
						rules: [
							{
								required: true,
								errorMessage: '请填写找搭子详情',
							},
							{
								minLength: 1,
								maxLength: 400,
								errorMessage: '长度在 1 到 400 个字符之间',
							},
						]
					},
					imageList: {
						rules: [{
								required: true,
								errorMessage: '请上传图片',
							},
							{
								minLength: 1,
								maxLength: 5,
								errorMessage: '最多只能上传五张图片',
							}
						]
					},
				}
			}
		},
		methods: {
			onSelectImage: function(e) {
				for (let i = 0; i < e.tempFilePaths.length && i < e.tempFiles.length; i++) {
					this.friendPost.imageList.push({
						filename: e.tempFiles[i].name,
						filepath: e.tempFilePaths[i]
					});
				}
			},
			onDeleteImage: function(e) {
				for (let i = 0; i < this.rental.imageList.length; i++) {
					if (this.friendPost.imageList[i].filename == e.tempFile.name) {
						this.friendPost.imageList.splice(i, 1);
						return;
					}
				}
			},
			submit(ref) {
				if (this.uploading) {
					return;
				}
				this.$refs[ref].validate().then(res => {
					this.uploading = true;
					this.images = [];
					uni.showLoading({
						title: "请耐心等待信息上传"
					});
					if (this.edit) {
						this.updateRental();
					} else {
						this.uploadImage();
					}
				}).catch(err => {
					console.log(err);
					console.log(this.friendPost)
					uni.showToast({
						title: err[0].errorMessage,
						icon: "error"
					})
				})
			},
			uploadImage: async function() {
				uni.showLoading({
					title: "正在上传内容",
					mask: true
				});
				const uploadPromises = this.friendPost.imageList.map(image => {
					uploadOSS(image);
				});
				try {
					const uploadedImages = await Promise.all(uploadPromises);
					this.images = uploadedImages;
					this.friendPost.images = this.images;
					this.postRental();
				} catch (error) {
					uni.hideLoading();
					uni.showToast({
						title: error,
						icon: "error"
					});
				}
			},
			
			updateRental: async function() {
				const res = await requestAPI({
					path: `/findPost/updateFindPost`,
					type: 'POST',
					data: this.findPost
				})
				uni.hideLoading();
				if (res.data.status == 100) {
					uni.$emit("uploadRentalSuccess");
					uni.navigateBack();
				} else {
					uni.showToast({
						title: "上传信息失败",
						icon: "error"
					});
				}
			}
		}
		
	}
</script>

<style>
	input {
		height: 35px;
	}
	
	#findFriendPost {
		position: absolute;
		min-width: 100vw;
		height: 100vh;
		padding: 0 3vw 0 3vw;
		background-color: white;
		overflow-x: scroll;
	}
	.card {
		box-shadow: 0 0 5px 1px rgba(0, 0, 0, .08);
		border-radius: 5px;
		padding: 12px 12px 18px 12px;
		margin-bottom: 5px;
		height: auto;
	}
	
	.span {
		margin-right: 10px;
		font-size: 16px;
	}
	
	.confirm-button {
		margin-top: 20px;
		margin-bottom: 20px;
	}
	
</style>
