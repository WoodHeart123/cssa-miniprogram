<template>
	<view>
		<view class="top-bar">
			<view class="top-icon" @click="navigateBack">
				<uni-icons type="arrowleft" size="25"></uni-icons>
			</view>
			<view class="heading-3 top-text">
				<text style="color: white">Create Event</text>
			</view>
		</view>
		<uni-swiper-dot :info="[1,2]" :current="current" field="content" mode="dot" :dotsStyles="dotStyles">
			<swiper class="swiper-box" @change="onSwipe" :current="current">
				<swiper-item  @touchmove.stop='stopTouchMove'>
					<view class="swiper-item">
						<view class="title"><text class="heading-3">Choose Categories</text></view>
						<view class="category-grid">
							<view class="category-box" v-for="(event, index) in eventList" :class="{'clicked': selectedEvent.indexOf(event.name) != -1}" @click="onClickCategory(event.name)">
								<image v-show="selectedEvent.indexOf(event.name) == -1" :src="'/static/svg-icons/' + event.image"></image>
								<image v-show="selectedEvent.indexOf(event.name) != -1" :src="'/static/svg-icons/' + event.imageSelected"></image>
								<view><text class="event-name" :style="{color: event.color}">{{event.name}}</text></view>
							</view>
						</view>
					</view>
					

				</swiper-item>
				<swiper-item @touchmove.stop='stopTouchMove'>
					<view class="swiper-item">
						<view class="form-row input">
							<uni-easyinput placeholder="Event Title" :inputBorder="false"></uni-easyinput>
						</view>
						<view class="form-row date-input">
							<view class="title-box">
								<view class="icon-box">
									<uni-icons type="calendar-filled" color="#7F0019" size="30"></uni-icons>
								</view>
								<text>Date Picker</text>
							</view>
							<uni-datetime-picker v-model="form.dateRange" rangeSeparator="to" type="datetimerange" @change="onCalendarChange" :border="false"></uni-datetime-picker>
						</view>
						<view class="form-row input">
							<uni-easyinput placeholder="Event Description" :inputBorder="false"></uni-easyinput>
						</view>
						<view class="form-row number-box">
							<view><text>Number of Participants</text></view>
							<uni-number-box v-model="form.participantNum" />
						</view>
						<view class="form-row toggle-box">
							<view class="text-box">
								<view><text>Ticket</text></view>
								<view class="placeholder"><text>You can set up price for the event</text></view>
							</view>
							<switch color="#7F0019" style="transform:scale(0.8)" />
						</view>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view class="bottom-bar">
			<button class="button next" @click="onClickNext" v-show="current==0">
				<text>Next</text>
			</button>
			<button class="button back" @click="onClickBack" v-show="current==1">
				<text>Back</text>
			</button>
			<button class="button create" @click="onClickCreate" v-show="current==1">
				<text>Create</text>
			</button>
		</view>
		<uni-popup ref="confirm" type="center" border-radius="30px" >
			<view class="confirm-popup">
				<image src="../../static/event/Illustrations.png"></image>
				<view><text class="heading-3">Event Created Successfully</text></view>
				<view class="button-box">
					<button class="button invite" @click="onClickInvite"><text>Invite Friends</text></button>
					<button class="button done" @click="onClickDone"><text>Done</text></button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				dotStyles:{
					bottom: 'calc(93vh - 160px)',
					backgroundColor: "#FFFFFF",
					selectedBackgroundColor: "#7F0019",
					height: 12,
					width: 12
				},
				eventList: list,
				selectedEvent: [],
				form: {
					participantNum: 1,
					dateRange: []
				}
			}
		},
		methods: {
			navigateBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			change(e) {
				this.current = e.detail.current
			},
			onClickNext(){
				this.current += 1;
			},
			onClickBack(){
				this.current -= 1;
			},
			onCalendarChange(e){
				console.log(e)
			},
			onClickCreate(){
				this.$refs.confirm.open()
			},
			onClickDone(){
				uni.navigateBack({
					delta: 1,
				})
			},
			onClickInvite(){
				uni.redirectTo({
					url: "/pages/event/detail?isHost=true"
				})
			},
			onClickCategory(name){
				if(this.selectedEvent.indexOf(name) != -1){
					this.selectedEvent.splice(this.selectedEvent.indexOf(name), 1);
				}else{
					this.selectedEvent.push(name);
				}
			}
		}
	}
	import list from './event.js'
