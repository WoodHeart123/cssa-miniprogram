<template>
	<view class='product-box' @click="toSecondDetail">
		<image class='photo' :src="product.images[0]" mode='aspectFill' lazy-load="true"></image>
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
			<view class='time'><text>{{this.productPublishTime}}</text></view>
		</view>
	</view>
</template>

<script>
	import moment from "moment/min/moment-with-locales";
	import 'moment/locale/zh-cn';
	export default {
		props: ["product"],
		name: "product-box",
		data() {
			return {
				condition: {"NEW":'全新', "ALMOST_NEW":'几乎全新', 'USED':'明显使用痕迹', "IMPAIRED":'部分损毁'},
				delivery: {
					'pickup': '自取',
					'deliver': '送货',
					'all': '送/取',
				},
				productPublishTime:""
			}
		},
		mounted(){
			if(moment().year() - moment.utc(this.product.UTCtime).year() > 0){
				this.productPublishTime = moment.utc(this.product.UTCtime).format("YYYY-MM-DD");
			}else if(Date.now() - moment.utc(this.product.UTCtime).valueOf() > 86400000 * 7){
				this.productPublishTime = moment.utc(this.product.UTCtime).format("MM-DD");
			}else{
				this.productPublishTime = moment.utc(this.product.UTCtime).locale('zh-cn').fromNow();
			}
		},
		methods: {
			toSecondDetail: function() {
				uni.navigateTo({
					url: '/pages/detail/secondDetail?product=' + encodeURIComponent(JSON.stringify(this.product)),
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
		width: 40px;
		font-size: 10px;
		color: darkgrey;
		height: 12px;
	}

	.delivery {
		position: absolute;
		justify-content: center;
		align-items: center;
		background-color: #9b0000;
		color: white;
		border-radius: 5px;
		font-size: 12px;
		height: 20px;
		width: 40px;
		margin-right: 5px;
	}
</style>
