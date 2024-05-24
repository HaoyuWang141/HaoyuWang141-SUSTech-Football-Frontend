// pages/management/match_new/set_homeTeam/set_homeTeam.js
const appInstance = getApp()
const URL = appInstance.globalData.URL
const userId = appInstance.globalData.userId
const ANONYMITY = appInstance.globalData.ANONYMITY

Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchData()
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
    this.fetchData()
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

  fetchData() {
    console.log("set homeTeam: fetchData, userId=" + userId)
    let that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    wx.request({
      url: URL + '/user/getUserManageTeam?userId=' + userId,
      success(res) {
        console.log("set homeTeam: fetchData ->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        let teamList = res.data
        for (let team of teamList) {
          team.logoUrl = team.logoUrl ?? ANONYMITY
        }
        that.setData({
          teamList,
        })
      },
      fail(err) {
        console.log("请求失败，错误码为：" + err.statusCode + "；错误信息为：" + err.message)
      },
      complete() {
        wx.hideLoading();
      }
    })
  },

  selectHomeTeam(e) {
    const homeTeamId = e.target.dataset.id;
    console.log('选择主队: ' + homeTeamId);
    let homeTeam = {}
    for (let team of this.data.teamList) {
      if (team.teamId == homeTeamId) {
        homeTeam.teamId = team.teamId
        homeTeam.name = team.name
        homeTeam.logoUrl = team.logoUrl
        break
      }
    }
    this.homeTeamBack(homeTeam);
  },

  homeTeamBack(homeTeam) {
    console.log('Back->');
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      homeTeam,
    })
    wx.navigateBack({
      delta: 1,
    })
  },
})