<template>
	<view>
		<act-box-vue @click="toDetail" class="act-box" :actDetail="actDetail"></act-box-vue>	
	</view>
</template>

<script>
	export default {
		components:{
			actBoxVue,
		},
		data(){
			return{
				userInfo:{},
				actDetail:{
					date:new Date(),
					location:"Humanities 1102",
					price:15,
					capacity:150,
					userJoined:120,
					title:"元宵节活动",
					imgs:["../../static/yuanxiao.jpg"]
				}
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
import actBoxVue from '@/components/act-box/act-box.vue'
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
</style>
