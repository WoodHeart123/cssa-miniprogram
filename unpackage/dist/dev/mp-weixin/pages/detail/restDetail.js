"use strict";
const common_vendor = require("../../common/vendor.js");
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
        Name: "快乐小羊",
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
          restName: "快了小羊",
          good: 3,
          prefer: 4,
          likeCount: 5,
          liked: true,
          comment: "可太好吃了，棒棒棒！！！！！"
        },
        {
          restName: "快了小羊",
          good: 3,
          prefer: 4,
          likeCount: 5,
          liked: true,
          comment: "可太好吃了，棒棒棒！！！！！"
        }
      ],
      offset: 0,
      limit: 10,
      order: [],
      contentText: {
        contentdown: "上拉显示更多",
        contentrefresh: "正在加载...",
        contentnomore: "没有更多评论了"
      },
      restMap: {},
      sharing: false
    };
  },
  /*
  onShareAppMessage(res) {
  	this.sharing = true;
  	return {
  		title: this.course.departmentAbrev + " " + String(this.course.courseNum) + "-" + this.course.courseName,
  		path: '/pages/coursePage/coursePage?course=' + encodeURIComponent(JSON.stringify(this.course)),
  		imageUrl: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-share/forum.png"
  	}
  },
  onShareTimeline(res) {
  	this.sharing = true;
  	return {
  		title: this.course.courseName,
  		path: '/pages/coursePage/coursePage?course=' + encodeURIComponent(JSON.stringify(this.course)),	
  	}
  },
  */
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
      const res = await common_vendor.wx$1.cloud.callContainer({
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
          title: "出现未知错误",
          duration: 2e3,
          image: "../../static/wrong.png"
        });
      }
      this.commentList = this.commentList.concat(res.data.data);
    },
    async login() {
      common_vendor.index.showLoading();
      const res = await common_vendor.wx$1.cloud.callContainer({
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
        //url:"/pages/map/map?location=" + encodeURIComponent(JSON.stringify({longtitude:88.12610, latitude:41.79564})),
        url: "/pages/map/map"
      });
    }
  },
  /*
  onLoad(options) {
  	this.course = JSON.parse(decodeURIComponent(options.course));
  	uni.setNavigationBarTitle({
  		title: this.course.departmentAbrev + " " + String(this.course.courseNum)
  	});	
  },
  onHide(){
  	if(!this.sharing){
  		this.status = "more";
  		this.offset = 0;
  		this.commentList = [];
  	}	
  },
  */
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
        a: "a711126c-2-" + i0,
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/pages/detail/restDetail.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
