"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "welcome",
  methods: {
    toUserInfo: function() {
      common_vendor.index.$emit("closeWelcome", { msg: "\u9875\u9762\u5173\u95ED" });
      common_vendor.index.navigateTo({
        url: "/pages/index/userInfo"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.toUserInfo && $options.toUserInfo(...args))
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/cssa/cssa-miniprogram/components/welcome/welcome.vue"]]);
wx.createComponent(Component);
