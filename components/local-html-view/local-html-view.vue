<!--
  @file html-view.vue
  @description 用于通过 rich-text 渲染动态加载的本地 HTML 文件内容。
               支持通过页面参数传入文件路径，并动态加载内容进行展示。
  @dependencies 使用 uni.request 读取本地文件，依赖 rich-text 组件渲染 HTML。
  @notes
  - 文件路径必须在小程序 `static` 目录中。
  - 若路径无效或加载失败，将显示错误提示。
-->

<template>
<<<<<<< HEAD
  <view class="container">
    <rich-text :nodes="htmlContent" v-if="htmlContent"></rich-text>
    <view v-else class="error-message">加载失败，请检查文件路径。</view>
  </view>
=======
    <view class="container">
        <rich-text :nodes="htmlContent" v-if="htmlContent"></rich-text>
        <view v-else class="error-message">加载失败，请检查文件路径。</view>
    </view>
>>>>>>> develop
</template>

<script>
export default {
<<<<<<< HEAD
  name: "local-html-view",
  data() {
    return {
      htmlContent: "", // 用于存储 HTML 文件内容
    };
  },
  onLoad(options) {
    if (options.url) {
      const decodedUrl = decodeURIComponent(options.url);
      // 动态加载 HTML 文件内容
      this.loadHtmlContent(decodedUrl);
    } else {
      console.error("未提供 HTML 文件路径参数");
    }
  },
  methods: {
    loadHtmlContent(url) {
      uni.request({
        url: url, // 动态传入的文件路径
        method: "GET",
        success: (res) => {
          this.htmlContent = res.data; // 解析 HTML 内容
        },
        fail: (err) => {
          console.error("加载 HTML 文件失败", err);
          this.htmlContent = "<p>文件加载失败，请检查路径。</p>";
        },
      });
    },
  },
=======
    name: 'local-html-view',
    data() {
        return {
            htmlContent: '', // 用于存储 HTML 文件内容
        };
    },
    onLoad(options) {
        if (options.url) {
            const decodedUrl = decodeURIComponent(options.url);
            // 动态加载 HTML 文件内容
            this.loadHtmlContent(decodedUrl);
        } else {
            console.error('未提供 HTML 文件路径参数');
        }
    },
    methods: {
        loadHtmlContent(url) {
            uni.request({
                url: url, // 动态传入的文件路径
                method: 'GET',
                success: (res) => {
                    this.htmlContent = res.data; // 解析 HTML 内容
                },
                fail: (err) => {
                    console.error('加载 HTML 文件失败', err);
                    this.htmlContent = '<p>文件加载失败，请检查路径。</p>';
                },
            });
        },
    },
>>>>>>> develop
};
</script>

<style>
.container {
<<<<<<< HEAD
  padding: 20px;
}
.error-message {
  color: red;
  text-align: center;
  margin-top: 20px;
=======
    padding: 20px;
}
.error-message {
    color: red;
    text-align: center;
    margin-top: 20px;
>>>>>>> develop
}
</style>
