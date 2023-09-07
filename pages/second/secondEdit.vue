<template>
	<view id="second-post">
			<view class="uni-padding-wrap uni-common-mt confirm-button">
				<button type="default" style="background-color: #9B0000; color: #ffffff;" plain="true"
					@click="submit('productForm')">更新</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				product: {},
			}
		},
		onLoad(options) {
			this.product = JSON.parse(decodeURIComponent(options.product));
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