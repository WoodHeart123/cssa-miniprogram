"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: ["comDetail"],
  data() {
    return {
      isShow: false,
      shrinkContent: ""
    };
  },
  onLoad() {
    this.comDetail.imageNum = this.comDetail.imageUrls.length;
    console.log(this.comDetail.imageNum);
    console.log(this.comDetail.content);
    var contentLength = this.comDetail.content.length;
    if (contentLength > 100) {
      this.isShow = true;
      this.comDetail.shrinkContent = this.comDetail.content.substr(0, 100) + "...";
    } else {
      this.isShow = false;
      this.comDetail.shrinkContent = this.comDetail.content;
    }
  },
  methods: {
    toggleDescription: function() {
      if (this.isShow) {
        this.isShow = false;
        this.comDetail.shrinkContent = this.comDetail.content;
      } else {
        this.isShow = true;
        this.comDetail.shrinkContent = this.comDetail.content.substr(0, 100) + "...";
      }
    },
    previewImage: function() {
      common_vendor.index.previewImage({
        current: this.comDetail.imageUrls[0],
        urls: this.comDetail.imageUrls
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t(this.comDetail.nickname),
    b: common_vendor.t(this.comDetail.title),
    c: common_vendor.t(this.comDetail.shrinkContent),
    d: this.comDetail.content != null && this.comDetail.content.length > 100
  }, this.comDetail.content != null && this.comDetail.content.length > 100 ? common_vendor.e({
    e: $data.isShow
  }, $data.isShow ? {
    f: common_vendor.o((...args) => $options.toggleDescription && $options.toggleDescription(...args))
  } : {}) : {}, {
    g: this.comDetail.imageUrls.length == 1
  }, this.comDetail.imageUrls.length == 1 ? {
    h: common_vendor.f($props.comDetail.imageUrls, (url, index, i0) => {
      return {
        a: url
      };
    }),
    i: common_vendor.o((...args) => $options.previewImage && $options.previewImage(...args))
  } : {
    j: common_vendor.f(this.comDetail.imageUrls, (url, index, i0) => {
      return {
        a: url
      };
    }),
    k: common_vendor.o((...args) => $options.previewImage && $options.previewImage(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/components/com-box/com-box.vue"]]);
wx.createComponent(Component);
