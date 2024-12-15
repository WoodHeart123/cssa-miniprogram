<template>
    <view id="ride-main">
        <!-- 顶部筛选按钮 -->
		<view class="row-container filter-box">
			<view class="setting-icon" @click="openFilterPopup">
				<uni-icons type="settings-filled" size="30"></uni-icons>
			</view>
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
            <view class="ride-box-container" v-for="(rideInfo, index) in rideList" :key="index">
                <rideBoxVue :rideInfo="rideInfo" @rideClick="toRideDetail"></rideBoxVue>
            </view>

            <!-- 加载状态 -->
            <uni-load-more :status="this.status" :content-text="contentText" />

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
                    <text class="filter-label">请求类型：</text>
                    <uni-segmented-control :current="filter.requestTypeCurrent" :values="['不限', '出顺风车', '求顺风车']" active-color="#9b0000" style="text-align: center; justify-content: center; line-height: 40px;" @clickItem="onFilterRequestTypeClick"/>
                </view>
                <view class="filter-item">
                    <text class="filter-label">顺风车类型：</text>
                    <uni-segmented-control :current="filter.rideTypeCurrent" :values="['不限', '单程', '往返']" active-color="#9b0000" style="text-align: center; justify-content: center; line-height: 40px;" @clickItem="onFilterRideTypeClick" />
                </view>
                <view class="filter-item">
                    <text class="filter-label">出发日期：</text>
                    <uni-datetime-picker v-model="filter.departureDate" type="date" :start="startDate" :end="endDate" placeholder="选择出发日期" style="width: 100%;" />
                </view>
                <view class="filter-item" v-if="filter.rideType === 1">
                    <text class="filter-label">返回日期：</text>
                    <uni-datetime-picker v-model="filter.returnDate" type="date" :start="startDate" :end="endDate" placeholder="选择返回日期" style="width: 100%;" />
                </view>
				<view class="filter-item">
                    <text class="filter-label">始发地：</text>
                    <uni-easyinput v-model="filter.origin" placeholder="输入始发地" />
                </view>
                <view class="filter-item">
                    <text class="filter-label">目的地：</text>
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
                    requestType: "", // 默认值为“”
					requestTypeCurrent: 0,
                    rideType: "", // 默认值为“”
					rideTypeCurrent: 0,
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
					contentdown: '查看更多顺风车',
					contentrefresh: '加载中......',
					contentnomore: '没有顺风车了'
				},
                fabPattern: {
                    buttonColor: "#9b0000"
                }
            };
        },
        computed: {
			// 根据状态动态返回显示内容
			statusText() {
				return this.contentText[this.status];
			}
		},
        onLoad() {
            this.resetFilters();
        },
        onShow() {
            this.refresh();
        },
        methods: {
            openFilterPopup() {
                this.$refs.filterPopup.open();
            },
			onFilterRequestTypeClick(e) {
				if (this.filter.requestTypeCurrent != e.currentIndex) {
					this.filter.requestTypeCurrent = e.currentIndex;
					if (e.currentIndex - 1 === 0) {
						this.filter.requestType = 0;
					} else if (e.currentIndex - 1 === 1) {
						this.filter.requestType = 1;
					}
				}
			},
			onFilterRideTypeClick(e) {
				if (this.filter.rideTypeCurrent != e.currentIndex) {
					this.filter.rideTypeCurrent = e.currentIndex;
					if (e.currentIndex - 1 === 0) {
						this.filter.rideType = 0;
					} else if (e.currentIndex - 1 === 1) {
						this.filter.rideType = 1;
					}
				}
			},
            applyFilters() {
                this.$refs.filterPopup.close();
				this.refresh();
				if (this.rideList.length > 0) {
					return this.rideList.filter(ride => {
					    // 修复 requestType 筛选逻辑
					    const requestTypeMatch =
					        this.filter.requestType === "" ||
					        ride.requestType === this.filter.requestType;
					            
					    // 修复 rideType 筛选逻辑
					    const rideTypeMatch =
					        this.filter.rideType === "" ||
					        ride.rideType === this.filter.rideType;
					            
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
            resetFilters() {
                this.filter = {
                    requestType: "",
					requestTypeCurrent: 0,
                    rideType: "",
					rideTypeCurrent: 0,
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
            // 获取顺风车列表
			async getRideList() {
				if (this.status == "noMore") {
					return;
				}
				console.log("getRideList() is called.");
				const opts = {
					path: `/ride/getRideList?offset=${this.offset}&limit=${this.limit}`,
					type: "GET"
				};
				this.status = "loading"; // 加载中
				try {
					const res = await requestAPI(opts);
					console.log(res);
					console.log("api 调用完成");
					if (res.data.status === 100) {
						console.log("this.offset is: " + this.offset);
						const newRides = res.data.data || [];
						this.rideList = this.rideList.concat(newRides);
						
						this.offset += newRides.length;

						console.log("加载完成");
						// 根据加载数据数量更新状态
						if (this.rideList.length === 0) {
							this.status = "empty"; // 列表为空
						} else if (newRides.length < this.limit) {
							this.status = "noMore"; // 没有更多数据
						} else {
							this.status = "loaded"; // 数据加载完成
						}
					} else {
						this.status = "error"; // 数据加载失败
						uni.showToast({
							title: "加载失败，请稍后重试",
							icon: "none"
						});
					}
				} catch (error) {
					console.error("Failed to fetch ride list:", error);
					this.status = "error"; // 网络错误
					uni.showToast({
						title: "网络错误，请稍后重试",
						icon: "none"
					});
				}
				
				this.triggered = false; // 结束下拉刷新
			},
			onScrollLower() {
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
	
	.setting-icon {
		position: absolute;
		left: 0;
		width: 30px;
	}

    .filter-text {
        font-size: 15px;
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
        padding: 30px;
    }
    
    .filter-title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 20px;
        text-align: center;
    }
    
    .filter-item {
        margin-bottom: 20px;
        font-size: 16px;
        display: flex;
        flex-direction: column;
    }
	
	.filter-label {
	    margin-bottom: 5px;
	    font-size: 14px;
	}
    
    .filter-buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
    }
    
    .confirm-button {
        background-color: #9b0000;
        color: white;
        padding: 6px 15px;
        border: none;
        border-radius: 5px;
        font-size: 14px;
        flex: 1;
        margin-right: 8px;
        text-align: center;
    }
    
    .reset-button {
        background-color: white;
        color: #9b0000;
        padding: 6px 15px;
        border: 1px solid #9b0000;
        border-radius: 5px;
        font-size: 14px;
        flex: 1;
        text-align: center;
    }
</style>
