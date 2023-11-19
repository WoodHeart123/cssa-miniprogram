"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {
    actBoxVue,
    presidentBoxVue,
    mainAdvertisementVue
  },
  data() {
    return {
      info: [{}, {}, {}],
      dotStyle: {
        backgroundColor: "rgba(83, 200, 249,0.3)",
        border: "1px rgba(83, 200, 249,0.3) solid",
        color: "#fff",
        selectedBackgroundColor: "rgba(83, 200, 249,0.9)",
        selectedBorder: "1px rgba(83, 200, 249,0.9) solid"
      }
    };
  },
  onLoad() {
    common_vendor.wx$1.cloud.init();
    common_vendor.index.getStorage({
      key: "userInfo-2",
      fail: () => {
        common_vendor.index.switchTab({
          url: "/pages/index/index"
        });
      }
    });
  },
  onShow() {
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
      path: "/pages/activity/act"
    };
  },
  methods: {
    popMask: function(e) {
      this.$refs.ad.open();
    },
    openLeaderPop: function(index) {
      this.popupLeader = this.leaderInfo[index];
      this.$refs.leaderPopup.open("bottom");
    },
    clickItem(e) {
      console.log(e);
    },
    toAct: function() {
      common_vendor.index.switchTab({
        url: "/pages/activity/act"
      });
    },
    toCourse: function() {
      common_vendor.index.navigateTo({
        url: "/pages/courseMain/courseMain"
      });
    },
    toSecond: function() {
      common_vendor.index.navigateTo({
        url: "/pages/second/secondMain"
      });
    },
    toRental: function() {
      common_vendor.index.navigateTo({
        url: "/pages/rentalMain/rentalMain"
      });
    },
    toRide: function() {
      common_vendor.index.navigateTo({
        url: "/pages/rideMain/rideMain"
      });
    },
    toRest: function() {
      common_vendor.index.navigateTo({
        url: "/pages/restMain/restMain"
      });
    }
  }
};
const actBoxVue = () => "../../components/act-box/act-box.js";
const presidentBoxVue = () => "../../components/president-box/president-box.js";
const mainAdvertisementVue = () => "../../components/main-advertisement/main-advertisement.js";
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_main_advertisement2 = common_vendor.resolveComponent("main-advertisement");
  (_easycom_uni_popup2 + _easycom_main_advertisement2)();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_main_advertisement = () => "../../components/main-advertisement/main-advertisement.js";
if (!Math) {
  (_easycom_uni_popup + _easycom_main_advertisement)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.sr("ad", "a6192354-0"),
    b: common_vendor.p({
      ["background-color"]: "#fff",
      type: "message"
    }),
    c: common_vendor.p({
      width: "90vw",
      height: "200px"
    }),
    d: common_vendor.o((...args) => $options.toCourse && $options.toCourse(...args)),
    e: common_vendor.o((...args) => $options.toSecond && $options.toSecond(...args)),
    f: common_vendor.o((...args) => $options.toRental && $options.toRental(...args)),
    g: common_vendor.o((...args) => $options.toSecond && $options.toSecond(...args)),
    h: common_vendor.o((...args) => $options.toRental && $options.toRental(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/pages/main/main.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
