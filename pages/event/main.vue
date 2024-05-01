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
			<image src="@/static/event/filter-circle.svg" @click="onClickFilter"></image>
		</view>

		<view class="type-filter-bar">
			<view class="type-filter-box" :class="{'selected': index==eventIndex}" v-for="(event, index) in eventType"
				@click="bindEventTypeChange(index)">
				<text>{{event.name}}</text>
			</view>
		</view>

		<scroll-view scroll-y="true" show-scrollbar="true" refresher-enabled="true" class="event-scroll-area">
			<div v-for="(num, index) in 20" :key="index" class="event-frame">
				<event-box></event-box>
			</div>
			<div style="min-height: 10vh;"></div>
		</scroll-view>

		<uni-popup ref="filter" type="bottom" border-radius="30px 30px 0 0" :safe-area="false">
			<view class="popup-window">
				<view class="heading-box">
					<text class="heading-3">Filters</text>
				</view>
				<view class="title-box"><text class="heading-3">Categories</text></view>
				<view class="category-filter-box">
					<view class="category-filter-wrap">
						<view v-for="(event, index) in events">
							<view class="event-box" :key="index" v-if="event.row==0">
								<image :src="'/static/svg-icons/' + event.image"></image>
								<text>{{event.name}}</text>
							</view>
						</view>
					</view>
					<view class="category-filter-wrap">
						<view v-for="(event, index) in events">
							<view class="event-box" :key="index" v-if="event.row==1">
								<image :src="'/static/svg-icons/' + event.image"></image>
								<text>{{event.name}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="title-box" style="margin-top: 25px;"><text class="heading-3">Date&Time</text></view>
				<view class="date-filter-box">
					<view class="date-filter-box" :class="{'selected': index==dateIndex}"
						v-for="(date, index) in dateType" @click="bindDateFilterChange(index)">
						<text>{{date}}</text>
					</view>
				</view>
				<view class="title-box" style="margin-top: 25px;"><text class="heading-3">Only Show</text></view>
				<view class="toggle-bar">
					<view class="text-box">
						<text>Category Tags I Subscribed</text>
					</view>
					<view class="toggle-box">
						<switch checked color="#7F0019" style="transform:scale(0.8)" />
					</view>
				</view>
				<view class="toggle-bar">
					<view class="text-box">
						<text>Created by Friends</text>
					</view>
					<view class="toggle-box">
						<switch checked color="#7F0019" style="transform:scale(0.8)" />
					</view>
				</view>
				<view class="toggle-bar">
					<view class="text-box">
						<text>Ticket Free</text>
					</view>
					<view class="toggle-box">
						<switch color="#7F0019" style="transform:scale(0.8)" />
					</view>
				</view>
			</view>
		</uni-popup>

		<event-tab-bar></event-tab-bar>


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
				dateType: ["Today", "Tommorrow", "This Week"],
				eventIndex: 0,
				events: list,
				dateIndex: -1,
			}
		},
		components: {
			eventTabBarVue,
			eventBoxVue

		},
		methods: {
			bindLangChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.langIndex = e.detail.value
			},
			bindEventTypeChange: function(index) {
				console.log(index)
				this.eventIndex = index;
			},
			bindDateFilterChange: function(index) {
				console.log(index)
				this.dateIndex = index;
			},
			onClickFilter: function() {
				this.$refs.filter.open()
			}
		}
	}
	import eventBoxVue from '@/components/event-box/event-box.vue'
	import eventTabBarVue from '@/components/event-tab-bar/event-tab-bar.vue'
	import list from './event.js'
</script>

<style lang="scss">
	.event-main {
		background-color: $main-background-color;
		width: 100vw;
		height: calc(100vh - 75px);
		overflow: hidden;
	}

	.top-bar {
		margin: 6vh 0 0 5vw;

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
		width: 90vw;
		margin: 10px 5vw 0 5vw;
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
		margin: 15px 0 0 5vw;
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

	.event-scroll-area {
		display: flex;
		margin-top: 10px;
		height: 70vh;

		.event-frame {
			width: 90vw;
			height: 15vh;
			margin: 0 5vw 1vh 5vw;

		}

	}

	.popup-window {
		background-color: $main-background-color;
		border-radius: 30px 30px 0 0;
		min-height: 80vh;
		max-height: 80vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 0 0 5vw;

		.toggle-bar {
			width: 100%;
			display: flex;
			border-radius: 30px;
			height: 60px;
			background-color: $main-background-color-2;
			align-items: center;
			margin-bottom: 10px;
			justify-content: space-between;

			.text-box {
				padding: 20px;

				text {
					line-height: 24px;
					font-size: 14px;
				}
			}

			.toggle-box {
				padding: 20px;
			}
		}

		.heading-box {
			margin: 10px 0;
		}

		.title-box {
			width: 100%;
			margin-bottom: 10px;
		}

		.date-filter-box {
			width: 100%;
			display: flex;
			-ms-overflow-style: none;
			scrollbar-width: none;

			.date-filter-box {
				display: flex;
				align-items: center;
				height: 32px;
				width: fit-content;
				background-color: $main-background-color-2;
				margin: 0 10px 0 0;
				border-radius: 1000px;
				white-space: nowrap;

				text {
					font-size: 14px;
					padding: 2px 28px;
					line-height: 24px;
					color: $main-secondary-color;
				}
			}



			.date-filter-box.selected {
				background-color: $main-primary-color;

				text {
					color: $main-background-color-2;
				}
			}
		}

		.category-filter-box {
			width: 100%;
			overflow: scroll;

			.category-filter-wrap {
				display: flex;
				height: 75px;
				margin-top: 2px;
				flex: 0;
				-ms-overflow-style: none;
				scrollbar-width: none;


				.event-box {
					height: 65px;
					width: fit-content;
					background-color: $main-background-color-2;
					display: flex;
					align-items: center;
					border-radius: 20px;
					padding: 10px;
					margin: 0 10px 0 0;
					flex: 0;
					white-space: nowrap;

					image {
						width: 30px;
						height: 30px;
						margin-right: 5px;
					}

					text {
						color: $main-secondary-color;
					}
				}
			}
		}
	}
</style>