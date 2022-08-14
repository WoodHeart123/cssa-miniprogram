<template>
	<view class="title">更新邮箱</view>
	<input class="email-input" placeholder="请输入邮箱" @input="onEmailInput" />
	<button class="confirm-button" @click="confirm">确定</button>
</template>

<script>
	export default{
		data(){
			return{
				email:"",
				userInfo:{},
				regex:new RegExp('^([-a-zA-Z0-9_.]+)@([-a-zA-Z0-9_.]+).([a-zA-Z]{2,5})$'),
			}
		},
		mounted(){
			wx.cloud.init();
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					this.userInfo = res.data;
				},
				fail: () => {
					uni.showToast("获取用户信息失败");
					uni.switchTab({
						url:"../activity/act"
					});
				}
			});
		},
		methods:{
			onEmailInput(event){
				this.email = event.detail.value;
			},
			async confirm(){
				if(this.regex.test(this.email)){
					const res = await wx.cloud.callContainer({
						config: {
							env: 'prod-9go38k3y9fee3b2e', // 微信云托管的环境ID
						},
						path: '/activity/updateEmail?email=' + this.email,
						method: 'GET', 
						header: {
							'X-WX-SERVICE': 'springboot-f8i8',
						},
					});
					if(res.data.status == 100){
						this.userInfo.email = this.email;
						console.log(this.userInfo);
						
						uni.setStorage({
							key:"userInfo",
							data: this.userInfo
						});
						uni.navigateBack({
							delta:1
						})
					}
				}else{
					console.log(this.email);
					uni.showToast({
						title:"邮箱格式不正确",
						icon:"error"
					})
				}
			},
			cancel:function(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #fff;
	}
	.title{
		font-size: 20px;
		font-weight: 700;
		text-align: center;
		margin-top:20px;
		margin-bottom: 50px;
	}
	.email-input{
		width:80%;
		border-bottom: 1px solid #CCC;
		padding-bottom:2px;
		margin-left: 10%;
		margin-bottom: 20px;
	}
	
	.button-box{
		display:flex;
		flex-direction: row;
		justify-content: center;
		width:90%;
		margin-left: 5%;
	}
	.confirm-button{
		width:80%;
		height:36px;
		border-radius:18px;
		border:0 !important;
		background-color: #1684FC;
		display: flex;
		justify-content: center;
		font-size:14px;
	}
</style>