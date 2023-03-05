<template>
	<view>
		<uni-swipe-action>
			<uni-swipe-action-item @click="bindClick">
				<view class='product-box' @click="toSecondDetail">
					<image class='photo' :src="product.images[0]" mode='aspectFill'></image>
					<view class='row-container product-name-box'>
						<view class='row-container delivery'>
							<text>{{this.delivery[product.delivery]}}</text>
						</view>
						<view class="product-name">
							<text>{{product.productTitle}}</text>
						</view>
					</view>
					<view class='row-container'
						style='justify-content: space-between;height: 10%;align-items: center;margin-top: 3px;'>
						<text class='price'>{{'$' + product.price}}</text>
						<view class='condition'><text>{{this.condition[product.productCondition]}}</text></view>
					</view>
					<view class='seller row-container'>
						<image class='avatar' :src="'https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/' + this.product.sellerAvatar + '.jpg'"></image>
						<view class='seller-name'><text>{{product.sellerNickname}}</text></view>
						<view class='time'><text>3小时前</text></view>
					</view>
				</view>
				<template v-slot:right>
					<view @click="bindClick()" class="slot-button"><text>删除</text></view>
				</template>
			</uni-swipe-action-item>
		</uni-swipe-action>
	</view>
</template>

<script>
	export default {
		props:['product'],
		data(){
			return{
				condition: ['全新','几乎全新', '明显使用痕迹','部分损毁' ],
				delivery: {
					'pickup': '自取',
					'deliver': '送货',
					'all': '送/取',
				},
		
			}
		},
		
		methods:{
			bindClick(){
				console.log(this.product.productID);
				this.$emit("delete", this.product.productID);
				uni.showToast({
					title: '已删除'
				});
			}
		}
		
	}
</script>

<style>
	.slot-button {
		display: flex;
		flex-direction: row;
		margin-top: 2vw;
		margin-bottom: 2vw;
		justify-content: center;
		align-items: center;
		padding: 0 20px;
		background-color: #9b0000;
	}
	.row-container {
		display: flex;
		flex-direction: row;
	
	}
	
	.product-box {
		background-color: white;
		margin: 2vw;
		/* 		height: 40vh; */
		position: relative;
	}
	
	.photo {
		width: 100%;
		height: 144px;
		overflow: hidden;
	}
	
	.product-name-box {
		height: 40px;
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
	
	.product-name::before {
		margin-left: 45px;
		content: '';
	}
	
	.price {
		margin-left: 10px;
		font-weight: 600;
		height: 10%;
		color: #9b0000;
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
		color: #9b0000;
		border-radius: 5px;
		border-color: #9b0000;
		border-style: solid;
		border-width: 1pt;
	}
	
	.seller {
		height: 24px;
		font-size: 15px;
		align-items: center;
		margin-top: 3px;
	}
	
	.avatar {
		width: 20px;
		height: 20px;
		border-radius: 50%;
	}
	
	.seller-name {
		margin-left: 5px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 101px;
		font-size: 12px;
		color: darkgrey;
	}
	
	.delivery {
		position: absolute;
		justify-content: center;
		align-items: center;
		background-color: #9b0000;
		color: #F5F5F5;
		border-radius: 5px;
		font-size: 12px;
		height: 20px;
		width: 40px;
		margin-right: 5px;
	}
</style>