// pages/management/team_new/team_new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    badgeSrc: '',     // 队徽图片地址
    teamname: '',     // 队名
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

  /**
   * 上传队徽图片
  */ 
  uploadBadge: function () {
    wx.chooseImage({
      count: 1,
      success: res => {
        const tempFilePaths = res.tempFilePaths;
        this.setData({
          badgeSrc: tempFilePaths[0]
        });
      }
    });
  },

  /**
   * 输入队名
   */
  inputTeamname: function (e) {
    this.setData({
      teamname: e.detail.value
    });
  },

  /**
   * 邀请队员
   */
  inviteNewPlayer: function () {
    // 实现邀请新队员的逻辑
    
  }

})