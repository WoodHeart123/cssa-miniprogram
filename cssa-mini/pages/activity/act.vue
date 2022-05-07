<template>
	<view>
		<button @click="getUserProfile">授权登陆</button>
		<div class="avatar-box"><img class="avatar" :src="userInfo.avatarUrl"></div>
		
		<div>a</div>
		
	</view>
</template>

<script>
	export default {
		data(){
			return{
				userInfo:{},
			}
		},
		mounted() {

		},
		methods: {
			getUserProfile: function() {
				if (uni.getUserProfile) {
					uni.getUserProfile({
						desc: "获取用户头像",
						success: (userProfile) => {
							this.userInfo = userProfile.userInfo;
							console.log(this.userInfo);
						},
						fail: (msg) => {
							console.log(msg);
						}
					});
				}
			}
		}
	}
</script>

<style>
	.avatar-box{
		width:100vw;
		height: 50px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.avatar{
		width:50px;
		height: 50px;
		border-radius: 100%;
	}
</style>
