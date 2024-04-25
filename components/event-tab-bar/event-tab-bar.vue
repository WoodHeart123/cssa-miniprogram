<template>
	<view class="tab-bar-box">
		<view class="main-area">
			<view class="icon-box left">
				<uni-icons type="home-filled" size="30" :color="clicked==='home'?'#7F0019':'#A9A9A9'"></uni-icons>
				<uni-icons type="location-filled" size="30" color="#A9A9A9"></uni-icons>
			</view>
			<view class="mid-button">
				<uni-icons type="plusempty" size="30" color="white"></uni-icons>
			</view>
			<view class="icon-box right">
				<uni-icons type="notification-filled" size="30" color="#A9A9A9"></uni-icons>
				<uni-icons type="person-filled" size="30" color="#A9A9A9"></uni-icons>
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
				default: 'home'
			},
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	
	.tab-bar-box{
		position:fixed;
		bottom: 0;
		width: 100vw;
		height: 75px;
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
				top: -10px;
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