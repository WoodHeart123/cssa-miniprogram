<template>
	<view class="lds-dual-ring"></view>
</template>

<script>
	export default{
		name:"loading"
	}
</script>

<style>
	.lds-dual-ring {
	  position:absolute;
	  left:calc(50% - 50px);
	  top:calc(50% - 50px);
	  display: flex;
	  width: 100px;
	  height: 100px;
	  justify-content: center;
	  align-items: center;
	  
	}
	.lds-dual-ring:after {
	  content: " ";
	  display: block;
	  width: 64px;
	  height: 64px;
	  border-radius: 50%;
	  border: 6px solid #999;
	  border-color: #999 transparent #999 transparent;
	  animation: lds-dual-ring 1.2s linear infinite;
	}
	@keyframes lds-dual-ring {
	  0% {
	    transform: rotate(0deg);
	  }
	  100% {
	    transform: rotate(360deg);
	  }
	}

</style>