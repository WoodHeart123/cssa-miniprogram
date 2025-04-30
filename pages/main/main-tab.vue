<template>
	<view>
		<tab-vue :currentTab="currentTab" @switchTab="switchTab" @midButtonClick="showPopup"></tab-vue>
		<view class='tab-page'>
			<main-vue v-if="currentTab === 1"></main-vue>
			<act-vue v-if="currentTab === 3"></act-vue>
			<user-vue v-if="currentTab === 4"></user-vue>
		</view>
		<uni-popup ref="popup" type="bottom">
			<uni-transition mode-class="['slide-top','zoom-in']">
				<view>
					<view>
						<view>
							<uni-icons type="plusempty"></uni-icons>
							<view><text>发布二手</text></view>
						</view>
						<view>
							<uni-icons type="plusempty"></uni-icons>
							<view><text>发布转租</text></view>
						</view>
					</view>
				</view>
			</uni-transition>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentTab: 1,
				previousTab: 0, 
			};
		},
		methods: {
			switchTab: function(index){
				this.currentTab = index;
			},
		},
		components: {
			tabVue,
			actVue,
			mainVue,
			userVue,
		},
		onShareAppMessage(res) {
			return {
				title: '麦屯小助手',
				path: '/pages/main/main',
			};
		},
		onShareTimeline(res) {
			return {
				title: '麦屯小助手',
				path: '/pages/activity/act',
			};
		},
	}
	import tabVue from '@/components/tab-bar/tab-bar.vue';
	import mainVue from '@/pages/main/main.vue';
	import actVue from '@/pages/activity/act.vue';
	import userVue from '@/pages/user/index.vue'
</script>

<style lang="scss">
.tab-page{
	width: 100vw;
	height: calc(100vh - 75px);
	overflow: hidden;
} 

</style>
