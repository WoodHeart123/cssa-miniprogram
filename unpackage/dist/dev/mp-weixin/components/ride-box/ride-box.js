"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "ride-box",
  props: ["rideInfo"],
  mounted() {
  },
  data() {
    return {};
  },
  methods: {
    toRideDetail: function() {
      common_vendor.index.navigateTo({
        url: "/pages/detail/rideDetail?rideInfo=" + encodeURIComponent(JSON.stringify(this.rideInfo))
      });
    }
  },
  computed: {
    rideTrip() {
      return "从 " + this.rideInfo.orign + " 至 " + this.rideInfo.destination;
    },
    rideTime() {
      return common_vendor.moment(this.rentalInfo.dateAndTime).format();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: this.rideInfo.imageList[0],
    b: common_vendor.t($options.rideTrip),
    c: common_vendor.t($options.rideTime),
    d: common_vendor.t(this.rideInfo.price),
    e: common_vendor.t(this.rideInfo.description),
    f: common_vendor.o((...args) => $options.toRideDetail && $options.toRideDetail(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/components/ride-box/ride-box.vue"]]);
wx.createComponent(Component);
