"use strict";
const common_vendor = require("../../common/vendor.js");
const api_upload = require("../../api/upload.js");
const api_request = require("../../api/request.js");
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
        text: "限男",
        value: 0
      }, {
        text: "限女",
        value: 1
      }, {
        text: "性别不限",
        value: 2
      }],
      floorPlan,
      rules: {
        imageList: {
          rules: [
            {
              required: true,
              errorMessage: "请上传图片"
            },
            {
              minLength: 1,
              maxLength: 5,
              errorMessage: "最多只能上传五张图片"
            }
          ]
        },
        location: {
          rules: [
            {
              required: true,
              errorMessage: "请填写房屋信息"
            },
            {
              minLength: 1,
              maxLength: 22,
              errorMessage: "房屋信息长度在 1 到 22 个字符之间"
            }
          ]
        },
        description: {
          rules: [
            {
              required: true,
              errorMessage: "请填写房屋详情"
            },
            {
              minLength: 1,
              maxLength: 400,
              errorMessage: "房屋详情长度在 1 到 400 个字符之间"
            }
          ]
        },
        furnitureType: {
          rules: [{
            required: true,
            errorMessage: "请选择家具"
          }]
        },
        floorPlan: {
          rules: [{
            required: true,
            errorMessage: "请选择户型"
          }]
        },
        leasePeriod: {
          rules: [{
            required: true,
            errorMessage: "请选择租期"
          }]
        },
        price: {
          rules: [{
            required: true,
            errorMessage: "请输入转租价格"
          }, {
            format: "number",
            errorMessage: "类型错误"
          }, {
            maximum: 5e3,
            errorMessage: "转租价格应在5000至0之内"
          }]
        },
        contact: {
          rules: [{
            required: true,
            errorMessage: "请输入联系方式"
          }]
        }
      },
      userInfo: {}
    };
  },
  onLoad(options) {
    common_vendor.wx$1.cloud.init();
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
      console.log("范围选:", this.range);
    }
  },
  methods: {
    maskClick(e) {
      console.log("maskClick事件:", e);
    },
    getDate(type) {
      const date = /* @__PURE__ */ new Date();
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
          title: "请耐心等待信息上传"
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
        title: "正在上传内容",
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
        const res = await common_vendor.wx$1.cloud.callContainer({
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
            title: "上传信息失败",
            icon: "error"
          });
        }
      } catch (error) {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "上传信息失败",
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
      placeholder: "请选择户型",
      localdata: $data.floorPlan,
      ["popup-title"]: "请选择户型",
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
      placeholder: "请描述房屋详情,如户型/地点/具体租期,请包括整间转租还是单个卧室转租等",
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
    x: common_vendor.t("/ 月"),
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
    G: common_vendor.sr("rentalForm", "ae022314-0"),
    H: common_vendor.p({
      modelValue: $data.rental,
      rules: $data.rules
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/pages/rentalPost/rentalPost.vue"]]);
wx.createPage(MiniProgramPage);
