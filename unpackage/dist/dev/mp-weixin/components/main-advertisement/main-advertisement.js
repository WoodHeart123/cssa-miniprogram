"use strict";
const common_vendor = require("../../common/vendor.js");
const __default__ = {
  name: "main-advertisement",
  props: ["height", "width"],
  data() {
    return {
      images: [
        "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-main/cssa3.png"
      ],
      detailImages: [
        "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-main/cssa1-detail.jpg"
      ],
      current: 0
    };
  },
  onLoad() {
    setInterval(() => {
      this.current = (this.current + 1) % this.images.length;
    }, 1e4);
  },
  methods: {
    change: function(e) {
      this.current = e.detail.current;
    },
    toPreview: function() {
      common_vendor.wx$1.previewImage({
        current: this.detailImages[this.current],
        urls: this.detailImages
      });
    }
  }
};
const __injectCSSVars__ = () => {
  common_vendor.useCssVars((_ctx) => ({
    "5b54e7d9": _ctx.height,
    "19798e58": _ctx.width
  }));
};
const __setup__ = __default__.setup;
__default__.setup = __setup__ ? (props, ctx) => {
  __injectCSSVars__();
  return __setup__(props, ctx);
} : __injectCSSVars__;
const _sfc_main = __default__;
if (!Array) {
  const _easycom_uni_swiper_dot2 = common_vendor.resolveComponent("uni-swiper-dot");
  _easycom_uni_swiper_dot2();
}
const _easycom_uni_swiper_dot = () => "../../uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot.js";
if (!Math) {
  _easycom_uni_swiper_dot();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.images, (image, index, i0) => {
      return {
        a: image,
        b: common_vendor.o((...args) => $options.toPreview && $options.toPreview(...args), index),
        c: index
      };
    }),
    b: common_vendor.o((...args) => $options.change && $options.change(...args)),
    c: $data.current,
    d: common_vendor.p({
      info: $data.images,
      current: $data.current,
      mode: "dot",
      field: "content"
    }),
    e: common_vendor.s(_ctx.__cssVars())
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/components/main-advertisement/main-advertisement.vue"]]);
wx.createComponent(Component);
