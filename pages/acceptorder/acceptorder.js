// pages/orderdetails/orderdetails.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageType: 0, //区分页面类型
    address: "广东省广州市海珠区新港中路397号",
    arrangedTime: "2018-12-18 00:00:00",
    categoryKey: "CATE001",
    city: "广东省广州市海珠区新港中路397号",
    createTime: "2018-12-18 21:25:40",
    deleteFlag: 0,
    distance: 0,
    id: "afe497c367c071fb0167c17e5154000d",
    latitude: 23.0964,
    linkmanName: "张三",
    linkmanPhone: "13592520253",
    longitude: 113.324,
    orderContent: "修理家电",
    orderRemark: "测试发单家电",
    pictures: [],
    priceCount: 0,
    serviceType: "测试家电",
    status: 1,
    pageType: 0 //区分页面是那种类型  0报价页
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);


    wx.request({
      url: app.globalData.url + '/order/orderDetail',
      header: {
        'token': app.globalData.token,
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "get",
      data: {
        orderId: options.id
      },
      success: function (res) {
        console.log(res);
        if (res.data.code == 2000001) {

        }
      },
      complete() {

      }
    })
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

})