"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {
    restBoxVue
  },
  data() {
    return {
      pattern: {
        buttonColor: "#9B0000"
      },
      restaurant: {
        restID: 123,
        Name: "\u5FEB\u4E50\u5C0F\u7F8A",
        avgGood: 3,
        avgPrefer: 4,
        commentCount: 5
      },
      showLoad: false,
      status: "more",
      key: 0,
      orderType: ["SORT_BY_TIME", "SORT_BY_LIKE"],
      isStudent: false,
      isLogin: true,
      likedComment: [],
      userInfo: {},
      commentList: [
        {
          restName: "\u5FEB\u4E86\u5C0F\u7F8A",
          good: 3,
          prefer: 4,
          likeCount: 5,
          liked: true,
          comment: "\u53EF\u592A\u597D\u5403\u4E86\uFF0C\u68D2\u68D2\u68D2\uFF01\uFF01\uFF01\uFF01\uFF01"
        },
        {
          restName: "\u5FEB\u4E86\u5C0F\u7F8A",
          good: 3,
          prefer: 4,
          likeCount: 5,
          liked: true,
          comment: "\u53EF\u592A\u597D\u5403\u4E86\uFF0C\u68D2\u68D2\u68D2\uFF01\uFF01\uFF01\uFF01\uFF01"
        }
      ],
      offset: 0,
      limit: 10,
      order: [],
      contentText: {
        contentdown: "\u4E0A\u62C9\u663E\u793A\u66F4\u591A",
        contentrefresh: "\u6B63\u5728\u52A0\u8F7D...",
        contentnomore: "\u6CA1\u6709\u66F4\u591A\u8BC4\u8BBA\u4E86"
      },
      restMap: {},
      sharing: false
    };
  },
  methods: {
    changeKey: function(num) {
      if (this.key != num) {
        this.offset = 0;
        this.key = num;
      }
    },
    async getCommentList() {
      if (this.status == "noMore") {
        return;
      }
      this.status = "loading";
      const res = await wx.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
        },
        path: "/course/getCommentList?courseID=" + this.course.courseID + "&offset=" + this.offset + "&limit=" + this.limit + "&order=" + this.orderType[this.key],
        method: "GET",
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        }
      });
      if (res.data.data.length < this.limit) {
        this.status = "noMore";
      } else {
        this.status = "more";
      }
      if (res.data.status == 100 && this.limit <= 40) {
        this.offset += this.limit;
        if (this.limit <= 40) {
          this.limit *= 2;
        }
        for (let i = 0; i < res.data.data.length; i++) {
          res.data.data[i].liked = this.likedComment.indexOf(res.data.data[i].commentID) != -1;
        }
      } else {
        common_vendor.index.showToast({
          title: "\u51FA\u73B0\u672A\u77E5\u9519\u8BEF",
          duration: 2e3,
          image: "../../static/wrong.png"
        });
      }
      this.commentList = this.commentList.concat(res.data.data);
    },
    async login() {
      common_vendor.index.showLoading();
      const res = await wx.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
        },
        path: "/user/login?nickname=" + encodeURI(this.userInfo.nickName),
        method: "GET",
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        }
      });
      this.isLogin = true;
      this.isStudent = res.data.data.isStudent;
      common_vendor.index.setStorage({
        key: "userInfo-2",
        data: res.data.data
      });
      common_vendor.index.hideLoading();
      this.toComment();
    },
    toComment: function() {
      common_vendor.index.navigateTo({
        url: "/pages/postRestComment/postRestComment?restaurant=" + encodeURIComponent(JSON.stringify(this.restaurant)) + "&edit=false"
      });
    },
    NavMap: function() {
      common_vendor.index.navigateTo({
        url: "/pages/map/map"
      });
    }
  },
  onShow() {
    this.sharing = false;
    common_vendor.index.getStorage({
      key: "restCommentMap",
      success: (res) => {
        this.restMap = res.data;
      },
      fail: () => {
        this.restMap = {};
        common_vendor.index.setStorage({
          key: "restCommentMap",
          data: {}
        });
      }
    });
  }
};
const restBoxVue = () => "../../components/rest-box/rest-box.js";
if (!Array) {
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _component_restBoxVue = common_vendor.resolveComponent("restBoxVue");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  (_easycom_uni_rate2 + _component_restBoxVue + _easycom_uni_load_more2 + _easycom_uni_fab2)();
}
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_fab = () => "../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
if (!Math) {
  (_easycom_uni_rate + _easycom_uni_load_more + _easycom_uni_fab)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.restaurant.Name),
    b: common_vendor.o(($event) => $options.NavMap()),
    c: common_vendor.p({
      readonly: "true",
      value: $data.restaurant.avgGood,
      allowHalf: "true",
      size: "20"
    }),
    d: common_vendor.t($data.restaurant.avgGood.toFixed(1)),
    e: common_vendor.p({
      readonly: "true",
      value: $data.restaurant.avgPrefer,
      allowHalf: "true",
      size: "20"
    }),
    f: common_vendor.t($data.restaurant.avgPrefer.toFixed(1)),
    g: common_vendor.t($data.restaurant.commentCount),
    h: common_vendor.n($data.key == 0 ? "row-container filter filter-selected" : "row-container filter"),
    i: common_vendor.o(($event) => $options.changeKey(0)),
    j: common_vendor.n($data.key == 1 ? "row-container filter filter-selected" : "row-container filter"),
    k: common_vendor.o(($event) => $options.changeKey(1)),
    l: common_vendor.f($data.commentList, (comment, index, i0) => {
      return {
        a: "66a7c566-2-" + i0,
        b: common_vendor.p({
          comment,
          user: false
        }),
        c: index
      };
    }),
    m: common_vendor.p({
      status: $data.status,
      contentText: $data.contentText
    }),
    n: common_vendor.o(($event) => $options.getCommentList()),
    o: common_vendor.o($options.toComment),
    p: common_vendor.p({
      pattern: $data.pattern,
      horizontal: "right",
      vertical: "bottom",
      popMene: "false"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/cssa/cssa-miniprogram/pages/detail/restDetail.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
