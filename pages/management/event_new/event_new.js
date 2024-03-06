// pages/management/event_new/event_new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon: '/assets/cup.svg',
    name: '创建新赛事名称',
    modalHidden: true, // 控制模态框显示隐藏

    teamsData : [
      { name: '南科大足球队', img: '/assets/barca1.png', number: '25'},
      { name: '南科大足球队', img: '/assets/barca1.png', number: '22'},
      { name: '南科大足球队', img: '/assets/barca1.png', number: '25'},
      { name: '南科大足球队', img: '/assets/barca1.png', number: '22'},
      { name: '南科大足球队', img: '/assets/barca1.png', number: '25'},
      { name: '南科大足球队', img: '/assets/barca1.png', number: '22'},
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

  // 显示赛事名称输入弹窗
  showNameInput: function () {
    this.setData({
      modalHidden: false
    });
  },

  changename: function (e) {
    this.setData({
      newname: e.detail.value
    });
  },

  // 确认更改队名时触发的事件
  confirmChangeEventname: function () {
    // 这里可以添加逻辑，如检查输入是否合法等
    this.setData({
      name: this.data.newname,
      modalHidden: true
    });
  },

  // 取消更改队名时触发的事件
  cancelChangeEventname: function () {
    this.setData({
      modalHidden: true
    });
  },

  // 邀请参赛球队
  inviteNewTeam() {

  },

})