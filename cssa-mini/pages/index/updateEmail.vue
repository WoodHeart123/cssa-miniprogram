<template>
	<view class="title"></view>
	<input class="email-input" v-model="email" placeholder="请输入邮箱" @input="onEmailInput" />
	<view class="checkbox check_message">
		<checkbox-group @change="checkBoxChange">
			<checkbox value="save_contact" :checked="subscribe" color="#9b0000" style="transform:scale(0.8); le" />
			接受后续活动推送
		</checkbox-group>
	</view>
	<button class="confirm-button"  style="background-color: #9b0000; color: #ffffff;" @click="confirm">确定</button>
</template>

<script>
	export default{
		data(){
			return{
				email:"",
				userInfo:{},
				hasEmail: false,
				subscribe: false,
				regex:new RegExp('^([-a-zA-Z0-9_.]+)@([-a-zA-Z0-9_.]+).([a-zA-Z]{2,5})$'),
			}
		},
		onLoad(){
			wx.cloud.init();
			this.userInfo = uni.getStorageSync("userInfo-2");
			if (this.userInfo.email != null) {
				this.hasEmail = true;
				this.email = this.userInfo.email
			}
			if (this.userInfo.subscribe != null) {
				this.subscribe = this.userInfo.subscribe
			}
		},
		methods:{
			onEmailInput(event){
				this.email = event.detail.value;
			},
			checkBoxChange: function(e) {
				console.log(e)
				if (e.detail.length == 0) {
					this.subscribe = false;
				} else {
					this.subscribe = true;
				}
			},
			async confirm(){
				if(this.regex.test(this.email)){
					const res = await wx.cloud.callContainer({
						config: {
							env: 'prod-9gip97mx4bfa32a3', // 微信云托管的环境ID
						},
						path: `/user/updateProfile?str=${this.email}&subscribe=${this.subscribe}&service=email`,
						method: 'GET', 
						header: {
							'X-WX-SERVICE': 'springboot-ds71',
						},
					});
					if(res.data.status == 100){
						this.userInfo.email = this.email;
						this.userInfo.subscribe = this.subscribe;
						uni.setStorage({
							key:"userInfo-2",
							data: this.userInfo
						});
						uni.navigateBack({
							delta:1
						})
					}
				}else{
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
		background-color: #9b0000;
		display: flex;
		justify-content: center;
		font-size:14px;
	}
	.checkbox {
		margin-left: 40px;
		margin-top: 10px;
		margin-bottom: 20px;
		font-size: 16px;
	}
	.check_message {
		font-size: 14px;
		color: #8B0000;
	}
</style>