</script>

<style lang="scss">
	.bottom-bar {
		position: fixed;
		bottom: 20px;
		width: 90vw;
		height: 40px;
		left: 5vw;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.form-row{
		width: 100%;
		background-color: $main-background-color-2;
		border-radius: 10px;
		padding: 10px;
		margin-top: 20px;
	}
	
	.form-row.date-input{
		.title-box{
			padding: 0 10px;
			margin-bottom: 10px;
			display: flex;
			padding-left: 10px;
			align-items: center;

			
			.icon-box{
				background-color: $main-background-color;
				padding: 10px;
				margin-right: 10px;
				border-radius: 8px;
			}
		}
		
		input{
			background-color: $main-background-color;
			border-radius: 30px;
			width: 40%;
		}
		
		uni-datetime-picker{
			.uni-date-x{
				justify-content: space-between !important; 
			}
			uni-icons{
				display: none;
			}
			
			.uni-datetime-picker--btn{
				background-color: $main-primary-color;
			}
			
			.uni-calendar-item--after-checked{
				background-color: $main-primary-color !important; 
			}
			
			.uni-calendar-item--before-checked{
				background-color: $main-primary-color !important; 
			}
			
			.uni-calendar-item--multiple{
				background-color: rgba($main-primary-color, 0.05); 
			}
		}

	}
	
	.confirm-popup{
		width: 90vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: $main-background-color-2;
		border-radius: 30px;
		
		image{
			width: 70vw;
			height: 40vw;
		}
		
		.button-box{
			display: flex;
			width: 100%;
			align-items: center;
			margin-top: 20px;
			margin-bottom: 20px;
			
			
			.button.invite{
				width: 40%;
				height: 40px;
				padding: 5px 10px;
				background-color: $main-background-color-2;
				
				text{
					color: $main-primary-color;
				}
			}
			
			.button.done{
				width: 40%;
				
				text{
					color: $main-background-color-2;
				}
			}
		}
	}
	.form-row.number-box{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 20px;
		text{
			font-size: 14px;
			line-height: 24px;
		}
	}
	
	.form-row.toggle-box{
		display: flex;
		justify-content: space-between;
		padding: 10px 20px;
		text{
			font-size: 14px;
			line-height: 24px;
		}
		.placeholder{
			text{
				font-weight: 400;
				color: $main-secondary-color;
			}
		}
	}

	.button.next {
		width: 90vw;
	}
	
	.button.back{
		width: 30%;
		background-color: $main-background-color-2;
		
		text{
			color: $main-primary-color;
		}
	}
	
	
	.button.create{
		width: 60%;
	}
	
	.swiper-item{
		width: 90vw;
		margin: 0 5vw;
		
		.title{
			margin-top: 50px;
			margin-bottom: 30px;
		}
		
		.category-grid{
			display: flex;
			flex-wrap: wrap;
			width: 100%;
			
			.category-box.clicked{
				background-color: $main-primary-color;
				
				.event-name{
					color: $main-background-color-2 !important;
				}
			}
			.category-box{
				display: flex;
				flex-direction: column;
				align-items: center;
				border-radius: 20px;
				justify-content: space-around;
				width:  26vw;
				height: 26vw;
				margin: 0 2vw 20px 2vw;
				background-color: $main-background-color-2;
				padding: 10px;
				
				image{
					width: 10vw;
					height: 10vw;
					margin-top: 10px;
				}
				
				.event-name{
					font-size: 14px;
					line-height: 24px;
					font-weight: 500;
					white-space: nowrap;
				}
			}
			
		}
	}

	.swiper-box{
		margin: 50px 0 0 0;
		height: calc(93vh - 150px);
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

		.top-text {
			margin-left: 20px;
			height: 100%;
			color: white;
			display: flex;
			align-items: center;
		}

	}
</style>