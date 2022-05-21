<template>
	<view class="act_detail">
		<swiper indicator-dots>
			<swiper-item v-for="(item, index) in swipers" :key="index">
				<image :src="item"></image>
			</swiper-item>
		</swiper>
		<view class="basic">
			<view class="price">
				<span class="iconfont icon">&#xe70b;</span>
				<text class="new_price">{{new_price}}</text>
				<text v-if="show_price" class="original_price">{{original_price}}</text>
			</view>
			<view class="act_name">{{activity}}</view>
		</view>
		<view class="blank_line"></view>
		<view class="act_count">
			<view class="number">已参加的人数：{{count}}</view>
			<view class="number">可参与人数：{{total}}</view>
			<view class="number">剩余人数：{{remain}}</view>
		</view>
		<view class="blank_line"></view>
		<view class="description">
			<view class="tit">详情介绍</view>
			<scroll-view class="scroll_page" scroll-y="true" :style="height">
				<view class="content">{{description}}</view>
			</scroll-view>
		</view>
		<view class="act_buy">
			<uni-goods-nav v-if="enable" class="buy" :buttonGroup="buttonGroup" :options="options" fill="true" @buttonClick="toPay"></uni-goods-nav>
			<uni-goods-nav v-else class="buy" :buttonGroup="buttonGroup" :options="options" fill="true"></uni-goods-nav>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				enable: true,
				count: 50,
				total: 50,
				remain: 0,
				activity: "五彩缤纷赏花节",
				show_price: true,
				original_price: 1000,
				discount: 0.85,
				new_price: 0,
				distance_1: 0,
				distance_2: 0,
				height: "",
				sample: "hao",
				description: "赏花节，有时人们又称为看花节，是四川省阿坝州马尔康地区藏族人民的传统节日。每年农历六月举行，为期三、五天或十来天不等。 农历六月，雪山草地百花盛开，牧草如茵，自然风光十分迷人。各村寨根据自己的实际情况，或在月初，或在月中，或在月末过节。届时藏族人民带着食品、帐篷，骑着披红挂彩的骏马，成群结队地在野外游走对歌，欣赏大自然的美景。然后选择山花烂漫的山岗，或绿草如茵的草坪，搭起帐篷，熬上茶，盛满青稞酒。人们聚集一起赏花品酒，交流放牧经验。 晚上，草坪上燃起一堆堆篝火，人们且饮且舞，或放声歌唱。近年来，赏花节更为热闹，除赏花，品酒，唱歌，跳舞，欣赏大自然外，还增添了摔跤，赛马，文艺演出等文体内容。传统赏花节中的祈祷人口增殖、生殖繁盛已淹没在历史的波涛巨浪之中。",
				swipers: [
					"../../static/detail_sample/hua1.jpeg",
					"../../static/detail_sample/hua2.jpeg",
					"../../static/detail_sample/hua3.jpeg",
					"../../static/detail_sample/hua4.jpeg"
				],
				buttonGroup: [{
					text: '立即参加',
					backgroundColor: "#1684FC",
					color: '#fff'
				}],
				options: [],
			}
		},
		onLoad(options) {
			let obj = JSON.parse(decodeURIComponent(options.actDetail));
			console.log(obj);
		},
		methods: {
			update_price() {
				if (this.discount == 0) {
					this.new_price = this.original_price;
					this.show_price = false;
				} else {
					this.new_price = this.original_price * this.discount;
				}
			},
			update_number(){
				this.remain = this.total - this.count
			},
			update_button(){
				if(this.remain == 0){
					this.buttonGroup[0].text = "人数已满";
					this.buttonGroup[0].backgroundColor = "#A8A8A8";
					this.buttonGroup[0].color = "#101010";
					this.enable = false;
				}
			},
			toPay(){
				console.log("点击成功");
			}
		},
		mounted() {
			this.update_price();
			this.update_number();
			this.update_button();
			console.log(this.new_price);
			const query = uni.createSelectorQuery().in(this);
			let a = 0;
			query.select('.tit').boundingClientRect();
			query.select('.buy').boundingClientRect();
			query.exec((res) => {
				this.distance_1 = res[0].bottom;
				this.distance_2 = res[1].top;
				console.log(this.distance_2 - this.distance_1);
				this.height = "height: " + (this.distance_2 - this.distance_1) + "px;";
				console.log(this.height);
			});
		}
	}
</script>

<style>
@import "@/static/iconfont.css";
</style>
<style lang="scss">
	.icon{
		font-size:35rpx;
	}
	.act_detail {
		swiper {
			height: 500rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.basic {
			padding: 10px;

			.price {
				display:flex;
				flex-direction: row;
				align-items: center;
				font-size: 30rpx;
				color: darkred;

				text:nth-child(3) {
					color: #ccc;
					font-size: 28rpx;
					text-decoration: line-through;
					margin-left: 20rpx;
				}
			}

			.act_name {
				font-size: 32rpx;
				line-height: 60rpx;
				font-family: serif;
			}
		}

		.blank_line {
			height: 10rpx;
			width: 100%;
			background: #eee;
		}

		.number {
			padding: 0 10px;
			font-size: 32rpx;
			line-height: 50rpx;
		}

		.description {
			.tit {
				font-size: 32rpx;
				padding-left: 10px;
				border-bottom: 2px solid #eee;
				line-height: 70rpx;
			}

			.content {
				padding: 10px;
				font-size: 28rpx;
				color: #333;
			}
		}

		.act_buy {
			display: flex;
			flex-direction: column;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
		}
	}
</style>
