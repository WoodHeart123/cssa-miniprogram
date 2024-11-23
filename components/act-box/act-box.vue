<template>
	<view class="container" @click="toDetail">
		<div class="float-box">
			<div class="heading-3">
				<text class="date">{{actDate}}</text>
			</div>
			<div class="paragraph-2">
				<text class="month">{{actMonth}}</text>
			</div>
		</div>
		<div class="box">
			<div class="image" :style="{'background-image': 'url(' + this.actDetail.images[0] +')' }" />
			<div class="lower-box">
				<div class="content-box">
					<div class="title heading-3">
						<text>{{this.actDetail.title}}</text>
					</div>
					<div class="row">
						<image class="icon" src="@/static/act/time.svg"></image>
						<text class="font-small paragraph-1">{{actDateFormat}}</text>
					</div>
					<div class="row">
						<image class="icon" src="@/static/act/location.svg"></image>
						<text class="font-small paragraph-1" style="white-space: nowrap;overflow: hidden;">{{this.actDetail.location}}</text>
					</div>

				</div>
				<div class="button-box">
					<view class="button" :class="{ 'disabled': ifJoined}"><text
							class="button-text">{{ifJoined?'已报名':'报名'}}</text></view>
				</div>
			</div>

		</div>
	</view>
</template>

<script>
	export default {
		props: ['actDetail', "ifJoined"],
		name: "act-box",
		data() {
			return {

			}
		},
		computed: {
			actDateFormat() {
				return moment(this.actDetail.startDate).locale("zh-cn").format("MM.DD/ddd H:mm - ") +
					moment(this.actDetail.endDate).format("H:mm");
			},
			actMonth(){
				return moment(this.actDetail.startDate).locale("zh-cn").format("MMMM")
			},
			actDate(){
				return moment(this.actDetail.startDate).locale("zh-cn").format("DD")
			}
		},
		methods: {
			toDetail: function() {
				uni.navigateTo({
					url: '/pages/activity/detail?actDetail=' + encodeURIComponent(JSON.stringify(this
						.actDetail)),
				});
			}
		}
	}
	import moment from "moment/min/moment-with-locales";
	import 'moment/locale/zh-cn';
</script>

<style lang="scss">
	/* @import "@/static/iconfont.css"; */

	.container {
		position: relative;
		width: 90vw;
		overflow: hidden;
		border-radius: 18px;
		box-shadow: rgba(0, 0, 0, 0.2) 0 0 5px;
		background-color: white;
	}

	.float-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 10px;
		left: 10px;
		background-color: white;
		width: 50px;
		height: 50px;
		border-radius: 10px;

	}

	.date {
		font-weight: 700;
		line-height: 5.7px;
		color: $main-primary-color !important;
	}

	.month {
		font-weight: 500;
		line-height: 13.7px;
		color: $main-primary-color !important;
	}

	.box {
		display: flex;
		flex-direction: column;
	}

	.lower-box {
		display: flex;
		flex-direction: row;
		margin-bottom: 10px;

		.content-box {
			height: 100%;
			padding-left: 7%;
		}

		.button-box {
			display: flex;
			align-items: center;
			justify-content: center;
			min-height: 100%;
			width: 50%;
			flex: 1;

			.button {
				margin: 15px 0 0 30%;
				width: 50%;
				height: 40px;
			}
		}
	}

	.row {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 20px;
		margin-bottom: 1px;
		align-items: center;
		overflow: hidden;
		white-space: nowrap;
		flex-shrink: 0;
		max-width: 60vw;
	}

	.image {
		min-height: 200px;
		max-height: 200px;
		width: 100%;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		margin-bottom: 5px;
	}

	.font-small {
		font-size: 12px;
	}

	.icon {
		width: 14px;
		height: 14px;
		margin-right: 10px;
		flex-shrink: 0;
	}

	.column {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 50%;
	}

	.title {
		height: 30px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.avatar {
		width: 20px;
		height: 20px;
		border-radius: 100%;
		margin-right: 5px;
	}
</style>