"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: ["product"],
  data() {
    return {
      condition: ["\u5168\u65B0", "\u51E0\u4E4E\u5168\u65B0", "\u660E\u663E\u4F7F\u7528\u75D5\u8FF9", "\u90E8\u5206\u635F\u6BC1"],
      delivery: {
        "pickup": "\u81EA\u53D6",
        "deliver": "\u9001\u8D27",
        "all": "\u9001/\u53D6"
      }
    };
  },
  methods: {
    bindClick() {
      console.log(this.product.productID);
      this.$emit("delete", this.product.productID);
      common_vendor.index.showToast({
        title: "\u5DF2\u5220\u9664"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  (_easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2)();
}
const _easycom_uni_swipe_action_item = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.js";
if (!Math) {
  (_easycom_uni_swipe_action_item + _easycom_uni_swipe_action)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $props.product.images[0],
    b: common_vendor.t(this.delivery[$props.product.delivery]),
    c: common_vendor.t($props.product.productTitle),
    d: common_vendor.t("$" + $props.product.price),
    e: common_vendor.t(this.condition[$props.product.productCondition]),
    f: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/" + this.product.sellerAvatar + ".jpg",
    g: common_vendor.t($props.product.sellerNickname),
    h: common_vendor.o((...args) => _ctx.toSecondDetail && _ctx.toSecondDetail(...args)),
    i: common_vendor.o(($event) => $options.bindClick()),
    j: common_vendor.o($options.bindClick)
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/cssa/cssa-miniprogram/components/shoucang-box/shoucang-box.vue"]]);
wx.createComponent(Component);
