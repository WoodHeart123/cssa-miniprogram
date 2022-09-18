<template>
	<uni-transition ref="main" :show=true customClass="full-screen">
		<view id="course" class="row-container" @touchstart="touchstart" @touchmove="touchmove">
			<view class="menu column-container">
				<uni-indexed-list :options="list" :show-select="false" @click="bindClick"></uni-indexed-list>
				<!-- <view class="menu-text"><text>当前选择</text></view>
				<view class="menu-choice-top"><text>Asian Languages and Cultures : Language</text></view>
				<view class="menu-text"><text>所有选择</text></view>
				<view class="mene-choice-box" v-for="(item,index) in 374" :key="index">
					<view class="menu-choice">Computer Science (Comp Sci)</view>
				</view>
				<view style="margin-top: 20px;"></view> -->
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
						<course-box-vue class="box"></course-box-vue>
						<course-box-vue class="box"></course-box-vue>
						<course-box-vue class="box"></course-box-vue>
						<course-box-vue class="box"></course-box-vue>
						<course-box-vue class="box"></course-box-vue>
						<course-box-vue class="box"></course-box-vue>
						<uni-load-more :status="status"></uni-load-more>
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
				list:[]
			}
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
			cancelFilter:function(){
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
				console.log(1);
			}
		}
	}
	import courseBoxVue from '@/components/course-box/course-box.vue'
</script>

<style>
	@import "@/static/iconfont.css";

	.full-screen {
		height: 100vh;
		width: 140vw;
	}


	#course {
		position: fixed;
		display: flex;
		flex-direction: row;
		height: 100vh;
		width: 180vw;
		left: -80vw;
		flex: 0;
	}

	.main-menu-half {
		/* box-shadow: 0px 0px 25px #222; */
	}

	.menu {
		position: fixed;
		left: -80vw;
		width: 80vw;

		height: 100vh;
		background-color: white;
		/* color: white; */
		overflow-y: scroll;
	}

	.main-content {
		position: fixed;
		width: 100vw;
		height: 100%;
		transition: all 5s;
		left: 0;
	}

	.column-container {
		display: flex;
		flex-direction: column;
	}

	.row-container {
		display: flex;
		flex-direction: row;
	}

	.top-bar {
		width: 100%;
		height: 56px;
		background-color: white;
	}

	.search-bar {
		transition: all 500ms;
		height: 56px;
		width: 85%;
		margin-left: 15%;

	}

	.search-bar-selected {
		width: 100%;
		margin-left: 0%;
	}

	.department-select {
		position: fixed;
		font-size: 20px;
		width: 15vw;
		height: 56px;
		align-items: center;
		justify-content: center;
		color: #555;
	}

	.suggest-list {
		background-color: white;
		height: calc(100% - 56px) !important;
		width: 100%;
	}

	.icon {
		font-size: 30px;
		color: #aaa;
		transition: all 3s ease;
	}

	.course-list {
		background-color: #F5F5F5;
		border-radius: 20px 20px 0 0;
		width: 100%;
		height: calc(100vh - 106px);
		flex: 0;
	}

	.filter-box {
		height: 50px;
		width: 100%;
		align-items: center;
		background-color: white;
		border: #F5F5F5 0.5px solid;
	}

	.filter {
		min-width: 50px;
		padding: 0 10px 0 10px;
		font-size: 12px;
		height: 30px;
		border-radius: 20px;
		text-align: center;
		margin-left: 10px;
		background-color: #F5F5F5;
		justify-content: space-around;
		align-items: center;
	}

	.filter-text {
		margin-left: 20px;
		font-size: 15px;
	}

	.filter-selected {
		background-color: #c9d4fc;
	}

	.department {
		display: block;
		margin-top: 5px;
		height: 40px;
		margin-bottom: 5px;
		width: calc(100% - 20px);
		font-weight: 700;
		background-color: #F5F5F5;
		margin: 10px 10px 10px 10px;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		text-align: left;
		line-height: 40px;
	}

	.box {
		margin-bottom: 20px;
	}

	.course-list-box {
		overflow-y: auto;
		height: calc(100vh - 156px);
		background-color: #F5F5F5;
	}
	
	.filter-button{
		position: fixed;
		height: 50px;
		line-height: 50px;
		right:5%;
		font-size:12px;
		color:#1684FC;
	}
</style>
