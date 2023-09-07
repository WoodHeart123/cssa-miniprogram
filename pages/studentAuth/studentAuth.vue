<template>
	<view id="studentAuth">
		<view class="title">学生认证</view>
		<view class="email-box">
			<input class="email-input" placeholder="请输入以wisc.edu域名结尾的邮箱" @input="onEmailInput" />
			
		</view>
		<text class="sub-text">注：我们不会储存任何关于验证邮箱的信息</text>
		<view class="email-box">
			<input v-model="authCode" class="auth-code-input" placeholder="请输入验证码" @input="onAuthCodeInput" type="number" maxlength="6"/>
			<button class="button" v-show="!showTime" plain="true" @click="getAuthCode" >获取验证码</button>
			<button class="button disabled" v-show="showTime" plain="true" disabled="true">{{time}}秒后重新获取</button>
		</view>

		<button class="confirm-button" style="background-color: #9b0000; color: #ffffff;" v-show="showButton" @click="confirm">确定</button>
		

	</view>
</template>

<script>
	export default {
		data() {
			return {
				email: "",
				authCode: "",
				regex: new RegExp('^([-a-zA-Z0-9_.]+)@([-a-zA-Z0-9_.])?wisc.edu$'),
				time: 60,
				showTime: false,
				timeCounter: {},
				showButton: false,
				userInfo:{}
			}
		},
		onLoad(){
			uni.getStorage({
				key:"userInfo-2",
				success:(res) => {
					this.userInfo = res.data;
				}
			});
		},
		methods: {
			onEmailInput(event) {
				this.email = event.detail.value;
			},
			onAuthCodeInput(event){
				this.authCode = event.detail.value;
			},
			async confirm(){
				uni.showLoading({
					mask:true
				})
				if(this.authCode.length == 0){
					uni.showToast({
						title: "请输入验证码",
						icon: "error"
					});
					return;
				}
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9gip97mx4bfa32a3', 
					},
					path: '/user/verifyAuthCode?authCode=' + this.authCode,
					method: 'GET', 
					header: {
						'X-WX-SERVICE': 'springboot-ds71',
					},
				});
				if(res.data.status && res.data.status == 100){
					this.userInfo.isStudent == true;
					uni.setStorageSync("userInfo-2",this.userInfo);
					uni.emit("authSuccess");
					uni.navigateBack({
						delta:1
					})
				}else if (res.data.status && res.data.status == 106){
					uni.hideLoading();
					uni.showToast({
						title:"验证码错误",
						icon:"error"
					})
				}else{
					uni.hideLoading();
					uni.showToast({
						title:"服务出现错误",
						icon:"error"
					})
				}
			},
			async getAuthCode(){
				if(this.email.length == 0){
					uni.showToast({
						title: "请输入邮箱",
						icon: "error"
					});
					return;
				}
				if (this.regex.test(this.email)) {
					this.time = 60;
					this.showTime = true;
					this.timeCounter = setInterval(() => {
						this.time--;
						if (this.time <= 0) {
							clearInterval(this.timeCounter);
							this.showTime = false;
						}
					}, 1000);
					const res = await wx.cloud.callContainer({
						config: {
							env: 'prod-9gip97mx4bfa32a3', 
						},
						path: '/user/getAuthCode?email=' + this.email,
						method: 'GET', 
						header: {
							'X-WX-SERVICE': 'springboot-ds71',
						},
					});
					this.showButton = true;
				} else {
					uni.showToast({
						title: "邮箱格式不正确",
						icon: "error"
					})
				}
			}

		}
	}
</script>

<style>
	@import '@/static/iconfont/iconfont.css';
	#studentAuth {
		top: 0;
		width: 100vw;
		height: 100vh;
		background-color: white;
	}

	.title {
		font-size: 20px;
		font-weight: 700;
		text-align: center;
		padding-top: 20px;
		margin-bottom: 50px;
	}

	.email-box {
		display: flex;
		flex-direction: row;
		width: 80vw;
		height: 30px;
		margin-left: 10vw;
		border-bottom: 1px solid #CCC;
		margin-top: 10px;
		align-items: center;
	}

	.email-input {
		width: 80vw;
	}

	.auth-code-input {
		width: 48vw;
	}

	.email-domain {
		width: 100px;
		line-height: 30px;
		color: #CCC;
		font-size: 14px;
	}

	.button {
		width: 32vw;
		height: 25px;
		border-radius: 12.5px;
		font-size: 14px;
		line-height: 25px;
		border: #CCC 1px solid !important;
		color: #1684FC !important;
	}

	.disabled {
		color: #CCC !important;
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
		margin-top: 30px;
	}
	.sub-text{
		color:#CCC;
		font-size: 14px;
		width: 80vw;
		margin-left: 10vw;
	}
</style>
