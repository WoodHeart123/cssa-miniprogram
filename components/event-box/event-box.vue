<template>
	<view class="event-box">
		<view class="image-box">
			<image src="https://7072-prod-9gip97mx4bfa32a3-1312104819.tcb.qcloud.la/cssa-event/mahjong.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name:"event-box",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.event-box{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		border-radius: 25px;
		background-color: $main-background-color-2;
		
		.image-box{
			display: flex;
			width: 40%;
			flex:1;
			
			image{
				width: 30vw;
				height: 30vw;
			}
		}
	}
</style>