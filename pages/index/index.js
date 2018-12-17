//index.js
//获取应用实例
const app = getApp()

var sliderWidth = 50; // 需要设置slider的宽度，用于计算中间位置

Page({
    data: {
        isShow: false,
        searchValue: null,
        current: 'tab_1',
        current_scroll: 'tab_1',
        categoryArr: [],
        categoryKey: '',
        keyWord: '',
        longitude: '',
        latitude: '',
        pageSize: 10,
        pageNumber: 1
    },
    onLoad: function () {
        let that = this;
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                wx.request({
                    url: app.globalData.url + '/order/wechatSignIn',
                    data: {
                        code: res.code
                    },
                    success: res => {
                        //缓存token全局使用
                        app.globalData.token = res.data.data.token;
                        wx.getLocation({
                            // type: 'wgs84',
                            type: 'gcj02', //模拟器支持
                            success(res) {
                                const latitude = res.latitude
                                const longitude = res.longitude
                                that.setData({
                                    latitude: latitude,
                                    longitude: longitude,
                                });
                                that.getDataList();
                            }
                        })
                        that.getCategory();
                    }
                })
            }
        });

    },
    //关闭按钮的出现与否
    searchList(e) {
        this.setData({
            isShow: !!e.detail.value,
            searchValue: e.detail.value
        });
    },
    handleChangeScroll({detail}) {
        let _this = this;
        if (detail.key.split('_')[1] == 1) {
            _this.setData({
                categoryKey: ''
            });
        } else {
            let category = this.data.categoryArr[detail.key.split('_')[1] -2].categoryKey;
            _this.setData({
                categoryKey: category
            });
        }
        this.setData({
            current_scroll: detail.key
        });
        _this.getDataList();
    },
    //点击关闭按钮，清空搜索框
    clearSearch() {
        this.setData({
            isShow: false,
            searchValue: null
        });
    },
    //点击搜索进行搜索时
    searchData() {
        console.log(this.data.searchValue);
        //发送请求更新列表
    },
    //上拉加载更多
    onReachBottom() {
        console.log(1);
    },
    // 获取数据
    getDataList() {
        let _this = this;
        let serach = {
            categoryKey: _this.data.categoryKey,
            keyWord: _this.data.keyWord,
            longitude: _this.data.longitude,
            latitude: _this.data.latitude,
            pageSize: _this.data.pageSize,
            pageNumber: _this.data.pageNumber,
        }
        wx.request({
            url: app.globalData.url + '/order/orderList',
            header: {'token': app.globalData.token},
            data:serach,
            success(res) {
                console.log(res);
            }
        })
    },
    // 获取分类列表
    getCategory() {
        let _this = this;
        wx.request({
            url: app.globalData.url + '/order/orderCategory',
            header: {'token': app.globalData.token},
            success(res) {
                _this.setData({
                    categoryArr: res.data.data
                });
            }
        })
    }
})
