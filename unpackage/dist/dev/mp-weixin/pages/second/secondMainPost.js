"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      edit: false,
      hasID: false,
      save: true,
      upLoadFail: false,
      uploadCount: 0,
      clearable: false,
      product: {
        imageList: [],
        productDescription: "",
        productTitle: ""
      },
      images: [],
      item_types: [{
        text: "\u7535\u5B50\u4EA7\u54C1",
        value: "ELECTRONIC"
      }, {
        text: "\u4EA4\u901A\u5DE5\u5177",
        value: "TRANSPORT"
      }, {
        text: "\u5BB6\u5177\u5BB6\u7535",
        value: "FURNITURE"
      }, {
        text: "\u865A\u62DF\u5361\u5238",
        value: "DIGITAL"
      }, {
        text: "\u65E5\u5E38\u7528\u54C1",
        value: "DAILY"
      }, {
        text: "\u7F8E\u5986\u670D\u9970",
        value: "MAKEUP"
      }, {
        text: "\u4E66\u7C4D\u6559\u5177",
        value: "EDU"
      }, {
        text: "\u5BA0\u7269\u7528\u54C1",
        value: "PET"
      }, {
        text: "\u5176\u4ED6",
        value: "OTHERS"
      }],
      deliveryOption: [{
        text: "\u81EA\u53D6",
        value: "pickup"
      }, {
        text: "\u9001\u8D27",
        value: "deliver"
      }, {
        text: "\u7686\u53EF",
        value: "all"
      }],
      conditionOption: [{
        text: "\u5168\u65B0",
        value: "NEW"
      }, {
        text: "\u51E0\u4E4E\u5168\u65B0",
        value: "ALMOST_NEW"
      }, {
        text: "\u660E\u663E\u4F7F\u7528\u75D5\u8FF9",
        value: "USED"
      }, {
        text: "\u90E8\u5206\u635F\u6BC1",
        value: "IMPAIRED"
      }],
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
        productTitle: {
          rules: [
            {
              required: true,
              errorMessage: "\u8BF7\u586B\u5199\u5546\u54C1\u540D\u79F0"
            },
            {
              minLength: 1,
              maxLength: 22,
              errorMessage: "\u5546\u54C1\u540D\u79F0\u957F\u5EA6\u5728 1 \u5230 22 \u4E2A\u5B57\u7B26\u4E4B\u95F4"
            }
          ]
        },
        productDescription: {
          rules: [
            {
              required: true,
              errorMessage: "\u8BF7\u586B\u5199\u5546\u54C1\u63CF\u8FF0"
            },
            {
              minLength: 1,
              maxLength: 400,
              errorMessage: "\u5546\u54C1\u540D\u79F0\u957F\u5EA6\u5728 1 \u5230 400 \u4E2A\u5B57\u7B26\u4E4B\u95F4"
            }
          ]
        },
        productType: {
          rules: [{
            required: true,
            errorMessage: "\u8BF7\u9009\u62E9\u5546\u54C1\u7C7B\u578B"
          }]
        },
        delivery: {
          rules: [{
            required: true,
            errorMessage: "\u8BF7\u9009\u62E9\u914D\u9001\u65B9\u5F0F"
          }]
        },
        productCondition: {
          rules: [{
            required: true,
            errorMessage: "\u8BF7\u9009\u62E9\u5546\u54C1\u6210\u8272"
          }]
        },
        price: {
          rules: [{
            required: true,
            errorMessage: "\u8BF7\u8F93\u5165\u5546\u54C1\u4EF7\u683C"
          }]
        },
        contact: {
          rules: [{
            required: true,
            errorMessage: "\u8BF7\u8F93\u5165\u8054\u7CFB\u65B9\u5F0F"
          }]
        }
      }
    };
  },
  onLoad(options) {
    console.log(options);
    if (options.product != null) {
      this.edit = true;
      this.product = JSON.parse(decodeURIComponent(options.product));
      this.product.productCondition = this.conditionOption[this.product.productCondition].value;
      this.product.productType = this.item_types[this.product.productType].value;
    }
  },
  onShow() {
    wx.cloud.init();
    let userInfo = common_vendor.index.getStorageSync("userInfo-2");
    this.product.sellerAvatar = userInfo.avatar;
    this.product.sellerNickname = userInfo.nickname;
    if (userInfo.wechatID != null) {
      this.product.contact = userInfo.wechatID;
      this.save = false;
      this.hasID = true;
    }
  },
  methods: {
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
        this.product.imageList.push({
          filename: e.tempFiles[i].name,
          filepath: e.tempFilePaths[i]
        });
      }
      console.log(this.product.imageList);
    },
    onDeleteImage: function(e) {
      for (let i = 0; i < this.product.imageList.length; i++) {
        if (this.product.imageList[i].filename == e.tempFile.name) {
          this.product.imageList.splice(i, 1);
          return;
        }
      }
      console.log(this.product.imageList);
    },
    submit(ref) {
      this.$refs[ref].validate().then((res) => {
        this.uploadCount = 0;
        this.uploadFail = false;
        this.images = [];
        common_vendor.index.showLoading({
          title: "\u8BF7\u8010\u5FC3\u7B49\u5F85\u4FE1\u606F\u4E0A\u4F20"
        });
        if (!this.edit) {
          this.uploadImage();
        } else {
          this.updateProduct();
        }
      }).catch((err) => {
        common_vendor.index.showToast({
          title: err[0].errorMessage,
          icon: "error"
        });
      });
    },
    updateProduct: async function() {
      const res = await wx.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
        },
        path: `/secondhand/updateSecondHand`,
        method: "POST",
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        },
        data: this.product
      });
      common_vendor.index.hideLoading();
      if (res.data.status == 100) {
        common_vendor.index.$emit("updateSecondSuccess");
        common_vendor.index.navigateBack();
      } else {
        common_vendor.index.showToast({
          title: "\u66F4\u65B0\u4FE1\u606F\u5931\u8D25",
          icon: "error"
        });
      }
    },
    uploadImage: async function() {
      common_vendor.index.showLoading({
        title: "\u6B63\u5728\u4E0A\u4F20\u5185\u5BB9",
        mask: true
      });
      for (let i = 0; i < this.product.imageList.length; i++) {
        common_vendor.index.uploadFile({
          url: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com",
          filePath: this.product.imageList[i].filepath,
          fileType: "image",
          name: "file",
          formData: {
            key: "cssa-secondhand/" + this.product.imageList[i].filename,
            region: "oss-us-west-1",
            accessKeyId: "LTAI5tG4Jt4WD77C1XSDTJAj",
            accessKeySecret: "HsXwO3QW67PBzpIV2CeE1uM6bU4sd7",
            bucket: "cssa-mini-na",
            success_action_status: 200
          },
          success: (res) => {
            console.log(res);
            if (res.statusCode != 200) {
              common_vendor.index.hideLoading();
              common_vendor.index.showToast({
                title: "\u4E0A\u4F20\u56FE\u7247\u5931\u8D25",
                icon: "error"
              });
              this.uploadFail = true;
            } else {
              this.uploadCount++;
              this.images.push("https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-secondhand/" + this.product.imageList[i].filename);
            }
            if (this.uploadCount == this.product.imageList.length) {
              this.product.images = this.images, this.postProduct();
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
    postProduct: async function() {
      const res = await wx.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
        },
        path: `/secondhand/saveProduct?save=${this.save}`,
        method: "POST",
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        },
        data: this.product
      });
      common_vendor.index.hideLoading();
      if (res.data.status == 100) {
        common_vendor.index.$emit("uploadSuccess");
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
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_file_picker2 + _easycom_uni_forms_item2 + _easycom_uni_easyinput2 + _easycom_uni_data_checkbox2 + _easycom_uni_data_picker2 + _easycom_uni_forms2)();
}
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_data_picker = () => "../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_file_picker + _easycom_uni_forms_item + _easycom_uni_easyinput + _easycom_uni_data_checkbox + _easycom_uni_data_picker + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.edit
  }, !$data.edit ? {
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
    f: $data.product.productTitle,
    g: common_vendor.o(($event) => $data.product.productTitle = $event.detail.value),
    h: common_vendor.p({
      name: "productTitle"
    }),
    i: common_vendor.o(($event) => $data.product.productDescription = $event),
    j: common_vendor.p({
      type: "textarea",
      placeholder: "\u8BF7\u8F93\u5165\u5546\u54C1\u63CF\u8FF0\u4FE1\u606F",
      maxlength: "400",
      placeholderStyle: "font-size:14px;color:gray",
      clearable: $data.clearable,
      modelValue: $data.product.productDescription
    }),
    k: common_vendor.p({
      name: "productDescription"
    }),
    l: common_vendor.o(($event) => $data.product.delivery = $event),
    m: common_vendor.p({
      selectedColor: "#9B0000",
      localdata: $data.deliveryOption,
      modelValue: $data.product.delivery
    }),
    n: common_vendor.p({
      name: "delivery"
    }),
    o: common_vendor.o(($event) => $data.product.productType = $event),
    p: common_vendor.p({
      placeholder: "\u8BF7\u9009\u62E9\u5546\u54C1\u7C7B\u578B",
      ["popup-title"]: "\u8BF7\u9009\u62E9\u5546\u54C1\u7C7B\u578B",
      localdata: $data.item_types,
      modelValue: $data.product.productType
    }),
    q: common_vendor.p({
      name: "productType"
    }),
    r: common_vendor.o(($event) => $data.product.productCondition = $event),
    s: common_vendor.p({
      selectedColor: "#9B0000",
      localdata: $data.conditionOption,
      modelValue: $data.product.productCondition
    }),
    t: common_vendor.p({
      name: "productCondition"
    }),
    v: common_vendor.o(($event) => $data.product.price = $event),
    w: common_vendor.p({
      type: "number",
      placeholder: "\u8BF7\u586B\u5199\u4EF7\u683C",
      ["placeholder-style"]: "font-size:14px;color:gray",
      clearable: $data.clearable,
      modelValue: $data.product.price
    }),
    x: common_vendor.p({
      name: "price"
    }),
    y: common_vendor.o([($event) => $data.product.contact = $event.detail.value, (...args) => $options.showCheckBox && $options.showCheckBox(...args)]),
    z: $data.product.contact,
    A: !$data.hasID
  }, !$data.hasID ? {
    B: $data.save,
    C: common_vendor.o((...args) => $options.checkBoxChange && $options.checkBoxChange(...args))
  } : {}, {
    D: common_vendor.p({
      name: "contact"
    }),
    E: common_vendor.t(this.edit ? "\u66F4\u65B0" : "\u53D1\u5E03"),
    F: common_vendor.o(($event) => $options.submit("productForm")),
    G: common_vendor.sr("productForm", "800a94dc-0"),
    H: common_vendor.p({
      model: $data.product,
      rules: $data.rules
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/cssa/cssa-miniprogram/pages/second/secondMainPost.vue"]]);
wx.createPage(MiniProgramPage);
