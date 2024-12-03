<template>
    <view id="ride-post">
        <uni-forms ref="rideForm" :model="ride" :rules="rules">
            <!-- 图片上传 -->
            <view class="card uni-form-item uni-column">
                <uni-forms-item name="imageList">
                    <view class="image_upload">
                        <text>图片上传：</text>
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
						v-model="ride.requestType"
                        :localdata="requestTypeOptions"
                        selectedColor="#9B0000"
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
						@change="onRideTypeChange"
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

            <!-- 返回时间（动态必填） -->
            <view class="card" v-if="ride.rideType === 1">
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
                            {{ ride.requestType === 1 ? "需要座位数：" : "可用座位数：" }}
                            <uni-easyinput
                                type="number"
                                trim="all"
                                v-model="seatsBinding"
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
            <view class="card" v-if="ride.requestType === 0">
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
                        maxlength="500"
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
        <!-- <uni-popup ref="exitPopup" type="center" background-color="#fff">
            <view class="popup-header">
                <text>退出提示</text>
                <text class="popup-close" @click="closeExitPopup">×</text>
            </view>
            <view class="popup-body">
                <text>编辑内容将会丢失，确定要退出吗？</text>
            </view>
            <view class="popup-footer">
                <button class="popup-button confirm" @click="confirmExit">确定退出</button>
                <button class="popup-button cancel" @click="closeExitPopup">返回编辑</button>
            </view>
        </uni-popup> -->
		
		 <!-- 必填字段未填写提示弹窗 -->
        <uni-popup ref="errorPopup" type="center" background-color="#fff">
            <view class="popup-content">
                <text>{{ errorMessage }}</text>
            </view>
        </uni-popup>
    </view>
</template>

