"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      userInfo: {},
      wechatID: "",
      hasID: false
    };
  },
  onShow() {
    common_vendor.wx$1.cloud.init();
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
          title: "微信号不应为空"
        });
      }
      const res = await common_vendor.wx$1.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
          // 微信云托管的环境ID
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
          title: "暂时无法修改微信号，请稍后再尝试"
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/pages/index/updateID.vue"]]);
wx.createPage(MiniProgramPage);
