// pages/orderlist/orderlist.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var app = getApp();
import checkLogin from '../../utils/check-login';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        icon60: "../../images/index_1.png",
        tabs: ["发单", "接单"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        orderList: [],
        sendList: [],
        showFlag: true,
        showTip: '暂无数据',
        loading: false
    },
    onLoad: function () {
        var that = this;
        this.getOrderList(0);
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });
    },
    tabClick: function (e) {
        let _this = this;
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
        _this.getOrderList(e.currentTarget.id);
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
        checkLogin.checkLogin();
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
    // 获取列表数据
    getOrderList(type) {
        let url = '',
            _this = this;
        if (type == 1) {
            url = app.globalData.url + '/order/acceptedOrderList'
        } else {
            url = app.globalData.url + '/order/sendOrderList'
        }
        wx.showLoading({
            title: '加载中'
        });
        wx.request({
            url: url,
            header: {
                token: app.globalData.token
            },
            success(res) {
                if (res.data.code == 2000001) {
                   if (type == 1) {
                       _this.stateFormatter(res.data.data);
                       _this.setData({
                           orderList: res.data.data
                       });
                   } else {
                       _this.stateFormatter(res.data.data);
                       _this.setData({
                           sendList: res.data.data
                       });
                       console.log(_this.data.sendList);
                   }
                }
            },
            complete() {
               let timer = setTimeout(() => {
                   wx.hideLoading();
                   clearTimeout(timer);
               }, 1000);
            }
        })
    },
    // 状态格式化
    stateFormatter(data) {
        data.forEach((value , index) => {
            switch (value.state) {
                case 1:
                    value.stateName = '已发单';
                    break;
                case 2:
                    value.stateName = '已过期';
                    break;
                case 3:
                    value.stateName = '已取消';
                    break;
                case 4:
                    value.stateName = '商家报价';
                    break;
                case 5:
                    value.stateName = '客户选择服务';
                    break;
                case 6:
                    value.stateName = '挂起/预约中';
                    break;
                case 7:
                    value.stateName = '挂起过期';
                    break;
                case 8:
                    value.stateName = '客户确认服务';
                    break;
                case 9:
                    value.stateName = '商家确认服务';
                    break;
                case 10:
                    value.stateName = '服务中';
                    break;
                case 11:
                    value.stateName = '服务完成，商家填写实际价格';
                    break;
                case 12:
                    value.stateName = '服务完成，客户付款完成';
                    break;
                case 13:
                    value.stateName = '订单结束';
                    break;
                case 14:
                    value.stateName = '订单删除';
                    break;
                default:
                    value.stateName = '已发单';
            }
        })
    }
})