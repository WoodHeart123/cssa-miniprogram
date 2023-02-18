<template>
	<view id="user-prodcut-box" class="row-container">
		<view>
			<image :src="product.images[0]"></image>
		</view>
		<view>
			<view class="title-box">
				<text>{{product.title}}</text>
			</view>
			<view class="price-box">
				<text>{{product.price}}</text>
			</view>
			<view>
				<text>降价</text>
				<text>修改</text>
				<text>下架</text>
				<text>擦亮</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ["product"]
		name: "user-product-box",
		data() {
			return {

			};
		}
	}
</script>

<style>
	#user-product-box {
		width: 100%;
		height: 100%;
	}

	.row-container {
		display: flex;
		flex-direction: row;
	}
</style>
