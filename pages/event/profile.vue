<template>
	<view id="profile-page">
		<view class="top-bar">
			<view class="top-icon" v-if="isVisitor" @click="navigateBack">
				<uni-icons type="arrowleft" size="25"></uni-icons>
			</view>
			<view class="top-icon" v-if="!isVisitor">
				<uni-icons type="compose" size="25" color="#7F0019"></uni-icons>
			</view>
		</view>
		<view class="avatar-box">
			<image src="https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/1.jpg"></image>
		</view>
		<view class="username-box">
			<text class="heading-2">Jenny Wany</text>
		</view>
		<view class="follow-row">
			<view class="follow-box">
				<view>
					<text class="follow-number">120</text>
				</view>
				<view class="follow-text">
					<text class="follow-text paragraph-1">Following</text>
				</view>
			</view>
			<view class="follow-box">
				<view>
					<text class="follow-number">12</text>
				</view>
				<view>
					<text class="follow-text paragraph-1">Followers</text>
				</view>
			</view>
		</view>
		<view class="info-row">
			<view class="wechat-id-box">
				<view class="center-container-row">
					<uni-icons type="weixin" color="#161616" size="20"></uni-icons>
					<text class="wechat-id" >sunny41</text>
				</view>
				<view class="copy-image">
					<image class="copy-img" src="../../static/event/copy.svg" />
				</view>
			</view>
			<view v-if="isVisitor" class="button-box">
				<button class="button">
					<uni-icons type="personadd" size="20" color="#FFFFFF"></uni-icons>
					<text>Follow</text>
				</button>
			</view>
			<view v-else class="privacy-box">
				<uni-tooltip class="item" content="示例文字" placement="bottom">
					<view class="item"><text>Hide My Profile</text></view>
				</uni-tooltip>
				<uni-icons v-show="!hideProfile" type="eye-filled" color="#7F0019" @click="onClickPrivacyIcon" size="25"></uni-icons>
				<uni-icons v-show="hideProfile" type="eye-slash-filled" color="#7F0019" @click="onClickPrivacyIcon" size="25"></uni-icons>
			</view>
		</view>
		<view class="bio-row">
			<view class="title">
				<text class="heading-3">About</text>
			</view>
			<view style="margin-top: 10px;">
				<text class="bio-text paragraph-1">I'm a senior student who is majoring in Design, I love food, travel, and make friends!</text>
			</view>
		</view>
		<view class="segment">
			<uni-segmented-control  :current="current" :values="items" style-type="text"
				active-color="#7F0019" @clickItem="onClickItem" />
		</view>
		<view class="event-container">
			<div v-for="(num, index) in 3" :key="index" class="event-frame">
				<event-box :isHost="current==0" :ifJoined="current==1"></event-box>
			</div>
		</view>
		
		<event-tab-bar clicked="profile" v-if="!isVisitor"></event-tab-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isVisitor: false,
				items: ['Events I Created', 'Events I Joined'],
				current: 0,
				hideProfile: false,
			}
		},
		components: {
			eventTabBarVue,
			eventBoxVue
		
		},
		methods: {
			onClickPrivacyIcon(){
				this.hideProfile = !this.hideProfile;
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			navigateBack(){
				uni.navigateBack({
					delta: 1
				})
			}
		},
		onLoad(options) {
			this.isVisitor = Boolean(options.isVisitor);
			if(this.isVisitor){
				this.items = ['Created Events', 'Joined Events'];
			}
			console.log(this.isVisitor)
		},
	}
	import eventBoxVue from '@/components/event-box/event-box.vue'
	import eventTabBarVue from '@/components/event-tab-bar/event-tab-bar.vue'
</script>

<style lang="scss">
	#profile-page{
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100vw;
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
		}

	}
	
	.avatar-box{
		width: 150px;
		height: 150px;
		border-radius: 33px;
		margin-top: 20px;
		
		image{
			width: 100%;
			height: 100%;
			border-radius: 33px;
		}
	}
	
	.follow-row{
		display: flex;
		width: 150px;
		justify-content: space-between;
		
		.follow-box{
			display: flex;
			flex-direction: column;
			align-items: center;
			
			.follow-number{
				font-weight: 500;
				font-size: 14px;
				line-height: 24px;
			}
			
			.follow-text{
				color: #747688
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
	
	.username-box{
		margin-top: 15px;
	}
	
	.info-row{
		display: flex;
		margin-top: 10px;
		width: 86vw;
		justify-content: space-between;
		.wechat-id-box{
			box-shadow: 0px 4px 10px 0px #0000000F;
			padding: 10px 15px;
			background-color: $main-background-color-2;
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 42%;
			border-radius: 15px;
			.copy-image{
				display: flex;
				align-items: center;
				image{
					width: 20px;
					height: 20px;
				}
			}
		}
		
		.wechat-id{
			margin-left: 3px;
			color: $shade-darker-gray;
		}
		
		.privacy-box{
			box-shadow: 0px 4px 10px 0px #0000000F;
			display: flex;
			padding: 10px 15px;
			background-color: $main-background-color-2;
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 52%;
			border-radius: 15px;
			
			text{
				font-size: 14px;
				line-height: 24px;
			}
		}
		
		.button-box{
			width: 40%;
		}
		
		.center-container-row{
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	
	.bio-row{
		width: 86vw;
		margin-top: 20px;
		
		.bio-text{
			color: $shade-darker-gray;
		}
	}
	
	.segment{
		width: 86vw;
		margin-top: 20px;
	}
	
	.event-container{
		width: 86vw;
		margin-bottom: 10vh;
		.event-frame{
			margin: 10px 0;
			height: 140px;
		}
	}
</style>