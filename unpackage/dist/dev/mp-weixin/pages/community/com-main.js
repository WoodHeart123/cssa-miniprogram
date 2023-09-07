"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {
    comBoxVue
  },
  data() {
    return {
      comDetailList: [
        {
          title: "Madison\u5468\u56F4\u90FD\u6709\u4EC0\u4E48\u597D\u73A9\u7684\u5462",
          content: "Madison\u5468\u56F4\u90FD\u6709\u4EC0\u4E48\u597D\u73A9\u7684\u5462\uFF0C\u6709\u8C01\u63A8\u8350\u4E00\u4E0B\u5417\uFF0C\u5982\u679C\u6709\u63A8\u8350\u53EF\u4EE5\u8054\u7CFB\u6211\uFF1A123456789. \u5927\u5BB6\u53EF\u4EE5\u4E00\u8D77\u73A9\uFF0C\u5F00\u5FC3\u6700\u91CD\u8981\u4E86\u3002",
          shrinkContent: "",
          imageUrls: ["https://cssa-mini.oss-cn-shanghai.aliyuncs.com/cssa-community-image/renwu.jpeg"]
        },
        {
          title: "Madison\u5468\u56F4\u90FD\u6709\u4EC0\u4E48\u597D\u73A9\u7684\u5462Madison\u5468\u56F4\u90FD\u6709\u4EC0\u4E48\u597D\u73A9\u7684\u5462Madison\u5468\u56F4\u90FD\u6709\u4EC0\u4E48\u597D\u73A9\u7684\u5462",
          content: "Madison\u5468\u56F4\u90FD\u6709\u4EC0\u4E48\u597D\u73A9\u7684\u5462\u3002",
          shrinkContent: "",
          imageUrls: [
            "https://cssa-mini.oss-cn-shanghai.aliyuncs.com/cssa-community-image/renwu.jpeg",
            "https://cssa-mini.oss-cn-shanghai.aliyuncs.com/cssa-community-image/renwu.jpeg"
          ]
        },
        {
          title: "Madison\u5468\u56F4\u90FD\u6709\u4EC0\u4E48\u597D\u73A9\u7684\u5462Madison\u5468\u56F4\u90FD\u6709\u4EC0\u4E48\u597D\u73A9\u7684\u5462Madison\u5468\u56F4\u90FD\u6709\u4EC0\u4E48\u597D\u73A9\u7684\u5462",
          content: "Madison\u5468\u56F4\u90FD\u6709\u4EC0\u4E48\u597D\u73A9\u7684\u5462\uFF0C\u6709\u8C01\u63A8\u8350\u4E00\u4E0B\u5417\uFF0C\u5982\u679C\u6709\u63A8\u8350\u53EF\u4EE5\u8054\u7CFB\u6211\uFF1A123456789. \u5927\u5BB6\u53EF\u4EE5\u4E00\u8D77\u73A9\uFF0C\u5F00\u5FC3\u6700\u91CD\u8981\u4E86,Madison\u5468\u56F4\u90FD\u6709\u4EC0\u4E48\u597D\u73A9\u7684\u5462\uFF0C\u6709\u8C01\u63A8\u8350\u4E00\u4E0B\u5417\uFF0C\u5982\u679C\u6709\u63A8\u8350\u53EF\u4EE5\u8054\u7CFB\u6211\uFF1A123456789. \u5927\u5BB6\u53EF\u4EE5\u4E00\u8D77\u73A9\uFF0C\u5F00\u5FC3\u6700\u91CD\u8981\u4E86",
          shrinkContent: "",
          imageUrls: [
            "https://cssa-mini.oss-cn-shanghai.aliyuncs.com/cssa-community-image/renwu.jpeg",
            "https://cssa-mini.oss-cn-shanghai.aliyuncs.com/cssa-community-image/renwu.jpeg",
            "https://cssa-mini.oss-cn-shanghai.aliyuncs.com/cssa-community-image/renwu.jpeg"
          ]
        },
        {
          title: "Madison\u5468\u56F4\u90FD\u6709\u4EC0\u4E48\u597D\u73A9\u7684\u5462Madison\u5468\u56F4\u90FD\u6709\u4EC0\u4E48\u597D\u73A9\u7684\u5462Madison\u5468\u56F4\u90FD\u6709\u4EC0\u4E48\u597D\u73A9\u7684\u5462",
          content: "Madison\u5468\u56F4\u90FD\u6709\u4EC0\u4E48\u597D\u73A9\u7684\u5462\uFF0C\u6709\u8C01\u63A8\u8350\u4E00\u4E0B\u5417\uFF0C\u5982\u679C\u6709\u63A8\u8350\u53EF\u4EE5\u8054\u7CFB\u6211\uFF1A123456789. \u5927\u5BB6\u53EF\u4EE5\u4E00\u8D77\u73A9\uFF0C\u5F00\u5FC3\u6700\u91CD\u8981\u4E86,Madison\u5468\u56F4\u90FD\u6709\u4EC0\u4E48\u597D\u73A9\u7684\u5462\uFF0C\u6709\u8C01\u63A8\u8350\u4E00\u4E0B\u5417\u3002",
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
      console.log("\u5F00\u59CB\u52A0\u8F7D");
    },
    loadMore: function() {
      console.log("\u52A0\u8F7D\u66F4\u591A");
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
        a: "38e042d1-1-" + i0,
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
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/cssa/cssa-miniprogram/pages/community/com-main.vue"]]);
wx.createPage(MiniProgramPage);
