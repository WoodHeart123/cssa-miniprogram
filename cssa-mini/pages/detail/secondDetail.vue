<template>
	<view class="secDetail">
		<swiper indicator-dots>
			<swiper-item v-for="(image, index) in secondItem.imageList">
				<image :src="image"></image>
			</swiper-item>
		</swiper>
		<view class="blank_line"></view>
		<view class="basic">
			<view class="price-box">
				<view class="iconfont icon">&#xe70b;</view>
				<view class="price">12</view>
				<img class="shoucang" src="/static/yishoucang.png" :style="left"/>
			</view>
			<view class="second_desc">
				<view class="quantity-tag"><view class="quantity-content">全新</view></view>
				<view class="deliver-tag"><view class="deliver-content">自取</view></view>
				<text class = "second_name">{{secondItem.name}}</text>
			</view>
		</view>
		<view class="blank_line"></view>
		<view class="contact">
			<view class="contact-box">
				<view class="contact-tag">
					<view class="contact-content">联系方式</view>
				</view>
				<view class="fuzhi-bt" :style="left_1">
					<img class="fuzhi-img" src="/static/fuzhi.png" @click="setClipboardData">
				</view>
			</view>
			<view style="margin-left: 13px;">微信号：{{secondItem.contact[0]}}</view>
			<view style="margin-left: 13px; margin-bottom: 10px;">手机号：{{secondItem.contact[1]}}</view>
		</view>
		<view class="blank_line"></view>
		<view class="description">
			<view class="tit">
				<view class="tit-tag">
					<view class="tit-content">详情介绍</view>
				</view>
				<!--
				<button class="share" style="background-color: #7f7f7f;height: 7vw; width: 20vw; padding-left: 20vw;" open-type="share">
					<img class="share-img" src="/static/fenxiang.png">
				</button>
				-->
			</view>
			<view class="blank_line_1"></view>
			<!--
			<scroll-view class="scroll_page" scroll-y="true" :style="height">
				<rich-text  class="content">{{secondItem.content}}</rich-text>
			</scroll-view>
			-->
			<view class="scroll_page">
				<rich-text class="content">{{secondItem.content}}</rich-text>
			</view>
		</view>
		<view class="white"/>
		<!--
		<view class="favorite">
			<button class="share" style="background-color: #f5f5f5;" open-type="share">
				<img class="share-img" src="/static/fenxiang.png">
			</button>
			<button class="buy" type="primary">收藏</button>
		</view>
		-->
	</view>
</template>

