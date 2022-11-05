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
				<view class="price">1200</view>
				<img class="shoucang" :src="shoucang" :style="left" @click="setShouCang"/>
			</view>
			<view class="second_desc">
				<view class="quantity-tag"><view class="quantity-content">全新</view></view>
				<view class="deliver-tag"><view class="deliver-content">自取</view></view>
			</view>
			<view class = "second_name">{{secondItem.name}}</view>
		</view>
		<view class="blank_line"></view>
		<view class="contact">
			<view class="contact-box">
				<!--
				<view class="contact-tag">
					<view class="contact-content">联系方式</view>
				</view>
				-->
				<view class="avatar-box">
					<img class="avatar" 
						:src="'https://cssa-mini.oss-cn-shanghai.aliyuncs.com/cssa-mini-avatar/' + 1 + '.png'">
				</view>
				<text class="nickname" style="margin-left: 10px; margin-top: 4vw;">小红豆</text>
				<view class="fuzhi-bt" :style="left_1">
					<view class="fuzhi-string" style="font-size: 11px; margin-left: 2px; margin-top: 5px; color: #999999">复制</view>
					<img class="fuzhi-img" src="/static/fuzhi.png" @click="setClipboardData">
				</view>
			</view>
			<view class="weixin" style="margin-top: 10px;margin-left: 40px; margin-bottom: 2vw; color: dimgray;">微信号：{{secondItem.contact[0]}}</view>
		</view>
		<view class="blank_line"></view>
		<view class="description">
			<!--
			<view class="tit">
				<view class="tit-tag">
					<view class="tit-content">详情介绍</view>
				</view>
				<button class="share" style="background-color: #7f7f7f;height: 7vw; width: 20vw; padding-left: 20vw;" open-type="share">
					<img class="share-img" src="/static/fenxiang.png">
				</button>
			</view>
			-->
			<!--<view class="blank_line_1"></view>-->
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
				shoucang: "/static/weishoucang.png",
				distance_1:0,
				distance_2:0,
				left:"",
				left_1:"",
				secondItem:{
					name:"Macbook Pro 2022 1TB M2 非海南免税版",
					imageList:["/static/renwu.jpeg", "/static/renwu.jpeg", "/static/renwu.jpeg"],
					contact:["123456"],
					types:["电子产品", "学习用品"],
					quantity: "几乎全新",
					content: "全新 M2 芯片现身，13 英寸 MacBook Pro 实力大涨。同样的紧凑设计之下，电池续航最长达 20 小时1，并以主动散热系统让强悍性能持续迸发。还有绚丽的视网膜显示屏、FaceTime 高清摄像头和录音棚级麦克风也全部到位，一台超机动的专业级笔记本电脑整装待发。"
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
			query.select('.nickname').boundingClientRect();
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
					data: " 微信号: " + this.secondItem.contact[0],
					success: function () {
						console.log('success');
					}
				});
			}, 
			setShouCang: function() {
				if(this.shoucang == "/static/shoucang.png"){
					this.shoucang = "/static/weishoucang.png";
				} else{
					this.shoucang = "/static/shoucang.png";
				}
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
					font-weight: 500;
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
					padding-right: 5px;
					font-size: 13px;
					margin-left: 12px;
					padding-left: 5px;
					padding-bottom: 4px;
					background-color: #1e90ff;
					border-radius: 5px;
					color: #f5f5f5;
					.quantity-content{
						margin-top: 3px;
						padding-left: 5px;
						padding-right: 5px;
						//background-color: #1e90ff;
						//border-radius: 5px;
					}
				}
				.deliver-tag{
					margin-left: 6px;
					font-size: 13px;
					padding-left: 5px;
					padding-right: 6px;
					color: #f5f5f5;
					background-color: #1e90ff;
					border-radius: 5px;
					.deliver-content{
						margin-top: 3px;
						padding-left: 5px;
						padding-right: 5px;
						//background-color: #1e90ff;
						//border-radius: 5px;
					}
				}
			}
			.second_name {
				padding-left: 13px;
				padding-right: 13px;
				padding-top: 5px;
				padding-bottom: 5px;
				font-size: 18px;
				//line-height: 40px;
				font-weight: 700;
			}
		}
		.contact{
			.contact-box{
				display: flex;
				flex-direction: row;
				/*
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
				*/
			   .avatar-box{
				   margin-top: 1vw;
				   margin-left: 13px;
					.avatar{
						height: 11vw;
						width: 11vw;
						border-radius: 50%;
					}
			   }
				.fuzhi-bt{
					height: 8vw;
					width: 8vw;
					//margin-left: 68vw;
					//background-color: #db3024;
					//margin-top: 1vw;
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
			//style="font-size: 10px; margin-left: 88.7vw; color: "
		}
	}
</style>
<!--<uni-goods-nav class="buy" :buttonGroup="buttonGroup" :options="options" fill="true" @buttonClick="toPay"></uni-goods-nav>-->