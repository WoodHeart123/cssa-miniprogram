<template>
	<view class="name-page">
		<view class="title"></view>
		<view class="name-input">
			<uni-easyinput :styles="nameinput" v-model="nickname" placeholder="请输入昵称" :clearable=false maxlength="20"
				placeholderStyle="color:#999;font-size:14px">
			</uni-easyinput>
		</view>

		<button class="confirm-button" style="background-color: #9b0000; color: #ffffff;" @click="confirm">确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				nickname: "",
				nameinput: {
					borderColor: "#ffffff"
				}
			}
		},
		onShow() {
			wx.cloud.init();
			this.userInfo = uni.getStorageSync("userInfo-2");
			console.log(this.userInfo)
			this.nickname = this.userInfo.nickname;
		},
		methods: {
			onEmailInput(event) {
				this.email = event.detail.value;
			},
			async confirm() {
				if (this.nickname.length == 0) {
					uni.showToast({
						icon: "none",
						title: "昵称不应为空"
					})
				}
				const opts = {
					path: '/user/updateProfile?str=' + encodeURI(this.nickname) + '&service=nickname',
					type: 'GET',
				};

				requestAPI(opts)
					.then(response => {
						if (response.data.status == 100) {
							this.userInfo.nickname = this.nickname;
							uni.setStorageSync("userInfo-2", this.userInfo);
							uni.navigateBack({
								delta: 1
							});
						} else {
							uni.showToast({
								icon: 'error',
								title: "暂时无法修改昵称，请稍后再尝试"
							});
						}
					})
					.catch(error => {
						console.error("Profile update request failed:", error);
					});
			}
		},
	}
	import requestAPI from '@/api/request.js'
</script>

<style>
	.name-page {
		background-color: #fff;
		width: 100vw;
		height: 100vh;
	}

	.title {
		font-size: 20px;
		font-weight: 700;
		text-align: center;
		padding-top: 20px;
		margin-bottom: 50px;
	}

	.name-input {
		width: 80%;
		border-bottom: 1px solid #CCC;
		padding-bottom: 2px;
		margin-left: 10%;
		margin-bottom: 20px;
	}

	.button-box {
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 90%;
		margin-left: 5%;
	}

	.confirm-button {
		width: 80%;
		height: 36px;
		border-radius: 18px;
		border: 0 !important;
		background-color: #1684FC;
		display: flex;
		justify-content: center;
		font-size: 14px;
	}
</style>