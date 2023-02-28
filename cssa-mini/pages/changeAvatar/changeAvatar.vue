<template>
	<view id="change-avatar">
		<view class="avatar-show-box">
			<img class="avatar-large" :src="'https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/' + currentAvatar + '.jpg'" />
		</view>
		<view class="bottom-line"></view>
		<view class="avatar-container">
			<view v-for="index in avatar" :key="index" :class="currentAvatar==index?'selected avatar-box':'avatar-box'" @click="select(index)">
				<img class="avatar" :src="'https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/' + index + '.jpg'" />
			</view>
		</view>
		<button class="button" v-show="showConfirm" @click="changeAvatar">确认</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatar:[1,2,3,4,5,6,7,8,9,10,11,12],
				currentAvatar:0,
				orignalAvatar:0,
				showConfirm:false,
			}
		},
		onLoad(options){
			this.currentAvatar = JSON.parse(decodeURIComponent(options.avatar));
			this.orignalAvatar = this.currentAvatar;
		},
		methods: {
			select:function(index){
				this.currentAvatar = index;
				if(this.orignalAvatar != index){
					this.showConfirm = true;
				}else{
					this.showConfirm = false;
				}
			},
			async changeAvatar(){
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9gip97mx4bfa32a3',
					},
					path: "/user/updateAvatar?avatar=" + this.currentAvatar.toString(),
					method: 'GET',
					header: {
						'X-WX-SERVICE': 'springboot-ds71',
					},
				});
				if(res.data.status == 100){
					let userInfo = uni.getStorageSync("userInfo-2");
					userInfo.avatar = this.currentAvatar;
					uni.setStorageSync("userInfo-2",userInfo);
					uni.navigateBack();
				}
			}
		}
	}
</script>

<style>
#change-avatar{
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
}
.avatar-container{
	width: 100vw;
	display: flex;
	flex-flow: row wrap;
	justify-content: space-around;
	align-items: center;
	
}
.avatar-box{
	display: flex;
	justify-content: center;
	align-items: center;
	width: 90px;
	height: 90px;
	border-radius: 10px;
	margin-top: 20px;
	
}
.selected{
	background-color: #c9d4fc;
}
.avatar{
	border-radius: 10px;
	width: 70px;
	height: 70px;
}
.avatar-large{
	border-radius: 10px;
	width: 90px;
	height: 90px;
}
.avatar-show-box{
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100px;
	margin-bottom: 20px;
	
}
.bottom-line{
	background: linear-gradient(to right, rgba(0, 0, 0, 0), #1684FC, rgba(0, 0, 0, 0));
	width:90vw;
	height: 2px;
	margin-left: 5vw;
	margin-bottom: 20px;
}
.button{
	width: 30vw;
	right: 20px;
	background-color:  #1684FC;
	border: none;
	color:white;
	margin-top: 20px;
	margin-left: 70vw;
}
</style>
