"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      isSaved: false,
      product: {},
      userInfo: {
        nickname: "小红豆",
        avatar: 1
      },
      condition: ["全新", "几乎全新", "明显使用痕迹", "部分损毁"],
      delivery: {
        "pickup": "自取",
        "deliver": "送货",
        "all": "送/取"
      },
      collectProductList: [],
      isLogin: false
    };
  },
  onLoad(options) {
    common_vendor.wx$1.cloud.init();
    this.product = JSON.parse(decodeURIComponent(options.product));
  },
  onShow() {
    common_vendor.index.getStorage({
      key: "userInfo-2",
      success: (res) => {
        this.userInfo = res.data;
        this.isLogin = true;
      },
      fail: (res) => {
        this.isLogin = false;
      }
    });
    if (this.userInfo.savedProductJSON != null && this.userInfo.savedProductJSON.contains(this.product.productID)) {
      this.isSaved = true;
    }
  },
  onShareTimeline() {
    return {
      title: "【出售】" + this.product.productTitle,
      imageUrl: this.product.images[0],
      path: "/pages/detail/secondDetail?product=" + encodeURIComponent(JSON.stringify(this.product))
    };
  },
  onShareAppMessage(res) {
    if (res.from === "button") {
      console.log(res.target);
    }
    return {
      title: "【出售】" + this.product.productTitle,
      desc: "CSSA二手交易平台",
      content: this.product.productType,
      imageUrl: this.product.images[0],
      path: "/pages/detail/secondDetail?product=" + encodeURIComponent(JSON.stringify(this.product))
    };
  },
  beforeUnmount() {
    console.log("Happy!");
    common_vendor.index.setStorageSync("userInfo-2", this.userInfo);
    if (this.isSaved == true) {
      this.save();
    }
  },
  methods: {
    getCollectList: async function() {
      const res = await common_vendor.wx$1.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
          // 微信云托管的环境ID
        },
        path: `/user/getCollectID?collectType=SECONDHAND`,
        method: "GET",
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        }
      });
      if (res.data.status && res.data.status == 100) {
        this.collectProductList = res.data.data;
        common_vendor.index.setStorage({
          key: "collectProductList",
          data: this.collectProductList
        });
      }
    },
    setClipboardData: function() {
      common_vendor.index.setClipboardData({
        data: " 微信号: " + this.product.contact
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
    },
    async save() {
      const res = await common_vendor.wx$1.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
          // 微信云托管的环境ID
        },
        path: `/user/collect?save=${!this.isSaved}`,
        method: "POST",
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        },
        data: {
          collectType: "SECONDHAND",
          contentID: this.product.productID
        }
      });
      if (res.data.status == "100") {
        this.isSaved = !this.isSaved;
        if (this.isSaved) {
          this.collectProductList.push(this.product.productID);
          common_vendor.index.showToast({
            mask: true,
            title: "收藏成功"
          });
        } else {
          this.collectProductList.splice(this.collectProductList.indexOf(this.product.productID), 1);
          common_vendor.index.showToast({
            mask: true,
            title: "取消收藏成功"
          });
        }
        common_vendor.index.setStorage({
          key: "collectProductList",
          data: this.collectProductList
        });
      }
    },
    previewImage: function() {
      common_vendor.wx$1.previewImage({
        current: this.product.images[0],
        urls: this.product.images
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.product.images, (image, index, i0) => {
      return {
        a: image
      };
    }),
    b: common_vendor.o((...args) => $options.previewImage && $options.previewImage(...args)),
    c: common_vendor.t("$" + $data.product.price),
    d: common_vendor.t(this.condition[$data.product.productCondition]),
    e: common_vendor.t(this.delivery[$data.product.delivery]),
    f: common_vendor.t($data.product.productTitle),
    g: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/" + $data.product.sellerAvatar + ".jpg",
    h: common_vendor.t($data.product.sellerNickname),
    i: common_vendor.o((...args) => $options.setClipboardData && $options.setClipboardData(...args)),
    j: common_vendor.t($data.product.contact),
    k: this.isLogin,
    l: common_vendor.o((...args) => $options.getUserProfile && $options.getUserProfile(...args)),
    m: !this.isLogin,
    n: common_vendor.t($data.product.productDescription)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/pages/detail/secondDetail.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
