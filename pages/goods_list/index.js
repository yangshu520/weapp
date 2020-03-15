/* 
1 用户上滑页面 滚动条触底 开始加载下一页数据
  1 找到滚动条触底事件  微信小程序官方开发文档寻找
  2 判断还有没有下一页数据
    1 获取到总页数  只有总条数
      总页数 = Math.ceil(总条数 /  页容量  pagesize)
      总页数     = Math.ceil( 23 / 10 ) = 3
    2 获取到当前的页码  pagenum
    3 判断一下 当前的页码是否大于等于 总页数 
      表示 没有下一页数据

  3 假如没有下一页数据 弹出一个提示
  4 假如还有下一页数据 来加载下一页数据
    1 当前的页码 ++
    2 重新发送请求
    3 数据请求回来  要对data中的数组 进行 拼接 而不是全部替换！！！
2 下拉刷新页面
  1 触发下拉刷新事件 需要在页面的json文件中开启一个配置项
    找到 触发下拉刷新的事件
  2 重置 数据 数组 
  3 重置页码 设置为1
  4 重新发送请求
  5 数据请求回来 需要手动的关闭 等待效果

 */
// 支持 async await
import regeneratorRuntime from '../../lib/runtime/runtime';
// 微信小程序必须写到index.js
import { request } from '../../request/index.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // tabs子组件需要的数据
        tabs: [
            { id: 1, name: '综合', isActive: true },
            { id: 2, name: '销量', isActive: false },
            { id: 3, name: '价格', isActive: false }
        ],
        goodList: [],
        totalPages: 1
    },
    // 需要的参数
    queryParams: {
        query: '',
        cid: '',
        pagenum: 1,
        pagesize: 10
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.queryParams.cid = options.cid || '';
        this.queryParams.query = options.query || '';
        this.getGoodList()
    },
    // 子组件传递的事件
    tapActive(e) {
        const { index } = e.detail
        const { tabs } = this.data
        tabs.forEach((item, index1) => index1 === index ? item.isActive = true : item.isActive = false);
        this.setData({
            tabs
        })
    },
    // 发送请求
    async getGoodList() {
        const res = await request({
            url: '/goods/search',
            data: this.queryParams
        });
        const totalPages = Math.ceil(res.total / 10)
        this.setData({
            // 需要拼接数组 要不然只有10条数据
            goodList: [...this.data.goodList, ...res.goods],
            totalPages
        });
        wx.stopPullDownRefresh();
    },
    // 生命周期 上拉到触底触发
    onReachBottom() {
        if (this.queryParams.pagenum >= this.data.totalPages) {
            wx.showToast({ title: '商品已经到底' });
        } else {
            this.queryParams.pagenum++;
            this.getGoodList()
        }
    },
    // 下拉刷新事件
    onPullDownRefresh() {
        this.setData({
            goodList: [],
            totalPages: 1
        });
        this.getGoodList();

    }
})