<template>
	<view class='product-box' @click="toSecondDetail">
		<image class='photo' src="../../static/index/maomao.jpg" mode='aspectFill'></image>
		<view class='product-name'>
			<text>A cat 一只猫</text>
		</view>
		<view class='price-condition row-container'>
			<view class='price'><text>$89</text></view> <!-- $+{{product.price}} -->
			<view class='condition'><text>完好如初</text></view>
		</view>
		
		<view class='seller row-container'>
			<image class='avatar' src="../../static/index/maomao.jpg"></image>
			<view class = 'seller-name'><text>路人甲jia</text></view>
			<view class='time'><text>3小时前</text></view>
		</view>
	</view>
</template>

<script>
	export default {
		props:["course"],
		name: "product-box",
		data() {
			return {
	
			}
		},
		methods: {
			toSecondDetail:function(){
				uni.navigateTo({
					url: '/pages/detail/secondDetail',
				});
			}
		}
	}
</script>

<style>
	.row-container {
		display: flex;
		flex-direction: row;

	}

	.product-box {
		background-color: white;
		margin: 2vw;
		width: 45vw;
		height: 40vh;
		border-radius: 10px;
	}

	.photo {
		width: 100%;
		height: 70%;
		border-radius: 10px 10px 0px 0px;
		overflow: hidden;
	}

	.product-name {
		height: 10%;
		font-weight: 600;
		margin-left: 5%;
		margin-right: 5%;
	}

	.price-condition {
		justify-content: space-between;
		height: 10%;
		margin-left: 5%;
		margin-right: 5%;
	}

	.price {
		font-weight: 600;
	}

	.time {
		font-size: 50%;
		text-align: right;
		margin-left: auto;
		padding-top: 5%;
	}

	.condition {

	}

	.seller {
		margin-left: 5%;
		margin-right: 5%;
		height: 10%;
		font-size: 10pt;		
	}
	.avatar {
		width: 20px;
		height: 20px;/*??*/
		border-radius: 50%;
	}
	.seller-name{
		margin-left: 5%;
	}
	
</style>
