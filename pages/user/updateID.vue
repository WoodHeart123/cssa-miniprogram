<template>
	<view class="id-page">
		<view class="title"></view>
		<input class="id-input" v-model="wechatID" placeholder="请输入微信号" @input="onIDInput" />

		<button class="confirm-button" style="background-color: #9b0000; color: #ffffff;" @click="confirm">确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				wechatID: "",
				hasID: false,
			}
		},
		onShow() {
			wx.cloud.init();
			this.userInfo = uni.getStorageSync("userInfo-2");
			console.log(this.userInfo)
			if (this.userInfo.wechatID != null) {
				this.hasID = true;
				this.wechatID = this.userInfo.wechatID;
			}
		},
		methods: {
			onIDInput(event) {
				this.wechatID = event.detail.value;
			},
			async confirm() {
				if (this.wechatID.length == 0) {
					uni.showToast({
						icon: "none",
						title: "微信号不应为空"
					})
				}
				const opts = {
				    path: '/user/updateProfile?str=' + encodeURI(this.wechatID) + '&service=wechatid',
				    type: 'GET',
				};
				requestAPI(opts).then(response => {
				    if (response.data.status == 100) {
				        this.userInfo.wechatID = this.wechatID;
				        uni.setStorageSync("userInfo-2", this.userInfo);
				        uni.navigateBack({ delta: 1 });
				    } else {
				        uni.showToast({
				            icon: 'error',
				            title: "暂时无法修改微信号，请稍后再尝试"
				        });
				    }
				}).catch(error => {
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

	.id-input {
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
