"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      indicatorDots: true,
      autoplay: true,
      interval: 2e3,
      duration: 500,
      scrollTop: 0,
      old: {
        scrollTop: 0
      },
      orderTypeLise: [
        {
          name: "CSSA\u8BE6\u60C5",
          icon: "group icon.jpg"
        }
      ]
    };
  },
  methods: {
    changeAutoplay(e) {
      this.autoplay = !this.autoplay;
    },
    intervalChange(e) {
      this.interval = e.target.value;
    },
    durationChange(e) {
      this.duration = e.target.value;
    },
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
        title: "\u5DF2\u8FD4\u56DE\u9876\u90E8"
      });
    },
    toPage: function(index) {
      if (index == 1) {
        common_vendor.index.navigateTo({
          url: "/pages/aboutCSSA/ContactUs"
        });
      }
      if (index == 0) {
        common_vendor.index.navigateTo({
          url: "/pages/aboutCSSA/Guanyu"
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.autoplay,
    b: $data.interval,
    c: $data.duration
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/cssa/cssa-miniprogram/pages/aboutCSSA/aboutCSSA.vue"]]);
wx.createPage(MiniProgramPage);
