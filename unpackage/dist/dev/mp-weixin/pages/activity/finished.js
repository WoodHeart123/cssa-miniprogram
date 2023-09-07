"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  methods: {
    jumpToHomePage() {
      wx.switchTab({
        url: "/pages/activity/act"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.jumpToHomePage && $options.jumpToHomePage(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/cssa/cssa-miniprogram/pages/activity/finished.vue"]]);
wx.createPage(MiniProgramPage);
