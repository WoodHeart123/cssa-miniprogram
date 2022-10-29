<template>
	<view class="search-product">
		<view class="search-bar">
			<uni-search-bar @confirm="search" :focus="true" v-model="searchValue" @input="input" @cancel="toMain"
				@clear="clear" />
		</view>
		<view class="search-container" v-if="showHistory">
			<view class="history-title">
				<view class="history-text"><span>历史搜索</span></view>
				<view class="clear-text" @click="showModal"><span>清空</span></view>
			</view>
			<view class="history-wrap">
				<view class="history-box" v-for="(history, index) in searchHistory" :key="index">
					<view>
						<span>{{history}}</span>
					</view>
				</view>
			</view>
		</view>
		<scroll-view class="search-container" v-else>

		</scroll-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchValue: "",
				showHistory: true,
				searchHistory: ["电脑", "电脑之家", "电水壶", "电水壶电水壶电水壶", "我也不知道些什么"],
			}
		},
		methods: {
			showModal: function() {
				uni.showModal({
					title: "删除记录",
					content: "是否删除所有历史记录？删除后数据无法恢复",
					confirmColor: "#1684FC",
					success: function(res) {
						var that = this;
						if (res.confirm) {
							that.searchHistory = [];
						}
					}.bind(this)
				});
			},
			toMain() {
				uni.navigateBack();
			},
			clear() {
				this.showHistory = true;
			},
			input(e) {
				if (e.length != 0) {
					this.showHistory = false;
				} else {
					this.showHistory = true;
				}
			},
			search:function(){
				console.log(this.searchValue);
			}
		}
	}
</script>

<style>
	.search-product {
		width: 100vw;
		height: 100vh;
		background: white;
	}

	.search-bar {
		border-bottom: 1px solid #ccc;
		height: 60px;
	}

	.search-container {
		height: calc(100vh - 60px);
		display: flex;
		flex-direction: column;
	}

	.history-title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 10px;
		margin-left: 2vw;
		margin-right: 3vw;
		line-height: 20px;
		height: 30px;
		margin-bottom: 10px;
	}

	.history-text {
		font-weight: 600;
		font-size: 18px;
	}

	.clear-text {
		font-size: 12px;
		color: #888;
	}

	.history-wrap {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.history-box {
		height: 30px;
		background: #f1f1f1;
		padding: 0 15px 0 15px;
		margin: 0 10px 10px 10px;
		font-size: 12px;
		line-height: 30px;
		box-shadow: 3px 2px rgba(233, 233, 233, 0.3);
	}
</style>
