<template>
  <view id="findFriendPost">
    <uni-forms>
		<div class="input-container">
		    <div class="input-box">
		        <input type="text" id="title" v-model="title" placeholder="输入标题" class="input-title" />
		    </div>
		</div>
		<div class="input-container">
		    <div class="input-box">
		        <textarea id="information" v-model="information" placeholder="输入内容" class="input-text"></textarea>
		    </div>
		</div>
		<view class="example-body">
			<uni-datetime-picker v-model="range" type="daterange" @maskClick="maskClick" />
		</view>
		<div class="input-container">
		    <div class="button">
		        <button @click="submitPost" class="submit-button">Submit</button>
		    </div>
		</div>
    </uni-forms>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      information: '',
    };
  },
  methods: {
    handleImageUpload(event) {
      
    },
  },
};
</script>

<style>
.input-box {
  background-color: #fff;
  border: none;
  border-radius: 0;
  padding: 5px;
  width: 100%;
  box-sizing: border-box;
}

.input-title {
  border-bottom: 1px solid #dddddd;
}

.submit-button {
  background-color: #667aff;
  color: #fff;
  border: none;
  margin-top: 15px;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
