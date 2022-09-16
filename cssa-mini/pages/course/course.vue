<template>
	<uni-transition ref="main" :show=true customClass="full-screen">
		<view  id="course" class="row-container" @touchstart="touchstart" @touchmove="touchmove" >
			<view class="menu"></view>
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
					<text>Asian Languages and Cultures : Language</text> </view>
				<view class="column-container course-list" v-show="!searching">
					<view class="row-container filter-box">
						<view :class="key==0?'filter-selected filter':'filter'" @click="changeKey(0)">热门课程</view>
						<view :class="key==1?'filter-selected filter':'filter'" @click="changeKey(1)">喜爱</view>
						<view :class="key==2?'filter-selected filter':'filter'" @click="changeKey(2)">难度</view>
					</view>
					<view class="column-container">
						<course-box-vue></course-box-vue>
					</view>
				</view>
			</view>
		</view>
	</uni-transition>
</template>

<script>
	export default {
		components:{
			courseBoxVue
		},
		data() {
			return {
				searchValue: '',
				searching: false,
				showMenu: false,
				startX:0,
				startY:0,
				key:0,
			}
		},
		methods: {
			changeKey:function(num){
				this.key = num;
			},
			onFocus: function() {
				this.searching = true;
			},
			onBlur: function() {
				this.searching = false;
			},
			clickMenu: function() {
				if(!this.showMenu){
					this.$refs.menuOpen.step({
						rotate: '90'
					});
					this.$refs.main.step({
						translateX: '60vw',
					});
					this.$refs.main.run();
					this.$refs.menuOpen.run(() => {
						this.showMenu = true;
					});
				}else{
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
				if (Math.abs(this.startY - this.moveY) <= 50 && this.startX - this.moveX <= -100 && !this.showMenu) {
					this.clickMenu();
				}
				if(Math.abs(this.startY - this.moveY) <= 50  && this.startX - this.moveX >= 100 && this.showMenu){
					this.clickMenu();
				}
			}

		}
	}
	import courseBoxVue from '@/components/course-box/course-box.vue'
</script>

<style>
	@import "@/static/iconfont.css";

	.full-screen{
		height: 100vh;
		width: 140vw;
	}
	
	
	#course {
		position: fixed;
		display: flex;
		flex-direction: row;
		height: 100vh;
		width: 160vw;
		left: -60vw;
	}

	.main-menu-half{
		box-shadow: 0px 0px 25px #222;
	}
	.menu {
		position: fixed;
		left: -60vw;
		width: 60vw;
		height: 100vh;
		background-color: #555;
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
	.course-list{
		background-color: white !important;
		border-radius: 20px 20px 0 0;
		width: 100%;
		height: calc(100vh - 106px);
	}
	
	.filter-box{
		height: 50px;
		width: 100%;
		align-items: center;
	}
	.filter{
		min-width: 50px;
		padding: 0 10px 0 10px; 
		font-size: 12px;
		height: 30px;
		line-height: 30px;
		border-radius: 20px;
		text-align: center;
		margin-left:10px;
		background-color: #F5F5F5;
	}
	.filter-text{
		margin-left: 20px;
		font-size: 15px;
	}
	.filter-selected{
		background-color: #c9d4fc;
	}
	.department{
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
		overflow:hidden;
		text-align: left;
		line-height: 40px;
	}
</style>
