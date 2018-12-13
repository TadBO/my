// pages/orderlist/orderlist.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon60: "../../images/index_1.png",
    tabs: ["发单", "接单"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  onLoad: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    console.log(app.globalData.token);
    wx.request({
      url: app.globalData.url +'/order/orderCategory',
      header: {'token': app.globalData.token},
      data:{
        orderId: '40280981666c1ed101666c5740c64983'
      },
      success:res=>{
        console.log(res);
      }

    })
  },
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    console.log(e);
    if (e.currentTarget.id==1){
      wx.request({
        url: app.globalData.url +'/order/acceptedOrderList',
        data:{},
        success:res=>{
          console.log("接单数据",res);
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})