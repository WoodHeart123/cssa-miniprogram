"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "",
      information: ""
    };
  },
  methods: {
    handleImageUpload(event) {
    }
  }
};
if (!Array) {
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  _easycom_uni_forms2();
}
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  _easycom_uni_forms();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.title,
    b: common_vendor.o(($event) => $data.title = $event.detail.value),
    c: $data.information,
    d: common_vendor.o(($event) => $data.information = $event.detail.value),
    e: common_vendor.o((...args) => _ctx.submitPost && _ctx.submitPost(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/pages/findFriendPost/findFriendPost.vue"]]);
wx.createPage(MiniProgramPage);
