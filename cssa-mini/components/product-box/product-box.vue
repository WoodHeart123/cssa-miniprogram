<template>
	<view class='product-box' @click="toSecondDetail">
		<image class='photo' src="../../static/index/maomao.jpg" mode='aspectFill'></image>
		<view class='product-name'>
			<text class='delivery'>邮寄</text>
			<text>&nbspA cat 一只猫一只猫一只猫</text>
		</view>
		<view style='height: 12%;'>
			<text class='description'>一只会喵喵叫的猫。汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪呱呱呱</text>
		</view>
		<view class='row-container' style='justify-content: space-between;height: 10%;align-items: center;'>
			<text class = 'price'>$89.7</text>
			<view class='condition'><text>完好如初</text></view>
		</view>
		<view class='seller row-container'>
			<image class='avatar' src="../../static/index/maomao.jpg"></image>
			<view class = 'seller-name'><text>路人甲jia甲乙丙丁戊己庚辛</text></view>
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
		background-color: rgb(2540,250,250);
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
		height: 10%;
		font-weight: 600;
		font-size: 100%;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space:nowrap;
	}
	
	.description {

		font-size: 12px;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical; 
		color:darkgrey;
	}

	.price {
		font-weight: 600;
		color: #1E90FF;
		font-size: 120%;
	}

	.time {
		font-size: 70%;
		text-align: right;
		margin-left: auto;
		color:darkgrey;
	}

	.condition {
		margin-top: 3%;
		height:20px;
		line-height: 20px;
		padding-left: 3%;
		padding-right: 3%;
		text-align: center;
		font-size: 12px;
		color:#1E90FF;
		border-radius: 5px;
		border-color: #1E90FF;
		border-style: solid;
		border-width: 1pt;

	}

	.seller {
		height: 10%;
		font-size: 10pt;
		align-items: center;

	}
	
	.avatar {
		width: 20px;
		height: 20px;/*??*/
		border-radius: 50%;
	}
	
	.seller-name{
		margin-left: 5%;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		width: 60%;
		font-size: 80%;
		color: darkgrey;
	}
	
	.delivery {
		background-color: #4169E1;
		color: white;
		padding-left: 3%;
		padding-right: 3%;
		padding-top: 1%;
		padding-bottom: 1%;
		border-radius: 5px;
		font-size: 12px;
	}
	
</style>
