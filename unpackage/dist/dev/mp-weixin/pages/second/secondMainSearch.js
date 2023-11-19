"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {
    productBoxVue
  },
  data() {
    return {
      searchValue: "",
      historyList: [],
      searching: false,
      showResult: false,
      suggestList: [],
      resultList: [],
      status: "more",
      showLoading: false,
      limit: 20,
      offset: 0,
      hide: false,
      triggered: false
    };
  },
  onHide() {
    this.hide = true;
  },
  onLoad() {
    common_vendor.wx$1.cloud.init();
    this.historyList = common_vendor.index.getStorageSync("historyList");
    if (!this.historyList) {
      common_vendor.index.setStorageSync("historyList", []);
    }
  },
  methods: {
    onFocus: function() {
      if (!this.hide) {
        this.showResult = false;
      }
    },
    onCancel: function() {
      common_vendor.index.navigateBack();
    },
    searchBarInput: function(e) {
      console.log(e);
      clearTimeout(this.timer);
      if (e.length == 0) {
        this.searching = false;
      } else {
        this.searching = true;
        this.timer = setTimeout(() => {
          this.suggestList = [];
          this.suggest(e);
        }, 200);
      }
    },
    suggest: async function(value) {
      this.status = "loading";
      this.showLoading = true;
      const res = await common_vendor.wx$1.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
        },
        path: "/secondhand/suggest?value=" + encodeURIComponent(value),
        method: "GET",
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        }
      });
      if (res.data.status && res.data.status == 100) {
        this.suggestList = res.data.data;
      } else {
        common_vendor.index.showModal({
          content: "搜索服务暂时不可用"
        });
      }
      this.showLoading = false;
    },
    confirm: function(value) {
      this.searchValue = value;
      this.refresh();
    },
    getSearchList: async function() {
      this.status = "loading";
      const res = await common_vendor.wx$1.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
        },
        path: `/secondhand/search?value=${encodeURIComponent(this.searchValue)}&limit=${this.limit}&offset=${this.offset}`,
        method: "GET",
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        }
      });
      if (res.data.status && res.data.status == 100) {
        this.resultList = res.data.data;
        if (res.data.data.length != this.limit) {
          this.status = "noMore";
        } else {
          this.status = "more";
          this.offset += 20;
        }
      } else if (res.data.status && res.data.status == 124) {
        this.status = "noMore";
        common_vendor.index.showToast({
          title: "暂时无法搜索到相关二手"
        });
      } else {
        common_vendor.index.showModal({
          content: "搜索服务暂时不可用",
          success: function(res2) {
            if (res2.confirm) {
              common_vendor.index.navigateBack();
            }
          }
        });
      }
      this.$nextTick(() => {
        this.triggered = false;
      });
    },
    onScrollLower: function() {
      if (this.status != "noMore") {
        this.getSearchList();
      }
    },
    refresh: function() {
      this.showResult = true;
      this.offset = 0;
      this.limit = 20;
      this.triggered = true;
      this.getSearchList();
    },
    onConfirm: async function() {
      if (this.historyList.indexOf(this.searchValue) == -1) {
        this.historyList.push(this.searchValue);
        common_vendor.index.setStorage({
          key: "historyList",
          data: this.historyList
        });
      }
      this.refresh();
    },
    onClickHistory: function(index) {
      this.searchValue = this.historyList[index];
      this.refresh();
    },
    clearHistoryList: function(index) {
      common_vendor.index.showModal({
        content: "是否确认删除历史信息，数据不可恢复",
        success: function(res) {
          console.log(res);
          if (res.confirm) {
            this.historyList = [];
            common_vendor.index.setStorageSync("historyList", []);
          }
        }
      });
    }
  }
};
const productBoxVue = () => "../../components/product-box/product-box.js";
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _component_productBoxVue = common_vendor.resolveComponent("productBoxVue");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_search_bar2 + _component_productBoxVue + _easycom_uni_load_more2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_load_more)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.onFocus),
    b: common_vendor.o($options.searchBarInput),
    c: common_vendor.o($options.onConfirm),
    d: common_vendor.o($options.onCancel),
    e: common_vendor.o(($event) => $data.searchValue = $event),
    f: common_vendor.p({
      placeholder: "搜索商品",
      focus: "true",
      modelValue: $data.searchValue
    }),
    g: $data.historyList.length != 0 && !$data.searching && !$data.showResult
  }, $data.historyList.length != 0 && !$data.searching && !$data.showResult ? {
    h: $data.historyList.length != 0,
    i: common_vendor.o((...args) => $options.clearHistoryList && $options.clearHistoryList(...args)),
    j: common_vendor.f($data.historyList, (history, index, i0) => {
      return {
        a: common_vendor.t(history),
        b: common_vendor.o(($event) => $options.onClickHistory(index))
      };
    })
  } : {}, {
    k: !$data.showResult
  }, !$data.showResult ? {
    l: common_vendor.f($data.suggestList, (suggest, index, i0) => {
      return {
        a: common_vendor.t(suggest),
        b: common_vendor.o(($event) => $options.confirm(suggest))
      };
    })
  } : {}, {
    m: common_vendor.f($data.resultList, (product, index, i0) => {
      return {
        a: "4a65d052-1-" + i0,
        b: common_vendor.p({
          product
        })
      };
    }),
    n: common_vendor.p({
      status: $data.status,
      color: "#9b0000"
    }),
    o: common_vendor.o((...args) => $options.refresh && $options.refresh(...args)),
    p: $data.triggered,
    q: common_vendor.o((...args) => $options.onScrollLower && $options.onScrollLower(...args)),
    r: $data.showResult,
    s: $data.showLoading,
    t: common_vendor.p({
      status: $data.status,
      color: "#9b0000"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/pages/second/secondMainSearch.vue"]]);
wx.createPage(MiniProgramPage);
