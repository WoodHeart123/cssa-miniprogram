"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      sexContraintValue: ["仅限男生", "仅限女生", "性别不限"],
      imageList: ["/static/housing.jpg", "/static/housing.jpg", "/static/housing.jpg"],
      houseInfo: {},
      isLogin: false
    };
  },
  onLoad(options) {
    common_vendor.wx$1.cloud.init();
    this.houseInfo = JSON.parse(decodeURIComponent(options.rentalInfo));
    console.log(this.houseInfo);
  },
  onShow() {
    common_vendor.index.getStorage({
      key: "userInfo-2",
      success: (res) => {
        this.userInfo = res.data;
        this.isLogin = true;
      },
      fail: () => {
        console.log("fail");
      }
    });
  },
  onShareTimeline() {
    return {
      title: "【转租】" + this.houseInfo.location,
      imageUrl: this.houseInfo.images[0],
      path: "/pages/detail/houseDetail?rentalInfo=" + encodeURIComponent(JSON.stringify(this.houseInfo))
    };
  },
  onShareAppMessage(res) {
    if (res.from === "button") {
      console.log(res.target);
    }
    return {
      title: "【转租】" + this.houseInfo.location,
      desc: "CSSA转租分享平台",
      content: "转租",
      imageUrl: this.houseInfo.images[0],
      path: "/pages/detail/housedDetail?rentalInfo=" + encodeURIComponent(JSON.stringify(this.houseInfo))
    };
  },
  methods: {
    setClipboardData: function() {
      common_vendor.index.setClipboardData({
        data: this.houseInfo.contact[0],
        success: (res) => {
          common_vendor.index.showToast({
            icon: "none",
            title: "微信号复制成功"
          });
        }
      });
    },
    previewImage: function() {
      common_vendor.wx$1.previewImage({
        current: this.houseInfo.images[0],
        urls: this.houseInfo.images
      });
    },
    getUserProfile: function() {
      common_vendor.index.getUserProfile({
        desc: "获取用户昵称",
        success: (userProfile) => {
          this.login(userProfile.userInfo.nickName);
        }
      });
    },
    async login(nickname) {
      common_vendor.index.showLoading();
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
      common_vendor.index.hideLoading();
      this.userInfo = res.data.data;
      this.isLogin = true;
      common_vendor.index.setStorageSync("userInfo-2", res.data.data);
    }
  },
  computed: {
    rentalTime() {
      return common_vendor.moment(this.houseInfo.rentalStartTime).format("YYYY-MM-DD") + " 至 " + common_vendor.moment(this.houseInfo.rentalEndTime).format("YYYY-MM-DD");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.houseInfo.images, (image, index, i0) => {
      return {
        a: image
      };
    }),
    b: common_vendor.o((...args) => $options.previewImage && $options.previewImage(...args)),
    c: common_vendor.t($options.rentalTime),
    d: common_vendor.t($data.houseInfo.price),
    e: common_vendor.t($data.houseInfo.location),
    f: common_vendor.t($data.sexContraintValue[this.houseInfo.sexConstraint]),
    g: common_vendor.t($data.houseInfo.floorPlan),
    h: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/" + $data.houseInfo.sellerAvatar + ".jpg",
    i: common_vendor.t($data.houseInfo.sellerNickname),
    j: common_vendor.o((...args) => $options.setClipboardData && $options.setClipboardData(...args)),
    k: common_vendor.t($data.houseInfo.contact),
    l: common_vendor.o((...args) => $options.getUserProfile && $options.getUserProfile(...args)),
    m: !this.isLogin,
    n: common_vendor.t($data.houseInfo.description)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/pages/detail/houseDetail.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
