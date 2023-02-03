<template>
	<view id="user-prodcut-box">
		<view class="title-box">
			<text>{{product.title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props:["product"]
		name:"user-product-box",
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	#user-product-box{
		width: 100%;
		height: 100%;
	}

</style>