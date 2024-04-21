// pages/management/event_edit/event_matches/event_matches.js
const appInstance = getApp()
const URL = appInstance.globalData.URL
const {
  formatTime
} = require("../../../../utils/timeFormatter")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eventId: Number,
    matchList: Array,
    newMatch: {
      name: '发起新比赛',
      team1: '主队',
      team2: '客队',
      icon1: '/assets/newplayer.png',
      icon2: '/assets/newplayer.png',
      score1: 0,
      score2: 0,
      hasBegun: true,
      time: "2024-03-14 23:54"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      eventId: parseInt(options.id),
    })
    this.fetchData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.fetchData();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.fetchData();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  fetchData: function () {
    // 显示加载提示框，提示用户正在加载
    wx.showLoading({
      title: '加载中',
      mask: true
    });

    var that = this;
    // 模拟网络请求
    wx.request({
      url: URL + '/event/get?id=' + that.data.eventId,
      success(res) {
        console.log("event match->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        // 格式化时间
        let matchList = res.data.matchList ?? []
        for (let match of matchList) {
          let date = new Date(match.time)
          match.strTime = formatTime(date)
          match.hasBegun = match.status == 'PENDING' ? false : true
        }
        // 基本数据
        that.setData({
          matchList: res.data.matchList,
        });
        
      },
      fail(err) {
        console.log('请求失败', err);
        // 可以显示失败的提示信息，或者做一些错误处理
      },
      complete() {
        // 无论请求成功还是失败都会执行
        wx.hideLoading(); // 关闭加载提示框
      }
    });
  },

  goToCreateMatch: function(e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/management/event_edit/match_new/match_new?id=' + dataset.id,
    })
  },

  gotoEditMatch: function(e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/management/event_edit/match_edit/match_edit?id=' + dataset.id,
    })
  },
  
})