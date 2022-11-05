<template>
	<script src="@/static/iconfont/iconfont.js"></script>
	<view class="container">
		<uni-popup ref="welcome" background-color="fff">
			<welcome></welcome>
		</uni-popup>
		<view class="user-box" v-if="isLogin">
			<view class="avatar-box" @click="toChangeAvatar">
				<img class="avatar" 
					:src="'https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/' + this.userInfo.avatar + '.jpg'">
			</view>
			<view class="name-box" @click="toUserInfo">
				<text class="nickname">{{userInfo.nickname}}</text>
				<!-- <uni-tag class="tag" v-if="userInfo.isStudent" type="primary" :inverted="false" text="学生认证√" size="mini"
					:circle="true" />
				<uni-tag class="tag" v-if="!userInfo.isStudent" :inverted="true" text="认证+" size="small"
					:circle="true" /> -->
			</view>

		</view>
		<view class="user-box" v-if="!isLogin">
			<button class="login-button" plain="true" @click="getUserProfile">点击微信授权登陆</button>
		</view>
		<view class="function-box">
			<view class="function-sub-box">
<!-- 				<view class="button-box disabled">
					<img class="image" src="../../static/index/community.svg" />
					<text class="text-box">我的帖子</text>
				</view>
				<view class="button-box disabled">
					<img class="image" src="../../static/index/zan.svg" />
					<text class="text-box">赞/收藏</text>
				</view> -->
				<view class="button-box" @click="jump(2)">
					<img class="image" src="../../static/index/comment.svg" />
					<text class="text-box">我的评论</text>
				</view>
<!-- 				<view class="button-box disabled">
					<img class="image" src="../../static/index/ebay.svg" />
					<text class="text-box">我的二手</text>
				</view> -->
			</view>
<!-- 			<view class="function-sub-box">
				<view class="button-box disabled">
					<img class="image" src="../../static/index/mem.svg" />
					<text class="text-box">活动回忆</text>
				</view>
				<view class="button-box disabled">
					<img class="image" src="../../static/index/join.svg" />
					<text class="text-box">加入CSSA</text>
				</view>
			</view> -->
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
			wx.cloud.init();
			this.getUserProfile();
			this.preLoadAvatar();
		},
		onShow() {
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					this.userInfo = res.data;
					this.login(res.data.nickName!=undefined?res.data.nickName:res.data.nickname);
				},
				fail: () => {
					this.isLogin = false;
				},
			});
			
		},
		onHide(){
			this.$refs.welcome.close();
		},
		onShareAppMessage(res) {
			return {
				title: "麦屯小助手",
				path: '/pages/main/main'
			}
		},
		onShareTimeline(res) {
			return {
				title: "麦屯小助手",
				path: '/pages/main/main'
			}
		},
		methods: {
			preLoadAvatar:function(){
				for(let i = 1;i <= 12;i++){
					// uni.getImageInfo({
					// 	src:'https://cssa-mini.oss-cn-shanghai.aliyuncs.com/cssa-mini-avatar/' + i.toString() + '.png'
					// })
				}
			},
			getUserProfile: function() {
				uni.getUserProfile({
					desc: "获取用户昵称",
					success: (userProfile) => {
						this.login(userProfile.userInfo.nickName);
					},
				});
			},
			jump:function(num){
				if(num == 2){
					uni.navigateTo({
						url: "/pages/myComment/myComment"
					});
				}
				
			},
			toUserInfo: function() {
				uni.navigateTo({
					url: "/pages/index/userInfo"
				})
			},
			async login(nickname) {
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9go38k3y9fee3b2e',
					},
					path: "/user/login?nickname=" + encodeURI(nickname),
					method: 'GET',
					header: {
						'X-WX-SERVICE': 'springboot-f8i8',
					}
				});
				this.userInfo = res.data.data;
				this.isLogin = true;
				uni.setStorageSync("userInfo",res.data.data);
				if (res.data.status == 103) {
					this.$refs.welcome.open();
				}
				
			},
			toChangeAvatar: function() {
				uni.navigateTo({
					url: '/pages/changeAvatar/changeAvatar?avatar=' + encodeURIComponent(JSON.stringify(this
						.userInfo.avatar)),
				});
			}
		}
	}
</script>

<style>
	@import '@/static/iconfont/iconfont.css';

	.avatar-box {
		display: flex;
		height: 100%;
		width: 30%;
		flex-direction: column;
		justify-content: center;
		align-items: center;

	}

	.user-box {
		width: 96vw;
		height: 100px;
		margin-left: 2vw;
		margin-top: 10px;
		border-radius: 10px;
		display: flex;
		flex-direction: row;
		background-color: white;
	}

	.function-box {
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		height: 180px;
		width: 96vw;
		margin-left: 2vw;
		border-radius: 10px;
		background-color: white;
	}

	.function-sub-box {
		display: flex;
		flex-direction: row;
		height: 90px;
		width: 100%;
	}

	.button-box {
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

	.text-box {
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

	.name-box {
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

	.disabled {
		color: #ccc;
	}

	.login-button {
		color: #aaa !important;
		border: none !important;
		height: 100px;
		width: 100%;
		background-color: white !important;
		line-height: 100px;
	}
</style>
