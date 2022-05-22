<template>
	<view>
		<act-box-vue @click="toDetail" class="act-box" :actDetail="actDetail"></act-box-vue>
		<uni-popup ref="popup" type="bottom" background-color="#fff"><button class="button" @click="getUserProfile">授权信息</button></uni-popup>
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
				actDetail: {
					actID: 1,
					date: (new Date()).valueOf(),
					location: "Humanities 1102",
					price: 15,
					capacity: 150,
					userJoined: 120,
					title: "元宵节活动",
					imgs: [
						"../../static/detail_sample/hua1.jpeg",
						"../../static/detail_sample/hua2.jpeg",
						"../../static/detail_sample/hua3.jpeg",
						"../../static/detail_sample/hua4.jpeg"
					],
					description: "赏花节，有时人们又称为看花节，是四川省阿坝州马尔康地区藏族人民的传统节日。每年农历六月举行，为期三、五天或十来天不等。 农历六月，雪山草地百花盛开，牧草如茵，自然风光十分迷人。各村寨根据自己的实际情况，或在月初，或在月中，或在月末过节。届时藏族人民带着食品、帐篷，骑着披红挂彩的骏马，成群结队地在野外游走对歌，欣赏大自然的美景。然后选择山花烂漫的山岗，或绿草如茵的草坪，搭起帐篷，熬上茶，盛满青稞酒。人们聚集一起赏花品酒，交流放牧经验。 晚上，草坪上燃起一堆堆篝火，人们且饮且舞，或放声歌唱。近年来，赏花节更为热闹，除赏花，品酒，唱歌，跳舞，欣赏大自然外，还增添了摔跤，赛马，文艺演出等文体内容。传统赏花节中的祈祷人口增殖、生殖繁盛已淹没在历史的波涛巨浪之中。",
				}
			}
		},
		mounted() {
			uni.getStorage({
				key: 'userInfo',
				success:(res) => {
					this.userInfo = res.data;
				},
				fail: () => {
					this.$refs.popup.open();
				},
			});

		},
		methods: {
			getUserProfile: function() {
				console.log(1);
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
	.button{
		margin:20px 10px 0px 10px;
		border-radius: 10px;
		border: 1px solid #AAAAAA;
		background-color: #1684FC;
		color:white;
	}
</style>
