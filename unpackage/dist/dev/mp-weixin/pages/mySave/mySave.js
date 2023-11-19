"use strict";
const common_vendor = require("../../common/vendor.js");
const shoucangBoxVue = () => "../../components/shoucang-box/shoucang-box.js";
const _sfc_main = {
  components: {
    shoucangBoxVue
  },
  data() {
    return {
      collectList: [],
      triggered: false,
      status: "loading",
      limit: 20,
      offset: 0
    };
  },
  onLoad() {
    common_vendor.wx$1.cloud.init();
    this.refresh();
  },
  methods: {
    refresh: function() {
      if (!this.triggered) {
        this.triggered = true;
        this.limit = 20;
        this.offset = 0;
        this.rentalList = [];
        this.status = "loading";
        this.getCollectList();
      }
    },
    onScrollLower: function() {
      this.status = "loading";
      this.limit += 10;
      console.log("success");
      this.status = "noMore";
    }
  }
};
if (!Array) {
  const _component_shoucang_box_vue = common_vendor.resolveComponent("shoucang-box-vue");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_component_shoucang_box_vue + _easycom_uni_load_more2)();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  _easycom_uni_load_more();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.collectList, (collect, index, i0) => {
      return {
        a: "94ffa154-0-" + i0,
        b: common_vendor.p({
          product: collect
        })
      };
    }),
    b: common_vendor.o(_ctx.receive),
    c: common_vendor.p({
      status: $data.status
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/pages/mySave/mySave.vue"]]);
wx.createPage(MiniProgramPage);
