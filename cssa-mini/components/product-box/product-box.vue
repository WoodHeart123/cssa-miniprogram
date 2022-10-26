<template>
	<view class='product-box' @click="toSecondDetail">
		<view class='condition'><text>完好如初</text></view>
		<image class='photo' src="../../static/index/maomao.jpg" mode='aspectFill'></image>
		<view class='product-name'>
			<text>A cat 一只猫</text>
		</view>
		<view class='description'>
			<text>一只会喵喵叫的猫。汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪呱呱呱</text>
		</view>
		
			<view class='price'><text>$89</text></view> <!-- $+{{product.price}} -->
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
		height: 60%;
		border-radius: 10px 10px 0px 0px;
		overflow: hidden;
	}

	.product-name {
		height: 8%;
		font-weight: 600;
		margin-left: 5%;
		margin-right: 5%;
	}
	
	.description {
		height: 12%;
		font-size: 80%;
		margin-left: 5%;
		margin-right: 5%;
		overflow: hidden;
	}

	.price {
		font-weight: 600;
		height: 10%;
		margin-left: 5%;
		margin-right: 5%;
		color: darkblue;
	}

	.time {
		font-size: 50%;
		text-align: right;
		margin-left: auto;
		padding-top: 5%;
	}

	.condition {
		position:fixed;
		margin-left: 25%;/*...*/
		padding-left: 2%;
		padding-right: 2%;
		padding-top: 0.5%;
		padding-bottom: 0.5%;
		margin-top: 40%;
		background-color: black;
		opacity: 0.45;
		color: white;
		border-radius: 5px 5px 5px 5px;
		font-size: 10pt;

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
