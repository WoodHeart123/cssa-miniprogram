<template>
	<script src="@/static/iconfont/iconfont.js"></script>
	<view>
		<view class="section-title">头像</view>
		<view class="avatar-box" @click="toChangeAvatar">
			<view class="avatar-container">
				<img class="avatar"
					:src="'https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/' + this.userInfo.avatar + '.jpg'">
			</view>
			<view class="arrow"><span class="iconfont">&#xe62d;</span></view>
		</view>
		<view class="section-title">认证</view>
		<view class="box" @click="toStudentAuth">
			<view class="key">学生认证</view>
			<view class="value">{{this.userInfo.isStudent?"已认证√":"暂无认证"}}</view>
			<view class="arrow" v-if="!this.userInfo.isStudent"><span class="iconfont">&#xe62d;</span></view>
		</view>
		<view class="section-title">个人信息</view>
		<view class="box" @click="toName">
			<view class="key">昵称</view>
			<view class="value">{{this.userInfo.nickname}}</view>
			<view class="arrow"><span class="iconfont">&#xe62d;</span></view>
		</view>
<!-- 		<view class="box" @click="toID">
			<view class="key">微信号</view>
			<view class="value">{{this.userInfo.wechatID?this.userInfo.wechatID:"无"}}</view>
			<view class="arrow"><span class="iconfont">&#xe62d;</span></view>
		</view> -->
<!-- 		<view class="box" @click="toEmail">
			<view class="key">邮箱</view>
			<view class="value">{{this.userInfo.email?this.userInfo.email:"无"}}</view>
			<view class="arrow"><span class="iconfont">&#xe62d;</span></view>
		</view> -->
		<!-- <view class="box" @click="toWechatID">
			<view class="key">微信号</view>
			<view class="value">{{this.userInfo.email?this.userInfo.email:"无"}}</view>
			<view class="arrow"><span class="iconfont">&#xe62d;</span></view>
		</view> -->
	</view>
</template>

<script>
	export default{
		data(){
			return{
				userInfo:{},
			}
		},
		onShow(){
			uni.getStorage({
				key: 'userInfo-2',
				success: (res) => {
					this.userInfo = res.data;
					console.log(res.data)
				},
			});
		},
		methods:{
			toEmail:function(){
				uni.navigateTo({
					url:"/pages/user/updateEmail"
				})
			},
			toStudentAuth:function(){
				if(this.userInfo.isStudent){
					return;
				}
				uni.navigateTo({
					url: "/pages/user/studentAuth"
				})
			},
			toID:function(){
				uni.navigateTo({
					url: "./updateID"
				})
			},
			toName:function(){
				uni.navigateTo({
					url: "./updateName"
				})
			},
			toChangeAvatar:function(){
				uni.navigateTo({
					url: '/pages/user/changeAvatar?avatar=' + encodeURIComponent(JSON.stringify(this
						.userInfo.avatar)),
				});
			},
			
		}
	}
	import requestAPI from '@/api/request.js'
</script>

<style>
	@import '@/static/iconfont/iconfont.css';
	.section-title{
		margin-left:10%;
		font-size:12px;
		color:#AAA;
		margin-top:20px;
		margin-bottom: 5px;
	}
	.avatar-box{
		width:100%;
		height:100px;
		background-color: white;
		display:flex;
		flex-direction: row;
		align-items: center;
		line-height: 15px;
	}
	.avatar-container{
		width: 80px;
		height: 80px;
		margin-left: 20px;
		border-radius: 10px;
		margin-right: calc(88% - 100px);
	}
	image{
		width: 100%;
		height: 100%;
		border-radius: 10px;
	}
	.box{
		width:100%;
		height:40px;
		background-color: white;
		display:flex;
		flex-direction: row;
		align-items: center;
		line-height: 15px;
	}
	.key{
		margin-left:10%;
		width:20%;
		font-size:15px;
	}
	.value{
		width:58%;
		text-align: right;
		color:#AAA;
		font-size:13px;
		line-height: 20px;
	}
	.arrow{
		width:10%;
		margin-left:2%;
		color:#AAA;
		font-size: 13px;
		line-height: 20px;
	}
	
</style>