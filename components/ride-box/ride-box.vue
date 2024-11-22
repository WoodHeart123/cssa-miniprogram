<template>
	<view class="ride-box row-container" @click="toRideDetail">
		<view class="image-box">
			<u--image 
				:src="this.rideInfo.images && this.rideInfo.images.length > 0 
					? this.rideInfo.images[0] 
					: defaultRideImage" 
				mode="widthFix" 
				height="80%" 
				width="30vw">
				<template v-slot:loading>
					<u-loading-icon color="red"></u-loading-icon>
				</template>
			</u--image>
		</view>
		<view class="column-container content-box">
			<view class="row-container title-box">
				<view class="row-container tag requestType">{{ requestTypeConstrainValue[this.rideInfo.requestType] }}</view>
				<view class="row-container tag rideType">{{ rideTypeContraintValue[this.rideInfo.rideType] }}</view>
			</view>
			<view class="ride-title">
				{{ this.rideInfo.origin }} 
				<span v-if="this.rideInfo.rideType === 2">⇄</span>
				<span v-else>→</span>
				{{ this.rideInfo.destination }}
			</view>
			<view class="time-box">
				<view>{{ formatDepartureTime }}</view>
				<view v-if="this.rideInfo.rideType === 2">{{ formatReturnTime }}</view>
			</view>
			<view class="price-box">
				<span class="price">${{ this.rideInfo.price }} 每人每程</span>
				<span class="separator">|</span>
				<span class="seating-info">
					{{ requestTypeSeatingInfo }}
				</span>
			</view>
			<view class="description-box">{{ trimmedDescription }}</view>
			<view class="publish-time-box" v-if="showRideTime">发布于：{{ ridePublishTime }}</view>
		</view>
	</view>
</template>

<script>
	import moment from "moment/min/moment-with-locales";
	import "moment/locale/zh-cn";

	export default {
		name: "ride-box",
		props: ["rideInfo"],
		data() {
			return {
				requestTypeConstrainValue: ["未知", "出顺风车", "求顺风车"],
				rideTypeContraintValue: ["未知", "单程", "往返"],
				ridePublishTime: "",
				showRideTime: true,
				defaultRideImage:
					"https://prod-9gip97mx4bfa32a3-1312104819.tcloudbaseapp.com/ride/%E9%A1%BA%E9%A3%8E%E8%BD%A6%E9%BB%98%E8%AE%A4%E5%9B%BE%E7%89%87.jpg?sign=ff829501d8241dc11edbf64ca3850ca8&t=1731883928"
			};
		},
		mounted() {
			// 初始化发布时间显示逻辑
			if (moment(this.rideInfo.publishedTime).valueOf() === 0) {
				this.showRideTime = false;
			} else if (moment().year() - moment(this.rideInfo.publishedTime).year() > 0) {
				this.ridePublishTime = moment(this.rideInfo.publishedTime).format("YYYY-MM-DD");
			} else if (Date.now() - moment(this.rideInfo.publishedTime).valueOf() > 86400000 * 7) {
				this.ridePublishTime = moment(this.rideInfo.publishedTime).format("MM-DD");
			} else {
				this.ridePublishTime = moment(this.rideInfo.publishedTime).locale("zh-cn").fromNow();
			}
		},
		computed: {
			formatDepartureTime() {
				return "出发: " + moment(this.rideInfo.departureTime).format("YYYY-MM-DD HH:mm");
			},
			formatReturnTime() {
				return this.rideInfo.returnTime
					? "返回: " + moment(this.rideInfo.returnTime).format("YYYY-MM-DD HH:mm")
					: "返回时间未设置";
			},
			trimmedDescription() {
				const maxLength = 50; // 限制一行的最大长度
				return this.rideInfo.description.length > maxLength
					? this.rideInfo.description.substring(0, maxLength) + "..."
					: this.rideInfo.description;
			},
			requestTypeSeatingInfo() {
				if (this.rideInfo.requestType === 1) {
					return `可用座位：${this.rideInfo.availableSeats || 0}个`;
				} else if (this.rideInfo.requestType === 2) {
					return `需要座位：${this.rideInfo.requestedSeats || 0}个`;
				}
				return "";
			}
		},
		methods: {
			toRideDetail() {
				uni.navigateTo({
					url: "/pages/ride/rideDetail?rideInfo=" + encodeURIComponent(JSON.stringify(this.rideInfo))
				});
			}
		}
	};
</script>

<style>
	.column-container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.row-container {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.ride-box {
		display: flex;
		width: 100%;
		min-height: 160px;
		background-color: white;
		border-bottom: 1px solid rgba(238, 238, 238, 0.6);
		border-top: 1px solid rgba(238, 238, 238, 0.6);
		overflow: hidden;
	}
	.image-box {
		display: flex;
		width: 30%;
		height: auto;
		background-color: rgba(245, 245, 245, 0.5);
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}
	.content-box {
		width: 68%;
		padding: 5px;
		position: relative;
	}
	.title-box {
		margin-bottom: 5px;
	}
	.tag {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #9b0000;
		color: white;
		border-radius: 5px;
		font-size: 12px;
		height: 20px;
		width: auto;
		padding: 0 8px;
		margin-right: 5px;
	}
	.ride-title {
		font-size: 15px;
		font-weight: 600;
		color: #333;
		margin-bottom: 5px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.time-box {
		font-size: 14px;
		color: #555;
		line-height: 1.2;
	}
	.price-box {
		display: flex;
		align-items: baseline;
		margin-top: 5px;
	}
	.price {
		font-size: 14px;
		color: #9b0000;
	}
	.separator {
		font-size: 14px;
		color: #000; /* 黑色 */
		margin: 0 8px; /* 左右间距相等 */
		text-align: center;
	}
	.seating-info {
		font-size: 14px;
		color: #333;
	}
	.description-box {
		font-size: 12px;
		color: rgba(132, 132, 132, 0.8);
		margin-top: 5px;
		line-height: 18px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.publish-time-box {
		font-size: 12px;
		color: #555;
		text-align: right;
		margin-top: 10px;
	}
</style>
