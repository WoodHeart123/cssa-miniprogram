<template>
    <view>


        <!-- a BIG title indicating YOU FINISHED -->
        <view class="finished-title">
            <text>您已完成活动注册</text>
        </view>

        <!-- A BUTTON REDIRECT TO HOME PAGE -->
        <view class="finished-button">
            <button @click="jumpToHomePage">返回活动首页</button>
        </view>




    </view>
</template>

<script>
    export default {
		data(){
			return{
				actDetail: {}
			}
		},
        methods: {
            jumpToHomePage() {
				uni.$emit("refreshAct")
                wx.switchTab({
                    url: '/pages/activity/act'
                });
            }
        }
    }
                
</script>

<style>
.finished-title {
    width: 100vw;
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
</style>