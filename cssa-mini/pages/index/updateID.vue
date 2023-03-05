<template>
	<view class="id-page">
		<view class="title">更新微信号</view>
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
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9gip97mx4bfa32a3', // 微信云托管的环境ID
					},
					path: '/user/updateID?wechatID=' + this.wechatID,
					method: 'GET',
					header: {
						'X-WX-SERVICE': 'springboot-ds71',
					},
				});
				if (res.data.status == 100) {
					this.userInfo.wechatID = this.wechatID;
					uni.setStorageSync("userInfo-2", this.userInfo);
					uni.navigateBack({
						delta: 1
					});
				} else {
					uni.showToast({
						icon: 'error',
						title: "暂时无法修改微信号，请稍后再尝试"
					})
				}
			}
		},
	}
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
