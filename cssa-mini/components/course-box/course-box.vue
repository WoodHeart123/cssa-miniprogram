<template>
	<view>
		<view class="column-container">
			<view class="row-container">
				<view><text>难度:</text></view>
				<uni-rate :touchable="false" :value="4.5" allowHalf="true"></uni-rate>
				<view><text>4.5</text></view>
			</view>
			<view class="row-container">
				<view><text>喜爱:</text></view>
				<uni-rate :touchable="false" :value="4.5" allowHalf="true"></uni-rate>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "course-box",
		data() {
			return {
				
			}
		},
		methods: {

		}
	}
</script>

<style>
	.column-container {
		display: flex;
		flex-direction: column;
	}

	.row-container {
		display: flex;
		flex-direction: row;
	}
</style>
