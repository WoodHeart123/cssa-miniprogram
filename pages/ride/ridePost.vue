<template>
    <view id="ride-post">
        <uni-forms ref="rideForm" :model="this.ride" :rules="rules">
            <!-- 图片上传 -->
            <view class="card uni-form-item uni-column">
                <uni-forms-item name="images">
                    <view class="image_upload">
                        <text>图片上传：</text>
                        <uni-file-picker
                            limit="5"
                            fileMediatype="image"
                            :auto-upload="false"
                            :model-value="this.imagesToDisplay"
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
                        v-model="this.ride.requestType"
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
                        v-model="this.ride.rideType"
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
                        v-model="this.ride.origin"
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
                        v-model="this.ride.destination"
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
                        v-model="this.ride.departureTime"
                        type="datetime"
                        returnType="string"
                        format="yyyy-MM-dd HH:mm:ss"
                        placeholder="请选择出发时间(默认CST)"
                    ></uni-datetime-picker>
                </uni-forms-item>
            </view>

            <!-- 预计到达时间 -->
            <view class="card" v-if="ride.rideType === 0">
                <uni-forms-item name="estimatedArrivalTime">
                    <text>预计到达时间：</text>
                    <uni-datetime-picker
                        v-model="this.ride.estimatedArrivalTime"
                        type="datetime"
                        returnType="string"
                        format="yyyy-MM-dd HH:mm:ss"
                        placeholder="请选择预计到达时间(默认CST)"
                    ></uni-datetime-picker>
                </uni-forms-item>
            </view>

            <!-- 返回时间（动态,只有顺风车类型为往返时必填） -->
            <view class="card" v-if="ride.rideType === 1">
                <uni-forms-item name="returnTime">
                    <text class="required">* </text>返回时间：
                    <uni-datetime-picker
                        v-model="this.ride.returnTime"
                        type="datetime"
                        returnType="string"
                        format="yyyy-MM-dd HH:mm:ss"
                        placeholder="请选择返回时间(默认CST)"
                    ></uni-datetime-picker>
                </uni-forms-item>
            </view>

            <!-- 座位数和价格 -->
            <view class="card">
                <uni-forms-item name="seats">
                    <view class="row-view">
                        <view style="flex: 1">
                            <text class="required">* </text>
                            <!--根据顺风车请求类型自动绑定显示文字和数值 -->
                            {{ this.ride.requestType === 1 ? '需要座位数：' : '可出座位数：' }}
                            <uni-easyinput
                                type="number"
                                trim="all"
                                v-model="ride.seats"
                                placeholder="请输入座位数"
                                placeholder-style="font-size:14px;color:gray"
                            />
                        </view>
                        <view style="flex: 1; margin-left: 10px">
                            <text class="required">* </text>单人价格（$）：
                            <uni-easyinput
                                type="digit"
                                trim="all"
                                v-model="this.ride.price"
                                placeholder="单人价格/程"
                                placeholder-style="font-size:14px;color:gray"
                            />
                        </view>
                    </view>
                </uni-forms-item>
            </view>

            <!-- 车辆品牌和类型 -->
            <view class="card" v-if="this.ride.requestType === 0">
                <uni-forms-item name="vehicle">
                    <text>车辆品牌与类型（选填）：</text>
                    <view class="row-view">
                        <input
                            class="uni-input"
                            v-model="this.ride.make"
                            maxlength="30"
                            placeholder="品牌"
                            placeholder-style="font-size:14px;color:gray"
                        />
                        <input
                            class="uni-input"
                            v-model="this.ride.model"
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
                            v-model="this.ride.contactInfo.weChatId"
                            maxlength="22"
                            placeholder="请填写微信号"
                            placeholder-style="font-size:14px;color:gray"
                        />
                    </view>
                    <view class="uni-column row-view">
                        <span class="span_margin">手机号：</span>
                        <input
                            class="uni-input"
                            v-model="this.ride.contactInfo.phoneNumber"
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
                        v-model="this.ride.description"
                        placeholder="请填写顺风车描述（选填）"
                        maxlength="500"
                        placeholder-style="font-size:14px;color:gray"
                    />
                </uni-forms-item>
            </view>

            <!-- 提交按钮 -->
            <view class="uni-padding-wrap uni-common-mt confirm-button">
                <!-- 编辑模式: publishedTime 不为 null -->
                <template v-if="this.edit && this.ride.publishedTime !== null">
                    <button
                        type="default"
                        style="background-color: #9b0000; color: #ffffff"
                        plain="true"
                        @click="submitUpdate(true)"
                    >
                        更新
                    </button>
                </template>

                <!-- 编辑模式: publishedTime 为 null -->
                <template v-else-if="this.edit && this.ride.publishedTime === null">
                    <button
                        type="default"
                        style="background-color: #9b0000; color: #ffffff"
                        plain="true"
                        @click="submitUpdate(false)"
                    >
                        仅更新
                    </button>
                    <button
                        type="default"
                        style="background-color: #9b0000; color: #ffffff"
                        plain="true"
                        @click="submitUpdate(true)"
                    >
                        更新并发布
                    </button>
                </template>

                <!-- 非编辑模式: 新建顺风车 -->
                <template v-else>
                    <button type="default" style="background-color: #9b0000; color: #ffffff" plain="true" @click="submit">
                        发布
                    </button>
                </template>
            </view>
        </uni-forms>

        <!-- 必填字段未填写提示弹窗 -->
        <uni-popup ref="errorPopup" type="center" background-color="#fff">
            <view class="popup-content">
                <text>{{ errorMessage }}</text>
            </view>
        </uni-popup>
    </view>
