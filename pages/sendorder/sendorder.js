// pages/sendorder/sendorder.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        countries: [],
        countryIndex: 0,
        address: {},
        cityName: "3241234",
        files: [],
        categoryKey: '',
        categoryName: '',
        time: '请选择服务预约时间'
    },
    send: function (e) {
        console.log(e.detail.value);
        wx.request({
            url: app.globalData.url + '/order/order',
            header: {'token': app.globalData.token},
            method: "POST",
            data: e.detail.value,
            success: function (res) {
                console.log(res);
            }
        })
    },
    bindCountryChange: function (e) {
        console.log('picker country 发生选择改变，携带值为', e.detail.value);
        let type = this.data.countries[e.detail.value].categoryKey,
            name = this.data.countries[e.detail.value].categoryValue
        this.setData({
            categoryKey: type,
            categoryName: name
        });

    },
    chooseAddress: function (e) {
        var that = this;
        console.log("获取用户地址");
        wx.chooseAddress({
            success: function (res) {
                console.log(res);
                that.address = res;
                console.log(that.cityName);
                that.setData({
                    cityName: res.cityName
                })
            }
        })
    },

    chooseImage: function (e) {
        var that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    files: that.data.files.concat(res.tempFilePaths)
                });
            }
        })
    },
    previewImage: function (e) {
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: this.data.files // 需要预览的图片http链接列表
        })
    },
    bindDateChange(e) {
        this.setData({
            time: e.detail.value
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getCategory();
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

    // 获取分类种类
    getCategory() {
        let _this = this;
        wx.request({
            url: app.globalData.url + '/order/orderCategory',
            header: {
                token: app.globalData.token
            },
            success(res) {
                console.log(res);
                _this.setData({
                    countries: res.data.data
                });
                console.log(_this.data.countries);
            }
        })
    }
})