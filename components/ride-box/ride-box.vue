<template>
    <view class="ride-box row-container" @click="toRideDetail">
        <!-- 顺风车box左侧图片 -->
        <view class="image-box">
            <u--image
                :src="this.rideInfo.images && this.rideInfo.images.length > 0 ? this.rideInfo.images[0] : defaultRideImage"
                mode="widthFix"
                height="80%"
                width="30vw"
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
            let responseData = '';

            requestAPI({
                path: '/user/getUserInfo',
                type: 'GET',
                header: { 'x-wx-openid': this.rideInfo.openId },
            })
                .then((response) => {
                    if (response.data.status === 100) {
                        this.postUserInfo = response.data.data;
                        // console.log(this.postUserInfo);

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
    position: relative;
}
.avatar-tag {
    position: absolute;
    margin-top: 20px;
    left: -1px;
    width: 15%;
    height: 10%;
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
