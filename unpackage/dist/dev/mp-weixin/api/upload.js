"use strict";
const common_vendor = require("../common/vendor.js");
const ossAccessKeySecret = "process.env.VUE_APP_OSS_ACCESS_KEY_SECRET;";
async function uploadOSS(image) {
  return new Promise((resolve, reject) => {
    common_vendor.index.uploadFile({
      url: "https://cssa-mini-na.oss-us-west-1.aliyuncs.com",
      filePath: image.filepath,
      fileType: "image",
      name: "file",
      formData: {
        key: `cssa-rental/${image.filename}`,
        region: "oss-us-west-1",
        accessKeyId: "LTAI5tG4Jt4WD77C1XSDTJAj",
        accessKeySecret: ossAccessKeySecret,
        bucket: "cssa-mini-na",
        success_action_status: 200
      },
      success: (res) => {
        if (res.statusCode !== 200) {
          reject("上传图片失败");
        } else {
          resolve(
            `https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-rental/${image.filename}`
          );
        }
      },
      fail: () => {
        reject("上传图片失败");
      }
    });
  });
}
exports.uploadOSS = uploadOSS;
