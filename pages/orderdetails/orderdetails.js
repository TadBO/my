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
    prices: [
      {
        "price": 18.6,
        "createTime": "2018-10-18 11:27:19",
        "compositeScore": 3.6,
        "userId": "40280981666c1ed101666c5740c60002",
        "userName": "薛定谔的咸鱼",
        "nickName": "薛定谔的咸鱼",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL42P0KLPVNYfj0aYeCv7yaicSYWBclSb3cHFIahRAezWHosSgECibDPsBDSQOZxE5UPzd9yhQF8g5w/132"
      },
      {
        "price": 186,
        "createTime": "2018-10-18 11:27:19",
        "compositeScore": 3.6,
        "userId": "40280981666c1ed101666c5740c60002",
        "userName": "测试",
        "nickName": "测试",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL42P0KLPVNYfj0aYeCv7yaicSYWBclSb3cHFIahRAezWHosSgECibDPsBDSQOZxE5UPzd9yhQF8g5w/132"
      }
    ],
    pictures: [],
    priceCount: 0,
    serviceType: "测试家电",
    status: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
      success: function(res) {
        console.log(res);
        if (res.data.code == 2000001) {

        }
      },
      complete() {

      }
    })
  },
  yes:function(e){
    console.log("确定服务", e.currentTarget.dataset.userid);
  },
  no:function(e){
    console.log("取消服务", e.currentTarget.dataset.userid);
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

  },

})