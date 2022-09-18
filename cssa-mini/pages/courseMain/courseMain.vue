<template>
	<uni-transition ref="main" :show=true customClass="full-screen">
		<view id="course" class="row-container" @touchstart="touchstart" @touchmove="touchmove">
			<view class="menu column-container">
				<uni-indexed-list :options="list" :show-select="false" @click="bindClick"></uni-indexed-list>
			</view>
			<view :class="showMenu?'main-menu-half':'main-content'" class="column-container main-content">
				<view class="row-container top-bar">
					<view class="row-container department-select">
						<uni-transition ref="menuOpen" :show=true>
							<text class='iconfont icon' @click="clickMenu">&#xed55;</text>
						</uni-transition>
					</view>
					<view :class="searching?'search-bar-selected':'search-bar'" class="search-bar">
						<uni-search-bar cancelButton="none" v-model="searchValue" @focus="onFocus" @blur="onBlur">
						</uni-search-bar>
					</view>
				</view>
				<view class="column-container suggest-list" v-if="searching">
					<view></view>
				</view>
				<view class="row-container department">
					<text>Asian Languages and Cultures : Language</text>
				</view>
				<view class="column-container course-list" v-show="!searching">
					<view class="row-container filter-box">
						<view :class="key==0?'filter-selected filter':'filter'" class="row-container"
							@click="changeKey(0)">
							<text>热门课程</text>
						</view>
						<view :class="key==1?'filter-selected filter':'filter'" class="row-container"
							@click="changeKey(1)">
							<text>喜爱</text>
							<text class="iconfont" v-show="key==1&&sort[sortIndex]=='desc'">&#xed58;</text>
							<text class="iconfont" v-show="key==1&&sort[sortIndex]=='asc'">&#xed59;</text>
						</view>
						<view :class="key==2?'filter-selected filter':'filter'" class="row-container"
							@click="changeKey(2)">
							<text>难度</text>
							<text class="iconfont" v-show="key==2&&sort[sortIndex]=='desc'">&#xed58;</text>
							<text class="iconfont" v-show="key==2&&sort[sortIndex]=='asc'">&#xed59;</text>
						</view>
						<view class="filter-button" v-show="key!=-1"><text @click="cancelFilter()">取消筛选</text></view>
					</view>
					<scroll-view scroll-y="true" show-scrollbar="true" refresher-enabled="true"
						class="column-container course-list-box" @scrolltolower="moreCourse"
						refresher-background="white" @refresherrefresh="refresh" enable-back-to-top="true"
						:refresher-triggered="triggered" @refresherpulling="onPulling">
						<view v-for="(course,index) in courseList" :key="index">
							<course-box-vue :course="course" class="box"></course-box-vue>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</uni-transition>
</template>

<script>
	export default {
		components: {
			courseBoxVue
		},
		data() {
			return {
				searchValue: '',
				searching: false,
				showMenu: false,
				startX: 0,
				startY: 0,
				key: -1,
				triggered: false,
				status: "more",
				sort: ["asc", "desc"],
				sortIndex: 0,
				list: [],
				departmentID: 1,
				courseList: []
			}
		},
		onLoad() {
			wx.cloud.init();
			this.onPulling();
		},
		methods: {
			changeKey: function(num) {
				if (this.key == num && (this.key == 1 || this.key == 2)) {
					this.sortIndex = (this.sortIndex + 1) % 2;
				} else if (num == 1) {
					this.sortIndex = 1;
				} else if (num == 2) {
					this.sortIndex = 0;
				}
				this.key = num;
			},
			cancelFilter: function() {
				this.key = -1;
			},
			onFocus: function() {
				this.searching = true;
			},
			onBlur: function() {
				this.searching = false;
			},
			clickMenu: function() {
				if (!this.showMenu) {
					this.$refs.menuOpen.step({
						rotate: '90'
					});
					this.$refs.main.step({
						translateX: '80vw',
					});
					this.$refs.main.run();
					this.$refs.menuOpen.run(() => {
						this.showMenu = true;
					});
				} else {
					this.$refs.menuOpen.step({
						rotate: '0'
					});
					this.$refs.main.step({
						translateX: '0',
					});
					this.$refs.main.run();
					this.$refs.menuOpen.run(() => {
						this.showMenu = false;
					})
				}
			},
			touchstart(e) {
				this.startX = e.touches[0].clientX
				this.startY = e.touches[0].clientY
			},
			touchmove(e) {
				this.moveX = e.touches[0].clientX
				this.moveY = e.touches[0].clientY
				if (Math.abs(this.startY - this.moveY) <= 50 && this.startX - this.moveX <= -100 && !this
					.showMenu) {
					this.clickMenu();
				}
				if (Math.abs(this.startY - this.moveY) <= 50 && this.startX - this.moveX >= 100 && this.showMenu) {
					this.clickMenu();
				}
			},
			moreCourse: function() {
				this.status = "loading"
				setTimeout(() => {
					this.status = "noMore";
				}, 3000)
				console.log("push");
			},
			bindClick(e) {
				console.log(e);
			},
			onPulling() {
				if (!this.triggered) {
					this.triggered = true;
					setTimeout(() => {
						this.triggered = false;
					}, 3000)
				}
			},
			refresh: function() {
				this.getCourseList()
			},
			async getCourseList() {
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9go38k3y9fee3b2e', // 微信云托管的环境ID
					},
					path: "/course/courselist?departmentID=" + this.departmentID,
					method: 'GET', // 按照自己的业务开发，选择对应的方法
					header: {
						'X-WX-SERVICE': 'springboot-f8i8',
					}
				});
				this.courseList = res.data.data;
				this.triggered = false;
			},
			async getDepartmentList() {

			}
		}
	}
	import courseBoxVue from '@/components/course-box/course-box.vue'
</script>

<style>
	@import "@/static/iconfont.css";
	@import "./courseMain.css"
</style>
