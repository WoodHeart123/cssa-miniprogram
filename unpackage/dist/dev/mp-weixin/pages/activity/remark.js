"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      userInfo: {},
      buttonGroup: [{
        text: "提交",
        backgroundColor: "#1684FC",
        color: "#fff"
      }],
      actDetail: {},
      options: [],
      index: 0,
      loadShow: false
    };
  },
  onLoad(options) {
    this.actDetail = JSON.parse(decodeURIComponent(options.actDetail));
    console.log(this.actDetail);
    common_vendor.wx$1.cloud.init();
  },
  methods: {
    jumpToHomePage() {
      common_vendor.wx$1.switchTab({
        url: "/pages/activity/act"
      });
    },
    changeIndex: function(i) {
      this.index = i;
    },
    bindInputChange: function(e) {
      this.actDetail.additionalInfo[this.index].value = e.detail.value;
    },
    bindPickerChange: function(e) {
      console.log(e.detail.value);
      this.actDetail.additionalInfo[this.index].index = e.detail.value;
      this.actDetail.additionalInfo[this.index].value = this.actDetail.additionalInfo[this.index].options[e.detail.value];
    },
    async submit() {
      this.loadShow = true;
      let valueArr = [];
      for (let info of this.actDetail.additionalInfo) {
        valueArr.push(info.value);
      }
      console.log(valueArr);
      let bodyData = {
        actId: this.actDetail.actID,
        response: valueArr,
        payment: this.actDetail.payment
      };
      const res = await common_vendor.wx$1.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
          // 微信云托管的环境ID
        },
        path: "/activity/register",
        method: "POST",
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        },
        data: bodyData
      });
      this.loadShow = false;
      if (res.data.status == 100) {
        common_vendor.index.reLaunch({
          url: "/pages/activity/finished"
        });
      } else {
        common_vendor.index.showToast({ title: res.data.message });
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_goods_nav2 = common_vendor.resolveComponent("uni-goods-nav");
  const _easycom_loading2 = common_vendor.resolveComponent("loading");
  (_easycom_uni_goods_nav2 + _easycom_loading2)();
}
const _easycom_uni_goods_nav = () => "../../uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.js";
const _easycom_loading = () => "../../components/loading/loading.js";
if (!Math) {
  (_easycom_uni_goods_nav + _easycom_loading)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.actDetail.additionalInfo, (info, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(info.name),
        b: info.type == "input"
      }, info.type == "input" ? {
        c: common_vendor.o(($event) => $options.changeIndex(index), index),
        d: common_vendor.o((...args) => $options.bindInputChange && $options.bindInputChange(...args), index),
        e: common_vendor.o((...args) => $options.bindInputChange && $options.bindInputChange(...args), index),
        f: common_vendor.o((...args) => $options.bindInputChange && $options.bindInputChange(...args), index)
      } : {}, {
        g: info.type == "select"
      }, info.type == "select" ? {
        h: common_vendor.t(info.options[info.index] ? info.options[info.index] : _ctx.a),
        i: info.options,
        j: info.index,
        k: common_vendor.o(($event) => $options.changeIndex(index), index),
        l: common_vendor.o((...args) => $options.bindPickerChange && $options.bindPickerChange(...args), index)
      } : {}, {
        m: index
      });
    }),
    b: common_vendor.o($options.submit),
    c: common_vendor.p({
      buttonGroup: $data.buttonGroup,
      options: $data.options,
      fill: "true"
    }),
    d: common_vendor.p({
      show: $data.loadShow
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/pages/activity/remark.vue"]]);
wx.createPage(MiniProgramPage);
