<template>
	<view id="community">
		<view class="search-bar">
			<uni-search-bar cancelButton="none" v-model="searchValue" @focus="onFocus" @blur="onBlur">
			</uni-search-bar>
		</view>
		<view class="column-container" v-if="searching">
			<view></view>
		</view>
		<com-box-vue></com-box-vue>
		<com-box-vue></com-box-vue>
		<com-box-vue></com-box-vue>
		<com-box-vue></com-box-vue>
		<com-box-vue></com-box-vue>
	</view>
</template>

<script>
	export default {
		components: {
			comBoxVue
		},
		data(){
			return{
				searching: false
			}
		},
		onload() {
			uni.startPullDownRefresh();
		},
		
		onPullDownRefresh(){
			console.log("refresh");
			setTimeout(function() {
				uni.stopPullDownRefresh();
			},1000);
		},
		
		methods: {
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