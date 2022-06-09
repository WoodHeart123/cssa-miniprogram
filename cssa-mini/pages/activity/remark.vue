<template>
	<view id="remark">
		<view class="line" v-for="(info, index) in actDetail.additionalInfo" :key="index">
			<view class="name"><text>{{ info.name }}</text></view>
			<input class="input" v-if="info.type == 'input'" type="text" maxlength="10" placeholder="请输入内容"
				@focus="changeIndex(index)" @input="bindInputChange" />
			<picker class="picker" v-if="info.type == 'select'" mode="selector" :range="info.options" :value="info.index"
				@focus="changeIndex(index)" @change="bindPickerChange">
				<view class="input-text">{{ info.options[info.index] }}</view>
			</picker>
		</view>
		<view>
			<uni-goods-nav :buttonGroup="buttonGroup" :options="options" fill="true" @buttonClick="submit">
			</uni-goods-nav>
		</view>
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
		}
	},
	onLoad(options) {
		this.actDetail = JSON.parse(decodeURIComponent(options.actDetail));
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
			console.log(this.actDetail.additionalInfo[this.index].options[e.detail.value]);
			this.actDetail.additionalInfo[this.index].index = e.detail.value;
			this.actDetail.additionalInfo[this.index].value = this.actDetail.additionalInfo[this.index].options[e.detail.value];
		},
		submit: function () {
			// console.log(this.actDetail);
			let valueArr = [];
			for (let info of this.actDetail.additionalInfo) {
				valueArr.push(info.value);
			}
			// console.log(valueArr);

			let bodyData = {
				actId: this.actDetail.id,
				values: valueArr
			};
			
			wx.cloud.init(); // TODO : do I need to do this?
			const res = await wx.cloud.callContainer({
				config: {
					env: 'prod-9go38k3y9fee3b2e', // 微信云托管的环境ID
				},
				path: '/activity/register', // 填入业务自定义路径和参数，根目录，就是 / 
				method: 'POST', // 按照自己的业务开发，选择对应的方法
				header: {
					'X-WX-SERVICE': 'springboot-f8i8', // xxx中填入服务名称（微信云托管 - 服务管理 - 服务列表 - 服务名称）
					// 其他 header 参数

				},
				// dataType:'text', // 默认不填是以 JSON 形式解析返回结果，若不想让 SDK 自己解析，可以填text
				// 其余参数同 wx.request

				data: bodyData
			});

			console.log(res);



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
