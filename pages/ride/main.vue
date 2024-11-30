<template>
    <view id="ride-main">
        <view class="row-container filter-box">
            <!-- 出发日期筛选 -->
            <view class="row-container filter-item" @click="popFilter('departureDate')">
                <view class="filter-tag">出发日期：</view>
                <view class="filter-value">{{ filter.departureDate || "不限" }}</view>
            </view>

            <!-- 回程日期筛选 -->
            <view class="row-container filter-item" @click="popFilter('returnDate')">
                <view class="filter-tag">回程日期：</view>
                <view class="filter-value">{{ filter.returnDate || "不限" }}</view>
            </view>

            <!-- 始发地筛选 -->
            <view class="row-container filter-item" @click="popFilter('origin')">
                <view class="filter-tag">始发地：</view>
                <view class="filter-value">{{ filter.origin || "不限" }}</view>
            </view>

            <!-- 目的地筛选 -->
            <view class="row-container filter-item" @click="popFilter('destination')">
                <view class="filter-tag">目的地：</view>
                <view class="filter-value">{{ filter.destination || "不限" }}</view>
            </view>
        </view>

        <scroll-view
            scroll-y="true"
            show-scrollbar="true"
            refresher-enabled="true"
            class="column-container ride-scroll"
            refresher-background="white"
            @refresherrefresh="refresh"
            enable-back-to-top="true"
            :refresher-triggered="triggered"
            @scrolltolower="onScrollLower"
        >
            <!-- 顺风车信息列表 -->
            <view class="ride-box-container" v-for="(rideInfo, index) in filteredRideList" :key="index">
                <rideBoxVue :rideInfo="rideInfo" @rideClick="toRideDetail"></rideBoxVue>
            </view>

            <!-- 加载更多提示 -->
            <uni-load-more :content-text="contentText" :status="status">
                <view v-if="status === 'noMore'" class="no-more-container">
                    <text class="no-more-line">没有更多顺风车信息</text>
                    <text class="no-more-line">我们只会显示出发时间或者返回时间不晚于当前CST时间的顺风车信息。</text>
                </view>
            </uni-load-more>
            <view style="height: 100px;"></view>
        </scroll-view>

        <!-- 发布顺风车按钮 -->
        <uni-fab :pattern="pattern" horizontal="right" vertical="bottom" popMene="false" @fabClick="toPostRide" />

        <!-- 筛选弹窗 -->
        <uni-popup ref="filter" type="bottom" background-color="#fff" :safeArea="safeArea" @maskClick="maskClick">
            <view class="column-container filter-popup">
                <view v-if="currentFilter === 'departureDate'">
                    <uni-datetime-picker v-model="filter.departureDate" type="date" :start="startDate" :end="endDate" />
                </view>
                <view v-if="currentFilter === 'returnDate'">
                    <uni-datetime-picker v-model="filter.returnDate" type="date" :start="startDate" :end="endDate" />
                </view>
                <view v-if="currentFilter === 'origin'">
                    <uni-easyinput v-model="filter.origin" placeholder="输入始发地" />
                </view>
                <view v-if="currentFilter === 'destination'">
                    <uni-easyinput v-model="filter.destination" placeholder="输入目的地" />
                </view>
                <view class="pop-button-box">
                    <button class="pop-button" @click="onClickSearch">搜索</button>
                </view>
            </view>
        </uni-popup>
    </view>
</template>

