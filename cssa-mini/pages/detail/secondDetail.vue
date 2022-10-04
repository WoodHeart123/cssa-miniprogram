<template>
	<view class="secDetail">
		<swiper indicator-dots>
			<swiper-item v-for="(image, index) in imageList">
				<image :src="image"></image>
			</swiper-item>
		</swiper>
		<view class="blank_line"></view>
		<view class="basic">
			<view class="price-box">
				<text class="iconfont icon">&#xe70b;</text>
				<text class="price">1200</text>
			</view>
			<view class="second_name"><span>Macbook Pro</span></view>
		</view>
		<view class="blank_line"></view>
		<view class="type">
			<text style="margin-left: 10px;">类型：</text>
			<text style="margin-right: 10px;" v-for="(type, index) in types">{{type}}</text>
		</view>
		<view class="blank_line"></view>
		<view class="quantity">
			<text style="margin-left: 10px;">成色：{{quantity}}</text>
		</view>
		<view class="blank_line"></view>
		<view class="contact">
			<view style="margin-left: 10px;">微信号：1234567</view>
			<view style="margin-left: 10px;">手机号：2343459234</view>
		</view>
		<view class="blank_line"></view>
		<view class="description">
			<view class="tit">详情介绍</view>
			<scroll-view class="scroll_page" scroll-y="true" :style="height">
				<rich-text  class="content">{{content}}</rich-text>
			</scroll-view>
		</view>
		<view class="favorite">
			<uni-goods-nav class="buy" :buttonGroup="buttonGroup" :options="options" fill="true" @buttonClick="toPay"></uni-goods-nav>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return{
				imageList:["/static/renwu.jpeg", "/static/renwu.jpeg", "/static/renwu.jpeg"],
				types:["电子产品", "学习用品"],
				quantity: "全新",
				distance_1: 0,
				distance_2: 0,
				height: "",
				buttonGroup: [{
					text: '收藏',
					backgroundColor: "#1684FC",
					color: '#fff'
				}],
				pattern: {
							buttonColor: '#007AFF',
							iconColor: '#fff'
						},
				options: [{
									icon: 'upload',
									text: '分享'
								}, 
								{
									icon: 'pyq',
									text: '朋友圈'
								}],
				content: "恶魔方面则是更像《女神异闻录》一些每个人只能携带一个恶魔上场，如果在战斗中更换“仲魔”，需要使用前文提到的“指挥官技能”。只不过本作并不像《女神异闻录》或者《幻影异闻录FE#》一样，除了主角之外都有固定的恶魔（好吧，或者说 Persona、幻影）。 作者：游戏时光VGtime https://www.bilibili.com/read/cv18456093?from=category_0 出处：bilibili在《灵魂骇客2》中，“仲魔”类似于“装备”，除了使用恶魔的技能和共享属性弱点之外，恶魔还会给角色提供数值面板方面的增益。也就是说，游戏鼓励玩家合成高等级的恶魔，以此获取更高的数值增益。 作者：游戏时光VGtime https://www.bilibili.com/read/cv18456093?from=category_0 出处：bilibili在《灵魂骇客2》中，“仲魔”类似于“装备”，除了使用恶魔的技能和共享属性弱点之外，恶魔还会给角色提供数值面板方面的增益。也就是说，游戏鼓励玩家合成高等级的恶魔，以此获取更高的数值增益。 作者：游戏时光VGtime https://www.bilibili.com/read/cv18456093?from=category_0 出处：bilibili"
			}
		},
		mounted() {
			const query = uni.createSelectorQuery().in(this);
			let a = 0;
			query.select('.tit').boundingClientRect();
			query.select('.buy').boundingClientRect();
			query.exec((res) => {
				this.distance_1 = res[0].bottom;
				this.distance_2 = res[1].top;
				console.log(this.distance_2 - this.distance_1);
				this.height = "height: " + (this.distance_2 - this.distance_1 - 20) + "px;";
				console.log(this.height);
			});
		},
	}
</script>

<style lang="scss">
	.secDetail {
		swiper {
			height: 500rpx;
	
			image {
				width: 100%;
				height: 100%;
			}
		}
		.type{
			display: inline;
		}
		.blank_line {
			height: 10rpx;
			width: 100%;
			background: #eee;
		}
		.basic {
			padding: 10px;
			.price-box {
				display:flex;
				flex-direction: row;
				align-items: center;
				font-size: 30rpx;
				color: darkred;
				
				/*
				text:nth-child(2) {
					color: #ccc;
					font-size: 28rpx;
					text-decoration: line-through;
					margin-left: 20rpx;
				}
				*/
				
				.price{
					line-height: 30rpx;
					font-size:30rpx;
				}
			}
		
			.second_name {
				font-size: 32rpx;
				line-height: 60rpx;
				font-weight: 600;
			}
		}
		.contact{
			position: relative;
		}
		.description {
			.tit {
				font-size: 32rpx;
				padding-left: 10px;
				border-bottom: 2px solid #eee;
				line-height: 70rpx;
			}
			
			.scroll_page{
				padding: 10px;
				width:calc(100% - 15px);
			}
		}
		.favorite {
			display: flex;
			flex-direction: column;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
		}
	}
</style>