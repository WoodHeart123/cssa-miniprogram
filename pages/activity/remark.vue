<template>
	<view id="remark">
		<uni-forms style="margin-bottom: 50px;" ref="activity-form" :modelValue="response" :rules="rules"
			label-position="top">
			<view class="act-segment" v-for="(info, index) in actDetail.additionalInfo.questions" :key="index">
				<uni-forms-item :label="info.title" :required="!info.optional" :name="info.title">
					<view class="placeholder" v-if="info.placeholder&&info.placeholder.length!=0&&info.type!=='input'">
						<text>{{info.placeholder}}</text></view>
					<uni-easyinput v-if="info.type==='input'" type="text" v-model="response[info.title]"
						:placeholder="info.placeholder" />
					<uni-data-checkbox mode="button" v-if="info.type==='single'" v-model="response[info.title]"
						:localdata="info.localData"></uni-data-checkbox>
					<uni-data-checkbox mode="button" v-if="info.type==='multiple'" multiple
						v-model="response[info.title]" :localdata="info.localData"></uni-data-checkbox>
					<uni-file-picker v-model="this.images[info.title]" v-if="info.type==='upload'" limit="1" fileMediatype="image" :auto-upload="false"
						@select="(event)=>onSelectImage(event, info.title)" @delete="onDeleteImage"></uni-file-picker>
				</uni-forms-item>
			</view>
		</uni-forms>

		<view class="submit-button">
			<uni-goods-nav :buttonGroup="buttonGroup" :options="options" fill="true" @buttonClick="submit" />
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
				loadShow: false,
				response: {},
				rules: {},
				images: {
					
				}
			}
		},
		onLoad(options) {
			this.actDetail = JSON.parse(decodeURIComponent(options.actDetail));
			this.signupInfo = JSON.parse(decodeURIComponent(options.signupInfo));
			this.actDetail.additionalInfo = JSON.parse(this.actDetail.additionalInfoJSON);
			uni.setNavigationBarTitle({
				title: this.actDetail.title + "报名"
			})
			for (let el of this.actDetail.additionalInfo.questions) {
				if(el.type === 'single' || el.type === 'input'){
					this.response[el.title] = '';
				}else{
					this.response[el.title] = [];
				}
				if(!el.optional){
					this.rules[el.title] = {};
					this.rules[el.title].rules = [{
						required: true,
						errorMessage: `请填写${el.title}`,
					}]
				}
				if (el.type === 'multiple' || el.type === 'single') {
					el.localData = el.choices.map((element) => {
						return {
							value: element,
							text: element
						}
					})
				}
			}
			if(this.signupInfo.ifJoined){
				this.response = JSON.parse(this.signupInfo.responseJSON)
				for (let el of this.actDetail.additionalInfo.questions) {
					if(el.type === 'upload'){
						this.images[el.title] = this.response[el.title].map((imageUrl) => {
							return {
								"url": imageUrl,
								"extname": imageUrl.split(".").pop()
							}
						});
					}
				}
			}
			wx.cloud.init();
		},
		methods: {
			jumpToHomePage() {
				wx.switchTab({
					url: '/pages/activity/act'
				});
			},
			onSelectImage: async function(e, title) {
				let imageList = []
				for (let i = 0; i < e.tempFilePaths.length && i < e.tempFiles.length; i++) {
					imageList.push({
						filename: e.tempFiles[i].name,
						filepath: e.tempFilePaths[i]
					});
				}
				uni.showLoading({
					title: `上传图片,0/${imageList.length}`,
					mask: true
				});
				let uploadedImageCount = 0;
				const uploadPromises = imageList.map(async (image) => {
					try {
						const uploadedImage = await uploadOSS(image, "cssa-act");
						uploadedImageCount++;
						uni.showLoading({
							title: `上传图片,${uploadedImageCount}/${imageList.length}`,
							mask: true
						});
						return uploadedImage;
					} catch (error) {
						throw new Error(`上传图片失败:${error}`);
					}
				});
				try {
					const uploadedImages = await Promise.all(uploadPromises);
					this.response[title] = uploadedImages;
				} catch (error) {
					uni.showToast({
						title: "照片上传失败",
						icon: "error"
					});
				}
				uni.hideLoading();
			},
			async submit() {
				this.$refs["activity-form"].validate().then(async function(event) {
					uni.showLoading({
						title: "记录信息中",
						mask: true,
					})
					let bodyData = {
						actID: this.actDetail.id,
						responseJSON: JSON.stringify(this.response),
					};
					const res = await requestAPI({
						path: '/activity/register',
						type: "POST",
						data: bodyData
					})
					uni.hideLoading()
					if (res.data.status == 100) {
						uni.reLaunch({
							url: '/pages/activity/finished',
						});
					} else {
						uni.showToast({
							title: "服务出错"
						});
					}
				}.bind(this))
			},
		}
	}
	import uploadOSS from '@/api/upload.js'
	import requestAPI from '@/api/request.js'
</script>

<style>
	#remark {
		width: 100vw;
		height: 100vh;
		padding: 15px;
		background-color: white;
		overflow-y: scroll;
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

	.uni-forms-item__label {
		font-size: 20px;
		font-weight: 600;
	}

	.checklist-group {
		display: flex;
		flex-direction: column !important;
	}

	.content {
		padding: 17upx 34upx;
	}


	.act-segment {
		margin-top: 20px;
	}

	.input {
		width: 80%;
		border-bottom: 1px solid #eee;
	}

	.placeholder {
		margin-left: 10px;
		color: #999;
		font-size: 12px;
	}

	.name {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 20%;
	}

	.submit-button {
		display: flex;
		flex-direction: column;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.uni-forms {
		margin-bottom: 50px;
	}
	
	.uni-data-checklist .checklist-group .checklist-box.is--button{
		font-size: 20px;
	}
</style>