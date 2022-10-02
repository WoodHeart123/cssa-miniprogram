<template>
	<view id="change-avatar">
		<view class="avatar-show-box">
			<img class="avatar-large" :src="'https://cssa-mini.oss-cn-shanghai.aliyuncs.com/cssa-mini-avatar/' + currentAvatar + '.png'" />
		</view>
		<view class="bottom-line"></view>
		<view class="avatar-container">
			<view v-for="index in avatar" :key="index" :class="currentAvatar==index?'selected avatar-box':'avatar-box'" @click="select(index)">
				<img class="avatar" :src="'https://cssa-mini.oss-cn-shanghai.aliyuncs.com/cssa-mini-avatar/' + index + '.png'" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatar:[1,2,3,4,5,6,7,8,9,10,11,12],
				currentAvatar:0,
				orignalAvatar:0,
				showConfirm:false,
			}
		},
		onLoad(options){
			this.currentAvatar = JSON.parse(decodeURIComponent(options.avatar));
		},
		methods: {
			select:function(index){
				this.currentAvatar = index;
				if(this.orignalAvatar != index){
					this.showConfirm = true;
				}else{
					this.showConfirm = false;
				}
			}
		}
	}
</script>

<style>
#change-avatar{
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
}
.avatar-container{
	width: 100vw;
	height: 40vh;
	display: flex;
	flex-flow: row wrap;
	justify-content: space-around;
	align-items: center;
	
}
.avatar-box{
	display: flex;
	justify-content: center;
	align-items: center;
	width: 90px;
	height: 90px;
	border-radius: 10px;
	
}
.selected{
	background-color: #c9d4fc;
}
.avatar{
	border-radius: 10px;
	width: 70px;
	height: 70px;
}
.avatar-large{
	border-radius: 10px;
	width: 90px;
	height: 90px;
}
.avatar-show-box{
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100px;
	margin-bottom: 20px;
	
}
.bottom-line{
	background: linear-gradient(to right, rgba(0, 0, 0, 0), #1684FC, rgba(0, 0, 0, 0));
	width:90vw;
	height: 2px;
	margin-left: 5vw;
	margin-bottom: 20px;
}
</style>
