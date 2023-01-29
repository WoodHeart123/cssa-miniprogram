<template>
	<view id="rental-main">
		<view class="menu row-container">
			<!-- <view class="search-box" @click="toSearch">
				<uni-icons type="search" size="30"></uni-icons>
			</view> -->
			<view class="menu-box row-container">
				<view class="row-container rental-selection">
					<text @click="clickMenu(0)" :class="{selected:menuIndex==0}">转租</text>
					<text>/</text>
					<text @click="clickMenu(1)" :class="{selected:menuIndex==1}">找室友</text>
				</view>
			</view>
		</view>
		<view class="row-container filter-box">
			<view class="setting-icon">
				<uni-icons type="settings-filled" size="30"></uni-icons>
			</view>

			<view id="price-filter-item" class="row-container filter-item" @click="popFilter('price')">
				<view class="filter-tag">价格：</view>
				<view class="filter-value">{{this.filter.priceLimit==10000?"无上限":"0 - " + this.filter.priceLimit}}
				</view>
			</view>
			<view class="row-container filter-item">
				<view class="filter-tag">时间：</view>
				<view class="filter-value">{{this.filter.startTime==-1?"不限":this.priceLimit}}</view>
			</view>
			<view class="row-container filter-item">
				<view class="filter-tag">户型：</view>
				<view class="filter-value">
					{{this.selectedFloorplan.length==this.floorplanList.length?"不限":this.selectedFloorplan.join("；")}}
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" show-scrollbar="true" refresher-enabled="true"
			class="column-container comment-container" refresher-background="white" @refresherrefresh="refresh"
			enable-back-to-top="true" :refresher-triggered="triggered" @scrolltolower="onScrollLower">
		</scroll-view>
		<uni-fab :pattern="pattern" horizontal="right" vertical="bottom" popMene="false" @fabClick="toPostRental" />
		<uni-popup ref="filter" type="bottom" background-color="#fff">
			<view class="column-container filter-popup">
				<view class="top-bar">
					<view class="close-text">关闭</view>
				</view>
				<view class="pop-sub-title">价格</view>
				<view class="row-container price-filter-pop">
					<view class="price-slider">
						<slider :value="this.filter.priceLimit" min="0" max="10000" step="100" block-size="15"
							@change="priceLimitChange" @changing="priceLimitChange" />
					</view>
					<view class="price-input">
						<uni-easyinput v-model="this.filter.priceLimit" clearable="false" clearSize="0" type="number">
						</uni-easyinput>
					</view>
				</view>
				<view class="pop-sub-title">时间</view>
				<view class="time-picker">
					<view>
						<text>开启时间筛选</text>
						<switch @change="switchTimePicker" style="transform:scale(0.7)"/>
					</view>
					<uni-datetime-picker v-model="this.filter.time" type="daterange" :start="start" :end="end"
						:clear-icon=false />
				</view>
				<view class="pop-sub-title">户型</view>
				<view class="floorplan-filter-pop">
					<view class="floorplan-tag" v-for="(floorplan,index) in floorplanList" :key='index'>
						<uni-tag v-show="this.selectedFloorplan.indexOf(floorplan)==-1" :text="floorplan"
							@click="select(floorplan)"></uni-tag>
						<uni-tag v-show="this.selectedFloorplan.indexOf(floorplan)!=-1" type='primary' :text="floorplan"
							@click="remove(floorplan)"></uni-tag>
					</view>
					<view class="all-floorplan-tag"
						v-show="this.selectedFloorplan.length==this.floorplanList.length||this.selectedFloorplan.length==0"
						@click="clickAll">
						{{this.selectedFloorplan.length==0?"选中全部":"取消全部"}}
					</view>
				</view>

			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menuIndex: 0,
				filter: {
					priceLimit: 10000,
					time: [Date.now(), Date.now() + 2592000],
					floorplan: "none",
				},
				floorplanList: ['Studio', '1B1B', '2B1B', '2B2B', '3B2B', '3B3B', '4B2B', "4B3B", "其他"],
				selectedFloorplan: ['Studio', '1B1B', '2B1B', '2B2B', '3B2B', '3B3B', '4B2B', "4B3B", "其他"],
				start: Date.now(),
				end: Date.now() + 10000000000,
				timeFilter:false,
			}
		},
		methods: {
			clickMenu: function(e) {
				this.menuIndex = e;
			},
			toPostRental: function() {
				uni.navigateTo({
					url: "/pages/rental/rentalPost",
				})
			},
			popFilter: function(e) {
				if (e == 'price') {
					this.$refs.filter.open();
				}
			},
			priceLimitChange: function(e) {
				this.filter.priceLimit = e.detail.value;
			},
			clickAll: function() {
				if (this.selectedFloorplan.length == 0) {
					this.selectedFloorplan = Array.from(this.floorplanList);
				} else {
					this.selectedFloorplan = [];
				}
			},
			remove: function(floorplan) {
				this.selectedFloorplan.splice(this.selectedFloorplan.indexOf(floorplan), 1);
			},
			select: function(floorplan) {
				this.selectedFloorplan.push(floorplan);
			}
		}
	}
