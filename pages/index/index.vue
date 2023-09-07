<template>
	<view id="index">
		<script src="@/static/iconfont/iconfont.js"></script>
		<view class="container">
			<uni-popup ref="welcome" background-color="fff">
				<welcome></welcome>
			</uni-popup>
			<view class="user-box" v-if="isLogin" @click="toUserInfo">
				<view class="avatar-box">
					<img :class="{'red-border': userInfo.isStudent, 'avatar': true }" v-show="this.userInfo"
						:src="'https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/' + this.userInfo.avatar + '.jpg'">
						<img class="tag" v-if="userInfo.isStudent"  src="https://cssa-mini-na.oss-us-west-1.aliyuncs.com/index/student.png">
						<img class="tag" v-if="!userInfo.isStudent"  src="https://cssa-mini-na.oss-us-west-1.aliyuncs.com/index/nonstudent.png">
				</view>
				<view class="name-box">
					<text class="nickname">{{userInfo.nickname}}</text>
				</view>

			</view>
			<view class="user-box" v-if="!isLogin">
				<button class="login-button" plain="true" @click="getUserProfile">点击微信授权登陆</button>
			</view>
			<view class="function-box">
				<view class="button-box" @click="jump(2)">
					<img class="image"
						src="https://cssa-mini-na.oss-us-west-1.aliyuncs.com/index/MyClass.svg" />
					<text class="text-box">我的评论</text>
				</view>
				<view class="button-box" @click="jump(3)">
					<img class="image"
						src="https://cssa-mini-na.oss-us-west-1.aliyuncs.com/index/mySecond.svg" />
					<text class="text-box">我的二手</text>
				</view>
				<view class="button-box" @click="jump(1)">
					<img class="image"
						src="https://cssa-mini-na.oss-us-west-1.aliyuncs.com/index/myRental.svg" />
					<text class="text-box">我的转租</text>
				</view>
			</view>
			<view class="function-box">
				<view class="button-box" @click="jump(4)">
					<img class="image"
						src="https://cssa-mini-na.oss-us-west-1.aliyuncs.com/index/aboutCssa.svg" />
					<text class="text-box">关于CSSA</text>
				</view>
				<view class="button-box" @click="jump(5)">
					<img class="image"
						src="https://cssa-mini-na.oss-us-west-1.aliyuncs.com/index/joinCSSA.svg" />
					<text class="text-box">联系CSSA</text>
				</view>
				<button class="button-box" open-type="feedback">
					<img class="image"
						src="https://cssa-mini-na.oss-us-west-1.aliyuncs.com/index/response.svg" />
					<text class="text-box">我要反馈</text>
				</button>			
			</view>
			<view class="swiper-container">
				<main-advertisement-vue height="200px" width="95vw"></main-advertisement-vue>
			</view>
		</view>
	</view>
</template>

<script>
	// import * from '../../static/iconfont/iconfont.js'
	export default {
		components:{
			mainAdvertisementVue
		},
		data() {
			return {
				userInfo: {},
				isLogin: false,
				iconList:[
					{text: ""}
				]
			}
		},
		onLoad() {
			wx.cloud.init();
		},
		onShow() {
			uni.$on("authSuccess", this.authSuccess)
			uni.getStorage({
				key: 'userInfo-2',
				success: (res) => {
					this.userInfo = res.data;
					this.isLogin = true;
					this.login(res.data.nickname);
				},
				fail: () => {
					this.isLogin = false;
				},
			});
		},
		onHide() {
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
			jump: function(index) {
				let directURL = "";
				if ((index == 2 || index == 3) && !this.isLogin) {
					uni.showToast({
						title: "请先登录",
						icon: "error"
					})
					return;
				}
				if (index == 1) {
					directURL = "/pages/myRental/myRental";
				}
				if (index == 2) {
					directURL = "/pages/myComment/myComment";
				}
				if (index == 3) {
					directURL = "/pages/mySecondhand/mySecondhand";
				}
				if (index == 4) {
					directURL = "/pages/aboutCSSA/aboutCSSA";
				}
				if(index == 5){
					directURL = "/pages/aboutCSSA/ContactUs";
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
				uni.setStorageSync("userInfo-2", res.data.data);

			},
			toChangeAvatar: function() {
				uni.navigateTo({
					url: '/pages/changeAvatar/changeAvatar?avatar=' + encodeURIComponent(JSON.stringify(this
						.userInfo.avatar)),
				});
			},
			authSuccess: function() {
				this.userInfo.isStudent = true;
			}
		}
	}
	import mainAdvertisementVue from '../../components/main-advertisement/main-advertisement.vue'
</script>

<style>
	@import '@/static/iconfont/iconfont.css';

	#index{
		position: absolute;
		width: 100vw;
		height: 100vh;
		background-image: url("https://cssa-mini-na.oss-us-west-1.aliyuncs.com/main/main-background.png");
		background-position: bottom;
		background-size: cover;
		background-repeat: no-repeat;
		top: 0;
	}
	.avatar-box {
		display: flex;
		width: 36vw;
		height: 36vw;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.user-box {
		width: 96vw;
		margin-left: 2vw;
		margin-top: 10px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		align-items: center;
	}

	.function-box {
		overflow:hidden;
		display: flex;
		flex-direction: row;
		height: 100px;
		width: 96vw;
		margin: 20px 2vw;
		background-color: white;
		border-radius: 20px;
		box-shadow: 0 0 5px rgba(165, 165, 165, 0.2);
	}


	.button-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 25%;
		font-size: 14px;
		line-height: 14px;
		border: none !important;
		background-color: white !important;
		border-radius: 0;
		color: #000;
		cursor: pointer;
		margin-left: 0;
		margin-right: 0;
		overflow: hidden;
		padding-left: 0px;
		padding-right: 0px;
		position: relative;
		text-align: center;
		text-decoration: none;
	}

	.button-box::after {
		border: none !important;
		border-radius: 0;
	}

	.image {
		width: 40px;
		height: 40px;
	}

	.text-box {
		text-align: center;
		margin-top: 10%;
		font-size: 12px;
	}

	.avatar {
		border-radius: 50%;
		width: 70% !important;
		height: 70% !important;
	}
	
	.red-border{
		border: double #C74444 5px;
	}
	.name-box {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.nickname {
		font-size: 15px;
		padding-top: 2px;
		font-weight: 700;
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
	.swiper-container{
		height: 20vh;
		width: 95vw;
		margin-left: 2.5vw;
	}
	.tag{
		width: 70%;
		height: 20%;
		position:absolute;
		bottom:10%;
	}
</style>