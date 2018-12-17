//app.js
App({
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        var that = this;
        // 登录
        wx.login({
            success: res => {
                // console.log(res);
                // console.log(that.globalData.userInfo);
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                wx.request({
                    url: that.globalData.url + '/order/wechatSignIn',
                    data: {
                        code: res.code
                    },
                    success: res => {
                        //缓存token全局使用
                        that.globalData.token = res.data.data.token;
                        // 获取用户信息
                        wx.getSetting({
                            success: res => {
                                console.log("获取用户信息" + res);
                                if (res.authSetting['scope.userInfo']) {
                                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                                    wx.getUserInfo({
                                        success: res => {
                                            // 可以将 res 发送给后台解码出 unionId
                                            that.globalData.userInfo = res.userInfo
                                            wx.request({
                                                url: that.globalData.url + '/order/wechatAuthUserInfo',
                                                header: {'token': this.globalData.token},
                                                data: {
                                                    signature: res.signature,
                                                    rawData: res.rawData,
                                                    encryptedData: res.encryptedData,
                                                    iv: res.iv
                                                },
                                                success: res => {

                                                }
                                            })
                                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                                            // 所以此处加入 callback 以防止这种情况
                                            if (that.userInfoReadyCallback) {
                                                that.userInfoReadyCallback(res)
                                            }
                                        }
                                    })
                                } else {

                                }
                            }
                        });
                    }
                })
            }
        })

    },
    globalData: {
        userInfo: null,
        url: "http://47.100.23.67:8080",
        token: ""
    }
})