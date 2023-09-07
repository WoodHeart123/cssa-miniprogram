"use strict";
var common_vendor = require("../../common/vendor.js");
const productTypeList = [{ name: "\u5168\u90E8", type: "ALL" }, {
  name: "\u7535\u5B50\u4EA7\u54C1",
  type: "ELECTRONIC"
}, {
  name: "\u4EA4\u901A\u5DE5\u5177",
  type: "TRANSPORT"
}, {
  name: "\u5BB6\u5177\u5BB6\u7535",
  type: "FURNITURE"
}, {
  name: "\u865A\u62DF\u5361\u5238",
  type: "DIGITAL"
}, {
  name: "\u65E5\u5E38\u7528\u54C1",
  type: "DAILY"
}, {
  name: "\u7F8E\u5986\u670D\u9970",
  type: "MAKEUP"
}, {
  name: "\u4E66\u7C4D\u6559\u5177",
  type: "EDU"
}, {
  name: "\u5BA0\u7269\u7528\u54C1",
  type: "PET"
}, {
  name: "\u5176\u4ED6",
  type: "OTHERS"
}];
const _sfc_main = {
  components: {
    productBoxVue
  },
  data() {
    return {
      offset: 0,
      limit: 20,
      productTypeList,
      currentIndex: 0,
      pattern: {
        buttonColor: "#9b0000"
      },
      triggered: false,
      status: "loading",
      productList: [],
      contentText: {
        contentdown: "\u4E0A\u62C9\u663E\u793A\u66F4\u591A",
        contentrefresh: "\u6B63\u5728\u52A0\u8F7D...",
        contentnomore: "\u6CA1\u6709\u66F4\u591A\u5546\u54C1\u4E86"
      },
      isLogin: false
    };
  },
  onLoad() {
    wx.cloud.init();
    this.refresh();
  },
  onShow() {
    common_vendor.index.$on("uploadSuccess", this.uploadSuccess);
    common_vendor.index.getStorage({
      key: "userInfo-2",
      success: () => {
        this.isLogin = true;
      }
    });
  },
  methods: {
    uploadSuccess: function() {
      this.refresh();
      common_vendor.index.showToast({
        title: "\u4E0A\u4F20\u6210\u529F"
      });
    },
    onClickMenu: function(index) {
      if (this.currentIndex != index) {
        this.currentIndex = index;
        this.refresh();
      }
    },
    refresh: function() {
      if (!this.triggered) {
        this.triggered = true;
        this.limit = 20;
        this.offset = 0;
        this.productList = [];
        this.status = "loading";
        this.getProductList();
      }
    },
    async login(name) {
      common_vendor.index.showLoading({
        mask: true
      });
      const res = await wx.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
        },
        path: "/user/login?nickname=" + encodeURI(name),
        method: "GET",
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        }
      });
      this.isLogin = true;
      common_vendor.index.setStorage({
        key: "userInfo-2",
        data: res.data.data
      });
      common_vendor.index.hideLoading();
      this.toPostProduct();
    },
    getProductList: async function() {
      if (this.status == "noMore") {
        return;
      }
      const res = await wx.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
        },
        path: `/secondhand/getProductList?productType=${this.productTypeList[this.currentIndex].type}&limit=${this.limit}&offset=${this.offset}`,
        method: "GET",
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        }
      });
      if (res.data.status == 100) {
        this.productList = this.productList.concat(res.data.data);
      }
      this.offset += res.data.data.length;
      if (res.data.data.length != this.limit) {
        this.status = "noMore";
      } else {
        this.status = "more";
      }
      this.$nextTick(() => {
        this.triggered = false;
      });
    },
    toPostProduct: function() {
      if (!this.isLogin) {
        common_vendor.index.showToast({
          title: "\u8BF7\u5148\u767B\u5F55",
          icon: "none"
        });
        common_vendor.index.getUserProfile({
          desc: "\u83B7\u53D6\u7528\u6237\u4FE1\u606F",
          success: (userProfile) => {
            this.login(userProfile.userInfo.nickName);
          },
          fail: () => {
            common_vendor.index.showToast({
              title: "\u8BF7\u5148\u767B\u9646",
              icon: "none"
            });
          }
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/second/secondMainPost"
      });
    },
    toSearch: function() {
      common_vendor.index.navigateTo({
        url: "/pages/second/secondMainSearch",
        animationType: "pop-in"
      });
    }
  }
};
const productBoxVue = () => "../../components/product-box/product-box.js";
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _component_productBoxVue = common_vendor.resolveComponent("productBoxVue");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  (_easycom_uni_icons2 + _component_productBoxVue + _easycom_uni_load_more2 + _easycom_uni_fab2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_fab = () => "../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_load_more + _easycom_uni_fab)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "search",
      size: "30"
    }),
    b: common_vendor.o((...args) => $options.toSearch && $options.toSearch(...args)),
    c: common_vendor.f($data.productTypeList, (productType, index, i0) => {
      return {
        a: common_vendor.t(productType.name),
        b: common_vendor.n($data.currentIndex == index ? "product-text selected" : "product-text"),
        c: index,
        d: common_vendor.o(($event) => $options.onClickMenu(index), index)
      };
    }),
    d: common_vendor.f($data.productList, (product, index, i0) => {
      return {
        a: "52f135d2-1-" + i0,
        b: common_vendor.p({
          product
        }),
        c: index
      };
    }),
    e: common_vendor.p({
      contentText: $data.contentText,
      status: $data.status
    }),
    f: common_vendor.o((...args) => $options.refresh && $options.refresh(...args)),
    g: $data.triggered,
    h: common_vendor.o((...args) => _ctx.onScrollLower && _ctx.onScrollLower(...args)),
    i: common_vendor.o($options.toPostProduct),
    j: common_vendor.p({
      pattern: $data.pattern,
      horizontal: "right",
      vertical: "bottom",
      popMene: "false"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/cssa/cssa-miniprogram/pages/second/secondMain.vue"]]);
wx.createPage(MiniProgramPage);
