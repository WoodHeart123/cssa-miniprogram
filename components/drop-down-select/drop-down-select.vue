<template>
	<view class="drop-down-select" @click="showBottom">
		<view class="top-click">
			<text class="paragraph-1">测试</text>
			<uni-icons type="arrowdown" size="15"></uni-icons>
		</view>

	</view>
</template>

<script>
	export default {
		name: "drop-down-select",
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.drop-down-select{
		width: fit-content;
		
		.top-click{
			display: flex;
		}
		
	}

</style>