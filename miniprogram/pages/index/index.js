//index.js
//获取应用实例
const app = getApp()
// 1. 获取数据库引用
const db = wx.cloud.database();
const innerAudioContext = wx.createInnerAudioContext()

var that = this
Page({
  data: {
    loadingState: 0,
    showTitle: '',
    backmusic:'',
    isPlayingMusic: true,
    debuguploadimg:false
  },
  uploadimg:function(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime()+'.jpg',
          filePath: tempFilePaths[0], // 文件路径
        }).then(res => {
          // get resource ID
          console.log(res.fileID)
          db.collection("image").add({
            data:{
              fileID:res.fileID,
              title:new Date().getDate()
            }
          }).then(respon=>{
            console.log(respon)
          })


        }).catch(error => {
          // handle error
        })
      }
    })
  },

  onLoad: function() {
    that = this
    that.getStartTitle();

  },

  /**
   * 点击重新加载
   */
  reload: function() {
    that.setData({
      loadingState: 0
    })
    that.getStartTitle()
  },

  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},
  play: function(event) {
    if (this.data.isPlayingMusic) {
      that.setData({
        isPlayingMusic: false
      })
      innerAudioContext.pause();
    } else {
      that.setData({
        isPlayingMusic: true
      })
      innerAudioContext.play();
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: "这个结婚创意小程序真好",
      desc: '前端er的浪漫你不懂!',
      path: '/pages/index/index'
    }
  },
  /**
   * 获取展示的标题
   */
  getStartTitle: function() {
    db.collection('indexTitle').get().then(res=>{
        console.log(res)
        if (res.errMsg == "collection.get:ok") {
          that.setData({
            loadingState: 1,
            showTitle: res.data[0].startTitle,
          })
          //设置背景音乐
                innerAudioContext.autoplay = true
                innerAudioContext.loop = true
                if (res.data[0].backmusic) {
                  innerAudioContext.src = res.data[0].backmusic
                }
        } else {
          that.setData({
            loadingState: 3
          })
        }
    })
  },

  jumpIndexPage: function() {
    wx.switchTab({
      url: '../../pages/pics/pics',
    })
  }
})
