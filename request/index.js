let ajaxtiems = 0
export const request = (params) => {
    const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
    return new Promise((resolve, reject) => {
        // 请求次数增加
        ajaxtiems++;
        // 开启loading
        wx.showLoading({
            title: 'Loading...', //提示的内容,
            mask: true, //显示透明蒙层，防止触摸穿透,
        });
        wx.request({
            ...params,
            url: baseUrl + params.url,
            success: (result) => {
                resolve(result.data.message)
            },
            fail: (err) => {
                reject(err)
            },
            complete() {
                ajaxtiems--;
                if (ajaxtiems === 0) {
                    // 关闭loading
                    wx.hideLoading();
                }
            }
        });
    })
}