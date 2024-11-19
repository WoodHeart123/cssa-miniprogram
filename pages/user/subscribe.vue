<template>
    <view id="subscribe" class="container">
        <view class="title">订阅邮件</view>

        <uni-forms ref="subscribeForm" :model="formData" :rules="rules" class="form-container">
            <view class="card">
                <uni-forms-item name="email">
                    <view class="input-group">
                        <text class="label">邮箱：</text>
                        <input class="uni-input" v-model="formData.email" placeholder="请输入您的电子邮箱" />
                    </view>
                </uni-forms-item>
            </view>

            <view class="card checkbox-container">
                <checkbox-group @change="onCheckBoxChange">
                    <label class="checkbox-label">
                        <checkbox value="agreed" :checked="formData.agreed" color="#9b0000" />
                        <text>我同意向CSSAatUWMadison分享该邮箱并订阅邮件服务。CSSA学联保证该邮箱不会被用于第三方用途，仅用于CSSA活动通知。</text>
                    </label>
                </checkbox-group>
            </view>

            <view class="button-container">
                <button class="confirm-button" :disabled="!canSubmit" @click="submit('subscribeForm')">提交</button>
            </view>
        </uni-forms>

        <view v-if="showPopup" class="popup">
            <text>{{ popupMessage }}</text>
            <text>{{ countdown }}秒后自动跳转</text>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                email: '',
                agreed: false
            },
            showPopup: false,
            popupMessage: '',
            countdown: 3,
            userInfo: {},
            rules: {
                email: {
                    rules: [{
                        required: true,
                        errorMessage: '请输入您的电子邮箱',
                    }, {
                        format: 'email',
                        errorMessage: '电子邮箱格式不正确'
                    }]
                },
                agreement: {
                    rules: [{
                        required: true,
                        errorMessage: '您必须同意此条款',
                    }]
                }
            }
        }
    },
    onLoad() {
        this.userInfo = uni.getStorageSync('userInfo-2');
        if (this.userInfo && this.userInfo.email && this.userInfo.email !== "") {
            this.formData.email = this.userInfo.email;
        }
    },
    methods: {
        onCheckBoxChange(event) {
            this.formData.agreed = event.detail.value.includes("agreed");
        },
        async submit(ref) {
            this.$refs[ref].validate().then(async () => {
                if (this.canSubmit) {
                    uni.showLoading({
                        title: '正在订阅...',
                        mask: true
                    });
                    try {
                        const res = await wx.cloud.callContainer({
                            config: {
                                env: 'prod-9gip97mx4bfa32a3',
                            },
                            path: '/user/subscribe',
                            method: 'POST',
                            header: {
                                'X-WX-SERVICE': 'springboot-cssa-test', // change this to real server.
                            },
                            data: {
                                email: this.formData.email
                            },
                        });
						console.log(res.data);
                        if (res.data.status === true) {
                            this.showPopup = true;
                            this.popupMessage = '您已成功订阅邮件服务';
                            this.updateLocalStorage();
                            this.startCountdown();
                        } else {
                            uni.showToast({
                                title: '订阅失败，请重试',
                                icon: 'none',
                                duration: 2000
                            });
                        }
                    } catch (error) {
                        uni.showToast({
                            title: '订阅失败，请重试',
                            icon: 'none',
                            duration: 2000
                        });
                    } finally {
                        uni.hideLoading();
                    }
                }
            }).catch(err => {
                uni.showToast({
                    title: err[0].errorMessage,
                    icon: "error"
                });
            });
        },
        updateLocalStorage() {
            this.userInfo.email = this.formData.email;
            this.userInfo.subscribed = true;
            uni.setStorage({
                key: 'userInfo-2',
                data: this.userInfo,
                success: function () {
                    console.log('userInfo-2 更新成功');
                },
                fail: function () {
                    console.log('userInfo-2 更新失败');
                }
            });
        },
        startCountdown() {
            const timer = setInterval(() => {
                this.countdown--;
                if (this.countdown === 0) {
                    clearInterval(timer);
                    uni.navigateBack({
                        delta: 1
                    });
                }
            }, 1000);
        }
    },
    computed: {
        canSubmit() {
            return this.formData.email && this.formData.agreed;
        }
    }
}
</script>

<style>
@import '@/static/iconfont/iconfont.css';
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100vw;
    height: 100vh;
    padding: 40px 20px;
    box-sizing: border-box;
    overflow-y: auto;
}

.title {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
}

.card {
    width: 100%;
    max-width: 360px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    border-radius: 8px;
    margin-bottom: 10px;
}

.input-group {
    display: flex;
    align-items: center;
    width: 100%;
}

.label {
    width: 60px;
}

.uni-input {
    flex-grow: 1;
    border: 1px solid #ccc;
    padding: 8px 10px;
    border-radius: 4px;
    margin-left: 10px;
}

.checkbox-container {
    width: 100%;
    max-width: 360px;
}

.checkbox-label {
    display: flex;
    align-items: center;
    font-size: 14px;
    margin-left: 10px;
}

.button-container {
    width: 100%;
    display: flex;
    justify-content: center;
}

.confirm-button {
    max-width: 200px;
    height: 36px;
    border-radius: 18px;
    background-color: #1684FC;
    color: white;
    font-size: 14px;
    cursor: pointer;
}

.popup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
}
</style>
