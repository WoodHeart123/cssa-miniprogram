<template>
	<view id="remark">
		<view class="line" v-for="(info, index) in actDetail.additionalInfo" :key="index">
			<view class="name"><text>{{ info.name }}</text></view>
			<input class="input" v-if="info.type == 'input'" type="text" maxlength="100" placeholder="请输入内容"
				@focus="changeIndex(index)" @input="bindInputChange" />
			<picker class="picker" v-if="info.type == 'select'" mode="selector" :range="info.options" :value="info.index"
				@focus="changeIndex(index)" @change="bindPickerChange">
				<view class="input-text">{{ info.options[info.index]?info.options[info.index]:a}}</view>
			</picker>
		</view>
		<view>
			<uni-goods-nav :buttonGroup="buttonGroup" :options="options" fill="true" @buttonClick="submit">
			</uni-goods-nav>
		</view>
		<loading :show="loadShow"></loading>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userInfo: {},
			buttonGroup: [{
				text: '提交',
				backgroundColor: "#1684FC",
				color: '#fff'
			}],
			actDetail: {},
			options: [],
			index: 0,
			loadShow:false,
		}
	},
	onLoad(options) {
		this.actDetail = JSON.parse(decodeURIComponent(options.actDetail));
		console.log(this.actDetail);
		wx.cloud.init();
	},
	methods: {
		jumpToHomePage() {
			wx.switchTab({
				url: '/pages/activity/act'
			});
		},
		changeIndex: function (i) {
			this.index = i;
		},
		bindInputChange: function (e) {
			this.actDetail.additionalInfo[this.index].value = e.detail.value;
		},
		bindPickerChange: function (e) {
			console.log(e.detail.value);
			this.actDetail.additionalInfo[this.index].index = e.detail.value;
			this.actDetail.additionalInfo[this.index].value = this.actDetail.additionalInfo[this.index].options[e.detail.value];
		},
		async submit() {
			// console.log(this.actDetail);
			this.loadShow = true;
			let valueArr = [];
			for (let info of this.actDetail.additionalInfo) {
				valueArr.push(info.value);
			}
			console.log(valueArr);

			let bodyData = {
				actId: this.actDetail.actID,
				response: valueArr,
				payment: this.actDetail.payment
			};
			const res = await wx.cloud.callContainer({
				config: {
					env: 'prod-9go38k3y9fee3b2e', // 微信云托管的环境ID
				},
				path: '/activity/register',
				method: 'POST', 
				header: {
					'X-WX-SERVICE': 'springboot-f8i8',
				},
				data: bodyData
			});
			this.loadShow = false;
			if(res.data.status == 100){
				uni.reLaunch({
					url: '/pages/activity/finished',
				});
			}else{
				uni.showToast({title:res.data.message});
			}
		},


	}
}
</script>

<style>
#remark {
	width: 100vw;
	height: 100vh;
}

.picker {
	width: 80%;
	display: flex;
	flex-direction: row;
	align-items: center;
	font-size: 15px;
	padding-bottom: 5px;
	border-bottom: 1px solid #eee;
}


.content {
	padding: 17upx 34upx;
}

.input {
	width: 80%;
	border-bottom: 1px solid #eee;
}

.line {
	margin-top: 10px;
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	height: 50px;
	padding: 10px 0 10px 0;
	background-color: white;
}

.name {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 20%;
}

.input-text {}
</style>
