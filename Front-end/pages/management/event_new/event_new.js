// pages/management/event_new/event_new.js
const appInstance = getApp()
const URL = appInstance.globalData.URL
const userId = appInstance.globalData.userId

Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon: '/assets/cup.svg',
    name: '创建新赛事名称',
    description: '编辑赛事简介',
    modalHiddenEname: true, // 控制模态框显示隐藏
    modalHiddenEdes: true,

    teamList : Array,
    eventId: Number
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
  cancelChangeEventdes: function (){
    this.setData({
      modalHiddenEdes: true
    });
  },

  confirmCreate: function (){
    var that = this;
    // 构造要发送给后端的数据
    const dataToUpdate = {
      name: that.data.name,
      description: that.data.description,
    };
    // 发送请求到后端接口
    wx.request({
      url: URL + '/event/create?ownerId=' + userId, // 后端接口地址
      method: 'POST', // 请求方法
      data: dataToUpdate, // 要发送的数据
      success: res => {
        // 请求成功的处理逻辑
        // 获取成功信息并显示在 toast 中
        const successMsg = res.data ? res.data : '创建成功'; // 假设后端返回的成功信息在 res.data.message 中
        wx.showToast({
          title: successMsg,
          icon: 'none',
          duration: 2000,
        });
      },
      fail: err => {
        // 请求失败的处理逻辑
        console.error('赛事创建失败', err);
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