</script>

<style>
	#rental-main {
		position: absolute;
		width: 100vw;
		height: 100vh;
		top: 0;
	}

	.column-container {
		display: flex;
		flex-direction: column;
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
	}

	.menu-scroll {
		padding-bottom: 0;
	}

	.menu-box {
		width: 100vw;
		overflow-x: scroll;
		height: 50px;
		-ms-overflow-style: none;
		scrollbar-width: none;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
	}

	.rental-selection {
		margin-bottom: 3px;
		width: 40%;
		align-items: center;
		justify-content: space-around;
		flex-shrink: 0;
		font-size: 20px;
		color: rgba(22, 132, 253, 0.4);
	}

	.selected {
		font-size: 21px;
		transition: all 0.5s;
		font-weight: 700;
		color: #1684FC;
	}

	.filter-box {
		padding-top: 2px;
		position: relative;
		margin-top: 50px;
		height: 42px;
		width: 100%;
		overflow-y: scroll;
		align-items: center;
		background-color: rgba(255, 255, 255, 0.9);
		box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 5px;
		box-sizing: border-box;
		flex-shrink: 0 !important;
	}

	.right-arrow-box {
		position: absolute;
		right: 0;
		width: 30px;
		height: 30px;
	}

	.filter-item {
		border: 0.5px solid rgb(111, 111, 111, 0.2);
		background-color: rgba(22, 132, 253, 0.05);
		margin: 0 7px 0 7px;
		border-radius: 15px;
		padding: 0 8px 0 8px;
		font-size: 14px;
		height: 25px;
		line-height: 25px;
		flex-shrink: 0;
	}

	#price-filter-item {
		margin-left: 35px;
	}

	.tag {
		color: #aaa;
	}

	.filter-tag {
		color: #444;
	}

	.setting-icon {
		position: absolute;
		left: 0;
		width: 30px;
	}

	.filter-popup {
		width: 100vw;
		height: 80vh;
	}

	.top-bar {
		height: 10vh;
		margin: 10px 0 0 70vw;

	}

	.price-filter-pop {
		width: 90vw;
		margin-left: 5vw;
	}

	.price-slider {
		width: 80%;
	}

	.price-input {
		width: 20%;
	}

	.time-picker {
		width: 80%;
		margin-left: 10%;
		margin-bottom: 20px;
	}

	.pop-sub-title {
		font-weight: 600;
		font-size: 15px;
		margin-left: 5vw;
		margin-bottom: 20px;
	}

	.floorplan-tag {
		margin: 0 5px 5px 5px;
		height: 30px;
		box-sizing: border-box;
	}

	.floorplan-filter-pop {
		display: flex;
		flex-wrap: wrap;
		height: fit-content;
		width: 80vw;
		margin-left: 10vw;
	}

	.all-floorplan-tag {
		font-size: 10px;
		color: blue;
		line-height: 25px;
		margin-left: 2px;
	}
</style>
