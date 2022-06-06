<template>
	<view class="container" @click="toDetail">
		<div class="box">
			<div class="title">
				<img class="avatar" src="@/static/cssalogo-red-sm.png" />
				<span>{{this.actDetail.title}}</span>
			</div>
			<div class="image" :style="{'background-image': 'url(' + this.actDetail.imgs +')' }" />
			<div class="row">
				<span class="iconfont icon">&#xe65e;</span>
				<span class="font-small">{{this.actDetail.location}}</span>
			</div>
			<div class="row">
				<span class="iconfont icon" style="margin-left: 12px;font-size: 13px;">&#xe8c5;</span>
				<span class="font-small">{{actDateFormat}}</span>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		props: ['actDetail'],
		name: "act-box",
		data() {
			return {

			}
		},
		computed: {
			actDateFormat() {
				return moment(this.actDetail.date).format("YYYY-MM-DD h:mm a");
			}
		},
		methods:{
			toDetail:function(){
				uni.navigateTo({
					url: '/pages/detail/detail?actDetail=' + encodeURIComponent(JSON.stringify(this.actDetail)),
				});
			}
		}
	}
	import moment from 'moment';
</script>

<style>
	@import "@/static/iconfont.css";

	.container {
		width: 96vw;
		margin-left: 2vw;
		margin-top: 20px;
		border-radius: 5px;
		box-shadow: rgba(0, 0, 0, 0.2) 0 0 5px;
		background-color: white;
	}

	.box {
		display: flex;
		flex-direction: column;
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
		margin-right: 10px;
		color: #1684FC;
		margin-left: 10px;
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
		padding-bottom: 5px;
		padding-left: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 18px;
		font-weight: 600;
	}
	.avatar{
		width:20px;
		height: 20px;
		border-radius: 100%;
		margin-right:5px;
	}
</style>
