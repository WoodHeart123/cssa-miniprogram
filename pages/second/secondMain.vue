<template>
    <view id="second-main">
        <top-bar text="二手市场" navigate-back></top-bar>
        <view class="search-bar">
            <uni-icons type="search" size="20"></uni-icons>
            <input
                placeholder-class="search-placeholder"
                placeholder="搜索二手商品"
                :value="productTitleFilter"
                @blur="refresh"
                @confirm="refresh"
            />
        </view>
        <view style="display: flex" class="dropdown-bar">
            <u-dropdown active-color="#7F0019" ref="dropdown">
                <u-dropdown-item :title="this.conditionFilter.label" height="80">
                    <view class="slot-content">
                        <view @click="onClickConditionOptions(-1)">
                            <text class="paragraph-1 dropdown-label" :class="{ active: this.conditionFilter.value == 'all' }"
                                >成色不限</text
                            >
                        </view>
                        <view v-for="(condition, index) in this.conditionOptions" @click="onClickConditionOptions(index)">
                            <text
                                class="paragraph-1 dropdown-label"
                                :class="{ active: this.conditionFilter.value == condition.value }"
                                >{{ condition.label }}</text
                            >
                        </view>
                    </view>
                </u-dropdown-item>
                <u-dropdown-item :title="this.deliveryFilter.label" height="80">
                    <view class="slot-content">
                        <view @click="onClickDeliveryOptions(-1)">
                            <text class="paragraph-1 dropdown-label" :class="{ active: this.deliveryFilter.value == 'all' }"
                                >取货方式不限</text
                            >
                        </view>
                        <view v-for="(delivery, index) in this.deliveryOptions" @click="onClickDeliveryOptions(index)">
                            <text
                                class="paragraph-1 dropdown-label"
                                :class="{ active: this.deliveryFilter.value == delivery.value }"
                                >{{ delivery.label }}</text
                            >
                        </view>
                    </view>
                </u-dropdown-item>
            </u-dropdown>
        </view>

        <scroll-view
            scroll-y="true"
            show-scrollbar="true"
            refresher-enabled="true"
            class="column-container secondhand-container"
            refresher-background="white"
            @refresherrefresh="refresh"
            enable-back-to-top="true"
            :refresher-triggered="triggered"
            @scrolltolower="onScrollLower"
        >
            <view class="box">
                <view v-for="(product, index) in productList" :key="index">
                    <productBoxVue :product="product" :key="product.productID"></productBoxVue>
                </view>
            </view>
            <uni-load-more :contentText="contentText" :status="status"></uni-load-more>
            <view style="height: 100px"></view>
        </scroll-view>
        <uni-fab :pattern="pattern" horizontal="right" vertical="bottom" popMene="false" @fabClick="toPostProduct" />
    </view>
</template>

