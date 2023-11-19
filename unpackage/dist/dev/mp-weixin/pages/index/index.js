"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {
    mainAdvertisementVue
  },
  data() {
    return {
      userInfo: {},
      isLogin: false,
      iconList: [
        { text: "" }
      ]
    };
  },
  onLoad() {
    common_vendor.wx$1.cloud.init();
  },
  onShow() {
    common_vendor.index.$on("authSuccess", this.authSuccess);
    common_vendor.index.getStorage({
      key: "userInfo-2",
      success: (res) => {
        this.userInfo = res.data;
        this.isLogin = true;
        this.login(res.data.nickname);
      },
      fail: () => {
        this.isLogin = false;
      }
    });
  },
  onHide() {
    this.$refs.welcome.close();
  },
  onShareAppMessage(res) {
    return {
      title: "麦屯小助手",
      path: "/pages/main/main"
    };
  },
  onShareTimeline(res) {
    return {
      title: "麦屯小助手",
      path: "/pages/main/main"
    };
  },
  methods: {
    jump: function(index) {
      let directURL = "";
      if ((index == 2 || index == 3) && !this.isLogin) {
        common_vendor.index.showToast({
          title: "请先登录",
          icon: "error"
        });
        return;
      }
      if (index == 1) {
        directURL = "/pages/myRental/myRental";
      }
      if (index == 2) {
        directURL = "/pages/myComment/myComment";
      }
      if (index == 3) {
        directURL = "/pages/mySecondhand/mySecondhand";
      }
      if (index == 4) {
        directURL = "/pages/aboutCSSA/aboutCSSA";
      }
      if (index == 5) {
        directURL = "/pages/aboutCSSA/ContactUs";
      }
      common_vendor.index.navigateTo({
        url: directURL
      });
    },
    getUserProfile: function() {
      common_vendor.index.getUserProfile({
        desc: "获取用户昵称",
        success: (userProfile) => {
          this.userInfo.nickname = userProfile.userInfo.nickName;
          this.login(userProfile.userInfo.nickName);
        }
      });
    },
    toUserInfo: function() {
      common_vendor.index.navigateTo({
        url: "/pages/index/userInfo"
      });
    },
    async login(nickname) {
      const res = await common_vendor.wx$1.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
        },
        path: "/user/login?nickname=" + encodeURI(nickname),
        method: "GET",
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        }
      });
      this.userInfo = res.data.data;
      this.isLogin = true;
      common_vendor.index.setStorageSync("userInfo-2", res.data.data);
    },
    toChangeAvatar: function() {
      common_vendor.index.navigateTo({
        url: "/pages/changeAvatar/changeAvatar?avatar=" + encodeURIComponent(JSON.stringify(this.userInfo.avatar))
      });
    },
    authSuccess: function() {
      this.userInfo.isStudent = true;
    }
  }
};
const mainAdvertisementVue = () => "../../components/main-advertisement/main-advertisement.js";
if (!Array) {
  const _easycom_welcome2 = common_vendor.resolveComponent("welcome");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _component_main_advertisement_vue = common_vendor.resolveComponent("main-advertisement-vue");
  (_easycom_welcome2 + _easycom_uni_popup2 + _component_main_advertisement_vue)();
}
const _easycom_welcome = () => "../../components/welcome/welcome.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_welcome + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.sr("welcome", "baaf9ec8-0"),
    b: common_vendor.p({
      ["background-color"]: "fff"
    }),
    c: $data.isLogin
  }, $data.isLogin ? common_vendor.e({
    d: $data.userInfo.isStudent ? 1 : "",
    e: this.userInfo,
    f: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/" + this.userInfo.avatar + ".jpg",
    g: $data.userInfo.isStudent
  }, $data.userInfo.isStudent ? {} : {}, {
    h: !$data.userInfo.isStudent
  }, !$data.userInfo.isStudent ? {} : {}, {
    i: common_vendor.t($data.userInfo.nickname),
    j: common_vendor.o((...args) => $options.toUserInfo && $options.toUserInfo(...args))
  }) : {}, {
    k: !$data.isLogin
  }, !$data.isLogin ? {
    l: common_vendor.o((...args) => $options.getUserProfile && $options.getUserProfile(...args))
  } : {}, {
    m: common_vendor.o(($event) => $options.jump(2)),
    n: common_vendor.o(($event) => $options.jump(3)),
    o: common_vendor.o(($event) => $options.jump(1)),
    p: common_vendor.o(($event) => $options.jump(4)),
    q: common_vendor.o(($event) => $options.jump(5)),
    r: common_vendor.p({
      height: "200px",
      width: "95vw"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/pages/index/index.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
