<template>
    <view class="ride-detail">
        <!-- 图片轮播展示 -->
        <swiper class="swiper" indicator-dots>
            <swiper-item
                v-for="(image, index) in imagesToDisplay"
                :key="index"
                @click="previewImage(index)"
                style="display: flex; align-items: center; justify-content: center; height: 200px"
            >
                <image mode="aspectFit" :src="image" style="width: 100%; height: 100%" />
            </swiper-item>
        </swiper>

        <!-- 顺风车标签 -->
        <view class="row-container tag-box">
            <view class="tag" v-for="(tag, index) in rideTags" :key="index">{{ tag }}</view>
        </view>

        <view class="time-info">
            <view v-if="rideInfo.rideType === 0">
                <!-- 单程 -->
                <view class="time-row">
                    {{ formatDepartureTime }}
                </view>
                <view v-if="rideInfo.estimatedArrivalTime" class="time-row">
                    {{ formatEstimatedArrivalTime }}
                </view>
            </view>
            <view v-else-if="rideInfo.rideType === 1">
                <!-- 往返 -->
                <view class="time-row">
                    {{ formatDepartureTime }}
                </view>
                <view v-if="rideInfo.returnTime" class="time-row">
                    {{ formatReturnTime }}
                </view>
            </view>
        </view>

        <!-- 顺风车标题 -->
        <view class="ride-title">
            {{ rideInfo.origin }} {{ rideInfo.rideType === 1 ? '↔' : '→' }} {{ rideInfo.destination }}
        </view>

        <!-- 顺风车价格 -->
        <view class="price-box">
            <view class="price"> ${{ rideInfo.price }}/每人每程 </view>
            <text class="divider">|</text>
            <text class="seats-info">
                {{ rideInfo.requestType === 0 ? `可出${rideInfo.seats}个座位` : `需要${rideInfo.seats}个座位` }}
            </text>
        </view>

        <!-- 车辆信息 -->
        <view class="vehicle-info" v-if="rideInfo.make || rideInfo.model">
            车辆信息：{{ rideInfo.make }}{{ rideInfo.model ? '，' + rideInfo.model : '' }}
        </view>

        <!-- 联系信息 -->
        <view class="contact">
            <view class="contact-box">
                <img class="avatar" :src="avatarUrlToDisplay" />
                <img
                    class="avatar-tag"
                    v-if="userInfo.isStudent"
                    src="https://prod-9gip97mx4bfa32a3-1312104819.tcloudbaseapp.com/Member/%E5%AD%A6%E7%94%9F%E8%AE%A4%E8%AF%81tag.png?sign=b0d927e7bf08e282b9096cf1cccb0aae&t=1737229263"
                />
                <text class="nickname">{{ userInfo.nickname }}</text>
            </view>
            <view class="contact-details">
                <view class="contact-row" v-if="rideInfo.contactInfo?.weChatId">
                    <text>微信号：{{ rideInfo.contactInfo.weChatId }}</text>
                    <view class="copy-box" @click="copyToClipboard(rideInfo.contactInfo.weChatId)">
                        <text>复制</text>
                        <img class="copy-img" src="/static/fuzhi.png" />
                    </view>
                </view>
                <view class="contact-row" v-if="rideInfo.contactInfo?.phoneNumber">
                    <text>电话：{{ rideInfo.contactInfo.phoneNumber }}</text>
                    <view class="copy-box" @click="copyToClipboard(rideInfo.contactInfo.phoneNumber)">
                        <text>复制</text>
                        <img class="copy-img" src="/static/fuzhi.png" />
                    </view>
                </view>
                <view class="contact-row" v-if="rideInfo.contactInfo?.email">
                    <text>邮箱：{{ rideInfo.contactInfo.email }}</text>
                    <view class="copy-box" @click="copyToClipboard(rideInfo.contactInfo.email)">
                        <text>复制</text>
                        <img class="copy-img" src="/static/fuzhi.png" />
                    </view>
                </view>
            </view>
        </view>

        <!-- 顺风车描述 -->
        <view class="description">
            {{ rideInfo.description }}
        </view>
    </view>
</template>

<script>
import moment from 'moment/min/moment-with-locales';
import 'moment/locale/zh-cn';
import requestAPI from '@/api/request.js';

