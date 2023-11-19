"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {
    comBoxVue
  },
  data() {
    return {
      comDetailList: [
        {
          title: "Madison周围都有什么好玩的呢",
          content: "Madison周围都有什么好玩的呢，有谁推荐一下吗，如果有推荐可以联系我：123456789. 大家可以一起玩，开心最重要了。",
          shrinkContent: "",
          imageUrls: ["https://cssa-mini.oss-cn-shanghai.aliyuncs.com/cssa-community-image/renwu.jpeg"]
        },
        {
          title: "Madison周围都有什么好玩的呢Madison周围都有什么好玩的呢Madison周围都有什么好玩的呢",
          content: "Madison周围都有什么好玩的呢。",
          shrinkContent: "",
          imageUrls: [
            "https://cssa-mini.oss-cn-shanghai.aliyuncs.com/cssa-community-image/renwu.jpeg",
            "https://cssa-mini.oss-cn-shanghai.aliyuncs.com/cssa-community-image/renwu.jpeg"
          ]
        },
        {
          title: "Madison周围都有什么好玩的呢Madison周围都有什么好玩的呢Madison周围都有什么好玩的呢",
          content: "Madison周围都有什么好玩的呢，有谁推荐一下吗，如果有推荐可以联系我：123456789. 大家可以一起玩，开心最重要了,Madison周围都有什么好玩的呢，有谁推荐一下吗，如果有推荐可以联系我：123456789. 大家可以一起玩，开心最重要了",
          shrinkContent: "",
          imageUrls: [
            "https://cssa-mini.oss-cn-shanghai.aliyuncs.com/cssa-community-image/renwu.jpeg",
            "https://cssa-mini.oss-cn-shanghai.aliyuncs.com/cssa-community-image/renwu.jpeg",
            "https://cssa-mini.oss-cn-shanghai.aliyuncs.com/cssa-community-image/renwu.jpeg"
          ]
        },
        {
          title: "Madison周围都有什么好玩的呢Madison周围都有什么好玩的呢Madison周围都有什么好玩的呢",
          content: "Madison周围都有什么好玩的呢，有谁推荐一下吗，如果有推荐可以联系我：123456789. 大家可以一起玩，开心最重要了,Madison周围都有什么好玩的呢，有谁推荐一下吗。",
          shrinkContent: "",
          imageUrls: []
        }
      ],
      searching: false,
      pattern: {
        buttonColor: "#007AFF",
        iconColor: "#fff"
      }
    };
  },
  onload() {
    this.init();
    common_vendor.index.startPullDownRefresh();
  },
  onPullDownRefresh() {
    console.log("refresh");
    this.init();
    setTimeout(function() {
      common_vendor.index.stopPullDownRefresh();
    }, 1e3);
  },
  onReachBottom() {
    this.loadMore();
    this.init();
    common_vendor.index.showNavigationBarLoading();
    setTimeout(function() {
      common_vendor.index.hideNavigationBarLoading();
    }, 1e3);
  },
  methods: {
    init: function() {
      console.log("开始加载");
    },
    loadMore: function() {
      console.log("加载更多");
    },
    onFocus: function() {
      this.searching = true;
      console.log(this.searching);
    },
    onBlur: function() {
      this.searching = false;
    }
  }
};
const comBoxVue = () => "../../components/com-box/com-box.js";
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _component_com_box_vue = common_vendor.resolveComponent("com-box-vue");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  (_easycom_uni_search_bar2 + _component_com_box_vue + _easycom_uni_fab2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_fab = () => "../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_fab)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.onFocus),
    b: common_vendor.o($options.onBlur),
    c: common_vendor.o(($event) => _ctx.searchValue = $event),
    d: common_vendor.p({
      cancelButton: "none",
      modelValue: _ctx.searchValue
    }),
    e: common_vendor.f($data.comDetailList, (comDetail, index, i0) => {
      return {
        a: "528018f4-1-" + i0,
        b: common_vendor.p({
          comDetail
        })
      };
    }),
    f: common_vendor.p({
      pattern: $data.pattern,
      horizontal: "right",
      vertical: "bottom"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/pages/community/com-main.vue"]]);
wx.createPage(MiniProgramPage);
