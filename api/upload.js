const ossAccessKeySecret = import.meta.env.VITE_OSS_SECRET;
export default async function(image, path = "cssa-rental") {
	return new Promise((resolve, reject) => {
		wx.cloud.uploadFile({
			cloudPath: `${path}/${image.filename}`, // 对象存储路径，根路径直接填文件名，文件夹例子 test/文件名，不要 / 开头
			filePath: image.filepath, // 微信本地文件，通过选择图片，聊天文件等接口获取
			config: {
				env: 'prod-9gip97mx4bfa32a3'
			},
			success: res => {
				resolve(
					`https://7072-prod-9gip97mx4bfa32a3-1312104819.tcb.qcloud.la/${path}/${image.filename}`
				);
			},
			fail: err => {
				reject("上传图片失败");
			}
		});
	});
}