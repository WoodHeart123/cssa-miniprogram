<template>
	<view id="rent-post">
		<uni-forms ref="rentalForm" :model="rental" :rules="rules">
			<view class="image_upload">
				<uni-file-picker limit="5" fileMediatype="image" :auto-upload="false" @select="onSelectImage"
					@delete="onDeleteImage"></uni-file-picker>
			</view>

			<view class="card uni-form-item uni-column">
				<uni-forms-item name="rentalTitle">
					<input class="uni-input" v-model="rental.rentalTitle" maxlength="22" placeholder="请填写房屋信息"
						placeholder-style="font-size:14px;color:gray" />
				</uni-forms-item>
			</view>


			<view class="card uni-textarea textbox">
				<uni-forms-item name="rentalDescription">
					<uni-easyinput type="textarea" v-model="rental.rentalDescription" placeholder="请描述房屋详情,如户型 地点 具体租期等" maxlength="400"
						placeholderStyle="font-size:14px;color:gray" :clearable="clearable"> </uni-easyinput>
				</uni-forms-item>

			</view>
			

			<view class="card label_group">
				<uni-forms-item name="furnitureType">
					<uni-data-checkbox v-model="rental.furnitureType" :localdata="furnitureOption"></uni-data-checkbox>
				</uni-forms-item>
			</view>
			
			<view class="card label_group">
				<uni-forms-item name="floorplan">
					<uni-data-checkbox v-model="rental.floorplan" :localdata="floorplanOption"></uni-data-checkbox>
				</uni-forms-item>
			</view>
			
			<view class="card label_group">
				<uni-forms-item name="leasePeriod">
					<uni-data-checkbox v-model="rental.leasePeriod" :localdata="leaseOption"></uni-data-checkbox>
				</uni-forms-item>
			</view>


			<view class="card">
				<uni-forms-item name="price">
					<view class="uni-column row-view">
						<span class="span_margin">$</span>
						<uni-easyinput type="number" v-model="product.price" placeholder="请填写价格"
							placeholder-style="font-size:14px;color:gray" :clearable="clearable" />
					</view>
				</uni-forms-item>
			</view>



			<view class="card">
				<uni-forms-item name="contact">
					<view class="uni-column row-view">
						<span class="span_margin">微信号</span>
						<input class="uni-input" v-model="product.contact" maxlength="22" placeholder="请填写微信号以便联系"
							placeholder-style="font-size:14px;color:gray" @input="showCheckBox"/>
					</view>
					<view class="checkbox check_message" v-if="!hasID">
						<checkbox-group @change="checkBoxChange">
							<checkbox value="save_contact" :checked="save" color="#1E90FF"
								style="transform:scale(0.8);" />

							保存联系方式，方便后续使用
						</checkbox-group>
					</view>
				</uni-forms-item>
			</view>



			<view class="uni-padding-wrap uni-common-mt confirm-button">
				<button type="default" style="background-color: #1E90FF; color: #ffffff;" plain="true"
					@click="submit('productForm')">发布</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hasID:false,
				save: true,
				upLoadFail: false,
				uploadCount: 0,
				clearable: false,
				rental: {
					imageList: [],
					rentalDescription: "",
					rentalTitle: ""
				},
				images:[],
				furnitureOption: [{
					text: "家具齐全",
					value: "FULLYFURNISHED"
				}, {
					text: "部分家具",
					value: "SOMEFURNITURE"
				}, {
					text: "无家具",
					value: "NOFURNITURE"
				}],
				floorplanOption: [{
					text: 'studio',
					value: 'STUDIO'
				}, {
					text: '一室',
					value: 'ONEBEDROOM'
				}, {
					text: '二室',
					value: 'TWOBEDROOMS'
				}, {
					text: '三室',
					value: 'THREEBEDROOMS'
				}, {
					text: '四室+',
					value: 'FOURPLUSBEDROOMS'
				}],
				leaseOption: [{
					text: '暑假',
					value: 'SUMMER'
				}, {
					text: '秋季学期',
					value: 'FALL'
				}, {
					text: '寒假',
					value: 'Winter'
				}, {
					text: '春季学期',
					value: 'Spring'
				}, {
					text: '全年',
					value: 'ALLYEAR'
				}, {
					text: '短租',
					value: 'SHORTTERM'
				}],
				rules: {
					rentalTitle: {
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
					rentalDescription: {
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
					floorplanType: {
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
			}
		},
		onShow(){
			 wx.cloud.init();
			 let userInfo = uni.getStorageSync("userInfo-2");
			 this.rental.sellerAvatar = userInfo.avatar;
			 this.rental.sellerNickname = userInfo.nickname;
			 if(userInfo.wechatID != null){
				 this.rental.contact = userInfo.wechatID;
				 this.save = false;
				 this.hasID = true;
			 }
		},
		methods: {
			showCheckBox:function(){
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
					this.product.imageList.push({
						filename: e.tempFiles[i].name,
						filepath: e.tempFilePaths[i]
					});
				}
				console.log(this.product.imageList);
			},
			onDeleteImage: function(e) {
				for (let i = 0; i < this.product.imageList.length; i++) {
					if (this.product.imageList[i].filename == e.tempFile.name) {
						this.product.imageList.splice(i, 1);
						return;
					}
				}
				console.log(this.product.imageList);
			},
			submit(ref) {
				console.log(this.save);
				this.$refs[ref].validate().then(res => {
					this.uploadCount = 0;
					this.uploadFail = false;
					this.images = [];
					uni.showLoading({
						title: "请耐心等待信息上传"
					});
					this.uploadImage();
				}).catch(err => {
					console.log('err', err);
				})
			},
			uploadImage: async function() {
				uni.showLoading({
					title: "正在上传内容"
				});
				for (let i = 0; i < this.product.imageList.length; i++) {
					uni.uploadFile({
						url: "http://cssa-mini-na.oss-us-west-1.aliyuncs.com",
						filePath: this.product.imageList[i].filepath,
						fileType: 'image',
						name: 'file',
						formData: {
							key: "cssa-rental/" + this.rental.imageList[i].filename,
							region: 'oss-us-west-1',
							accessKeyId: 'LTAI5tG4Jt4WD77C1XSDTJAj',
							accessKeySecret: 'HsXwO3QW67PBzpIV2CeE1uM6bU4sd7',
							bucket: 'cssa-mini-na',
							success_action_status:200,
						},
						success: res => {
							console.log(res);
							if (res.statusCode != 200) {
								uni.hideLoading();
								uni.showToast({
									title: "上传图片失败",
									icon: "error"
								});
								this.uploadFail = true;
							}else{
								this.uploadCount++;
								this.images.push("http://cssa-mini-na.oss-us-west-1.aliyuncs.com" + "/cssa-secondhand/" + this.product.imageList[i].filename)
							}
							if (this.uploadCount == this.product.imageList.length) {
								this.product.images = this.images,
								this.postProduct();
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
			postProduct: async function() {
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9go38k3y9fee3b2e',
					},
					path: `/rental/saveRental?save=${this.save}`,
					method: 'POST',
					header: {
						'X-WX-SERVICE': 'springboot-f8i8',
					},
					data: this.rental
				});
				uni.hideLoading();
				if (res.data.status == 100) {
					uni.$emit("uploadSuccess");
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
</script>

<style>
	#second-post {
		position: absolute;
		width: 94vw;
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
