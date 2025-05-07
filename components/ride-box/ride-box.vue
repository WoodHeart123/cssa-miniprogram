<template>
    <uni-card :is-shadow="true" :is-full="true" @click="toRideDetail">
        <view class="ride-box row-container">
            <!-- 顺风车box左侧图片 -->
            <view class="image-box">
                <u--image
                    :src="this.rideInfo.images && this.rideInfo.images.length > 0 ? this.rideInfo.images[0] : defaultRideImage"
                    mode="aspectFill"     
                    width="30vw"
                    height="40vw"
                    style="border-radius:8px;"
                >
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
                    <span v-if="this.rideInfo.rideType === 1">⇄</span>
                    <span v-else>→</span>
                    {{ this.rideInfo.destination }}
                </view>

                <!--出发和到达/返回日期时间-->
                <view class="time-box">
                    <view>{{ formatDepartureTime }}</view>
                    <view v-if="this.rideInfo.rideType === 0 && this.rideInfo.estimatedArrivalTime">{{
                        formatEstimatedArrivalTime
                    }}</view>
                    <view v-if="this.rideInfo.rideType === 1">{{ formatReturnTime }}</view>
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
                        <image class="avatar" :src="posterUserAvatarToDisplay" mode="aspectFill" />
                        <img
                            class="avatar-tag"
                            v-if="postUserInfo.isStudent"
                            src="https://prod-9gip97mx4bfa32a3-1312104819.tcloudbaseapp.com/Member/%E5%AD%A6%E7%94%9F%E8%AE%A4%E8%AF%81tag.png?sign=b0d927e7bf08e282b9096cf1cccb0aae&t=1737229263"
                        />
                        <text class="nickname">{{ postUserInfo.nickname || '匿名' }}</text>
                    </view>
                    <view class="publish-time">发布于：{{ getPublishedTimeText() }}</view>
                </view>
            </view>
        </view>
    </uni-card>
</template>

<script>
import moment from 'moment/min/moment-with-locales';
import 'moment/locale/zh-cn';
import requestAPI from '@/api/request.js';

