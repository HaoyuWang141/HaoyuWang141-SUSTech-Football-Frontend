// pages/pub/live/live.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: String
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      url: options.url
    })
  },
})