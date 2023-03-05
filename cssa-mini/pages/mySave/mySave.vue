<template>
	<view>
		<view class="boxes" v-for="(collect,index) in collectList">
			<shoucang-box-vue v-on:delete="receive" :product="collect"></shoucang-box-vue>
		</view>
		<uni-load-more style="padding-bottom: 50px;" :status="status"></uni-load-more>
	</view>
</template>

<script>
	import shoucangBoxVue from "@/components/shoucang-box/shoucang-box.vue"
	export default {
		components:{
			shoucangBoxVue
		},
		data() {
			return {
				collectList:[],
				triggered:false,
				status:"loading",
				limit:20,
				offset:0
			}
		},
		onLoad() {
			wx.cloud.init();
			this.refresh();
		},
		
		methods: {

			refresh:function(){
				if (!this.triggered) {
					this.triggered = true;
					this.limit = 20;
					this.offset = 0;
					this.rentalList = [];
					this.status = "loading"
					this.getCollectList();
				}
			},
			
			onScrollLower:function(){
				this.status = "loading";
				this.status = "noMore";
				console.log("success")
				//this.getRentalList();
			}
		}
	}
</script>

<style>
	.row-container {
		display: flex;
		flex-direction: row;
	}
	
	.info-box{
		padding-top: 10px;
		padding-bottom: 10px;
		width: 50vw;
		text-align: center;
		margin-bottom: 15px;
		border: 1px solid #ACACAC;
		background-color: rgba(255, 255, 255, 0.9);
	}
	
	.rental-scroll{
		height: 100vh;
		width: 100%;
		overflow: hidden;
		background-color: white;
		overflow-y:scroll ;
	}
	
	.column-container {
		display: flex;
		flex-direction: column;
	}
</style>
