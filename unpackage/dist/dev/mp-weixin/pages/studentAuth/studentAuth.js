"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      email: "",
      authCode: "",
      regex: new RegExp("^([-a-zA-Z0-9_.]+)@([-a-zA-Z0-9_.])?wisc.edu$"),
      time: 60,
      showTime: false,
      timeCounter: {},
      showButton: false,
      userInfo: {}
    };
  },
  onLoad() {
    common_vendor.index.getStorage({
      key: "userInfo-2",
      success: (res) => {
        this.userInfo = res.data;
      }
    });
  },
  methods: {
    onEmailInput(event) {
      this.email = event.detail.value;
    },
    onAuthCodeInput(event) {
      this.authCode = event.detail.value;
    },
    async confirm() {
      common_vendor.index.showLoading({
        mask: true
      });
      if (this.authCode.length == 0) {
        common_vendor.index.showToast({
          title: "请输入验证码",
          icon: "error"
        });
        return;
      }
      const res = await common_vendor.wx$1.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
        },
        path: "/user/verifyAuthCode?authCode=" + this.authCode,
        method: "GET",
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        }
      });
      if (res.data.status && res.data.status == 100) {
        this.userInfo.isStudent == true;
        common_vendor.index.setStorageSync("userInfo-2", this.userInfo);
        common_vendor.index.emit("authSuccess");
        common_vendor.index.navigateBack({
          delta: 1
        });
      } else if (res.data.status && res.data.status == 106) {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "验证码错误",
          icon: "error"
        });
      } else {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "服务出现错误",
          icon: "error"
        });
      }
    },
    async getAuthCode() {
      if (this.email.length == 0) {
        common_vendor.index.showToast({
          title: "请输入邮箱",
          icon: "error"
        });
        return;
      }
      if (this.regex.test(this.email)) {
        this.time = 60;
        this.showTime = true;
        this.timeCounter = setInterval(() => {
          this.time--;
          if (this.time <= 0) {
            clearInterval(this.timeCounter);
            this.showTime = false;
          }
        }, 1e3);
        await common_vendor.wx$1.cloud.callContainer({
          config: {
            env: "prod-9gip97mx4bfa32a3"
          },
          path: "/user/getAuthCode?email=" + this.email,
          method: "GET",
          header: {
            "X-WX-SERVICE": "springboot-ds71"
          }
        });
        this.showButton = true;
      } else {
        common_vendor.index.showToast({
          title: "邮箱格式不正确",
          icon: "error"
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.onEmailInput && $options.onEmailInput(...args)),
    b: common_vendor.o([($event) => $data.authCode = $event.detail.value, (...args) => $options.onAuthCodeInput && $options.onAuthCodeInput(...args)]),
    c: $data.authCode,
    d: !$data.showTime,
    e: common_vendor.o((...args) => $options.getAuthCode && $options.getAuthCode(...args)),
    f: common_vendor.t($data.time),
    g: $data.showTime,
    h: $data.showButton,
    i: common_vendor.o((...args) => $options.confirm && $options.confirm(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/pages/studentAuth/studentAuth.vue"]]);
wx.createPage(MiniProgramPage);
