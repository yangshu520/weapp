// 支持 async await
import regeneratorRuntime from '../../lib/runtime/runtime';
// 微信小程序必须写到index.js
import { request } from '../../request/index.js'
Page({
    data: {
        searchList: [],
        isFoucus: false
    },
    timer: null,
    handleInput(e) {
        const { value } = e.detail;
        if (!value.trim()) {
            this.setData({
                isFoucus: false,
                searchList: [],
                inpValue: ""
            })
            return
        }
        this.setData({
            isFoucus: true
        })
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.searchInput(value)
        }, 800)
    },
    async searchInput(query) {
        const res = await request({ url: '/goods/search', data: { query } })
        this.setData({
            searchList: res.goods
        })
    },
    hendleCancel() {
        this.setData({
            isFoucus: false,
            searchList: [],
            inpValue: ""
        })
    }
})