"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // swiper
      indicatorDots: true,
      autoplay: true,
      interval: 2e3,
      duration: 500,
      // scoller downwards
      scrollTop: 0,
      old: {
        scrollTop: 0
      },
      orderTypeLise: [
        //name-标题 icon-图标
        {
          name: "CSSA详情",
          icon: "group icon.jpg"
        }
      ]
    };
  },
  methods: {
    // swiper 
    changeAutoplay(e) {
      this.autoplay = !this.autoplay;
    },
    intervalChange(e) {
      this.interval = e.target.value;
    },
    durationChange(e) {
      this.duration = e.target.value;
    },
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/pages/aboutCSSA/aboutCSSA.vue"]]);
wx.createPage(MiniProgramPage);
