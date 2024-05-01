<template>
	<view>
		<view class="top-bar">
			<view class="top-icon" @click="navigateBack">
				<uni-icons type="arrowleft" size="25"></uni-icons>
			</view>
			<view class="heading-3 top-text">
				<text style="color: white">Event Details</text>
			</view>
		</view>

		<view class="background-image"></view>
		<view class="event-detail-box">
			<view class="date-box">
				<text class="heading-3">Apr</text>
				<text class="heading-1">16</text>
			</view>
			<view class="detail-box">
				<view class="header-row">
					<text class="heading-3">Mahjoon Night</text>
					<view class="price-box"  :class="{'joined': ifJoined}">
						<text class="paragraph-1" v-if="!ifJoined">$</text>
						<text class="paragraph-1" v-if="!ifJoined">Free</text>
						<text v-if="ifJoined">Joined</text>
					</view>
					<view ></view>
				</view>
				<div class="row">
					<image class="icon" src="@/static/act/time.svg"></image>
					<text class="text paragraph-1">Fri, Apr 16 7:30</text>
				</div>
				<div class="row">
					<image class="icon" src="@/static/act/location.svg"></image>
					<text class="text paragraph-1">Washington Ave, Madison</text>
				</div>
			</view>
		</view>
		<view class="section-box">
			<view class="title"><text class="heading-3">About</text></view>
			<view>All levels are welcome to enjoy a night of strategy and fun. Don't miss out on this fantastic blend of
				culture, challenge, and community!</view>
		</view>
		<view class="section-box">
			<view class="title"><text class="heading-3">Who's going?</text></view>
			<view class="section-bar" @click="viewUserProfile">
				<view class="row">
					<view class="avatar-box" style="position: relative;">
						<div class="image-wrapper">
							<image  :src="translateAvatar(1)" />
						</div>
					</view>
					<view class="mid-text-box">
						<text class="paragraph-1">Jenny Wang</text>
					</view>
				</view>
				<view class="button-box">
					<button class="button icon-button">
						<uni-icons type="personadd" size="20" color="#7F0019"></uni-icons>

						<text>Follow</text>
					</button>
				</view>
			</view>
		</view>
		<view class="section-box">
			<view class="title"><text class="heading-3">Host</text></view>
			<view class="section-bar">
				<view class="row">
					<view class="avatar-box">
						<div v-for="(avatar, index) in avatarList" :style="{'left': calculateOffset(index), 'z-index': 10-index}" class="image-wrapper">
							<image  :src="translateAvatar(avatar)" />
						</div>
					</view>
					<view class="mid-text-box" :style="{'marginLeft': calculateTextOffset() }">
						<text class="paragraph-1">+</text>
						<text class="paragraph-1">10</text>
						<text class="heading-3 going-text">Going</text>
					</view>
				</view>
				<view class="button-box">
					<button class="button">
						<text>View</text>
					</button>
				</view>
			</view>
		</view>
		<view class="bottom-bar" v-show="!ifJoined">
			<button class="share-button" open-type="share" >
				<image src="../../static/event/share.svg"></image>
			</button>
			<button class="button" @click="onClickJoinEvent">
				<text>Join The Event</text>
			</button>
		</view>
		
		<view class="bottom-bar joined" v-show="ifJoined">
			<button class="share-button" open-type="share" >
				<image src="../../static/event/share-white.svg"></image>
			</button>
			<text class="heading-3" style="color:white">You're Going</text>
			<button class="button" @click="onClickCancelEvent">
				<text>Cancel RSVP</text>
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatarList: [1, 2, 3],
				ifJoined: false
			}
		},
		methods: {
			translateAvatar(index){
				return 'https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/' + index + '.jpg'
			},
			calculateOffset(index){
				return `${index * 25}px`;
			},
			calculateTextOffset(){
				if(this.avatarList.length < 3){
					return `${(this.avatarList.length - 1) * 25 + 5}px`
				}else{
					return `${2 * 25 + 5}px`
				}
			},
			navigateBack(){
				uni.navigateBack({
					delta: 1
				})
			},
			viewUserProfile(){
				uni.navigateTo({
					url: "/pages/event/profile?isVisitor=true"
				})
			},
			onClickJoinEvent(){
				this.ifJoined = true;
			},
			onClickCancelEvent(){
				this.ifJoined = false;
			}
		}
	}
</script>

