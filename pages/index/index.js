//index.js
//获取应用实例
const app = getApp()
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');

var sliderWidth = 50; // 需要设置slider的宽度，用于计算中间位置

Page({
    data: {
        isShow: false,
        searchValue: '',
        current: 'tab_1',
        current_scroll: 'tab_1',
        categoryArr: [],
        categoryKey: '',
        keyWord: '',
        longitude: '',
        latitude: '',
        pageSize: 10,
        pageNumber: 1,
        showFlag: false,
        showTip: '拼命加载中',
        dataList: [],
        loading: true,
        isMore: true,
        isFirst: true,
        qqmapsdk: '',
        address: '您的位置'
    },
    onLoad: function () {
        let that = this;
        this.data.qqmapsdk = new QQMapWX({
            key: 'K6HBZ-LXQCQ-NWK5Q-GWLI7-XXMFO-ABBP7'
        });
        that.setData({
            isFirst: false
        });
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
                                that.data.qqmapsdk.reverseGeocoder({
                                    location: {
                                        latitude: latitude,
                                        longitude: longitude
                                    },
                                    success(res) {
                                        console.log(res);
                                        let address = res.result.address.split('市').length > 1 ? res.result.address.split('市')[1] : res.result.address.split('市')[0];
                                        if (res.status == 0) {
                                            that.setData({
                                                address: address.substring(0, 6) + '...'
                                            })
                                        }
                                    }
                                })
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
    // 切换菜单时更新数据
    handleChangeScroll({detail}) {
        let _this = this;
        if (detail.key.split('_')[1] == 1) {
            _this.setData({
                categoryKey: '',
                keyWord: '',
                pageNumber: 1,
                dataList: []
            });
        } else {
            let category = this.data.categoryArr[detail.key.split('_')[1] -2].categoryKey;
            _this.setData({
                categoryKey: category,
                keyWord: '',
                pageNumber: 1,
                dataList: []
            });
        }
        console.log(detail.key);
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
        let _this = this,
            key = this.data.searchValue;
        // 重置搜索条件
        this.setData({
            keyWord: key,
            categoryKey: '',
            pageSize: 10,
            pageNumber: 1,
            dataList: []
        });
        //发送请求更新列表
        this.getDataList();
    },
    //上拉加载更多
    onReachBottom() {
        if (!this.data.isMore) {
            return;  //没有更多数据暂停下拉加载
        }
        let pageIndex = this.data.pageNumber + 1;
        console.log(pageIndex);
        this.setData({
            showFlag: true,
            showTip: '拼命加载中',
            loading: true,
            pageNumber: pageIndex
        });
       let timer = setTimeout(() => {
           this.getDataList();
           clearTimeout(timer);
       }, 1000);
    },
    // 获取数据
    getDataList(type) {
        let _this = this;
        let serach = {
            categoryKey: _this.data.categoryKey,
            keyWord: _this.data.keyWord,
            longitude: _this.data.longitude,
            latitude: _this.data.latitude,
            pageSize: _this.data.pageSize,
            pageNumber: _this.data.pageNumber,
        }
        wx.showLoading({
            title: '加载中'
        })
        wx.request({
            url: app.globalData.url + '/order/orderList',
            header: {'token': app.globalData.token},
            data:serach,
            success(res) {
                if (res.data.code === 2000001) {
                    if (res.data.data.totalCount <= _this.data.pageSize * _this.data.pageNumber) {
                        let pageList = _this.data.dataList.concat(res.data.data.pageList);
                        _this.setData({
                            showFlag: true,
                            showTip: '暂无数据',
                            loading: false,
                            isMore: false,
                            dataList: pageList
                        });
                    }  else {
                        let pageList = _this.data.dataList.concat(res.data.data.pageList);
                        _this.setData({
                            showFlag: false,
                            showTip: '暂无数据',
                            loading: false,
                            isMore: true,
                            dataList: pageList
                        });
                    }
                }
            },
            complete() {
                let timer = setTimeout(() => {
                    wx.hideLoading();
                    clearTimeout(timer);
                }, 1000);
                if (type == 'down') {
                    wx.stopPullDownRefresh();
                }
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
    },
    onShow() {
        //每次打开的时候重新调用数据
        // this.setData({
        //     keyWord: '',
        //     categoryKey: '',
        //     pageSize: 10,
        //     pageNumber: 1,
        //     dataList: []
        // });
        // if (!this.data.isFirst) {
        //     this.getDataList();
        // }
    },
    chooseLacation() {
        let _this = this;
        wx.chooseLocation({
            success(res) {
                console.log(res);
                let address = res.name.length > 6 ? res.name.substring(0, 6) + '...' : res.name;
                _this.setData({
                    address: address,
                    latitude: res.latitude,
                    longitude: res.longitude,
                    pageNumer: 1
                });
                _this.getDataList();
            }
        })
    },
    // 下拉刷新
    onPullDownRefresh() {
        this.setData({
            categoryKey: '',
            keyWord: '',
            pageNumber: 1,
            dataList: []
        });
        this.getDataList('down');
    }
})
