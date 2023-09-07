"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: ["product", "index"],
  data() {
    return {
      productPublishTime: ""
    };
  },
  mounted() {
    this.product.UTCtimestamp = common_vendor.moment(this.product.UTCtime).valueOf();
    if (common_vendor.moment().year() - common_vendor.moment.utc(this.product.UTCtime).year() > 0) {
      this.productPublishTime = common_vendor.moment.utc(this.product.UTCtime).format("YYYY-MM-DD");
    } else if (Date.now() - common_vendor.moment.utc(this.product.UTCtime).valueOf() > 864e5 * 7) {
      this.productPublishTime = common_vendor.moment.utc(this.product.UTCtime).format("MM-DD");
    } else {
      this.productPublishTime = common_vendor.moment.utc(this.product.UTCtime).locale("zh-cn").fromNow();
    }
  },
  methods: {
    toDetail: function() {
      common_vendor.index.navigateTo({
        url: "/pages/detail/secondDetail?product=" + encodeURIComponent(JSON.stringify(this.product))
      });
    },
    deleteShow: function() {
      common_vendor.index.showModal({
        title: "\u63D0\u793A",
        content: "\u662F\u5426\u5220\u9664?\u5220\u9664\u540E\u4E0D\u53EF\u6062\u590D",
        success: (res) => {
          if (res.confirm) {
            this.deleteMySecondhand(this.product.productID);
          }
        }
      });
    },
    deleteMySecondhand: async function(productID) {
      common_vendor.index.showLoading({
        mask: true
      });
      const res = await wx.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
        },
        path: `/user/deleteMyItem?itemID=${this.product.productID}&service=secondhand`,
        method: "DELETE",
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        }
      });
      common_vendor.index.hideLoading();
      if (res.data.status == 100) {
        common_vendor.index.showToast({
          title: "\u6210\u529F\u5220\u9664"
        });
        common_vendor.index.$emit("mySecondhandDelete", this.index);
      } else {
        common_vendor.index.showToast({
          title: "\u5220\u9664\u5931\u8D25",
          icon: "error"
        });
      }
    },
    polishMySecondhand: async function(index) {
      common_vendor.index.showLoading({
        mask: true
      });
      const res = await wx.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
        },
        path: `/user/setProductTime?UTCtime=${common_vendor.moment.utc().format()}&productID=${this.product.productID}&service=product`,
        method: "GET",
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        }
      });
      common_vendor.index.hideLoading();
      if (index == 1) {
        if (res.data.status == 100) {
          common_vendor.index.showToast({
            title: "\u64E6\u4EAE\u6210\u529F",
            icon: "success"
          });
          common_vendor.index.$emit("mySecondhandRefresh", this.index);
        } else {
          common_vendor.index.showToast({
            title: "\u64E6\u4EAE\u5931\u8D25",
            icon: "error"
          });
        }
      }
      if (index == 2) {
        if (res.data.status == 100) {
          common_vendor.index.showToast({
            title: "\u4E0A\u67B6\u6210\u529F",
            icon: "success"
          });
          common_vendor.index.$emit("mySecondhandRefresh", this.index);
        } else {
          common_vendor.index.showToast({
            title: "\u4E0A\u67B6\u5931\u8D25",
            icon: "error"
          });
        }
      }
    },
    takeoffMySecondhand: async function() {
      common_vendor.index.showLoading({
        mask: true
      });
      const res = await wx.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
        },
        path: `/user/setProductTime?UTCtime=1970-01-01T00:00:00Z&productID=${this.product.productID}`,
        method: "GET",
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        }
      });
      common_vendor.index.hideLoading();
      if (res.data.status == 100) {
        common_vendor.index.showToast({
          title: "\u4E0B\u67B6\u6210\u529F",
          icon: "success"
        });
        this.product.time = 0;
      } else {
        common_vendor.index.showToast({
          title: "\u4E0B\u67B6\u5931\u8D25",
          icon: "error"
        });
      }
    },
    editMySecondhand: async function() {
      common_vendor.index.navigateTo({
        url: "../second/secondMainPost?product=" + encodeURIComponent(JSON.stringify(this.product))
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.product.images[0],
    b: common_vendor.t($props.product.productTitle),
    c: common_vendor.t("$" + $props.product.price),
    d: $props.product.time == 0
  }, $props.product.time == 0 ? {} : {}, {
    e: common_vendor.t(this.productPublishTime),
    f: $props.product.time != 0,
    g: common_vendor.o((...args) => $options.toDetail && $options.toDetail(...args)),
    h: $props.product.time != 0
  }, $props.product.time != 0 ? {
    i: common_vendor.o(($event) => $options.editMySecondhand())
  } : {}, {
    j: $props.product.time != 0 && Date.now() - this.product.UTCtimestamp >= 432e5
  }, $props.product.time != 0 && Date.now() - this.product.UTCtimestamp >= 432e5 ? {
    k: common_vendor.o(($event) => $options.polishMySecondhand(1))
  } : {}, {
    l: $props.product.time != 0
  }, $props.product.time != 0 ? {
    m: common_vendor.o((...args) => $options.takeoffMySecondhand && $options.takeoffMySecondhand(...args))
  } : {}, {
    n: $props.product.time == 0
  }, $props.product.time == 0 ? {
    o: common_vendor.o(($event) => $options.polishMySecondhand(2))
  } : {}, {
    p: $props.product.time != 0
  }, $props.product.time != 0 ? {
    q: common_vendor.o((...args) => $options.deleteShow && $options.deleteShow(...args))
  } : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/cssa/cssa-miniprogram/components/user-product-box/user-product-box.vue"]]);
wx.createComponent(Component);
