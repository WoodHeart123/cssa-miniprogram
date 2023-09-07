"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {
    rentalBoxVue
  },
  data() {
    return {
      menuIndex: 0,
      filter: {
        priceLimit: 5e3,
        time: [0, 0]
      },
      floorplanList: ["Studio", "1B1B", "2B1B", "2B2B", "3B1B", "3B2B", "3B3B", "4B1B", "4B2B", "4B3B", "4B4B", "Other"],
      selectedFloorplan: ["Studio", "1B1B", "2B1B", "2B2B", "3B1B", "3B2B", "3B3B", "4B1B", "4B2B", "4B3B", "4B4B", "Other"],
      start: Date.now(),
      end: Date.now() + 1e10,
      timeFilter: false,
      status: "loading",
      safeArea: false,
      limit: 20,
      offset: 0,
      rentalList: [],
      triggered: false,
      pattern: {
        buttonColor: "#9b0000"
      },
      isLogin: false,
      contentText: {
        contentdown: "\u4E0A\u62C9\u663E\u793A\u66F4\u591A",
        contentrefresh: "\u6B63\u5728\u52A0\u8F7D...",
        contentnomore: "\u6CA1\u6709\u66F4\u591A\u79DF\u623F\u4FE1\u606F\u4E86\u3002\u6211\u4EEC\u53EA\u4F1A\u663E\u793A"
      }
    };
  },
  onLoad() {
    wx.cloud.init();
    this.refresh();
    console.log("init");
  },
  onShow() {
    common_vendor.index.$on("uploadRentalSuccess", this.uploadSuccess);
    common_vendor.index.getStorage({
      key: "userInfo-2",
      success: () => {
        this.isLogin = true;
      }
    });
  },
  methods: {
    clickMenu: function(e) {
      this.menuIndex = e;
    },
    uploadSuccess: function() {
      this.refresh();
      common_vendor.index.showToast({
        title: "\u4E0A\u4F20\u6210\u529F",
        duration: 5e3
      });
    },
    async login(name) {
      common_vendor.index.showLoading({
        mask: true
      });
      const res = await wx.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
        },
        path: "/user/login?nickname=" + encodeURI(name),
        method: "GET",
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        }
      });
      this.isLogin = true;
      common_vendor.index.setStorage({
        key: "userInfo-2",
        data: res.data.data
      });
      common_vendor.index.hideLoading();
      this.toPostRental();
    },
    toPostRental: function() {
      if (!this.isLogin) {
        common_vendor.index.showToast({
          title: "\u8BF7\u5148\u767B\u5F55",
          icon: "none"
        });
        common_vendor.index.getUserProfile({
          desc: "\u83B7\u53D6\u7528\u6237\u4FE1\u606F",
          success: (userProfile) => {
            this.login(userProfile.userInfo.nickName);
          },
          fail: () => {
            common_vendor.index.showToast({
              title: "\u8BF7\u5148\u767B\u9646",
              icon: "none"
            });
          }
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/rental/rentalPost"
      });
    },
    popFilter: function(e) {
      if (e == "price") {
        this.$refs.filter.open();
      }
    },
    priceLimitChange: function(e) {
      this.filter.priceLimit = e.detail.value;
    },
    clickAll: function() {
      if (this.selectedFloorplan.length == 0) {
        this.selectedFloorplan = Array.from(this.floorplanList);
      } else {
        this.selectedFloorplan = [];
      }
    },
    remove: function(floorplan) {
      this.selectedFloorplan.splice(this.selectedFloorplan.indexOf(floorplan), 1);
    },
    select: function(floorplan) {
      this.selectedFloorplan.push(floorplan);
    },
    switchTimePicker: function(e) {
      if (e.detail.value) {
        this.filter.time = [common_vendor.moment().format("YYYY-MM-DD"), common_vendor.moment().add(1, "M").format("YYYY-MM-DD")];
      } else {
        this.filter.time = [0, 0];
      }
      this.timeFilter = e.detail.value;
    },
    maskClick: function() {
      if (this.selectedFloorplan.length == 0) {
        common_vendor.index.showToast({
          title: "\u8BF7\u81F3\u5C11\u9009\u62E9\u4E00\u4E2A\u6237\u578B",
          duration: 2e3,
          icon: "none"
        });
        return;
      }
      this.$refs.filter.close();
    },
    refresh: function() {
      if (!this.triggered) {
        this.triggered = true;
        this.limit = 20;
        this.offset = 1;
        this.rentalList = [];
        this.status = "loading";
        this.getRentalList();
      }
    },
    getRentalList: async function() {
      if (this.status == "noMore") {
        return;
      }
      let temp = [0, 0];
      if (this.filter.time[0] != 0) {
        temp = [common_vendor.moment(this.filter.time[0], "YYYY-MM-DD").valueOf(), common_vendor.moment(this.filter.time[1], "YYYY-MM-DD").valueOf()];
      }
      const res = await wx.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
        },
        path: `/rental/getRentalList?limit=${this.limit}&offset=${this.offset}&floorPlanList=${this.selectedFloorplan}&priceLimit=${this.filter.priceLimit}&time=${temp}`,
        method: "GET",
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        }
      });
      if (res.data.status == 100) {
        this.rentalList = this.rentalList.concat(res.data.data);
      }
      this.offset += res.data.data.length;
      if (res.data.data.length != this.limit) {
        this.status = "noMore";
      } else {
        this.status = "more";
      }
      this.$nextTick(() => {
        this.triggered = false;
      });
    },
    onScrollLower: function() {
      this.status = "loading";
      this.getRentalList();
    }
  }
};
const rentalBoxVue = () => "../../components/rental-box/rental-box.js";
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _component_rentalBoxVue = common_vendor.resolveComponent("rentalBoxVue");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _component_rentalBoxVue + _easycom_uni_load_more2 + _easycom_uni_fab2 + _easycom_uni_easyinput2 + _easycom_uni_datetime_picker2 + _easycom_uni_tag2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_fab = () => "../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_load_more + _easycom_uni_fab + _easycom_uni_easyinput + _easycom_uni_datetime_picker + _easycom_uni_tag + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "settings-filled",
      size: "30"
    }),
    b: common_vendor.o(($event) => $options.popFilter("price")),
    c: common_vendor.t(this.filter.priceLimit == 5e3 ? "\u65E0\u4E0A\u9650" : "0 - " + this.filter.priceLimit),
    d: common_vendor.o(($event) => $options.popFilter("price")),
    e: common_vendor.t(this.filter.time[0] == -1 ? "\u4E0D\u9650" : this.filter.time[0] + " - " + this.filter.time[1]),
    f: common_vendor.o(($event) => $options.popFilter("price")),
    g: common_vendor.t(this.selectedFloorplan.length == this.floorplanList.length ? "\u4E0D\u9650" : this.selectedFloorplan.join("\uFF1B")),
    h: common_vendor.o(($event) => $options.popFilter("price")),
    i: common_vendor.f($data.rentalList, (rentalInfo, index, i0) => {
      return {
        a: "1a011c4e-1-" + i0,
        b: common_vendor.p({
          rentalInfo
        }),
        c: index
      };
    }),
    j: common_vendor.p({
      ["content-text"]: $data.contentText,
      status: $data.status
    }),
    k: common_vendor.o((...args) => $options.refresh && $options.refresh(...args)),
    l: $data.triggered,
    m: common_vendor.o((...args) => $options.onScrollLower && $options.onScrollLower(...args)),
    n: common_vendor.o($options.toPostRental),
    o: common_vendor.p({
      pattern: $data.pattern,
      horizontal: "right",
      vertical: "bottom",
      popMene: "false"
    }),
    p: this.filter.priceLimit,
    q: common_vendor.o((...args) => $options.priceLimitChange && $options.priceLimitChange(...args)),
    r: common_vendor.o((...args) => $options.priceLimitChange && $options.priceLimitChange(...args)),
    s: common_vendor.o(($event) => this.filter.priceLimit = $event),
    t: common_vendor.p({
      clearable: "false",
      clearSize: "0",
      type: "number",
      modelValue: this.filter.priceLimit
    }),
    v: common_vendor.o((...args) => $options.switchTimePicker && $options.switchTimePicker(...args)),
    w: this.timeFilter,
    x: common_vendor.o(($event) => this.filter.time = $event),
    y: common_vendor.p({
      type: "daterange",
      start: $data.start,
      end: $data.end,
      ["clear-icon"]: false,
      modelValue: this.filter.time
    }),
    z: common_vendor.f($data.floorplanList, (floorplan, index, i0) => {
      return {
        a: this.selectedFloorplan.indexOf(floorplan) == -1,
        b: common_vendor.o(($event) => $options.select(floorplan)),
        c: "1a011c4e-7-" + i0 + ",1a011c4e-4",
        d: common_vendor.p({
          text: floorplan
        }),
        e: this.selectedFloorplan.indexOf(floorplan) != -1,
        f: common_vendor.o(($event) => $options.remove(floorplan)),
        g: "1a011c4e-8-" + i0 + ",1a011c4e-4",
        h: common_vendor.p({
          type: "primary",
          text: floorplan
        }),
        i: index
      };
    }),
    A: common_vendor.t(this.selectedFloorplan.length == 0 ? "\u9009\u4E2D\u5168\u90E8" : "\u53D6\u6D88\u5168\u90E8"),
    B: this.selectedFloorplan.length == this.floorplanList.length || this.selectedFloorplan.length == 0,
    C: common_vendor.o((...args) => $options.clickAll && $options.clickAll(...args)),
    D: common_vendor.sr("filter", "1a011c4e-4"),
    E: common_vendor.o($options.maskClick),
    F: common_vendor.p({
      type: "bottom",
      ["background-color"]: "#fff",
      safeArea: $data.safeArea,
      ["is-mask-click"]: $data.safeArea
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/cssa/cssa-miniprogram/pages/rentalMain/rentalMain.vue"]]);
wx.createPage(MiniProgramPage);
