// pages/pub/team/team.js
const appInstance = getApp()
const URL = appInstance.globalData.URL

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
    activeIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      // id: options.id,
      id: 1,
    })
    this.fetchData(this.data.id);
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

  // 获取比赛数据
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
        console.log("team/get?id=" + id + " ->")
        console.log(res.data)

        // var date = new Date(res.data.time)
        // let strTime = formatTime(date)
        // let hasBegun = new Date() > date
        that.setData({
          homeTeam: res.data.homeTeam,
          name: res.data.name,
          logoUrl: res.data.logoUrl,
          captainId: res.data.captainId,
          coachList: res.data.coachList,
          playerList: res.data.playerList,
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
    // if (this.data.activeIndex != tabIndex) {
    //   this.loadTabData(tabIndex);
    // }
    this.setData({
      activeIndex: tabIndex
    })
  },

})