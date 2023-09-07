"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  onShareAppMessage(res) {
    return {
      title: "\u9EA6\u5C6F\u5C0F\u52A9\u624B",
      path: "/pages/activity/act"
    };
  },
  components: {
    actBoxVue
  },
  data() {
    return {
      userInfo: {},
      actDetailList: [],
      registerList: [],
      items: ["\u5F85\u62A5\u540D", "\u5DF2\u62A5\u540D/\u5DF2\u53C2\u52A0"],
      current: 0,
      count: 0,
      mode: ""
    };
  },
  onLoad() {
    wx.cloud.init();
    common_vendor.index.getStorage({
      key: "userInfo-2",
      success: (res) => {
        this.userInfo = res.data;
      }
    });
    this.mode = "first";
    common_vendor.index.startPullDownRefresh();
  },
  onPullDownRefresh() {
    if (this.mode == "first") {
      this.getActivityList();
      this.getRegisterList();
      this.mode = "more";
    } else {
      if (current == 0) {
        this.getActivityList();
      } else {
        this.getRegisterList();
      }
    }
    setTimeout(function() {
      common_vendor.index.stopPullDownRefresh();
    }, 2e3);
  },
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    },
    async getActivityList() {
      const res = await wx.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
        },
        path: "/activity/activityList?current=" + Date.now(),
        method: "GET",
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        }
      });
      this.actDetailList = res.data.data;
      common_vendor.index.stopPullDownRefresh();
    },
    async getRegisterList() {
      const res = await wx.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
        },
        path: "/activity/registerList",
        method: "GET",
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        }
      });
      this.registerList = res.data.data;
      common_vendor.index.stopPullDownRefresh();
    }
  }
};
const actBoxVue = () => "../../components/act-box/act-box.js";
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _component_act_box_vue = common_vendor.resolveComponent("act-box-vue");
  (_easycom_uni_segmented_control2 + _component_act_box_vue)();
}
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
if (!Math) {
  _easycom_uni_segmented_control();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.onClickItem),
    b: common_vendor.p({
      current: $data.current,
      values: $data.items,
      ["style-type"]: "text",
      ["active-color"]: "#9b0000"
    }),
    c: $data.current == 0
  }, $data.current == 0 ? {
    d: common_vendor.f($data.actDetailList, (actDetail, index, i0) => {
      return {
        a: "69768510-1-" + i0,
        b: common_vendor.p({
          actDetail,
          ifJoined: false
        }),
        c: index
      };
    }),
    e: common_vendor.o(_ctx.toDetail)
  } : {}, {
    f: $data.current == 1
  }, $data.current == 1 ? {
    g: common_vendor.f($data.registerList, (actDetail, index, i0) => {
      return {
        a: "69768510-2-" + i0,
        b: common_vendor.p({
          actDetail,
          ifJoined: true
        }),
        c: index
      };
    }),
    h: common_vendor.o(_ctx.toDetail)
  } : {}, {
    i: $data.current == 1
  }, $data.current == 1 ? {
    j: common_vendor.f($data.registerList, (actDetail, index, i0) => {
      return {
        a: index
      };
    })
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/cssa/cssa-miniprogram/pages/activity/act.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
