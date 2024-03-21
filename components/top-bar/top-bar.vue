<template>
	<view class="top-bar" :style="{
				marginTop:menuButtonInfo.top + 'px',
				 marginLeft: menuButtonInfo.height + 'px',
				 height: menuButtonInfo.height + 'px'}">
		<view class="top-icon" v-show="navigateBack" :style="{
				width: menuButtonInfo.height + 'px', 
				height: menuButtonInfo.height + 'px'}">
			<image src="@/static/cssa-logo-black.png"></image>
		</view>
		<view class="heading-3 top-text">
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
			activeColor: {
				type: String,
				default: '#2979FF'
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
		}
	}
</script>

<style lang='scss'>
	.top-bar {
		display: flex;
		flex-direction: row;
		align-items: center;

		.top-icon {
			
			image {
				width: 100%;
				height: 100%;
			}
		}

		.top-text {
			margin-left: 5px;
		}
	}
</style>