<template>
	<view>
		<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
			:duration="duration">
			<swiper-item>
				<image src="../../static/aboutCSSA-p1.png"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/aboutCSSA-p2.png"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/aboutCSSA-p3.png"></image>
			</swiper-item>
		</swiper>
	</view>
	<view>
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper"
			@scrolltolower="lower" @scroll="scroll">
			<view id="demo1" class="scroll-view-item uni-bg-red">A</view>
			<view id="demo2" class="scroll-view-item uni-bg-green">B</view>
			<view id="demo3" class="scroll-view-item uni-bg-blue">C</view>
		</scroll-view>
	</view>
	<view @tap="goTop" class="uni-link uni-center uni-common-mt">
					点击这里返回顶部
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// swiper
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				// scoller downwards
				scrollTop: 0,
				old: {
					scrollTop: 0
				}	
			}
		},
		methods: {
			// swiper 
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			},
		
			// scoller downwards
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				// 解决view层不同步的问题
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
				uni.showToast({
				icon: "none",
				title: "纵向滚动 scrollTop 值已被修改为 0"
				})
			}
		}
	}
</script>


<style>
	.swiper {
		height: 500rpx;
	}
	.swiper-item {
		display: block;
		height: 500rpx;
		line-height: 500rpx;
		text-align: center;
	}
	
	.scroll-Y {
			height: 500rpx;
	}
	.scroll-view_H {
			white-space: nowrap;
			width: 100%;
	}
	.scroll-view-item {
			height: 500rpx;
			line-height: 500rpx;
			text-align: center;
			font-size: 36rpx;
	}
	.scroll-view-item_H {
			display: inline-block;
			width: 100%;
			height: 500rpx;
			line-height: 500rpx;
			text-align: center;
			font-size: 36rpx;
	}
</style>
