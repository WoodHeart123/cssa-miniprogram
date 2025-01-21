<template>
    <view id="ride-main">
        <!-- 文字滚动栏 -->
        <view>
            <uni-notice-bar show-icon scrollable show-close single :text="noticeText" />
        </view>

        <!-- 筛选和超链接行 -->
        <view class="row-container filter-hyperlink-container">
            <!-- 筛选按钮 -->
            <view class="filter-box setting-icon" @click="openFilterPopup">
                <uni-icons type="settings-filled" size="30"></uni-icons>
            </view>
            <!-- 超链接 -->
            <view class="hyperlink" @click="toUsageRules"> 阅读《使用守则+声明》 </view>
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

            <view style="height: 100px"></view>
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
                    <uni-segmented-control
                        :current="filter.requestTypeCurrent"
                        :values="filterRideRequestTabValues"
                        active-color="#9b0000"
                        style="text-align: center; justify-content: center; line-height: 40px"
                        @clickItem="onFilterRequestTypeClick"
                    />
                </view>
                <view class="filter-item">
                    <text class="filter-label">顺风车类型：</text>
                    <uni-segmented-control
                        :current="filter.rideTypeCurrent"
                        :values="filterRideTypeTabValues"
                        active-color="#9b0000"
                        style="text-align: center; justify-content: center; line-height: 40px"
                        @clickItem="onFilterRideTypeClick"
                    />
                </view>
                <view class="filter-item">
                    <text class="filter-label">出发日期：</text>
                    <uni-datetime-picker
                        v-model="filter.departureDate"
                        type="date"
                        :start="startDate"
                        :end="endDate"
                        placeholder="选择出发日期"
                        style="width: 100%"
                    />
                </view>
                <view class="filter-item" v-if="filter.rideTypeCurrent === 2">
                    <text class="filter-label">返回日期：</text>
                    <uni-datetime-picker
                        v-model="filter.returnDate"
                        type="date"
                        :start="startDate"
                        :end="endDate"
                        placeholder="选择返回日期"
                        style="width: 100%"
                    />
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
import moment from 'moment';
import uploadOSS from '@/api/upload.js';
import requestAPI from '@/api/request.js';
import rideBoxVue from '@/components/ride-box/ride-box.vue';

