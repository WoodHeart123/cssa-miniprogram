"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      userInfo: {},
      nickname: "",
      nameinput: {
        borderColor: "#ffffff"
      }
    };
  },
  onShow() {
    common_vendor.wx$1.cloud.init();
    this.userInfo = common_vendor.index.getStorageSync("userInfo-2");
    console.log(this.userInfo);
    this.nickname = this.userInfo.nickname;
  },
  methods: {
    onEmailInput(event) {
      this.email = event.detail.value;
    },
    async confirm() {
      if (this.nickname.length == 0) {
        common_vendor.index.showToast({
          icon: "none",
          title: "昵称不应为空"
        });
      }
      const res = await common_vendor.wx$1.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
          // 微信云托管的环境ID
        },
        path: "/user/updateProfile?str=" + encodeURI(this.nickname) + "&service=nickname",
        method: "GET",
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        }
      });
      if (res.data.status == 100) {
        this.userInfo.nickname = this.nickname;
        common_vendor.index.setStorageSync("userInfo-2", this.userInfo);
        common_vendor.index.navigateBack({
          delta: 1
        });
      } else {
        common_vendor.index.showToast({
          icon: "error",
          title: "暂时无法修改昵称，请稍后再尝试"
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  _easycom_uni_easyinput();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.nickname = $event),
    b: common_vendor.p({
      styles: $data.nameinput,
      placeholder: "请输入昵称",
      clearable: false,
      maxlength: "20",
      placeholderStyle: "color:#999;font-size:14px",
      modelValue: $data.nickname
    }),
    c: common_vendor.o((...args) => $options.confirm && $options.confirm(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/pages/index/updateName.vue"]]);
wx.createPage(MiniProgramPage);
