// pages/management/match_new/match_new.js
const appInstance = getApp()
const URL = appInstance.globalData.URL
const userId = appInstance.globalData.userId
const {
  formatTime,
  splitDateTime
} = require("../../../utils/timeFormatter")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateTime: String,
    date: '请选择日期',
    time: '请选择时间',
    homeTeam: {name:"未指定", logoUrl:"/assets/newplayer.png"},
    awayTeam: {name:"未邀请", logoUrl:"/assets/newplayer.png"},
    icon1: '/assets/newplayer.png',
    icon2: '/assets/newplayer.png',
    hasBegun: false,
    modalHidden: true, // 控制模态框显示隐藏
    array: [
      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    ],
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

  // 选定主队
  // 处理邀请队伍
  inviteHomeTeam: function(e) {
    wx.navigateTo({
      url: '/pages/management/match_new/set_homeTeam/set_homeTeam',
    })
  },

  // 邀请客队

  // 点击确认创建按钮，弹出确认修改模态框
  showCreateModal() {
    var that = this
    wx.showModal({
      title: '确认创建',
      content: '确定要进行创建比赛吗？',
      confirmText: '确认',
      cancelText: '取消',
      success(res) {
        if (res.confirm) {
          that.confirmCreate() // 点击确认时的回调函数
        } else if (res.cancel) {
          () => {} // 点击取消时的回调函数，这里不做任何操作
        }
      }
    });
  },

  // 处理提交信息修改
  confirmCreate: function () {
    var that = this;
    let sqlTimestamp = this.data.date + 'T' + this.data.time + ":00.000+00:00"; // 转换为 ISO 
    that.setData({
      dateTime: sqlTimestamp,
    });
    // 构造要发送给后端的数据
    const dataToUpdate = {
      time: this.data.dateTime
    };
    // 发送请求到后端接口
    var message;
    wx.request({
      url: URL + '/match/create?ownerId=' + userId, // 后端接口地址
      method: 'POST', // 请求方法
      data: dataToUpdate, // 要发送的数据
      success: res => {
        // 请求成功的处理逻辑
        console.log("dataToUpdate->");
        console.log(dataToUpdate);
        console.log('比赛信息更新成功', res.data);
        // 可以根据后端返回的数据更新页面状态或进行其他操作
        // 获取成功信息并显示在 toast 中
        const successMsg = res.data ? res.data : '创建成功'; // 假设后端返回的成功信息在 res.data.message 中
        message = successMsg
        console.log(successMsg)
        wx.showToast({
          title: successMsg,
          icon: 'none',
          duration: 2000,
          success: function () {
            setTimeout(function () {
              wx.navigateBack({
                delta: 1,
              })
            }, 2000);
          }
        });
      },
      fail: err => {
        // 请求失败的处理逻辑
        console.error('比赛创建失败', err);
        // 可以显示失败的提示信息或进行其他操作
        // 显示失败信息
        wx.showToast({
          title: '创建失败，请重试',
          icon: 'none',
          duration: 2000
        });
      },
    });
  },

})