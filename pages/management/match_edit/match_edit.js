// pages/management/match_edit/match_edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2024-02-01',
    time: '15:00', 
    name: '书院杯',
    gruop: 'A组',
    score1: '1',
    score2: '1',
    penalty1: '',
    penalty2: '',
    team1: 'team1',
    team2: 'team2',
    icon1: '/assets/team.svg',
    icon2: '/assets/team.svg',
    hasBegun: true,
    modalHidden: true, // 控制模态框显示隐藏
    array: [['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], 
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
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

  // 处理日期选择器选择完成事件
  bindDateChange: function (e) {
    // 更新页面上的日期显示
    this.setData({
      date: e.detail.value
    });
  },

  // 处理时间选择器选择完成事件
  bindTimeChange: function (e) {
    // 更新页面上的时间显示
    this.setData({
      time: e.detail.value
    });
  },

  // 显示比赛名称输入弹窗
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
  confirmChangeTeamname: function () {
    // 这里可以添加逻辑，如检查输入是否合法等
    this.setData({
      name: this.data.newname,
      modalHidden: true
    });
  },

  // 取消更改队名时触发的事件
  cancelChangeTeamname: function () {
    this.setData({
      modalHidden: true
    });
  },

  // 处理比分选择器选择完成事件
  bindPickerChangeScore: function (e) {
    const value = e.detail.value;
    // 更新页面上的比分显示
    this.setData({
      score1: this.data.array[0][value[0]],
      score2: this.data.array[0][value[1]]
    });
  },

  // 处理点球比分选择器选择完成事件
  bindPickerChangePenalty: function (e) {
    const value = e.detail.value;
    // 更新页面上的点球比分显示
    this.setData({
      penalty1: this.data.array[0][value[0]],
      penalty2: this.data.array[0][value[1]]
    });
  },

  // 处理提交信息修改
  confirmEdit(){

  }

})