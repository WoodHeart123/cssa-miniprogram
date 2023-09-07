"use strict";
var common_vendor = require("../../common/vendor.js");
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
              errorMessage: "\u8BF7\u586B\u5199\u8BC4\u8BBA"
            },
            {
              maxLength: 400,
              errorMessage: "\u8BC4\u8BBA\u6700\u957F\u4E3A400\u5B57\u7B26"
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
          errorMessage: "\u8BF7\u586B\u5199\u6559\u6388\u540D\u5B57"
        }]
      };
      this.rules["courseTime"] = {
        rules: [{
          required: true,
          errorMessage: "\u8BF7\u9009\u62E9\u6559\u5B66\u65F6\u95F4"
        }]
      };
      this.rules["difficulty"] = {
        rules: [{
          required: true,
          errorMessage: "\u8BF7\u9009\u62E9\u96BE\u5EA6"
        }]
      };
      this.rules["prefer"] = {
        rules: [{
          required: true,
          errorMessage: "\u8BF7\u9009\u62E9\u63A8\u8350\u5EA6"
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
      let year = new Date().getFullYear();
      let month = new Date().getMonth();
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
        title: "\u6B63\u5728\u4E0A\u4F20\u4E2D",
        mask: true
      });
      const res = await wx.cloud.callContainer({
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
          title: "\u670D\u52A1\u53D1\u751F\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u5C1D\u8BD5"
        });
        common_vendor.index.hideLoading();
        return;
      } else if (res.data.status == 110) {
        this.commentMap[this.comment.courseID] = 2;
        common_vendor.index.showToast({
          title: "\u8D85\u8FC7\u4E24\u6761\u8BC4\u8BBA",
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
      placeholder: "\u6559\u6388\u540D",
      modelValue: $data.comment.professor
    }),
    e: common_vendor.p({
      name: "professor",
      label: "\u6559\u6388"
    }),
    f: common_vendor.o(($event) => $data.comment.difficulty = $event),
    g: common_vendor.p({
      size: "36",
      ["is-fill"]: false,
      modelValue: $data.comment.difficulty
    }),
    h: common_vendor.p({
      name: "difficulty",
      label: "\u96BE\u5EA6"
    }),
    i: common_vendor.o(($event) => $data.comment.prefer = $event),
    j: common_vendor.p({
      size: "36",
      ["is-fill"]: false,
      modelValue: $data.comment.prefer
    }),
    k: common_vendor.p({
      name: "prefer",
      label: "\u63A8\u8350"
    }),
    l: common_vendor.o(($event) => $data.comment.courseTime = $event),
    m: common_vendor.p({
      localdata: $data.range,
      modelValue: $data.comment.courseTime
    }),
    n: common_vendor.p({
      name: "courseTime",
      label: "\u65F6\u95F4"
    }),
    o: common_vendor.o(($event) => $data.comment.comment = $event),
    p: common_vendor.p({
      autoHeight: true,
      clearable: false,
      type: "textarea",
      placeholder: "\u53EF\u4EE5\u4ECE\u8BFE\u7A0B\u5185\u5BB9\uFF0C\u4F5C\u4E1A\u91CF\uFF0C\u9700\u8981\u7684\u524D\u7F6E\u77E5\u8BC6\u7B49\u65B9\u9762\u8FDB\u884C\u8BC4\u4EF7",
      maxlength: "400",
      modelValue: $data.comment.comment
    }),
    q: common_vendor.p({
      name: "comment",
      ["label-position"]: "top"
    }),
    r: common_vendor.sr("form", "52d30539-0"),
    s: common_vendor.p({
      model: $data.comment,
      ["label-align"]: "left",
      rules: $data.rules
    })
  } : {}, {
    t: common_vendor.o((...args) => $options.submit && $options.submit(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/cssa/cssa-miniprogram/pages/postComment/postComment.vue"]]);
wx.createPage(MiniProgramPage);
