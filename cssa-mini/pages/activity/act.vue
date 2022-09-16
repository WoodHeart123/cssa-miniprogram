<template>
	<view id="act">
		<uni-segmented-control class="topBar" :current="current" :values="items" style-type="text"
			active-color="#1684FC" @clickItem="onClickItem" />
		<scroll-view class="scroll" scroll-top="0" scroll-y="true">
			<view v-if="current == 0" v-for="(actDetail,index) in actDetailList" :key="index">
				<act-box-vue @click="toDetail" class="act-box" :actDetail="actDetail" :ifJoined="false"></act-box-vue>
			</view>
			<view v-if="current == 1" v-for="(actDetail,index) in registerList" :key="index">
				<act-box-vue @click="toDetail" class="act-box" :actDetail="actDetail" :ifJoined="true"></act-box-vue>
			</view>
			<view class="footnote"></view>
		</scroll-view>
		<view v-if="current == 1" v-for="(actDetail,index) in registerList" :key="index"></view>
		<uni-popup ref="popup" type="bottom" background-color="#fff"><button class="button"
				@click="getUserProfile">授权信息</button></uni-popup>
		<uni-popup ref="welcome" background-color="fff">
			<welcome></welcome>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		onShareAppMessage(res) {
			return {
				title: "麦屯小助手",
				path: '/pages/activity/act'
			}
		},
		components: {
			actBoxVue,
			welcome,
			loading,
		},
<<<<<<< HEAD
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
					text:"元宵节，又称上元节、小正月、元夕或灯节，时间为每年农历正月十五。
正月是农历的元月，古人称“夜”为“宵”，正月十五是一年中第一个月圆之夜，所以称正月十五为“元宵节”。根据道教“三元”的说法，正月十五又称为“上元节”。元宵节习俗自古以来就以热烈喜庆的观灯习俗为主。 [1-3] 
元宵节的形成有一个较长的过程，根源于民间开灯祈福古俗。据一般的资料与民俗传说，正月十五在西汉已经受到重视，不过正月十五元宵节真正作为全国民俗节日是在汉魏之后。正月十五燃灯习俗的兴起也与佛教东传有关，唐朝时佛教大兴，仕官百姓普遍在正月十五这一天“燃灯供佛”，佛家灯火于是遍布民间，从唐代起，元宵张灯即成为法定之事。 [4-6] 
元宵节是中国的传统节日之一。元宵节主要有赏花灯、吃汤圆、猜灯谜、放烟花等一系列传统民俗活动。此外，不少地方元宵节还增加了游龙灯、舞狮子、踩高跷、划旱船、扭秧歌、打太平鼓等传统民俗表演。2008年6月，元宵节选入第二批国家级非物质文化遗产。"
				}
=======
		data() {
			return {
				userInfo: {},
				actDetailList: [],
				registerList: [],
				items: ['待报名', '已报名/已参加'],
				current: 0,
				count: 0,
				mode:"",
>>>>>>> master
			}
		},
		onLoad() {
			wx.cloud.init();
			uni.$on('close-welcome', (data) => {
				this.$refs.welcome.close();
				console.log(data);
			})
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					this.userInfo = res.data;
					this.login();
				},
				fail: () => {
					this.$refs.popup.open();
				},
			});
			this.mode = "first";
			uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			if (this.mode == "first") {
				this.getActivityList();
				this.getRegisterList();
			} else {
				if (current == 0) {
					this.getActivityList();
				} else {
					this.getRegisterList();
				}
			}
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 2000);

		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			async getActivityList() {
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
				uni.stopPullDownRefresh();

			},
			async getRegisterList() {
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9go38k3y9fee3b2e',
					},
					path: "/activity/registerList",
					method: 'GET',
					header: {
						'X-WX-SERVICE': 'springboot-f8i8',
					}
				});
				this.registerList = res.data.data;
				uni.stopPullDownRefresh();
			},
			getUserProfile: function() {
				uni.getUserProfile({
					desc: "获取用户信息",
					success: (userProfile) => {
						this.userInfo = userProfile.userInfo;
						this.$refs.popup.close();
						this.login();
					},
				});
			},
			async login() {
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9go38k3y9fee3b2e',
					},
					path: "/activity/login?nickname=" + encodeURI(this.userInfo.nickName),
					method: 'GET',
					header: {
						'X-WX-SERVICE': 'springboot-f8i8',
					}
				});
				if (res.data.status == 103) {
					this.$refs.popup.close();
					this.$refs.welcome.open();
					return;
				}
				this.userInfo.email = res.data.data.email;
				console.log(this.userInfo);
				uni.setStorage({
					key: "userInfo",
					data: this.userInfo
				});

			}
		}
	}
	import actBoxVue from '@/components/act-box/act-box.vue';
	import welcome from '@/components/welcome/welcome.vue';
	import loading from '@/components/loading/loading.vue';
	import moment from 'moment';
</script>

<style>
	#act {
		display: flex;
	}

	.avatar-box {
		width: 100vw;
		height: 50px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.button {
		margin: 20px 10px 20px 10px;
		border-radius: 10px;
		border: 1px solid #AAAAAA;
		background-color: #1684FC;
		color: white;
	}

	.topBar {
		width: 100%;
		height: 50px;
		position: fixed;
		z-index: 5;
		background-color: #efeff4;
	}

	.scroll {
		padding-top: 30px;
		height: calc(100% - 30px);
		z-index: 1;
	}

	.footnote {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-width: 100%;
		min-height: 50px;
	}

	.central-text {
		font-size: 30px;
		color: #AAA;
	}
</style>
