"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: ["course"],
  name: "course-box",
  data() {
    return {};
  },
  methods: {
    toCoursePage: function() {
      common_vendor.index.navigateTo({
        url: "/pages/coursePage/coursePage?course=" + encodeURIComponent(JSON.stringify(this.course))
      });
    }
  }
};
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
    a: common_vendor.t($props.course.departmentAbrev + " " + String($props.course.courseNum)),
    b: common_vendor.t($props.course.courseName),
    c: common_vendor.p({
      readonly: "true",
      value: $props.course.avgDifficulty,
      allowHalf: "true",
      size: "15"
    }),
    d: common_vendor.t($props.course.avgDifficulty.toFixed(1)),
    e: common_vendor.p({
      readonly: "true",
      value: $props.course.avgPrefer,
      allowHalf: "true",
      size: "15"
    }),
    f: common_vendor.t($props.course.avgPrefer.toFixed(1)),
    g: common_vendor.t($props.course.commentCount == 0 ? "\u6682\u65F6\u65E0\u4EBA\u8BC4\u8BBA" : $props.course.commentCount.toString() + "\u4EBA\u53C2\u4E0E\u6B64\u8BC4\u8BBA"),
    h: common_vendor.o((...args) => $options.toCoursePage && $options.toCoursePage(...args))
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/cssa/cssa-miniprogram/components/course-box/course-box.vue"]]);
wx.createComponent(Component);
