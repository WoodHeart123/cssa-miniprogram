"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: ["comment", "user"],
  name: "rest-box",
  data() {
    return {
      more: true,
      liked: false,
      count: 0
    };
  },
  onReady() {
    const query = common_vendor.index.createSelectorQuery().in(this);
    query.select("#comment-text").boundingClientRect((data) => {
      if (data.height > 150) {
        this.more = false;
      }
    }).exec();
  },
  methods: {
    moreText: function() {
      this.more = true;
    },
    async addZan() {
      if (this.comment.liked) {
        return;
      }
      const res = await common_vendor.wx$1.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
        },
        path: "/course/zan?commentID=" + this.comment.commentID,
        method: "GET",
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        }
      });
      if (res.data.status == 100 || res.data.status == 107) {
        this.liked = true;
        this.count = 1;
        let userInfo = common_vendor.index.getStorageSync("userInfo");
        userInfo.likedComment.push(this.comment.commentID);
        common_vendor.index.setStorageSync("userInfo", userInfo);
      }
      if (res.data.status == 107) {
        common_vendor.index.showToast({
          title: "您已经点过赞啦",
          duration: 2e3
        });
      }
    }
  }
  /*
  computed: {
  	computeCommentTime() {
  		moment.locale('zh-cn');
  		return Date.now() - this.comment.commentTime >= 86400000 * 7 ? moment(this.comment.commentTime).format(
  			"MM-DD") : moment(this.comment.commentTime).fromNow();
  	}
  }
  */
};
if (!Array) {
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  _easycom_uni_rate2();
}
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
if (!Math) {
  _easycom_uni_rate();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.user
  }, $props.user ? {
    b: common_vendor.t($props.comment.restName)
  } : {}, {
    c: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/1.jpg",
    d: common_vendor.p({
      readonly: "true",
      value: $props.comment.good,
      allowHalf: "true",
      size: "17"
    }),
    e: common_vendor.t($props.comment.good),
    f: common_vendor.p({
      readonly: "true",
      value: $props.comment.prefer,
      allowHalf: "true",
      size: "17"
    }),
    g: common_vendor.t($props.comment.prefer),
    h: !this.more
  }, !this.more ? {
    i: common_vendor.o((...args) => $options.moreText && $options.moreText(...args))
  } : {}, {
    j: common_vendor.t($props.comment.comment),
    k: common_vendor.n(this.more ? "comment-body comment-body-more" : "comment-body"),
    l: this.comment.liked ? 1 : "",
    m: this.liked ? 1 : "",
    n: common_vendor.t($props.comment.likeCount + this.count),
    o: common_vendor.o((...args) => $options.addZan && $options.addZan(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/components/rest-box/rest-box.vue"]]);
wx.createComponent(Component);