<style lang="scss">
	
	.bottom-bar{
		position: fixed;
		bottom: 20px;
		width: 90vw;
		height: 40px;
		left: 5vw;
		display: flex;
		justify-content: space-between;
		align-items: center;
		
		image{
			height: 25px;
			width: 25px;
			margin-left: 20px;
		}
		.button{
			width: 80%;
			margin: 0;
		}
		
		.share-button{
			background-color: transparent;
			border: none !important;
			border-color: transparent;
			padding-left: 0px;
			padding-right: 0px;
			border-radius: 0;
			margin: 0;
			display: flex;
			align-items: center;
			outline: none !important;
		}
		
		.share-button:after {
		    content: none;
		}
		 
		.share-button::after {
		    border: none;
		}
		
		
	}
	
	.bottom-bar.joined{
		background-color: $main-primary-color;
		width: 100vw;
		padding: 20px 3vw 20px 5vw;
		height: 80px;
		left: 0;
		bottom: 0;
		
		image{
			margin-left: 0;
		}
		
		.button{
			background-color: $main-background-color-2;
			width: 40%;
			text{
				white-space: nowrap;
				color: $main-primary-color;
			}
		}
	}
	
	.section-box{
		width: 90vw;
		margin: 2vh 5vw;
		
		.title{
			margin-bottom: 10px;
		}
		
		.section-bar{
			display: flex;
			width: 100%;
			height: 80px;
			background-color: $main-background-color-2;
			border-radius: 50px;
			align-items: center;
			padding: 0 20px;
			justify-content: space-between;
			
			.row{
				display: flex;
			}
			.button-box{
				margin-right: 0;
				
				.button{
					background-color: $main-background-color-2;
					
					text{
						color: $main-primary-color;
					}
				}
			}
			
			.mid-text-box{
				display: flex;
				align-items: center;
				margin-left: 10px;
				
				.going-text{
					color: $main-primary-color;
					margin-left: 3px;
				}
				
			}

			.avatar-box{
				position: relative;
				display: flex;
				width: 50px;
				height: 50px;
				margin: 0;
				align-items: center;
				
				.image-wrapper{
					display: flex;
					align-items: center;
					justify-content: center;
					position: absolute;
					width: 53px;
					height: 53px;
					border-radius: 53px;
					background-color: $main-background-color-2;
					
					image{
						width: 50px;
						height: 50px;
						border-radius: 50px;
					}
				}
				
			
			}
		}
	}
	
	.button{
		uni-icons{
			height: 20px;
			display: flex;
			align-items: center;
			margin-right: 10px;
		}
	}
	.top-bar {
		background-color: transparent;
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		z-index: 10;
		margin-top: 7vh;
		width: 100vw;

		.top-icon {
			box-shadow: 0px 4px 10px 0px #2020200F;
			position: absolute;
			left: 5%;
			background-color: $main-background-color-2;
			width: 40px;
			height: 40px;
			border-radius: 15px;
			display: flex;
			align-items: center;
			justify-content: center;
			padding-right: 3px;
		}

		.top-text {
			margin-left: 20px;
			height: 100%;
			color: white;
			display: flex;
			align-items: center;
		}
	}

	.background-image {
		background-image: url("https://7072-prod-9gip97mx4bfa32a3-1312104819.tcb.qcloud.la/cssa-event/unsplash_4oQKKgKTipM.png");
		min-height: 35vh;
		min-width: 100vw;
		position: absolute;
		top: 0;
		background-size: 100% 100%;
		z-index: 2;
		border-radius: 0 0 20px 20px;
	}


	.event-detail-box {
		position: relative;
		margin: 20vh 5vw 0 5vw;
		background-color: $main-background-color-2;
		height: 130px;
		z-index: 10;
		display: flex;
		border-radius: 20px;
		width: 90vw;
		padding: 5px 20px;
		align-items: center;

		.date-box {
			padding: 10px 25px;
			border-radius: 20px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			background-color: $main-primary-color;
			align-items: center;
			z-index: 10;

			text {
				color: $main-background-color-2;
			}
		}

		.detail-box {
			margin-left: 20px;
			width: 70%;
			z-index: 10;

			.header-row {
				display: flex;
				margin-bottom: 10px;
				align-items: center;
				justify-content: space-between;

				.price-box {
					margin-left: 3px;
					background-color: $main-background-color;
					padding: 0 10px;
					border-radius: 10px;

					text {
						color: $main-primary-color;
					}
				}
				.price-box.joined{
					background-color: $main-secondary-color;
					
					text{
						color: $main-background-color-2;
					}
				}
			}

			.row {
				display: flex;
				flex-direction: row;
				width: 100%;
				height: 20%;
				align-items: center;
				margin-top: 3px;

				.icon {
					width: 14px;
					height: 14px;
					margin-right: 5px;
				}

				.text {
					color: $shade-darker-gray;
					white-space: nowrap;
				}
			}

		}
	}
</style>