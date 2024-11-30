<template>
    <view id="ride-main">
        <!-- 顶部筛选按钮 -->
        <view class="filter-header">
            <text class="filter-text" @click="openFilterPopup">筛选</text>
        </view>

        <!-- 顺风车信息列表 -->
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
            <!-- 顺风车卡片 -->
            <view class="ride-box-container" v-for="(rideInfo, index) in filteredRideList" :key="index">
                <rideBoxVue :rideInfo="rideInfo" @rideClick="toRideDetail"></rideBoxVue>
            </view>

            <!-- 加载状态 -->
            <uni-load-more :content-text="contentText" :status="status"></uni-load-more>
            <view style="height: 100px;"></view>
        </scroll-view>

        <!-- 发布顺风车按钮 -->
        <uni-fab :pattern="fabPattern" horizontal="right" vertical="bottom" popMenu="false" @fabClick="toPostRide" />

        <!-- 筛选弹窗 -->
        <uni-popup ref="filterPopup" type="left" background-color="#fff">
            <view class="filter-popup">
                <view class="filter-title">筛选条件</view>

                <!-- 筛选项 -->
                <view class="filter-item">
                    <text>请求类型：</text>
                    <uni-segmented-control v-model="filter.requestType" :values="['不限', '出顺风车', '求顺风车']" />
                </view>
                <view class="filter-item">
                    <text>顺风车类型：</text>
                    <uni-segmented-control v-model="filter.rideType" :values="['不限', '单程', '往返']" />
                </view>
                <view class="filter-item">
                    <text>出发日期：</text>
                    <uni-datetime-picker v-model="filter.departureDate" type="date" :start="startDate" :end="endDate" />
                </view>
                <view class="filter-item" v-if="filter.rideType === '往返'">
                    <text>返回日期：</text>
                    <uni-datetime-picker v-model="filter.returnDate" type="date" :start="startDate" :end="endDate" />
                </view>
                <view class="filter-item">
                    <text>始发地：</text>
                    <uni-easyinput v-model="filter.origin" placeholder="输入始发地" />
                </view>
                <view class="filter-item">
                    <text>目的地：</text>
                    <uni-easyinput v-model="filter.destination" placeholder="输入目的地" />
                </view>

                <!-- 操作按钮 -->
                <view class="filter-buttons">
                    <button class="confirm-button" @click="applyFilters">确定</button>
                    <button class="reset-button" @click="resetFilters">重置</button>
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
        components: { rideBoxVue },
        data() {
            return {
                filter: {
                    requestType: "不限", // 默认值为“不限”
                    rideType: "不限", // 默认值为“不限”
                    departureDate: "", // 出发日期
                    returnDate: "", // 返回日期
                    origin: "", // 始发地
                    destination: "" // 目的地
                },
                startDate: moment().format("YYYY-MM-DD"), // 日期范围开始
                endDate: moment().add(1, "year").format("YYYY-MM-DD"), // 日期范围结束
                offset: 0, // 当前数据偏移量
                limit: 20, // 每次加载的数据数量
                rideList: [], // 全部顺风车列表
                triggered: false,
                status: "loading",
                contentText: {
                    contentdown: "上拉显示更多",
                    contentrefresh: "正在加载...",
                    contentnomore: "没有更多顺风车信息"
                },
                fabPattern: {
                    buttonColor: "#9b0000"
                }
            };
        },
        computed: {
            filteredRideList() {
                return this.rideList.filter(ride => {
                    // 修复 requestType 筛选逻辑
                    const requestTypeMatch =
                        this.filter.requestType === "不限" ||
                        ride.requestType === (this.filter.requestType === "出顺风车" ? 1 : 2);
            
                    // 修复 rideType 筛选逻辑
                    const rideTypeMatch =
                        this.filter.rideType === "不限" ||
                        ride.rideType === (this.filter.rideType === "单程" ? 1 : 2);
            
                    const departureDateMatch =
                        !this.filter.departureDate ||
                        moment(ride.departureTime).isSame(this.filter.departureDate, "day");
            
                    const returnDateMatch =
                        !this.filter.returnDate ||
                        moment(ride.returnTime).isSame(this.filter.returnDate, "day");
            
                    const originMatch =
                        !this.filter.origin || ride.origin.includes(this.filter.origin);
            
                    const destinationMatch =
                        !this.filter.destination || ride.destination.includes(this.filter.destination);
            
                    return (
                        requestTypeMatch &&
                        rideTypeMatch &&
                        departureDateMatch &&
                        returnDateMatch &&
                        originMatch &&
                        destinationMatch
                    );
                });
            }
        },
        onLoad() {
            this.resetFilters();
            this.refresh();
        },
        onShow() {
			this.resetFilters();
            this.refresh();
        },
        methods: {
            openFilterPopup() {
                this.$refs.filterPopup.open();
            },
            applyFilters() {
                this.$refs.filterPopup.close();
				this.refresh();
            },
            resetFilters() {
                this.filter = {
                    requestType: "不限",
                    rideType: "不限",
                    departureDate: "",
                    returnDate: "",
                    origin: "",
                    destination: ""
                };
            },
            refresh() {
                this.triggered = true; // 开始下拉刷新
                this.offset = 0; // 重置偏移量
                this.status = "loading"; // 重置加载状态
				this.rideList = []; //重置顺风车列表
                this.getRideList(); // 加载顺风车信息
            },
            async getRideList() {
                const opts = {
                    path: `/ride/getRideList?offset=${this.offset}&limit=${this.limit}`,
                    type: "GET"
                };
                requestAPI(opts)
                    .then(res => {
                        if (res.data.status === 100) {
                            // 如果是刷新操作，覆盖已有列表；否则追加到列表中
                            this.rideList = this.rideList.concat(res.data.data);
                            this.offset += res.data.data.length;
                            this.status = res.data.data.length !== this.limit ? "noMore" : "more";
                        } else {
                            uni.showToast({
                                title: "加载失败，请稍后重试",
                                icon: "none"
                            });
                        }
                        this.triggered = false; // 结束下拉刷新
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
                if (this.status === "loading" || this.status === "noMore") return;
                this.status = "loading";
                this.getRideList();
            },
            toPostRide() {
                uni.navigateTo({
                    url: "/pages/ride/ridePost"
                });
            },
            toRideDetail(rideId) {
                uni.navigateTo({
                    url: `/pages/ride/rideDetail?rideId=${rideId}`
                });
            }
        }
    };
</script>

<style>
    #ride-main {
        width: 100vw;
        height: 100vh;
        position: relative;
        background-color: white;
    }

    .filter-header {
        width: 100%;
        height: 30px;
        background-color: #f2f0f0;
        display: flex;
        align-items: center;
        padding: 0 10px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .filter-text {
        font-size: 13px;
        color: #fa6969;
        cursor: pointer;
    }

    .ride-scroll {
        height: calc(100vh - 50px);
        overflow-y: scroll;
    }

    .ride-box-container {
        margin-bottom: 10px;
    }

    .filter-popup {
        padding: 15px;
    }

    .filter-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .filter-item {
        margin-bottom: 15px;
    }

    .filter-buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }

    .confirm-button {
        background-color: red;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        font-size: 14px;
        cursor: pointer;
    }

    .reset-button {
        background-color: white;
        color: red;
        padding: 10px 20px;
        border: 1px solid red;
        border-radius: 5px;
        font-size: 14px;
        cursor: pointer;
    }
</style>
