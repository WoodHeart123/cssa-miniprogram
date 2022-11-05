<template>
	<view id="second-post">
		<uni-section title="选择图片">
			<view class="image_upload">
				<uni-file-picker limit="5"></uni-file-picker>
			</view>
			<uni-group mode="card">
				<view class="uni-form-item uni-column">
					<input class="uni-input" @blur="bindTextAreaBlur" maxlength="22" placeholder="请填写商品名称" placeholder-style="font-size:14px"/>
				</view>
			</uni-group>
			<uni-group mode="card">
				<view class="uni-textarea">
					<textarea @blur="bindTextAreaBlur" placeholder="请输入商品内容信息" maxlength="400" placeholder-style="font-size:14px"/>
				</view>
			</uni-group>
			<uni-group mode="card">
				<view>
					<label class="radio"><radio value="pickup" checked="true" color=#8B0000 style="transform:scale(0.8)"/>自取</label>
					<label class="radio"><radio value="delivery" color=#8B0000 style="transform:scale(0.8)"/>可送货</label>
					<label class="radio"><radio value="pnd" color=#8B0000 style="transform:scale(0.8)"/>都可以</label>
				</view>
			</uni-group>
			<uni-group mode="card">
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							分类
						</view>
						<view class="uni-list-cell-db">
							<picker @change="bindPickerChange" :value="index" :range="item_types">
								<view class="uni-input">{{item_types[item_type_idx]}}</view>
							</picker>
						</view>
					</view>
				</view>
			</uni-group>
			<uni-group mode="card">
				<view>
					<label class="radio"><radio value="new" checked="true" color=#8B0000 style="transform:scale(0.8)"/>全新\t\t</label>
					<label class="radio"><radio value="almostnew" color=#8B0000 style="transform:scale(0.8)"/>几乎全新\n</label>
					<label class="radio"><radio value="used" color=#8B0000 style="transform:scale(0.8)"/>明显使用痕迹\t\t</label>
					<label class="radio"><radio value="impaired" color=#8B0000 style="transform:scale(0.8)"/>部分损毁</label>
				</view>
			</uni-group>
			<uni-group mode="card">
				<view class="uni-form-item uni-column">
					<input class="uni-input" @blur="bindTextAreaBlur" maxlength="10" placeholder="请填写价格 $"  placeholder-style="font-size:14px"/>
				</view>
			</uni-group>
			<uni-group mode="card">
				<view class="uni-form-item uni-column">
					<input class="uni-input" @blur="bindTextAreaBlur" maxlength="22" placeholder="请填写联系方式(微信号)"  placeholder-style="font-size:14px"/>
				</view>
			<view>
				<checkbox value="save_contact" checked="false" color=#8B0000 style="transform:scale(0.8);"/>保存联系方式，方便后续使用
			</view>
			</uni-group>
			<uni-group>
				<view class="uni-padding-wrap uni-common-mt">
					<button type="default" style="background-color: #8B0000; color: #ffffff;" plain="true">发布</button>
				</view>
			</uni-group>
		</uni-section>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item_type_idx: 0,
				item_types: ["电子产品","交通工具","家具家电","虚拟卡券","日常用品","美妆服饰","书籍教具","宠物用品","其他"],
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
		}
	}
</script>

<style>
	#second-post{
		position: absolute;
		width: 94vw;
		height: 100vh;
		left: 3vw;
	}
	
	.image_upload {
		padding: 14px;
		padding-top: 0;
	}

</style>
