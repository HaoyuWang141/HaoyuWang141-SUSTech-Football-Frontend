// pages/management/team_new/team_new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logoUrl: String,     // 队徽图片地址
    teamname: String,     // 队名
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
  uploadLogo: function () {
    wx.chooseImage({
      count: 1,
      success: res => {
        const tempFilePaths = res.tempFilePaths;
        console.log("image->");
        console.log(tempFilePaths);
        this.setData({
          logoUrl: tempFilePaths[0]
        });
        console.log("logoUrl->")
        console.log(this.data.logoUrl);
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
    
  },

  confirmCreate: function (){
    // 构造要发送给后端的数据
    const dataToUpdate = {
      teamId: this.data.teamId,
      name: this.data.teamname,
      logoUrl: this.data.logoUrl,
      playerList: null,
      captainId: null,
      coachList: null,
      eventList: null,
      managerList: null,
      matchList: null,
    };
  
    // 发送请求到后端接口
    wx.request({
      url: URL + '/team/create', // 后端接口地址
      method: 'POST', // 请求方法
      data: dataToUpdate, // 要发送的数据
      success: res => {
        // 请求成功的处理逻辑
        console.log('比赛信息更新成功', res.data);
        // 可以根据后端返回的数据更新页面状态或进行其他操作
      },
      fail: err => {
        // 请求失败的处理逻辑
        console.error('比赛信息更新失败', err);
        // 可以显示失败的提示信息或进行其他操作
      }
    });
  },

})