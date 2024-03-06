// pages/management/team_edit/team_edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    badgeSrc: '',     // 队徽图片地址
    modalHidden: true, // 控制模态框显示隐藏
    newTeamname: '',   // 用于存放用户输入的新队名
    teamname: "南方科技大学校队"
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
   * 修改队徽
   */
  changeBadge: function () {
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
   * 修改队名
   */
  // 点击队名触发的事件，显示模态框
  showTeamnameModal: function () {
    this.setData({
      modalHidden: false
    });
  },

  // 输入框内容改变时触发的事件
  changeTeamname: function (e) {
    this.setData({
      newTeamname: e.detail.value
    });
  },

  // 确认更改队名时触发的事件
  confirmChangeTeamname: function () {
    // 这里可以添加逻辑，如检查输入是否合法等
    this.setData({
      teamname: this.data.newTeamname,
      modalHidden: true
    });
  },

  // 取消更改队名时触发的事件
  cancelChangeTeamname: function () {
    this.setData({
      modalHidden: true
    });
  },

  /**
   * 邀请新队员
   */
  inviteNewPlayer() {

  },
  
})