<script>
	import moment from "moment/min/moment-with-locales";
	import "moment/locale/zh-cn";
	import requestAPI from "@/api/request.js";
	
	export default {
		data() {
			return {
				edit: false,
				ride: {
					imageList: [],
					origin: "",
					destination: "",
					departureTime: null,
					estimatedArrivalTime: null,
					returnTime: null,
					rideType: "",
					requestType: "",
					availableSeats: 0,
					requestedSeats: 0,
					price: "",
					make: "",
					model: "",
					contactInfo: {
						weChatId: "",
						phoneNumber: "",
					},
					description: "",
				},
				expiredRide: null,
				errorMessage: "", // 错误提示信息
				requestTypeOptions: [
					{ text: "出顺风车", value: 0 },
					{ text: "求顺风车", value: 1 },
				],
				rideTypeOptions: [
					{ text: "单程", value: 0 },
					{ text: "往返", value: 1 },
				],
				rules: {
					requestType: {required: true, errorMessage: "- 请求类型"},
					rideType: {required: true, errorMessage: "- 顺风车类型"},
					origin: { required: true, errorMessage: "- 出发地" },
					destination: { required: true, errorMessage: "- 目的地" },
					departureTime: { required: true, errorMessage: "- 出发时间" },
					returnTime: {
						required: false,
						errorMessage: "- 返回时间",
						trigger: "blur",
					},
					availableSeats: { required: true, errorMessage: "- 座位数" },
					price: { required: true, errorMessage: "- 价格" },
				}
			};
		},
		onLoad(options) {
			if (options.ride) {
				this.edit = true;
				this.ride = JSON.parse(decodeURIComponent(options.ride));
				this.expiredRide = JSON.parse(decodeURIComponent(options.ride)); // 复制一份已过期的顺风车信息
			} else {
				this.edit = false;
				this.initializeRide();
			}
		},
		watch: {
		    "ride.rideType"(newValue) {
		        // Dynamically update the validation rule for returnTime
		        this.rules.returnTime.required = String(newValue) === "1";
		
		        // Validate or clear validation for returnTime based on the new rule
		        if (newValue === "1") {
		            this.$refs.rideForm.validateField("returnTime");
		        } else {
		            this.$refs.rideForm.clearValidate("returnTime");
		        }
		    }
		},
		computed: {
		    seatsBinding: {
		        get() {
		            return this.ride.requestType === 1 ? this.ride.requestedSeats : this.ride.availableSeats;
		        },
		        set(value) {
		            if (this.ride.requestType === 1) {
		                this.ride.requestedSeats = value;
		            } else {
		                this.ride.availableSeats = value;
		            }
		        }
		    },
			
		},
		methods: {
			initializeRide() {
				this.ride = {
					imageList: [],
					origin: "",
					destination: "",
					estimatedArrivalTime: null,
					departureTime: null,
					returnTime: null,
					rideType: "",
					requestType: "",
					availableSeats: 0,
					requestedSeats: 0,
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
			checkIfRideUpdated() {
			    const fieldsToCheck = [
			        "origin",
			        "destination",
			        "estimatedArrivalTime",
			        "departureTime",
			        "returnTime",
			        "rideType",
			        "requestType",
			        "availableSeats",
			        "price",
			        "make",
			        "model",
			        "description"
			    ];
			
			    if (this.expiredRide) {            
			        // 比较普通字段
			        for (const field of fieldsToCheck) {
			            if (this.ride[field] !== "" && this.ride[field] !== this.expiredRide[field]) {
			                return true; // 如果任意字段被更新，返回 true
			            }
			        }
			
			        // 比较 imageList
			        if (this.ride.imageList.length !== 0) {
			            if (
			                this.expiredRide.imageList.length === 0 ||
			                this.ride.imageList.length !== this.expiredRide.imageList.length
			            ) {
			                return true; // 图片数量不一致
			            }
			            for (let i = 0; i < this.ride.imageList.length; i++) {
			                if (this.ride.imageList[i] !== this.expiredRide.imageList[i]) {
			                    return true; // 图片内容不一致
			                }
			            }
			        }
			
			        // 比较 contactInfo
			        const contactFieldsToCheck = ["weChatId", "phoneNumber"];
			        for (const field of contactFieldsToCheck) {
			            if (
			                this.ride.contactInfo[field] !== "" &&
			                this.ride.contactInfo[field] !== this.expiredRide.contactInfo[field]
			            ) {
			                return true; // 联系方式不一致
			            }
			        }
			    } else {
			        // 如果没有 expiredRide，检查是否有非默认值
			        for (const field of fieldsToCheck) {
			            if (this.ride[field] !== "") {
			                return true; // 任意字段非默认值
			            }
			        }
			
			        // 检查 imageList 和 contactInfo 是否有非默认值
			        if (this.ride.imageList.length !== 0) {
			            return true;
			        }
			        const contactFieldsToCheck = ["weChatId", "phoneNumber"];
			        for (const field of contactFieldsToCheck) {
			            if (this.ride.contactInfo[field] !== "") {
			                return true; // 联系方式有填写
			            }
			        }
			    }
			
			    return false;
			},
			async submit(ref) {
				// 检查未填写的必填字段
				const missingFields = [];				
				for (const key in this.rules) {
				    if (
				        this.rules[key].required &&
				        (!this.ride[key] || (typeof this.ride[key] === "string" && this.ride[key].trim() === ""))
				    ) {
				        missingFields.push(this.rules[key].errorMessage);
				    }
				}

				// 如果有未填写的字段，弹出提示
				if (missingFields.length > 0) {
					this.errorMessage = `以下字段未填写\n(弹窗5秒后自动关闭)\n--------------------\n${missingFields.join("\n")}`;
					this.showErrorPopup();
					return;
				}

				// 验证表单
				try {
					await this.$refs[ref].validate();
					if (this.edit) {
						this.updateRide();
					} else {
						this.publishRide();
					}
				} catch (err) {
					this.errorMessage = err[0]?.errorMessage || "请填写必填字段";
					this.showErrorPopup();
				}
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
			showErrorPopup() {
			    if (this.$refs.errorPopup) {
			        this.$refs.errorPopup.open();
			        let timeoutId=setTimeout(() => {
						clearTimeout(timeoutId);
			            this.$refs.errorPopup.close();
			        }, 5000);
			    }
		    },
			// showExitPopup() {
			// 	console.log("showExitPopup() is called.");
			// 	if (this.$refs.exitPopup) {
			// 		console.log("exitPopup ref exists.");
			// 		this.$refs.exitPopup.open(); // Open the exit popup
			// 		console.log("exitPopup opened.");
			// 	} else {
			// 		console.error("exitPopup ref is undefined.");
			// 	}
			// },
			// closeExitPopup() {
			// 	if (this.$refs.exitPopup) {
			// 		this.$refs.exitPopup.close(); // 关闭弹窗
			// 	}
			// },
			// confirmExit() {
			// 	this.closeExitPopup();
			// 	uni.navigateBack();
			// },
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
	    text-align: center;
	}
	
	.popup-footer {
	    display: flex;
	    justify-content: space-between;
	    padding: 15px;
	}
	
	.popup-close {
	    cursor: pointer;
	    font-size: 18px;
	    color: #333;
	}
	
	.popup-button {
	    flex: 1;
	    padding: 10px;
	    margin: 0 5px;
	    text-align: center;
	    border-radius: 5px;
	    cursor: pointer;
	}
	
	.popup-button.confirm {
	    background-color: #9b0000;
	    color: #fff;
	}
	
	.popup-button.cancel {
	    background-color: #fff;
	    color: #333;
	    border: 1px solid #ddd;
	}

	.popup-content {
	    width: 80%; /* 设置宽度 */
	    max-width: 300px; /* 最大宽度 */
	    padding: 20px; /* 内边距 */
	    text-align: center; /* 文本居中 */
	    font-size: 15px; /* 字体大小 */
	    color: #333; /* 文本颜色 */
	    background-color: #fff; /* 背景颜色 */
	    border-radius: 10px; /* 圆角 */
	    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* 阴影 */
	    position: fixed; /* 固定定位 */
	    top: 50%; /* 距离顶部50% */
	    left: 50%; /* 距离左侧50% */
	    transform: translate(-50%, -50%); /* 通过平移居中 */
	    z-index: 1000; /* 确保显示在顶部 */
	    border: 1px solid #ddd; /* 边框 */
	}

</style>