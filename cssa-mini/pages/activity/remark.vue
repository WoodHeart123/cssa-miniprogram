<template>
	<view>
		<button @click="jumpToHomePage">Go To Home</button>

		<div> hello remark</div>
		<p> {{ userInfo.nickName }}</p>
		<p> {{ userInfo.avatarUrl }}</p>


		<!-- description of activity here -->
		<!-- note section and store the string in this.text -->

		<p>输入你的备注</p>
		<view class="content">
			<view class="input">
				<input type="text" v-model="text" bindchange="updateInputBox" placeholder="请输入内容" />
			</view>
		</view>

		<!-- multiple choice section -->

		<p>选择你的学院</p>
		<picker mode='selector' bindchange="bindPickerChange" value="{{index}}" range="{{array}} " range-key="name">
			<view class="picker">
				当前选择：{{ array[index].name }}
			</view>
		</picker>



		<view>
			<button @click="postBotton">完成</button>
		</view>


	</view>


</template>

<script>
export default {
	data() {
		return {
			userInfo: {},
			activityInfo: {},

			//array: ['赫奇帕奇', '格兰芬多', '拉文克劳', '斯莱特林'],
			array: [{ name: '赫奇帕奇' }, { name: '格兰芬多' }, { name: '拉文克劳' }, { name: '斯莱特林' }],
			index: 0,

		}
	},
	mounted() {

	},
	onload() {
		_self = this;
		//this.getUserProfile();
		//this.getActivityInfo();
	},
	methods: {
		jumpToHomePage() {
			wx.switchTab({
				url: '/pages/activity/act'
			});
		},

		bindPickerChange: function (e) {
			console.log('picker发送选择改变，携带值为', e.detail.value)
			this.setData({
				index: e.detail.value
			})
		},
		updateInputBox: function (e) {//not actually used
			console.log('input发送改变，携带值为', e.detail.value)
			this.setData({
				remarkInfo: e.detail.value
			})
		},
		postBotton() {
			if (this.text == '' || this.text == null || this.text == undefined) {
				wx.showToast({
					title: '请输入内容',
					icon: 'none',
					duration: 2000
				})
				return;
			}
			if (this.index == -1) {
				wx.showToast({
					title: '请选择学院',
					icon: 'none',
					duration: 2000
				})
				return;
			}

			console.log(this.text);
			console.log(this.array[this.index].name);
			//TODO: pass this.text to server

			//TODO: pass this.array[index] to server

			//TODO: end the process, e.g. jump to finish page
			wx.navigateTo({
				url: '/pages/activity/finished'
			});

			setTimeout(function (e) {
				_self.text = '';
			}, 1500);

		},


	}
}
</script>

<style>


.picker {
	width: 100vw;
	height: 50px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}


.content {
	padding: 17upx 34upx;
}

.input {
	width: 100%;
	border: 1upx solid #eee;
	margin-bottom: 20upx;
	padding: 17upx 0;
}

input {
	padding-left: 20upx;
}
</style>
