<template>
	<uni-transition ref="course" :show=true customClass="full-screen">
		<view class="column-container">
			<view class="course-name">
				<view comment="courseName"><Text>Biophysical Spectroscopy Biophysical Spectroscopy</Text></view>
			</view>
			<view class="row-container" style="-webkit-justify-content: space-between;justify-content: space-between;">
				<view class="course-diff-like">
					<view class="row-container rate-box">
						<view><text>难度 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</text></view>
						<uni-rate readonly="true" :value="4.5" allowHalf="true" size="15"></uni-rate>
						<view><text>(4.5)</text></view>
					</view>
					<view class="row-container rate-box">
						<view><text>喜爱 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </text></view>
						<uni-rate readonly="true" :value="1" allowHalf="true" size="15"></uni-rate>
						<view><text>(1)</text></view>
					</view>
				</view>
				<view class="credit">
					<text style="font-size: 30pt; text-align: center; vertical-align: 10pt;">2-3</text>
					<view>
						<text style="font-size: 10pt; text-align: right;">学分</text>
					</view>
				</view>
			</view>
			<view class="footnote">56人参与讨论</view>
		</view>
		<view class="row-container filter-box">
			<view :class="key==0?'filter-selected filter':'filter'" class="row-container" @click="changeKey(0)">
				<text>最新</text>
			</view>
			<view :class="key==1?'filter-selected filter':'filter'" class="row-container" @click="changeKey(1)">
				<text>热度</text>
			</view>
		</view>
		<scroll-view scroll-y="true" show-scrollbar="true" refresher-enabled="true" class="column-container">
			<commentBoxVue class="box"></commentBoxVue>
			<commentBoxVue class="box"></commentBoxVue>
			<commentBoxVue class="box"></commentBoxVue>
			<commentBoxVue class="box"></commentBoxVue>
			<commentBoxVue class="box"></commentBoxVue>
			<uni-load-more :status="status"></uni-load-more>
		</scroll-view>
	</uni-transition>
</template>

<script>
	export default {
		components: {
			commentBoxVue
		},
		data() {
			return {
				course: {}
			}
		},
		methods: {
			changeKey: function(num) {
				this.key = num;
			},
		},
		onLoad(options) {
			this.course = JSON.parse(decodeURIComponent(options.course));
			uni.setNavigationBarTitle({
				title: this.course.departmentAbrev + " " + String(this.course.courseNum)
			})
			console.log(this.course);
		},
	}
	import commentBoxVue from '@/components/course-box/comment-box.vue'
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

	.course-name {
		margin-top: 5px;
		margin-bottom: 5px;
		width: calc(100% - 20px);
		font-weight: 700;
		margin: 10px 10px 10px 10px;
		text-align: left;
		line-height: 20px;
	}

	.course-diff-like {
		font-weight: 250;
	}

	.credit {
		background-color: #cbcbcb;
		border-radius: 10px 0 0 10px;
		color: white;
	}


	.footnote {
		color: #aaa;
		font-size: 10px;
		text-align: right;
		margin-right: 10px;
	}

	.filter-selected {
		background-color: #c9d4fc;
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

	.box {
		margin-bottom: 20px;
	}
</style>
