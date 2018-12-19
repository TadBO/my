/**
 * @Author: tuber
 * @Date: 2018/12/19
 * @Version: 1.0.0
 * @Last Modified by: tuber
 * @last Modified time: 2018/12/19
 **/
const app = getApp();
const checkLogin = function () {
   if (!app.globalData.userInfo) {  //未授权登录，提示跳转登录
       wx.showModal({
           title: '提示',
           content: '您尚未登录，请先登录',
           success(res) {
               if (res.confirm) {
                   // 点击确定后跳转到个人中心登录
                   wx.switchTab({
                       url: '/pages/center/center'
                   });
               } else if (res.cancel) {

               }
           }
       })
   }
}

module.exports = {
    checkLogin: checkLogin
}