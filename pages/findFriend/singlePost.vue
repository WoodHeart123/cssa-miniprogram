<template>
	<div>
		
	</div>
</template>

<script>
	export default {
		props: {
			/* post object is of the form
			{
				id: Number, 
				OP: String, 
				OP_avatar: link to src, 
				postDate: Date,
				title: String, 
				eventTimeFrame: String OR null, 
				content: String,
				image: link to src,
				tag: String
			} */
			post: {
				type: Object,
				required: true
			}
		}
	}
</script>

<style scoped>
	.post {
		padding-bottom: 4rem;
	}
</style>