"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      unloading: false,
      hasID: false,
      hasPhone: false,
      save: true,
      upLoadFail: false,
      uploadCount: 0,
      clearable: false,
      ride: {
        imageList: [],
        description: "",
        make: "",
        model: "",
        bodyStule: "",
        plate: "",
        // numOfPassanger: 0,
        // numOfLuggage: 0,
        origin: "",
        time: [0],
        destination: "",
        dateAndTime: "",
        price: 0,
        weChat: "",
        phone: ""
      },
      rules: {
        make: {
          rules: [
            {
              required: true,
              errorMessage: "请填写汽车品牌"
            },
            {
              minLength: 1,
              maxLength: 8,
              errorMessage: "汽车信息长度在 1 到 8 个字符之间"
            }
          ]
        },
        model: {
          rules: [
            {
              required: true,
              errorMessage: "请填写汽车品牌"
            },
            {
              minLength: 1,
              maxLength: 15,
              errorMessage: "汽车信息长度在 1 到 15 个字符之间"
            }
          ]
        },
        bodyStyle: {
          rules: [
            {
              required: false,
              errorMessage: "请填写汽车类型"
            },
            {
              minLength: 1,
              maxLength: 9,
              errorMessage: "汽车信息长度在 1 到 9 个字符之间"
            }
          ]
        },
        plate: {
          rules: [
            {
              required: true,
              errorMessage: "请填写汽车品牌"
            },
            {
              minLength: 1,
              maxLength: 9,
              errorMessage: "汽车信息长度在 1 到 9 个字符之间"
            }
          ]
        },
        description: {
          rules: [
            {
              required: true,
              errorMessage: "请填写旅程详情"
            },
            {
              minLength: 1,
              maxLength: 400,
              errorMessage: "旅程详情长度在 1 到 400 个字符之间"
            }
          ]
        },
        price: {
          rules: [{
            required: true,
            errorMessage: "请填写单人顺风车价格"
          }]
        },
        origin: {
          rules: [{
            required: true,
            errorMessage: "请填写始发地"
          }]
        },
        destination: {
          rules: [{
            required: true,
            errorMessage: "请填写目的地"
          }]
        },
        numOfPassanger: {
          rules: [{
            required: true,
            errorMessage: "请填写乘客人数"
          }]
        },
        dateAndTime: {
          rules: [{
            required: true,
            errorMessage: "请填写出发日期和时间信息"
          }]
        },
        numOfLuggage: {
          rules: [{
            required: false
          }]
        },
        weChat: {
          rules: [{
            required: true,
            errorMessage: "请输入微信号"
          }]
        }
      },
      userInfo: {}
    };
  },
  onShow() {
    common_vendor.wx$1.cloud.init();
    this.userInfo = common_vendor.index.getStorageSync("userInfo-2");
    if (this.userInfo.wechatID != null) {
      this.ride.weChat = this.userInfo.wechatID;
      this.save = false;
      this.hasID = true;
    }
  },
  watch: {
    range(newval) {
      console.log("范围选:", this.range);
    }
  },
  methods: {
    getDate(type) {
      const date = /* @__PURE__ */ new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      year = year - 60;
      month = month > 9 ? month : "0" + month;
      day = day > 9 ? day : "0" + day;
      return `${year}-${month}-${day}`;
    },
    maskClick(e) {
      console.log("maskClick事件:", e);
    },
    onSelectImage: function(e) {
      for (let i = 0; i < e.tempFilePaths.length && i < e.tempFiles.length; i++) {
        this.ride.imageList.push({
          filename: e.tempFiles[i].name,
          filepath: e.tempFilePaths[i]
        });
      }
      console.log(this.ride.imageList);
    },
    onDeleteImage: function(e) {
      for (let i = 0; i < this.ride.imageList.length; i++) {
        if (this.ride.imageList[i].filename == e.tempFile.name) {
          this.ride.imageList.splice(i, 1);
          return;
        }
      }
      console.log(this.ride.imageList);
    },
    submit(ref) {
      if (this.uploading) {
        return;
      }
      this.uploading = true;
      this.$refs[ref].validate().then((res) => {
        this.uploadCount = 0;
        this.uploadFail = false;
        this.images = [];
        common_vendor.index.showLoading({
          title: "请耐心等待信息上传"
        });
        this.uploadImage();
      }).catch((err) => {
        common_vendor.index.showToast({
          title: err[0].errorMessage,
          icon: "error"
        });
      });
    },
    uploadImage: async function() {
      common_vendor.index.showLoading({
        title: "正在上传内容"
      });
      for (let i = 0; i < this.ride.imageList.length; i++) {
        common_vendor.index.uploadFile({
          url: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com",
          filePath: this.ride.imageList[i].filepath,
          fileType: "image",
          name: "file",
          formData: {
            // key: "cssa-ride/" + this.ride.imageList[i].filename,
            // region: 'oss-us-west-1',
            // accessKeyId: 'LTAI5tG4Jt4WD77C1XSDTJAj',
            // accessKeySecret: 'HsXwO3QW67PBzpIV2CeE1uM6bU4sd7',
            // bucket: 'cssa-mini-na',
            // success_action_status: 200,
          },
          success: (res) => {
            if (res.statusCode != 200) {
              common_vendor.index.hideLoading();
              common_vendor.index.showToast({
                title: "上传图片失败",
                icon: "error"
              });
              console.log(res);
              this.uploadFail = true;
            } else {
              this.uploadCount++;
              this.images.push("https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-ride/" + this.ride.imageList[i].filename);
            }
            if (this.uploadCount == this.ride.imageList.length) {
              this.ride.images = this.images, this.postRide();
            }
          },
          fail: (res) => {
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              title: "上传图片失败",
              icon: "error"
            });
          }
        });
      }
    },
    postRide: async function() {
      const res = await common_vendor.wx$1.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
          // 加一个新的config？
        },
        path: `/ride/postRideInfo?save=${this.save}`,
        method: "POST",
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        },
        data: this.ride
      });
      common_vendor.index.hideLoading();
      if (res.data.status == 100) {
        if (this.ride.save = true) {
          this.userInfo.wechatID = this.ride.weChat;
        }
        common_vendor.index.setStorageSync("userInfo-2", this.userInfo);
        common_vendor.index.$emit("uploadRideSuccess");
        common_vendor.index.navigateBack();
      } else {
        common_vendor.index.showToast({
          title: "上传信息失败",
          icon: "error"
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  (_easycom_uni_file_picker2 + _easycom_uni_forms_item2 + _easycom_uni_forms2 + _easycom_uni_easyinput2 + _easycom_uni_datetime_picker2)();
}
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
if (!Math) {
  (_easycom_uni_file_picker + _easycom_uni_forms_item + _easycom_uni_forms + _easycom_uni_easyinput + _easycom_uni_datetime_picker)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.onSelectImage),
    b: common_vendor.o($options.onDeleteImage),
    c: common_vendor.p({
      limit: "5",
      fileMediatype: "image",
      ["auto-upload"]: false
    }),
    d: common_vendor.p({
      name: "imageList"
    }),
    e: common_vendor.sr("rideForm", "24f6db76-1,24f6db76-0"),
    f: common_vendor.p({
      model: $data.ride,
      rules: $data.rules
    }),
    g: $data.ride.make,
    h: common_vendor.o(($event) => $data.ride.make = $event.detail.value),
    i: common_vendor.p({
      name: "vechicleInfo",
      required: true
    }),
    j: $data.ride.plate,
    k: common_vendor.o(($event) => $data.ride.plate = $event.detail.value),
    l: common_vendor.p({
      name: "plate",
      required: true
    }),
    m: $data.ride.model,
    n: common_vendor.o(($event) => $data.ride.model = $event.detail.value),
    o: $data.ride.origin,
    p: common_vendor.o(($event) => $data.ride.origin = $event.detail.value),
    q: common_vendor.p({
      name: "origin",
      required: true
    }),
    r: $data.ride.destination,
    s: common_vendor.o(($event) => $data.ride.destination = $event.detail.value),
    t: common_vendor.p({
      name: "destination",
      required: true
    }),
    v: common_vendor.o(($event) => $data.ride.description = $event),
    w: common_vendor.p({
      type: "textarea",
      placeholder: "可描述车辆, 旅程, 或其它信息等",
      maxlength: "400",
      placeholderStyle: "font-size:14px;color:gray",
      clearable: $data.clearable,
      modelValue: $data.ride.description
    }),
    x: common_vendor.p({
      name: "description"
    }),
    y: common_vendor.o($options.maskClick),
    z: common_vendor.o(($event) => $data.ride.dateAndTime = $event),
    A: common_vendor.p({
      ["clear-icon"]: false,
      border: false,
      placeholder: "选择出发日期时间",
      modelValue: $data.ride.dateAndTime
    }),
    B: common_vendor.p({
      name: "dateAndTime"
    }),
    C: $data.ride.weChat,
    D: common_vendor.o(($event) => $data.ride.weChat = $event.detail.value),
    E: !$data.hasID || !$data.hasPhone
  }, !$data.hasID || !$data.hasPhone ? {
    F: $data.save,
    G: common_vendor.o((...args) => _ctx.checkBoxChange && _ctx.checkBoxChange(...args))
  } : {}, {
    H: common_vendor.p({
      name: "contact"
    }),
    I: common_vendor.o(($event) => $options.submit("<!-- rideForm -->")),
    J: common_vendor.sr("rideForm", "24f6db76-0"),
    K: common_vendor.p({
      model: $data.ride,
      rules: $data.rules
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/pages/ride/ridePost.vue"]]);
wx.createPage(MiniProgramPage);
