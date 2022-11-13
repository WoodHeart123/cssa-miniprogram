<template>
	<view class='product-box' @click="toSecondDetail">
		<image class='photo' src="../../static/index/maomao.jpg" mode='aspectFill'></image>
		<view class='row-container product-name-box'>
			<view class='row-container delivery'>
				<text>邮寄</text>
			</view>
			<view class="product-name">
				<text>一只猫一只猫一只猫一只猫一只猫一只猫一只猫一只猫一只猫</text>
			</view>
		</view>
		<!-- 		<view style='height: 30px;'>
			<text class='description'>一只会喵喵叫的猫。汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪呱呱呱</text>
		</view> -->
		<view class='row-container' style='justify-content: space-between;height: 10%;align-items: center;margin-top: 3px;'>
			<text class='price'>$89.7</text>
			<view class='condition'><text>完好如初</text></view>
		</view>
		<view class='seller row-container'>
			<image class='avatar' src="../../static/index/maomao.jpg"></image>
			<view class='seller-name'><text>路人甲jia甲乙丙丁戊己庚辛</text></view>
			<view class='time'><text>3小时前</text></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ["course"],
		name: "product-box",
		data() {
			return {

			}
		},
		methods: {
			toSecondDetail: function() {
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
		/* 		height: 40vh; */
		border-radius: 10px;
		position: relative;
	}

	.photo {
		width: 100%;
		height: 144px;
		border-radius: 10px 10px 0px 0px;
		overflow: hidden;
	}

	.product-name-box {
		height: 48px;
		width: 100%;
		flex-shrink: 0;
		overflow: hidden;
		white-space: normal;
	}

	.product-name {
		height: 40px;
		font-size: 12px;
		line-height: 20px;
		white-space: normal;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.product-name::before{
		margin-left: 45px;
		content: '';
	}

	.price {
		font-weight: 600;
		height: 10%;
		color: darkblue;
	}

	.time {
		font-size: 10px;
		text-align: right;
		margin-left: auto;
		color: darkgrey;
		height: 12px;
	}

	.condition {
		margin-top: 2%;
		height: 20px;
		line-height: 20px;
		padding-left: 3%;
		padding-right: 3%;
		text-align: center;
		font-size: 10px;
		color: #1E90FF;
		border-radius: 5px;
		border-color: #1E90FF;
		border-style: solid;
		border-width: 1pt;
	}

	.seller {
		height: 24px;
		font-size: 20px;
		align-items: center;
		margin-top: 3px;
	}

	.avatar {
		width: 20px;
		height: 20px;
		border-radius: 50%;
	}

	.seller-name {
		margin-left: 5%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 101px;
		font-size: 10px;
		color: darkgrey;
		height: 12px;
	}

	.delivery {
		position: absolute;
		justify-content: center;
		align-items: center;
		background-color: #4169E1;
		color: white;
		border-radius: 5px;
		font-size: 12px;
		height: 20px;
		width: 40px;
		margin-right: 5px;
	}
</style>
