<template>
	<view>
		<view class="comment-head-area">

			<view>
				<view class="row-container rate-box">
					<view><text>难度：</text></view>
					<uni-rate readonly="true" :value="4.5" allowHalf="true" size="15"></uni-rate>
					<view><text>(4.5)</text></view>
				</view>
				<view class="row-container rate-box">
					<view><text>喜爱： </text></view>
					<uni-rate readonly="true" :value="4.5" allowHalf="true" size="15"></uni-rate>
					<view><text>(4.5)</text></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>

</script>

<style>
	.comment {
		background-color: white;
		width: 95vw;
		margin-left: 2.5vw;
		border-radius: 10px;
		margin: 5px 0 5px 2.5vw;
	}

	.column-container {
		display: flex;
		flex-direction: column;
	}

	.row-container {
		display: flex;
		flex-direction: row;
	}


</style>
