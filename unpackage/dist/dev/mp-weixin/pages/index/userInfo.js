"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      userInfo: {}
    };
  },
  onShow() {
    common_vendor.index.getStorage({
      key: "userInfo-2",
      success: (res) => {
        this.userInfo = res.data;
        console.log(res.data);
      }
    });
  },
  methods: {
    toEmail: function() {
      common_vendor.index.navigateTo({
        url: "/pages/index/updateEmail"
      });
    },
    toStudentAuth: function() {
      if (this.userInfo.isStudent) {
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/studentAuth/studentAuth"
      });
    },
    toID: function() {
      common_vendor.index.navigateTo({
        url: "./updateID"
      });
    },
    toName: function() {
      common_vendor.index.navigateTo({
        url: "./updateName"
      });
    },
    toChangeAvatar: function() {
      common_vendor.index.navigateTo({
        url: "/pages/changeAvatar/changeAvatar?avatar=" + encodeURIComponent(JSON.stringify(this.userInfo.avatar))
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/" + this.userInfo.avatar + ".jpg",
    b: common_vendor.o((...args) => $options.toChangeAvatar && $options.toChangeAvatar(...args)),
    c: common_vendor.t(this.userInfo.isStudent ? "已认证√" : "暂无认证"),
    d: !this.userInfo.isStudent
  }, !this.userInfo.isStudent ? {} : {}, {
    e: common_vendor.o((...args) => $options.toStudentAuth && $options.toStudentAuth(...args)),
    f: common_vendor.t(this.userInfo.nickname),
    g: common_vendor.o((...args) => $options.toName && $options.toName(...args)),
    h: common_vendor.t(this.userInfo.wechatID ? this.userInfo.wechatID : "无"),
    i: common_vendor.o((...args) => $options.toID && $options.toID(...args)),
    j: common_vendor.t(this.userInfo.email ? this.userInfo.email : "无"),
    k: common_vendor.o((...args) => $options.toEmail && $options.toEmail(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/pages/index/userInfo.vue"]]);
wx.createPage(MiniProgramPage);
