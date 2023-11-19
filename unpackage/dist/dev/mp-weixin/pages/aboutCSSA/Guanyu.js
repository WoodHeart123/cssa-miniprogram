"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // scoller downwards
      scrollTop: 0,
      old: {
        scrollTop: 0
      }
    };
  },
  methods: {
    // scoller downwards
    upper: function(e) {
      console.log(e);
    },
    lower: function(e) {
      console.log(e);
    },
    scroll: function(e) {
      console.log(e);
      this.old.scrollTop = e.detail.scrollTop;
    },
    goTop: function(e) {
      this.scrollTop = this.old.scrollTop;
      this.$nextTick(function() {
        this.scrollTop = 0;
      });
      common_vendor.index.showToast({
        icon: "none",
        title: "已返回顶部"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/pages/aboutCSSA/Guanyu.vue"]]);
wx.createPage(MiniProgramPage);
