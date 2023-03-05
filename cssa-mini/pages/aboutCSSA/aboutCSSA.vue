<template>
	<view class="about-page">
		<swiper class="swiper" circular :autoplay="autoplay" :interval="interval"
			:duration="duration">
			<swiper-item>
				<image class="image" src="../../static/2020members.jpg"></image>
			</swiper-item>
			<swiper-item>
				<image class="image" src="../../static/yanhua.jpg"></image>
			</swiper-item>
			<swiper-item>
				<image class="image" src="../../static/chunwan-min.jpg"></image>
			</swiper-item>
		</swiper>
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper"
			@scrolltolower="lower" @scroll="scroll">
			<view class="box">
				<view class="label" v-for="(row,index) in orderTypeLise" :key="row.name" hover-class="hover" @click="toPage(index)">
					<view class="icon">
						<image :src="'../../static/'+row.icon"></image>
					</view>
					<!-- <text>{{row.name}}</text> -->
					{{row.name}}
				</view>
			</view>
			<view class = "gap"></view>
			<image class="small-sign" src="../../static/cssa.jpg"></image>
			<view class = "zxt1">
				<text style="font-weight: 100">关于</text>
				<text style="font-weight: 400">CSSA</text>
			</view>
			<view id="demo1" class="intro">&nbsp&nbsp&nbsp&nbspCSSA是中国学生学者联合会，是由在海外的留学生自发成立的，如今在全球各地的高校中都不乏其身影的中国学生组织。仅在美国，超过百所高校的中国留学生成立了CSSA。 CSSA在全球发展中日渐成熟，为在美中国学生学者包含本科生、研究生、硕士生、博士生、访问学者以及教授等在内的华人群体提供生活服务，学术支持，以及社交平台。借着二十年以来的基础，CSSA是UW-Madison十分活跃也极具影响力的华人学生组织，致力于文化之间的交流和校园的多元化。一直以来以建立华人学生学者之间的交流为目标，同时也积极的作为对中华文化有兴趣的人的桥梁。 CSSA一直以来着重于推广中华文化和传统，例如每年最重要的春节晚会，秉持着免费对在校学生和人员开放的原则，准备了各式各样的节目，包含传统舞蹈，歌唱表演，脱口秀和其他精彩的表演。每年在 Memorial Union举办的春晚二十年来不只吸引了华人学生和华人家庭，也有越来越多美国当地的家庭出席甚至参与演出。这些活动不只为学生们带来了生活乐趣和归属感，在推广中华文化的同时也为麦迪逊带来了不一样的文化气息。当然这些成绩不是一个力量下的成果，而是集结了各个学生以及组织，还有很多人的一份心力。
			</view>
			<view class="app_content_1">_____________________________</view>
			<view class = "gap"></view>
			<view>
				<view class="app_content_medium">CSSA团队介绍</view>
			</view>
			<view id="demo2" class="scroll-view-item uni-bg-green">
				<view class = "gap"></view>
				<view class = "zxt">
					<text style="font-weight: 400">CSSA</text>
					<text style="font-weight: 100">主席团</text>
				</view>
				<image mode="aspectFit" class="zhuxituan" src="../../static/zhuxituan.png"></image>
				<view class="name">
					<text style="font-weight: 400">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp杨天林&nbsp&nbsp</text>
					<text style="font-weight: 100">现任主席</text>
					<text style="font-weight: 400">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp楚芸蔚</text>
					<text style="font-weight: 400">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp沈格非&nbsp&nbsp</text>
					<text style="font-weight: 100">多媒体部长</text>
				</view>
				<image mode="aspectFit" class="zhuxituan" src="../../static/zhuxituan1.png"></image>
				<view class="name">
					<text style="font-weight: 400">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp马伊侬&nbsp&nbsp</text>
					<text style="font-weight: 100">宣传部长</text>
					<text style="font-weight: 400">&nbsp&nbsp&nbsp&nbsp&nbsp侯映泽&nbsp&nbsp</text>
					<text style="font-weight: 100">活动部长</text>
					<text style="font-weight: 400">&nbsp&nbsp&nbsp苏浩涵&nbsp&nbsp</text>
					<text style="font-weight: 100">研究生部长</text>
				</view>
				<image mode="aspectFit" class="zhuxituan" src="../../static/zhuxituan3.png"></image>
				<view class="name">
					<text style="font-weight: 400">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp孙博彦&nbsp&nbsp</text>
					<text style="font-weight: 100">技术部部长</text>
				</view>
				<view class="app_content_1">________________________________________</view>
				<view class = "gap"></view>
				<view>
					<view class="app_content_medium">申请加入CSSA</view>
					<view class = "gap"></view>
					<view class="app_content_1">CSSA at UW Madison 将在每年春季和秋季进行招新，敬请关注CSSA官方微信公众账号(CSSAatUWMadison)！</view>
					<view class="app_content_1">________________________________________</view>
				</view>
			</view>
			<view id="demo3" class="scroll-view-item-less-height uni-bg-blue">
				<view class = "gap"></view>
				<view class = "gap"></view>
				<view class = "gap"></view>
				<view class = "gap"></view>
				<view class = "gap"></view>
				<view class = "zxt1">
					<text style="font-weight: 100">感谢</text>
					<text style="font-weight: 400">CSSA</text>
					<text style="font-weight: 100">赞助商</text>
				</view>
				<image class="sponsor" src="../../static/sponsor1.jpeg"></image>
				<image class="sponsor" src="../../static/sponsor2.jpeg"></image>
				<image class="sponsor" src="../../static/sponsor3.jpeg"></image>
			</view>
		</scroll-view>
	</view>
	<view @tap="goTop" class="uni-link uni-center uni-common-mt">
					点击返回顶部
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// swiper
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				// scoller downwards
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				orderTypeLise: [
					//name-标题 icon-图标
					{
						name: 'CSSA详情',
						icon: 'group icon.jpg'
					},
					{
						name: '联系我们',
						icon: 'email icon.png'
					}
				],
				
			}
		},
		methods: {
			// swiper 
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			},
		
			// scoller downwards
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				// 解决view层不同步的问题
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
				uni.showToast({
				icon: "none",
				title: "已返回顶部"
				})
			},
			toPage: function(index) {
				if (index == 1) {
					uni.navigateTo({
						url: "/pages/aboutCSSA/ContactUs"
					})
				}
				if (index == 0) {
					uni.navigateTo({
						url: "/pages/aboutCSSA/Guanyu"
					})
				}
			},
		}
	}
