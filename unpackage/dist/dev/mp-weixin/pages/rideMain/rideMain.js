"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {
    rideBoxVue
  },
  data() {
    return {};
  },
  onLoad() {
    wx.cloud.init();
  },
  methods: {
    clickMenu: function(e) {
      this.menuIndex = e;
    },
    toPostRide: function() {
      common_vendor.index.navigateTo({
        url: "/pages/ride/ridePost"
      });
    },
    toggle(type) {
      this.type = type;
      this.$refs.popup.open(type);
    }
  }
};
const rideBoxVue = () => "../../components/ride-box/ride-box.js";
if (!Array) {
  const _component_rideBoxVue = common_vendor.resolveComponent("rideBoxVue");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  (_component_rideBoxVue + _easycom_uni_load_more2 + _easycom_uni_fab2)();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_fab = () => "../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
if (!Math) {
  (_easycom_uni_load_more + _easycom_uni_fab)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.clickMenu(0)),
    b: _ctx.menuIndex == 0 ? 1 : "",
    c: common_vendor.f(_ctx.rideList, (rideInfo, index, i0) => {
      return {
        a: "c727944e-0-" + i0,
        b: common_vendor.p({
          rideInfo
        }),
        c: index
      };
    }),
    d: common_vendor.p({
      status: _ctx.status
    }),
    e: common_vendor.o((...args) => _ctx.refresh && _ctx.refresh(...args)),
    f: _ctx.triggered,
    g: common_vendor.o((...args) => _ctx.onScrollLower && _ctx.onScrollLower(...args)),
    h: common_vendor.o($options.toPostRide),
    i: common_vendor.p({
      pattern: _ctx.pattern,
      horizontal: "right",
      vertical: "bottom",
      popMene: "false"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/cssa/cssa-miniprogram/pages/rideMain/rideMain.vue"]]);
wx.createPage(MiniProgramPage);
