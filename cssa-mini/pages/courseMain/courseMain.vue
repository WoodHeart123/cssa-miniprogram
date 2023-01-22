<template>
	<uni-transition ref="main" :show=true customClass="full-screen">
		<view id="course" class="row-container" @touchstart="touchstart" @touchmove="touchmove">
			<view class="menu column-container">
				<uni-indexed-list :options="departmentList" :show-select=false @click="bindClick"></uni-indexed-list>
			</view>

			<view class="overlay" v-show="showMenu"></view>
			<view class="column-container suggest-list" v-if="searching">
				<uni-load-more v-show="searchStatus!='more'" :status="searchStatus" :contentText="searchContentText">
				</uni-load-more>
				<view class="row-container suggest-box" v-for="(course, index) in suggestList" :key="index"
					@click="toCourse(course)">
					<view class="suggest-box-course-num">
						{{course.departmentAbrev + " " + String(course.courseNum) + " "}}
					</view>
					<view class="suggest-box-course-name">{{course.courseName}}</view>
				</view>
			</view>
			<view class="row-container top-bar">
				<view class="row-container department-select" v-show="!searching">
					<uni-transition ref="menuOpen" :show=true>
						<text class="iconfont icon" @click="clickMenu">&#xed55;</text>
					</uni-transition>
				</view>
				<view class="row-container department" v-show="!searching">
					<text>{{departmentName}}</text>
				</view>
				<view class="row-container search-select" v-show="!searching">
					<uni-icons type="search" size="30" color="#1684FC" v-show="!searching" @click="onSearch"></uni-icons>
				</view>
				<view class="search-bar" v-show="searching">
					<uni-search-bar v-model="searchValue" cancelButton="auto" placeholder="搜索课程" clearButton="none" :focus="searching"
						@focus="onFocus" @input="searchBarInput" @confirm="searchBarInput" @cancel="onCancel">
					</uni-search-bar>
				</view>
			</view>
			<scroll-view scroll-y="true" show-scrollbar="true" refresher-enabled="true"
				class="column-container course-list-box" refresher-background="white" @refresherrefresh="refresh"
				enable-back-to-top="true" :refresher-triggered="triggered" @refresherabort="refreshRestore"
				@scrolltolower="onScrollLower">
				
				<view class="row-container filter-box">
					<view :class="key==0?'filter-selected filter':'filter'" class="row-container" @click="changeKey(0)">
						<text>课号</text>
					</view>
					<view :class="key==1?'filter-selected filter':'filter'" class="row-container" @click="changeKey(1)">
						<text>热门课程</text>
					</view>
					<view :class="key==4?'filter-selected filter':'filter'" class="row-container" @click="changeKey(4)">
						<text>推荐</text>
						<text class="iconfont" v-show="key==4&&sortIndex==4">&#xed58;</text>
						<text class="iconfont" v-show="key==4&&sortIndex==5">&#xed59;</text>
					</view>
					<view :class="key==2?'filter-selected filter':'filter'" class="row-container" @click="changeKey(2)">
						<text>难度</text>
						<text class="iconfont" v-show="key==2&&sortIndex==3">&#xed58;</text>
						<text class="iconfont" v-show="key==2&&sortIndex==2">&#xed59;</text>
					</view>
				</view>
				<view v-for="(course,index) in courseList" :key="index">
					<course-box-vue :course="course" class="box"></course-box-vue>
				</view>
				<uni-load-more v-show="courseList.length >= 10" :status="status" :contentText="contentText">
				</uni-load-more>
			</scroll-view>
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
				key: 1,
				triggered: false,
				status: "more",
				sort: ["SORT_BY_COURSE_NUM", "SORT_BY_COMMENT_COUNT", "SORT_BY_AVG_DIFFICULTY_ASC",
					"SORT_BY_AVG_DIFFICULTY_DESC", "SORT_BY_AVG_PREFER_DESC", "SORT_BY_AVG_PREFER_ASC"
				],
				courseCount: 1,
				sortIndex: 1,
				departmentList: [],
				departmentDict: [],
				courseList: [],
				departmentID: 0,
				departmentName: "所有课程",
				timer: {},
				suggestList: [],
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多课程了"
				},
				searchContentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在搜索...",
					contentnomore: "没有匹配课程"
				},
				searchStatus: "",
			}
		},
		onLoad() {
			wx.cloud.init();
			this.refresh();
			this.getDepartmentList();
			uni.$on("refreshPage", () =>{
				this.refresh();
			})
		},
		onShareAppMessage(res) {
			return {
				title: "麦屯小助手-课程吐槽",
				path: '/pages/courseMain/courseMain',
				imageUrl: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-share/forum.png"
			}
		},
		onShareTimeline(res) {
			return {
				title: "麦屯小助手-课程吐槽",
				path: '/pages/courseMain/courseMain',

			}
		},
		methods: {
			onSearch:function(){
				this.searching = true;
			},
			searchBarInput: function(value) {
				if (value.length != 0) {
					clearTimeout(this.timer);
					this.timer = setTimeout(() => {
						this.search(value.replace(/\s/g, '').toLowerCase());
					}, 500);
				}
			},
			async search(value) {
				this.searchStatus = "loading";
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9gip97mx4bfa32a3',
					},
					path: "/course/search?value=" + value,
					method: 'GET',
					header: {
						'X-WX-SERVICE': 'springboot-ds71',
					}
				});
				this.suggestList = res.data.data;
				if(res.data.status == 100){
					this.searchStatus = "more";
				}else{
					this.searchStatus = "noMore";
					this.suggestList = [];
				}
				
			},
			changeKey: function(num) {
				if (this.key == num && (this.key == 2 || this.key == 4)) {
					this.sortIndex = (this.sortIndex - num + 1) % 2 + num;
				} else {
					this.sortIndex = num;
				}
				this.key = num;
				this.refresh();
			},
			onFocus: function() {
				this.searching = true;
			},
			onCancel: function() {
				this.searchValue = "";
				this.searching = false;
			},
			clickMenu: function() {
				if (!this.showMenu) {
					this.showMenu = true;
					this.$refs.menuOpen.step({
						rotate: '90'
					});
					this.$refs.main.step({
						translateX: '85vw',
					});
					this.$refs.main.run();
					this.$refs.menuOpen.run();
				} else {
					this.showMenu = false;
					this.$refs.menuOpen.step({
						rotate: '0'
					});
					this.$refs.main.step({
						translateX: '0',
					});
					this.$refs.main.run();
					this.$refs.menuOpen.run();
				}
			},
			onScrollLower: function() {
				this.status = "loading";
				if (this.departmentID != 0) {
					this.status = "noMore";
					return;
				}
				this.getCourseList();
			},
			bindClick(e) {
				this.departmentName = e.item.name;
				this.departmentID = this.departmentDict[e.item.itemIndex.toString()];
				this.courseList = [];
				this.clickMenu();
				this.refresh();

			},
			refresh: function() {
				if (!this.triggered) {
					this.triggered = true;
				}else{
					return;
				}
				this.courseList = [];
				this.courseCount = 1;
				this.getCourseList()
			},
			async getCourseList() {
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9gip97mx4bfa32a3',
					},
					path: `/course/courselist?departmentID=${this.departmentID}&limit=20&offset=${this.courseCount}&orderType=${this.sort[this.sortIndex]}`,
					method: 'GET',
					header: {
						'X-WX-SERVICE': 'springboot-ds71',
					}
				});
				if (res.data.status == 100) {
					this.courseList = this.courseList.concat(res.data.data);
					this.courseCount += 20;
				}
				if (res.data.data.length == 0) {
					this.status = "noMore";
				} else {
					this.status = "more";
				}
				this.$nextTick(() => {
					this.triggered = false;
				});

			},
			async getDepartmentList() {
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9gip97mx4bfa32a3',
					},
					path: "/course/departmentlist",
					method: 'GET',
					header: {
						'X-WX-SERVICE': 'springboot-ds71',
					}
				});
				let tempList = res.data.data;
				this.departmentList = [{
					letter: ' ',
					data: ["所有课程"]
				}];
				let wordList = {
					letter: tempList[0].department[0],
					data: []
				};
				this.departmentDict["0"] = 0;
				for (let i = 0; i < tempList.length; i++) {
					if (wordList.letter != tempList[i].department[0]) {
						this.departmentList.push(wordList);
						wordList = {
							letter: tempList[i].department[0],
							data: [tempList[i].department]
						};
					} else {
						wordList.data.push(tempList[i].department)
					}
					this.departmentDict[(i + 1).toString()] = tempList[i].departmentID;
				}
				this.departmentList.push(wordList);
				uni.setStorage({
					key: "departmentIndexedList",
					data: this.departmentList
				});
			},
			toCourse: function(course) {
				console.log(course);
				uni.navigateTo({
					url: '/pages/coursePage/coursePage?course=' + encodeURIComponent(JSON.stringify(course)),
				});
			}
		}
	}
	import courseBoxVue from '@/components/course-box/course-box.vue'
</script>

<style>
	@import '@/static/iconfont/iconfont.css';
	@import "./courseMain.css";
</style>