export default {
    data() {
        return {
            rideInfo: {}, // 顺风车详细信息
            userInfo: {
                avatarUrl: '', // 发布用户头像
                nickname: '', // 发布用户昵称
                isStudent: 0, // 发布用户是否为学生
            },
            avatarUrlToDisplay: '', // 发布用户用于展示的头像url
            defaultImage:
                'https://prod-9gip97mx4bfa32a3-1312104819.tcloudbaseapp.com/ride/%E9%A1%BA%E9%A3%8E%E8%BD%A6%E9%BB%98%E8%AE%A4%E5%9B%BE%E7%89%87.jpg?sign=874f9cb0c12322055162c92ea77fa0f3&t=1732836080', // 默认图片
            defaultAvatarUrl:
                'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
            requestTypeConstrainValue: ['出顺风车', '求顺风车'], // 顺风车标签类型
            rideTypeConstrainValue: ['单程', '往返'], // 顺风车类型
        };
    },
    computed: {
        // 标签内容
        rideTags() {
            const tags = [];
            if (this.rideInfo.requestType !== undefined && this.rideInfo.requestType !== null) {
                tags.push(this.requestTypeConstrainValue[this.rideInfo.requestType]);
            }

            if (this.rideInfo.rideType !== undefined && this.rideInfo.rideType !== null) {
                tags.push(this.rideTypeConstrainValue[this.rideInfo.rideType]);
            }
            return tags;
        },
        // 要展示的图片数组
        imagesToDisplay() {
            return this.rideInfo.images && this.rideInfo.images.length > 0 ? this.rideInfo.images : [this.defaultImage];
        },
        // 出发时间格式化
        formatDepartureTime() {
            return '预计出发: ' + moment(this.rideInfo.departureTime).format('YYYY-MM-DD HH:mm');
        },
        // 预计到达时间格式化
        formatEstimatedArrivalTime() {
            return '预计到达: ' + moment(this.rideInfo.estimatedArrivalTime).format('YYYY-MM-DD HH:mm');
        },
        // 返回时间格式化
        formatReturnTime() {
            return this.rideInfo.returnTime
                ? '返回: ' + moment(this.rideInfo.returnTime).format('YYYY-MM-DD HH:mm')
                : '返回时间未设置';
        },
    },
    async onLoad(options) {
        const rideId = options.rideId; // 从 URL 参数获取 rideId
        await this.fetchRideInfo(rideId);
        this.fetchPostUserInfo();
    },
    onShareTimeline() {
        // 根据 rideInfo.requestType 和 rideInfo.rideType 动态生成标题
        const rideTypeText = this.rideInfo.rideType === 0 ? '至' : '往返';
        const requestTypeText = this.rideInfo.requestType === 0 ? '出顺风车' : '求顺风车';

        // 格式化出发和返回日期
        const formattedDepartureTime = moment(this.rideInfo.departureTime).format('YYYY-MM-DD');
        const formattedReturnTime =
            this.rideInfo.rideType === 1 && this.rideInfo.returnTime
                ? `${moment(this.rideInfo.returnTime).format('YYYY-MM-DD')} 返回`
                : '';

        // 动态生成标题
        const displayedTitle = `【${requestTypeText}】从 ${this.rideInfo.origin} ${rideTypeText} ${this.rideInfo.destination}  ${formattedDepartureTime} 出发${formattedReturnTime}`;

        // 判断图片来源：有图片用第一张，否则用默认图片
        const displayedImageUrl =
            this.rideInfo.images && this.rideInfo.images.length > 0 ? this.rideInfo.images[0] : this.defaultImage;

        return {
            title: displayedTitle,
            imageUrl: displayedImageUrl,
            path: `/pages/ride/rideDetail?rideId=${this.rideInfo.rideId}`,
        };
    },
    onShareAppMessage(res) {
        // 根据 rideInfo.requestType 和 rideInfo.rideType 动态生成标题
        const rideTypeText = this.rideInfo.rideType === 0 ? '至' : '往返';
        const requestTypeText = this.rideInfo.requestType === 0 ? '出顺风车' : '求顺风车';

        // 格式化出发和返回日期
        const formattedDepartureTime = moment(this.rideInfo.departureTime).format('YYYY-MM-DD');
        const formattedReturnTime =
            this.rideInfo.rideType === 1 && this.rideInfo.returnTime
                ? `${moment(this.rideInfo.returnTime).format('YYYY-MM-DD')} 返回`
                : '';

        // 动态生成标题
        const displayedTitle = `【${requestTypeText}】从 ${this.rideInfo.origin} ${rideTypeText} ${this.rideInfo.destination}  ${formattedDepartureTime} 出发${formattedReturnTime}`;

        // 判断图片来源：有图片用第一张，否则用默认图片
        const displayedImageUrl =
            this.rideInfo.images && this.rideInfo.images.length > 0 ? this.rideInfo.images[0] : this.defaultImage;

        return {
            title: displayedTitle,
            desc: 'CSSA顺风车分享平台',
            content: this.rideInfo.description,
            imageUrl: displayedImageUrl,
            path: `/pages/ride/rideDetail?rideId=${this.rideInfo.rideId}`,
        };
    },
    methods: {
        // 获取顺风车详情
        async fetchRideInfo(rideId) {
            const opts = {
                path: `/ride/getRide?rideId=${rideId}`,
                type: 'GET',
            };
            await requestAPI(opts)
                .then((res) => {
                    if (res.data.status === 100) {
                        this.rideInfo = res.data.data;
                    } else {
                        uni.showToast({
                            title: '加载顺风车信息失败',
                            icon: 'none',
                        });
                    }
                })
                .catch((error) => {
                    console.error('获取顺风车信息失败：', error);
                    uni.showToast({
                        title: '网络错误，请稍后重试',
                        icon: 'none',
                    });
                });
        },
        // 获取发布用户信息
        async fetchPostUserInfo() {
            await requestAPI({
                path: '/user/getUserInfo',
                type: 'GET',
                header: { 'user-wx-openid': this.rideInfo.openId },
            })
                .then((response) => {
                    if (response.data.status === 100) {
                        this.userInfo = response.data.data;

                        if (this.userInfo.avatarUrl) {
                            this.avatarUrlToDisplay = this.userInfo.avatarUrl;
                        } else if (this.userInfo.avatar !== undefined && this.userInfo.avatar !== '') {
                            this.avatarUrlToDisplay =
                                'https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/' +
                                this.userInfo.avatar +
                                '.jpg';
                        } else {
                            this.avatarUrlToDisplay = this.defaultAvatarUrl;
                        }
                    } else {
                        console.warn('获取发布用户信息失败:', response.data.message);
                        this.userInfo.nickname = '匿名';
                        this.avatarUrlToDisplay = this.defaultAvatarUrl;
                    }
                })
                .catch((error) => {
                    console.error('获取发布用户信息出错:', error);
                    this.userInfo.nickname = '匿名';
                    this.avatarUrlToDisplay = this.defaultAvatarUrl;
                });
        },
        // 图片预览功能
        previewImage(index) {
            uni.previewImage({
                current: this.imagesToDisplay[index],
                urls: this.imagesToDisplay,
            });
        },
        // 复制到剪贴板
        copyToClipboard(data) {
            uni.setClipboardData({
                data,
                success: () => {
                    uni.showToast({
                        icon: 'none',
                        title: '已复制到剪贴板',
                    });
                },
                fail: () => {
                    uni.showToast({
                        icon: 'none',
                        title: '复制失败，请重试',
                    });
                },
            });
        },
    },
};
</script>

