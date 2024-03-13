// pages/management/event_edit/event_edit.js
const appInstance = getApp()
const URL = appInstance.globalData.URL

Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon: '/assets/cup.svg',    
    edit: '编辑',
    name: String,
    description: String,
    modalHiddenEname: true, // 控制模态框显示隐藏
    modalHiddenEdes: true,
    id: -1,
    teamList: Array,
    matchList: Array,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.id)
    this.setData({
      id: options.id
    })
    this.fetchData(options.id);
  },

  fetchData: function (id) {
    // 显示加载提示框，提示用户正在加载
    wx.showLoading({
      title: '加载中',
      mask: true // 创建一个蒙层，防止用户操作
    });

    var that = this;
    // 模拟网络请求
    wx.request({
      url: URL + '/event/get',
      data: {
        id: id
      },
      success(res) {
        console.log("event->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        // 基本数据
        that.setData({
          name: res.data.name,
          description: res.data.description,
          managerList: res.data.managerList,
          teamList: res.data.teamList,
          matchList: res.data.matchList,
        });
      },
      fail(err) {
        console.log('请求失败', err);
        // 可以显示失败的提示信息，或者做一些错误处理
      },
      complete() {
        // 无论请求成功还是失败都会执行
        wx.hideLoading(); // 关闭加载提示框
      }
    });
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
      modalHiddenEname: false
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
      modalHiddenEname: true
    });
  },

  // 取消更改队名时触发的事件
  cancelChangeEventname: function () {
    this.setData({
      modalHiddenEname: true
    });
  },

  showDesInput: function () {
    this.setData({
      modalHiddenEdes: false
    });
  },

  changedes: function (e) {
    this.setData({
      newdes: e.detail.value
    });
  },

  // 确认更改队名时触发的事件
  confirmChangeEventdes: function () {
    // 这里可以添加逻辑，如检查输入是否合法等
    this.setData({
      description: this.data.newdes,
      modalHiddenEdes: true
    });
  },

  // 取消更改队名时触发的事件
  cancelChangeEventdes: function () {
    this.setData({
      modalHiddenEdes: true
    });
  },

  inviteNewTeam() {

  },

  createNewMatch() {
    
  },

  gotoTeamPage: function(e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/pub/team/team?id=' + dataset.id,
    })
  },

  gotoMatchPage: function(e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/pub/match/match?id=' + dataset.id,
    })
  },

})