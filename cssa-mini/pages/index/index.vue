<template>
	<view class="container">
		<uni-popup ref="popup" type="bottom" background-color="#fff"><button class="button"
				@click="getUserProfile">授权信息</button></uni-popup>
		<uni-popup ref="welcome" background-color="fff">
			<welcome></welcome>
		</uni-popup>
		<view class="avatar-box">
			<img class="avatar" :src="userInfo.avatarUrl">
			<view class="nickname">{{userInfo.nickName}}</view>
		</view>
		<view class="tag-view" v-if="this.userInfo.isStudent">
			<uni-tag :inverted="true" text="学生认证" size="small" :circle="true" />
		</view>
		<view class="function-box" v-show="isLogin" @click="toUserInfo">
			<view class="function">
				<view class="icon-box">
					<span class="iconfont icon">&#xe623;</span>
				</view>
				<view class="text">
					<span>用户信息</span>
				</view>
				<view class="arrow">
					<span class="iconfont icon-small">&#xe62d;</span>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				isLogin: true,
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					this.userInfo = res.data;
					this.login();
				},
				fail: () => {
					this.isLogin = false;
				},
			});
			wx.cloud.init();
		},
		methods: {
			getUserProfile: function() {
				uni.getUserProfile({
					desc: "获取用户头像",
					success: (userProfile) => {
						this.userInfo = userProfile.userInfo;
						uni.setStorage({
							key: "userInfo",
							data: this.userInfo
						});
						this.$refs.popup.close();
						this.login();
					},
				});
			},
			toUserInfo: function() {
				uni.navigateTo({
					url: "/pages/index/userInfo"
				})
			},
			async login() {
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9go38k3y9fee3b2e',
					},
					path: "/activity/login?nickname=" + encodeURI(this.userInfo.nickName),
					method: 'GET',
					header: {
						'X-WX-SERVICE': 'springboot-f8i8',
					}
				});
				if (res.data.status == 103) {
					this.$refs.popup.close();
					this.$refs.welcome.open();
					return;
				}
				this.userInfo.email = res.data.data.email;
				this.userInfo.isStudent = res.data.data.isStudent;
				uni.setStorage({
					key: "userInfo",
					data: this.userInfo
				});
			}
		}
	}
</script>

<style>
	@import "@/static/iconfont.css";

	.avatar-box {
		display: flex;
		height: 100px;
		padding-top: 10px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.avatar {
		border-radius: 50%;
		width: 50px;
		height: 50px;
	}

	.nickname {
		font-size: 15px;
		padding-top: 5px;
	}

	.function-box {
		width: 80%;
		margin-top: 20px;
		background-color: white;
		display: flex;
		flex-direction: column;
		padding: 0 10% 0 10%;
	}

	.function {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 40px;
	}

	.icon-box {
		width: 15%;

	}

	.icon {
		color: #1684FC;
		font-size: 25px !important;
	}

	.text {
		width: 75%;
		text-align: left;
		display: flex;
		flex-direction: column;
		justify-content: center;
		line-height: 20px;
	}

	.arrow {
		color: #AAA;
	}

	.icon-small {
		color: #1684FC;
		font-size: 18px !important;
	}

	.button {
		margin: 20px 10px 20px 10px;
		border-radius: 10px;
		border: 1px solid #AAAAAA;
		background-color: #1684FC;
		color: white;
	}

	.tag-view {
		display: flex;
		width: 100%;
		justify-content: center;
		height: 20px;
	}
</style>
