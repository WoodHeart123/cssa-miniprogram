"use strict";
const common_vendor = require("../../common/vendor.js");
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
        text: "电子产品",
        value: "ELECTRONIC"
      }, {
        text: "交通工具",
        value: "TRANSPORT"
      }, {
        text: "家具家电",
        value: "FURNITURE"
      }, {
        text: "虚拟卡券",
        value: "DIGITAL"
      }, {
        text: "日常用品",
        value: "DAILY"
      }, {
        text: "美妆服饰",
        value: "MAKEUP"
      }, {
        text: "书籍教具",
        value: "EDU"
      }, {
        text: "宠物用品",
        value: "PET"
      }, {
        text: "其他",
        value: "OTHERS"
      }],
      deliveryOption: [{
        text: "自取",
        value: "pickup"
      }, {
        text: "送货",
        value: "deliver"
      }, {
        text: "皆可",
        value: "all"
      }],
      conditionOption: [{
        text: "全新",
        value: "NEW"
      }, {
        text: "几乎全新",
        value: "ALMOST_NEW"
      }, {
        text: "明显使用痕迹",
        value: "USED"
      }, {
        text: "部分损毁",
        value: "IMPAIRED"
      }],
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
        productTitle: {
          rules: [
            {
              required: true,
              errorMessage: "请填写商品名称"
            },
            {
              minLength: 1,
              maxLength: 22,
              errorMessage: "商品名称长度在 1 到 22 个字符之间"
            }
          ]
        },
        productDescription: {
          rules: [
            {
              required: true,
              errorMessage: "请填写商品描述"
            },
            {
              minLength: 1,
              maxLength: 400,
              errorMessage: "商品名称长度在 1 到 400 个字符之间"
            }
          ]
        },
        productType: {
          rules: [{
            required: true,
            errorMessage: "请选择商品类型"
          }]
        },
        delivery: {
          rules: [{
            required: true,
            errorMessage: "请选择配送方式"
          }]
        },
        productCondition: {
          rules: [{
            required: true,
            errorMessage: "请选择商品成色"
          }]
        },
        price: {
          rules: [{
            required: true,
            errorMessage: "请输入商品价格"
          }]
        },
        contact: {
          rules: [{
            required: true,
            errorMessage: "请输入联系方式"
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
    common_vendor.wx$1.cloud.init();
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
          title: "请耐心等待信息上传"
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
      const res = await common_vendor.wx$1.cloud.callContainer({
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
          title: "更新信息失败",
          icon: "error"
        });
      }
    },
    uploadImage: async function() {
      common_vendor.index.showLoading({
        title: "正在上传内容",
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
                title: "上传图片失败",
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
              title: "上传图片失败",
              icon: "error"
            });
          }
        });
      }
    },
    postProduct: async function() {
      const res = await common_vendor.wx$1.cloud.callContainer({
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
      placeholder: "请输入商品描述信息",
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
      placeholder: "请选择商品类型",
      ["popup-title"]: "请选择商品类型",
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
      placeholder: "请填写价格",
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
    E: common_vendor.t(this.edit ? "更新" : "发布"),
    F: common_vendor.o(($event) => $options.submit("productForm")),
    G: common_vendor.sr("productForm", "a159eee2-0"),
    H: common_vendor.p({
      model: $data.product,
      rules: $data.rules
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/pages/second/secondMainPost.vue"]]);
wx.createPage(MiniProgramPage);
