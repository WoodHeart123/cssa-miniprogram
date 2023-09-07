"use strict";
var common_vendor = require("../common/vendor.js");
async function requestAPI(opt, number = 0) {
  console.log(opt);
  try {
    return await wx.cloud.callContainer({
      config: {
        env: "prod-9gip97mx4bfa32a3"
      },
      path: opt.path,
      method: opt.type,
      header: {
        "X-WX-SERVICE": "springboot-ds71"
      },
      data: opt.type.toUpperCase() == "GET" ? null : opt.data
    });
  } catch (e) {
    const error = e.toString();
    if (error.indexOf("\u8BF7\u6C42\u8D85\u65F6") != -1 && number < 3) {
      return requestAPI(opt, number + 1);
    } else {
      common_vendor.index.showToast({
        icon: "exception",
        title: "\u5F53\u524D\u7F51\u7EDC\u72B6\u6001\u4E0D\u4F73\uFF0C\u8BF7\u7A0D\u540E\u5C1D\u8BD5\u3002"
      });
    }
  }
}
exports.requestAPI = requestAPI;
