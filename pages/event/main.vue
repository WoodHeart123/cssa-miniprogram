<template>
	<view class="event-main">
		<view class="top-bar">
			<view>
				<text class="heading-2">Discovering Events!</text>
			</view>
			<view class="sub-heading-bar">
				<image src="@/static/event/lang.svg"></image>
				<text class="paragraph-1 language-text">Language</text>
				<picker class="lang-picker" @change="bindPickerChange" :value="langIndex" :range="lang">
					<text class="paragraph-1">{{lang[langIndex]}}</text>
					<uni-icons type="arrowdown" size="12"></uni-icons>
				</picker>
			</view>

		</view>
		<view class="search-bar">
			<uni-icons type="search" size="20"></uni-icons>
			<input placeholder-class="search-placeholder" placeholder="Search" />
			<image src="@/static/event/filter-circle.svg"></image>
		</view>

		<view class="type-filter-bar">
			<view class="type-filter-box" :class="{'selected': index==eventIndex}" v-for="(event, index) in eventType"
				@click="bindEventTypeChange(index)">
				<text>{{event.name}}</text>
			</view>
		</view>
		
		<scroll-view class="event-scroll-area">
			<div class="event-frame">
				<event-box ></event-box>
			</div>

		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lang: ["English"],
				langIndex: 0,
				eventType: [{
					name: "All",
					type: "ALL"
				}, {
					name: "Sports",
					type: "SPORTS"
				}, {
					name: "Board Game",
					type: "Board"
				}, {
					name: "Party",
					type: "PARTY"
				}, {
					name: "Study",
					type: "STUDY"
				}, {
					name: "Hangout",
					type: "HANGOUT"
				}, {
					name: "Food",
					type: "FOOD"
				}],
				eventIndex: 0,
			}
		},
		components:{
			eventBoxVue
		},
		methods: {
			bindLangChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.langIndex = e.detail.value
			},
			bindEventTypeChange: function(index){
				console.log(index)
				this.eventIndex = index;
			}
		}
	}
	import eventBoxVue from '@/components/event-box/event-box.vue'
</script>

<style lang="scss">
	.event-main {
		background-color: $main-background-color;
	}

	.top-bar {
		margin: 7vh 0 0 5vw;

		.sub-heading-bar {
			display: flex;
			align-items: center;
			margin-top: 10px;

			.language-text {
				color: $main-primary-color;
				margin-left: 10px;
			}

			.lang-picker {
				margin: 0 10px;

				uni-icons {
					margin-left: 10px;
				}
			}

			image {
				width: 22px;
				height: 22px;
			}
		}
	}

	.search-bar {
		display: flex;
		align-items: center;
		height: 55px;
		width: 86vw;
		margin: 10px 7vw 0 7vw;
		background-color: $main-background-color-2;
		border-radius: 10000px;

		uni-icons {
			margin: 0 3%;

			text {
				color: $main-secondary-color !important;
			}
		}

		.search-placeholder {
			color: $main-secondary-color !important;
			font-size: 14px;
		}

		input {
			flex: 1;
		}

		image {
			width: 30px;
			height: 30px;
			margin: 0 3%;
		}

	}
	
	.type-filter-bar::-webkit-scrollbar {
	  display: none;
	}

	.type-filter-bar {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 15px 0 0 7vw;
		overflow-x: scroll;
		height: 32px;

		.type-filter-box {
			display: flex;
			align-items: center;
			height: 32px;
			width: fit-content;
			background-color: $main-background-color-2;
			margin: 0 10px 0 0;
			border-radius: 1000px;
			white-space: nowrap;
			-ms-overflow-style: none;  
			scrollbar-width: none;
			

			text {
				font-size: 14px;
				padding: 2px 28px;
				line-height: 24px;
				color: $main-secondary-color;
			}
		}
		


		.type-filter-box.selected {
			background-color: $main-primary-color;

			text {
				color: $main-background-color-2;
			}
		}
		
	}
	
	.event-scroll-area{
		display:flex;
		flex: 1 1 auto;
		
		.event-frame{
			width: 86vw;
			height: 15vh;
			margin:0 7vw;
			
		}
	}
</style>