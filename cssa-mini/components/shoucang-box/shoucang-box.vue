<template>
	<view>
		<uni-swipe-action>
			<uni-swipe-action-item @click="bindClick">
				<view style="padding: 10px; background-color: white;">
					使用插槽
				</view>
				<template v-slot:right>
					<view @click="bindClick()" class="slot-button"><text>删除</text></view>
				</template>
			</uni-swipe-action-item>
		</uni-swipe-action>
	</view>
</template>

<script>
	export default {
		props:['shoucangDetail'],
		data(){
			return{
		
			}
		},
		
		methods:{
			bindClick(){
				this.$emit("delete", 1);
				uni.showToast({
					title: '已删除'
				});
			}
		}
		
	}
</script>

<style>
	.container {
		width: 94vw;
		margin-left: 3vw;
		margin-top: 10px;
		border-radius: 5px;
		box-shadow: rgba(0, 0, 0, 0.2) 0 0 5px;
		background-color: white;
	}
	
	.slot-button {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 0 20px;
		background-color: #ff5a5f;
	}
	.top-container{
		display: flex;
		width: 50vw;
		height: 17vw;
	}
	.image {
		height: 13vw;
		width: 13vw;
		border-radius: 50%;
		margin-left: 3vw;
		margin-top: 3vw;
	}
	.user-name{
		margin-left: 2.5vw;
		font-size: 80%;
		margin-top: 4vh;
	}
	.content-container{
		margin-top: 1vh;
	}
	.title{
		margin-left: 3vw;
		margin-right:3vw;
		font-weight: 450;
	}
	.content{
		margin-top: 1vh;
		margin-left: 3vw;
		margin-right: 3vw;
	}
	.content-text{
		font-size: 50%;
		font-weight: 200;
		line-height: 140%;
	}
	.image-box{
		margin-top: 1vh;
		margin-left: 3vw;
		margin-right: 3vw;
		display: flex;
	}
	.image-more{
		display: flex;
		flex-wrap: wrap;
	}
	.picture-more{
		height: 15vh;
		width: 25vw;
		border-radius: 5%;
		margin: 2px;
	}
	.picture-2{
		height: 20vh;
		width: 40vw;
		border-radius: 5%;
		margin: 5px;
	}
	.picture-1{
		height: 20vh;
		border-radius: 5%;
		margin: 5px;
	}
	.whitespace{
		height: 3vw;
	}
	.content-description{
		font-size: 50%;
		font-weight: 200;
		line-height: 140%;
		color: cornflowerblue;
	}
</style>