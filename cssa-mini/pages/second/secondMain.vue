<template>
	<view>
		<view class="menu row-container">
			<view class="search-box">
				<uni-icons type="search" size="30"></uni-icons>
			</view>
			<view class="menu-box row-container">
				<view class="row-container product-type-item" v-for="(productType, index) in productTypeList"
					:key="index" @click="onClickMenu(index)">
					<text
						:class="currentIndex==index?'product-text selected':'product-text'">{{productType.name}}</text>
				</view>
			</view>
		</view>
		<view></view>
	</view>
	<scroll-view scroll-y="true" show-scrollbar="true" refresher-enabled="true"
		class="column-container comment-container" @scrolltolower="">
		<view class="box">
			<productBoxVue></productBoxVue>
			<productBoxVue></productBoxVue>
			<productBoxVue></productBoxVue>
			<productBoxVue></productBoxVue>
			<productBoxVue></productBoxVue>
			<productBoxVue></productBoxVue>
			<productBoxVue></productBoxVue>
			<productBoxVue></productBoxVue>
			<productBoxVue></productBoxVue>
			<productBoxVue></productBoxVue>
			<productBoxVue></productBoxVue>
		</view>
		<uni-load-more status="more"></uni-load-more>
	</scroll-view>
</template>

<script>
	export default {
		components: {
			productBoxVue
		},
		data() {
			return {
				productTypeList: productTypeList,
				currentIndex: 0,
			}
		},
		methods: {
			onClickMenu: function(index) {
				this.currentIndex = index;
			},
		}
	}
	import productTypeList from './secondMain.js';
	import productBoxVue from '@/components/product-box/product-box.vue';
</script>

<style>
	.column-container {
		display: flex;
	}

	.row-container {
		display: flex;
		flex-direction: row;
	}

	.menu {
		position: fixed;
		width: 100vw;
		height: 50px;
		align-items: center;
		background-color: white;
		padding-bottom: 10px;
		transition: all 1s;
	}

	.menu-scroll {
		padding-bottom: 0;
	}

	.search-box {
		margin-left: 5px;
		width: 30px;
	}

	.menu-box {
		width: calc(100vw - 35px);
		overflow-x: scroll;
		height: 50px;
		-ms-overflow-style: none;
		scrollbar-width: none;
		flex-shrink: 0;
	}

	.product-type-item {
		margin-left: 10px;
		height: 100%;
		align-items: center;
		justify-content: center;
		width: fit-content;
		flex-shrink: 0;
	}

	.product-text {
		font-size: 15px;
		color: #aaa;
		margin-right: 10px;
	}

	.selected {
		font-size: 18px;
		font-weight: 700;
		color: black;
	}

	.menu-box::-webkit-scrollbar {
		display: none;
	}

	.container {
		display: flex;
		height: 500px;
		width: 80vw;

	}

	.box {
		display: flex;
		display: -webkit-flex;
		justify-content: left;
		flex-direction: row;
		flex-wrap: wrap;
		margin-left: 1vw;
	}
</style>
