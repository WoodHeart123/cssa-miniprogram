<template>
	<view id="second-post">
		<uni-forms :model="product">
			<view class="image_upload">
				<uni-file-picker limit="5" fileMediatype="image" :auto-upload="false" @select="onSelectImage"
					@delete="onDeleteImage"></uni-file-picker>
			</view>
			<uni-forms-item>
				<view class="card uni-form-item uni-column">
					<input class="uni-input" v-model="product.productName" maxlength="22" placeholder="请填写商品名称"
						placeholder-style="font-size:14px" />
				</view>
			</uni-forms-item>
			<uni-forms-item>
				<view class="card uni-textarea textbox">
					<textarea v-model="product.description" placeholder="请输入商品描述信息" maxlength="400"
						placeholder-style="font-size:14px" />
				</view>
			</uni-forms-item>

			<uni-forms-item>
				<view class="card">
					<uni-data-checkbox v-model="product.delivery" :localdata="deliveryOption"></uni-data-checkbox>
				</view>
			</uni-forms-item>

			<uni-forms-item>
				<view class="card uni-list">
					<view class="uni-list-cell row_view">
						<view class="uni-list-cell-left type_font">
							分类选择
						</view>
						<view class="uni-list-cell-db">
							<picker @change="bindPickerChange" :value="index" :range="item_types">
								<view class="uni-input type_view">{{item_types[item_type_idx]}}</view>
							</picker>
						</view>
					</view>
				</view>
			</uni-forms-item>

			<uni-forms-item>
				<view class="card label_group">
					<uni-data-checkbox v-model="product.condition" :localdata="conditionOption"></uni-data-checkbox>
				</view>
			</uni-forms-item>

			<uni-forms-item>
				<view class="card uni-form-item uni-column row_view">
					<span class="span_margin">$</span>
					<input class="uni-input" type="number" v-model="product.price" @blur="bindTextAreaBlur"
						maxlength="10" placeholder="请填写价格" placeholder-style="font-size:14px" />
				</view>
			</uni-forms-item>

			<uni-forms-item>
				<view class="card">
					<view class="uni-form-item uni-column row_view">
						<span class="span_margin">微信号</span>
						<input class="uni-input" v-model="product.contact" @blur="bindTextAreaBlur" maxlength="22" placeholder="请填写微信号以便联系"
							placeholder-style="font-size:14px" />
					</view>
					<view class="checkbox check_message">
						<checkbox value="save_contact" checked="false" color="#1E90FF" style="transform:scale(0.8);" />
						保存联系方式，方便后续使用
					</view>
				</view>

			</uni-forms-item>

			<view class="uni-padding-wrap uni-common-mt confirm-button">
				<button type="default" style="background-color: #1E90FF; color: #ffffff;" plain="true">发布</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				product: {
					imageList: [],
					description: "",
					productName: ""
				},
				item_type_idx: 0,
				item_types: ["电子产品", "交通工具", "家具家电", "虚拟卡券", "日常用品", "美妆服饰", "书籍教具", "宠物用品", "其他"],
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
				}]
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
				this.item_type_idx = e.detail.value;
			},
			onSelectImage: function(e) {
				for (let i = 0; i < e.tempFilePaths.length && i < e.tempFiles.length; i++) {
					this.product.imageList.push({
						filename: e.tempFiles[i].name,
						filepath: e.tempFilePaths[i]
					});
				}
				console.log(this.product.imageList());
			},
			onDeleteImage: function(e) {
				console.log(e);
			}
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

	.row_view {
		display: flex;
		flex-direction: row;
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
		padding: 15px;
	}

	.uni-forms-item {
		margin-bottom: 12px !important;
	}

	.confirm-button {
		margin-bottom: 20px;
	}
</style>
