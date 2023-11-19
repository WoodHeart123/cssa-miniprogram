"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  onShareAppMessage(res) {
    if (res.from === "button") {
      console.log(res.target);
    }
    return {
      title: this.actDetail.title,
      path: "/pages/detail/detail?actDetail=" + encodeURIComponent(JSON.stringify(this.actDetail))
    };
  },
  data() {
    return {
      show_price: false,
      remain: 0,
      discount: 0,
      distance_1: 0,
      distance_2: 0,
      height: "",
      sample: "hao",
      buttonGroup: [{
        text: "立即参加",
        backgroundColor: "#1684FC",
        color: "#fff"
      }],
      actDetail: {},
      userInfo: {},
      options: [],
      enable: false,
      show: false,
      loadShow: false
    };
  },
  onLoad(options) {
    this.actDetail = JSON.parse(decodeURIComponent(options.actDetail));
    console.log(this.actDetail);
    this.update_number();
    for (let i = 0; i < this.actDetail.additionalInfo.length; i++) {
      if (this.actDetail.additionalInfo[i].type == "select") {
        this.actDetail.additionalInfo[i].index = 0;
        this.actDetail.additionalInfo[i].value = this.actDetail.additionalInfo[i].options[0];
      }
    }
  },
  methods: {
    update_price() {
      if (this.userInfo.discount == 1 || this.actDetail.price == 0) {
        this.discount = 1;
      } else {
        this.discount = this.userInfo.discount;
        this.show_price = true;
      }
    },
    update_number() {
      this.remain = this.actDetail.capacity - this.actDetail.userJoinedNum;
    },
    update_button() {
      if (this.userInfo.ifJoined) {
        this.buttonGroup[0].text = "已参加/查看付款方式";
        this.buttonGroup[0].backgroundColor = "#A8A8A8";
        this.buttonGroup[0].color = "#101010";
        this.enable = false;
      } else if (this.remain == 0) {
        this.buttonGroup[0].text = "人数已满";
        this.buttonGroup[0].backgroundColor = "#A8A8A8";
        this.buttonGroup[0].color = "#101010";
        this.enable = false;
      }
    },
    toPay() {
      if (this.userInfo.ifJoined) {
        common_vendor.index.navigateTo({
          url: "/pages/activity/finished"
        });
      } else if (this.remain != 0 && this.actDetail.additionalInfo.length == 0) {
        this.register();
      } else if (this.remain != 0) {
        this.actDetail.payment = Math.floor(this.actDetail.price * this.discount);
        common_vendor.index.navigateTo({
          url: "/pages/activity/remark?actDetail=" + encodeURIComponent(JSON.stringify(this.actDetail))
        });
      } else {
        common_vendor.index.showToast({
          title: "人数已满"
        });
      }
    },
    async checkSignUp() {
      const res = await common_vendor.wx$1.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
          // 微信云托管的环境ID
        },
        path: "/activity/checksignup?actID=" + this.actDetail.actID + "&date=0",
        method: "GET",
        // 按照自己的业务开发，选择对应的方法
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        }
      });
      this.userInfo = res.data.data;
      this.update_number();
      this.update_price();
      this.update_button();
    },
    async register() {
      this.loadShow = true;
      let bodyData = {
        actId: this.actDetail.actID,
        response: [],
        payment: 0
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
      this.loadShow = true;
      if (res.data.status == 100) {
        common_vendor.index.reLaunch({
          url: "/pages/activity/finished"
        });
      } else {
        common_vendor.index.showToast({ title: res.data.message });
      }
    }
  },
  mounted() {
    const query = common_vendor.index.createSelectorQuery().in(this);
    query.select(".tit").boundingClientRect();
    query.select(".buy").boundingClientRect();
    query.exec((res) => {
      this.distance_1 = res[0].bottom;
      this.distance_2 = res[1].top;
      console.log(this.distance_2 - this.distance_1);
      this.height = "height: " + (this.distance_2 - this.distance_1 - 20) + "px;";
      console.log(this.height);
    });
    common_vendor.wx$1.cloud.init();
    this.checkSignUp();
  },
  computed: {
    actDateFormat() {
      return common_vendor.hooks(this.actDetail.startDate).format("YYYY-MM-DD h:mm a");
    },
    endDateFormat() {
      return common_vendor.hooks(this.actDetail.endDate).format("YYYY-MM-DD h:mm a");
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
  return common_vendor.e({
    a: $data.actDetail.imgs,
    b: this.actDetail.price != 0
  }, this.actDetail.price != 0 ? {
    c: common_vendor.t(this.userInfo.ifJoined ? $data.actDetail.price : Math.round($data.actDetail.price * $data.discount))
  } : {}, {
    d: this.actDetail.price == 0
  }, this.actDetail.price == 0 ? {} : {}, {
    e: $data.show_price && !$data.userInfo.ifJoined
  }, $data.show_price && !$data.userInfo.ifJoined ? {
    f: common_vendor.t($data.actDetail.price)
  } : {}, {
    g: common_vendor.t($data.actDetail.title),
    h: !this.userInfo.ifJoined
  }, !this.userInfo.ifJoined ? {
    i: common_vendor.t($data.actDetail.userJoinedNum),
    j: common_vendor.t($data.actDetail.capacity)
  } : {}, {
    k: common_vendor.t($options.actDateFormat),
    l: common_vendor.t($options.endDateFormat),
    m: common_vendor.t($data.actDetail.description),
    n: $data.actDetail.description,
    o: common_vendor.s($data.height),
    p: common_vendor.o($options.toPay),
    q: common_vendor.p({
      buttonGroup: $data.buttonGroup,
      options: $data.options,
      fill: "true"
    }),
    r: common_vendor.p({
      show: $data.loadShow
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/pages/detail/detail.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
