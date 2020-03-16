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
        floorList: [],
        randomData: 3
    },
    // 页面被加载就会被触发
    onLoad: function(options) {
        this.getSwiperList()
        this.getCatesList()
        this.getFloorList()
    },
    async getSwiperList() {
        const swiperList = await request({ url: '/home/swiperdata' });
        this.setData({
            swiperList: swiperList
        })
    },
    async getCatesList() {
        const catesList = await request({ url: '/home/catitems' });
        this.setData({
            catesList: catesList
        })
    },
    async getFloorList() {
        const floorList = await request({ url: '/home/floordata' });
        this.setData({
            floorList: floorList
        })
    },
    click() {
        const randomData = parseInt(Math.random() * 1000);
        this.setData({
            randomData
        })
    }
});