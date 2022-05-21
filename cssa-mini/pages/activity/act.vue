<template>
	<view>
		<act-box-vue @click="toDetail" class="act-box" :actDetail="actDetail"></act-box-vue>	
		<span></span>
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
					text:"元宵节，又称上元节、小正月、元夕或灯节，时间为每年农历正月十五。
正月是农历的元月，古人称“夜”为“宵”，正月十五是一年中第一个月圆之夜，所以称正月十五为“元宵节”。根据道教“三元”的说法，正月十五又称为“上元节”。元宵节习俗自古以来就以热烈喜庆的观灯习俗为主。 [1-3] 
元宵节的形成有一个较长的过程，根源于民间开灯祈福古俗。据一般的资料与民俗传说，正月十五在西汉已经受到重视，不过正月十五元宵节真正作为全国民俗节日是在汉魏之后。正月十五燃灯习俗的兴起也与佛教东传有关，唐朝时佛教大兴，仕官百姓普遍在正月十五这一天“燃灯供佛”，佛家灯火于是遍布民间，从唐代起，元宵张灯即成为法定之事。 [4-6] 
元宵节是中国的传统节日之一。元宵节主要有赏花灯、吃汤圆、猜灯谜、放烟花等一系列传统民俗活动。此外，不少地方元宵节还增加了游龙灯、舞狮子、踩高跷、划旱船、扭秧歌、打太平鼓等传统民俗表演。2008年6月，元宵节选入第二批国家级非物质文化遗产。"
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
			},
			toDetail:function(){
				
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
	.avatar{
		width:50px;
		height: 50px;
		border-radius: 100%;
	}
</style>
