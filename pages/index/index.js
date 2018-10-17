//index.js
//获取应用实例
const app = getApp()

var sliderWidth = 50; // 需要设置slider的宽度，用于计算中间位置

Page({
    data: {
        isShow: false,
        searchValue: null,
        current: 'tab1',
        current_scroll: 'tab1'
    },
    onLoad: function () {

    },
    //关闭按钮的出现与否
    searchList(e) {
        this.setData({
            isShow: !!e.detail.value,
            searchValue: e.detail.value
        });
    },
    handleChangeScroll({detail}) {
        this.setData({
            current_scroll: detail.key
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
    //上拉加载更多
    onReachBottom() {
        console.log(1);
    }
})
