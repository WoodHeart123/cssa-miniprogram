<template>
	<view id="main-advertisement">
		<uni-swiper-dot class="uni-swiper-dot-box" v-bind:info="images" :current="current" mode="dot"
			field="content">
			<swiper class="swiper-box" @change="change" :current="current">
				<swiper-item v-for="(image, index) in images" :key="index">
					<img class='swiper-image' :src="image" @click="toPreview" />
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
	</view>
</template>

<script>
	export default {
		name:"main-advertisement",
		props:["height", "width"],
		data() {
			return {
				images:[
					"https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-main/cssa3.png"
				],
				detailImages:[
					"https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-main/cssa1-detail.jpg"
				],
				current: 0,
			};
		},
		onLoad(){
			setInterval(() => {
				this.current = (this.current + 1) % this.images.length;
			}, 10000);
		},
		methods:{
			change: function(e) {
				this.current = e.detail.current;
			},
			toPreview:function(){
				wx.previewImage({
					current:this.detailImages[this.current],
					urls:this.detailImages
				});
			},
		}
	}
</script>

<style lang="scss">
	$swiper_height: v-bind(height);
	$swiper_width: v-bind(width);
	#main-advertisement{
		height:$swiper_height;
		width: $swiper_width;
	}
	.uni-swiper-dot-box {
		height: $swiper_height;
		width: $swiper_width;
	}

	.swiper-box {
		width: 100%;
		height: $swiper_height;
		background-color: transparent;
		border-radius: 20px;
		box-shadow: 0 0 5px rgba(165, 165, 165, 0.2);
	}
	.uni-swiper__warp{
		overflow: visible !important;
	}
	.swiper-image {
		width: 100%;
		height: 100%;
		border-radius: 20px !important;
	}
</style>