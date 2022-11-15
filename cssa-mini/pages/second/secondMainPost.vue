<template>
	<view id="second-post">
		<uni-section>
			<view class="image_upload">
				<uni-file-picker limit="5" fileMediatype="image" :auto-upload="false" @select="onSelectImage" @delete="onDeleteImage"></uni-file-picker>
			</view>
			<uni-group mode="card">
				<view class="uni-form-item uni-column">
					<input class="uni-input" @blur="bindTextAreaBlur" maxlength="22" placeholder="请填写商品名称" placeholder-style="font-size:14px"/>
				</view>
			</uni-group>
			<uni-group mode="card">
				<view class="uni-textarea textbox">
					<textarea @blur="bindTextAreaBlur" placeholder="请输入商品描述信息" maxlength="400" placeholder-style="font-size:14px"/>
				</view>
			</uni-group>
			<uni-group mode="card">
				<view >
					<radio-group @change="radioChange">
						<label class="radio radio_group1"><radio value="pickup" checked="true" color="#1E90FF" style="transform:scale(0.8)"/>自取</label>
						<label class="radio radio_group1"><radio value="delivery" color="#1E90FF" style="transform:scale(0.8)"/>可送货</label>
						<label class="radio radio_group1"><radio value="pnd" color="#1E90FF" style="transform:scale(0.8)"/>都可以</label>
					</radio-group>
				</view>
			</uni-group>
			<uni-group mode="card">
				<view class="uni-list">
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
			</uni-group>
			<uni-group mode="card">
				<view class="label_group">
					<radio-group @change="radioChange">
						<label class="radio radio_group2"><radio value="new" checked="true" color="#1E90FF" style="transform:scale(0.8)"/>全新</label>
						<label class="radio radio_group2"><radio value="almostnew" color="#1E90FF" style="transform:scale(0.8)"/>几乎全新</label>
						<label class="radio radio_group2"><radio value="used" color="#1E90FF" style="transform:scale(0.8)"/>明显使用痕迹</label>
						<label class="radio radio_group2"><radio value="impaired" color="#1E90FF" style="transform:scale(0.8)"/>部分损毁</label>
					</radio-group>
				</view>
			</uni-group>
			<uni-group mode="card">
				<view class="uni-form-item uni-column row_view">
					<span class="span_margin">$</span>
					<input class="uni-input" type="number" @blur="bindTextAreaBlur" maxlength="10" placeholder="请填写价格"  placeholder-style="font-size:14px"/>
				</view>
			</uni-group>
			<uni-group mode="card">
				<view class="uni-form-item uni-column row_view">
					<span class="span_margin">微信号</span>
					<input class="uni-input" @blur="bindTextAreaBlur" maxlength="22" placeholder="请填写联系方式"  placeholder-style="font-size:14px"/>
				</view>
			<view class="checkbox check_message">
				<checkbox value="save_contact" checked="false" color="#1E90FF" style="transform:scale(0.8);"/>保存联系方式，方便后续使用
			</view>
			</uni-group>
			<uni-group>
				<view class="uni-padding-wrap uni-common-mt">
					<button type="default" style="background-color: #1E90FF; color: #ffffff;" plain="true">发布</button>
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
				imageList:[]
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
			onSelectImage:function(e){
				for(let i = 0;i < e.tempFilePaths.length && i < e.tempFiles.length;i++){
					this.imageList.push({
						filename: e.tempFiles[i].name,
						filepath:e.tempFilePaths[i]});
				}
				console.log(this.imageList);
			},
			onDeleteImage:function(e){
				console.log(e);
				console.log(this.imageList);
			}
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
	
	.label_group{
		display: flex;
		flex-wrap: wrap;
	}
	
	.checkbox{
		margin-top: 10px;
		font-size: 16px;
	}
	
	.radio_group1{
		margin-right: 15px;
		font-size: 16px;
	}
	
	.radio_group2{
		margin-right: 5px;
		font-size: 16px;
	}
	
	.row_view{
		display: flex;
		flex-direction: row;
	}
	
	.span_margin{
		margin-right: 10px;
		font-size: 16px;
	}
	
	.divider{
		 background: #000000;
		 width: 100%;
		 height: 5rpx;
		 margin-top: 10px;
		 margin-bottom: 10px;
	}
	
	.type_font{
		font-size: 16px;
	}
	
	.check_message{
		font-size: 14px;
		color: #8B0000;
	}
	
	.text-box{
		width: 100%;
		height: 100%;
	}
	
	.type_view{
		margin-left: 20px;
		color: #575757;
	}

</style>
