"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "welcome",
  methods: {
    toUserInfo: function() {
      common_vendor.index.$emit("closeWelcome", { msg: "页面关闭" });
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
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/components/welcome/welcome.vue"]]);
wx.createComponent(Component);
