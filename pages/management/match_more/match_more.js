// pages/management/match_more/match_more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    matchesData : [
      { name: '书院杯', group: 'A组', team1: 'team1', team2: 'team2', icon1: '/assets/team.svg', icon2: '/assets/team.svg', score1: 1, score2: 1, time: '2024-2-1 15:00', hasBegun: true },
      { name: '书院杯', group: 'A组', team1: 'team1', team2: 'team2', icon1: '/assets/team.svg', icon2: '/assets/team.svg', score1: 1, score2: 1, time: '2024-2-1 15:00', hasBegun: true },
      { name: '书院杯', group: 'A组', team1: 'team1', team2: 'team2', icon1: '/assets/team.svg', icon2: '/assets/team.svg', score1: 1, score2: 1, time: '2024-2-1 15:00', hasBegun: true },
      { name: '书院杯', group: 'A组', team1: 'team1', team2: 'team2', icon1: '/assets/team.svg', icon2: '/assets/team.svg', score1: 1, score2: 1, time: '2024-2-1 15:00', hasBegun: true },
    ]
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

  // 跳转到编辑比赛页面
  gotoEditMatch() {
    wx.navigateTo({
      url: '/pages/management/match_edit/match_edit',
    })
  },

  // 跳转到创建比赛页面
  createNewMatch() {
    wx.navigateTo({
      url: '/pages/management/match_new/match_new',
    })
  },

})