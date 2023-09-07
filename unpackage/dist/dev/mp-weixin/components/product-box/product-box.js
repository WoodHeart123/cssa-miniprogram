"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: ["product"],
  name: "product-box",
  data() {
    return {
      condition: ["\u5168\u65B0", "\u51E0\u4E4E\u5168\u65B0", "\u660E\u663E\u4F7F\u7528\u75D5\u8FF9", "\u90E8\u5206\u635F\u6BC1"],
      delivery: {
        "pickup": "\u81EA\u53D6",
        "deliver": "\u9001\u8D27",
        "all": "\u9001/\u53D6"
      },
      productPublishTime: ""
    };
  },
  mounted() {
    if (common_vendor.moment().year() - common_vendor.moment.utc(this.product.UTCtime).year() > 0) {
      this.productPublishTime = common_vendor.moment.utc(this.product.UTCtime).format("YYYY-MM-DD");
    } else if (Date.now() - common_vendor.moment.utc(this.product.UTCtime).valueOf() > 864e5 * 7) {
      this.productPublishTime = common_vendor.moment.utc(this.product.UTCtime).format("MM-DD");
    } else {
      this.productPublishTime = common_vendor.moment.utc(this.product.UTCtime).locale("zh-cn").fromNow();
    }
  },
  methods: {
    toSecondDetail: function() {
      common_vendor.index.navigateTo({
        url: "/pages/detail/secondDetail?product=" + encodeURIComponent(JSON.stringify(this.product))
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $props.product.images[0],
    b: common_vendor.t(this.delivery[$props.product.delivery]),
    c: common_vendor.t($props.product.productTitle),
    d: common_vendor.t("$" + $props.product.price),
    e: common_vendor.t(this.condition[$props.product.productCondition]),
    f: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/" + this.product.sellerAvatar + ".jpg",
    g: common_vendor.t($props.product.sellerNickname),
    h: common_vendor.t(this.productPublishTime),
    i: common_vendor.o((...args) => $options.toSecondDetail && $options.toSecondDetail(...args))
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/cssa/cssa-miniprogram/components/product-box/product-box.vue"]]);
wx.createComponent(Component);
