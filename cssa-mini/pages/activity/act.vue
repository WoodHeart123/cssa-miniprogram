<template>
	<view>
		<view v-for="(actDetail,index) in actDetailList" :key="index">
			<act-box-vue @click="toDetail" class="act-box" :actDetail="actDetail"></act-box-vue>
		</view>
		<uni-popup ref="popup" type="bottom" background-color="#fff"><button class="button"
				@click="getUserProfile">授权信息</button></uni-popup>
	</view>
</template>

<script>
	export default {
		components: {
			actBoxVue,
		},
		data() {
			return {
				userInfo: {},
				actDetailList: [],
			}
		},
		mounted() {
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
			this.getActivityList();
		},
		methods: {
			async getActivityList(){
				const res = await wx.cloud.callContainer({
				  config: {
				    env: 'prod-9go38k3y9fee3b2e', // 微信云托管的环境ID
				  },
				  path: "/activity/activityList?current=" + Date.now(),
				  method: 'GET', // 按照自己的业务开发，选择对应的方法
				  header: {
				    'X-WX-SERVICE': 'springboot-f8i8',
				  }
				});
				this.actDetailList = res.data.data;
				
			},
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
			}
		}
	}
	import actBoxVue from '@/components/act-box/act-box.vue'
	import moment from 'moment';
</script>

<style>
	.avatar-box {
		width: 100vw;
		height: 50px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.button {
		margin: 20px 10px 0px 10px;
		border-radius: 10px;
		border: 1px solid #AAAAAA;
		background-color: #1684FC;
		color: white;
	}
</style>