export default {
    name: 'ride-box',
    props: ['rideInfo'],
    data() {
        return {
            requestTypeConstrainValue: ['出顺风车', '求顺风车'],
            rideTypeContraintValue: ['单程', '往返'],
            showRideTime: true,
            defaultRideImage:
                'https://prod-9gip97mx4bfa32a3-1312104819.tcloudbaseapp.com/ride/%E9%A1%BA%E9%A3%8E%E8%BD%A6%E9%BB%98%E8%AE%A4%E5%9B%BE%E7%89%87.jpg?sign=ff829501d8241dc11edbf64ca3850ca8&t=1731883928',
            defaultAvatarUrl:
                'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
            postUserInfo: {
                avatar: 0,
                avatarUrl: '',
                nickname: '匿名',
                isStudent: 0,
            },
            posterUserAvatarToDisplay: '',
        };
    },
    mounted() {
        // 获取用户信息
        this.fetchPostUserInfo();
    },
    computed: {
        formatDepartureTime() {
            return '出发: ' + moment(this.rideInfo.departureTime).format('YYYY-MM-DD HH:mm');
        },
        formatEstimatedArrivalTime() {
            return '到达: ' + moment(this.rideInfo.estimatedArrivalTime).format('YYYY-MM-DD HH:mm');
        },
        formatReturnTime() {
            return this.rideInfo.returnTime
                ? '返回: ' + moment(this.rideInfo.returnTime).format('YYYY-MM-DD HH:mm')
                : '返回时间未设置';
        },
        trimmedDescription() {
            const maxLength = 50;
            return this.rideInfo.description.length > maxLength
                ? this.rideInfo.description.substring(0, maxLength) + '...'
                : this.rideInfo.description;
        },
        requestTypeSeatingInfo() {
            if (this.rideInfo.requestType === 0) {
                return `可用座位：${this.rideInfo.seats || 0}个`;
            } else if (this.rideInfo.requestType === 1) {
                return `需要座位：${this.rideInfo.seats || 0}个`;
            }
            return '';
        },
    },
    methods: {
        // 获取发布用户头像，昵称，是否为学生
        async fetchPostUserInfo() {
            requestAPI({
                path: '/user/getUserInfo',
                type: 'GET',
                header: { 'user-wx-openid': this.rideInfo.openId },
            })
                .then((response) => {
                    if (response.data.status === 100) {
                        this.postUserInfo = response.data.data;

                        if (this.postUserInfo.avatarUrl) {
                            this.posterUserAvatarToDisplay = this.postUserInfo.avatarUrl;
                        } else if (this.postUserInfo.avatar !== undefined && this.postUserInfo.avatar !== '') {
                            this.posterUserAvatarToDisplay =
                                'https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/' +
                                this.postUserInfo.avatar +
                                '.jpg';
                        } else {
                            this.posterUserAvatarToDisplay = defaultAvatarUrl;
                        }
                    } else {
                        console.warn('获取发布用户信息失败:', response.data.message);
                    }
                })
                .catch((error) => {
                    console.error('获取发布用户信息出错:', error);
                });
        },

        // 生成发布时间文字
        getPublishedTimeText() {
            let publishedTime = this.rideInfo.publishedTime;
            let removedTime = this.rideInfo.removedTime;

            if (!publishedTime) {
                if (!removedTime) {
                    return '已过期';
                }
                return '发布时间未知';
            }
            //console.log("publishedTime is: " + publishedTime);

            // 发布时间戳是以UTC的TimeStamp存储
            const publishedDate = new Date(publishedTime).getTime();
            const now = new Date().getTime();

            const diffInSeconds = Math.floor((now - publishedDate) / 1000);
            const diffInMinutes = Math.floor(diffInSeconds / 60);
            const diffInHours = Math.floor(diffInMinutes / 60);
            const diffInDays = Math.floor(diffInHours / 24);
            const diffInMonths = Math.floor(diffInDays / 30);
            const diffInYears = Math.floor(diffInDays / 365);

            if (diffInMinutes < 5) {
                return '刚刚';
            } else if (diffInMinutes < 60) {
                return `${diffInMinutes} 分钟前`;
            } else if (diffInHours < 24) {
                return `${diffInHours} 小时前`;
            } else if (diffInDays < 30) {
                return `${diffInDays} 天前`;
            } else if (diffInMonths < 12) {
                return `${diffInMonths} 个月前`;
            } else {
                return `${diffInYears} 年前`;
            }
        },

        // 跳转到详情页
        toRideDetail() {
            uni.navigateTo({
                url: `/pages/ride/rideDetail?rideId=${this.rideInfo.rideId}`,
            });
        },
    },
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
		width: 380px;
		min-height: 70px;
		align-items: stretch;
		padding-top: 5px;
		padding-bottom: 5px;
		padding-left: 5px;
		padding-right: 5px;
		border-radius: 8px;
		box-shadow: 0 4px 24px 0 rgba(0,0,0,0.18), 0 1.5px 6px 0 rgba(0,0,0,0.12);
	}
	.image-box {
		width: 30vw;
		height: 40vw;
		align-items: center;
		justify-content: center;
		overflow: hidden;
        padding-top: 1px;
		margin-right: 5px;
		border-radius: 8px;
		display: inline-block;
	}
	.content-box {
		width: 68%;
		padding: 2px 5px;
		display: flex;
		flex-direction: column;
		gap: 2px;
		font-size: 12px;
	}
	.title-box,
	.time-box,
	.price-box,
	.description-box,
	.publish-info-box {
		margin-bottom: 1px;
		padding: 1px 2px;
		font-size: 12px;
	}
	.title-box {
		display: flex;
		gap: 5px;
	}
	.tag {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #9b0000;
		color: white;
		padding: 2px 6px;
		border-radius: 4px;
		font-size: 11px;
		white-space: nowrap;
	}
	.ride-title {
		font-size: 15px;
		font-weight: bold;
		word-break: break-word;
		color: #333;
	}
	.time-box {
		display: flex;
		flex-direction: column;
		gap: 2px;
		font-size: 13px;
		color: #666;
		background-color: #f8f8f8;
		padding: 5px 8px;
		border-radius: 6px;
	}
	.price-box {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 13px;
		background-color: #fff5f5;
		padding: 5px 8px;
		border-radius: 6px;
	}
	.price {
		color: #9b0000;
		font-weight: 500;
	}
	.separator {
		color: #ddd;
	}
	.seating-info {
		font-size: 13px;
		color: #333;
	}
	.description-box {
		font-size: 13px;
		color: #666;
		word-break: break-word;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		background-color: #f8f8f8;
		padding: 5px 8px;
		border-radius: 6px;
	}
	.publish-info-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: auto;
		font-size: 11px;
		color: #999;
		padding-top: 6px;
		border-top: 1px solid #eee;
	}
	.user-info {
		display: flex;
		align-items: center;
		gap: 5px;
	}
	.avatar {
		width: 22px;
		height: 22px;
		border-radius: 50%;
		border: 1px solid #eee;
	}
	.avatar-tag {
		width: 14px;
		height: 14px;
	}
	.nickname {
		max-width: 100px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.publish-time {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>