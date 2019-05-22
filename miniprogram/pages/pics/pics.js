// pages/pics/pics.js
var that = this;
// 1. 获取数据库引用
const db = wx.cloud.database();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        loadingState: 0,
        images: [],
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        that = this;
        that.getPageData();
        wx.setNavigationBarTitle({
            title: '时间的礼物',
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
    },

    /**
     * 获取页面数据
     */
    getPageData: function () {
        db.collection('image').get().then(res2 => {
            console.log(res2);
            this.setData({
                loadingState: 1,
                images: res2.data
            })
        })

    },


    /**
     * 点击重新加载
     */
    reload: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

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
        return {
            title: "这个结婚创意小程序真好",
            desc: '前端er的浪漫你不懂!',
            path: '/pages/index/index'
        }
    },


});
