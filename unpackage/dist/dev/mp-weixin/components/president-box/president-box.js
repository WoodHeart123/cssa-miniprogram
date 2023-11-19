"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: ["leader", "index"],
  name: "president-box",
  data() {
    return {};
  },
  methods: {
    open: function() {
      common_vendor.index.$emit("openPopUp", this.index);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $props.leader.image,
    b: common_vendor.t($props.leader.name),
    c: common_vendor.t($props.leader.postion),
    d: common_vendor.t($props.leader.intro),
    e: common_vendor.o(($event) => $options.open())
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/components/president-box/president-box.vue"]]);
wx.createComponent(Component);
