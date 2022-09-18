<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				course:{}
			}
		},
		methods: {
			
		},
		onLoad(options) {
			this.course = JSON.parse(decodeURIComponent(options.course));
			uni.setNavigationBarTitle({
				title: this.course.departmentAbrev + " " + String(this.course.courseNum)
			})
			console.log(this.course);
		},
	}
</script>

<style>

</style>
