<template>
	<view class="welcome">
		<view class="welcome-title">欢迎来到CSSA小助手</view>
		<view class="welcome-text">请完善联系方式以更好的帮助CSSA了解你</view>
		<button class="button" @click="toUserInfo">完善联系方式</button>
	</view>
</template>

<script>
	export default{
		name: "welcome",
		methods:{
			toUserInfo:function(){
				uni.$emit('closeWelcome',{msg:'页面关闭'})
				uni.navigateTo({
					url:'/pages/index/userInfo'
				});
			}
		}
	}
</script>

<style>
	.welcome{
		height:150px;
		width:300px;
		border-radius: 5%;
		display:flex;
		flex-direction: column;
		background-color: white;
		align-items: center;
	}
	.welcome-title{
		margin-top:10px;
		font-size:20px;
		font-weight: 700;
		
	}
	.welcome-text{
		margin-top:5px;
		font-size:12px;
		color:#BBB;
	}
	.button{
		margin-top: 10px;
		width:80%;
		height:50px;
	}
</style>