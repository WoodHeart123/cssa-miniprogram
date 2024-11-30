<template>
	<view id="ride-post">
		<uni-forms ref="rideForm" :modelValue="ride" :rules="rules">
			<!-- 图片上传 -->
			<view class="card uni-form-item uni-column">
				<uni-forms-item name="imageList">
					<view class="image_upload">
						<uni-file-picker 
							limit="5" 
							fileMediatype="image" 
							:auto-upload="false" 
							@select="onSelectImage" 
							@delete="onDeleteImage">
						</uni-file-picker>
					</view>
				</uni-forms-item>
			</view>

			<!-- 起点 -->
			<view class="card uni-form-item uni-column">
				<uni-forms-item name="origin">
					<input class="uni-input" v-model="ride.origin" maxlength="22" placeholder="请输入出发地点" 
						placeholder-style="font-size:14px;color:gray" />
				</uni-forms-item>
			</view>

			<!-- 终点 -->
			<view class="card uni-form-item uni-column">
				<uni-forms-item name="destination">
					<input class="uni-input" v-model="ride.destination" maxlength="22" placeholder="请输入目的地" 
						placeholder-style="font-size:14px;color:gray" />
				</uni-forms-item>
			</view>

			<!-- 出发时间 -->
			<view class="card">
				<uni-datetime-picker v-model="ride.departureTime" type="datetime" :start="start" :clear-icon="false" 
					:border="false" @maskClick="maskClick" />
			</view>

			<!-- 返回时间 -->
			<view class="card">
				<uni-datetime-picker v-model="ride.returnTime" type="datetime" :start="start" :clear-icon="false" 
					:border="false" @maskClick="maskClick" placeholder="可选：填写返回时间" />
			</view>

			<!-- 描述 -->
			<view class="card uni-textarea textbox">
				<uni-forms-item name="description">
					<uni-easyinput type="textarea" v-model="ride.description" 
						placeholder="请描述顺风车详情，如车型/座位数/出发时间等" maxlength="400" 
						placeholderStyle="font-size:14px;color:gray" :clearable="clearable">
					</uni-easyinput>
				</uni-forms-item>
			</view>

			<!-- 价格 -->
			<view class="card">
				<uni-forms-item name="price">
					<view class="uni-column row-view">
						<span class="span_margin">$</span>
						<input type="digit" v-model="ride.price" placeholder="请输入价格" 
							placeholder-style="font-size:14px;color:gray" />
						<span>{{"/ 人"}}</span>
					</view>
				</uni-forms-item>
			</view>

			<!-- 联系方式 -->
			<view class="card">
				<uni-forms-item name="contact">
					<view class="uni-column row-view">
						<span class="span_margin">微信号</span>
						<input class="uni-input" v-model="ride.contact" maxlength="22" placeholder="请输入微信号以便联系" 
							placeholder-style="font-size:14px;color:gray" />
					</view>
				</uni-forms-item>
			</view>

			<!-- 提交按钮 -->
			<view class="uni-padding-wrap uni-common-mt confirm-button">
				<button type="default" style="background-color: #9b0000; color: #ffffff;" plain="true" 
					@click="submit('rideForm')">发布</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	import moment from "moment/min/moment-with-locales";
	import 'moment/locale/zh-cn';
	import requestAPI from '@/api/request.js';

	export default {
		data() {
			return {
				clearable: false,
				start: Date.now(),
				ride: {
					imageList: [],
					origin: "",
					destination: "",
					departureTime: "",
					returnTime: "",
					description: "",
					price: 0,
					contact: ""
				},
				rules: {
					imageList: {
						rules: [{
							required: true,
							errorMessage: '请上传图片'
						}, {
							minLength: 1,
							maxLength: 5,
							errorMessage: '最多只能上传五张图片'
						}]
					},
					origin: {
						rules: [{
							required: true,
							errorMessage: '请输入出发地点'
						}, {
							minLength: 1,
							maxLength: 22,
							errorMessage: '出发地点长度在 1 到 22 个字符之间'
						}]
					},
					destination: {
						rules: [{
							required: true,
							errorMessage: '请输入目的地'
						}, {
							minLength: 1,
							maxLength: 22,
							errorMessage: '目的地长度在 1 到 22 个字符之间'
						}]
					},
					departureTime: {
						rules: [{
							required: true,
							errorMessage: '请选择出发时间'
						}]
					},
					description: {
						rules: [{
							required: true,
							errorMessage: '请输入描述'
						}, {
							minLength: 1,
							maxLength: 400,
							errorMessage: '描述长度在 1 到 400 个字符之间'
						}]
					},
					price: {
						rules: [{
							required: true,
							errorMessage: '请输入价格'
						}, {
							format: "number",
							errorMessage: "价格格式错误"
						}, {
							maximum: 1000,
							errorMessage: '价格应在 1000 以内'
						}]
					},
					contact: {
						rules: [{
							required: true,
							errorMessage: '请输入联系方式'
						}]
					}
				}
			};
		},
		methods: {
			maskClick(e) {
				console.log('maskClick事件:', e);
			},
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					console.log('表单验证通过:', res);
					this.postRide();
				}).catch(err => {
					console.log('表单验证失败:', err);
					uni.showToast({
						title: err[0].errorMessage,
						icon: "error"
					});
				});
			},
			postRide() {
				uni.showLoading({
					title: "发布信息中",
					mask: true
				});

				const opts = {
					path: `/ride/postRideInfo`,
					type: 'POST',
					data: this.ride
				};

				requestAPI(opts).then(response => {
					uni.hideLoading();
					if (response.data.status === 100) {
						uni.showToast({
							title: "发布成功",
							icon: "success"
						});
						uni.navigateBack();
					} else {
						uni.showToast({
							title: "发布失败，请重试",
							icon: "error"
						});
					}
				}).catch(error => {
					uni.hideLoading();
					uni.showToast({
						title: "网络错误，请稍后重试",
						icon: "error"
					});
				});
			},
			onSelectImage(e) {
				for (let i = 0; i < e.tempFilePaths.length && i < e.tempFiles.length; i++) {
					this.ride.imageList.push({
						filename: e.tempFiles[i].name,
						filepath: e.tempFilePaths[i]
					});
				}
			},
			onDeleteImage(e) {
				for (let i = 0; i < this.ride.imageList.length; i++) {
					if (this.ride.imageList[i].filename == e.tempFile.name) {
						this.ride.imageList.splice(i, 1);
						return;
					}
				}
			}
		}
	};
</script>

<style>
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
	.row-view {
		display: flex;
		flex-direction: row;
		line-height: 30px;
		align-items: center;
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
	.span_margin {
		margin-right: 10px;
		font-size: 16px;
	}
</style>
