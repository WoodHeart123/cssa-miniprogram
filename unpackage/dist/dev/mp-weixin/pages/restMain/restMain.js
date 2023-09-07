"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {
    restBoxVue
  },
  data() {
    return {
      triggered: false,
      restList: [],
      offset: 0,
      limit: 20,
      status: "loading"
    };
  },
  onLoad() {
    wx.cloud.init();
    this.refresh();
    console.log("init");
  },
  methods: {
    toSearch: function() {
      common_vendor.index.navigateTo({
        url: "/pages/restMain/restSearch",
        animationType: "pop-in"
      });
    },
    refresh: function() {
      if (!this.triggered) {
        this.triggered = true;
      } else {
        return;
      }
      this.limit = 20;
      this.offset = 0;
      this.status = "loading";
      this.restList = [];
      this.getRestList();
    },
    onScrollLower: function() {
      this.status = "loading";
      this.getRestList();
    },
    async getRestList() {
      const res = await wx.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
        },
        path: `/restaurant/getRestaurantList?limit=${this.limit}&offset=${this.offset}`,
        method: "GET",
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        }
      });
      if (res.data.status == 100) {
        this.restList = this.restList.concat(res.data.data);
      }
      if (res.data.data.length == 0) {
        this.status = "noMore";
      } else {
        this.status = "more";
      }
      this.$nextTick(() => {
        this.triggered = false;
      });
    }
  }
};
const restBoxVue = () => "../../components/rest-box/rest-box.js";
if (!Array) {
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  _easycom_uni_rate2();
}
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
if (!Math) {
  _easycom_uni_rate();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.toSearch && $options.toSearch(...args)),
    b: common_vendor.f($data.restList, (rest, index, i0) => {
      return {
        a: common_vendor.t(rest.name),
        b: common_vendor.t(rest.location),
        c: common_vendor.t(rest.avgPrice),
        d: "3c2a2d59-0-" + i0,
        e: common_vendor.p({
          value: rest.avgRating,
          allowHalf: "true",
          size: 15,
          max: 5
        }),
        f: common_vendor.t(rest.avgRating),
        g: common_vendor.t(rest.commentCount),
        h: index
      };
    }),
    c: common_vendor.o((...args) => $options.refresh && $options.refresh(...args)),
    d: $data.triggered,
    e: common_vendor.o((...args) => $options.onScrollLower && $options.onScrollLower(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/cssa/cssa-miniprogram/pages/restMain/restMain.vue"]]);
wx.createPage(MiniProgramPage);
