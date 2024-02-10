const MODE = "DEV";
export default async function requestAPI(opt, number = 0) {
<<<<<<< HEAD
=======
	console.log(opt)
>>>>>>> develop
	wx.cloud.init()
	try{
		if(MODE === "DEV"){
			uni.showToast({
				title: "当前为dev环境",
				icon: 'none'
			})
		}
		return await wx.cloud.callContainer({
			config: {
				env: 'prod-9gip97mx4bfa32a3',
			},
			path: opt.path,
			method: opt.type,
			header: {
				'X-WX-SERVICE': MODE === "DEV"? "springboot-cssa-test":"springboot-ds71",
			},
			data: opt.type.toUpperCase()  == "GET" ? null : opt.data
		});
	}catch(e){
	    const error = e.toString()
		if(error.indexOf("请求超时") != -1 && number < 3){
			return requestAPI(opt, number + 1)
	    } else {
			uni.showToast({
				icon: "error",
				title: "服务加载失败"
			})
		}
	}

}