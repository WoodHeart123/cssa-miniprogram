<template>
	<view id="community">
		<view class="search-bar">
			<uni-search-bar cancelButton="none" v-model="searchValue" @focus="onFocus" @blur="onBlur">
			</uni-search-bar>
		</view>
		<!--
		<view class="column-container" v-if="searching">
			<view></view>
		</view>
		-->
		<view class="boxes" v-for="(comDetail, index) in comDetailList">
			<com-box-vue :comDetail="comDetail"></com-box-vue>
		</view>
		<view class="post">
			<uni-fab :pattern="pattern" horizontal="right" vertical="bottom"/>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
			comBoxVue
		},
		data(){
			return{
				searching: false,
				pattern: {
							buttonColor: '#007AFF',
							iconColor: '#fff'
						},
				comDetailList:[
					{
						title: 有没有周末推荐去玩的地方吗,
						name: Jucy,
						content:"Madison周围都有什么好玩的呢，有谁推荐一下吗，如果有推荐可以联系我：123456789. 大家可以一起玩，开心最重要了",
						shrinkContent:"",
						imageUrls:["../../static/renwu.jpeg","../../static/renwu.jpeg","../../static/renwu.jpeg","../../static/renwu.jpeg","../../static/renwu.jpeg","../../static/renwu.jpeg"],
						imageNum:0
					},
					{
						title: 有没有周末推荐去玩的地方吗,
						name: Jucy,
						content:"Madison周围都有什么好玩的呢，有谁推荐一下吗，如果有推荐可以联系我：123456789. 大家可以一起玩，开心最重要了",
						shrinkContent:"",
						imageUrls:["../../static/renwu.jpeg","../../static/renwu.jpeg","../../static/renwu.jpeg","../../static/renwu.jpeg","../../static/renwu.jpeg","../../static/renwu.jpeg"],
						imageNum:0
					}
				]
				
			}
		},
		onload() {
			this.init();
			uni.startPullDownRefresh();
		},
		
		onPullDownRefresh(){
			console.log("refresh");
			this.init();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			},1000);
		},
		
		onReachBottom(){
			console.log("...");
			this.loadMore();
			this.init();
			uni.showNavigationBarLoading()
			setTimeout(function(){
				uni.hideNavigationBarLoading();
			}, 1000);
		}
		
		methods: {
			init: function() {
				console.log("开始加载");
			},
			loadMore: function() {
				console.log("加载更多");
			}
			onFocus: function() {
				this.searching = true;
				console.log(this.searching);
			},
			onBlur: function() {
				this.searching = false;
			},
		}
	}
	import comBoxVue from "@/components/com-box/com-box.vue"
</script>

<style>
	.search-bar {
		height: 10vh;
		background-color: white;
	}
	
	.column-container {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}
</style>