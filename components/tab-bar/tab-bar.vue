<template>
    <view class="tab-bar-box">
        <view class="main-area">
            <view class="icon-box left">
				<view class='icon' @click="$emit('switch-tab', 1)">
					<uni-icons :type="icons.leftIcon1.icon" size="25" :color="currentTab === 1 ? '#7F0019' : '#A9A9A9'" ></uni-icons>
					<text class="paragraph-1" :class="{'icon-clicked': currentTab === 1}">{{icons.leftIcon1.text}}</text>
				</view>
                <view class='icon' @click="$emit('switch-tab', 2)">
					<uni-icons :type="icons.leftIcon2.icon" size="25" :color="currentTab === 2 ? '#7F0019' : '#A9A9A9'" ></uni-icons>
					<text class="paragraph-1" :class="{'icon-clicked': currentTab === 2}">{{icons.leftIcon2.text}}</text>
				</view>
                
            </view>
            <view class="mid-button" @click="$emit('mid-button-click')">
                <uni-icons :type="icons.midIcon" size="30" color="white"></uni-icons>
            </view>
            <view class="icon-box right">
				<view class="icon"  @click="$emit('switch-tab', 3)">
					<uni-icons :type="icons.rightIcon1.icon" size="25" :color="currentTab === 3 ? '#7F0019' : '#A9A9A9'"></uni-icons>
					<text class="paragraph-1" :class="{'icon-clicked': currentTab === 3}">{{icons.rightIcon1.text}}</text>
				</view>
				<view class="icon" @click="$emit('switch-tab', 4)">
					<uni-icons :type="icons.rightIcon2.icon" size="25" :color="currentTab === 4 ? '#7F0019' : '#A9A9A9'" ></uni-icons>
					<text class="paragraph-1" :class="{'icon-clicked': currentTab === 4}">{{icons.rightIcon2.text}}</text>
				</view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: 'tab-bar',
    props: {
        currentTab: {
            type: Number,
            default: 0,
        },
        icons: {
            type: Object,
            default: () => ({
                leftIcon1: {
					icon: 'home',
					text: '主页'
				},
                leftIcon2: {
					icon: 'loop',
					text: '麦屯圈'
				},
                midIcon: 'plusempty',
                rightIcon1: {
					icon: 'calendar',
					text: '活动'
				},
                rightIcon2: {
					icon: 'person',
					text: '我的'
				},
            }),
        },
    },
    data() {
        return {};
    },
};
</script>

<style lang="scss">
.tab-bar-box {
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: 75px;
    background-color: $main-background-color-2;
    z-index: 100;

    .main-area {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;

        .mid-button {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            width: 60px;
            height: 60px;
            border-radius: 60px;
            top: -20px;
            left: calc(50vw - 25px);
            background-color: $main-primary-color;
        }

        .icon-box {
            width: 40vw;
            margin: 0 10vw 0 0;
            display: flex;
            align-items: center;
            justify-content: space-around;
        }

        .icon-box.right {
            margin: 0 0 0 10vw;
        }
		
		.icon{
			padding-bottom: 10px;
			display: flex;
			flex-direction: column;
			align-items: center;
			color: $main-secondary-color !important;
		}
		
		.icon-clicked{
			color: $main-primary-color !important;
		}
    }
}
</style>
