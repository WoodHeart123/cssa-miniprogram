"use strict";
const common_vendor = require("../../common/vendor.js");
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
        title: "提示",
        content: "是否删除?删除后不可恢复",
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
      const res = await common_vendor.wx$1.cloud.callContainer({
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
          title: "成功删除"
        });
        common_vendor.index.$emit("mySecondhandDelete", this.index);
      } else {
        common_vendor.index.showToast({
          title: "删除失败",
          icon: "error"
        });
      }
    },
    polishMySecondhand: async function(index) {
      common_vendor.index.showLoading({
        mask: true
      });
      const res = await common_vendor.wx$1.cloud.callContainer({
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
            title: "擦亮成功",
            icon: "success"
          });
          common_vendor.index.$emit("mySecondhandRefresh", this.index);
        } else {
          common_vendor.index.showToast({
            title: "擦亮失败",
            icon: "error"
          });
        }
      }
      if (index == 2) {
        if (res.data.status == 100) {
          common_vendor.index.showToast({
            title: "上架成功",
            icon: "success"
          });
          common_vendor.index.$emit("mySecondhandRefresh", this.index);
        } else {
          common_vendor.index.showToast({
            title: "上架失败",
            icon: "error"
          });
        }
      }
    },
    takeoffMySecondhand: async function() {
      common_vendor.index.showLoading({
        mask: true
      });
      const res = await common_vendor.wx$1.cloud.callContainer({
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
          title: "下架成功",
          icon: "success"
        });
        this.product.time = 0;
      } else {
        common_vendor.index.showToast({
          title: "下架失败",
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
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/components/user-product-box/user-product-box.vue"]]);
wx.createComponent(Component);
