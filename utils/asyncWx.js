/**
 * promise 形式 getSetting
 */

export const getSetting = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: res => {
                resolve(res)
            },
            fail: err => {
                reject(err)
            }
        });
    })
}

/**
 * promise 形式 chooseAddress
 */

export const chooseAddress = () => {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success: res => {
                resolve(res)
            },
            fail: err => {
                reject(err)
            }
        });
    })
}

/**
 * promise 形式 openSetting
 */

export const openSetting = () => {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success: res => {
                resolve(res)
            },
            fail: err => {
                reject(err)
            }
        });
    })
}

/**
 * promise 形式 openSetting
 */
export const showModal = () => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: '温馨提示', //提示的标题,
            content: '小姐姐/小哥哥，要删除此商品吗？', //提示的内容,
            showCancel: true, //是否显示取消按钮,
            cancelText: '取消', //取消按钮的文字，默认为取消，最多 4 个字符,
            cancelColor: '#000000', //取消按钮的文字颜色,
            confirmText: '确定', //确定按钮的文字，默认为取消，最多 4 个字符,
            confirmColor: '#3CC51F', //确定按钮的文字颜色,
            success: res => {
                resolve(res)
            }
        });
    })
}

/**
 * promise 形式 showTost
 */
export const showTost = ({ title }) => {
    return new Promise((resolve, reject) => {
        wx.showToast({
            title: title,
            icon: 'info',
            success: (res) => {
                resolve(res)
            },
        });
    })
}

/**
 * promise 形式  login
 */
export const login = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            timeout: 10000,
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        });
    })
}

/**
 * promise 形式的 小程序的微信支付
 * @param {object} pay 支付所必要的参数
 */
export const requestPayment = (pay) => {
    return new Promise((resolve, reject) => {
        wx.requestPayment({
            ...pay,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err);
            }
        });

    })
}