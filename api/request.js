export default async function requestAPI(opt, number = 0) {
	console.log(opt)
	wx.cloud.init()
	try{
		return await wx.cloud.callContainer({
			config: {
				env: 'prod-9gip97mx4bfa32a3',
			},
			path: opt.path,
			method: opt.type,
			header: {
				'X-WX-SERVICE': 'springboot-ds71',
			},
			data: opt.type.toUpperCase()  == "GET" ? null : opt.data
		});
	}catch(e){
	    const error = e.toString()
		if(error.indexOf("请求超时") != -1 && number < 3){
			return requestAPI(opt, number + 1)
	    } else {
			uni.showToast({
				icon: "exception",
				title: "当前网络状态不佳，请稍后尝试。"
			})
		}
	}

}