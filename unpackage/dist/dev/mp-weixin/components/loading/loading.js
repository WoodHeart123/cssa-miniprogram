"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "loading",
  props: ["show"]
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.show
  }, $props.show ? {} : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/components/loading/loading.vue"]]);
wx.createComponent(Component);
