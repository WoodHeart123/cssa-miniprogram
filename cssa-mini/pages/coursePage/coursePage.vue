<template>
	<uni-transition ref="course" :show=true customClass="full-screen">
		<view class="column-container">
			<view class="course-name">
				<view comment="courseName"><Text>{{course.courseName}}</Text></view>
			</view>
			<view class="row-container course-intro-box">
				<view class="course-diff-like">
					<view class="row-container rate-box">
						<view class="rate-text"><text>难度:</text></view>
						<uni-rate readonly="true" :value="course.avgDifficulty" allowHalf="true" size="20"></uni-rate>
						<view class="rate-num"><text>{{course.avgDifficulty}}</text></view>
					</view>
					<view class="row-container rate-box">
						<view class="rate-text"><text>推荐:</text></view>
						<uni-rate readonly="true" :value="course.avgLike" allowHalf="true" size="20"></uni-rate>
						<view class="rate-num"><text>{{course.avgLike}}</text></view>
					</view>
				</view>
				<view class="column-container credit-box">
					<text class="credit">{{course.credit}}</text>
					<text style="font-size: 10pt; text-align: center;">学分</text>
				</view>
			</view>
			<view class="footnote">{{course.commentCount}}人参与讨论</view>
		</view>
		<view class="row-container filter-box">
			<view :class="key==0?'row-container filter filter-selected':'row-container filter'" @click="changeKey(0)">
				<text>最新</text>
			</view>
			<view :class="key==1?'row-container filter filter-selected':'row-container filter'" @click="changeKey(1)">
				<text>热度</text>
			</view>
		</view>
		<scroll-view scroll-y="true" show-scrollbar="true" refresher-enabled="true" class="column-container">
			<commentBoxVue class="box"></commentBoxVue>
			<commentBoxVue class="box"></commentBoxVue>
			<commentBoxVue class="box"></commentBoxVue>
			<commentBoxVue class="box"></commentBoxVue>
			<commentBoxVue class="box"></commentBoxVue>
			<uni-load-more v-show="showLoad" :status="status"></uni-load-more>
		</scroll-view>
		<uni-fab :pattern="pattern" horizontal="right" vertical="bottom" popMene="false" @fabClick="toComment"></uni-fab>
	</uni-transition>
</template>

<script>
	export default {
		components: {
			commentBoxVue
		},
		data() {
			return {
				pattern:{
					buttonColor:"#1684FC"
				},
				course: {},
				showLoad: false,
				status: "load",
				currentPage:0,
				key:0,
				orderType:["SORT_BY_TIME","SORT_BY_LIKE"],
			}
		},
		methods: {
			changeKey: function(num) {
				if(this.key != num){
					this.currentPage = 0;
					this.getCommentList();
					this.key = num;
				}
			},
			async getCommentList() {
				console.log(1);
			},
			toComment: function() {
				console.log(1);
			}
		},
		onLoad(options) {
			this.course = JSON.parse(decodeURIComponent(options.course));
			uni.setNavigationBarTitle({
				title: this.course.departmentAbrev + " " + String(this.course.courseNum)
			});
			this.getCommentList();
		},
	}
	import commentBoxVue from '@/components/comment-box/comment-box.vue'
</script>

<style>
	@import "@/static/iconfont.css";

	.column-container {
		display: flex;
		flex-direction: column;
		background-color: white;
	}

	.row-container {
		display: flex;
		flex-direction: row;
		margin: 5px 0px 5px 5px;
	}

	.course-intro-box {
		width: 100%;
		height: 80px;
		justify-content: space-between;
		align-items: center;
	}

	.course-name {
		height: 40px;
		margin-top: 5px;
		margin-bottom: 5px;
		width: calc(100% - 20px);
		font-weight: 700;
		margin: 10px 10px 10px 10px;
		text-align: left;
		line-height: 20px;
		overflow: hidden;
		white-space: pre-wrap;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.course-diff-like {
		font-weight: 250;
	}

	.credit-box {
		width: 70px;
		height: 100%;
		background-color: #cbcbcb;
		border-radius: 10px 0 0 10px;
		color: white;
		justify-content: center;
	}

	.credit {
		font-size: 30px;
		text-align: center;
	}

	.footnote {

		color: #aaa;
		font-size: 10px;
		text-align: right;
		margin-right: 2px;
	}

	.filter-selected {
		background-color: #c9d4fc !important;
	}

	.filter {
		min-width: 50px;
		padding: 0 10px 0 10px;
		font-size: 12px;
		height: 30px;
		border-radius: 20px;
		text-align: center;
		margin-left: 10px;
		background-color: white;
		justify-content: space-around;
		align-items: center;
	}

	.box {
		margin-bottom: 20px;
	}

	.rate-box {
		height: 20px;
		margin-bottom: 10px;
	}

	.rate-text {
		margin-right: 10px;
	}

	.rate-num {
		margin-left: 20px;
		font-size: 12px;
		line-height: 20px;
	}
</style>
