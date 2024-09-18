<template>
	<view id="remark">
		<view class="swiper-indicator">
			<view v-for="(info, index) in actDetail.additionalInfo.questions" :key="index" class="swiper-dot"
				:class="{'swiper-dot-selected': current == index}" @click="onClickIndicator(index)">
				<text :class="{'swiper-dot-required': !info.optional}">{{index}}</text>
			</view>
		</view>
		<uni-forms id="activity-form" ref="activity-form" :modelValue="response" :rules="rules" label-position="top">
			<swiper class="swiper-box" @change="onSwipe" :current="current" vertical>
				<swiper-item class="act-segment" v-for="(info, index) in actDetail.additionalInfo.questions"
					:key="index">
					<uni-forms-item :label="info.title" :name="info.title">
						<view class="placeholder"
							v-if="info.placeholder&&info.placeholder.length!=0&&info.type!=='input'&&info.type!=='textarea'">
							<text>{{info.placeholder}}</text>
						</view>
						<uni-easyinput v-if="info.type==='input'" type="text" v-model="response[info.title]"
							:placeholder="info.placeholder" @confirm="onInputConfirm" />
						<uni-easyinput v-if="info.type==='textarea'" type="textarea" v-model="response[info.title]"
								:placeholder="info.placeholder" @confirm="onInputConfirm" auto-height maxlength="1000"/>
						<uni-data-checkbox mode="button" v-if="info.type==='single'" v-model="response[info.title]"
							:localdata="info.localData" @change="onInputConfirm"></uni-data-checkbox>
						<uni-data-checkbox mode="button" v-if="info.type==='multiple'" multiple
							v-model="response[info.title]" :localdata="info.localData"></uni-data-checkbox>
						<uni-file-picker v-model="this.images[info.title]" v-if="info.type==='upload'" limit="1"
							fileMediatype="image" :auto-upload="false"
							@select="(event)=>onSelectImage(event, info.title)"></uni-file-picker>
					</uni-forms-item>
				</swiper-item>
			</swiper>
		</uni-forms>

		<view class="submit-button">
			<uni-goods-nav :buttonGroup="buttonGroup" :options="options" :fill="true" @buttonClick="submit"/>
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
					backgroundColor: "#9b0000",
					color: '#fff'
				}],
				actDetail: {},
				options: [],
				index: 0,
				loadShow: false,
				response: {},
				rules: {},
				images: {

				},
				current: 0,
			}
		},
		onLoad(options) {
			this.actDetail = JSON.parse(decodeURIComponent(options.actDetail));
			this.signupInfo = JSON.parse(decodeURIComponent(options.signupInfo));
			this.actDetail.additionalInfo = JSON.parse(this.actDetail.additionalInfoJSON);
			uni.setNavigationBarTitle({
				title: this.actDetail.title + "报名"
			})
			console.log(this.actDetail)
			for (let el of this.actDetail.additionalInfo.questions) {
				if (el.type === 'single' || el.type === 'input') {
					this.response[el.title] = '';
				} else {
					this.response[el.title] = [];
				}
				if (!el.optional) {
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
			if (this.actDetail.additionalInfo.questions.length >= 1) {
				this.buttonGroup[0] = {
					text: '下一个',
					backgroundColor: "#9b0000",
					color: '#fff'
				}
			}
			if (this.signupInfo.ifJoined) {
				this.response = JSON.parse(this.signupInfo.responseJSON)
				for (let el of this.actDetail.additionalInfo.questions) {
					if (el.type === 'upload') {
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
			onInputConfirm: function(e) {
				if (this.current < this.actDetail.additionalInfo.questions.length - 1) {
					this.current += 1
				}
			},
			onClickIndicator: function(index) {
				this.current = index;
			},
			onSwipe: function(e) {
				this.current = e.detail.current;
				if (this.current === this.actDetail.additionalInfo.questions.length - 1) {
					this.buttonGroup[0].text = "提交"
				} else {
					this.buttonGroup[0].text = "下一个"
				}
			},
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
				if (this.current < this.actDetail.additionalInfo.questions.length - 1) {
					this.current += 1
				} else {
					this.$refs["activity-form"].validate().then(async function(e) {
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
					}.bind(this)).catch((e) => {
						let key = e[0].key;
						this.actDetail.additionalInfo.questions.forEach((el, idx) => {
							if (el.title === key) {
								this.current = idx;
							}
						})
					})
				}

			},
		}
	}
	import uploadOSS from '@/api/upload.js'
	import requestAPI from '@/api/request.js'
</script>

<style lang="scss">
	#remark {
		width: 100vw;
		height: 100vh;
		overflow-y: scroll;
		display: flex;
		background-color: white;
	}

	.uni-forms {
		width: 90vw;
		height: 100vh;
	}

	.swiper-indicator {
		width: 10vw;
		height: 100%;
		display: flex;
		flex-direction: column;
		border-right: 1px solid rgba(155, 155, 155, 0.2);

		.swiper-dot {
			width: 10vw;
			height: 10vw;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			border-bottom: 1px solid rgba(155, 155, 155, 0.2);
		}

		.swiper-dot-required:before {
			top: 2px;
			left: 2px;
			position: absolute;
			content: '*';
			color: rgb(155, 0, 0);
		}

		.swiper-dot-selected {
			color: white;
			background-color: rgba(155, 0, 0, 0.5);
		}
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

	.swiper-box {
		width: 90vw;
		height: 100vh;
	}


	.act-segment {
		width: calc(90vw - 40px) !important;
		height: calc(100vh - 40px) !important;
		padding: 20px;
		background-color: white;

		.uni-forms-item__label {
			margin-left: 15px;
		}


		.checklist-box {
			margin: 0 !important;
			padding: 10px 10px 10px 10px !important;
			box-sizing: content-box !important;


		}

		.uni-forms-item__label {
			width: 50vw !important;

			&::before {
				content: ' ';
				width: 2px;
				height: 100%;
				background-color: #9b0000;
				margin-right: 3px;
			}

			.is-required {
				margin-right: 2px;
			}

		}

		.uni-forms-item__error {
			margin-left: 5px;
		}


		.uni-data-checklist {
			margin: 0 !important;
		}

		.uni-forms-item__content {
			background-color: white;
		}

		.uni-file-picker {
			padding: 10px;
		}
	}

	.input {
		width: 80%;
		border-bottom: 1px solid #eee;
	}

	.placeholder {
		padding-left: 35px;
		color: #999;
		font-size: 12px;
		padding-bottom: 5px;

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
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		background-color: white;
		z-index: 1000;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.uni-data-checklist .checklist-group .checklist-box.is--button {
		font-size: 20px;
	}
</style>