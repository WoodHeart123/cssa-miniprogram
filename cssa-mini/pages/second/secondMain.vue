<template>
	<!-- <view class="button">cssa</view> -->
	<view class="container">
		<view class="ant">
			<span>我不知道我不知道我不知道我不知道我不知道我不知道我不知道我不知道我不知道</span>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	
.container{
	display: flex;
	height: 500px;
	width: 80vw;

}
.ant{
	line-height: 22px;
	font-size: 15px;
	overflow: hidden;
	overflow-x: hidden;
	/* white-space: pre-wrap;	 */
	text-overflow: ellipsis;
	/* display: -webkit-box; */
	/* -webkit-line-clamp: 4; */
	/* -webkit-box-orient: vertical; */
	width: 100px;
	max-height: 110px;
	/* min-height: 50px; */
}
.button{
	position: fixed; 
	border-radius: 20px;
	width: 100px;
	height: 50px;
	color:white;
}
</style>
