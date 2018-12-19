// pages/sendorder/sendorder.js
var app = getApp();
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
import checkLogin from '../../utils/check-login';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        countries: [],
        countryIndex: 0,
        address: {},
        files: [],
        categoryKey: '',
        categoryName: '',
        time: '',
        date: '',
        userName: "",
        provinceName: "",
        cityName: "",
        countyName: "",
        detailInfo: "",
        telNumber: "",
        user_msg: 1,
        qqmapsdk: null,
        lat: app.globalData.latitude,
        lon: app.globalData.longitude,
        sendFlag: true
    },
    send: function (e) {
        console.log(e.detail.value);
        let _this = this;
        let detailValue = e.detail.value
        // 必填校验
        if (!detailValue.categoryKey) {
            wx.showToast({
                title: '请选择服务类型',
                icon: 'none'
            });
            return;
        }
        if (!detailValue.orderContent) {
            wx.showToast({
                title: '请输入服务内容',
                icon: 'none'
            });
            return;
        }
        if (!detailValue.addressDetail) {
            wx.showToast({
                title: '请选择服务地址',
                icon: 'none'
            });
            return;
        }
        if (!detailValue.arrangedTime) {
            wx.showToast({
                title: '请选择预约时间',
                icon: 'none'
            });
            return;
        }
        if (!detailValue.linkmanName) {
            wx.showToast({
                title: '请输入联系人',
                icon: 'none'
            });
            return;
        }
        if (!(/^1[34578]\d{9}$/.test(detailValue.linkmanPhone))) {
            wx.showToast({
                title: '请输入合法的手机号',
                icon: 'none'
            });
            return;
        }
        if (!detailValue.orderRemark) {
            wx.showToast({
                title: '请输入备注',
                icon: 'none'
            });
            return;
        }

        if (!this.data.sendFlag) {
            return;
        }
        _this.setData({
            sendFlag: false  //发单限制，防止多次点击发单
        });
        wx.request({
            url: app.globalData.url + '/order/order',
            header: {'token': app.globalData.token, "content-type": "application/x-www-form-urlencoded"},
            method: "POST",
            data: e.detail.value,
            success: function (res) {
                console.log(res);
                if (res.data.code == 2000001) {
                    _this.uploadimg({
                        url: app.globalData.url + '/order/upload',
                        path: _this.data.files,
                        id: res.data.data.id
                    });
                    wx.showToast({
                        title: '发单成功！',
                        duration: 2000
                    });
                    let timer = setTimeout(() => {
                        wx.switchTab({
                            url: '/pages/index/index'
                        });
                        clearTimeout(timer);
                    }, 2000);
                }
            },
            complete() {
                _this.setData({
                    sendFlag: true
                })
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
                that.setData({
                    userName: res.userName,
                    provinceName: res.provinceName,
                    cityName: res.cityName,
                    countyName: res.countyName,
                    detailInfo: res.detailInfo,
                    telNumber: res.telNumber,
                    user_msg: 1
                })
                let address = res.provinceName + res.cityName + res.countyName + res.detailInfo;
                that.data.qqmapsdk.geocoder({
                    address: address,   //用户输入的地址（注：地址中请包含城市名称，否则会影响解析效果），如：'北京市海淀区彩和坊路海淀西大街74号'
                    complete: res => {
                        console.log(res);   //经纬度对象
                        if (res.status == 0) {
                            that.setData({
                                lon: res.result.location.lng,
                                lat: res.result.location.lat
                            })
                        }
                    }
                });
            }
        });
    },

    chooseImage: function (e) {
        var that = this;
        if (this.data.files.length > 2) {
            wx.showToast({
              title: '最多上传3张图片',
                icon: 'none'
            });
            return false;
        }
        wx.chooseImage({
            count: 3,
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    files: that.data.files.concat(res.tempFilePaths)
                });
                // wx.uploadFile({
                //     url: app.globalData.url + '/order/upload',
                //     filePath: res.tempFilePaths[0],
                //     name: 'file',
                //     header: {
                //         'token': app.globalData.token
                //     },
                //     formData: {
                //         orderId: 'afe497c367c071fb0167c0c4ab800000',
                //         sortNumber: 0
                //     },
                //     success(res) {
                //         console.log(res);
                //     },
                //     fail(res) {
                //         console.log(res);
                //     }
                // })
            }
        })
    }
    ,
    previewImage: function (e) {
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: this.data.files // 需要预览的图片http链接列表
        })
    }
    ,
    bindDateChange(e) {
        this.setData({
            date: e.detail.value
        })
    },
    bindTimeChange(e) {
        this.setData({
            time: e.detail.value
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.data.qqmapsdk = new QQMapWX({
            key: 'K6HBZ-LXQCQ-NWK5Q-GWLI7-XXMFO-ABBP7'
        });
        this.getCategory();
        this.setData({
            lon: app.globalData.longitude,
            lat: app.globalData.latitude
        })
    }
    ,

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    }
    ,

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        checkLogin.checkLogin();
    }
    ,

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    }
    ,

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    }
    ,

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    }
    ,

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    }
    ,

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
    ,

// 获取分类种类
    getCategory() {
        let _this = this;
        wx.request({
            url: app.globalData.url + '/order/orderCategory',
            header: {
                token: app.globalData.token
            },
            success(res) {
                _this.setData({
                    countries: res.data.data
                });
            }
        })
    },

    // 多张文件上传
    uploadimg(data) {
        var that = this,
            i = data.i ? data.i : 0,//当前上传的哪张图片
            success = data.success ? data.success : 0,//上传成功的个数
            fail = data.fail ? data.fail : 0;//上传失败的个数
        wx.uploadFile({
            url: data.url,
            filePath: data.path[i],
            name: 'file',//这里根据自己的实际情况改
            header: {
                'token': app.globalData.token,
                "content-type": "multipart/form-data"
            },
            formData: {
                orderId: data.id,
                sortNumber: i
            },//这里是上传图片时一起上传的数据
            success: (resp) => {
                success++;//图片上传成功，图片上传成功的变量+1
                console.log(resp)
                console.log(i);
                //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
            },
            fail: (res) => {
                fail++;//图片上传失败，图片上传失败的变量+1
                console.log('fail:' + i + "fail:" + fail);
            },
            complete: () => {
                console.log(i);
                i++;//这个图片执行完上传后，开始上传下一张
                if (i == data.path.length) {   //当图片传完时，停止调用
                    console.log('执行完毕');
                    console.log('成功：' + success + " 失败：" + fail);
                } else {//若图片还没有传完，则继续调用函数
                    console.log(i);
                    data.i = i;
                    data.success = success;
                    data.fail = fail;
                    that.uploadimg(data);
                }

            }
        });
    },
    deleteImage: function (e) {  //长按删除图片
        var that = this;
        var images = that.data.files;
        var index = e.currentTarget.dataset.index;//获取当前长按图片下标
        wx.showModal({
            title: '提示',
            content: '确定要删除此图片吗？',
            success: function (res) {
                if (res.confirm) {
                    images.splice(index, 1);
                } else if (res.cancel) {
                    return false;
                }
                that.setData({
                    files: images
                });
            }
        })
    }
})