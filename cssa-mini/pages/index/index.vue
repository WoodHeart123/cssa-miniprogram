<template>
	<script src="@/static/iconfont/iconfont.js"></script>
	<view class="container">
		<uni-popup ref="welcome" background-color="fff">
			<welcome></welcome>
		</uni-popup>
		<view class="user-box">
			<view class="avatar-box">
				<img class="avatar" :src="userInfo.avatarUrl">
			</view>
			<view class="name-box" v-if="isLogin" @click="toUserInfo">
				<text class="nickname">{{userInfo.nickName}}</text>
				<uni-tag class="tag" v-if="userInfo.isStudent" type="primary" :inverted="false" text="学生认证√" size="mini" :circle="true" />
				<uni-tag class="tag" v-if="!userInfo.isStudent" :inverted="true" text="认证+" size="small" :circle="true" />
			</view>
			<view class="name-box" v-if="!isLogin">
				<button @click="getUserProfile">点击登陆</button>
			</view>
		</view>
		<view class="function-box">
			<view class="function-sub-box">
				<view class="button-box disabled">
					<img class="image" src="../../static/index/community.svg"/>
					<text class="text-box">我的帖子</text>
				</view>
				<view class="button-box disabled">
					<img class="image" src="../../static/index/zan.svg"/>
					<text class="text-box">赞/收藏</text>
				</view>
				<view class="button-box">
					<img class="image" src="../../static/index/comment.svg"/>
					<text class="text-box">我的评论</text>
				</view>
				<view class="button-box disabled">
					<img class="image" src="../../static/index/ebay.svg"/>
					<text class="text-box">我的二手</text>
				</view>
			</view>
			<view class="function-sub-box">
				<view class="button-box disabled">
					<img class="image" src="../../static/index/mem.svg"/>
					<text class="text-box">活动回忆</text>
				</view>
				<view class="button-box disabled">
					<img class="image" src="../../static/index/join.svg"/>
					<text class="text-box">加入CSSA</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import * from '../../static/iconfont/iconfont.js'
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
	/* @import "@/static/iconfont.css"; */

	.avatar-box {
		display: flex;
		height: 100%;
		width: 30%;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
	}
	.user-box{
		width: 96vw;
		height: 100px;
		margin-left: 2vw;
		margin-top:10px; 
		border-radius: 10px;
		display:flex;
		flex-direction: row;
		background-color: white;
	}
	.function-box{
		margin-top:20px; 
		display: flex;
		flex-direction: column;
		height: 180px;
		width: 96vw;
		margin-left: 2vw;
		border-radius: 10px;
		background-color: white;
	}
	.function-sub-box{
		display: flex;
		flex-direction: row;
		height: 90px;
		width:100%;
	}
	.button-box{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 25%;
	}
	.image {
		width: 60%;
		height: 30%;
	}
	.text-box{
		text-align: center;
		height: 30%;
		margin-top: 10%;
		font-size: 12px;
	}
	.avatar {
		border-radius: 10px;
		width: 70px;
		height: 70px;
	}
	.name-box{
		width: 70%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.nickname {
		font-size: 15px;
		padding-top: 2px;
		font-weight: 700;
		margin-right: 10px;
	}
	.disabled{
		color:#ccc;
	}
</style>