<script>
	export default {
		data() {
			return{
				distance_1:0,
				distance_2:0,
				left:"",
				left_1:"",
				secondItem:{
					name:"Macbook Pro",
					imageList:["/static/renwu.jpeg", "/static/renwu.jpeg", "/static/renwu.jpeg"],
					contact:["123456", "123456789"],
					types:["电子产品", "学习用品"],
					quantity: "全新",
					content: "恶魔方面则是更像《女神异闻录》一些每个人只能携带一个恶魔上场，如果在战斗中更换“仲魔”，需要使用前文提到的“指挥官技能”。只不过本作并不像《女神异闻录》或者《幻影异闻录FE#》一样，除了主角之外都有固定的恶魔（好吧，或者说 Persona、幻影）。 作者：游戏时光VGtime https://www.bilibili.com/read/cv18456093?from=category_0 出处：bilibili在《灵魂骇客2》中，“仲魔”类似于“装备”，除了使用恶魔的技能和共享属性弱点之外，恶魔还会给角色提供数值面板方面的增益。也就是说，游戏鼓励玩家合成高等级的恶魔，以此获取更高的数值增益。 作者：游戏时光VGtime https://www.bilibili.com/read/cv18456093?from=category_0 出处：bilibili在《灵魂骇客2》中，“仲魔”类似于“装备”，除了使用恶魔的技能和共享属性弱点之外，恶魔还会给角色提供数值面板方面的增益。也就是说，游戏鼓励玩家合成高等级的恶魔，以此获取更高的数值增益。 作者：游戏时光VGtime https://www.bilibili.com/read/cv18456093?from=category_0 出处：bilibili"
				},
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
				options: []
				}
		},
		
		onShareTimeline() {
			return{
				title: this.secondItem.name,
				imageUrl: "/static/renwu.jpeg",
				path: '/pages/detail/secondDetail?secondItem=' + encodeURIComponent(JSON.stringify(this.secondItem))
			}
		},
		
		onShareAppMessage(res) {
			if (res.from === 'button') {// 来自页面内分享按钮
			    console.log(res.target)
			  }
			  return {
			    title: this.secondItem.name + ": $" + 1200,
				desc: "CSSA二手交易平台",
				content: "very happy",
				imageUrl: "/static/renwu.jpeg",
			    path: '/pages/detail/secondDetail?secondItem=' + encodeURIComponent(JSON.stringify(this.secondItem))
			  }
		},
		mounted() {
			const query = uni.createSelectorQuery().in(this);
			let a = 0;
			var width = 0;
			uni.getSystemInfo({
				success: function(res){
					width = res.screenWidth;
				}
			})
			query.select('.price').boundingClientRect();
			query.select('.contact-content').boundingClientRect();
			query.exec((res) => {
				this.distance_1 = res[0].right;
				this.distance_2 = res[1].right;
				console.log(this.distance_1);
				console.log(this.distance_2);
				this.left = "padding-left: " + (0.95*width - this.distance_1 - 0.07*width) + "px;";
				this.left_1 = "margin-left: " + (0.95*width - this.distance_2 - 0.07*width) + "px;";
				console.log(this.height);
			});
		},
	
		methods: {
			setClipboardData: function() {
				uni.setClipboardData({
					data: "电话号: " + this.secondItem.contact[0] + " 微信号: " + this.secondItem.contact[1],
					success: function () {
						console.log('success');
					}
				});
			}
		}
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
			height: 2px;
			width: 90vw;
			background: #eee;
			margin-left: 5vw;
		}
		.basic {
			//padding-left: 10px;
			//padding-right: 10px;
			.price-box {
				display:flex;
				flex-direction: row;
				//align-items: center;
				
				/*
				text:nth-child(2) {
					color: #ccc;
					font-size: 28rpx;
					text-decoration: line-through;
					margin-left: 20rpx;
				}
				*/
				.iconfont{
					padding-left: 8px;
					padding-top: 5px;
					font-size: 25px;
					font-weight: bold;
					color: #e13f05;
				}
				
				.price{
					font-size:25px;
					font-weight: bold;
					color: #e13f05;
				}
				
				.shoucang{
					height: 7vw;
					width: 7vw;
					padding-top: 5px;
					//padding-left: 65.5vw;
				}
				
			}
			
			.second_desc{
				display:flex;
				flex-direction: row;
				.quantity-tag{
					font-size: 13px;
					margin-left: 8px;
					padding-left: 5px;
					color: #db3024;
					.quantity-content{
						margin-top: 3px;
						padding-left: 5px;
						padding-right: 5px;
						background-color: #f2b4b0;
						border-radius: 5px;
					}
				}
				.deliver-tag{
					font-size: 13px;
					padding-left: 5px;
					color: #db3024;
					.deliver-content{
						margin-top: 3px;
						padding-left: 5px;
						padding-right: 5px;
						background-color: #f2b4b0;
						border-radius: 5px;
					}
				}
				.second_name {
					padding-left: 10px;
					padding-right: 10px;
					font-size: 18px;
					//line-height: 40px;
					font-weight: 700;
				}
			}
		}
		.contact{
			.contact-box{
				display: flex;
				flex-direction: row;
				.contact-tag{
					margin-top: 7px;
					font-size: 13px;
					margin-left: 8px;
					padding-left: 5px;
					color: #db3024;
					.contact-content{
						margin-top: 3px;
						padding-left: 5px;
						padding-right: 5px;
						background-color: #f2b4b0;
						border-radius: 5px;
					}
				}
				.fuzhi-bt{
					height: 8vw;
					width: 8vw;
					//margin-left: 68vw;
					//background-color: #db3024;
					margin-top: 2vw;
					.fuzhi-img{
						height: 7vw;
						width: 7vw;
					}
				}
			}
		}
		.description {
			/*
			.tit {
				font-size: 32rpx;
				padding-left: 10px;
				//border-bottom: 2px solid #eee;
				line-height: 70rpx;
			}
			*/
		   .tit{
			   display: flex;
			   flex-direction: row;
			   .tit-tag{
			   	margin-top: 7px;
			   	font-size: 13px;
			   	margin-left: 8px;
			   	padding-left: 5px;
			   	color: #db3024;
					.tit-content{
						margin-top: 3px;
						padding-left: 5px;
						padding-right: 5px;
						background-color: #f2b4b0;
						border-radius: 5px;
					}
			   }
				.share::after{
					border: none;
				}
				
				.share-img{
					height: 7vw;
					width: 7vw;
					//padding-top: 5px;
				}
		   }
			
			.blank_line_1 {
				height: 2px;
				background: #eee;
				//margin-left: 5vw;
				margin-top: 2vw;
			}
			
			.scroll_page{
				padding: 10px;
				width:calc(100% - 15px);
			}
			
		}
		.favorite {
			padding-top: 1vh;
			height: 8vh;
			display: flex;
			flex-direction: row;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: #f5f5f5;
			
			.buy{
				border-radius: 100px;
				height: 6vh;
				width: 70vw;
				background-color: dodgerblue;
			}
			
			
			.share-img{
				padding-top: 1vh;
				height:8vw;
				width: 8vw;
			}
		}
		.white{
			//height: 9vh;
			height: 2vh;
		}
	}
</style>
<!--<uni-goods-nav class="buy" :buttonGroup="buttonGroup" :options="options" fill="true" @buttonClick="toPay"></uni-goods-nav>-->