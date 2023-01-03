<template>
	<view id="user-prodcut-box">
		<view class="title-box">
			<text>{{product.title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"user-product-box",
		props:["product"],
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