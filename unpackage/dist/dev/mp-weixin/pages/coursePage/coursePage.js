"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {
    commentBoxVue
  },
  data() {
    return {
      pattern: {
        buttonColor: "#9B0000"
      },
      course: {},
      showLoad: false,
      status: "more",
      key: 0,
      orderType: ["SORT_BY_TIME", "SORT_BY_LIKE"],
      isStudent: false,
      isLogin: true,
      likedComment: [],
      userInfo: {},
      commentList: [],
      offset: 0,
      limit: 10,
      order: [],
      contentText: {
        contentdown: "\u4E0A\u62C9\u663E\u793A\u66F4\u591A",
        contentrefresh: "\u6B63\u5728\u52A0\u8F7D...",
        contentnomore: "\u6CA1\u6709\u66F4\u591A\u8BC4\u8BBA\u4E86"
      },
      commentMap: {},
      sharing: false
    };
  },
  onShareAppMessage(res) {
    this.sharing = true;
    return {
      title: this.course.departmentAbrev + " " + String(this.course.courseNum) + "-" + this.course.courseName,
      path: "/pages/coursePage/coursePage?course=" + encodeURIComponent(JSON.stringify(this.course)),
      imageUrl: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-share/forum.png"
    };
  },
  onShareTimeline(res) {
    this.sharing = true;
    return {
      title: this.course.courseName,
      path: "/pages/coursePage/coursePage?course=" + encodeURIComponent(JSON.stringify(this.course))
    };
  },
  methods: {
    changeKey: function(num) {
      if (this.key != num) {
        this.offset = 0;
        this.key = num;
        this.getCommentList();
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
      if (this.commentMap[this.course.courseID] != void 0 && this.commentMap[this.course.courseID] >= 2) {
        common_vendor.index.showToast({
          title: "\u8D85\u8FC7\u4E24\u6761\u8BC4\u8BBA",
          icon: "error"
        });
        return;
      }
      if (!this.isLogin) {
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
      common_vendor.index.$once("updateCourse", (data) => {
        this.course = data.course;
      });
      common_vendor.index.navigateTo({
        url: "/pages/postComment/postComment?course=" + encodeURIComponent(JSON.stringify(this.course)) + "&edit=false"
      });
    }
  },
  onLoad(options) {
    this.course = JSON.parse(decodeURIComponent(options.course));
    common_vendor.index.setNavigationBarTitle({
      title: this.course.departmentAbrev + " " + String(this.course.courseNum)
    });
  },
  onHide() {
    if (!this.sharing) {
      this.status = "more";
      this.offset = 0;
      this.commentList = [];
    }
  },
  onShow() {
    this.sharing = false;
    common_vendor.index.getStorage({
      key: "commentMap",
      success: (res) => {
        this.commentMap = res.data;
      },
      fail: () => {
        this.commentMap = {};
        common_vendor.index.setStorage({
          key: "commentMap",
          data: {}
        });
      }
    });
    this.getCommentList();
    common_vendor.index.getStorage({
      key: "userInfo-2",
      success: (res) => {
        this.isStudent = res.data.isStudent;
        this.likedComment = res.data.likedComment;
      },
      fail: () => {
        this.isLogin = false;
      }
    });
  }
};
const commentBoxVue = () => "../../components/comment-box/comment-box.js";
if (!Array) {
  const _component_Text = common_vendor.resolveComponent("Text");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _component_commentBoxVue = common_vendor.resolveComponent("commentBoxVue");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  (_component_Text + _easycom_uni_rate2 + _component_commentBoxVue + _easycom_uni_load_more2 + _easycom_uni_fab2)();
}
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_fab = () => "../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
if (!Math) {
  (_easycom_uni_rate + _easycom_uni_load_more + _easycom_uni_fab)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.course.courseName),
    b: common_vendor.p({
      readonly: "true",
      value: $data.course.avgDifficulty,
      allowHalf: "true",
      size: "20"
    }),
    c: common_vendor.t($data.course.avgDifficulty.toFixed(1)),
    d: common_vendor.p({
      readonly: "true",
      value: $data.course.avgPrefer,
      allowHalf: "true",
      size: "20"
    }),
    e: common_vendor.t($data.course.avgPrefer.toFixed(1)),
    f: common_vendor.t($data.course.credit),
    g: common_vendor.t($data.course.commentCount),
    h: common_vendor.n($data.key == 0 ? "row-container filter filter-selected" : "row-container filter"),
    i: common_vendor.o(($event) => $options.changeKey(0)),
    j: common_vendor.f($data.commentList, (comment, index, i0) => {
      return {
        a: "3cbe808e-3-" + i0,
        b: common_vendor.p({
          comment,
          user: false
        }),
        c: index
      };
    }),
    k: common_vendor.p({
      status: $data.status,
      contentText: $data.contentText
    }),
    l: common_vendor.o(($event) => $options.getCommentList()),
    m: common_vendor.o($options.toComment),
    n: common_vendor.p({
      pattern: $data.pattern,
      horizontal: "right",
      vertical: "bottom",
      popMene: "false"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/cssa/cssa-miniprogram/pages/coursePage/coursePage.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
