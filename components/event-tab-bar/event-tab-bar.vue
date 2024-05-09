<template>
	<view class="tab-bar-box">
		<view class="main-area">
			<view class="icon-box left">
				<uni-icons type="home-filled" size="25" :color="clicked==='main'?'#7F0019':'#A9A9A9'"  @click="switchTab('main')"></uni-icons>
				<uni-icons type="location-filled" size="25" :color="clicked==='map'?'#7F0019':'#A9A9A9'" ></uni-icons>
			</view>
			<view class="mid-button" @click="createPost">
				<uni-icons type="plusempty" size="25" color="white"></uni-icons>
			</view>
			<view class="icon-box right">
				<uni-icons type="notification-filled" size="25" :color="clicked==='notification'?'#7F0019':'#A9A9A9'"></uni-icons>
				<uni-icons type="person-filled" size="25" :color="clicked==='profile'?'#7F0019':'#A9A9A9'" @click="switchTab('profile')"></uni-icons>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name:"event-tab-bar",
		props: {
			clicked: {
				type: String,
				default: 'main'
			},
		},
		methods:{
			switchTab(name){
				if(this.clicked != name){
					uni.redirectTo({
						url: `/pages/event/${name}`
					})
				}
			},
			createPost(){
				uni.navigateTo({
					url: '/pages/event/post'
				});
			}
		},
		data() {
			return {
				tabs:[""]
			};
		}
	}
</script>

<style lang="scss">
	
	.tab-bar-box{
		position:fixed;
		bottom: 0;
		width: 100vw;
		height: 65px;
		left: 0;
		background-color: $main-background-color-2;
		z-index: 100;
		
		.main-area{
			width: 100%;
			height: 100%;
			position: relative;
			display: flex;
			
			.mid-button{
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				width: 60px;
				height: 60px;
				border-radius: 60px;
				top: -20px;
				left: calc(50vw - 25px);
				background-color: $main-primary-color;
			}
			
			.icon-box{
				width: 40vw;
				margin: 0 10vw 0 0;
				display: flex;
				align-items: center;
				justify-content: space-around;
			}
			
			.icon-box.right{
				margin: 0 0 0 10vw;
			}
		}
		

	}
</style>