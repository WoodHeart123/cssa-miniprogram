"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      userInfo: {},
      wechatID: "",
      hasID: false
    };
  },
  onShow() {
    wx.cloud.init();
    this.userInfo = common_vendor.index.getStorageSync("userInfo-2");
    console.log(this.userInfo);
    if (this.userInfo.wechatID != null) {
      this.hasID = true;
      this.wechatID = this.userInfo.wechatID;
    }
  },
  methods: {
    onIDInput(event) {
      this.wechatID = event.detail.value;
    },
    async confirm() {
      if (this.wechatID.length == 0) {
        common_vendor.index.showToast({
          icon: "none",
          title: "\u5FAE\u4FE1\u53F7\u4E0D\u5E94\u4E3A\u7A7A"
        });
      }
      const res = await wx.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
        },
        path: "/user/updateProfile?str=" + encodeURI(this.wechatID) + "&service=wechatid",
        method: "GET",
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        }
      });
      if (res.data.status == 100) {
        this.userInfo.wechatID = this.wechatID;
        common_vendor.index.setStorageSync("userInfo-2", this.userInfo);
        common_vendor.index.navigateBack({
          delta: 1
        });
      } else {
        common_vendor.index.showToast({
          icon: "error",
          title: "\u6682\u65F6\u65E0\u6CD5\u4FEE\u6539\u5FAE\u4FE1\u53F7\uFF0C\u8BF7\u7A0D\u540E\u518D\u5C1D\u8BD5"
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o([($event) => $data.wechatID = $event.detail.value, (...args) => $options.onIDInput && $options.onIDInput(...args)]),
    b: $data.wechatID,
    c: common_vendor.o((...args) => $options.confirm && $options.confirm(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/cssa/cssa-miniprogram/pages/index/updateID.vue"]]);
wx.createPage(MiniProgramPage);
