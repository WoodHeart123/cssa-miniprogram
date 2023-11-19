"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: ["product"],
  name: "product-box",
  data() {
    return {
      condition: ["全新", "几乎全新", "明显使用痕迹", "部分损毁"],
      delivery: {
        "pickup": "自取",
        "deliver": "送货",
        "all": "送/取"
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
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/components/product-box/product-box.vue"]]);
wx.createComponent(Component);
