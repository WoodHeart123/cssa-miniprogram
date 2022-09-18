<template>
	<view class="course">
		<view class="column-container">
			<view class="course-name">
				<text>AFRICAN 337</text>
			</view>
			<view class="course-sub-text"><text>THIRD SEMESTER-A LANGUAGE OF SOUTHERN AFRICA</text></view>
			<view class="row-container rate-box">
				<view><text>难度：</text></view>
				<uni-rate readonly="true" :value="4.5" allowHalf="true" size="15"></uni-rate>
				<view><text>(4.5)</text></view>
			</view>
			<view class="row-container rate-box">
				<view><text>喜爱： </text></view>
				<uni-rate readonly="true" :value="4.5" allowHalf="true" size="15"></uni-rate>
				<view><text>(4.5)</text></view>
			</view>
			<view class="footnote"><text>1234人参与此评论</text></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "course-box",
		data() {
			return {

			}
		},
		methods: {

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
