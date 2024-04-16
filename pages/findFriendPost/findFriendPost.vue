<template>
	<view id="findFriendPost">
		<uni-forms ref="findFriendForm" :modelValue="friendPost" :rules="rules">
			<div class="layout">
				<div class="my-title">
					<view class="uni-input">
						<uni-forms-item name="title">
							<uni-easyinput :inputBorder="false" v-model="friendPost.title" placeholder="请输入标题"
								maxlength="400" placeholderStyle="font-size:14px; color:darkgray"
								:clearable="clearable">
							</uni-easyinput>
						</uni-forms-item>
					</view>
				</div>

				<view class="uni-input-2" style="padding: 2rem;">
					<div style="margin-top: 1rem;">
						<uni-forms-item name="imageList">
							<view class="image_upload">
								<uni-file-picker limit="5" fileMediatype="image" :auto-upload="false"
									@select="onSelectImage" @delete="onDeleteImage"></uni-file-picker>
							</view>
						</uni-forms-item>
					</div>

					<div style="margin-top: 1.7rem;">
						<uni-forms-item name="description">
							<uni-easyinput :inputBorder="false" type="textarea" v-model="friendPost.description"
								placeholder="帖子详情,如/地点/日期等" maxlength="400"
								placeholderStyle="font-size:14px; color:darkgray" :clearable="clearable">
							</uni-easyinput>
						</uni-forms-item>
					</div>
				</view>

				<div class="my-button" @click="submit('findFriendForm')">
					<div style="color: white; font-size: 120%; font-weight: 600;">发<span style="margin-left: 1rem;" />布
					</div>
				</div>
				<!-- <view class="uni-padding-wrap uni-common-mt confirm-button">
					<button type="default" style="background-color: #9b0000; color: #ffffff;" plain="true"
						@click="submit('findFriendForm')">发  布</button>
				</view> -->
			</div>
		</uni-forms>
	</view>
</template>

<script>
	import uploadOSS from '@/api/upload.js'
	export default {
		data() {
			return {
				//id = ""
				//userID: "",
				//userAvatar: "",
				//userNickname: "",

				title: "",
				images: "",
				description: "",

				friendPost: {
					title: "",
					imageList: [],
					description: "",
				},

				rules: {
					title: {
						rules: [{
							required: true,
							errorMessage: '请输入标题',
							imageList: [],
						}]
					},
					description: {
						rules: [{
								required: false,
								errorMessage: '请填写找搭子详情',
							},
							{
								minLength: 0,
								maxLength: 400,
								errorMessage: '长度在 0 到 400 个字符之间',
							},
						]
					},
					imageList: {
						rules: [{
								required: false,
								errorMessage: '请上传图片',
							},
							{
								minLength: 0,
								maxLength: 5,
								errorMessage: '最多只能上传五张图片',
							}
						]
					},
				},
			}
		},
		onLoad(options) {
			wx.cloud.init();
			try {
				console.log("get from the main page")
			} catch (e) {
				console.log("error when get from the main page")
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
				for (let i = 0; i < this.friendPost.imageList.length; i++) {
					if (this.friendPost.imageList[i].filename == e.tempFile.name) {
						this.friendPost.imageList.splice(i, 1);
						return;
					}
				}
			},


			uploadImage: async function() {
				uni.showLoading({
					title: "正在上传内容",
					mask: true
				});
				
				try {
					const uploadPromises = this.friendPost.imageList.map(image => {
						uploadOSS(image);
					});
					const uploadedImages = await Promise.all(uploadPromises);
					this.images = uploadedImages;
					this.friendPost.images = this.images;
					this.postFriend();
					console.log(this.friendPost);
				} catch (error) {
					console.log(this.friendPost)
					console.log(error);
					//console.log("上传图片失败 abc”);
					uni.hideLoading();
					uni.showToast({
						title: '上传图片失败 abc',
						icon: "error"
					});
				}
			},

			postFriend: async function() {
				try {
					const res = await wx.cloud.callContainer({
						config: {
							env: 'prod-9gip97mx4bfa32a3',
						},
						path: `/friendpost/create`,
						method: 'POST',
						header: {
							'X-WX-SERVICE': 'springboot-ds71',
						},
						data: this.friendPost
					});
					uni.hideLoading();
					if (res.data.status === 100) {
						uni.$emit("uploadSuccess");
						//uni.navigateBack();
						uni.showToast({
							title: "上传成功",
						});
					} else {
						uni.showToast({
							title: "上传信息失败",
							icon: "error"
						});
					}
				} catch (error) {
					console.log('上传失败')
					uni.hideLoading();
					uni.showToast({
						title: "上传信息失败",
						icon: "error"
					});
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
					this.uploadImage();
				}).catch(err => {
					console.log("Err in the submit");
					console.log(err);
					console.log(this.friendPost)
					uni.showToast({
						title: "上传失败",
						icon: "error"
					})
				})
			},
		}
	}
</script>



<style lang="scss">
	input {
		height: 35px;
		background-color: transparent !important;
	}


	#findFriendPost {
		width: 100vw;
		height: 100%;
		background-image: url("https://i.imgur.com/1EY6wzL.jpg");
		background-repeat: no-repeat;
		background-position: center center;
		background-size: cover;
	}

	.layout {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
	}

	.my-title {
		height: 3rem;
		width: 80%;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
		border-radius: 20px;
		background-color: rgba(255, 255, 255);
		// backdrop-filter: blur(8px);
		margin-top: 30px;
		margin-bottom: 20px;
		padding-left: 1rem;
	}

	.uni-input {
		width: 100%;
		height: 70%;
		border-radius: 20px;
	}

	.uni-input-2 {
		width: 80%;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
		border-radius: 10px;
		padding: 15px;
		margin-bottom: 15px;
		background-color: rgba(255, 255, 255, 0.5);
		backdrop-filter: blur(9px);
		height: 100%;
	}

	.my-button {
		width: 80%;
		height: 3rem;
		margin-top: 1rem;
		margin-bottom: 3rem;
		border-radius: 30px;
		background-color: rgba(70, 130, 180, 0.7);
		backdrop-filter: blur(8px);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.confirm-button {
		width: 80%;
		margin-top: 20px;
		border-radius: 10px;
	}

	.uni-easyinput__content {
		background-color: rgba(255, 255, 255, 0.8) !important;
		border-radius: 20px !important;
	}

	.uni-easyinput__content-textarea {
		height: 15rem !important;
		padding: 1.5rem;
	}

	:deep(.file-picker__box) {
		width: 145rpx !important;
		height: 145rpx !important;

		.file-picker__progress {
			display: none;
		}
	}

	:deep(.file-picker__box-content) {
		border-style: dashed !important;
		border-radius: 15rpx !important;
		border-color: darkgray !important;

		.icon-add {
			width: 70rpx;
			height: 7rpx;
			background-color: darkgray;
		}
	}
</style>
