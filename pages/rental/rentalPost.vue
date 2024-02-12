<template>
	<view id="rental-post">
		<uni-forms ref="rentalForm" :modelValue="rental" :rules="rules">
			<view class="card uni-form-item uni-column" v-if="!this.edit">
				<uni-forms-item name="imageList">
					<view class="image_upload">
						<uni-file-picker limit="5" fileMediatype="image" :auto-upload="false" @select="onSelectImage"
							@delete="onDeleteImage"></uni-file-picker>
					</view>
				</uni-forms-item>
			</view>


			<view class="card label_group">
				<uni-forms-item name="floorPlan">
					<view class="row-view">
						<span class="span_margin">户型</span>
						<uni-data-picker placeholder="请选择户型" v-model="rental.floorPlan" :localdata="floorPlan"
							popup-title="请选择户型" :clear-icon=false />
					</view>
				</uni-forms-item>
			</view>

			<view class="card label_group">
				<uni-forms-item name="sexConstraint">
					<uni-data-checkbox selectedColor="#9b0000" v-model="rental.sexConstraint"
						:localdata="sexConstraint"></uni-data-checkbox>
				</uni-forms-item>
			</view>


			<view class="card uni-form-item uni-column">
				<uni-forms-item name="location">
					<input class="uni-input" v-model="rental.location" maxlength="22" placeholder="请填写房屋信息"
						placeholder-style="font-size:14px;color:gray" />
				</uni-forms-item>
			</view>


			<view class="card uni-textarea textbox">
				<uni-forms-item name="description">
					<uni-easyinput type="textarea" v-model="rental.description"
						placeholder="请描述房屋详情,如户型/地点/具体租期,请包括整间转租还是单个卧室转租等" maxlength="400"
						placeholderStyle="font-size:14px;color:gray" :clearable="clearable">
					</uni-easyinput>
				</uni-forms-item>
			</view>


			<view class="card" style="padding: 5px">
				<uni-datetime-picker v-model="rental.time" type="daterange" :start="start" :clear-icon="false"
					:border="false" @maskClick="maskClick" />
			</view>

			<view class="card">
				<uni-forms-item name="price">
					<view class="uni-column row-view">
						<span class="span_margin">$</span>
						<input type="digit" v-model="rental.price" placeholder="请填写价格"
							laceholder-style="font-size:14px;color:gray" />
						<span>{{"/ 月"}}</span>
					</view>
				</uni-forms-item>
			</view>

			<view class="card">
				<uni-forms-item name="contact">
					<view class="uni-column row-view">
						<span class="span_margin">微信号</span>
						<input class="uni-input" v-model="rental.contact" maxlength="22" placeholder="请填写微信号以便联系"
							placeholder-style="font-size:14px;color:gray" />
					</view>
					<!-- 					<view class="checkbox check_message" v-if="!hasID">
					<view class="checkbox check_message" v-if="!hasID">
						<checkbox-group @change="checkBoxChange">
							<checkbox value="save_contact" :checked="save" color="#9b0000"
								style="transform:scale(0.8);" />
							保存联系方式，方便后续使用
						</checkbox-group>
					</view> -->
				</uni-forms-item>
			</view>



			<view class="uni-padding-wrap uni-common-mt confirm-button">
				<button type="default" style="background-color: #9b0000; color: #ffffff;" plain="true"
					@click="submit('rentalForm')">发布</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	import floorPlan from './rentalPost.js'
	export default {
		data() {
			return {
				unloading: false,
				hasID: false,
				save: true,
				edit: false,
				upLoadFail: false,
				uploadCount: 0,
				clearable: false,
				start: Date.now(),
				rental: {
					imageList: [],
					description: "",
					location: "",
					time: [0, 0],
					sexConstraint: -1,
					floorPlan: "",
					price: 100
				},
				images: [],
				sexConstraint: [{
					text: "限男",
					value: 0
				}, {
					text: "限女",
					value: 1
				}, {
					text: "性别不限",
					value: 2
				}],
				floorPlan: floorPlan,
				rules: {
					imageList: {
						rules: [{
								required: true,
								errorMessage: '请上传图片',
							},
							{
								minLength: 1,
								maxLength: 5,
								errorMessage: '最多只能上传五张图片',
							}
						]
					},
					location: {
						rules: [{
								required: true,
								errorMessage: '请填写房屋信息',
							},
							{
								minLength: 1,
								maxLength: 22,
								errorMessage: '房屋信息长度在 1 到 22 个字符之间',
							}
						]
					},
					description: {
						rules: [{
								required: true,
								errorMessage: '请填写房屋详情',
							},
							{
								minLength: 1,
								maxLength: 400,
								errorMessage: '房屋详情长度在 1 到 400 个字符之间',
							}
						]
					},
					furnitureType: {
						rules: [{
							required: true,
							errorMessage: '请选择家具',
						}]
					},
					floorPlan: {
						rules: [{
							required: true,
							errorMessage: '请选择户型',
						}]
					},
					leasePeriod: {
						rules: [{
							required: true,
							errorMessage: '请选择租期',
						}]
					},
					price: {
						rules: [{
							required: true,
							errorMessage: '请输入转租价格',
						}, {
							format: "number",
							errorMessage: "类型错误"
						}, {
							maximum: 5000,
							errorMessage: '转租价格应在5000至0之内',
						}]
					},
					contact: {
						rules: [{
							required: true,
							errorMessage: '请输入联系方式',
						}]
					}

				},
				userInfo: {}
			}
		},
		onLoad(options) {
			wx.cloud.init();
			console.log(options)
			if (options.rental != null) {
				this.edit = true
				this.rental = JSON.parse(decodeURIComponent(options.rental))
				this.rental.time = [moment(this.rental.rentalStartTime).format("YYYY-MM-DD"), moment(this.rental
					.rentalEndTime).format("YYYY-MM-DD")]
			}
		},
		onShow() {
			this.userInfo = uni.getStorageSync("userInfo-2");
			if (!this.edit && this.userInfo.wechatID != null) {
				this.rental.contact = this.userInfo.wechatID;
				this.save = false;
				this.hasID = true;
			}
		},
		watch: {
			range(newval) {
				console.log('范围选:', this.range);
			}
		},
		methods: {
			maskClick(e) {
				console.log('maskClick事件:', e);
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			showCheckBox: function() {
				this.save = true;
				this.hasID = false;
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.detail.value) {
						this.current = i;
						break;
					}
				}
			},
			checkBoxChange: function(e) {
				if (e.detail.length == 0) {
					this.save = false;
				} else {
					this.save = true;
				}
			},
			onSelectImage: function(e) {
				for (let i = 0; i < e.tempFilePaths.length && i < e.tempFiles.length; i++) {
					this.rental.imageList.push({
						filename: e.tempFiles[i].name,
						filepath: e.tempFilePaths[i]
					});
				}
			},
			onDeleteImage: function(e) {
				for (let i = 0; i < this.rental.imageList.length; i++) {
					if (this.rental.imageList[i].filename == e.tempFile.name) {
						this.rental.imageList.splice(i, 1);
						return;
					}
				}
			},
			submit(ref) {
				if (this.uploading) {
					return;
				}
				this.$refs[ref].validate().then(res => {
					this.uploading = true;
					this.rental.rentalStartTime = moment(this.rental.time[0], "YYYY-MM-DD").valueOf()
					this.rental.rentalEndTime = moment(this.rental.time[1], "YYYY-MM-DD").valueOf()
					this.images = [];
					uni.showLoading({
						title: "请耐心等待信息上传"
					});
					if (this.edit) {
						this.updateRental();
					} else {
						this.uploadImage();
					}
				}).catch(err => {
					console.log(err);
					console.log(this.rental)
					uni.showToast({
						title: err[0].errorMessage,
						icon: "error"
					})
				})
			},
			uploadImage: async function() {
				uni.showLoading({
					title: `上传图片,0/${this.rental.imageList.length}`,
					mask: true
				});
				let uploadedImageCount = 0;
				const uploadPromises = this.rental.imageList.map(async (image) => {
					try {
						const uploadedImage = await uploadOSS(image);
						uploadedImageCount++;
						uni.showLoading({
							title: `上传图片,${uploadedImageCount}/${this.rental.imageList.length}`,
							mask: true
						});
						return uploadedImage;
					} catch (error) {
						throw new Error(`上传图片失败`);
					}
				});
				try {
					const uploadedImages = await Promise.all(uploadPromises);
					this.images = uploadedImages;
					this.rental.images = this.images;
					this.postRental();
				} catch (error) {
					uni.hideLoading();
					uni.showToast({
						title: error,
						icon: "error"
					});
				}
			},
			postRental: async function() {
				uni.showLoading({
					title: "发布信息中",
					mask: true
				});

				const opts = {
					path: `/rental/postRentalInfo?save=${this.save}`,
					type: 'POST',
					data: this.rental
				};

				requestAPI(opts).then(response => {
					uni.hideLoading();
					if (response.data.status === 100) {
						if (this.rental.save) {
							this.userInfo.wechatID = this.rental.contact;
						}
						uni.setStorageSync("userInfo-2", this.userInfo);
						uni.$emit("uploadRentalSuccess");
						uni.navigateBack();
					} else {
						uni.showToast({
							title: "上传信息失败",
							icon: "error"
						});
					}
				}).catch(error => {
					uni.hideLoading();
					uni.showToast({
						title: "上传信息失败",
						icon: "error"
					});
				});
			},
			updateRental: async function() {
				const res = await requestAPI({
					path: `/rental/updateRental`,
					type: 'POST',
					data: this.rental
				})
				uni.hideLoading();
				if (res.data.status == 100) {
					uni.$emit("uploadRentalSuccess");
					uni.navigateBack();
				} else {
					uni.showToast({
						title: "上传信息失败",
						icon: "error"
					});
				}
			}
		}
	}
	import moment from "moment/min/moment-with-locales";
	import 'moment/locale/zh-cn';
	import uploadOSS from '@/api/upload.js'
	import requestAPI from '@/api/request.js'
