/* 
1 页面被打开的时候 onShow 
  0 onShow 不同于onLoad 无法在形参上接收 options参数 
  0.5 判断缓存中有没有token 
    1 没有 直接跳转到授权页面
    2 有 直接往下进行 
  1 获取url上的参数type
  2 根据type来决定页面标题的数组元素 哪个被激活选中 
  2 根据type 去发送请求获取订单数据
  3 渲染页面
2 点击不同的标题 重新发送请求来获取和渲染数据 
 */

// 支持 async await
import regeneratorRuntime from '../../lib/runtime/runtime'
import { request } from '../../request/index.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orders: [],
        tabs: [
            { id: 1, name: '全部', isActive: true },
            { id: 2, name: '待付款', isActive: false },
            { id: 3, name: '代发货', isActive: false },
            { id: 4, name: '退款/退货', isActive: false }
        ],
    },
    onShow() {
        // 1 获取当前的小程序的页面栈-数组 长度最大是10页面 
        let pages = getCurrentPages();
        // 2 数组中 索引最大的页面就是当前页面
        let currentPage = pages[pages.length - 1];
        // 3 获取url上的type参数
        const { type } = currentPage.options;
        // 4 激活选中页面标题 当 type=1 index=0 
        this.activeFindIndex(type - 1)
        const orders = wx.getStorageSync('cart');
        this.setData({
            orders: orders.map((item, index) => ({
                ...item,
                // toLocaleString() 方法可根据本地时间把 Date 对象转换为字符串，并返回结果。
                create_time: (new Date(item.add_time * 1000).toLocaleString()),
                title: item.goods_name.slice(0, 23)
            }))
        })
    },

    /**
     * onShow: function() {
        const token = wx.getStorageSync("token");
        if (!token) {
            wx.navigateTo({
                url: '/pages/auth/index'
            });
            return;
        }
        // 1 获取当前的小程序的页面栈-数组 长度最大是10页面 
        let pages = getCurrentPages();
        // 2 数组中 索引最大的页面就是当前页面
        let currentPage = pages[pages.length - 1];
        // 3 获取url上的type参数
        const { type } = currentPage.options;
        // 4 激活选中页面标题 当 type=1 index=0 
        this.changeTitleByIndex(type - 1);
        this.getOrders(type);
    },
    // 获取订单列表的方法
    async getOrders(type) {
        const res = await request({ url: "/my/orders/all", data: { type } });
        console.log(res)
        this.setData({
            orders: res.orders.map(v => ({...v, create_time_cn: (new Date(v.create_time * 1000).toLocaleString()) }))
        })
    },
     */
    // 子组件传递的事件
    tapActive(e) {
        const { index } = e.detail
        this.activeFindIndex(index);
    },
    // 激活选中项
    activeFindIndex(index) {
        const { tabs } = this.data
        tabs.forEach((item, index1) => index1 === index ? item.isActive = true : item.isActive = false);
        this.setData({
            tabs
        })
    }
})