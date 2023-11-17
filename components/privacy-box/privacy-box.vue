<template>
	<view class="privacy" v-show="showPrivacy">
		<view class="content">
			<view class="title">隐私保护指引</view>
			<view class="des">
				在使用当前小程序服务之前，请仔细阅读
				<text class="link" @click="handleOpenPrivacyContract">{{privacyContractName}}</text>。如你同意{{privacyContractName}}，请点击“同意”开始使用。
			</view>
			<view class="btns">
				<button class="item reject" @click="exitMiniProgram">拒绝</button>
				<button id="agree-btn" class="item agree" open-type="agreePrivacyAuthorization" @click="handleAgreePrivacyAuthorization">同意</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "privacy-box",
		data() {
			return {
				privacyContractName: "",
				showPrivacy: true,
			};
		},
		onLoad() {
			wx.getPrivacySetting({
				success: res => {
					console.log(
						res) // 返回结果为: res = { needAuthorization: true/false, privacyContractName: '《xxx隐私保护指引》' }
					if (res.needAuthorization) {
						this.showPrivacy = true
						this.privacyContractName = res.privacyContractName
					}
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods:{
			handleOpenPrivacyContract: function() {
				wx.openPrivacyContract({
					fail: () => {
						wx.showToast({
							title: '遇到错误',
							icon: 'error'
						})
					}
				})
			},
			exitMiniProgram() {
			    wx.showToast({
			        title: '必须同意后才可以继续使用小程序部分功能',
			        icon: 'none'
			    })
			},
			handleAgreePrivacyAuthorization() {
				this.showPrivacy = false
			    this.resolvePrivacyAuthorization({ buttonId: 'agree-btn', event: 'agree' })
			}
			
		},
	}
</script>

<style>
	.privacy {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgba(0, 0, 0, .5);
		z-index: 9999999;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.content {
		width: 632rpx;
		min-height: 200px;
		padding: 48rpx;
		box-sizing: border-box;
		background: #fff;
		border-radius: 16rpx;
	}

	.content .title {
		text-align: center;
		color: #333;
		font-weight: bold;
		font-size: 32rpx;
	}

	.content .des {
		font-size: 26rpx;
		color: #666;
		margin-top: 40rpx;
		text-align: justify;
		line-height: 1.6;
	}

	.content .des .link {
		color: #07c160;
		text-decoration: underline;
	}

	.btns {
		margin-top: 48rpx;
		display: flex;
	}

	.btns .item {
		justify-content: space-between;
		width: 244rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 16rpx;
		box-sizing: border-box;
		border: none;
	}

	.btns .reject {
		background: #f4f4f5;
		color: #909399;
	}

	.btns .agree {
		background: #07c160;
		color: #fff;
	}
</style>