<style>
	.ride-detail {
		background-color: #f9f9f9;
		padding: 20px;
		overflow-x: hidden;
	}

	.swiper {
		height: 200px;
		margin-bottom: 20px;
		border-radius: 12px;
		overflow: hidden;
	}

	.tag-box {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-bottom: 15px;
	}

	.tag {
		display: inline-block;
		padding: 4px 12px;
		font-size: 14px;
		background-color: #9b0000;
		color: white;
		border-radius: 6px;
	}

	.time-info {
		background-color: #f8f8f8;
		padding: 12px 15px;
		border-radius: 8px;
		margin-bottom: 15px;
	}

	.time-row {
		font-size: 15px;
		color: #666;
		line-height: 1.5;
	}

	.ride-title {
		font-size: 18px;
		font-weight: bold;
		margin-bottom: 15px;
		color: #333;
	}

	.price-box {
		background-color: #fff5f5;
		padding: 12px 15px;
		border-radius: 8px;
		margin-bottom: 15px;
		display: flex;
		align-items: center;
	}

	.price {
		font-size: 16px;
		color: #9b0000;
		font-weight: 500;
	}

	.divider {
		margin: 0 10px;
		color: #ddd;
	}

	.seats-info {
		font-size: 15px;
		color: #333;
	}

	.vehicle-info {
		background-color: #f8f8f8;
		padding: 12px 15px;
		border-radius: 8px;
		margin-bottom: 15px;
		font-size: 14px;
		color: #666;
	}

	.contact {
		background-color: white;
		padding: 15px;
		border-radius: 8px;
		margin-bottom: 15px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	}

	.contact-box {
		display: flex;
		align-items: center;
		margin-bottom: 15px;
	}

	.avatar {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin-right: 12px;
		border: 1px solid #eee;
	}

	.avatar-tag {
		position: absolute;
		width: 16px;
		height: 16px;
		margin-top: 35px;
		margin-left: -12px;
	}

	.nickname {
		font-size: 16px;
		font-weight: 500;
		color: #333;
	}

	.contact-details {
		padding-top: 10px;
		border-top: 1px solid #eee;
	}

	.contact-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
		font-size: 14px;
		color: #666;
	}

	.copy-box {
		display: flex;
		align-items: center;
		gap: 5px;
		color: #999;
		font-size: 12px;
	}

	.copy-img {
		width: 16px;
		height: 16px;
	}

	.description {
		background-color: #f8f8f8;
		padding: 15px;
		border-radius: 8px;
		font-size: 14px;
		line-height: 1.6;
		color: #333;
		white-space: pre-wrap;
	}
</style>