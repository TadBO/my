//index.js
//获取应用实例
const app = getApp()

var sliderWidth = 50; // 需要设置slider的宽度，用于计算中间位置

Page({
    data: {
        isShow: false,
        searchValue: null,
        tabs: ["热搜", "便民服务", "家电维修", "数码维修", "家政服务", "其他"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0
    },
    onLoad: function () {
        var that = this;
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
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
    tabClick(e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    }
})
