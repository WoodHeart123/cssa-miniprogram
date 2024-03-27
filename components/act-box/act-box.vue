<template>
	<view class="container" @click="toDetail">
		<div class="box">
			<div class="image"
				:style="{'background-image': 'url(' + this.actDetail.images[0] +')' }" />
			<div class="lower-box">
				<div class="content-box">
					<div class="title heading-3">
						<span>{{this.actDetail.title}}</span>
					</div>
					<div class="row">
						<image class="icon" src="@/static/act/time.svg"></image>
						<span class="font-small paragraph-1">{{actDateFormat}}</span>
					</div>
					<div class="row">
						<image class="icon" src="@/static/act/location.svg"></image>
						<span class="font-small paragraph-1">{{this.actDetail.location}}</span>
					</div>


				</div>
				<div class="button-box">
					<view class="button" :class="{ 'disabled': ifJoined}"><text class="button-text">{{ifJoined?'已报名':'报名'}}</text></view>
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
				return moment(this.actDetail.startDate).locale("cn").format("MM.DD/ddd H:mm - ") +
				moment(this.actDetail.endDate).format("H:mm");
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
		width: 90vw;
		margin-left: 5vw;
		margin-top: 20px;
		overflow: hidden;
		border-radius: 18px;
		box-shadow: rgba(0, 0, 0, 0.2) 0 0 5px;
		background-color: white;
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
			width: 50%;
			height: 100%;
			padding-left: 7%;
		}
		
		.button-box{
			display: flex;
			align-items: center;
			justify-content: center;
			min-height: 100%;
			width: 50%;
			
			.button{
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