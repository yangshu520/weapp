// 支持 async await
import regeneratorRuntime from '../../lib/runtime/runtime';
//发送请求
// 微信小程序必须写到index.js
import { request } from '../../request/index.js'
Page({
    data: {
        // 轮播图数组
        swiperList: [],
        // 导航数组
        catesList: [],
        // 楼层数据
        floorList: []
    },
    // 页面被加载就会被触发
    onLoad: function(options) {
        this.getSwiperList()
    },
    async getSwiperList() {
        const swiperList = await request({ url: '/home/swiperdata' });
        const catesList = await request({ url: '/home/catitems' });
        const floorList = await request({ url: '/home/floordata' });
        this.setData({
            swiperList: swiperList,
            catesList: catesList,
            floorList: floorList
        })
    }
});