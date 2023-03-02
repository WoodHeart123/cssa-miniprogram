<template>
	<view id="second-post">
		<uni-forms ref="productForm" :model="product" :rules="rules">
			<view class="card uni-form-item uni-column" v-if="!edit">
				<uni-forms-item name="imageList">	
					<view class="image_upload">
						<uni-file-picker limit="5" fileMediatype="image" :auto-upload="false" @select="onSelectImage"
							@delete="onDeleteImage"></uni-file-picker>
					</view>
				</uni-forms-item>
			</view>

			<view class="card uni-form-item uni-column">
				<uni-forms-item name="productTitle">
					<input class="uni-input" v-model="product.productTitle" maxlength="22" placeholder="请填写商品名称"
						placeholder-style="font-size:14px;color:gray" />
				</uni-forms-item>
			</view>


			<view class="card uni-textarea textbox">
				<uni-forms-item name="productDescription">
					<uni-easyinput type="textarea" v-model="product.productDescription" placeholder="请输入商品描述信息" maxlength="400"
						placeholderStyle="font-size:14px;color:gray" :clearable="clearable"> </uni-easyinput>
				</uni-forms-item>

			</view>

			<view class="card">
				<uni-forms-item name="delivery">
					<uni-data-checkbox selectedColor="#9B0000" v-model="product.delivery" :localdata="deliveryOption"></uni-data-checkbox>
				</uni-forms-item>
			</view>



			<view class="card uni-list">
				<uni-forms-item name="productType">
					<uni-data-picker placeholder="请选择商品类型" popup-title="请选择商品类型" :localdata="item_types"
						v-model="product.productType">
					</uni-data-picker>
				</uni-forms-item>
			</view>



			<view class="card label_group">
				<uni-forms-item name="productCondition">
					<uni-data-checkbox selectedColor="#9B0000" v-model="product.productCondition" :localdata="conditionOption"></uni-data-checkbox>
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
							<checkbox value="save_contact" :checked="save" color="#9b0000"
								style="transform:scale(0.8);" />

							保存联系方式，方便后续使用
						</checkbox-group>
					</view>
				</uni-forms-item>
			</view>



			<view class="uni-padding-wrap uni-common-mt confirm-button">
				<button type="default" style="background-color: #9B0000; color: #ffffff;" plain="true"
					@click="submit('productForm')">{{this.edit?"更新":"发布"}}</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				edit:false,
				hasID:false,
				save: true,
				upLoadFail: false,
				uploadCount: 0,
				clearable: false,
				product: {
					imageList: [],
					productDescription: "",
					productTitle: ""
				},
				images:[],
				item_types: [{
					text: "电子产品",
					value: "ELECTRONIC"
				}, {
					text: "交通工具",
					value: "TRANSPORT"
				}, {
					text: "家具家电",
					value: "FURNITURE"
				}, {
					text: "虚拟卡券",
					value: "DIGITAL"
				}, {
					text: "日常用品",
					value: "DAILY"
				}, {
					text: "美妆服饰",
					value: "MAKEUP"
				}, {
					text: "书籍教具",
					value: "EDU"
				}, {
					text: "宠物用品",
					value: "PET"
				}, {
					text: "其他",
					value: "OTHERS"
				}],
				deliveryOption: [{
					text: '自取',
					value: 'pickup'
				}, {
					text: '送货',
					value: 'deliver'
				}, {
					text: '皆可',
					value: 'all'
				}],
				conditionOption: [{
					text: '全新',
					value: 'NEW'
				}, {
					text: '几乎全新',
					value: 'ALMOST_NEW'
				}, {
					text: '明显使用痕迹',
					value: 'USED'
				}, {
					text: '部分损毁',
					value: 'IMPAIRED'
				}],
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
					productTitle: {
						rules: [{
								required: true,
								errorMessage: '请填写商品名称',
							},
							{
								minLength: 1,
								maxLength: 22,
								errorMessage: '商品名称长度在 1 到 22 个字符之间',
							}
						]
					},
					productDescription: {
						rules: [{
								required: true,
								errorMessage: '请填写商品描述',
							},
							{
								minLength: 1,
								maxLength: 400,
								errorMessage: '商品名称长度在 1 到 400 个字符之间',
							}
						]
					},
					productType: {
						rules: [{
							required: true,
							errorMessage: '请选择商品类型',
						}]
					},
					delivery: {
						rules: [{
							required: true,
							errorMessage: '请选择配送方式',
						}]
					},
					productCondition: {
						rules: [{
							required: true,
							errorMessage: '请选择商品成色',
						}]
					},
					price: {
						rules: [{
							required: true,
							errorMessage: '请输入商品价格',
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
		onLoad(options){
			console.log(options)
			if(options.product != null){
				this.edit = true
				this.product = JSON.parse(decodeURIComponent(options.product))
				this.product.productCondition = this.conditionOption[this.product.productCondition].value
				this.product.productType = this.item_types[this.product.productType].value
			}
		},
		onShow(){
			 wx.cloud.init();
			 let userInfo = uni.getStorageSync("userInfo-2");
			 this.product.sellerAvatar = userInfo.avatar;
			 this.product.sellerNickname = userInfo.nickname;
			 if(userInfo.wechatID != null){
				 this.product.contact = userInfo.wechatID;
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
					if(!this.edit){
						this.uploadImage();
					}else{
						this.updateProduct()
					}
				}).catch(err => {
					uni.showToast({
						title: err[0].errorMessage,
						icon:"error"
					})
				})
			},
			updateProduct: async function(){
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9gip97mx4bfa32a3',
					},
					path: `/user/updateSecondHand`,
					method: 'POST',
					header: {
						'X-WX-SERVICE': 'springboot-ds71',
					},
					data: this.product
				});
				uni.hideLoading();
				if (res.data.status == 100) {
					uni.$emit("updateSecondSuccess");
					uni.navigateBack();
				} else {
					uni.showToast({
						title: "更新信息失败",
						icon: "error"
					});
				}
			},
			uploadImage: async function() {
				uni.showLoading({
					title: "正在上传内容"
				});
				for (let i = 0; i < this.product.imageList.length; i++) {
					uni.uploadFile({
						url: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com",
						filePath: this.product.imageList[i].filepath,
						fileType: 'image',
						name: 'file',
						formData: {
							key: "cssa-secondhand/" + this.product.imageList[i].filename,
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
								this.images.push("https://cssa-mini-na.oss-us-west-1.aliyuncs.com" + "/cssa-secondhand/" + this.product.imageList[i].filename)
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
						env: 'prod-9gip97mx4bfa32a3',
					},
					path: `/secondhand/saveProduct?save=${this.save}`,
					method: 'POST',
					header: {
						'X-WX-SERVICE': 'springboot-ds71',
					},
					data: this.product
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
