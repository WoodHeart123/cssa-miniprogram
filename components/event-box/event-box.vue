<template>
	<view class="event-box" @click="toEventDetail">
		<view class="image-box">
			<image src="https://7072-prod-9gip97mx4bfa32a3-1312104819.tcb.qcloud.la/cssa-event/mahjong.png"></image>
		</view>
		<view class="content-box">
			<view class="header-row"><text class="heading-3">Mahjong Night</text></view>
			<div class="row" style="margin-top: 5px">
				<image class="icon" src="@/static/act/time.svg"></image>
				<text class="time-text paragraph-1">Fri, Apr 16 7:30</text>
			</div>
			<div class="row">
				<image class="icon" src="@/static/act/location.svg"></image>
				<text class="location-text paragraph-1">Washington Ave, Madison, WI</text>
			</div>
			<view class="sub-row">
				<view class="button joined disabled" v-if="ifJoined">
					<text>Joined</text>
				</view>
				<view class="category-box" v-if="!isHost&&!ifJoined">
					<image v-for="(category, index) in categories" :src="translate(category)" />
				</view>
				<view class="user-avatar-box" v-if="!ifJoined">
					<view class="avatar-box">
						<div v-for="(avatar, index) in userAvatar" :style="{'left': calculateOffset(index), 'z-index': 10-index}" class="image-wrapper">
							<image :src="translateAvatar(avatar)" />
						</div>
					</view>
					<view class="capacity-box">
						<text class="capacity-text">6/14</text>
					</view>
				</view>
				<view v-if="isHost||ifJoined">
					<button class="button invite"><text>Invite</text></button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"event-box",
		data() {
			return {
				date: "",
				categories: ["STUDY", "BOARD"],
				userAvatar: [1, 2]
			};
		},
		props: {
			isHost: {
				type: Boolean,
				default: false,
			},
			ifJoined: {
				type: Boolean,
				default: false,
			},
		},
		methods:{
			translate: function(text){
				console.log(text)
				return "/static/event/" + text.toLowerCase() + ".svg";
			},
			translateAvatar(index){
				return 'https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/' + index + '.jpg'
			},
			calculateOffset(index){
				return `${index * 5}px`;
			},
			toEventDetail(){
				if(this.isHost){
					uni.navigateTo({
						url: "/pages/event/detail?isHost=true"
					})
				}else{
					uni.navigateTo({
						url: "/pages/event/detail"
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.event-box{
		width: 90vw;
		height: 100%;
		display: flex;
		align-items: center;
		border-radius: 25px;
		background-color: $main-background-color-2;
		
		.image-box{
			display: flex;
			width: calc(86vw * 0.35);
			height: calc(100% - 25px);
			align-items: center;
			justify-content: center;
			
			image{
				width: calc(86vw * 0.35 - 20px);
				height: 100%;
			}
		}
		
		.content-box{
			width: calc(90vw * 0.65);
			height: 100%;
			padding: 10px 5px;
			display:flex;
			flex-direction: column;
			justify-content: center;
			
			.row{
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
				
				.time-text{
					color: $main-primary-color; 
					line-height: 24px;
				}
				
				.location-text{
					color: $main-secondary-color;
					line-height: 24px;
					white-space: nowrap;
					overflow: hidden;
				}
			}
			
			.sub-row{
				height: 30px;
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 5px;
				
				.category-box{
					width: 30%;
					display: flex;
					align-items: center;
					
					image{
						height: 25px;
						width: 25px;
					}
				}
				
				.user-avatar-box{
					height: 30px;
					background-color: $main-background-color;
					border-radius: 25px;
					align-items: center;
					display: flex;
					padding: 2 2px;
					margin: 0 10px 0 0;
					
					.avatar-box{
						position: relative;
						display: flex;
						width: 28px;
						height: 28px;
						margin: 0 5px;
						align-items: center;
						
						.image-wrapper{
							display: flex;
							align-items: center;
							justify-content: center;
							position: absolute;
							width: 27px;
							height: 27px;
							border-radius: 27px;
							background-color: $main-background-color-2;
							
							image{
								width: 25px;
								height: 25px;
								border-radius: 25px;
							}
						}

					}
					
					.capacity-box{
						display: flex;
						align-items: center;
						justify-content: center;
						margin: 0 10px 0 3px;
						white-space: nowrap;
						.capacity-text{
							font-size: 8px;
							line-height: 10px;
							color: $main-primary-color;
							font-weight: 600;
						}
					}
				}
			}
		}
	}
	
	.button.invite{
		padding: 3px 28px;
	}
	
	.button.joined{
		padding: 3px 15px;
	}
</style>