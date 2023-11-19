"use strict";
const common_vendor = require("../../common/vendor.js");
const api_request = require("../../api/request.js");
const _sfc_main = {
  components: {
    courseBoxVue
  },
  data() {
    return {
      searchValue: "",
      searching: false,
      showMenu: false,
      key: 1,
      triggered: false,
      status: "more",
      sort: [
        "SORT_BY_COURSE_NUM",
        "SORT_BY_COMMENT_COUNT",
        "SORT_BY_AVG_DIFFICULTY_ASC",
        "SORT_BY_AVG_DIFFICULTY_DESC",
        "SORT_BY_AVG_PREFER_DESC",
        "SORT_BY_AVG_PREFER_ASC"
      ],
      courseCount: 0,
      sortIndex: 1,
      departmentList: [],
      departmentDict: [],
      courseList: [],
      departmentID: 0,
      departmentName: "所有课程",
      timer: {},
      suggestList: [],
      contentText: {
        contentdown: "上拉显示更多",
        contentrefresh: "正在加载...",
        contentnomore: "没有更多课程了"
      },
      searchContentText: {
        contentdown: "上拉显示更多",
        contentrefresh: "正在搜索...",
        contentnomore: "没有匹配课程"
      },
      searchStatus: ""
    };
  },
  onLoad() {
    common_vendor.wx$1.cloud.init();
    this.refresh();
    this.getDepartmentList();
    common_vendor.index.$on("refreshPage", () => {
      this.refresh();
    });
  },
  onShareAppMessage(res) {
    return {
      title: "麦屯小助手-课程吐槽",
      path: "/pages/courseMain/courseMain",
      imageUrl: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-share/forum.png"
    };
  },
  onShareTimeline(res) {
    return {
      title: "麦屯小助手-课程吐槽",
      path: "/pages/courseMain/courseMain"
    };
  },
  methods: {
    onSearch: function() {
      this.searching = true;
    },
    searchBarInput: function(value) {
      if (value.length != 0) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.search(value.replace(/\s/g, "").toLowerCase());
        }, 500);
      }
    },
    async search(value) {
      this.searchStatus = "loading";
      const res = await api_request.requestAPI({
        path: "/course/search?value=" + value,
        type: "GET"
      });
      this.suggestList = res.data.data;
      if (res.data.status == 100) {
        this.searchStatus = "more";
      } else {
        this.searchStatus = "noMore";
        this.suggestList = [];
      }
    },
    changeKey: function(num) {
      if (this.key == num && (this.key == 2 || this.key == 4)) {
        this.sortIndex = (this.sortIndex - num + 1) % 2 + num;
      } else {
        this.sortIndex = num;
      }
      this.key = num;
      this.refresh();
    },
    onFocus: function() {
      this.searching = true;
    },
    onCancel: function() {
      this.searchValue = "";
      this.searching = false;
    },
    clickMenu: function() {
      if (!this.showMenu) {
        this.showMenu = true;
        this.$refs.menuOpen.step({
          rotate: "90"
        });
        this.$refs.main.step({
          translateX: "85vw"
        });
        this.$refs.main.run();
        this.$refs.menuOpen.run();
      } else {
        this.showMenu = false;
        this.$refs.menuOpen.step({
          rotate: "0"
        });
        this.$refs.main.step({
          translateX: "0"
        });
        this.$refs.main.run();
        this.$refs.menuOpen.run();
      }
    },
    onScrollLower: function() {
      this.status = "loading";
      if (this.departmentID != 0) {
        this.status = "noMore";
        return;
      }
      this.getCourseList();
    },
    bindClick(e) {
      this.departmentName = e.item.name;
      this.departmentID = this.departmentDict[e.item.itemIndex.toString()];
      this.courseList = [];
      this.clickMenu();
      this.refresh();
    },
    refresh: function() {
      if (!this.triggered) {
        this.triggered = true;
      } else {
        return;
      }
      this.courseList = [];
      this.courseCount = 0;
      this.getCourseList();
    },
    async getCourseList() {
      const res = await api_request.requestAPI({
        path: `/course/courselist?departmentID=${this.departmentID}&limit=20&offset=${this.courseCount}&orderType=${this.sort[this.sortIndex]}`,
        type: "GET"
      });
      if (res.data.status == 100) {
        this.courseList = this.courseList.concat(res.data.data);
        this.courseCount += 20;
      }
      if (res.data.data.length == 0) {
        this.status = "noMore";
      } else {
        this.status = "more";
      }
      this.$nextTick(() => {
        this.triggered = false;
      });
    },
    async getDepartmentList() {
      const res = await api_request.requestAPI({
        path: "/course/departmentlist",
        type: "GET"
      });
      let tempList = res.data.data;
      this.departmentList = [{
        letter: " ",
        data: ["所有课程"]
      }];
      let wordList = {
        letter: tempList[0].department[0],
        data: []
      };
      this.departmentDict["0"] = 0;
      for (let i = 0; i < tempList.length; i++) {
        if (wordList.letter != tempList[i].department[0]) {
          this.departmentList.push(wordList);
          wordList = {
            letter: tempList[i].department[0],
            data: [tempList[i].department]
          };
        } else {
          wordList.data.push(tempList[i].department);
        }
        this.departmentDict[(i + 1).toString()] = tempList[i].departmentID;
      }
      this.departmentList.push(wordList);
      common_vendor.index.setStorage({
        key: "departmentIndexedList",
        data: this.departmentList
      });
    },
    toCourse: function(course) {
      common_vendor.index.navigateTo({
        url: "/pages/coursePage/coursePage?course=" + encodeURIComponent(JSON.stringify(course))
      });
    }
  }
};
const courseBoxVue = () => "../../components/course-box/course-box.js";
if (!Array) {
  const _easycom_uni_indexed_list2 = common_vendor.resolveComponent("uni-indexed-list");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_transition2 = common_vendor.resolveComponent("uni-transition");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _component_course_box_vue = common_vendor.resolveComponent("course-box-vue");
  (_easycom_uni_indexed_list2 + _easycom_uni_load_more2 + _easycom_uni_transition2 + _easycom_uni_icons2 + _easycom_uni_search_bar2 + _component_course_box_vue)();
}
const _easycom_uni_indexed_list = () => "../../uni_modules/uni-indexed-list/components/uni-indexed-list/uni-indexed-list.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_transition = () => "../../uni_modules/uni-transition/components/uni-transition/uni-transition.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
if (!Math) {
  (_easycom_uni_indexed_list + _easycom_uni_load_more + _easycom_uni_transition + _easycom_uni_icons + _easycom_uni_search_bar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.bindClick),
    b: common_vendor.p({
      options: $data.departmentList,
      ["show-select"]: false
    }),
    c: $data.showMenu,
    d: $data.searching
  }, $data.searching ? {
    e: $data.searchStatus != "more",
    f: common_vendor.p({
      status: $data.searchStatus,
      contentText: $data.searchContentText
    }),
    g: common_vendor.f($data.suggestList, (course, index, i0) => {
      return {
        a: common_vendor.t(course.departmentAbrev + " " + String(course.courseNum) + " "),
        b: common_vendor.t(course.courseName),
        c: index,
        d: common_vendor.o(($event) => $options.toCourse(course), index)
      };
    })
  } : {}, {
    h: common_vendor.o((...args) => $options.clickMenu && $options.clickMenu(...args)),
    i: common_vendor.sr("menuOpen", "78991714-3,78991714-0"),
    j: common_vendor.p({
      show: true
    }),
    k: !$data.searching,
    l: common_vendor.t($data.departmentName),
    m: !$data.searching,
    n: !$data.searching,
    o: common_vendor.o($options.onSearch),
    p: common_vendor.p({
      type: "search",
      size: "30",
      color: "#9B0000"
    }),
    q: !$data.searching,
    r: common_vendor.o($options.onFocus),
    s: common_vendor.o($options.searchBarInput),
    t: common_vendor.o($options.searchBarInput),
    v: common_vendor.o($options.onCancel),
    w: common_vendor.o(($event) => $data.searchValue = $event),
    x: common_vendor.p({
      cancelButton: "auto",
      placeholder: "搜索课程",
      clearButton: "none",
      focus: $data.searching,
      modelValue: $data.searchValue
    }),
    y: $data.searching,
    z: common_vendor.n($data.key == 0 ? "filter-selected filter" : "filter"),
    A: common_vendor.o(($event) => $options.changeKey(0)),
    B: common_vendor.n($data.key == 1 ? "filter-selected filter" : "filter"),
    C: common_vendor.o(($event) => $options.changeKey(1)),
    D: $data.key == 4 && $data.sortIndex == 4,
    E: $data.key == 4 && $data.sortIndex == 5,
    F: common_vendor.n($data.key == 4 ? "filter-selected filter" : "filter"),
    G: common_vendor.o(($event) => $options.changeKey(4)),
    H: $data.key == 2 && $data.sortIndex == 3,
    I: $data.key == 2 && $data.sortIndex == 2,
    J: common_vendor.n($data.key == 2 ? "filter-selected filter" : "filter"),
    K: common_vendor.o(($event) => $options.changeKey(2)),
    L: common_vendor.f($data.courseList, (course, index, i0) => {
      return {
        a: "78991714-6-" + i0 + ",78991714-0",
        b: common_vendor.p({
          course
        }),
        c: index
      };
    }),
    M: $data.courseList.length >= 10,
    N: common_vendor.p({
      status: $data.status,
      contentText: $data.contentText
    }),
    O: common_vendor.o((...args) => $options.refresh && $options.refresh(...args)),
    P: $data.triggered,
    Q: common_vendor.o((...args) => _ctx.refreshRestore && _ctx.refreshRestore(...args)),
    R: common_vendor.o((...args) => $options.onScrollLower && $options.onScrollLower(...args)),
    S: common_vendor.o((...args) => _ctx.touchstart && _ctx.touchstart(...args)),
    T: common_vendor.o((...args) => _ctx.touchmove && _ctx.touchmove(...args)),
    U: common_vendor.sr("main", "78991714-0"),
    V: common_vendor.p({
      show: true,
      customClass: "full-screen"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/pg/Desktop/cssa-miniprogram/pages/courseMain/courseMain.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
