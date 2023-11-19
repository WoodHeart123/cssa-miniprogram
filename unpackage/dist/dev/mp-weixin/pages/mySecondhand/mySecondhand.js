"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  onLoad() {
    common_vendor.index.startPullDownRefresh();
  },
  onShow() {
    common_vendor.index.$on("uploadSecondSuccess", this.uploadSecondSuccess);
    common_vendor.index.$on("mySecondhandDelete", this.delete);
    common_vendor.index.$on("mySecondhandRefresh", this.refresh);
    this.userInfo = common_vendor.index.getStorageSync("userInfo-2");
  },
  data() {
    return {
      show: false,
      offset: 0,
      limit: 20,
      status: "more",
      mySecondhand: [],
      product: [],
      contentText: {
        contentdown: "上拉显示更多",
        contentrefresh: "正在加载...",
        contentnomore: "没有更多了"
      }
    };
  },
  components: {
    userProductBoxVue
  },
  onPullDownRefresh() {
    console.log(1);
    this.limit = 20;
    this.offset = 0;
    this.status = "more";
    this.mySecondhand = [];
    this.getMySecondhand();
  },
  methods: {
    delete: function(index) {
      this.mySecondhand.splice(index, 1);
    },
    uploadSecondSuccess: function() {
      common_vendor.index.startPullDownRefresh();
      common_vendor.index.showToast({
        title: "更新成功",
        duration: 5e3
      });
    },
    getMySecondhand: async function() {
      if (this.status == "noMore") {
        return;
      }
      this.status = "loading";
      const res = await common_vendor.wx$1.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
        },
        path: `/user/getMySecondhand?limit=${this.limit}&offset=${this.offset}`,
        method: "GET",
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        }
      });
      if (res.data.status == 100) {
        if (res.data.data.length < this.limit) {
          this.status = "noMore";
        }
        for (let i = 0; i < res.data.data.length; i++) {
          res.data.data[i].sellerAvatar = this.userInfo.avatar;
          res.data.data[i].sellerNickname = this.userInfo.nickname;
        }
        this.offset += this.limit;
      }
      this.mySecondhand = this.mySecondhand.concat(res.data.data);
      common_vendor.index.stopPullDownRefresh();
    },
    refresh: function() {
      common_vendor.index.startPullDownRefresh();
    }
  }
};
const userProductBoxVue = () => "../../components/user-product-box/user-product-box.js";
if (!Array) {
  const _component_userProductBoxVue = common_vendor.resolveComponent("userProductBoxVue");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_component_userProductBoxVue + _easycom_uni_load_more2)();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  _easycom_uni_load_more();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.mySecondhand, (product, index, i0) => {
      return {
        a: "b0f60bd4-0-" + i0,
        b: common_vendor.p({
          product,
          index
        }),
        c: index
      };
    }),
    b: common_vendor.p({
      status: $data.status,
      contentText: $data.contentText
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/pages/mySecondhand/mySecondhand.vue"]]);
wx.createPage(MiniProgramPage);
