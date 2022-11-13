<template>
	<view class="second-main-search">
		<view class="search-bar">
			<uni-search-bar v-model="searchValue" placeholder="搜索商品" focus="true" @focus="onFocus"
				@input="searchBarInput" @confirm="onConfirm" @cancel="onCancel">
			</uni-search-bar>
		</view>
		<view class="history-section" v-show="historyList.length!=0&&!searching&&!showResult">
			<view class="row-container history-text">
				<text id="history">历史搜索</text>
				<text id="clear" v-show="historyList.length!=0">清除</text>
			</view>
			<view class="row-container history-box-container">
				<view class="history-box" v-for="(history,index) in historyList">
					<text>{{history}}</text>
				</view>
			</view>
		</view>
		<view v-show="searching&&!showResult"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchValue: "",
				historyList: ["", ""],
				searching: false,
				showResult: false,
			}
		},
		onLoad() {
			this.historyList = uni.getStorageSync("historyList");
			if (!this.historyList) {
				this.historyList = ["吹风机", "笔记本"];
				uni.setStorageSync("historyList", []);
			}
			console.log(this.historyList);
		},
		methods: {
			onCancel: function() {
				uni.navigateBack()
			},
			searchBarInput: function(e) {
				console.log(e.length);
				if (e.length == 0) {
					this.searching = false;
				} else {
					this.searching = true;
				}
			}
		}
	}
</script>

<style>
	.second-main-search {
		width: 100vw;
		height: 100vh;
		background: white;
	}

	.row-container {
		display: flex;
		flex-direction: row;
	}

	.search-bar {
		width: 100vw;
		height: 50px;
		background: white;
	}

	.history-section {
		padding-top: 10px;
		height: calc(100vh - 60px);
		background: white;
	}

	.history-text {
		height: 30px;
		width: 90vw;
		margin-left: 5vw;
		justify-content: space-between;
		align-items: center;
	}

	#history {
		font-size: 15px;
		font-weight: 600;
	}

	#clear {
		font-size: 13px;
		color: #ccc;
	}

	.history-box-container {
		flex-wrap: wrap;
		width: 90vw;
		margin-left: 5vw;

	}

	.history-box {
		padding: 8px 15px 8px 15px;
		font-size: 13px;
		background-color: #f4f4f4;
		color: #333;
		margin: 8px;
	}
</style>
