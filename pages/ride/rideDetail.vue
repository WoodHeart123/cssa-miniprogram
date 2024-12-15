<template>
    <view class="ride-detail">
        <!-- 图片轮播展示 -->
        <swiper class="swiper" indicator-dots>
            <swiper-item
                v-for="(image, index) in imagesToDisplay"
                :key="index"
                @click="previewImage(index)"
                style="display: flex; align-items: center; justify-content: center; height: 200px;"
            >
                <image mode="aspectFit" :src="image" style="width: 100%; height: 100%;" />
            </swiper-item>
        </swiper>

        <!-- 顺风车标签 -->
        <view class="row-container tag-box">
            <view class="tag" v-for="(tag, index) in rideTags" :key="index">{{ tag }}</view>
        </view>

		<!-- 顺风车标题 -->
		<view class="ride-title">
            {{ rideInfo.origin }} {{ rideInfo.rideType === 1 ? '↔' : '→' }} {{ rideInfo.destination }}
        </view>

        <!-- 顺风车价格 -->
        <view class="price-box">
            <view class="price">
                ${{ rideInfo.price }}/每人每程
            </view>
			<text class="divider">|</text>
            <text class="seats-info">
                {{ rideInfo.requestType === 0 ? `可出${rideInfo.availableSeats}个座位` : `需要${rideInfo.requestedSeats}个座位` }}
            </text>
        </view>

        <!-- 车辆信息 -->
        <view class="vehicle-info" v-if="rideInfo.make || rideInfo.model">
            车辆信息：{{ rideInfo.make }}{{ rideInfo.model ? '，' + rideInfo.model : '' }}
        </view>

        <!-- 联系信息 -->
        <view class="contact">
            <view class="contact-box">
                <img class="avatar" :src="userInfo.avatarUrl" />
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
import requestAPI from "@/api/request.js";

export default {
    data() {
        return {
            rideInfo: {}, // 顺风车详细信息
            userInfo: {
                avatarUrl: "", // 发布用户头像
                nickname: "", // 发布用户昵称
				isStudent: 0 // 发布用户是否为学生 
            },
            defaultImage:
                "https://prod-9gip97mx4bfa32a3-1312104819.tcloudbaseapp.com/ride/%E9%A1%BA%E9%A3%8E%E8%BD%A6%E9%BB%98%E8%AE%A4%E5%9B%BE%E7%89%87.jpg?sign=874f9cb0c12322055162c92ea77fa0f3&t=1732836080", // 默认图片
            requestTypeConstrainValue: ["出顺风车", "求顺风车"], // 顺风车标签类型
            rideTypeConstrainValue: ["单程", "往返"], // 顺风车类型
        };
    },
    computed: {
        // 标签内容
        rideTags() {
            const tags = [];
            if (this.rideInfo.requestType) {
                tags.push(this.requestTypeConstrainValue[this.rideInfo.requestType]);
            }
            if (this.rideInfo.rideType) {
                tags.push(this.rideTypeConstrainValue[this.rideInfo.rideType]);
            }
            return tags;
        },
        // 要展示的图片数组
        imagesToDisplay() {
            return this.rideInfo.images && this.rideInfo.images.length > 0
                ? this.rideInfo.images
                : [this.defaultImage];
        },
    },
    onLoad(options) {
        const rideId = options.rideId; // 从 URL 参数获取 rideId
        this.fetchRideInfo(rideId);
        this.fetchPostUserInfo();
    },
    methods: {
        // 获取顺风车详情
        fetchRideInfo(rideId) {
            const opts = {
                path: `/ride/getRide?rideId=${rideId}`,
                type: "GET",
            };
            requestAPI(opts)
                .then((res) => {
                    if (res.data.status === 100) {
                        this.rideInfo = res.data.data;
                    } else {
                        uni.showToast({
                            title: "加载顺风车信息失败",
                            icon: "none",
                        });
                    }
                })
                .catch((error) => {
                    console.error("获取顺风车信息失败：", error);
                    uni.showToast({
                        title: "网络错误，请稍后重试",
                        icon: "none",
                    });
                });
        },
        // 获取发布用户信息
        fetchPostUserInfo() {
            const opts = {
                path: "/user/getUserInfo",
                type: "GET",
                header: {
                    "x-wx-openid": this.rideInfo.openId,
                },
            };
            requestAPI(opts)
                .then((res) => {
                    if (res.data.status === 100) {
                        this.userInfo = res.data.data;
                    } else {
                        console.warn("获取用户信息失败：", res.data.message);
                        this.userInfo.nickname = "匿名";
                        this.userInfo.avatarUrl =
                            "https://prod-9gip97mx4bfa32a3-1312104819.tcloudbaseapp.com/default-avatar.png";
                    }
                })
                .catch((error) => {
                    console.error("获取用户信息失败：", error);
                    this.userInfo.nickname = "匿名";
                    this.userInfo.avatarUrl =
                        "https://prod-9gip97mx4bfa32a3-1312104819.tcloudbaseapp.com/default-avatar.png";
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
                        icon: "none",
                        title: "已复制到剪贴板",
                    });
                },
                fail: () => {
                    uni.showToast({
                        icon: "none",
                        title: "复制失败，请重试",
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
}
.swiper {
    height: 200px;
    margin-bottom: 20px;
}
.tag-box {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 10px;
}
.tag {
    display: inline-block;
    padding: 5px 10px;
    font-size: 14px;
    background-color: #f8d7da;
    color: black;
    border-radius: 5px;
}
.price-box {
    font-size: 16px;
    color: #9b0000;
    font-weight: bold;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}
.price-box .divider {
    margin: 0 8px;
    font-size: 16px;
    color: black;
}
.price-box .seats-info {
    font-size: 16px;
    color: black;
}
.ride-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 8px;
}
.vehicle-info {
    font-size: 14px;
    color: gray;
    margin-bottom: 10px;
}
.contact {
    position: relative;
    box-shadow: 0 0px 6px 1px rgba(165, 165, 165, 0.2);
    border-radius: 5px;
    padding: 10px 0;
}
.contact-box {
    display: flex;
    align-items: center;
}
.avatar {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin-right: 15px;
}
.nickname {
    flex: 1;
    font-size: 16px;
    font-weight: 500;
}
.contact-details {
    margin-top: 10px;
	margin-left: 2px;
    font-size: 14px;
    color: dimgray;
}
.contact-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}
.copy-box {
    display: flex;
    align-items: center;
    font-size: 12px;
	margin-right: 2px;
    color: #999;
}
.copy-img {
    width: 20px;
    height: 20px;
    margin-left: 5px;
}
.description {
    margin-top: 20px;
    font-size: 14px;
    line-height: 1.5;
    color: #333;
}
</style>
