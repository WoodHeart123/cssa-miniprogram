"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      userInfo: {},
      nickname: "",
      nameinput: {
        borderColor: "#ffffff"
      }
    };
  },
  onShow() {
    wx.cloud.init();
    this.userInfo = common_vendor.index.getStorageSync("userInfo-2");
    console.log(this.userInfo);
    this.nickname = this.userInfo.nickname;
  },
  methods: {
    onEmailInput(event) {
      this.email = event.detail.value;
    },
    async confirm() {
      if (this.nickname.length == 0) {
        common_vendor.index.showToast({
          icon: "none",
          title: "\u6635\u79F0\u4E0D\u5E94\u4E3A\u7A7A"
        });
      }
      const res = await wx.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
        },
        path: "/user/updateProfile?str=" + encodeURI(this.nickname) + "&service=nickname",
        method: "GET",
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        }
      });
      if (res.data.status == 100) {
        this.userInfo.nickname = this.nickname;
        common_vendor.index.setStorageSync("userInfo-2", this.userInfo);
        common_vendor.index.navigateBack({
          delta: 1
        });
      } else {
        common_vendor.index.showToast({
          icon: "error",
          title: "\u6682\u65F6\u65E0\u6CD5\u4FEE\u6539\u6635\u79F0\uFF0C\u8BF7\u7A0D\u540E\u518D\u5C1D\u8BD5"
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  _easycom_uni_easyinput();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.nickname = $event),
    b: common_vendor.p({
      styles: $data.nameinput,
      placeholder: "\u8BF7\u8F93\u5165\u6635\u79F0",
      clearable: false,
      maxlength: "20",
      placeholderStyle: "color:#999;font-size:14px",
      modelValue: $data.nickname
    }),
    c: common_vendor.o((...args) => $options.confirm && $options.confirm(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/cssa/cssa-miniprogram/pages/index/updateName.vue"]]);
wx.createPage(MiniProgramPage);
