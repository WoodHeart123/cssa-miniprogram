<template>
	<view id="second-post">
		<uni-forms ref="form" :model="secondPost" :rules="rules">
			<uni-section title="选择图片">
				<view class="image-upload">
					<uni-file-picker limit="5"></uni-file-picker>
				</view>
				<uni-forms-item name="productName">
					<input class="uni-input product-name-box" @blur="bindTextAreaBlur" maxlength="22"
						placeholder="请填写商品名称" placeholder-style="font-size:14px" />
				</uni-forms-item>
				<uni-forms-item name="product-description">
					<view class="uni-textarea product-description-box">
						<textarea @blur="bindTextAreaBlur" placeholder="请输入商品描述信息" maxlength="400"
							placeholder-style="font-size:14px" style="width: 100%;" />
					</view>
				</uni-forms-item>
				<uni-forms-item name="pickupDelivery">
					<view class="generic-box">
						<radio-group @change="radioChange">
							<label class="radio radio-group1">
								<radio value="pickup" checked="true" color=#8B0000 style="transform:scale(0.8)" />自取
							</label>
							<label class="radio radio-group1">
								<radio value="delivery" color=#8B0000 style="transform:scale(0.8)" />可送货
							</label>
							<label class="radio radio-group1">
								<radio value="pnd" color=#8B0000 style="transform:scale(0.8)" />都可以
							</label>
						</radio-group>
					</view>
				</uni-forms-item>
				<uni-forms-item name="category">
					<view class="uni-list generic-box">
						<view class="uni-list-cell row-view">
							<view class="uni-list-cell-left type-font">
								分类选择
							</view>
							<view class="uni-list-cell-db">
								<picker @change="bindPickerChange" :value="index" :range="item_types">
									<view class="uni-input type-view">{{item_types[index]}}</view>
								</picker>
							</view>
						</view>
					</view>
				</uni-forms-item>
				<uni-forms-item name="condition">
					<view class="generic-box">
						<radio-group class="label-group" @change="radioChange">
							<label class="radio radio-group2">
								<radio value="new" checked="true" color=#8B0000 style="transform:scale(0.8)" />全新
							</label>
							<label class="radio radio-group2">
								<radio value="almostnew" color=#8B0000 style="transform:scale(0.8)" />几乎全新
							</label>
							<label class="radio radio-group2">
								<radio value="used" color=#8B0000 style="transform:scale(0.8)" />明显使用痕迹
							</label>
							<label class="radio radio-group2">
								<radio value="impaired" color=#8B0000 style="transform:scale(0.8)" />部分损毁
							</label>
						</radio-group>
					</view>
				</uni-forms-item>
				<uni-forms-item name="price">
					<view class="uni-column row-view generic-box">
						<span class="span-margin">价格 $</span>
						<input class="uni-input" type="number" @blur="bindTextAreaBlur" maxlength="10"
							placeholder="请填写价格" placeholder-style="font-size:14px" />
					</view>
				</uni-forms-item>
				<uni-forms-item name="contact">
					<view class="generic-box">
						<view class="uni-column row-view">
							<span class="span-margin">微信号</span>
							<input class="uni-input" @blur="bindTextAreaBlur" maxlength="20" placeholder="请填写联系方式"
								placeholder-style="font-size:14px" />
						</view>
						<view class="checkbox check-message">
							<checkbox value="save-contact" checked="false" color=#8B0000
								style="transform:scale(0.8);" />
							保存联系方式，方便后续使用
						</view>
					</view>
				</uni-forms-item>
				<uni-forms-item name="publish">
					<view class="uni-padding-wrap uni-common-mt">
						<button @click="submit" type="default" style="background-color: #8B0000; color: #ffffff;"
							plain="true">发布</button>
					</view>
				</uni-forms-item>
			</uni-section>
		</uni-forms>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: 0,
				item_types: ["电子产品", "交通工具", "家具家电", "虚拟卡券", "日常用品", "美妆服饰", "书籍教具", "宠物用品", "其他"],
				secondPost: {},
				rules: {
					productName: {
						rules: [{
								required: true,
								errorMessage: '请填写商品名称',
							},
							{
								maxLength: 22,
								errorMessage: '名称最长为22字符',
							}
						]
					},
					productDescription: {
						rules: [{
								required: true,
								errorMessage: '请填写商品描述',
							},
							{
								maxLength: 400,
								errorMessage: '描述最长为400字符',
							}
						],
					},
					contact: {
						rules: [{
								required: true,
								errorMessage: '请填写联系方式',
							},
							{
								maxLength: 20,
								errorMessage: '微信号最长为20字符',
							}
						],
					},
					price: {
						rules: [{
								required: true,
								errorMessage: '请填写价格',
							},
							{
								maxLength: 10,
								errorMessage: '价格最长为10字符',
							}
						]
					},
				},
				path: "pages/second/secondMainPost"

			}
		},
		methods: {
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.detail.value) {
						this.current = i;
						break;
					}
				}
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value
			},
			async secondPost() {
				uni.showLoading({
					title: "正在上传中",
					mask: true
				});
				const res = await wx.cloud.callContainer({
					config: {
						env: 'prod-9go38k3y9fee3b2e',
					},
					path: this.path,
					method: 'POST',
					header: {
						'X-WX-SERVICE': 'springboot-f8i8',
					},
					data: this.secondPost,
				});
				if (res.data.status == 500) {
					uni.showToast({
						icon: "fail",
						title: "服务发生错误，请稍后尝试"
					});
					uni.hideLoading()
					return;
				}
				uni.hideLoading();
				uni.navigateBack();
			
			},
			submit() {
				this.$refs.form.validate().then(res => {
					this.secondPost();
				}).catch(err => {
					console.log('err', err);
				})
			}
		}
	}
</script>

<style>
	#second-post {
		position: absolute;
		width: 94vw;
		height: 100vh;
		left: 3vw;
	}

	.product-name-box {
		margin-left: 10px;
		margin-right: 10px;
		border-radius: 5px;
		overflow: hidden;
		height: 40px;
		box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.08);
		padding-left: 15px;
		padding-right: 15px;
	}

	.product-description-box {
		margin-left: 10px;
		margin-right: 10px;
		border-radius: 5px;
		overflow: hidden;
		height: 200px;
		box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.08);
		padding: 15px;
	}

	.generic-box {
		margin-left: 10px;
		margin-right: 10px;
		border-radius: 5px;
		overflow: hidden;
		box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.08);
		padding: 15px;
	}

	.image-upload {
		padding: 14px;
		padding-top: 0;
	}

	.label-group {
		display: flex;
		flex-wrap: wrap;
	}

	.checkbox {
		margin-top: 10px;
		font-size: 16px;
	}

	.radio-group1 {
		margin-right: 15px;
		font-size: 16px;
	}

	.radio-group2 {
		margin-right: 5px;
		font-size: 16px;
	}

	.row-view {
		display: flex;
		flex-direction: row;
	}

	.span-margin {
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

	.type-font {
		font-size: 16px;
		width: 80px;
	}

	.check-message {
		font-size: 14px;
		color: #8B0000;
	}

	.type-view {
		margin-left: 20px;
		color: #575757;
	}

	.uni-list-cell-db {
		width: 100%;
	}
</style>
