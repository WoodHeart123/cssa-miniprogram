<template>
	<view id="rental-post">
		<uni-forms ref="rentalForm" :model="rental" :rules="rules">
			<view class="card uni-form-item uni-column">
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
						<uni-data-picker placeholder="请选择户型" v-model="rental.floorPlan" :localdata="floorPlan" popup-title="请选择户型" :clear-icon=false />
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
				<uni-datetime-picker v-model="rental.time" type="daterange" :start="start" :end="end"
					:clear-icon="false" :border="false" @maskClick="maskClick" />
			</view>

			<view class="card">
				<uni-forms-item name="price">
					<view class="uni-column row-view">
						<span class="span_margin">$</span>
						<uni-easyinput type="number" v-model="rental.price" placeholder="请填写价格"
							placeholder-style="font-size:14px;color:gray" :clearable="clearable" />
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
					<view class="checkbox check_message" v-if="!hasID">
						<checkbox-group @change="checkBoxChange">
							<checkbox value="save_contact" :checked="save" color="#9b0000"
								style="transform:scale(0.8);" />
							保存联系方式，方便后续使用
						</checkbox-group>
					</view>
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
				upLoadFail: false,
				uploadCount: 0,
				clearable: false,
				start: Date.now(),
				end: Date.now() + 10000000000,
				rental: {
					imageList: [],
					description: "",
					location: "",
					time: [0, 0],
					sexConstraint: -1,
					floorPlan: ""
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
						}]
					},
					contact: {
						rules: [{
							required: true,
							errorMessage: '请输入联系方式',
						}]
					}

				},
				userInfo:{}
			}
		},
		onShow() {
			wx.cloud.init();
			this.userInfo = uni.getStorageSync("userInfo-2");
			if (this.userInfo.wechatID != null) {
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
				console.log(this.rental.imageList);
			},
			onDeleteImage: function(e) {
				for (let i = 0; i < this.rental.imageList.length; i++) {
					if (this.rental.imageList[i].filename == e.tempFile.name) {
						this.rental.imageList.splice(i, 1);
						return;
					}
				}
				console.log(this.rental.imageList);
			},
			submit(ref) {
				if(this.uploading){
					return;
				}
				this.uploading = true;
				this.rental.rentalStartTime = moment(this.rental.time[0],"YYYY-MM-DD").valueOf()
				this.rental.rentalEndTime = moment(this.rental.time[1],"YYYY-MM-DD").valueOf()
				this.$refs[ref].validate().then(res => {
					this.uploadCount = 0;
					this.uploadFail = false;
					this.images = [];
					uni.showLoading({
						title: "请耐心等待信息上传"
					});
					this.uploadImage();
				}).catch(err => {
					uni.showToast({
						title: err[0].errorMessage,
						icon:"error"
					})
				})
			},
			uploadImage: async function() {
				uni.showLoading({
					title: "正在上传内容"
				});
				for (let i = 0; i < this.rental.imageList.length; i++) {
					uni.uploadFile({
						url: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com",
						filePath: this.rental.imageList[i].filepath,
						fileType: 'image',
						name: 'file',
						formData: {
							key: "cssa-rental/" + this.rental.imageList[i].filename,
							region: 'oss-us-west-1',
							accessKeyId: 'LTAI5tG4Jt4WD77C1XSDTJAj',
							accessKeySecret: 'HsXwO3QW67PBzpIV2CeE1uM6bU4sd7',
							bucket: 'cssa-mini-na',
							success_action_status: 200,
						},
						success: res => {
							if (res.statusCode != 200) {
								uni.hideLoading();
								uni.showToast({
									title: "上传图片失败",
									icon: "error"
								});
								console.log(res)
								this.uploadFail = true;
							} else {
								this.uploadCount++;
								this.images.push("https://cssa-mini-na.oss-us-west-1.aliyuncs.com" +
									"/cssa-rental/" + this.rental.imageList[i].filename)
							}
							if (this.uploadCount == this.rental.imageList.length) {
								this.rental.images = this.images,
									this.postRental();
							}
						},
						fail: res => {
							uni.hideLoading();
							uni.showToast({
								title: "上传图片失败",
								icon: "error"
							});
						}
					});
				}
			},
			postRental: async function() {
				const res = await wx.cloud.callContainer({
					config:{
						env: 'prod-9gip97mx4bfa32a3',
					},
					path: `/rental/postRentalInfo?save=${this.save}`,
					method: 'POST',
					header: {
						'X-WX-SERVICE': 'springboot-ds71',
					},
					data: this.rental
				});
				uni.hideLoading();
				if (res.data.status == 100) {
					if(this.rental.save = true){
						this.userInfo.wechatID = this.rental.contact;
					}
					uni.setStorageSync("userInfo-2",this.userInfo)
					uni.$emit("uploadRentalSuccess");
					uni.navigateBack();
				} else {
					uni.showToast({
						title: "上传信息失败",
						icon: "error"
					});
				}
			},
		}
	}
	import moment from "moment/min/moment-with-locales";
	import 'moment/locale/zh-cn';
</script>

<style>
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
