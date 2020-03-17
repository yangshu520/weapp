Page({
    data: {
        userInfo: {},
        // 被收藏的数量
        collectNums: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    onShow() {
        const userInfo = wx.getStorageSync('userInfo');
        const collectNums = wx.getStorageSync('collect').length;
        this.setData({ userInfo, collectNums })
    }
})