<script>
    import moment from "moment";
    import requestAPI from "@/api/request.js";
    import rideBoxVue from "@/components/ride-box/ride-box.vue";

    export default {
        components: {
            rideBoxVue
        },
        data() {
            return {
                filter: {
                    departureDate: "", // 出发日期
                    returnDate: "", // 回程日期
                    origin: "", // 始发地
                    destination: "" // 目的地
                },
                currentFilter: "", // 当前激活的筛选条件
                startDate: moment().format("YYYY-MM-DD"), // 筛选日期开始范围
                endDate: moment().add(1, "year").format("YYYY-MM-DD"), // 筛选日期结束范围
                offset: 0, // 当前数据偏移量
                limit: 20, // 每次加载的数据数量
                rideList: [], // 全部顺风车信息列表
                triggered: false, // 下拉刷新触发状态
                status: "loading", // 加载状态
                pattern: {
                    buttonColor: "#9b0000"
                },
                isLogin: false, // 用户是否已登录
                contentText: {
                    contentdown: "上拉显示更多",
                    contentrefresh: "正在加载...",
                    contentnomore: "没有更多顺风车信息"
                }
            };
        },
        computed: {
            // 前端筛选后的顺风车列表
            filteredRideList() {
                return this.rideList.filter(ride => {
                    const departureDateMatch =
                        !this.filter.departureDate ||
                        moment(ride.departureTime).isSame(moment(this.filter.departureDate), "day");
                    const returnDateMatch =
                        !this.filter.returnDate ||
                        (ride.returnTime && moment(ride.returnTime).isSame(moment(this.filter.returnDate), "day"));
                    const originMatch =
                        !this.filter.origin || ride.origin.toLowerCase().includes(this.filter.origin.toLowerCase());
                    const destinationMatch =
                        !this.filter.destination ||
                        ride.destination.toLowerCase().includes(this.filter.destination.toLowerCase());

                    return departureDateMatch && returnDateMatch && originMatch && destinationMatch;
                });
            }
        },
        onLoad() {
            // 初始化时加载数据并检查登录状态
            this.refresh();
            uni.getStorage({
                key: "userInfo",
                success: () => {
                    this.isLogin = true;
                },
                fail: () => {
                    this.isLogin = false;
                }
            });
        },
        onShow() {
            // 页面重新显示时刷新数据
            this.refresh();
        },
        methods: {
            toRideDetail(rideId) {
                uni.navigateTo({
                    url: "/pages/ride/rideDetail?rideId=${rideId}"
                });
            },
            popFilter(type) {
                this.currentFilter = type;
                this.$refs.filter.open();
            },
            maskClick() {
                this.$refs.filter.close();
            },
            onClickSearch() {
                this.$refs.filter.close();
            },
            refresh() {
                if (!this.triggered) {
                    this.triggered = true;
                    this.offset = 0;
                    this.rideList = [];
                    this.status = "loading";
                    this.getRideList();
                }
            },
            getRideList() {
                const opts = {
                    path: `/ride/getRideList?offset=${this.offset}&limit=${this.limit}`,
                    type: 'GET'
                };
                requestAPI(opts)
                    .then(res => {
                        if (res.data.status === 100) {
                            this.rideList = this.rideList.concat(res.data.data);
                            this.offset += res.data.data.length;
                            this.status = res.data.data.length !== this.limit ? "noMore" : "more";
                        } else {
                            uni.showToast({
                                title: "加载失败，请稍后重试",
                                icon: "none"
                            });
                        }
                        this.triggered = false;
                    })
                    .catch(error => {
                        console.error("Failed to fetch ride list:", error);
                        this.triggered = false;
                        uni.showToast({
                            title: "网络错误，请稍后重试",
                            icon: "none"
                        });
                    });
            },
            onScrollLower() {
                if (this.status === "loading" || this.status === "noMore") {
                    return;
                }
                this.status = "loading";
                this.getRideList();
            }
        }
    };
</script>

<style>
    #ride-main {
        position: absolute;
        width: 100vw;
        height: 100vh;
        top: 0;
        background-color: white;
        scroll-y: false;
    }

    .column-container {
        display: flex;
        flex-direction: column;
    }

    .row-container {
        display: flex;
        flex-direction: row;
    }

    .filter-box {
        padding-top: 2px;
        position: relative;
        height: 42px;
        width: 100%;
        overflow-y: scroll;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.9);
        box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 5px;
        box-sizing: border-box;
        flex-shrink: 0 !important;
    }

    .filter-item {
        border: 0.5px solid rgb(111, 111, 111, 0.2);
        background-color: rgba(22, 132, 253, 0.05);
        margin: 0 7px 0 7px;
        border-radius: 15px;
        padding: 0 8px 0 8px;
        font-size: 14px;
    }

    .ride-box-container {
        width: 100vw;
        height: 160px;
        margin-bottom: 10px;
    }

    .ride-scroll {
        height: calc(100vh - 92px);
        width: 100%;
        background-color: white;
        overflow-y: scroll;
    }

    .no-more-container {
        display: flex;
        flex-direction: column;
        align-items: center; /* 水平居中 */
        justify-content: center; /* 垂直居中 */
        width: 100%;
        padding: 20px 0;
    }

    .no-more-line {
        font-size: 14px;
        color: #666;
        text-align: center; /* 居中对齐 */
        line-height: 1.5;
    }
</style>