<template>
    <view>
        <!-- 加载状态 -->
        <view v-if="loading" class="loading-container">
            <text>加载中...</text>
        </view>

        <!-- 网页视图 -->
        <web-view :src="link" @onload="onWebViewLoad" @error="onWebViewError"></web-view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            link: '', // 链接
            loading: true, // 加载状态，默认为加载中
        };
    },
    onLoad(options) {
        // 获取链接参数并解码
        this.link = decodeURIComponent(options.link);
    },
    methods: {
        // 当 WebView 加载完成时调用
        onWebViewLoad() {
            this.loading = false; // 隐藏加载状态
        },
        // 当 WebView 加载失败时调用
        onWebViewError() {
            this.loading = false; // 隐藏加载状态
            uni.showToast({
                title: '加载失败，请重试',
                icon: 'none',
                duration: 2000,
            });
        },
    },
};
</script>

<style>
/* 加载状态样式 */
.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
    color: #666;
    font-size: 16px;
}
</style>
