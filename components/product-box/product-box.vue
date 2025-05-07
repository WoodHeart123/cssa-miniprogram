<template>
    <view class="product-box" @click="toSecondDetail">
        <div class="photo">
            <u--image class="photo" :src="product.images[0]" mode="aspectFill" height="144px" width="100%">
                <template v-slot:loading>
                    <u-loading-icon color="red"></u-loading-icon>
                </template>
            </u--image>
        </div>

        <view class="row-container product-name-box">
            <view class="row-container delivery">
                <text class="tag-text">{{ this.delivery[product.delivery] }}</text>
            </view>
            <view class="product-name">
                <text>{{ product.productTitle }}</text>
            </view>
        </view>
        <view class="row-container" style="justify-content: space-between; height: 10%; align-items: center; margin-top: 10px">
            <text class="price">{{ '$' + product.price }}</text>
            <view class="condition"
                ><text style="color: #7f0019">{{ this.condition[product.productCondition] }}</text></view
            >
        </view>
        <view class="seller row-container">
            <image
                class="avatar"
                :src="'https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/' + this.product.sellerAvatar + '.jpg'"
            >
            </image>
            <view class="seller-name"
                ><text>{{ product.sellerNickname }}</text></view
            >
            <view class="time"
                ><text>{{ this.productPublishTime }}</text></view
            >
        </view>
    </view>
</template>

<script>
import moment from 'moment/min/moment-with-locales';
import 'moment/locale/zh-cn';
export default {
    props: ['product'],
    name: 'product-box',
    components: {
        uImage,
        uLoadingIcon,
    },
    data() {
        return {
            condition: {
                NEW: '全新',
                ALMOST_NEW: '几乎全新',
                USED: '明显使用痕迹',
                IMPAIRED: '部分损毁',
            },
            delivery: {
                pickup: '自取',
                deliver: '送货',
                all: '送/取',
            },
            productPublishTime: '',
        };
    },
    mounted() {
        // console.log(this.product);
        if (moment().year() - moment(this.product.time).year() > 0) {
            this.productPublishTime = moment(this.product.time).format('YYYY-MM-DD');
        } else if (Date.now() - moment(this.product.time).valueOf() > 86400000 * 7) {
            this.productPublishTime = moment(this.product.time).format('MM-DD');
        } else {
            this.productPublishTime = moment(this.product.time).locale('zh-cn').fromNow();
        }
    },
    methods: {
        toSecondDetail: function () {
            uni.navigateTo({
                url: '/pages/second/secondDetail?product=' + encodeURIComponent(JSON.stringify(this.product)),
            });
        },
    },
};
import uImage from '@/uni_modules/uview-plus/components/u-image/u-image.vue';
import uLoadingIcon from '@/uni_modules/uview-plus/components/u-loading-icon/u-loading-icon.vue';
</script>

<style lang="scss">
.row-container {
    display: flex;
    flex-direction: row;
}

.product-box {
    background-color: white;
    margin: 2vw;
    width: 45vw;
    /* 		height: 40vh; */
    border-radius: 10px;
    position: relative;
}

.photo {
    width: 100%;
    height: 144px;
    border-radius: 10px 10px 0px 0px;
    overflow: hidden;
    margin-bottom: 5px;
}

.product-name-box {
    height: 48px;
    width: 100%;
    flex-shrink: 0;
    overflow: hidden;
    white-space: normal;
}

.product-name {
    height: 48px;
    font-size: 12px;
    line-height: 24px;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.product-name::before {
    margin-left: 60px;
    content: '';
}

.price {
    font-weight: 500;
    height: 10%;
    color: $main-primary-color;
}

.time {
    font-size: 10px;
    text-align: right;
    margin-left: auto;
    height: 12px;

    text {
        color: $shade-darker-gray;
    }
}

.tag-text {
    color: white;
}

.condition {
    height: 20px;
    line-height: 20px;
    padding: 1px 25px;
    text-align: center;
    font-size: 10px;
    color: $main-primary-color;
    background-color: $main-background-color;
    border-radius: 20px;
}

.seller {
    height: 24px;
    font-size: 20px;
    align-items: center;
    margin-top: 10px;
}

.avatar {
    width: 20px;
    height: 20px;
    border-radius: 50%;
}

.seller-name {
    margin-left: 5%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 40px;
    font-size: 10px;
    height: 12px;

    text {
        color: $shade-darker-gray;
    }
}

.delivery {
    position: absolute;
    justify-content: center;
    align-items: center;
    background-color: $main-primary-color;
    color: white;
    border-radius: 18px;
    font-size: 12px;
    line-height: 12px;
    height: 18px;
    width: 40px;
    margin-right: 5px;
    padding: 2px 5px;
}
</style>
