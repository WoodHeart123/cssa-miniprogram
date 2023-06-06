<template>
	<view id="ride-post">
		<uni-forms ref="rideForm" :model="ride" :rules="rules">
			<uni-forms ref="rideForm" :model="ride" :rules="rules">
				<view class="card uni-form-item uni-column">
					<uni-forms-item name="imageList">	
						<view class="image_upload">
							<uni-file-picker limit="5" fileMediatype="image" :auto-upload="false" @select="onSelectImage"
								@delete="onDeleteImage"></uni-file-picker>
						</view>
					</uni-forms-item>
				</view>
			</uni-forms>
			
			<!-- 输入车辆和乘客信息 -->
			<view class="card">
				<uni-forms-item name="vechicleInfo" required>
					<view class="column-container">
						<input class="uni-input" v-model="ride.make" maxlength="8" placeholder="请填写车辆品牌信息, 如: Toyota, 雪佛兰"
							placeholder-style="font-size:14px;color:gray" />
					</view>
				</uni-forms-item>
			</view>
			<view class="card" >
				<uni-forms-item name='plate' required>
				<input class="uni-input" v-model="ride.plate" maxlength="9" placeholder="请填写车辆牌照信息, 如: XXX-123"
					placeholder-style="font-size:14px;color:gray" />
				</uni-forms-item>
			</view>
			
			<!-- <view class="card">
				<uni-forms-item name="passangerInfo" required>
					<div class="row-view"><span class="span_margin">乘客人数</span>
					<uni-number-box v-model="ride.numOfPassanger" max="7" min="1"/>
					</div>
				</uni-forms-item>
			</view> -->
			
			<!-- <view class="card">
				<div class="row-view">
					<span class="span_margin">每人可带行李个数</span>
					<uni-number-box v-model="ride.numOfLuggage" max="7" min="0"/>
				</div>
			</view> -->
			
			<view class="card">
				<input class="uni-input" v-model="ride.model" maxlength="100" placeholder="可填写车辆详细信息, 如: 卡罗拉, SUV"
					placeholder-style="font-size:14px;color:gray" />
			</view>
			
			
			<!-- 输入起始地点 -->
			<view class="card">
				<uni-forms-item name='origin' required>
					<input class="uni-input" v-model="ride.origin" maxlength="20" placeholder="请填写始发地, 如: 麦迪逊"
						placeholder-style="font-size:14px;color:gray" />
				</uni-forms-item>
			</view>
			
			<view class="card">
				<uni-forms-item name='destination' required>
				<input class="uni-input" v-model="ride.destination" maxlength="20" placeholder="请填写目的地, 如: 芝加哥"
					placeholder-style="font-size:14px;color:gray" />
				</uni-forms-item>
			</view>
			
			<!-- 提供详细车辆，旅程，或其它信息的补充 -->
			<view class="card uni-textarea textbox">
				<uni-forms-item name="description">
					<uni-easyinput type="textarea" v-model="ride.description"
						placeholder="可描述车辆, 旅程, 或其它信息等" maxlength="400"
						placeholderStyle="font-size:14px;color:gray" :clearable="clearable">
					</uni-easyinput>
				</uni-forms-item>
			</view>
			
			<!-- // 输入出发日期和时间 -->
			<view class="card">
				<uni-forms-item name="dateAndTime">
					<span class="span_margin">出发日期时间</span>
					<uni-datetime-picker v-model="ride.dateAndTime" :
						:clear-icon="false" :border="false" @maskClick="maskClick" placeholder="选择出发日期时间" />
				</uni-forms-item>
			</view>
			
			<!-- 输入价格信息 -->
			<!-- <view class="card">
				<uni-forms-item name="price">
					<view class="uni-column row-view">
						<span class="span_margin">$</span>
						<uni-easyinput type="number" v-model="ride.price" placeholder="请填写价格"
							placeholder-style="font-size:14px;color:gray" :clearable="clearable" />
						<span>{{"/人"}}</span>
					</view>
				</uni-forms-item>
			</view> -->
			
			<!-- //输入联系方式 -->
			<view class="card">
				<uni-forms-item name="contact">
					<view class="uni-column row-view">
						<span class="span_margin">微信号</span>
						<input class="uni-input" v-model="ride.weChat" maxlength="22" placeholder="请填写微信号以便联系"
							placeholder-style="font-size:14px;color:gray" />
					</view>
					<view class="checkbox check_message" v-if="!hasID || !hasPhone">
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
					@click="submit('<!-- rideForm -->')">发布</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				unloading: false,
				hasID: false,
				hasPhone: false,
				save: true,
				upLoadFail: false,
				uploadCount: 0,
				clearable: false,
				ride: {
					imageList: [],
					description: "",
					make: "",
					model: "",
					bodyStule: "",
					plate: "",
					// numOfPassanger: 0,
					// numOfLuggage: 0,
					origin: "",
					time: [0],
					destination: "",
					dateAndTime: "",
					price: 0,
					weChat: "",
					phone: ""
				},
				rules: {
					make: {
						rules: [{
								required: true,
								errorMessage: '请填写汽车品牌',
							},
							{
								minLength: 1,
								maxLength: 8,
								errorMessage: '汽车信息长度在 1 到 8 个字符之间',
							}
						]
					},
					model: {
						rules: [{
								required: true,
								errorMessage: '请填写汽车品牌',
							},
							{
								minLength: 1,
								maxLength: 15,
								errorMessage: '汽车信息长度在 1 到 15 个字符之间',
							}
						]
					},
					bodyStyle: {
						rules: [{
								required: false,
								errorMessage: '请填写汽车类型',
							},
							{
								minLength: 1,
								maxLength: 9,
								errorMessage: '汽车信息长度在 1 到 9 个字符之间',
							}
						]
					},
					plate: {
						rules: [{
								required: true,
								errorMessage: '请填写汽车品牌',
							},
							{
								minLength: 1,
								maxLength: 9,
								errorMessage: '汽车信息长度在 1 到 9 个字符之间',
							}
						]
					},
					description: {
						rules: [{
								required: true,
								errorMessage: '请填写旅程详情',
							},
							{
								minLength: 1,
								maxLength: 400,
								errorMessage: '旅程详情长度在 1 到 400 个字符之间',
							}
						]
					},
					price: {
						rules: [{
							required: true,
							errorMessage: '请填写单人顺风车价格',
						}]
					},
					origin: {
						rules: [{
							required: true,
							errorMessage: '请填写始发地',
						}]
					},
					destination: {
						rules: [{
							required: true,
							errorMessage: '请填写目的地',
						}]
					},
					numOfPassanger: {
						rules: [{
							required: true,
							errorMessage: '请填写乘客人数',
						}]
					},
					dateAndTime: {
						rules: [{
							required: true,
							errorMessage: '请填写出发日期和时间信息',
						}]
					},
					numOfLuggage: {
						rules: [{
							required: false,
						}]
					},
					weChat: {
						rules: [{
							required: true,
							errorMessage: '请输入微信号',
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
				this.ride.weChat = this.userInfo.wechatID;
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
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();	
				
				year = year - 60;
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			maskClick(e) {
				console.log('maskClick事件:', e);
			},
			onSelectImage: function(e) {
				for (let i = 0; i < e.tempFilePaths.length && i < e.tempFiles.length; i++) {
					this.ride.imageList.push({
						filename: e.tempFiles[i].name,
						filepath: e.tempFilePaths[i]
					});
				}
				console.log(this.ride.imageList);
			},
			onDeleteImage: function(e) {
				for (let i = 0; i < this.ride.imageList.length; i++) {
					if (this.ride.imageList[i].filename == e.tempFile.name) {
						this.ride.imageList.splice(i, 1);
						return;
					}
				}
				console.log(this.ride.imageList);
			},
			submit(ref) {
				if(this.uploading){
					return;
				}
				this.uploading = true;
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
				for (let i = 0; i < this.ride.imageList.length; i++) {
					uni.uploadFile({
						url: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com",
						filePath: this.ride.imageList[i].filepath,
						fileType: 'image',
						name: 'file',
						formData: {
							// key: "cssa-ride/" + this.ride.imageList[i].filename,
							// region: 'oss-us-west-1',
							// accessKeyId: 'LTAI5tG4Jt4WD77C1XSDTJAj',
							// accessKeySecret: 'HsXwO3QW67PBzpIV2CeE1uM6bU4sd7',
							// bucket: 'cssa-mini-na',
							// success_action_status: 200,
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
									"/cssa-ride/" + this.ride.imageList[i].filename)
							}
							if (this.uploadCount == this.ride.imageList.length) {
								this.ride.images = this.images,
									this.postRide();
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
			postRide: async function() {
				const res = await wx.cloud.callContainer({
					config:{
						env: 'prod-9gip97mx4bfa32a3', // 加一个新的config？
					},
					path: `/ride/postRideInfo?save=${this.save}`,
					method: 'POST',
					header: {
						'X-WX-SERVICE': 'springboot-ds71',
					},
					data: this.ride
				});
				uni.hideLoading();
				if (res.data.status == 100) {
					if(this.ride.save = true){
						this.userInfo.wechatID = this.ride.weChat;
					}
					uni.setStorageSync("userInfo-2",this.userInfo)
					uni.$emit("uploadRideSuccess");
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
	.column-container{
		display: flex;
		flex-direction: column;
	}
	#ride-post {
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