<template>
	<view>
		<swiper class="swiper" indicator-dots>
			<swiper-item v-for="(image, index) in secondItem.imageList">
				<image :src="image"></image>
			</swiper-item>
		</swiper>
		<view class="basic">
			<view class="price-box">
				<view class="row-container" style="align-items: center;">
					<view class="iconfont icon">&#xe70b;</view>
					<view class="price"><text>1200</text></view>
					<view class="row-container tag"><text>全新</text></view>
					<view class="row-container tag"><text>自取</text></view>
				</view>
				<view class="row-container">
					<img class="shoucang" :src="shoucang" @click="setShouCang" />
				</view>
			</view>
			<view class="second-name"><text>{{secondItem.name}}</text></view>
		</view>
		<view class="contact">
			<view class="contact-box">
				<img class="avatar"
					:src="'https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/' + 1 + '.jpg'">
				<text class="nickname">小红豆</text>
				<view class="copy-box">
					<text>复制</text>
					<img class="copy-img" src="/static/fuzhi.png" @click="setClipboardData">
				</view>
			</view>
			<view class="weixin">微信号：{{secondItem.contact[0]}}</view>
		</view>
		<view class="description">
			<view class="scroll-page">
				<rich-text>
					{{secondItem.content + secondItem.content + secondItem.content + secondItem.content}}
				</rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shoucang: "/static/weishoucang.png",
				secondItem: {
					name: "Macbook Pro 2022 1TB M2 非海南免税版",
					imageList: ["/static/renwu.jpeg", "/static/renwu.jpeg", "/static/renwu.jpeg"],
					contact: ["123456"],
					types: ["电子产品", "学习用品"],
					quantity: "几乎全新",
					content: "全新 M2 芯片现身，13 英寸 MacBook Pro 实力大涨。同样的紧凑设计之下，电池续航最长达 20 小时1，并以主动散热系统让强悍性能持续迸发。还有绚丽的视网膜显示屏、FaceTime 高清摄像头和录音棚级麦克风也全部到位，一台超机动的专业级笔记本电脑整装待发。"
				},
			}
		},

		onShareTimeline() {
			return {
				title: this.secondItem.name,
				imageUrl: "/static/renwu.jpeg",
				path: '/pages/detail/secondDetail?secondItem=' + encodeURIComponent(JSON.stringify(this.secondItem))
			}
		},

		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
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
		methods: {
			setClipboardData: function() {
				uni.setClipboardData({
					data: " 微信号: " + this.secondItem.contact[0],
					success: function() {
						console.log('success');
					}
				});
			},
			setShouCang: function() {
				if (this.shoucang == "/static/shoucang.png") {
					this.shoucang = "/static/weishoucang.png";
				} else {
					this.shoucang = "/static/shoucang.png";
				}
			}
		}
	}
</script>

<style lang="scss">
	.weixin {
		margin-top: 10px;
		margin-left: 40px;
		margin-bottom: 2vw;
		color: dimgray;
	}

	.row-container {
		display: flex;
		flex-direction: row;
	}

	.tag {
		padding: 2px 10px 2px 10px;
		font-size: 13px;
		margin-left: 10px;
		background-color: #1e90ff;
		height: 25px;
		border-radius: 5px;
		color: #f5f5f5;
		align-items: center;
	}

	.type {
		display: inline;
	}

	.iconfont {
		font-size: 30px;
		font-weight: 600;
		color: darkblue;
	}

	.price {
		font-size: 25px;
		font-weight: bold;
		color: darkblue;
	}

	.shoucang {
		height: 7vw;
		width: 7vw;
		margin-right: 10px;
	}

	.price-box {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		height: 40px;
	}

	.second-name {
		padding: 5px;
		font-size: 18px;
		font-weight: 700;
	}

	.basic {
		margin-bottom: 2vh;
		margin-top: 1vh;
	}

	.contact-box {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 50px;
		width: 100vw;
	}

	.avatar {
		height: 50px;
		width: 50px;
		border-radius: 50%;
		margin-left: 10px;
	}

	.nickname {
		margin-left: 10px;
		width: calc(100vw - 120px);
	}

	.copy-box {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 50px;
		font-size: 11px;
		color: #999999;
		align-items: center;
		justify-content: center;
		margin-right: 10px;
	}

	.copy-img {
		height: 30px;
		width: 30px;
	}

	.swiper {
		height: 500rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.scroll-page {
		padding: 10px;
		width: calc(100% - 20px);
		line-height: 30px;
	}
</style>
