// pages/center/center.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        headImg: "../../images/center_1.png",
        icon: "../../images/send_1.png",
        showFlag: false
    },
    bindGetUserInfo: function (e) {
        var that = this;
        //此处授权得到userInfo
        app.globalData.userInfo = JSON.parse(e.detail.rawData);
        //接下来写业务代码
        wx.request({
            url: app.globalData.url + '/order/wechatAuthUserInfo',
            header: {'token': app.globalData.token},
            data: {
                signature: e.detail.signature,
                rawData: e.detail.rawData,
                encryptedData: e.detail.encryptedData,
                iv: e.detail.iv
            },
            success: res => {
                console.log("请求成功", res);
                that.setData({
                    showFlag: true
                })
            }
        })
        //最后，记得返回刚才的页面
        wx.navigateBack({
            delta: 1
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        if (app.globalData.userInfo) {
            console.log("设置用户名" + app.globalData.userInfo.avatarUrl);
            that.setData({
               showFlag: true
            });
            // this.headImg = app.globalData.userInfo.avatarUrl;
            // this.nickName = app.globalData.userInfo.nickName;
        }
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

    }
})