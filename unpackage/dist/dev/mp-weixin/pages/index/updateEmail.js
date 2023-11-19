"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      email: "",
      userInfo: {},
      hasEmail: false,
      subscribe: false,
      regex: new RegExp("^([-a-zA-Z0-9_.]+)@([-a-zA-Z0-9_.]+).([a-zA-Z]{2,5})$")
    };
  },
  onLoad() {
    common_vendor.wx$1.cloud.init();
    this.userInfo = common_vendor.index.getStorageSync("userInfo-2");
    if (this.userInfo.email != null) {
      this.hasEmail = true;
      this.email = this.userInfo.email;
    }
    if (this.userInfo.subscribe != null) {
      this.subscribe = this.userInfo.subscribe;
    }
  },
  methods: {
    onEmailInput(event) {
      this.email = event.detail.value;
    },
    checkBoxChange: function(e) {
      console.log(e);
      if (e.detail.length == 0) {
        this.subscribe = false;
      } else {
        this.subscribe = true;
      }
    },
    async confirm() {
      if (this.regex.test(this.email)) {
        const res = await common_vendor.wx$1.cloud.callContainer({
          config: {
            env: "prod-9gip97mx4bfa32a3"
            // 微信云托管的环境ID
          },
          path: `/user/updateProfile?str=${this.email}&subscribe=${this.subscribe}&service=email`,
          method: "GET",
          header: {
            "X-WX-SERVICE": "springboot-ds71"
          }
        });
        if (res.data.status == 100) {
          this.userInfo.email = this.email;
          this.userInfo.subscribe = this.subscribe;
          common_vendor.index.setStorage({
            key: "userInfo-2",
            data: this.userInfo
          });
          common_vendor.index.navigateBack({
            delta: 1
          });
        }
      } else {
        common_vendor.index.showToast({
          title: "邮箱格式不正确",
          icon: "error"
        });
      }
    },
    cancel: function() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o([($event) => $data.email = $event.detail.value, (...args) => $options.onEmailInput && $options.onEmailInput(...args)]),
    b: $data.email,
    c: $data.subscribe,
    d: common_vendor.o((...args) => $options.checkBoxChange && $options.checkBoxChange(...args)),
    e: common_vendor.o((...args) => $options.confirm && $options.confirm(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/pages/index/updateEmail.vue"]]);
wx.createPage(MiniProgramPage);
