"use strict";
var common_vendor = require("../../common/vendor.js");
var api_upload = require("../../api/upload.js");
var api_request = require("../../api/request.js");
const floorPlan = [
  {
    text: "Studio",
    value: "Studio"
  },
  {
    text: "1B",
    value: "1B0B",
    children: [{
      text: "1B",
      value: "1B1B"
    }]
  },
  {
    text: "2B",
    value: "2B0B",
    children: [{
      text: "1B",
      value: "2B1B"
    }, {
      text: "2B",
      value: "2B2B"
    }]
  },
  {
    text: "3B",
    value: "3B0B",
    children: [{
      text: "1B",
      value: "3B1B"
    }, {
      text: "2B",
      value: "3B2B"
    }, {
      text: "3B",
      value: "3B3B"
    }]
  },
  {
    text: "4B",
    value: "4B0B",
    children: [{
      text: "1B",
      value: "4B1B"
    }, {
      text: "2B",
      value: "4B2B"
    }, {
      text: "3B",
      value: "4B3B"
    }, {
      text: "4B",
      value: "4B4B"
    }]
  },
  {
    text: "Other",
    value: "Other"
  }
];
const _sfc_main = {
  data() {
    return {
      unloading: false,
      hasID: false,
      save: true,
      edit: false,
      upLoadFail: false,
      uploadCount: 0,
      clearable: false,
      start: Date.now(),
      rental: {
        imageList: [],
        description: "",
        location: "",
        time: [0, 0],
        sexConstraint: -1,
        floorPlan: "",
        price: 100
      },
      images: [],
      sexConstraint: [{
        text: "\u9650\u7537",
        value: 0
      }, {
        text: "\u9650\u5973",
        value: 1
      }, {
        text: "\u6027\u522B\u4E0D\u9650",
        value: 2
      }],
      floorPlan,
      rules: {
        imageList: {
          rules: [
            {
              required: true,
              errorMessage: "\u8BF7\u4E0A\u4F20\u56FE\u7247"
            },
            {
              minLength: 1,
              maxLength: 5,
              errorMessage: "\u6700\u591A\u53EA\u80FD\u4E0A\u4F20\u4E94\u5F20\u56FE\u7247"
            }
          ]
        },
        location: {
          rules: [
            {
              required: true,
              errorMessage: "\u8BF7\u586B\u5199\u623F\u5C4B\u4FE1\u606F"
            },
            {
              minLength: 1,
              maxLength: 22,
              errorMessage: "\u623F\u5C4B\u4FE1\u606F\u957F\u5EA6\u5728 1 \u5230 22 \u4E2A\u5B57\u7B26\u4E4B\u95F4"
            }
          ]
        },
        description: {
          rules: [
            {
              required: true,
              errorMessage: "\u8BF7\u586B\u5199\u623F\u5C4B\u8BE6\u60C5"
            },
            {
              minLength: 1,
              maxLength: 400,
              errorMessage: "\u623F\u5C4B\u8BE6\u60C5\u957F\u5EA6\u5728 1 \u5230 400 \u4E2A\u5B57\u7B26\u4E4B\u95F4"
            }
          ]
        },
        furnitureType: {
          rules: [{
            required: true,
            errorMessage: "\u8BF7\u9009\u62E9\u5BB6\u5177"
          }]
        },
        floorPlan: {
          rules: [{
            required: true,
            errorMessage: "\u8BF7\u9009\u62E9\u6237\u578B"
          }]
        },
        leasePeriod: {
          rules: [{
            required: true,
            errorMessage: "\u8BF7\u9009\u62E9\u79DF\u671F"
          }]
        },
        price: {
          rules: [{
            required: true,
            errorMessage: "\u8BF7\u8F93\u5165\u8F6C\u79DF\u4EF7\u683C"
          }, {
            format: "number",
            errorMessage: "\u7C7B\u578B\u9519\u8BEF"
          }, {
            maximum: 5e3,
            errorMessage: "\u8F6C\u79DF\u4EF7\u683C\u5E94\u57285000\u81F30\u4E4B\u5185"
          }]
        },
        contact: {
          rules: [{
            required: true,
            errorMessage: "\u8BF7\u8F93\u5165\u8054\u7CFB\u65B9\u5F0F"
          }]
        }
      },
      userInfo: {}
    };
  },
  onLoad(options) {
    wx.cloud.init();
    console.log(options);
    if (options.rental != null) {
      this.edit = true;
      this.rental = JSON.parse(decodeURIComponent(options.rental));
      this.rental.time = [common_vendor.moment(this.rental.rentalStartTime).format("YYYY-MM-DD"), common_vendor.moment(this.rental.rentalEndTime).format("YYYY-MM-DD")];
    }
  },
  onShow() {
    this.userInfo = common_vendor.index.getStorageSync("userInfo-2");
    if (!this.edit && this.userInfo.wechatID != null) {
      this.rental.contact = this.userInfo.wechatID;
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
    maskClick(e) {
      console.log("maskClick\u4E8B\u4EF6:", e);
    },
    getDate(type) {
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (type === "start") {
        year = year - 60;
      } else if (type === "end") {
        year = year + 2;
      }
      month = month > 9 ? month : "0" + month;
      day = day > 9 ? day : "0" + day;
      return `${year}-${month}-${day}`;
    },
    showCheckBox: function() {
      this.save = true;
      this.hasID = false;
    },
    radioChange: function(evt) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].value === evt.detail.value) {
          this.current = i;
          break;
        }
      }
    },
    checkBoxChange: function(e) {
      if (e.detail.length == 0) {
        this.save = false;
      } else {
        this.save = true;
      }
    },
    onSelectImage: function(e) {
      for (let i = 0; i < e.tempFilePaths.length && i < e.tempFiles.length; i++) {
        this.rental.imageList.push({
          filename: e.tempFiles[i].name,
          filepath: e.tempFilePaths[i]
        });
      }
    },
    onDeleteImage: function(e) {
      for (let i = 0; i < this.rental.imageList.length; i++) {
        if (this.rental.imageList[i].filename == e.tempFile.name) {
          this.rental.imageList.splice(i, 1);
          return;
        }
      }
    },
    submit(ref) {
      if (this.uploading) {
        return;
      }
      this.$refs[ref].validate().then((res) => {
        this.uploading = true;
        this.rental.rentalStartTime = common_vendor.moment(this.rental.time[0], "YYYY-MM-DD").valueOf();
        this.rental.rentalEndTime = common_vendor.moment(this.rental.time[1], "YYYY-MM-DD").valueOf();
        this.images = [];
        common_vendor.index.showLoading({
          title: "\u8BF7\u8010\u5FC3\u7B49\u5F85\u4FE1\u606F\u4E0A\u4F20"
        });
        if (this.edit) {
          this.updateRental();
        } else {
          this.uploadImage();
        }
      }).catch((err) => {
        console.log(err);
        console.log(this.rental);
        common_vendor.index.showToast({
          title: err[0].errorMessage,
          icon: "error"
        });
      });
    },
    uploadImage: async function() {
      common_vendor.index.showLoading({
        title: "\u6B63\u5728\u4E0A\u4F20\u5185\u5BB9",
        mask: true
      });
      const uploadPromises = this.rental.imageList.map((image) => {
        api_upload.uploadOSS(image);
      });
      try {
        const uploadedImages = await Promise.all(uploadPromises);
        this.images = uploadedImages;
        this.rental.images = this.images;
        this.postRental();
      } catch (error) {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: error,
          icon: "error"
        });
      }
    },
    postRental: async function() {
      try {
        const res = await wx.cloud.callContainer({
          config: {
            env: "prod-9gip97mx4bfa32a3"
          },
          path: `/rental/postRentalInfo?save=${this.save}`,
          method: "POST",
          header: {
            "X-WX-SERVICE": "springboot-ds71"
          },
          data: this.rental
        });
        common_vendor.index.hideLoading();
        if (res.data.status === 100) {
          if (this.rental.save) {
            this.userInfo.wechatID = this.rental.contact;
          }
          common_vendor.index.setStorageSync("userInfo-2", this.userInfo);
          common_vendor.index.$emit("uploadRentalSuccess");
          common_vendor.index.navigateBack();
        } else {
          common_vendor.index.showToast({
            title: "\u4E0A\u4F20\u4FE1\u606F\u5931\u8D25",
            icon: "error"
          });
        }
      } catch (error) {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "\u4E0A\u4F20\u4FE1\u606F\u5931\u8D25",
          icon: "error"
        });
      }
    },
    updateRental: async function() {
      const res = await api_request.requestAPI({
        path: `/rental/updateRental`,
        type: "POST",
        data: this.rental
      });
      common_vendor.index.hideLoading();
      if (res.data.status == 100) {
        common_vendor.index.$emit("uploadRentalSuccess");
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
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_file_picker2 + _easycom_uni_forms_item2 + _easycom_uni_data_picker2 + _easycom_uni_data_checkbox2 + _easycom_uni_easyinput2 + _easycom_uni_datetime_picker2 + _easycom_uni_forms2)();
}
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_picker = () => "../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_file_picker + _easycom_uni_forms_item + _easycom_uni_data_picker + _easycom_uni_data_checkbox + _easycom_uni_easyinput + _easycom_uni_datetime_picker + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !this.edit
  }, !this.edit ? {
    b: common_vendor.o($options.onSelectImage),
    c: common_vendor.o($options.onDeleteImage),
    d: common_vendor.p({
      limit: "5",
      fileMediatype: "image",
      ["auto-upload"]: false
    }),
    e: common_vendor.p({
      name: "imageList"
    })
  } : {}, {
    f: common_vendor.o(($event) => $data.rental.floorPlan = $event),
    g: common_vendor.p({
      placeholder: "\u8BF7\u9009\u62E9\u6237\u578B",
      localdata: $data.floorPlan,
      ["popup-title"]: "\u8BF7\u9009\u62E9\u6237\u578B",
      ["clear-icon"]: false,
      modelValue: $data.rental.floorPlan
    }),
    h: common_vendor.p({
      name: "floorPlan"
    }),
    i: common_vendor.o(($event) => $data.rental.sexConstraint = $event),
    j: common_vendor.p({
      selectedColor: "#9b0000",
      localdata: $data.sexConstraint,
      modelValue: $data.rental.sexConstraint
    }),
    k: common_vendor.p({
      name: "sexConstraint"
    }),
    l: $data.rental.location,
    m: common_vendor.o(($event) => $data.rental.location = $event.detail.value),
    n: common_vendor.p({
      name: "location"
    }),
    o: common_vendor.o(($event) => $data.rental.description = $event),
    p: common_vendor.p({
      type: "textarea",
      placeholder: "\u8BF7\u63CF\u8FF0\u623F\u5C4B\u8BE6\u60C5,\u5982\u6237\u578B/\u5730\u70B9/\u5177\u4F53\u79DF\u671F,\u8BF7\u5305\u62EC\u6574\u95F4\u8F6C\u79DF\u8FD8\u662F\u5355\u4E2A\u5367\u5BA4\u8F6C\u79DF\u7B49",
      maxlength: "400",
      placeholderStyle: "font-size:14px;color:gray",
      clearable: $data.clearable,
      modelValue: $data.rental.description
    }),
    q: common_vendor.p({
      name: "description"
    }),
    r: common_vendor.o($options.maskClick),
    s: common_vendor.o(($event) => $data.rental.time = $event),
    t: common_vendor.p({
      type: "daterange",
      start: $data.start,
      ["clear-icon"]: false,
      border: false,
      modelValue: $data.rental.time
    }),
    v: $data.rental.price,
    w: common_vendor.o(($event) => $data.rental.price = $event.detail.value),
    x: common_vendor.t("/ \u6708"),
    y: common_vendor.p({
      name: "price"
    }),
    z: $data.rental.contact,
    A: common_vendor.o(($event) => $data.rental.contact = $event.detail.value),
    B: !$data.hasID
  }, !$data.hasID ? {
    C: $data.save,
    D: common_vendor.o((...args) => $options.checkBoxChange && $options.checkBoxChange(...args))
  } : {}, {
    E: common_vendor.p({
      name: "contact"
    }),
    F: common_vendor.o(($event) => $options.submit("rentalForm")),
    G: common_vendor.sr("rentalForm", "8cb2c90e-0"),
    H: common_vendor.p({
      modelValue: $data.rental,
      rules: $data.rules
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/cssa/cssa-miniprogram/pages/rentalPost/rentalPost.vue"]]);
wx.createPage(MiniProgramPage);
