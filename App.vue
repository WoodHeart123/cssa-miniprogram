<script>
	export default {
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	@import './static/iconfont/iconfont.css';
	@import "@/uni_modules/vk-uview-ui/index.scss";
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// 设置整个项目的背景色
	
	@font-face{
		font-family: Ali;
		src:"@/static/font/Alimama_ShuHeiTi_Bold.ttf"
	}
	//@import 'wxcomponents/vant-weapp/common/index.wxss';
	page {
		
		background-color: #f5f5f5;
	}

	text{
		font-family: Ali;
	}
	/* #endif */
</style>
