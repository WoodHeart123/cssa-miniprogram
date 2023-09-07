"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      avatar: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      currentAvatar: 0,
      orignalAvatar: 0,
      showConfirm: false
    };
  },
  onLoad(options) {
    this.currentAvatar = JSON.parse(decodeURIComponent(options.avatar));
    this.orignalAvatar = this.currentAvatar;
  },
  methods: {
    select: function(index) {
      this.currentAvatar = index;
      if (this.orignalAvatar != index) {
        this.showConfirm = true;
      } else {
        this.showConfirm = false;
      }
    },
    async changeAvatar() {
      const res = await wx.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
        },
        path: "/user/updateProfile?str=" + this.currentAvatar.toString() + "&service=avatar",
        method: "GET",
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        }
      });
      if (res.data.status == 100) {
        let userInfo = common_vendor.index.getStorageSync("userInfo-2");
        userInfo.avatar = this.currentAvatar;
        common_vendor.index.setStorageSync("userInfo-2", userInfo);
        common_vendor.index.navigateBack();
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/" + $data.currentAvatar + ".jpg",
    b: common_vendor.f($data.avatar, (index, k0, i0) => {
      return {
        a: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/" + index + ".jpg",
        b: index,
        c: common_vendor.n($data.currentAvatar == index ? "selected avatar-box" : "avatar-box"),
        d: common_vendor.o(($event) => $options.select(index), index)
      };
    }),
    c: $data.showConfirm,
    d: common_vendor.o((...args) => $options.changeAvatar && $options.changeAvatar(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/cssa/cssa-miniprogram/pages/changeAvatar/changeAvatar.vue"]]);
wx.createPage(MiniProgramPage);
