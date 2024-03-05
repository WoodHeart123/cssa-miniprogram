<template>
	<canvas style="width:100%;height:100%;" canvas-id="circleBar">
	  <cover-view class="circle-bar-wrap" style="height:100%;">
	    <cover-view class="font">
	      {{title}}
	    </cover-view>
	    <cover-view class="val" style="color: {{valueColor}}; margin-top:{{isMarginTop?'20':'0'}}rpx">
	      {{value}} {{suffix}}
	    </cover-view>
	  </cover-view>
	</canvas>
</template>

<script>
	export default {
		name:"circleProgress",
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>