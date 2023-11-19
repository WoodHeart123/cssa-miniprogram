"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  onShareAppMessage(res) {
    return {
      title: "麦屯小助手",
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
      items: ["待报名", "已报名/已参加"],
      current: 0,
      count: 0,
      mode: ""
    };
  },
  onLoad() {
    common_vendor.wx$1.cloud.init();
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
      const res = await common_vendor.wx$1.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
          // 微信云托管的环境ID
        },
        path: "/activity/activityList?current=" + Date.now(),
        method: "GET",
        // 按照自己的业务开发，选择对应的方法
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        }
      });
      this.actDetailList = res.data.data;
      common_vendor.index.stopPullDownRefresh();
    },
    async getRegisterList() {
      const res = await common_vendor.wx$1.cloud.callContainer({
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
        a: common_vendor.o(_ctx.toDetail, index),
        b: "9306ac4a-1-" + i0,
        c: common_vendor.p({
          actDetail,
          ifJoined: false
        }),
        d: index
      };
    })
  } : {}, {
    e: $data.current == 1
  }, $data.current == 1 ? {
    f: common_vendor.f($data.registerList, (actDetail, index, i0) => {
      return {
        a: common_vendor.o(_ctx.toDetail, index),
        b: "9306ac4a-2-" + i0,
        c: common_vendor.p({
          actDetail,
          ifJoined: true
        }),
        d: index
      };
    })
  } : {}, {
    g: $data.current == 1
  }, $data.current == 1 ? {
    h: common_vendor.f($data.registerList, (actDetail, index, i0) => {
      return {
        a: index
      };
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/pages/activity/act.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
