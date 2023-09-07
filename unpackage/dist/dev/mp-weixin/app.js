"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
var uni_modules_vkUviewUi_index = require("./uni_modules/vk-uview-ui/index.js");
require("./uni_modules/vk-uview-ui/libs/mixin/mixin.js");
require("./uni_modules/vk-uview-ui/libs/request/index.js");
require("./uni_modules/vk-uview-ui/libs/function/deepMerge.js");
require("./uni_modules/vk-uview-ui/libs/function/deepClone.js");
require("./uni_modules/vk-uview-ui/libs/function/test.js");
require("./uni_modules/vk-uview-ui/libs/function/queryParams.js");
require("./uni_modules/vk-uview-ui/libs/function/route.js");
require("./uni_modules/vk-uview-ui/libs/function/timeFormat.js");
require("./uni_modules/vk-uview-ui/libs/function/timeFrom.js");
require("./uni_modules/vk-uview-ui/libs/function/colorGradient.js");
require("./uni_modules/vk-uview-ui/libs/function/guid.js");
require("./uni_modules/vk-uview-ui/libs/function/color.js");
require("./uni_modules/vk-uview-ui/libs/function/type2icon.js");
require("./uni_modules/vk-uview-ui/libs/function/randomArray.js");
require("./uni_modules/vk-uview-ui/libs/function/addUnit.js");
require("./uni_modules/vk-uview-ui/libs/function/random.js");
require("./uni_modules/vk-uview-ui/libs/function/trim.js");
require("./uni_modules/vk-uview-ui/libs/function/toast.js");
require("./uni_modules/vk-uview-ui/libs/function/getParent.js");
require("./uni_modules/vk-uview-ui/libs/function/_parent.js");
require("./uni_modules/vk-uview-ui/libs/function/sys.js");
require("./uni_modules/vk-uview-ui/libs/function/debounce.js");
require("./uni_modules/vk-uview-ui/libs/function/throttle.js");
require("./uni_modules/vk-uview-ui/libs/config/config.js");
require("./uni_modules/vk-uview-ui/libs/config/zIndex.js");
if (!Math) {
  "./pages/main/main.js";
  "./pages/index/index.js";
  "./pages/index/userInfo.js";
  "./pages/activity/act.js";
  "./pages/detail/detail.js";
  "./pages/activity/remark.js";
  "./pages/activity/finished.js";
  "./pages/index/updateEmail.js";
  "./pages/courseMain/courseMain.js";
  "./pages/coursePage/coursePage.js";
  "./pages/studentAuth/studentAuth.js";
  "./pages/index/updateName.js";
  "./pages/index/updateID.js";
  "./pages/postComment/postComment.js";
  "./pages/community/com-main.js";
  "./pages/second/secondMain.js";
  "./pages/second/secondMainPost.js";
  "./pages/changeAvatar/changeAvatar.js";
  "./pages/detail/secondDetail.js";
  "./pages/second/secondMainSearch.js";
  "./pages/myComment/myComment.js";
  "./pages/detail/houseDetail.js";
  "./pages/mySecondhand/mySecondhand.js";
  "./pages/mySave/mySave.js";
  "./pages/rentalPost/rentalPost.js";
  "./pages/ride/ridePost.js";
  "./pages/rideMain/rideMain.js";
  "./pages/rentalMain/rentalMain.js";
  "./pages/aboutCSSA/aboutCSSA.js";
  "./pages/aboutCSSA/ContactUs.js";
  "./pages/aboutCSSA/Guanyu.js";
  "./pages/myRental/myRental.js";
  "./pages/restMain/restSearch.js";
  "./pages/restMain/restMain.js";
  "./pages/map/map.js";
  "./pages/detail/restDetail.js";
  "./pages/postRestComment/postRestComment.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.warn("\u5F53\u524D\u7EC4\u4EF6\u4EC5\u652F\u6301 uni_modules \u76EE\u5F55\u7ED3\u6784 \uFF0C\u8BF7\u5347\u7EA7 HBuilderX \u5230 3.1.0 \u7248\u672C\u4EE5\u4E0A\uFF01");
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/cssa/cssa-miniprogram/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(uni_modules_vkUviewUi_index.uView);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
