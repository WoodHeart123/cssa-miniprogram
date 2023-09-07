"use strict";
var common_vendor = require("../../common/vendor.js");
var common_assets = require("../../common/assets.js");
const _sfc_main = {
  props: ["actDetail", "ifJoined"],
  name: "act-box",
  data() {
    return {};
  },
  computed: {
    actDateFormat() {
      return common_vendor.hooks(this.actDetail.startDate).format("YYYY-MM-DD h:mm a");
    }
  },
  methods: {
    toDetail: function() {
      common_vendor.index.navigateTo({
        url: "/pages/detail/detail?actDetail=" + encodeURIComponent(JSON.stringify(this.actDetail))
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0,
    b: common_vendor.t(this.actDetail.title),
    c: !$props.ifJoined
  }, !$props.ifJoined ? {
    d: "url(" + this.actDetail.imgs + ")"
  } : {}, {
    e: common_vendor.t(this.actDetail.location),
    f: common_vendor.t($options.actDateFormat),
    g: $props.ifJoined
  }, $props.ifJoined ? {
    h: common_vendor.t(this.actDetail.price)
  } : {}, {
    i: common_vendor.o((...args) => $options.toDetail && $options.toDetail(...args))
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/cssa/cssa-miniprogram/components/act-box/act-box.vue"]]);
wx.createComponent(Component);
