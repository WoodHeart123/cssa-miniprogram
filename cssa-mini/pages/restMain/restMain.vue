<template>
	<view id="rest-main" class="column-container">
		<view class="row-container search-box">
			<view class="row-container filter-box">
				<view class="setting-icon">
					<view class="icon iconfont">&#xe8c8</view>
				</view>
				<view class="single-filter-box">
					<text>价格:0-20</text>
				</view>
				<view class="single-filter-box">
					<text>评价:无限制</text>
				</view>
			</view>
			<view class="search" @click="toSearch">
				<view class="icon iconfont">&#xe67d</view>
			</view>
		</view>
		<view class="rest-box-container">
			<view class="restaurant column-container">
				<view class="rest-name">
					<text>Fugu Asian Fusion</text>
				</view>
				<view class="address"><text>411 W Gilman St, Madison, WI 53703</text></view>
				<view class="rate-box">
					<view><text>人均消费：$30</text></view>
				</view>
				<view class="rate-box row-container">
					<view><text>推荐指数： </text></view>
					<uni-rate :value="3" allowHalf="true" :size="15" :max="5"></uni-rate>
					<view class="rate-text"><text>3</text></view>
				</view>
				<view  class="footnote"><text>24人参与评论</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
			restBoxVue
		},
		methods: {
			toSearch: function() {
				uni.navigateTo({
					url: "/pages/restMain/restSearch",
					animationType: "pop-in"
				})
			},
		}
	}
	import restBoxVue from '@/components/rest-box/rest-box.vue'
</script>

<style>
	@import '@/static/iconfont/iconfont.css';

	#rest-main {
		width: 100vw;
		height: 100vh;
	}
	.column-container{
		display: flex;
		flex-direction: column;
	}
	.restaurant {
		background-color: white;
		width: 100vw;
		margin: 5px 0 5px 0;
	}
	.rest-name{
		width: calc(100% - 20px);
		font-weight: 700;
		margin: 0 2px 0 10px;
		overflow: hidden;
		text-align: left;
		line-height: 30px;
		font-size: 20px;
	}
	.address{
		height: 23px;
		line-height: 23px;
		width: calc(100% - 20px);
		margin: 0 2px 1px 10px;
		overflow: hidden;
		text-align: left;
		font-size: 12px;
		color:#aaa;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.rate-box{
		margin: 0 10px 2px 10px;
		height: 23px;
		line-height: 23px;
		align-items: center;
		font-size: 14px;
	}
	.rate-text{
		color:#ccc;
		font-size: 12px;
		margin-left:5px;
	}
	.footnote{
		color:#aaa;
		font-size: 12px;
		text-align: right;
		margin-right: 10px;
	}
	.row-container {
		display: flex;
		flex-direction: row;
	}
	.all{
		height: 40px;
		font-size: 18px;
		font-weight: 700;
		line-height: 40px;
		margin-left: 5px;
		width: 200px;
	}
	.search-box{
		height: 30px;
		line-height: 30px;
		padding-left: 5px;
		padding-right: 5px;
		width: 100vw;
		background-color: white;
		-webkit-justify-content: space-between;
		justify-content: space-between;
	}
	.setting-icon{
		left: 0;
		height: 25px;
		width: 30px;
	}
	.single-filter-box{
		border: 0.5px solid #F5F5F5;
		background-color: #F5F5F5;
		margin: 0 7px 0 7px;
		border-radius: 15px;
		padding: 0 8px 0 8px;
		font-size: 14px;
		height: 25px;
		line-height: 25px;
		flex-shrink: 0;
		align-items: center;
	}
	.icon {
		margin-left: 4px;
		font-size: 25px;
	}
	.filter-box{
		height: 30px;
		line-height: 30px;
		padding-top: 2.5px;
		padding-bottom: 2.5px;
		background-color: white;
	}
</style>
