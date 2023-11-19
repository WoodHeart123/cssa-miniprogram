"use strict";
const common_vendor = require("../../common/vendor.js");
const productTypeList = [{ name: "全部", type: "ALL" }, {
  name: "电子产品",
  type: "ELECTRONIC"
}, {
  name: "交通工具",
  type: "TRANSPORT"
}, {
  name: "家具家电",
  type: "FURNITURE"
}, {
  name: "虚拟卡券",
  type: "DIGITAL"
}, {
  name: "日常用品",
  type: "DAILY"
}, {
  name: "美妆服饰",
  type: "MAKEUP"
}, {
  name: "书籍教具",
  type: "EDU"
}, {
  name: "宠物用品",
  type: "PET"
}, {
  name: "其他",
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
        contentdown: "上拉显示更多",
        contentrefresh: "正在加载...",
        contentnomore: "没有更多商品了"
      },
      isLogin: false
    };
  },
  onLoad() {
    common_vendor.wx$1.cloud.init();
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
        title: "上传成功"
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
      const res = await common_vendor.wx$1.cloud.callContainer({
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
      const res = await common_vendor.wx$1.cloud.callContainer({
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
          title: "请先登录",
          icon: "none"
        });
        common_vendor.index.getUserProfile({
          desc: "获取用户信息",
          success: (userProfile) => {
            this.login(userProfile.userInfo.nickName);
          },
          fail: () => {
            common_vendor.index.showToast({
              title: "请先登陆",
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
        a: "32bc8f4f-1-" + i0,
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/pages/second/secondMain.vue"]]);
wx.createPage(MiniProgramPage);
