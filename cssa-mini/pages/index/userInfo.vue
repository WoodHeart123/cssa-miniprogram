<template>
	<view>
		<view class="section-title">联系方式</view>
		<view class="box" @click="toEmail">
			<view class="key">邮箱</view>
			<view class="value">{{this.userInfo.email?this.userInfo.email:"无"}}</view>
			<view class="arrow"><span class="iconfont">&#xe62d;</span></view>
		</view>
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
				key: 'userInfo',
				success: (res) => {
					this.userInfo = res.data;
				},
			});
		},
		methods:{
			toEmail:function(){
				uni.navigateTo({
					url:"./updateEmail"
				})
			}
		}
	}
</script>

<style>
	@import "@/static/iconfont.css";
	.section-title{
		margin-left:10%;
		font-size:12px;
		color:#AAA;
		margin-top:20px;
		margin-bottom: 5px;
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
	}
	.arrow{
		width:10%;
		margin-left:2%;
		color:#AAA;
		
	}
	
</style>