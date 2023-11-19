"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: ["product"],
  data() {
    return {
      condition: ["全新", "几乎全新", "明显使用痕迹", "部分损毁"],
      delivery: {
        "pickup": "自取",
        "deliver": "送货",
        "all": "送/取"
      }
    };
  },
  methods: {
    bindClick() {
      console.log(this.product.productID);
      this.$emit("delete", this.product.productID);
      common_vendor.index.showToast({
        title: "已删除"
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
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/components/shoucang-box/shoucang-box.vue"]]);
wx.createComponent(Component);
