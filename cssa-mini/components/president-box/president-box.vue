<template>
	<view class="scroll-view-item-X" @click="open()">
		<image class="scroll-view-item-M" :src="leader.image" />
		<view class="scroll-view-item-H">
			<view class="intro-box">
				<view class="name">
					{{leader.name}}
				</view>
				<view class="position">
					{{leader.postion}}
				</view>
				<view class="intro">
					{{leader.intro}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ["leader","index"],
		name: "president-box",
		data() {
			return {
				
			};
		},
		methods:{
			open:function(){
				uni.$emit("openPopUp",this.index);
			}
		}
	}
</script>

<style>
	.name {
		font-size: 28rpx;
		font-weight: 700;
	}

	.position {
		height: 15px;
		line-height: 15px;
		font-size: 12px;
	}

	.intro {
		flex: 1;
		max-height: 70px;
		overflow: hidden;
		white-space: pre-wrap;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		margin-top: 10px;
		font-size: 10px;
		font-weight: 200;
		line-height: 16px;
	}

	.scroll-view-item-M {
		position: absolute;
		height: 90rpx;
		width: 90rpx;
		border-radius: 50%;
		background-size: 100% 100%;
	}

	.scroll-view-item-X {
		display: inline-block;
		border-radius: 10px;
		margin: 10px;
		height: 180px;
		width: 180px;
	}

	.scroll-view-item-H {
		margin-left: 20px;
		margin-top: 20px;
		height: 150px;
		width: 150px;
		border-radius: 5px;
		background-color: white;
		box-shadow: 0 0px 6px 1px rgba(165, 165, 165, 0.2)
	}
</style>
