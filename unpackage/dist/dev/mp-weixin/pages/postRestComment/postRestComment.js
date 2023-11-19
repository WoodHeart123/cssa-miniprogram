"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      comment: {},
      range: [],
      edit: false,
      commentMap: {},
      rules: {
        comment: {
          rules: [
            {
              required: true,
              errorMessage: "请填写评论"
            },
            {
              maxLength: 400,
              errorMessage: "评论最长为400字符"
            }
          ]
        }
      },
      path: "/course/postcomment",
      course: {}
    };
  },
  onLoad(options) {
    if (options.edit == "false") {
      this.edit = false;
      this.path = "/course/postcomment";
    } else {
      this.edit = true;
      this.path = "/user/updateComment";
    }
    if (!this.edit) {
      this.initTimePicker();
      this.restaurant = JSON.parse(decodeURIComponent(options.restaurant));
      this.rules["good"] = {
        rules: [{
          required: true,
          errorMessage: "请选择好吃程度"
        }]
      };
      this.rules["prefer"] = {
        rules: [{
          required: true,
          errorMessage: "请选择推荐度"
        }]
      };
      this.comment.restID = this.restaurant.restID;
      this.comment.restName = this.restaurant.Name;
      this.comment.userAvatar = 2;
    } else {
      this.comment = JSON.parse(decodeURIComponent(options.comment));
    }
    common_vendor.index.getStorage({
      key: "commentMap",
      success: (res) => {
        this.commentMap = res.data;
      },
      fail: () => {
        this.commentMap = {};
      }
    });
  },
  methods: {
    initTimePicker: function() {
      let year = (/* @__PURE__ */ new Date()).getFullYear();
      let month = (/* @__PURE__ */ new Date()).getMonth();
      for (let i = 2018; i <= year; i++) {
        let temp = {
          text: String(i),
          value: String(i),
          children: [{
            text: "Spring",
            value: String(i) + " Spring"
          }]
        };
        if (i == year && month >= 6 || i < year) {
          temp.children.push({
            text: "Summer",
            value: String(i) + " Summer"
          });
        }
        if (i == year && month >= 9 || i < year) {
          temp.children.push({
            text: "Fall",
            value: String(i) + " Fall"
          });
        }
        this.range.push(temp);
      }
    },
    async postComment() {
      common_vendor.index.showLoading({
        title: "正在上传中",
        mask: true
      });
      const res = await common_vendor.wx$1.cloud.callContainer({
        config: {
          env: "prod-9gip97mx4bfa32a3"
        },
        path: this.path,
        method: "POST",
        header: {
          "X-WX-SERVICE": "springboot-ds71"
        },
        data: this.comment
      });
      if (res.data.status == 500) {
        common_vendor.index.showToast({
          icon: "fail",
          title: "服务发生错误，请稍后尝试"
        });
        common_vendor.index.hideLoading();
        return;
      } else if (res.data.status == 110) {
        this.commentMap[this.comment.courseID] = 2;
        common_vendor.index.showToast({
          title: "超过两条评论",
          icon: "error",
          mask: true,
          complete: () => {
            common_vendor.index.setStorageSync("commentMap", this.commentMap);
          }
        });
        setTimeout(() => {
          common_vendor.index.hideLoading();
          common_vendor.index.navigateBack();
        }, 1500);
        return;
      } else if (res.data.status == 100 && !this.edit) {
        if (this.commentMap[this.comment.courseID] == void 0) {
          this.commentMap[this.comment.courseID] = 1;
        } else {
          this.commentMap[this.comment.courseID] += 1;
        }
        common_vendor.index.setStorageSync("commentMap", this.commentMap);
        this.course.avgPrefer = (this.course.avgPrefer * this.course.commentCount + this.comment.prefer) / (this.course.commentCount + 1);
        this.course.avgDifficulty = (this.course.avgDifficulty * this.course.commentCount + this.comment.difficulty) / (this.course.commentCount + 1);
        this.course.commentCount += 1;
      }
      common_vendor.index.hideLoading();
      common_vendor.index.$emit("updateRestaurant", { restaurant: this.res });
      this.$emit("refreshPage");
      common_vendor.index.navigateBack();
    },
    submit: function() {
      this.$refs["form"].validate().then((res) => {
        this.postComment();
      }).catch((err) => {
        console.log("err", err);
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_rate2 + _easycom_uni_forms_item2 + _easycom_uni_easyinput2 + _easycom_uni_forms2)();
}
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_rate + _easycom_uni_forms_item + _easycom_uni_easyinput + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t(this.comment.restName),
    b: !$data.edit
  }, !$data.edit ? {
    c: common_vendor.o(($event) => $data.comment.difficulty = $event),
    d: common_vendor.p({
      size: "36",
      ["is-fill"]: false,
      modelValue: $data.comment.difficulty
    }),
    e: common_vendor.p({
      name: "good",
      label: "好吃"
    }),
    f: common_vendor.o(($event) => $data.comment.prefer = $event),
    g: common_vendor.p({
      size: "36",
      ["is-fill"]: false,
      modelValue: $data.comment.prefer
    }),
    h: common_vendor.p({
      name: "prefer",
      label: "推荐"
    }),
    i: common_vendor.o(($event) => $data.comment.comment = $event),
    j: common_vendor.p({
      autoHeight: true,
      clearable: false,
      type: "textarea",
      placeholder: "可以从餐厅装修，菜品菜量，服务等方面进行评价",
      maxlength: "400",
      modelValue: $data.comment.comment
    }),
    k: common_vendor.p({
      name: "comment",
      ["label-position"]: "top"
    }),
    l: common_vendor.sr("form", "eb1de5e4-0"),
    m: common_vendor.p({
      model: $data.comment,
      ["label-align"]: "left",
      rules: $data.rules
    })
  } : {}, {
    n: common_vendor.o((...args) => $options.submit && $options.submit(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/pages/postRestComment/postRestComment.vue"]]);
wx.createPage(MiniProgramPage);
