"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "rental-box",
  props: ["rentalInfo"],
  mounted() {
    if (common_vendor.moment().year() - common_vendor.moment.utc(this.rentalInfo.UTCPublishedTime).year() > 0) {
      this.rentalPublishTime = common_vendor.moment.utc(this.rentalInfo.UTCPublishedTime).format("YYYY-MM-DD");
    } else if (Date.now() - common_vendor.moment.utc(this.rentalInfo.UTCPublishedTime).valueOf() > 864e5 * 7) {
      this.rentalPublishTime = common_vendor.moment.utc(this.rentalInfo.UTCPublishedTime).format("MM-DD");
    } else {
      this.rentalPublishTime = common_vendor.moment.utc(this.rentalInfo.UTCPublishedTime).locale("zh-cn").fromNow();
    }
  },
  data() {
    return {
      sexContraintValue: ["\u4EC5\u9650\u7537\u751F", "\u4EC5\u9650\u5973\u751F", "\u6027\u522B\u4E0D\u9650"],
      houseInfo: {
        imageList: ["/static/housing.jpg", "/static/housing.jpg", "/static/housing.jpg"]
      },
      rentalPublishTime: ""
    };
  },
  methods: {
    toRentalDetail: function() {
      common_vendor.index.navigateTo({
        url: "/pages/detail/houseDetail?rentalInfo=" + encodeURIComponent(JSON.stringify(this.rentalInfo))
      });
    }
  },
  computed: {
    rentalTime() {
      return common_vendor.moment(this.rentalInfo.rentalStartTime).format("YYYY-MM-DD") + " \u81F3 " + common_vendor.moment(this.rentalInfo.rentalEndTime).format("YYYY-MM-DD");
    }
  },
  watch: {
    "rentalInfo.UTCPublishedTime": function(newVal, oldVal) {
      if (common_vendor.moment().year() - common_vendor.moment.utc(this.rentalInfo.UTCPublishedTime).year() > 0) {
        this.rentalPublishTime = common_vendor.moment.utc(newVal).format("YYYY-MM-DD");
      } else if (Date.now() - common_vendor.moment.utc(this.rentalInfo.UTCPublishedTime).valueOf() > 864e5 * 7) {
        this.rentalPublishTime = common_vendor.moment.utc(newVal).format("MM-DD");
      } else {
        this.rentalPublishTime = common_vendor.moment.utc(newVal).locale("zh-cn").fromNow();
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: this.rentalInfo.images[0],
    b: common_vendor.t($data.sexContraintValue[this.rentalInfo.sexConstraint]),
    c: common_vendor.t(this.rentalInfo.floorPlan),
    d: common_vendor.t(this.rentalInfo.location),
    e: common_vendor.t($options.rentalTime),
    f: common_vendor.t(this.rentalInfo.price),
    g: common_vendor.t(this.rentalInfo.description),
    h: common_vendor.t(this.rentalPublishTime),
    i: common_vendor.o((...args) => $options.toRentalDetail && $options.toRentalDetail(...args))
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/cssa/cssa-miniprogram/components/rental-box/rental-box.vue"]]);
wx.createComponent(Component);