</template>

<script>
import uploadOSS from '@/api/upload.js';
import requestAPI from '@/api/request.js';

export default {
    data() {
        return {
            edit: false,
            ride: {
                images: [],
                origin: '',
                destination: '',
                departureTime: null,
                returnTime: null,
                rideType: '', // 默认值为空字符串，确保校验逻辑正常
                requestType: '', // 默认值为空字符串，确保校验逻辑正常
                seats: '',
                price: '',
                make: '',
                model: '',
                contactInfo: {
                    weChatId: '',
                    phoneNumber: '',
                },
                description: '',
            },
            imagesToDisplay: [], // 仅用于前端展示图片，为一个包含图片url为对象的数组。E.g ["url1","url2"]
            errorMessage: '', // 错误提示信息
            requestTypeOptions: [
                { text: '出顺风车', value: 0 },
                { text: '求顺风车', value: 1 },
            ],
            rideTypeOptions: [
                { text: '单程', value: 0 },
                { text: '往返', value: 1 },
            ],
            rules: {
                requestType: '请选择请求类型',
                rideType: '请选择顺风车类型',
                origin: '请填写出发地',
                destination: '请填写目的地',
                departureTime: '请选择出发时间',
                seats: '请填写座位数',
                price: '请填写单人价格',
                contactInfo: '请至少填写一种联系方式',
            },
        };
    },
    onLoad(options) {
        if (options.ride) {
            try {
                const rideData = JSON.parse(decodeURIComponent(options.ride));
                this.ride = rideData;
                this.imagesToDisplay = this.ride.images.map((url) => ({ url }));
                this.edit = 1;
            } catch (e) {
                console.error('数据解析失败', e);
            }
        }
    },
    computed: {},
    methods: {
        // 检测必填项目
        validateFields() {
            const missingFields = [];

            for (const [key, errorMessage] of Object.entries(this.rules)) {
                if (key === 'contactInfo') {
                    const { weChatId, phoneNumber } = this.ride.contactInfo;
                    if (!weChatId && !phoneNumber) {
                        missingFields.push(errorMessage);
                    }
                } else if (!this.ride[key] && this.ride[key] !== 0) {
                    // 检查值是否为空或未选择（允许数字0作为有效值）
                    missingFields.push(errorMessage);
                }
            }

            if (missingFields.length > 0) {
                this.errorMessage = `以下字段未填写：\n${missingFields.join('\n')}`;
                this.showErrorPopup();
                return false;
            }

            return true;
        },

        // （发布）更新顺风车
        async submitUpdate(ifToPublish) {
            if (!this.validateFields()) return;

            try {
                uni.showLoading({
                    title: ifToPublish ? '正在更新并发布' : '正在更新',
                });

                // 检查未上传的图片
                if (this.ride.images && this.ride.images.length > 0) {
                    // 只上传没上传的图片。如果图片已经上传，那该元素应该是一个字符串；反之则是一个对象
                    const pendingImages = this.ride.images.filter((image) => typeof image !== 'string');

                    if (pendingImages.length > 0) {
                        // 仅上传未上传的图片
                        await this.uploadImages(pendingImages);
                    }
                }

                // 转换 images 为纯 URL
                this.prepareImages();

                // 调用后端接口进行更新
                const response = await requestAPI({
                    path: `/ride/updateRide?ifToPublish=${ifToPublish}`,
                    type: 'POST',
                    data: this.ride,
                });

                if (response.data.status === 100) {
                    uni.showToast({
                        title: ifToPublish ? '更新并发布成功' : '更新成功',
                        icon: 'success',
                    });
                    uni.navigateBack();
                } else {
                    throw new Error('请求失败');
                }
            } catch (error) {
                console.error('提交失败:', error);
                uni.showToast({ title: '提交失败，请稍后重试', icon: 'error' });
            } finally {
                uni.hideLoading();
            }
        },

        // 发布顺风车
        async submit() {
            if (!this.validateFields()) return;

            if (this.ride.images && this.ride.images.length > 0) {
                await this.uploadImages(this.ride.images);
            }

            // 转换 images 为纯 URL
            this.prepareImages();

            try {
                uni.showLoading({
                    title: '请耐心等待信息上传',
                });
                const apiPath = '/ride/publishRide';
                const response = await requestAPI({
                    path: apiPath,
                    type: 'POST',
                    data: this.ride,
                });

                if (response.data.status === 100) {
                    uni.showToast({ title: this.edit ? '更新成功' : '发布成功', icon: 'success' });
                    uni.navigateBack();
                } else {
                    throw new Error('请求失败');
                }
            } catch (error) {
                uni.showToast({ title: '提交失败，请稍后重试', icon: 'error' });
            }
        },

        // 处理选择图片
        onSelectImage(e) {
            for (let i = 0; i < e.tempFilePaths.length && i < e.tempFiles.length; i++) {
                this.ride.images.push({
                    filename: e.tempFiles[i].name,
                    filepath: e.tempFilePaths[i],
                });
            }

            const lastImageFilePath = this.ride.images[this.ride.images.length - 1].filepath;
            this.imagesToDisplay.push({ lastImageFilePath });
        },

        // 处理删除图片
        onDeleteImage(e) {
            for (let i = 0; i < this.ride.images.length; i++) {
                if (i === e.index) {
                    this.ride.images.splice(i, 1);
                    this.imagesToDisplay.splice(i, 1);
                    return;
                }
            }
        },

        // 上传图片
        async uploadImages(pendingImages) {
            if (!Array.isArray(pendingImages) || pendingImages.length === 0) {
                console.warn('没有待上传的图片');
                return;
            }

            try {
                // 显示加载提示
                uni.showLoading({
                    title: `上传图片, 0/${pendingImages.length}`,
                    mask: true,
                });

                let uploadedImageCount = 0;

                // 构建上传任务
                const uploadPromises = pendingImages.map((image) => this.compressAndUpload(image));

                // 并行执行上传任务
                const results = await Promise.allSettled(uploadPromises);

                // 处理上传结果
                results.forEach((result, index) => {
                    const image = pendingImages[index];
                    if (result.status === 'fulfilled') {
                        console.log(`图片 ${image.filename} 上传成功: ${result.value}`);
                        image.url = result.value; // 更新 URL
                        uploadedImageCount++;
                    } else {
                        console.error(`图片 ${image.filename} 上传失败`, result.reason);
                    }
                });

                // 更新 ride.images，将上传成功的图片替换
                this.ride.images = this.ride.images
                    .map((img) => {
                        // 判断 img 是对象还是字符串
                        if (typeof img === 'object' && img.filepath) {
                            // 查找匹配的 pendingImages 项
                            const uploaded = pendingImages.find((pending) => pending.filepath === img.filepath);
                            // 如果找到匹配项，返回其 URL；否则忽略该项
                            return uploaded?.url || null;
                        } else if (typeof img === 'string') {
                            // 如果 img 已经是字符串 URL，直接返回
                            return img;
                        }
                        // 如果都不满足，返回 null
                        return null;
                    })
                    .filter((url) => url !== null); // 过滤掉 null 值

                // 显示成功提示
                if (uploadedImageCount === pendingImages.length) {
                    uni.showToast({
                        title: '所有图片上传成功',
                        icon: 'success',
                    });
                } else {
                    uni.showToast({
                        title: `部分图片上传失败 (${uploadedImageCount}/${pendingImages.length})`,
                        icon: 'none',
                    });
                }
            } catch (error) {
                console.error('图片上传出现异常:', error);
                uni.showToast({
                    title: '图片上传失败',
                    icon: 'error',
                });
            } finally {
                uni.hideLoading(); // 隐藏加载提示
            }
        },

        // 压缩并上传单张图片的方法
        compressAndUpload(image) {
            return new Promise((resolve, reject) => {
                wx.compressImage({
                    src: image.filepath,
                    quality: 30, // 压缩质量
                    success(res) {
                        console.log(`图片压缩成功: ${res.tempFilePath}`);
                        // 上传压缩后的图片
                        uploadOSS(
                            {
                                filename: image.filename,
                                filepath: res.tempFilePath,
                            },
                            'cssa-ride'
                        )
                            .then((url) => {
                                console.log(`图片上传成功，URL: ${url}`);
                                resolve(url);
                            })
                            .catch((err) => {
                                console.error(`图片上传失败:`, err);
                                reject(err);
                            });
                    },
                    fail(err) {
                        console.warn('图片压缩失败，直接上传原图:', err);
                        // 压缩失败时直接上传原图
                        uploadOSS(image)
                            .then((url) => {
                                console.log(`图片上传成功，URL: ${url}`);
                                resolve(url);
                            })
                            .catch((err) => {
                                console.error(`图片上传失败:`, err);
                                reject(err);
                            });
                    },
                });
            });
        },

        // 提交数据前处理 images
        prepareImages() {
            this.ride.images = this.ride.images.map((img) => {
                // 如果是对象，取 URL；如果是字符串（已是 URL），直接返回
                return typeof img === 'object' ? img.url : img;
            });
        },

        // 显示必填字段错误信息
        showErrorPopup() {
            if (this.$refs.errorPopup) {
                this.$refs.errorPopup.open();
                setTimeout(() => {
                    this.$refs.errorPopup.close();
                }, 5000);
            }
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
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-top: 20px;
}

.required {
    color: red;
}

.popup-content {
    width: 80%;
    max-width: 300px;
    padding: 20px;
    text-align: center;
    font-size: 15px;
    color: #333;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    border: 1px solid #ddd;
}
</style>
