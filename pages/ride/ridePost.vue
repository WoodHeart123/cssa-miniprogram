<template>
    <view id="ride-post">
        <uni-forms ref="rideForm" :model="ride" :rules="rules">
            <!-- 图片上传 -->
            <view class="card uni-form-item uni-column">
                <uni-forms-item name="imageList">
                    <view class="image_upload">
                        <text class="required">* </text>图片上传：
                        <uni-file-picker
                            limit="5"
                            fileMediatype="image"
                            :auto-upload="false"
                            @select="onSelectImage"
                            @delete="onDeleteImage"
                        ></uni-file-picker>
                    </view>
                </uni-forms-item>
            </view>

            <!-- 请求类型 -->
            <view class="card">
                <uni-forms-item name="requestType">
                    <text class="required">* </text>请求类型：
                    <uni-data-checkbox
                        selectedColor="#9B0000"
                        :localdata="requestTypeOptions"
                        v-model="ride.requestType"
                        @change="toggleRequestType"
                    ></uni-data-checkbox>
                </uni-forms-item>
            </view>

            <!-- 顺风车类型 -->
            <view class="card">
                <uni-forms-item name="rideType">
                    <text class="required">* </text>顺风车类型：
                    <uni-data-checkbox
                        v-model="ride.rideType"
                        :localdata="rideTypeOptions"
                        selectedColor="#9B0000"
                    ></uni-data-checkbox>
                </uni-forms-item>
            </view>

            <!-- 出发地 -->
            <view class="card uni-form-item uni-column">
                <uni-forms-item name="origin">
                    <text class="required">* </text>出发地：
                    <uni-easyinput 
						trim="all"
						type="text"
					    v-model="ride.origin"
						maxlength="50"
                        placeholder="请填写出发地"
                        placeholder-style="font-size:14px;color:gray"
                    />
                </uni-forms-item>
            </view>

            <!-- 目的地 -->
            <view class="card uni-form-item uni-column">
                <uni-forms-item name="destination">
                    <text class="required">* </text>目的地：
                    <uni-easyinput
                        trim="all"
						type="text"
                        v-model="ride.destination"
                        maxlength="50"
                        placeholder="请填写目的地"
                        placeholder-style="font-size:14px;color:gray"
                    />
                </uni-forms-item>
            </view>

            <!-- 出发时间 -->
            <view class="card">
                <uni-forms-item name="departureTime">
                    <text class="required">* </text>出发时间：
                    <uni-datetime-picker
                        v-model="ride.departureTime"
                        type="datetime"
						returnType="string"
						    format="yyyy-MM-dd HH:mm:ss"
                        placeholder="请选择出发时间(默认CST)"
                    ></uni-datetime-picker>
                </uni-forms-item>
            </view>
			
			<!-- 预计到达时间（可选），只在单程显示 -->
			<view class="card" v-if="ride.rideType === '0'">
			    <uni-forms-item name="estimatedArrivalTime">
			        <text>预计到达时间：</text>
			        <uni-datetime-picker
			            v-model="ride.estimatedArrivalTime"
			            type="datetime"
						returnType="string"
						format="yyyy-MM-dd HH:mm:ss"
			            placeholder="请选择出发时间(默认CST)"
			        ></uni-datetime-picker>
			    </uni-forms-item>
			</view>

            <!-- 返回时间（可选） -->
            <view class="card" v-if="ride.rideType === '1'">
                <uni-forms-item name="returnTime">
                    <text class="required">* </text>返回时间：
                    <uni-datetime-picker
                        v-model="ride.returnTime"
                        type="datetime"
						returnType="string"
						format="yyyy-MM-dd HH:mm:ss"
                        placeholder="请选择返回时间(默认CST)"
                    ></uni-datetime-picker>
                </uni-forms-item>
            </view>

            <!-- 座位数和价格 -->
            <view class="card">
                <uni-forms-item name="availableSeats">
                    <view class="row-view">
                        <view style="flex: 1;">
                            <text class="required">* </text>
                            {{ ride.requestType === "1" ? "需要座位数：" : "可用座位数：" }}
                            <uni-easyinput
                                type="number"
								trim="all"
                                v-model="ride.availableSeats"
                                placeholder="请输入座位数"
                                placeholder-style="font-size:14px;color:gray"
                            />
                        </view>
                        <view style="flex: 1; margin-left: 10px;">
                            <text class="required">* </text>单人价格（$）：
                            <uni-easyinput
                                type="digit"
								trim="all"
                                v-model="ride.price"
                                placeholder="单人价格/程"
                                placeholder-style="font-size:14px;color:gray"
                            />
                        </view>
                    </view>
                </uni-forms-item>
            </view>

            <!-- 车辆品牌和类型 -->
            <view class="card" v-if="ride.requestType === '0'">
                <uni-forms-item name="vehicle">
                    <text>车辆品牌与类型（选填）：</text>
                    <view class="row-view">
                        <input
                            class="uni-input"
                            v-model="ride.make"
                            maxlength="30"
                            placeholder="品牌"
                            placeholder-style="font-size:14px;color:gray"
                        />
                        <input
                            class="uni-input"
                            v-model="ride.model"
                            maxlength="30"
                            placeholder="型号"
                            placeholder-style="font-size:14px;color:gray;margin-left:10px;"
                        />
                    </view>
                </uni-forms-item>
            </view>

            <!-- 联系方式 -->
            <view class="card">
                <uni-forms-item name="contactInfo">
                    <text class="required">* </text>联系方式：
                    <view class="uni-column row-view">
                        <span class="span_margin">微信号：</span>
                        <input
                            class="uni-input"
                            v-model="ride.contactInfo.weChatId"
                            maxlength="22"
                            placeholder="请填写微信号"
                            placeholder-style="font-size:14px;color:gray"
                        />
                    </view>
                    <view class="uni-column row-view">
                        <span class="span_margin">手机号：</span>
                        <input
                            class="uni-input"
                            v-model="ride.contactInfo.phoneNumber"
                            maxlength="22"
                            placeholder="请填写手机号"
                            placeholder-style="font-size:14px;color:gray"
                        />
                    </view>
                </uni-forms-item>
            </view>

            <!-- 顺风车描述 -->
            <view class="card uni-textarea textbox">
                <uni-forms-item name="description">
                    <text>顺风车描述：</text>
                    <uni-easyinput
                        type="textarea"
                        v-model="ride.description"
                        placeholder="请填写顺风车描述（选填）"
                        maxlength="300"
                        placeholder-style="font-size:14px;color:gray"
                    />
                </uni-forms-item>
            </view>

            <!-- 提交按钮 -->
            <view class="uni-padding-wrap uni-common-mt confirm-button">
                <button
                    type="default"
                    style="background-color: #9B0000; color: #ffffff;"
                    plain="true"
                    @click="submit('rideForm')"
                >
                    {{ edit ? "更新" : "发布" }}
                </button>
            </view>
        </uni-forms>

        <!-- 退出弹窗 -->
        <uni-popup ref="exitPopup" type="center" background-color="#fff">
            <view class="popup-header">
                <text>退出提示</text>
                <text class="popup-close" @click="closeExitPopup">×</text>
            </view>
            <view class="popup-body">
                <text>编辑内容将会丢失，确定要退出吗？</text>
            </view>
            <view class="popup-footer">
                <button class="popup-button" @click="confirmExit">确定退出</button>
                <button class="popup-button" @click="closeExitPopup">返回编辑</button>
            </view>
        </uni-popup>
    </view>
