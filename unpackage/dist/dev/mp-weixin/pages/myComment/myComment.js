"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  onLoad() {
    wx.cloud.init();
    common_vendor.index.getStorage({
      key: "userInfo-2",
      success: (res) => {
        this.likedComment = res.data.likedComment;
        this.avatar = res.data.avatar;
      }
    });
  },
  onShow() {
    this.getMyComment();
  },
  onHide() {
    this.status = "more";
    this.offset = 0;
    this.myComment = [];
  },
  data() {
    return {
      offset: 0,
      limit: 20,
      status: "more",
      myComment: [],
      contentText: {
        contentdown: "\u4E0A\u62C9\u663E\u793A\u66F4\u591A",
        contentrefresh: "\u6B63\u5728\u52A0\u8F7D...",
        contentnomore: "\u6CA1\u6709\u66F4\u591A\u4E86"
      },
      avatar: 2,
      likedComment: [],
      options1: [
        {
          text: "\u4FEE\u6539\u8BC4\u8BBA",
          style: {
            backgroundColor: "#007aff"
          }
        },
        {
          text: "\u5220\u9664",
          style: {
            backgroundColor: "#F56C6C"
          }
        }
      ]
    };
  },
  methods: {
    async getMyComment() {
      if (this.status == "noMore") {
        return;
      }
      this.status = "loading";
      const res = await wx.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
        },
        path: `/user/getMyComment?limit=${this.limit}&offset=${this.offset}`,
        method: "GET",
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        }
      });
      if (res.data.status == 100) {
        if (res.data.data.length < this.limit) {
          this.status = "noMore";
        } else {
          this.status = "more";
        }
        for (let i = 0; i < res.data.data.length; i++) {
          res.data.data[i].liked = this.likedComment.indexOf(res.data.data[i].commentID) != -1;
          res.data.data[i].userAvatar = this.avatar;
        }
        this.offset = res.data.data[res.data.data.length - 1].commentID;
        this.myComment = this.myComment.concat(res.data.data);
      } else {
        this.status = "more";
      }
    },
    deleteComment: async function(index, commentID) {
      const res = await wx.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
        },
        path: `/user/deleteComment`,
        method: "POST",
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        },
        data: commentID
      });
      if (res.data.status == 100) {
        this.myComment.splice(index, 1);
        common_vendor.index.showToast({
          title: "\u6210\u529F\u5220\u9664"
        });
      } else {
        common_vendor.index.showToast({
          title: "\u5220\u9664\u5931\u8D25",
          icon: "error"
        });
      }
    },
    bindClick: function(e) {
      if (e.key == 0) {
        common_vendor.index.navigateTo({
          url: "/pages/postComment/postComment?comment=" + encodeURIComponent(JSON.stringify(this.myComment[e.index])) + "&edit=true"
        });
      } else {
        common_vendor.index.showModal({
          title: "\u5220\u9664\u5410\u69FD",
          content: "\u662F\u5426\u5220\u9664\u5410\u69FD\uFF1F\u5220\u9664\u540E\u5C06\u65E0\u6CD5\u6062\u590D",
          confirmColor: "#1684FC",
          success: function(res) {
            if (res.confirm) {
              this.deleteComment(e.index, this.myComment[e.index].commentID);
            }
          }.bind(this)
        });
      }
    }
  },
  components: {
    commentBoxVue
  }
};
const commentBoxVue = () => "../../components/comment-box/comment-box.js";
if (!Array) {
  const _component_commentBoxVue = common_vendor.resolveComponent("commentBoxVue");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_component_commentBoxVue + _easycom_uni_load_more2)();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  _easycom_uni_load_more();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.myComment, (comment, index, i0) => {
      return {
        a: "f938efbe-0-" + i0,
        b: common_vendor.p({
          comment,
          user: "true"
        }),
        c: index
      };
    }),
    b: common_vendor.p({
      status: $data.status,
      contentText: $data.contentText
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/cssa/cssa-miniprogram/pages/myComment/myComment.vue"]]);
wx.createPage(MiniProgramPage);
