// pages/profile_player/profile_player.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

///////////////////////////////////////////////////////////////////////////////
// 页面跳转
  edit_information() {
    wx.navigateTo({
      url: '/pages/profile_player/profile_player_edit/profile_player_edit',
    })
  },

  coach_information() {
    wx.navigateTo({
      url: '/pages/profile_player/profile_coach/profile_coach',
    })
  },

  referee_information() {
    wx.navigateTo({
      url: '/pages/profile_player/profile_referee/profile_referee',
    })
  },

  gotoTeams() {
    wx.navigateTo({
      url: '/pages/pub/teams/teams',
    })
  },

  gotoTeam() {
    wx.navigateTo({
      url: '/pages/pub/team/team',
    })
  },

  gotoMatches() {
    wx.navigateTo({
      url: '/pages/pub/matches/matches',
    })
  },

  gotoMatch() {
    wx.navigateTo({
      url: '/pages/pub/match/match',
    })
  },

  gotoEvent() {
    wx.navigateTo({
      url: '/pages/pub/event/event',
    })
  },

})