</template>

<script>
export default {
    data() {
        return {
            edit: false,
            ride: {
				imageList: [],
				origin: "",
				destination: "",
				departureTime: "",
				estimatedArrivalTime: "",
				returnTime: "",
				rideType: "",
				requestType: "",
				availableSeats: "",
				price: "",
				make: "",
				model: "",
				contactInfo: {
				    weChatId: "",
				    phoneNumber: "",
				},
				description: "",
			},
            requestTypeOptions: [
                { text: "出顺风车", value: "0" },
                { text: "求顺风车", value: "1" },
            ],
            rideTypeOptions: [
                { text: "单程", value: "0" },
                { text: "往返", value: "1" },
            ],
            rules: {
				requestType: {required: true, errorMessage: "请选择请求类型"},
				rideType: {required: true, errorMessage: "请选择顺风车类型"},
                origin: { required: true, errorMessage: "请填写出发地" },
                destination: { required: true, errorMessage: "请填写目的地" },
                departureTime: { required: true, errorMessage: "请选择出发时间" },
                availableSeats: { required: true, errorMessage: "请填写座位数" },
                price: { required: true, errorMessage: "请填写价格" },
            },
        };
    },
    onLoad(options) {
        if (options.ride) {
            this.edit = true;
            this.ride = JSON.parse(decodeURIComponent(options.ride));
        } else {
            this.edit = false;
            this.initializeRide();
        }
		uni.onBackPress(this.onBackPress); // 页面加载时注册返回事件
    },
	onUnload() {
	    uni.offBackPress(this.onBackPress); // 页面卸载时移除事件监听
	},
	onBackPress(event) {
        if (event.from === "navigateBack") {
            this.showExitPopup();
            return true; // Prevent default back navigation
        }
        return false;
    },
    methods: {
        initializeRide() {
            this.ride = {
                imageList: [],
                origin: "",
                destination: "",
				estimatedArrivalTime: "",
                departureTime: "",
                returnTime: "",
                rideType: "",
                requestType: "",
                availableSeats: "",
                price: "",
                make: "",
                model: "",
                contactInfo: {
                    weChatId: "",
                    phoneNumber: "",
                },
                description: "",
            };
        },
        submit(ref) {
            this.$refs[ref]
                .validate()
                .then(() => {
                    if (this.edit) {
                        this.updateRide();
                    } else {
                        this.publishRide();
                    }
                })
                .catch((err) => {
                    uni.showToast({ title: err[0].errorMessage, icon: "error" });
                });
        },
        async publishRide() {
            const response = await requestAPI({
                path: "/ride/publishRide",
                type: "POST",
                data: this.ride,
            });
            if (response.data.status === 100) {
                uni.showToast({ title: "发布成功", icon: "success" });
                uni.navigateBack();
            } else {
                uni.showToast({ title: "发布失败，请稍后重试", icon: "error" });
            }
        },
        async updateRide() {
            const response = await requestAPI({
                path: "/ride/updateRide",
                type: "POST",
                data: this.ride,
            });
            if (response.data.status === 100) {
                uni.showToast({ title: "更新成功", icon: "success" });
                uni.navigateBack();
            } else {
                uni.showToast({ title: "更新失败，请稍后重试", icon: "error" });
            }
        },
        showExitPopup() {
            if (this.$refs.exitPopup) {
                this.$refs.exitPopup.open(); // 打开弹窗
            }
        },
        closeExitPopup() {
            if (this.$refs.exitPopup) {
                this.$refs.exitPopup.close(); // 关闭弹窗
            }
        },
        confirmExit() {
            this.closeExitPopup();
            uni.navigateBack();
        },
    },
};
</script>

<style>
#ride-post {
    padding: 0 3vw;
    background-color: white;
    overflow-y: scroll;
}

.image_upload {
    padding: 14px;
}

.card {
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.08);
    border-radius: 5px;
    padding: 12px;
    margin-bottom: 5px;
}

.row-view {
    display: flex;
    align-items: center;
}

.span_margin {
    margin-right: 10px;
    font-size: 16px;
}

.confirm-button {
    margin-top: 20px;
    margin-bottom: 20px;
}

.required {
    color: red;
}

.popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eee;
}
.popup-body {
    padding: 15px;
}
.popup-footer {
    display: flex;
    justify-content: space-between;
    padding: 15px;
}
.popup-close {
    cursor: pointer;
    font-size: 18px;
}
.popup-button {
    flex: 1;
    padding: 10px;
    margin: 0 5px;
    text-align: center;
    background-color: #9b0000;
    color: #fff;
    border-radius: 5px;
}
</style>