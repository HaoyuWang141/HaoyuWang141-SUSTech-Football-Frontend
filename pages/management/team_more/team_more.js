// pages/management/team_more/team_more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamsData : [
      { name: '南科大足球队', img: '/assets/barca1.png', number: 25 },
      { name: '南科大校队', img: '/assets/barca1.png', number: 22 },
      { name: '南科大足球队', img: '/assets/barca1.png', number: 25 },
      { name: '南科大校队', img: '/assets/barca1.png', number: 22 },
      { name: '南科大足球队', img: '/assets/barca1.png', number: 25 },
      { name: '南科大校队', img: '/assets/barca1.png', number: 22 },
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

  createNewTeam() {
    wx.navigateTo({
      url: '/pages/management/team_new/team_new',
    })
  },

  gotoEditTeam() {
    wx.navigateTo({
      url: '/pages/management/team_edit/team_edit',
    })
  },

})