<script>
export default {
    components: {
        productBoxVue,
    },
    data() {
        return {
            offset: 0,
            limit: 20,
            currentIndex: 0,
            pattern: {
                buttonColor: '#7F0019',
            },
            conditionOptions: conditionOptions,
            deliveryOptions: deliveryOptions,
            deliveryFilter: {
                label: '取货方式不限',
                value: 'all',
            },
            conditionFilter: {
                label: '成色不限',
                value: 'all',
            },
            triggered: false,
            status: 'loading',
            productList: [],
            productTitleFilter: '',
            contentText: {
                contentdown: '上拉显示更多',
                contentrefresh: '正在加载...',
                contentnomore: '没有更多商品了',
            },

            isLogin: false,
        };
    },
    onLoad() {
        wx.cloud.init();
        this.refresh();
    },
    onShow() {
        uni.$on('uploadSuccess', this.uploadSuccess);
        uni.getStorage({
            key: 'userInfo-2',
            success: () => {
                this.isLogin = true;
            },
        });
    },
    methods: {
        uploadSuccess: function () {
            this.refresh();
            uni.showToast({
                title: '上传成功',
            });
        },
        onClickConditionOptions(index) {
            if (index == -1) {
                this.conditionFilter = {
                    label: '成色不限',
                    value: 'all',
                };
            } else if (this.conditionFilter.value != this.conditionOptions[index].value) {
                this.conditionFilter.label = this.conditionOptions[index].label;
                this.conditionFilter.value = this.conditionOptions[index].value;
            }
            this.refresh();
            this.$refs.dropdown.close();
        },
        onClickDeliveryOptions(index) {
            if (index == -1) {
                this.deliveryFilter = {
                    label: '取货方式不限',
                    value: 'all',
                };
            } else if (this.deliveryFilter.value != this.deliveryOptions[index].value) {
                this.deliveryFilter.label = this.deliveryOptions[index].label;
                this.deliveryFilter.value = this.deliveryOptions[index].value;
            }
            this.refresh();
            this.$refs.dropdown.close();
        },
        onClickMenu: function (index) {
            if (this.currentIndex != index) {
                this.currentIndex = index;
                this.refresh();
            }
        },
        refresh: function () {
            if (!this.triggered) {
                this.triggered = true;
                this.limit = 20;
                this.offset = 0;
                this.productList = [];
                this.status = 'loading';
                this.getProductList();
            }
        },
        async login(name) {
            uni.showLoading({
                mask: true,
            });
            const res = await wx.cloud.callContainer({
                config: {
                    env: 'prod-9gip97mx4bfa32a3',
                },
                path: '/user/login?nickname=' + encodeURI(name),
                method: 'GET',
                header: {
                    'X-WX-SERVICE': 'springboot-ds71',
                },
            });
            this.isLogin = true;
            uni.setStorage({
                key: 'userInfo-2',
                data: res.data.data,
            });
            uni.hideLoading();
            this.toPostProduct();
        },
        getProductList: async function () {
            if (this.status == 'noMore') {
                return;
            }
            const opts = {
                path: `/secondhand/searchProduct?limit=${this.limit}&offset=${this.offset}&conditionFilter=${this.conditionFilter.value}&deliveryFilter=${this.deliveryFilter.value}`,
                type: 'GET',
            };

            requestAPI(opts)
                .then((response) => {
                    if (response.data.status == 100) {
                        this.productList = this.productList.concat(response.data.data);
                        this.offset += response.data.data.length;
                        this.status = response.data.data.length != this.limit ? 'noMore' : 'more';
                    }
                    this.triggered = false;
                })
                .catch((error) => {
                    console.error('Fetch product list failed:', error);
                    this.triggered = false;
                });
        },
        toPostProduct: function () {
            if (!this.isLogin) {
                uni.showToast({
                    title: '请先登录',
                    icon: 'none',
                });
                uni.getUserProfile({
                    desc: '获取用户信息',
                    success: (userProfile) => {
                        this.login(userProfile.userInfo.nickName);
                    },
                    fail: () => {
                        uni.showToast({
                            title: '请先登陆',
                            icon: 'none',
                        });
                    },
                });
                return;
            }
            uni.navigateTo({
                url: '/pages/second/secondMainPost',
            });
        },
        toSearch: function () {
            uni.navigateTo({
                url: '/pages/second/secondMainSearch',
                animationType: 'pop-in',
            });
        },
        onScrollLower: function () {
            this.status = 'loading';
            this.getProductList();
        },
        navigateBack: function () {
            uni.navigateBack();
        },
    },
};
import { itemTypes, conditionOptions, deliveryOptions } from './second.js';
import productBoxVue from '@/components/product-box/product-box.vue';
import requestAPI from '@/api/request.js';
</script>

<style lang="scss">
.u-flex {
    display: flex;
}

#second-main {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
}

.column-container {
    display: flex;
}

.secondhand-container {
    height: 100vh;
    width: 100vw;
    background-color: white;
    padding-top: 10px;
}

.row-container {
    display: flex;
    flex-direction: row;
}

.menu {
    position: fixed;
    width: 100vw;
    height: 50px;
    align-items: center;
    background-color: white;
    /* border-bottom:1px solid #ccc; */
    box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 5px;
    box-sizing: border-box;
}

.menu-scroll {
    padding-bottom: 0;
}

.search-box {
    margin-left: 5px;
    width: 30px;
}

.menu-box {
    width: calc(100vw - 35px);
    overflow-x: scroll;
    height: 50px;
    flex-shrink: 0;
}

.product-type-item {
    margin-left: 10px;
    height: 100%;
    align-items: center;
    justify-content: center;
    width: fit-content;
    flex-shrink: 0;
}

.product-text {
    font-size: 15px;
    color: #aaa;
    margin-right: 10px;
    transition: all 0.3s;
}

.selected {
    font-size: 18px;
    font-weight: 700;
    color: #9b0000;
}

.container {
    display: flex;
    height: 500px;
    width: 80vw;
}

.box {
    display: flex;
    justify-content: left;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: 1vw;
}

.search-bar {
    display: flex;
    align-items: center;
    height: 55px;
    width: 90vw;
    margin: 20px 5vw 0 5vw;
    background-color: $main-background-color-2;
    border-radius: 100vh;

    uni-icons {
        margin: 0 3%;

        text {
            color: $main-secondary-color !important;
        }
    }

    .search-placeholder {
        color: $main-secondary-color !important;
        font-size: 14px;
    }

    input {
        flex: 1;
    }

    image {
        width: 30px;
        height: 30px;
        margin: 0 3%;
    }
}

.dropdown-bar {
    .u-dropdown__menu__item {
        margin: 20px 5vw;
    }

    .u-dropdown__menu__item__arrow {
        margin-left: 10px !important;
    }
}

.slot-content {
    width: calc(100vw - 40px);
    background-color: $main-background-color;
    border-radius: 0 0px 20px 20px;
    padding: 5px 20px 20px 20px;

    .dropdown-label {
        color: $main-secondary-color;
        transition: all 0.5s;
        margin: 7px 0;
    }

    .dropdown-label.active {
        font-weight: 700;
        color: $main-primary-font-color;
    }
}
</style>
