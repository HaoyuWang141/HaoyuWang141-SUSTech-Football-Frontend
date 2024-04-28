// pages/management/match_new/match_new.js
const appInstance = getApp()
const URL = appInstance.globalData.URL
const userId = appInstance.globalData.userId
const {formatTime, splitDateTime} = require("../../../utils/timeFormatter")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateTime: String,
    date: String,
    time: String, 
    name: '友谊赛',
    homeTeam: "主队",
    awayTeam: "客队",
    icon1: '/assets/newplayer.png',
    icon2: '/assets/newplayer.png',
    hasBegun: false,
    modalHidden: true, // 控制模态框显示隐藏
    array: [['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], 
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const now = new Date();
    console.log(now);
    let strTimeInfo = formatTime(now)
    let { strDate, strTime } = splitDateTime(strTimeInfo)
    console.log("strdate->")
    console.log(strDate)
    console.log(strTime)
    this.setData({
      date: strDate,
      time: strTime,
    })
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
  
  // 处理提交信息修改
  confirmCreate: function (){
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
        message = successMsg;
        wx.showToast({
          title: successMsg,
          icon: 'none',
          duration: 2000,
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
      complete() {
        setTimeout(function () {
          wx.navigateBack({
            delta: 1,
          })
        }, 1000);
      }
    });
  },

})