</script>


<style lang="scss">
	.about-page{
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}
	.box {
		width: 96%;
		height: 22vw;
		background-color: #fefefe;
		border-radius: 24upx;
		/*  阴影 */
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.15);
		margin: 40upx 2% 0upx 2%;
		display: flex;
		align-items: center;
		justify-content: center;
	
		.label {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 16vw;
			color: #666666;
			font-size: 26upx;
	
			.icon {
				position: relative;
				width: 7vw;
				height: 7vw;
				margin: 0 1vw 2vw 1vw;
				image {
					width: 7vw;
					height: 7vw;
					z-index: 9;
				}
			}
		}
	
	}
	.swiper {
		height: 500rpx;
		width: 100%;
	}
	.swiper-item {
		display: block;
		height: 500rpx;
		line-height: 500rpx;
		text-align: center;
	}
	
	.scroll-Y {
			height: 65vh;
	}
	.scroll-view_H {
			white-space: nowrap;
			width: 100%;
	}
	.scroll-view-item {
			height: 1500rpx;
			//line-height: 500rpx;
			text-align: center;
			font-size: 50rpx;
	}
	.scroll-view-item-less-height {
			height: 800rpx;
			//line-height: 500rpx;
			text-align: center;
			font-size: 50rpx;
	}
	.scroll-view-item_H {
			display: inline-block;
			width: 100%;
			height: 500rpx;
			//line-height: 500rpx;
			text-align: center;
			font-size: 36rpx;
	}
	.title {
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			font-size: 50rpx;
			font-weight: bold;
	}
	.intro {
			height: 1550rpx;
			line-height: 50rpx;
			text-align: left;
			font-size: 30rpx;
			width: 500rpx;
			margin: 0% auto;
	}
	.center {
			display: flex;
			align-items: center;
	}
	.small-boxes {
			height: 50rpx;
			line-height: 50rpx;
			text-align: center;
			font-size: 30rpx;
	}
	.small-sign {
		height: 150rpx;
		width: 300rpx;
		display: block;
		margin: 0% auto;
	}
	.gap {
		height: 50rpx;
	}
	.gapbig {
		height: 300rpx;
	}
	.app_content_top {
		z-index: 1;
		width: 50%;
		height: 100rpx;
		display: block;
		margin: 0% auto;
	}
	.app_content_medium {
		padding-top: 0rpx;
		text-align: center;
		font-size: 50rpx;
		font-weight: 250;
		background-image: url("@/static/bg.png");
	}
	.app_content_1 {
		padding-top: 0rpx;
		text-align: center;
		font-size:30rpx;
		font-weight: 200;
		//background-image: url("@/static/bg.png");
	}
	.zhuxituan {
		height: 300rpx;
		text-align: left;
	}
	.zxt {
		font-size: 50rpx;
		text-align: left;
		line-height: 100rpx;
	}
	.zxt1 {
		font-size: 50rpx;
		text-align: center;
		line-height: 100rpx;
	}
	.image{
		width: 100%;
		height: 100%;
	}
	.name {
		margin-top: 0%;
		text-align: left;
		font-size: 25rpx;
	}
	.sponsor {
		width: 500rpx;
		height: 700rpx;
		display: block;
		margin: 0% auto;
	}
</style>