export default {
    components: { rideBoxVue },
    data() {
        return {
            // 主页滚动栏自己内容
            noticeTextsList: [{ text: '欢迎使用顺风车功能，请仔细阅读《使用守则+声明》' }],
            noticeText: '', // 最终显示在滚动栏中的文字
            filter: {
                requestTypeCurrent: 0, // 当前筛选条件中的顺风车请求类型
                rideTypeCurrent: 0, // 当前筛选条件中的顺风车类型
                departureDate: '', // 出发日期
                returnDate: '', // 返回日期
                origin: '', // 始发地
                destination: '', // 目的地
            },
            filterRideRequestTabValues: ['不限', '出顺风车', '求顺风车'],
            filterRideTypeTabValues: ['不限', '单程', '往返'],
            startDate: moment().format('YYYY-MM-DD'), // 日期范围开始
            endDate: moment().add(1, 'year').format('YYYY-MM-DD'), // 日期范围结束
            offset: 0, // 当前数据偏移量
            limit: 20, // 每次加载的数据数量
            rideList: [], // 全部顺风车列表
            triggered: false,
            status: 'loading',
            contentText: {
                contentdown: '查看更多顺风车',
                contentrefresh: '加载中......',
                contentnomore: '没有顺风车了',
            },
            fabPattern: {
                buttonColor: '#9b0000',
            },
        };
    },
    computed: {
        // 根据状态动态返回显示内容
        statusText() {
            return this.contentText[this.status];
        },
    },
    onLoad(options) {
        this.resetFilters();

        if (options.noticeBarText) {
            this.noticeText = options.noticeBarText;
            this.generateNoticeText();
        }
    },
    onShow() {
        this.resetFilters();
        this.refresh();
    },
    methods: {
        // 刷新
        refresh() {
            if (!this.triggered) {
                this.triggered = true; // 开始下拉刷新
                this.offset = 0; // 重置偏移量
                this.status = 'loading'; // 重置加载状态
                this.rideList = []; //重置顺风车列表
                if (this.areFiltersDefault()) {
                    this.getRideList(); // 加载顺风车信息
                    // 增加偏移量，获取下一批数据
                    this.offset += this.limit;
                } else {
                    this.applyFilters(); // 需要加载符合条件顺风车
                }
            }
        },

        // 生成滚动栏文字内容
        generateNoticeText() {
            // 定义长间隔字符串
            const longSpace = '\u00A0'.repeat(45);

            // 生成基础 noticeText
            const baseText = this.noticeTextsList.map((item) => item.text).join(longSpace);

            // 将生成的 baseText 追加到现有的 noticeText
            this.noticeText = this.noticeText ? this.noticeText + longSpace + baseText : baseText;
        },

        // 跳转到《使用准则+声明》
        toUsageRules() {
            uni.navigateTo({
                url: `/pages/webView/webView?link=${encodeURIComponent(
                    'https://prod-9gip97mx4bfa32a3-1312104819.tcloudbaseapp.com/disclaimer/%E9%A1%BA%E9%A3%8E%E8%BD%A6%E4%BD%BF%E7%94%A8%E5%87%86%E5%88%99%2B%E5%85%8D%E8%B4%A3.pdf?sign=f4dc80835420ba9cf5e052657d800bb0&t=1736722864'
                )}`,
            });
        },

        openFilterPopup() {
            this.$refs.filterPopup.open();
        },

        onFilterRequestTypeClick(e) {
            if (this.filter.requestTypeCurrent != e.currentIndex) {
                this.filter.requestTypeCurrent = e.currentIndex;
            }
        },

        onFilterRideTypeClick(e) {
            if (this.filter.rideTypeCurrent != e.currentIndex) {
                this.filter.rideTypeCurrent = e.currentIndex;
            }
        },

        // 加载符合筛选条件的顺风车信息
        async applyFilters() {
            this.$refs.filterPopup.close(); // 关闭筛选弹窗

            // 如果非刷新，需要重置状态
            if (this.status !== 'loading') {
                this.offset = 0; // 偏移量重置
                this.rideList = []; // 清空列表
                this.status = 'loading'; // 设置为加载中
            }

            let fetchedRides = []; // 临时存储每次获取的数据

            // 通过循环持续获取数据，直到满足条件或数据耗尽
            while (true) {
                await this.getRideList(); // 调用 getRideList 获取一批数据
                // 增加偏移量，获取下一批数据
                this.offset += this.limit;

                // 根据当前已获取的数据进行筛选
                const filteredBatch = this.rideList.filter((ride) => {
                    // 请求类型筛选（0: 不限, 1: 出顺风车, 2: 求顺风车）
                    if (this.filter.requestTypeCurrent > 0 && ride.requestType !== this.filter.requestTypeCurrent - 1) {
                        return false;
                    }

                    // 顺风车类型筛选（0: 不限, 1: 单程, 2: 往返）
                    if (this.filter.rideTypeCurrent > 0 && ride.rideType !== this.filter.rideTypeCurrent - 1) {
                        return false;
                    }

                    // 出发日期筛选
                    if (this.filter.departureDate && ride.departureTime.split(' ')[0] !== this.filter.departureDate) {
                        return false;
                    }

                    // 返回日期筛选（仅在顺风车类型为往返时有效）
                    if (
                        this.filter.rideTypeCurrent === 2 &&
                        this.filter.returnDate &&
                        ride.returnTime.split(' ')[0] !== this.filter.returnDate
                    ) {
                        return false;
                    }

                    // 始发地筛选
                    if (this.filter.origin && !ride.origin.includes(this.filter.origin)) {
                        return false;
                    }

                    // 目的地筛选
                    if (this.filter.destination && !ride.destination.includes(this.filter.destination)) {
                        return false;
                    }

                    return true; // 所有条件通过，保留该项
                });

                // 将筛选后的数据添加到最终列表中
                fetchedRides = fetchedRides.concat(filteredBatch);

                // 判断 `status` 是否为 `noMore`或者`loaded`，如果是，表示数据加载完成
                if (this.status === 'noMore' || this.status === 'loaded') {
                    break; // 停止加载
                }

                // 判断是否满足所需的数量
                if (fetchedRides.length >= this.limit) {
                    break; // 满足所需的数量，停止加载
                }
            }

            // 将最终筛选结果赋值给 rideList
            this.rideList = fetchedRides;

            // 根据结果设置状态
            if (this.rideList.length === 0) {
                this.status = 'empty'; // 没有符合条件的数据
            } else if (this.rideList.length < this.limit) {
                this.status = 'noMore'; // 数据未达到 limit，但已没有更多数据
            } else {
                this.status = 'loaded'; // 数据加载完成
            }

            //console.log("筛选后的 rideList:", this.rideList);
        },

        // 重置筛选条件
        resetFilters() {
            this.filter = {
                requestTypeCurrent: 0,
                rideTypeCurrent: 0,
                departureDate: '',
                returnDate: '',
                origin: '',
                destination: '',
            };
        },

        // 检查有无筛选条件
        areFiltersDefault() {
            if (this.filter.requestTypeCurrent !== 0) return false;
            if (this.filter.rideTypeCurrent !== 0) return false;
            if (this.filter.departureDate !== '') return false;
            if (this.filter.returnDate !== '') return false;
            if (this.filter.origin !== '') return false;
            if (this.filter.destination !== '') return false;
            return true;
        },

        // 获取顺风车列表
        async getRideList() {
            if (this.status === 'noMore') return; // 如果没有更多数据，则不再加载

            const opts = {
                path: `/ride/getRideList?offset=${this.offset}&limit=${this.limit}`,
                type: 'GET',
            };

            this.status = 'loading'; // 设置加载状态

            try {
                const res = await requestAPI(opts);
                if (res.data.status === 100) {
                    const newRides = res.data.data || []; // 新数据

                    // 去重逻辑
                    const existingIds = new Set(this.rideList.map((ride) => ride.rideId));
                    let filteredData = newRides.filter((ride) => !existingIds.has(ride.rideId));

                    // 合并数据
                    this.rideList = this.rideList.concat(filteredData);

                    // 更新加载状态
                    if (this.rideList.length === 0) {
                        this.status = 'empty'; // 列表为空
                    } else if (newRides.length < this.limit) {
                        this.status = 'noMore'; // 没有更多数据
                    } else {
                        this.status = 'loaded'; // 数据加载完成
                    }
                } else {
                    this.handleError('加载失败，请稍后重试');
                    this.status = 'loaded';
                }
            } catch (error) {
                this.handleError('网络错误，请稍后重试');
            } finally {
                this.triggered = false; // 结束下拉刷新
            }
        },

        // 错误处理
        handleError(message) {
            this.status = 'error';
            uni.showToast({
                title: message,
                icon: 'none',
            });
        },

        // 下拉加载数据
        onScrollLower() {
            this.status = 'loading';
            if (this.areFiltersDefault()) {
                this.getRideList();
                // 增加偏移量，获取下一批数据
                this.offset += this.limit;
            } else {
                this.applyFilters();
            }
        },

        // 发布顺风车页面
        toPostRide() {
            uni.navigateTo({
                url: '/pages/ride/ridePost',
            });
        },

        // 顺风车细节内容页面
        toRideDetail(rideId) {
            uni.navigateTo({
                url: `/pages/ride/rideDetail?rideId=${rideId}`,
            });
        },
    },
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

.scroll-item {
    display: inline;
    margin-right: 16px;
}

.filter-hyperlink-container {
    display: flex;
    justify-content: space-between; /* 左右两端对齐 */
    align-items: center; /* 垂直居中 */
    padding: 10px 15px; /* 内边距 */
    background-color: rgba(255, 255, 255, 0.9); /* 背景色 */
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 5px; /* 阴影效果 */
    box-sizing: border-box; /* 包括内边距 */
    width: 100%; /* 确保宽度占满容器 */
}

.setting-icon {
    cursor: pointer; /* 鼠标悬停显示手型 */
}

.filter-box {
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: flex-start; /* 左对齐 */
    cursor: pointer; /* 鼠标悬停显示手型 */
}

.hyperlink {
    color: #007aff; /* 蓝色字体 */
    text-decoration: underline; /* 下划线 */
    font-size: 14px; /* 字体大小 */
    cursor: pointer; /* 鼠标悬停显示手型 */
    white-space: nowrap; /* 防止换行 */
    margin-left: auto; /* 将超链接推到右侧 */
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
