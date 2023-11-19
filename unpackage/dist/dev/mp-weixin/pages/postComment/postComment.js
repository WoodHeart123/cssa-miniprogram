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
      this.course = JSON.parse(decodeURIComponent(options.course));
      this.rules["professor"] = {
        rules: [{
          required: true,
          errorMessage: "请填写教授名字"
        }]
      };
      this.rules["courseTime"] = {
        rules: [{
          required: true,
          errorMessage: "请选择教学时间"
        }]
      };
      this.rules["difficulty"] = {
        rules: [{
          required: true,
          errorMessage: "请选择难度"
        }]
      };
      this.rules["prefer"] = {
        rules: [{
          required: true,
          errorMessage: "请选择推荐度"
        }]
      };
      this.comment.courseID = this.course.courseID;
      this.comment.courseName = this.course.courseName;
      this.comment.userAvatar = common_vendor.index.getStorageSync("userInfo-2").avatar;
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
      common_vendor.index.$emit("updateCourse", { course: this.course });
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
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_rate2 + _easycom_uni_data_picker2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_data_picker = () => "../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_rate + _easycom_uni_data_picker + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t(this.comment.courseName),
    b: !$data.edit
  }, !$data.edit ? {
    c: common_vendor.o(($event) => $data.comment.professor = $event),
    d: common_vendor.p({
      clearable: false,
      placeholder: "教授名",
      modelValue: $data.comment.professor
    }),
    e: common_vendor.p({
      name: "professor",
      label: "教授"
    }),
    f: common_vendor.o(($event) => $data.comment.difficulty = $event),
    g: common_vendor.p({
      size: "36",
      ["is-fill"]: false,
      modelValue: $data.comment.difficulty
    }),
    h: common_vendor.p({
      name: "difficulty",
      label: "难度"
    }),
    i: common_vendor.o(($event) => $data.comment.prefer = $event),
    j: common_vendor.p({
      size: "36",
      ["is-fill"]: false,
      modelValue: $data.comment.prefer
    }),
    k: common_vendor.p({
      name: "prefer",
      label: "推荐"
    }),
    l: common_vendor.o(($event) => $data.comment.courseTime = $event),
    m: common_vendor.p({
      localdata: $data.range,
      modelValue: $data.comment.courseTime
    }),
    n: common_vendor.p({
      name: "courseTime",
      label: "时间"
    }),
    o: common_vendor.o(($event) => $data.comment.comment = $event),
    p: common_vendor.p({
      autoHeight: true,
      clearable: false,
      type: "textarea",
      placeholder: "可以从课程内容，作业量，需要的前置知识等方面进行评价",
      maxlength: "400",
      modelValue: $data.comment.comment
    }),
    q: common_vendor.p({
      name: "comment",
      ["label-position"]: "top"
    }),
    r: common_vendor.sr("form", "653ae614-0"),
    s: common_vendor.p({
      model: $data.comment,
      ["label-align"]: "left",
      rules: $data.rules
    })
  } : {}, {
    t: common_vendor.o((...args) => $options.submit && $options.submit(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/pages/postComment/postComment.vue"]]);
wx.createPage(MiniProgramPage);
