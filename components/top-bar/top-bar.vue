<template>
	<view class="top-bar" :style="{
				marginTop:menuButtonInfo.top + 'px',
				 marginLeft:  '12px',
				 height: menuButtonInfo.height + 'px'}">
		<view class="top-icon" v-show="navigateBack" :style="{
				width: menuButtonInfo.height + 'px', 
				height: menuButtonInfo.height + 'px'}" @click="navigateBack">
			<uni-icons type="arrowleft" size="25"></uni-icons>
		</view>
		<view class="heading-3 top-text" :style="{color: themeColor}">
			<text>{{text}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"top-bar",
		props: {
			text: {
				type: String,
				default: ''
			},
			navigateBack: {
				type: Boolean,
				default: false
			},
			themeColor: {
				type: String,
				default: '#161616'
			},
			styleType: {
				type: String,
				default: 'button'
			},
		},
		data() {
			return {
				menuButtonInfo: {}
			};
		},
		mounted() {
			this.menuButtonInfo = wx.getMenuButtonBoundingClientRect();
			console.log(this.menuButtonInfo)
		},
		methods: {
			navigateBack: function(){
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang='scss'>
	.top-bar {
		z-index: 1000;
		position: fixed;
		top:0;
		left: 0;
		display: flex;
		flex-direction: row;
		align-items: center;

		.top-icon {
			display: flex;
			align-items: center;
			justify-content: center;
			
			image {
				width: 100%;
				height: 100%;
			}
		}

		.top-text {
			margin-left: 15px;
		}
	}
</style>