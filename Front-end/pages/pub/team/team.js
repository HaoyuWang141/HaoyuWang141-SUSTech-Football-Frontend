// pages/pub/team/team.js
const appInstance = getApp()
const URL = appInstance.globalData.URL
const {
  formatTime
} = require("../../../utils/timeFormatter")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: -1,
    name: String,
    logoUrl: String,
    captainId: String,
    coachList: Array,
    playerIdList: Array,
    matchList: Array,
    activeIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id,
    })
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
    this.fetchData(this.data.id);
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
    this.fetchData(this.data.id);
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

  ////////////////////////////////////////////////////////////////
  // HTTP 请求

  // 获取基本数据
  fetchData: function (id) {
    // 显示加载提示框，提示用户正在加载
    wx.showLoading({
      title: '加载中',
      mask: true
    });

    const that = this
    wx.request({
      url: URL + "/team/get?id=" + id,
      
      success(res) {
        console.log("/team/get?id=" + id + " ->")
        console.log(res.data)
        let matchList = res.data.matchList ?? []
        for (let match of matchList) {
          let date = new Date(match.time)
          match.strTime = formatTime(date)
          match.hasBegun = match.status == 'PENDING' ? false : true
        }
        that.setData({
          name: res.data.name,
          logoUrl: res.data.logoUrl,
          captainId: res.data.captainId,
          coachList: res.data.coachList,
          playerList: res.data.playerList,
          matchList: matchList
        })
      },
      fail(err) {
        console.log("请求失败，错误码为：" + err.statusCode + "；错误信息为：" + err.message)
      },
      complete() {
        // 无论请求成功还是失败都会执行
        wx.hideLoading(); // 关闭加载提示框
      }
    })
  },

  ////////////////////////////////////////////////////////////////
  // 页面响应

  switchTab: function (e) {
    const tabIndex = e.currentTarget.dataset.index;
    this.setData({
      activeIndex: tabIndex
    })
  },

  ////////////////////////////////////////////////////////////////
  // 页面跳转

  gotoMatchPage: function (e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/pub/match/match?id=' + id
    })
  },

  gotoMatchesPage(e) {
    let matchList = e.currentTarget.dataset.list ?? []
    let matchIdList = matchList.map(match => match.matchId)
    wx.navigateTo({
      url: '/pages/pub/matches/matches?idList=' + matchIdList,
    })
  },

  gotoPlayerPage: function (e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/pub/player/player?id=' + id
    })
  }

})