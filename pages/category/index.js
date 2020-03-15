// 支持 async await
import regeneratorRuntime from '../../lib/runtime/runtime';
//发送请求
// 微信小程序必须写到index.js
import { request } from '../../request/index.js'
Page({
    data: {
        // 左侧菜单列表
        leftMeunList: [],
        //右侧菜单列表
        rightMeunList: [],
        // 被点击的激活选项
        currentIndex: 0,
        //右侧内容滚动距离顶部为0
        scrollTop: 0
    },
    // 获取的数据
    catesList: [],
    onLoad: function() {
        /**
         * 1.先判断一下本地存储中有没有数据
         * {time:Date,now(),data:[]}
         * 2.没有旧数据 直接发送请求
         * 3.有旧数据且没有过期 就使用旧数据
         */
        // 获取本地的数据 getStorageSync同步  getStorage异步
        const Cates = wx.getStorageSync('Cates');
        if (!Cates) {
            this.getCates()
        } else {
            if (Date.now() - Cates.time > 1000 * 60 * 10) {
                this.getCates()
            } else {
                // 可以使用旧的数据
                this.catesList = Cates.data;
                const leftMeunList = this.catesList.map((item, index) => item.cat_name);
                const rightMeunList = this.catesList[0].children;
                this.setData({
                    leftMeunList,
                    rightMeunList,
                })
            }
        }

    },
    async getCates() {
        const catesList = await request({ url: '/categories' });
        this.catesList = catesList
            // 把接口的数据存储到本地
        wx.setStorageSync('Cates', { time: Date.now(), data: this.catesList });
        // map 返回处理后的数组 依次处理 不会改变原始数组
        const leftMeunList = this.catesList.map((item, index) => item.cat_name);
        const rightMeunList = this.catesList[0].children;
        this.setData({
            leftMeunList,
            rightMeunList,
        })
    },
    itemTap(e) {
        /**
         * 1.获取被点击的标题身上的索引
         * 2.给data中的index赋值
         * 3.根据不同的索引发不同的请求
         */
        const { index } = e.currentTarget.dataset;
        const rightMeunList = this.catesList[index].children;
        this.setData({
            currentIndex: index,
            rightMeunList,
            // 重新设置 滚动距离顶部为零
            scrollTop: 0
        })
    }
})