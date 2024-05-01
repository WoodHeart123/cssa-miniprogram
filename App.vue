<script>
	export default {
		onLaunch: function() {
			moment.locale('zh-cn');
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
	import moment from "moment/min/moment-with-locales";
	import 'moment/locale/zh-cn';
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	@import './static/iconfont/iconfont.css';
	@import "@/uni_modules/vk-uview-ui/index.scss";
	@import '@/static/customicons.css';
	
	.heading-1{
		line-height: 50px;
		font-size: 34px;
		font-weight: 600;
	}
	.heading-2{
		line-height: 38px;
		font-size: 28px;
		font-weight: 600;
	}
	.heading-3{
		line-height: 22px;
		font-size: 18px;
		font-weight: 600;
	}
	.paragraph-1{
		line-height: 24px;
		font-size: 14px;
		font-weight: 400;
	}
	.paragraph-2{
		line-height: 10px;
		font-size: 8px;
		font-weight: 400;
	}
	
	.button{
		background-color: $main-primary-color;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 100vh;
		padding: 7px 28px 7px 28px;
		border: $main-primary-color solid 1px;
		text{
			line-height: 24px;
			font-size: 14px;
			color: $main-background-color-2;
		}
	}
	
	.button:hover{
		background-color: $shade-badger-red;
	}
	
	.button.disabled{
		background-color: $main-secondary-color;
		border: none;
	}
	

	@font-face{
		font-family: Roboto;
		src:"@/static/font/roboto.ttf"
	}
	page {
		background-color: $main-background-color !important;
	}

	text{
		font-family: Roboto;
		color: $main-primary-font-color;
	}
</style>
