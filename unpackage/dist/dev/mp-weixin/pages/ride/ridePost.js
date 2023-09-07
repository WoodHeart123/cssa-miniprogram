"use strict";
var common_vendor = require("../../common/vendor.js");
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
              errorMessage: "\u8BF7\u586B\u5199\u6C7D\u8F66\u54C1\u724C"
            },
            {
              minLength: 1,
              maxLength: 8,
              errorMessage: "\u6C7D\u8F66\u4FE1\u606F\u957F\u5EA6\u5728 1 \u5230 8 \u4E2A\u5B57\u7B26\u4E4B\u95F4"
            }
          ]
        },
        model: {
          rules: [
            {
              required: true,
              errorMessage: "\u8BF7\u586B\u5199\u6C7D\u8F66\u54C1\u724C"
            },
            {
              minLength: 1,
              maxLength: 15,
              errorMessage: "\u6C7D\u8F66\u4FE1\u606F\u957F\u5EA6\u5728 1 \u5230 15 \u4E2A\u5B57\u7B26\u4E4B\u95F4"
            }
          ]
        },
        bodyStyle: {
          rules: [
            {
              required: false,
              errorMessage: "\u8BF7\u586B\u5199\u6C7D\u8F66\u7C7B\u578B"
            },
            {
              minLength: 1,
              maxLength: 9,
              errorMessage: "\u6C7D\u8F66\u4FE1\u606F\u957F\u5EA6\u5728 1 \u5230 9 \u4E2A\u5B57\u7B26\u4E4B\u95F4"
            }
          ]
        },
        plate: {
          rules: [
            {
              required: true,
              errorMessage: "\u8BF7\u586B\u5199\u6C7D\u8F66\u54C1\u724C"
            },
            {
              minLength: 1,
              maxLength: 9,
              errorMessage: "\u6C7D\u8F66\u4FE1\u606F\u957F\u5EA6\u5728 1 \u5230 9 \u4E2A\u5B57\u7B26\u4E4B\u95F4"
            }
          ]
        },
        description: {
          rules: [
            {
              required: true,
              errorMessage: "\u8BF7\u586B\u5199\u65C5\u7A0B\u8BE6\u60C5"
            },
            {
              minLength: 1,
              maxLength: 400,
              errorMessage: "\u65C5\u7A0B\u8BE6\u60C5\u957F\u5EA6\u5728 1 \u5230 400 \u4E2A\u5B57\u7B26\u4E4B\u95F4"
            }
          ]
        },
        price: {
          rules: [{
            required: true,
            errorMessage: "\u8BF7\u586B\u5199\u5355\u4EBA\u987A\u98CE\u8F66\u4EF7\u683C"
          }]
        },
        origin: {
          rules: [{
            required: true,
            errorMessage: "\u8BF7\u586B\u5199\u59CB\u53D1\u5730"
          }]
        },
        destination: {
          rules: [{
            required: true,
            errorMessage: "\u8BF7\u586B\u5199\u76EE\u7684\u5730"
          }]
        },
        numOfPassanger: {
          rules: [{
            required: true,
            errorMessage: "\u8BF7\u586B\u5199\u4E58\u5BA2\u4EBA\u6570"
          }]
        },
        dateAndTime: {
          rules: [{
            required: true,
            errorMessage: "\u8BF7\u586B\u5199\u51FA\u53D1\u65E5\u671F\u548C\u65F6\u95F4\u4FE1\u606F"
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
            errorMessage: "\u8BF7\u8F93\u5165\u5FAE\u4FE1\u53F7"
          }]
        }
      },
      userInfo: {}
    };
  },
  onShow() {
    wx.cloud.init();
    this.userInfo = common_vendor.index.getStorageSync("userInfo-2");
    if (this.userInfo.wechatID != null) {
      this.ride.weChat = this.userInfo.wechatID;
      this.save = false;
      this.hasID = true;
    }
  },
  watch: {
    range(newval) {
      console.log("\u8303\u56F4\u9009:", this.range);
    }
  },
  methods: {
    getDate(type) {
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      year = year - 60;
      month = month > 9 ? month : "0" + month;
      day = day > 9 ? day : "0" + day;
      return `${year}-${month}-${day}`;
    },
    maskClick(e) {
      console.log("maskClick\u4E8B\u4EF6:", e);
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
          title: "\u8BF7\u8010\u5FC3\u7B49\u5F85\u4FE1\u606F\u4E0A\u4F20"
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
        title: "\u6B63\u5728\u4E0A\u4F20\u5185\u5BB9"
      });
      for (let i = 0; i < this.ride.imageList.length; i++) {
        common_vendor.index.uploadFile({
          url: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com",
          filePath: this.ride.imageList[i].filepath,
          fileType: "image",
          name: "file",
          formData: {},
          success: (res) => {
            if (res.statusCode != 200) {
              common_vendor.index.hideLoading();
              common_vendor.index.showToast({
                title: "\u4E0A\u4F20\u56FE\u7247\u5931\u8D25",
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
              title: "\u4E0A\u4F20\u56FE\u7247\u5931\u8D25",
              icon: "error"
            });
          }
        });
      }
    },
    postRide: async function() {
      const res = await wx.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
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
          title: "\u4E0A\u4F20\u4FE1\u606F\u5931\u8D25",
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
    e: common_vendor.sr("rideForm", "ad9d890e-1,ad9d890e-0"),
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
      placeholder: "\u53EF\u63CF\u8FF0\u8F66\u8F86, \u65C5\u7A0B, \u6216\u5176\u5B83\u4FE1\u606F\u7B49",
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
      placeholder: "\u9009\u62E9\u51FA\u53D1\u65E5\u671F\u65F6\u95F4",
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
    J: common_vendor.sr("rideForm", "ad9d890e-0"),
    K: common_vendor.p({
      model: $data.ride,
      rules: $data.rules
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/cssa/cssa-miniprogram/pages/ride/ridePost.vue"]]);
wx.createPage(MiniProgramPage);
