"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  onLoad() {
    common_vendor.index.startPullDownRefresh();
  },
  onShow() {
    common_vendor.index.$on("uploadRentalSuccess", this.uploadRentalSuccess);
    this.userInfo = common_vendor.index.getStorageSync("userInfo-2");
  },
  data() {
    return {
      show: false,
      offset: 0,
      limit: 20,
      status: "more",
      myRental: [],
      contentText: {
        contentdown: "上拉显示更多",
        contentrefresh: "正在加载...",
        contentnomore: "没有更多了"
      }
    };
  },
  components: {
    rentalBoxVue
  },
  onPullDownRefresh() {
    this.limit = 20;
    this.offset = 0;
    this.status = "more";
    this.myRental = [];
    this.getMyRental();
  },
  methods: {
    setRentalTime: async function(index, flag) {
      let UTCtime;
      flag == 0 ? UTCtime = "1970-01-01T00:00:00Z" : UTCtime = common_vendor.moment.utc().format();
      common_vendor.index.showLoading({
        mask: true
      });
      const res = await common_vendor.wx$1.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
        },
        path: `/user/setTime?UTCtime=${UTCtime}&itemID=${this.myRental[index].rentalID}&service=rental`,
        method: "GET",
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        }
      });
      common_vendor.index.hideLoading();
      if (res.data.status == 100) {
        common_vendor.index.showToast({
          title: "操作成功",
          icon: "success"
        });
        flag == 0 ? this.myRental[index].publishedTime = 0 : this.myRental[index].publishedTime = common_vendor.moment().utc(UTCtime).valueOf();
        this.myRental[index].UTCPublishedTime = UTCtime;
        console.log(this.myRental[index]);
      }
    },
    deleteShow: function(index) {
      common_vendor.index.showModal({
        title: "提示",
        content: "是否删除?删除后不可恢复",
        success: (res) => {
          if (res.confirm) {
            this.deleteMySecondhand(this.deleteMyRental(index));
          }
        }
      });
    },
    deleteMyRental: async function(index) {
      common_vendor.index.showLoading({
        mask: true
      });
      const res = await common_vendor.wx$1.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
        },
        path: `/user/deleteMyItem?itemID=${this.myRental[index].rentalID}&service=rental`,
        method: "DELETE",
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        }
      });
      common_vendor.index.hideLoading();
      if (res.data && res.data.status == 100) {
        common_vendor.index.showToast({
          title: "成功删除"
        });
        this.myRental = this.myRental.splice(index, 1);
        common_vendor.index.startPullDownRefresh();
      } else {
        common_vendor.index.showToast({
          title: "删除失败",
          icon: "error"
        });
      }
    },
    uploadRentalSuccess: function() {
      common_vendor.index.startPullDownRefresh();
      common_vendor.index.showToast({
        title: "更新成功",
        duration: 5e3
      });
    },
    getMyRental: async function() {
      if (this.status == "noMore") {
        return;
      }
      this.status = "loading";
      const res = await common_vendor.wx$1.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
        },
        path: `/user/getMyList?limit=${this.limit}&offset=${this.offset}&service=rental`,
        method: "GET",
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        }
      });
      if (res.data && res.data.status == 100) {
        if (res.data.data.length < this.limit) {
          this.status = "noMore";
        }
        this.offset += this.limit;
        for (let i = 0; i < res.data.data.length; i++) {
          res.data.data[i].sellerAvatar = this.userInfo.avatar;
          res.data.data[i].sellerNickname = this.userInfo.nickname;
        }
      }
      this.myRental = this.myRental.concat(res.data.data);
      common_vendor.index.stopPullDownRefresh();
    },
    refresh: function() {
      common_vendor.index.startPullDownRefresh();
    },
    editMyRental: async function(index) {
      common_vendor.index.navigateTo({
        url: "../rental/rentalPost?rental=" + encodeURIComponent(JSON.stringify(this.myRental[index]))
      });
    }
  }
};
const rentalBoxVue = () => "../../components/rental-box/rental-box.js";
if (!Array) {
  const _component_rental_box_vue = common_vendor.resolveComponent("rental-box-vue");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_component_rental_box_vue + _easycom_uni_load_more2)();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  _easycom_uni_load_more();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.myRental, (rental, index, i0) => {
      return common_vendor.e({
        a: "1082b236-0-" + i0,
        b: common_vendor.p({
          rentalInfo: rental
        }),
        c: rental.publishedTime == 0
      }, rental.publishedTime == 0 ? {} : {}, {
        d: rental.publishedTime != 0
      }, rental.publishedTime != 0 ? {
        e: common_vendor.o(($event) => $options.editMyRental(index), index)
      } : {}, {
        f: rental.publishedTime != 0
      }, rental.publishedTime != 0 ? {
        g: common_vendor.o(($event) => $options.setRentalTime(index, 0), index)
      } : {}, {
        h: rental.publishedTime == 0
      }, rental.publishedTime == 0 ? {
        i: common_vendor.o(($event) => $options.setRentalTime(index, 1), index)
      } : {}, {
        j: rental.publishedTime != 0
      }, rental.publishedTime != 0 ? {
        k: common_vendor.o(($event) => $options.deleteShow(index), index)
      } : {}, {
        l: index
      });
    }),
    b: common_vendor.p({
      status: $data.status,
      contentText: $data.contentText
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/pages/myRental/myRental.vue"]]);
wx.createPage(MiniProgramPage);
