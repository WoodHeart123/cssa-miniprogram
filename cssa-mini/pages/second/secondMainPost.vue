<template>
	<view id="second-post">
		<uni-section title="选择图片">
			<view class="image_upload">
				<uni-file-picker limit="5"></uni-file-picker>
			</view>
		</uni-section>
		<view class="uni-form-item uni-column">
			<input class="uni-input" @blur="bindTextAreaBlur" maxlength="22" placeholder="请填写物品名称" placeholder-style="font-size:14px"/>
		</view>
		<view class="uni-textarea">
			<textarea @blur="bindTextAreaBlur" placeholder="请输入商品内容信息" maxlength="400" placeholder-style="font-size:14px"/>
		</view>
		<view>
			<label class="radio"><radio value="pickup" checked="true" style="transform:scale(0.8)"/>自取</label>
			<label class="radio"><radio value="delivery" style="transform:scale(0.8)"/>可送货</label>
			<label class="radio"><radio value="pnd" style="transform:scale(0.8)"/>都可以</label>
		</view>
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
		<view>
			<label class="radio"><radio value="pickup" checked="true" style="transform:scale(0.8)"/>全新</label>
			<label class="radio"><radio value="delivery" style="transform:scale(0.8)"/>几乎全新</label>
			<label class="radio"><radio value="pnd" style="transform:scale(0.8)"/>明显使用痕迹</label>
			<label class="radio"><radio value="pnd" style="transform:scale(0.8)"/>部分损毁</label>
		</view>
		<view class="uni-form-item uni-column">
			<input class="uni-input" @blur="bindTextAreaBlur" maxlength="10" placeholder="价格 $"  placeholder-style="font-size:14px"/>
		</view>
		<view class="uni-form-item uni-column">
			<input class="uni-input" @blur="bindTextAreaBlur" maxlength="22" placeholder="联系方式(微信号)"  placeholder-style="font-size:14px"/>
		</view>
		<view>
			<checkbox value="save_contact" checked="false" style="transform:scale(0.8)"/>保存联系方式，方便后续使用
		</view>
		<view class="uni-padding-wrap uni-common-mt">
			<button type="default" plain="true">发布</button>
		</view>
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
	
	.box {
		display: flex;
		display: -webkit-flex;
		justify-content: left;
		flex-direction: row;
		flex-wrap: wrap;
		margin-left: 1vw;
	}
	
</style>
