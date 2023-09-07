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
				<view class="rate-text"><text>{{course.avgDifficulty.toFixed(1)}}</text></view>
			</view>
			<view class="row-container rate-box">
				<view><text>推荐： </text></view>
				<uni-rate readonly="true" :value="course.avgPrefer" allowHalf="true" size="15"></uni-rate>
				<view class="rate-text"><text>{{course.avgPrefer.toFixed(1)}}</text></view>
			</view>
			<view  class="footnote"><text>{{course.commentCount==0?'暂时无人评论':course.commentCount.toString() + '人参与此评论'}}</text></view>
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
		width: 100vw;
		margin: 5px 0 5px 0;
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
		font-size: 15px;
	}
	.course-sub-text{
		height: 23px;
		line-height: 23px;
		width: calc(100% - 20px);
		margin: 0 2px 1px 10px;
		overflow: hidden;
		text-align: left;
		font-size: 12px;
		color:#aaa;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.rate-box {
		margin: 0 10px 2px 10px;
		height: 23px;
		line-height: 23px;
		align-items: center;
		font-size: 14px;
	}
	.footnote{
		color:#aaa;
		font-size: 12px;
		text-align: right;
		margin-right: 10px;
	}
	.rate-text{
		color:#ccc;
		font-size: 12px;
		margin-left:5px;
	}
</style>