</script>

<style>
	input {
		height: 35px;
	}

	#rental-post {
		position: absolute;
		min-width: 100vw;
		height: 100vh;
		padding: 0 3vw 0 3vw;
		background-color: white;
		overflow-x: scroll;
	}

	.image_upload {
		padding: 14px;
		padding-top: 0;
	}

	.label_group {
		display: flex;
		flex-wrap: wrap;
	}

	.checkbox {
		margin-top: 10px;
		font-size: 16px;
	}

	.radio_group1 {
		margin-right: 15px;
		font-size: 16px;
	}

	.radio_group2 {
		margin-right: 5px;
		font-size: 16px;
	}

	.row-view {
		display: flex;
		flex-direction: row;
		line-height: 30px;
		align-items: center;
	}

	.margin-right1 {
		margin-right: 20px;
	}

	.margin-right2 {
		margin-right: 10px;
	}

	.span_margin {
		margin-right: 10px;
		font-size: 16px;
	}

	.divider {
		background: #000000;
		width: 100%;
		height: 5rpx;
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.type_font {
		font-size: 16px;
	}

	.check_message {
		font-size: 14px;
		color: #8B0000;
	}

	.text-box {
		width: 100%;
		height: 100%;
	}

	.type_view {
		margin-left: 20px;
		color: #575757;
	}

	.card {
		box-shadow: 0 0 5px 1px rgba(0, 0, 0, .08);
		border-radius: 5px;
		padding: 12px 12px 18px 12px;
		margin-bottom: 5px;
		height: auto;
	}

	.confirm-button {
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.input-value-border {
		border: none !important;
	}

	.is-input-border {
		border: none !important;
	}

	.uni-easyinput__content-textarea {
		padding: 0 !important;
		height: 150px !important;
	}
</style>