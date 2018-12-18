// pages/index/detail/detail.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        orderDeatail: {},
        price: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        this.setData({
            id: options.id
        });
        this.getOrderDetail()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    // 获取详情数据
    getOrderDetail() {
        let _this = this;
        wx.request({
            url: app.globalData.url + '/order/orderDetail',
            header: {
                token: app.globalData.token
            },
            data: {
                orderId: _this.data.id
            },
            success(res) {
                console.log(res);
                _this.setData({
                    orderDeatail: res.data.data
                });
            }
        })
    },
    // 报价
    postOrder() {
        let _this = this;
        wx.request({
            url: app.globalData.url + '/order/quoted',
            method: 'POST',
            header: {
                token: app.globalData.token,
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                orderId: _this.data.id,
                price: _this.data.price
            },
            // data: `orderId=${_this.data.id}&price=${_this.data.price}`,
            success(res) {
                console.log(res);
                if (res.data.code == 2000001) {
                    wx.showToast({
                        title: '报价成功！',
                        duration: 1000
                    });
                    let timer = setTimeout(() => {
                        wx.switchTab({
                            url: '/pages/index/index'
                        });
                        clearTimeout(timer);
                    }, 1000);
                }
            }
        })
    },
    priceChange(e) {
        this.setData({
            price: e.detail.value
        });
    }
})