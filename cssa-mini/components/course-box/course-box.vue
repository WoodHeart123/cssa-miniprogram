<template>
	<view class="course" @click="toCoursePage">
		<view class="column-container">
			<view class="course-name">
				<text>{{ course.departmentAbrev + " " + String(course.courseNum)}}</text>
			</view>
			<view class="course-sub-text"><text>{{course.courseName}}</text></view>
			<view class="row-container rate-box">
				<view><text>难度：</text></view>
				<uni-rate readonly="true" :value="course.avgDifficulty" allowHalf="true" size="15"></uni-rate>
				<view><text>{{course.avgDifficulty}}</text></view>
			</view>
			<view class="row-container rate-box">
				<view><text>喜爱： </text></view>
				<uni-rate readonly="true" :value="course.avgLike" allowHalf="true" size="15"></uni-rate>
				<view><text>{{course.avgLike}}</text></view>
			</view>
			<view  class="footnote"><text>{{course.commentCount}}人参与此评论</text></view>
		</view>
	</view>
</template>

<script>
	export default {
		props:["course"],
		name: "course-box",
		data() {
			return {

			}
		},
		methods: {
			toCoursePage:function(){
				uni.navigateTo({
					url: '/pages/coursePage/coursePage?course=' + encodeURIComponent(JSON.stringify(this.course)),
				});
			}
		}
	}
</script>

<style>
	.course {
		background-color: white;
		width: 95vw;
		margin-left: 2.5vw;
		border-radius: 10px;
		margin: 5px 0 5px 2.5vw;
	}

	.column-container {
		display: flex;
		flex-direction: column;
	}

	.row-container {
		display: flex;
		flex-direction: row;
	}

	.course-name {
		height: 30px;
		width: calc(100% - 20px);
		font-weight: 700;
		margin: 0 2px 0 10px;
		overflow: hidden;
		text-align: left;
		line-height: 30px;
	}
	.course-sub-text{
		height: 20px;
		width: calc(100% - 20px);
		margin: 0 2px 1px 10px;
		overflow: hidden;
		text-align: left;
		font-size: 10px;
		color:#aaa;
	}
	.rate-box {
		margin: 0 10px 2px 10px;
		height: 20px;
		line-height: 20px;
		align-items: center;
		font-size: 12px;
	}
	.footnote{
		color:#aaa;
		font-size: 10px;
		text-align: right;
		margin-right: 10px;
	}
</style>
