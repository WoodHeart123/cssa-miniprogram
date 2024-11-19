<!--广告/活动页面详情。跳转到对应的微信公众号文章需要有一个网页页面支持。-->
<template>
	<view>
		<web-view :src="link"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
		    return {
		        link: ''
	        };
	    },
	    onLoad(options) {
		    // 获取链接参数并解码
	        this.link = decodeURIComponent(options.link);
	    }
	}
</script>

<style>

</style>
