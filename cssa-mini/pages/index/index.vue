<template>
	<view class="container">
		<uni-popup ref="popup" type="bottom" background-color="#fff">
			<view>新用户第一次登陆将自动注册</view>
			<button class="button" @click="getUserProfile">授权信息</button>
		</uni-popup>
		<view class="avatar-box">
			<img class="avatar" :src="userInfo.avatarUrl">	
			<view class="nickname">{{userInfo.nickName}}</view>
		</view>
		
		<view class="function-box" @click="toUserInfo">
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
				userInfo:{},
			}
		},
		mounted(){
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					this.userInfo = res.data;
				},
				fail: () => {
					this.$refs.popup.open();
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
					},
				});
			},
			toUserInfo:function(){
				uni.navigateTo({
					url:"./userInfo"
				})
			}
		}
	}
</script>

<style>
	@import "@/static/iconfont.css";
	.avatar-box{
		display:flex;
		height:100px;
		padding-top:10px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.avatar{
		border-radius: 50%;
		width:50px;
		height:50px;
	}
	.nickname{
		font-size:15px;
		padding-top:5px;
	}
	.function-box{
		width:80%;
		margin-top:50px;
		background-color: white;
		display:flex;
		flex-direction: column;
		padding: 0 10% 0 10%;
	}
	.function{
		width:100%;
		display:flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height:40px;
	}
	.icon-box{
		width:15%;
		
	}
	.icon{
		color:#1684FC;
		font-size:25px !important;
	}
	.text{
		width:75%;
		text-align: left;
		display: flex;
		flex-direction: column;
		justify-content: center;
		line-height: 20px;
	}
	.arrow{
		color:#AAA;
	}
	.icon-small{
		color:#1684FC;
		font-size:18px !important;
	}
</style>
