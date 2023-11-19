<template>
	<view class="find-classmate-background">
		<!-- <div class="find-classmate-navbar">
			<navigator url="./findFriend">
				<uni-icons type="left" size="25" color="white" />
			</navigator>
			<view style="color: white; font-size: 100%; text-align: center;">课友群主页</view>
			<uni-icons type="search" size="25" color="white" style="margin-right: 1rem;"/>
		</div> -->
		
		<div class="all-subject-cards">
			<navigator url="./findClassmateArt" class="subject-card">
				<image src="/pages/findFriend/images/art-logo.png" style="width: 6rem; height: 6rem;" mode="aspectFit" />
				<text>艺术类</text>
			</navigator>
			
			<navigator url="./findClassmateTech" class="subject-card">
				<image src="/pages/findFriend/images/tech-logo.png" style="width: 5rem; height: 5rem;" mode="aspectFit" />
				<text>理工类</text>
			</navigator>
			
			<navigator url="./findClassmateLitSoc" class="subject-card">
				<image src="/pages/findFriend/images/lit-logo.png" style="width: 6rem; height: 7rem;" mode="aspectFit" />
				<text>社科/文学类</text>
			</navigator>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
	}
</script>

<style scoped>
	.find-classmate-background {
		height: 100vh;
		width: 100%;
		background-image: url("https://i.imgur.com/5YBhd6S.png");
		background-repeat: no-repeat;
		background-position: bottom;
		background-size: cover;
	}
	.find-classmate-navbar {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		top: 0;
		padding-top: 1rem;
		padding-bottom: 1rem;
		margin-bottom: 1rem;
		width: 100%;
		background-color: indianred;
	}
	.all-subject-cards {
		height: 80vh;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-around;
		align-content: center;
		margin-left: 2rem;
		margin-right: 2rem;
	}
	.subject-card {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		width: 40%;
		height: 9rem;
		margin-top: 1.5rem;
		margin-bottom: 1.5rem;
		border-radius: 10px;
		background-color: rgba(255, 255, 255, 0.3);
		backdrop-filter: blur(8px);
		box-shadow: 0px 10px 15px 10px rgb(0 0 0 / 15%);
	}
</style>