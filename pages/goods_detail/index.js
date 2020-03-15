/* 
1 发送请求获取数据 
2 点击轮播图 预览大图
  1 给轮播图绑定点击事件
  2 调用小程序的api  previewImage 
3 点击 加入购物车
  1 先绑定点击事件
  2 获取缓存中的购物车数据 数组格式 
  3 先判断 当前的商品是否已经存在于 购物车
  4 已经存在 修改商品数据  执行购物车数量++ 重新把购物车数组 填充回缓存中
  5 不存在于购物车的数组中 直接给购物车数组添加一个新元素 新元素 带上 购买数量属性 num  重新把购物车数组 填充回缓存中
  6 弹出提示
4 商品收藏
  1 页面onShow的时候  加载缓存中的商品收藏的数据
  2 判断当前商品是不是被收藏 
    1 是 改变页面的图标
    2 不是 。。
  3 点击商品收藏按钮 
    1 判断该商品是否存在于缓存数组中
    2 已经存在 把该商品删除
    3 没有存在 把商品添加到收藏数组中 存入到缓存中即可
 */
// 支持 async await
import regeneratorRuntime from '../../lib/runtime/runtime';
// 微信小程序必须写到index.js
import { request } from '../../request/index.js'
Page({
    data: {
        goodsobj: {}
    },
    // 商品全局对象
    GoodsInfo: {},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const { goods_id } = options
        this.goodsobj(goods_id)
    },
    async goodsobj(goods_id) {
        const res = await request({ url: '/goods/detail', data: { goods_id } });
        this.GoodsInfo = res;
        this.setData({
            goodsobj: {
                goods_id: res.goods_id,
                goods_name: res.goods_name,
                goods_price: res.goods_price,
                //iphone部分手机 不支持web格式图片
                goods_introduce: res.goods_introduce.replace(/\.webp/g, '.jpg'),
                pics: res.pics
            }
        })
    },
    // 点击轮播图进行大图预览
    handleImage(e) {
        const urls = this.GoodsInfo.pics.map((item, index) => item.pics_mid);
        // 获取参数
        const { src } = e.currentTarget.dataset;
        // 先构造要预览的图片数组
        wx.previewImage({
            current: src, //点击当前预览的图片
            urls: urls //需要预览的图片链接列表,
        });
    },
    // 点击加入购物车
    handleCat() {
        // 获取缓存中的购物车数据 数组格式 
        let cart = wx.getStorageSync('cart') || [];
        // 先判断 当前的商品是否已经存在于 购物车
        let index = cart.findIndex(item => item.goods_id === this.GoodsInfo.goods_id);
        if (index === -1) {
            //商品不存在 第一次添加
            this.GoodsInfo.num = 1;
            // 选中状态
            this.GoodsInfo.check = true
            cart.push(this.GoodsInfo)
        } else {
            // 已经存在 修改商品数据  执行购物车数量++ 重新把购物车数组 填充回缓存中
            cart[index].num++;
        }
        //把购物车重新添加回缓存中
        wx.setStorageSync('cart', cart);
        // 探矿提升
        wx.showToast({
            title: '添加成功', //提示的内容,
            icon: 'success', //图标,
            duration: 2000, //延迟时间,
            mask: true, //显示透明蒙层，防止触摸穿透,
        });
    }
})