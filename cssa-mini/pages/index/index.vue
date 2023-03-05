<template>
	<script src="@/static/iconfont/iconfont.js"></script>
	<view class="container">
		<uni-popup ref="welcome" background-color="fff">
			<welcome></welcome>
		</uni-popup>
		<view class="user-box" v-if="isLogin"  @click="toUserInfo">
			<view class="avatar-box">
				<img class="avatar" 
					:src="'https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/' + this.userInfo.avatar + '.jpg'">
			</view>
			<view class="name-box">
				<text class="nickname">{{userInfo.nickname}}</text>
				<uni-tag class="tag" v-if="userInfo.isStudent" type="primary" :inverted="false" text="学生认证√" size="mini"
					:circle="true" />
				<uni-tag class="tag" v-if="!userInfo.isStudent" :inverted="true" text="认证+" size="small"
					:circle="true" />
			</view>

		</view>
		<view class="user-box" v-if="!isLogin">
			<button class="login-button" plain="true" @click="getUserProfile">点击微信授权登陆</button>
		</view>
		<view class="function-box">
			<view class="function-sub-box">
				<!-- <view class="button-box disabled">
					<img class="image" src="https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-icon/index/community.svg" />
					<text class="text-box">我的帖子</text>
				</view> -->
<!-- 				<view class="button-box" @click="jump(1)">
					<img class="image" src="https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-icon/index/zan.svg" />
					<text class="text-box">赞/收藏</text>
				</view> -->
				<view class="button-box" @click="jump(2)">
					<img class="image" src="https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-icon/index/comment.svg" />
					<text class="text-box">我的评论</text>
				</view>
				<view class="button-box" @click="jump(3)">
					<img class="image" src="https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-icon/index/ebay.svg" />
					<text class="text-box">我的二手</text>
				</view>
				<view class="button-box" @click="jump(4)">
					<img class="image" src="https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-icon/index/join.svg" />
					<text class="text-box">加入CSSA</text>
				</view>
			</view>
			<view class="function-sub-box">
				<!-- <view class="button-box disabled">
					<img class="image" src="https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-icon/index/mem.svg" />
					<text class="text-box">活动回忆</text>
				</view> -->
				
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
			wx.cloud.init();
			uni.on("authSuccess",this.authSuccess)
		},
		onShow() {
			uni.getStorage({
				key: 'userInfo-2',
				success: (res) => {
					this.userInfo = res.data;
					this.login(res.data.nickname);	
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
			jump: function(index){
				let directURL = "";
				if(index == 1){
					directURL = "/pages/mySave/mySave";
				}if(index == 2){
					directURL = "/pages/myComment/myComment";
				}if(index == 3){
					directURL = "/pages/mySecondhand/mySecondhand";
				}if (index == 4){
					directURL = "/pages/aboutCSSA/aboutCSSA";
				}
				uni.navigateTo({
					url: directURL
				})
			},
			getUserProfile: function() {
				uni.getUserProfile({
					desc: "获取用户昵称",
					success: (userProfile) => {
						this.userInfo.nickname = userProfile.userInfo.nickName;
						this.login(userProfile.userInfo.nickName);
					},
				});
			},
			toUserInfo: function() {
				uni.navigateTo({
					url: "/pages/index/userInfo"
				})
			},
			async login(nickname) {
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9gip97mx4bfa32a3',
					},
					path: "/user/login?nickname=" + encodeURI(nickname),
					method: 'GET',
					header: {
						'X-WX-SERVICE': 'springboot-ds71',
					}
				});
				this.userInfo = res.data.data;
				this.isLogin = true;
				uni.setStorageSync("userInfo-2",res.data.data);
				
			},
			toChangeAvatar: function() {
				uni.navigateTo({
					url: '/pages/changeAvatar/changeAvatar?avatar=' + encodeURIComponent(JSON.stringify(this
						.userInfo.avatar)),
				});
			},
			authSuccess: function(){
				this.userInfo.isStudent = true;
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
