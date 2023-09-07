<template>
	<view class="second-main-search">
		<view class="search-bar">
			<uni-search-bar v-model="searchValue" placeholder="搜索商品" focus="true" @focus="onFocus"
				@input="searchBarInput" @confirm="onConfirm" @cancel="onCancel">
			</uni-search-bar>
		</view>
		<view class="history-section" v-if="historyList.length!=0&&!searching&&!showResult">
			<view class="row-container history-text">
				<text id="history">历史搜索</text>
				<text id="clear" v-show="historyList.length!=0" @click="clearHistoryList">清除</text>
			</view>
			<view class="row-container history-box-container">
				<view class="history-box" v-for="(history,index) in historyList" @click="onClickHistory(index)">
					<text>{{history}}</text>
				</view>
			</view>
		</view>
		<view class="suggest-section" v-if="!showResult">
			<view class="suggest-item" v-for="(suggest,index) in suggestList" @click="confirm(suggest)">
				{{suggest}}
			</view>
		</view>

		<scroll-view scroll-y="true" show-scrollbar="true" refresher-enabled="true" class="result-scroll"
			refresher-background="white" @refresherrefresh="refresh" :refresher-triggered="triggered"
			@scrolltolower="onScrollLower" v-show="showResult">
			<view class="result-section">
				<view v-for="(product,index) in resultList">
					<productBoxVue :product="product"></productBoxVue>
				</view>
			</view>
			<uni-load-more :status="status" color="#9b0000"></uni-load-more>
		</scroll-view>

		<uni-load-more v-show="showLoading" :status="status" color="#9b0000"></uni-load-more>
	</view>
</template>

<script>
	export default {
		components: {
			productBoxVue,
		},
		data() {
			return {
				searchValue: "",
				historyList: [],
				searching: false,
				showResult: false,
				suggestList: [],
				resultList: [],
				status: "more",
				showLoading: false,
				limit: 20,
				offset: 0,
				hide: false,
				triggered:false,
			}
		},
		onHide() {
			this.hide = true;
		},
		onLoad() {
			wx.cloud.init();
			this.historyList = uni.getStorageSync("historyList");
			if (!this.historyList) {
				uni.setStorageSync("historyList", []);
			}
		},
		methods: {
			onFocus: function() {
				if (!this.hide) {
					this.showResult = false;
				}
			},
			onCancel: function() {
				uni.navigateBack()
			},
			searchBarInput: function(e) {
				console.log(e)
				clearTimeout(this.timer);
				if (e.length == 0) {
					this.searching = false;
				} else {
					this.searching = true;
					this.timer = setTimeout(() => {
						this.suggestList = [];
						this.suggest(e);
					}, 200);
				}
			},
			suggest: async function(value) {
				this.status = "loading";
				this.showLoading = true;
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9gip97mx4bfa32a3',
					},
					path: "/secondhand/suggest?value=" + encodeURIComponent(value),
					method: 'GET',
					header: {
						'X-WX-SERVICE': 'springboot-ds71',
					}
				});
				if (res.data.status && res.data.status == 100) {
					this.suggestList = res.data.data;
				} else {
					uni.showModal({
						content: "搜索服务暂时不可用"
					})
				}
				this.showLoading = false;
			},
			confirm: function(value) {
				this.searchValue = value;
				this.refresh();
			},
			getSearchList: async function() {
				
				this.status = "loading";
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9gip97mx4bfa32a3',
					},
					path: `/secondhand/search?value=${encodeURIComponent(this.searchValue)}&limit=${this.limit}&offset=${this.offset}`,
					method: 'GET',
					header: {
						'X-WX-SERVICE': 'springboot-ds71',
					}
				});
				if (res.data.status && res.data.status == 100) {
					this.resultList = res.data.data;
					if (res.data.data.length != this.limit) {
						this.status = "noMore"
					} else {
						this.status = "more";
						this.offset += 20;
					}
				} else if(res.data.status && res.data.status == 124){
					this.status = "noMore"
					uni.showToast({
						title:"暂时无法搜索到相关二手"
					})
				}else{
					uni.showModal({
						content: "搜索服务暂时不可用",
						success: function(res) {
							if (res.confirm) {
								uni.navigateBack();
							}
						}
					})
				}
				this.$nextTick(() => {
					this.triggered = false;
				});
			},
			onScrollLower: function() {
				if(this.status != "noMore"){
					this.getSearchList()
				}
			},
			refresh:function(){
				this.showResult = true;
				this.offset = 0;
				this.limit = 20;
				this.triggered = true;
				this.getSearchList();
			},
			onConfirm: async function() {
				if (this.historyList.indexOf(this.searchValue) == -1) {
					this.historyList.push(this.searchValue);
					uni.setStorage({
						key: "historyList",
						data: this.historyList
					});
				}
				this.refresh();
			},
			onClickHistory: function(index) {
				this.searchValue = this.historyList[index];
				this.refresh();
			},
			clearHistoryList: function(index) {
				uni.showModal({
					content: "是否确认删除历史信息，数据不可恢复",
					success: function(res) {
						console.log(res)
						if (res.confirm) {
							this.historyList = [];
							uni.setStorageSync("historyList", []);
						}
					}
				})
			}
		}
	}
	import productBoxVue from '@/components/product-box/product-box.vue';
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

	.suggest-item {
		height: 40px;
		font-size: 14px;
		width: 95vw;
		padding-left: 5vw;
		line-height: 40px;
		border-bottom: 1px solid #f1f1f1;
	}

	.suggest-section {}

	.result-section {
		display: flex;
		justify-content: left;
		flex-direction: row;
		flex-wrap: wrap;
		width: 100%;
	}
	.result-scroll{
		width: 100vw;
		height: calc(100vh - 50px);
	}
</style>
