<template>
	<view class="ride-box row-container" @click="toRideDetail">
		<!-- 顺风车box左侧图片 -->
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
		
		<!--顺风车信息box-->
		<view class="column-container content-box">
			
			<!--顺风车标签-->
			<view class="row-container title-box">
				<view class="row-container tag requestType">{{ requestTypeConstrainValue[this.rideInfo.requestType] }}</view>
				<view class="row-container tag rideType">{{ rideTypeContraintValue[this.rideInfo.rideType] }}</view>
			</view>
			
			<!--标题-->
			<view class="ride-title">
				{{ this.rideInfo.origin }} 
				<span v-if="this.rideInfo.rideType === 2">⇄</span>
				<span v-else>→</span>
				{{ this.rideInfo.destination }}
			</view>
			
			<!--出发/返回日期时间-->
			<view class="time-box">
				<view>{{ formatDepartureTime }}</view>
				<view v-if="this.rideInfo.rideType === 2">{{ formatReturnTime }}</view>
			</view>
			
			<!--价格，可用/空余座位-->
			<view class="price-box">
				<span class="price">${{ this.rideInfo.price }} 每人每程</span>
				<span class="separator">|</span>
				<span class="seating-info">
					{{ requestTypeSeatingInfo }}
				</span>
			</view>
			
			<!--描述-->
			<view class="description-box">{{ trimmedDescription }}</view>

			<!-- 发布信息 -->
			<view class="row-container publish-info-box">
				<view class="row-container user-info">
					<image class="avatar" :src="postUserInfo.avatarUrl || defaultAvatarUrl" mode="aspectFill" />
					<text class="nickname">{{ postUserInfo.nickname || "匿名" }}</text>
				</view>
				<view class="publish-time">发布于：{{ ridePublishTime }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import moment from "moment/min/moment-with-locales";
	import "moment/locale/zh-cn";
	import requestAPI from "@/api/request.js";

	export default {
		name: "ride-box",
		props: ["rideInfo"],
		data() {
			return {
				requestTypeConstrainValue: ["出顺风车", "求顺风车"],
				rideTypeContraintValue: ["单程", "往返"],
				ridePublishTime: "",
				showRideTime: true,
				defaultRideImage:
					"https://prod-9gip97mx4bfa32a3-1312104819.tcloudbaseapp.com/ride/%E9%A1%BA%E9%A3%8E%E8%BD%A6%E9%BB%98%E8%AE%A4%E5%9B%BE%E7%89%87.jpg?sign=ff829501d8241dc11edbf64ca3850ca8&t=1731883928",
				defaultAvatarUrl:
					"https://prod-9gip97mx4bfa32a3-1312104819.tcloudbaseapp.com/default-avatar.png",
				postUserInfo: {
					avatarUrl: "",
					nickname: "匿名"
				}
			};
		},
		mounted() {
		    // 获取用户信息
		    this.fetchPostUserInfo();
		
		    // 将 publishedTime 转换为 CST 时间
		    const publishedCST = moment(this.rideInfo.publishedTime).utcOffset("-0600");
		    const nowCST = moment().utcOffset("-0600");
		
		    // 初始化发布时间显示逻辑
		    if (publishedCST.isSameOrBefore(moment(0))) {
		        this.showRideTime = false; // 没有发布时间
		    } else {
		        const minutesAgo = nowCST.diff(publishedCST, "minutes");
		        const hoursAgo = nowCST.diff(publishedCST, "hours");
		        const daysAgo = nowCST.diff(publishedCST, "days");
		        const yearsAgo = nowCST.diff(publishedCST, "years");
		
		        if (minutesAgo < 1) {
		            // 不到1分钟
		            this.ridePublishTime = "刚刚";
		        } else if (minutesAgo < 60) {
		            // 1分钟到59分钟
		            this.ridePublishTime = `${minutesAgo} 分钟前`;
		        } else if (hoursAgo < 24) {
		            // 1小时到23小时
		            this.ridePublishTime = `${hoursAgo} 小时前`;
		        } else if (daysAgo < 7) {
		            // 1天到6天
		            this.ridePublishTime = `${daysAgo} 天前`;
		        } else if (yearsAgo > 0) {
		            // 跨年
		            this.ridePublishTime = publishedCST.format("YYYY-MM-DD");
		        } else {
		            // 超过7天但在同一年
		            this.ridePublishTime = publishedCST.format("MM-DD");
		        }
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
				const maxLength = 50;
				return this.rideInfo.description.length > maxLength
					? this.rideInfo.description.substring(0, maxLength) + "..."
					: this.rideInfo.description;
			},
			requestTypeSeatingInfo() {
				console.log("this.rideInfo.availableSeats is" + this.rideInfo.availableSeats);
				if (this.rideInfo.requestType === 0) {
					return `可用座位：${this.rideInfo.availableSeats || 0}个`;
				} else if (this.rideInfo.requestType === 1) {
					return `需要座位：${this.rideInfo.requestedSeats || 0}个`;
				}
				return "";
			}
		},
		methods: {
			// 获取发布用户头像和昵称
			async fetchPostUserInfo() {
				requestAPI({
					path: "/user/getUserInfo",
					type: "GET",
					header: { "x-wx-openid": this.rideInfo.userId }
				}).then(response => {
					if (response.data.status === 100) {
						this.postUserInfo = response.data.data;
					} else {
						console.warn("获取发布用户信息失败:", response.data.message);
						console.log(this.rideInfo.userId);
					}
				}).catch(error => {
					console.error("获取发布用户信息出错:", error);
				});
			},
			// 跳转到详情页
			toRideDetail() {
				uni.navigateTo({
					url: `/pages/ride/rideDetail?rideId=${this.rideInfo.rideId}`
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
		color: #000;
		margin: 0 8px;
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
	.publish-info-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 10px;
	}
	.user-info {
		display: flex;
		align-items: center;
	}
	.avatar {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		margin-right: 10px;
	}
	.nickname {
		font-size: 12px;
		color: #333;
	}
	.publish-time {
		font-size: 12px;
		color: #555;
		text-align: right;
	}
</style>
