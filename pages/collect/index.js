// pages/collect/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [
            { id: 1, name: '商品收藏', isActive: true },
            { id: 2, name: '品牌收藏', isActive: false },
            { id: 3, name: '店铺收藏', isActive: false },
            { id: 4, name: '浏览足迹', isActive: false }
        ],
        collect: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function() {
        const collect = wx.getStorageSync('collect');
        this.setData({ collect })
    },
    tapActive(e) {
        const { index } = e.detail
        const { tabs } = this.data
        tabs.forEach((item, index1) => index1 === index ? item.isActive = true : item.isActive = false);
        this.setData({
            tabs
        })
    }
})