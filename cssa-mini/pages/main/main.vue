<template>
	<view  id="main" class="column-container">
		<uni-swiper-dot class="uni-swiper-dot-box" @clickItem="clickItem" :info="actDetailList" :current="current" mode="dot"
			:dots-styles="dotStyle" field="content">
			<swiper class="swiper-box" @change="change">
				<swiper-item v-for="(actDetail, index) in actDetailList" :key="index">
					<img class='swiper-image' :src="actDetail.imgs" @click="toAct"/>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view class="row-container function-box">
			<view class="row-container function-button" @click="toCourse">
				<view class="column-container function-text">
					<text>课程论坛</text>
				</view>
				<img class="image" src="../../static/forum.svg" />
			</view>
			<view class="row-container function-button">
				<view class="row-container function-button">
					<view class="column-container function-text">
						<text>二手商品</text>
					</view>
					<img class="image" src="../../static/ebay.svg" />
				</view>
			</view>
		</view>
		<view class="row-container function-box">
			<view class="row-container function-button">
				<view class="row-container function-button">
					<view class="column-container function-text">
						<text>公寓转租</text>
					</view>
					<img class="image" src="../../static/apartment.svg" />
				</view>
			</view>
			<view class="row-container function-button">
				<view class="row-container function-button">
					<view class="column-container function-text">
						<text>生活手册</text>
					</view>
					<img class="image" src="../../static/handbook.svg" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components:{
			actBoxVue
		},
		data() {
			return {
				info: [{}, {}, {}],
				dotStyle: {
					backgroundColor: 'rgba(83, 200, 249,0.3)',
					border: '1px rgba(83, 200, 249,0.3) solid',
					color: '#fff',
					selectedBackgroundColor: 'rgba(83, 200, 249,0.9)',
					selectedBorder: '1px rgba(83, 200, 249,0.9) solid'
				},
				current: 0,
				actDetailList:[]

			}
		},
		onLoad(){
			wx.cloud.init();
			this.getActivityList();
		},
		methods: {
			change(e) {
				this.current = e.detail.current
			},
			clickItem(e){
				console.log(e);
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
			},
			toAct:function(){
				uni.switchTab({
					url:'/pages/activity/act'
				});
			},
			toCourse: function(){
				uni.navigateTo({
					url:"/pages/courseMain/courseMain"
				})
			}
		}
	}
	import actBoxVue from '@/components/act-box/act-box.vue';
</script>

<style>
	#main{
		width: 100vw;
		height: 100vh;
	}
	.column-container {
		display: flex;
		flex-direction: column;
	}

	.row-container {
		display: flex;
		flex-direction: row;
	}
	.uni-swiper-dot-box{
		margin-top:2vh;
		height: 25vh;
		
		margin-bottom: 2vh;
	}
	.swiper-box {
		width: 90vw;
		margin-left: 5vw;
		height: 25vh;
		background-color: #e5e5e5;
		border-radius: 10px;
	}
	.function-box{
		height: 10vh;
		margin-top:2vh;
		justify-content: space-around;
	}
	.function-button{
		width: 45vw;
		border-radius: 5px;	
		background-color: white;
		box-shadow:0 0px 6px 1px rgba(165,165,165,0.2)
	}
	.image{
		width: 40%;
		height: 100%;
		margin-right: 10%;
	}
	.function-text{
		width: 50%;
		justify-content: center;
		font-weight: 700;
		align-items: center;
	}
	.act-box{
		width: 94vw;
		height: 25vh;
	}
	.swiper-image{
		width: 100%;
		height: 100%;
	}
</style>
