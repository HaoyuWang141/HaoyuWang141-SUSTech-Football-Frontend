// pages/management/match_edit/match_edit.js
const appInstance = getApp()
const URL = appInstance.globalData.URL
const {formatTime, splitDateTime} = require("../../../utils/timeFormatter")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    matchId: -1,
    timeInfo: new Date(),
    hasBegun: false,
    strTimeInfo: String,
    strDate: String,
    strTime: String,
    name: '友谊赛',
    homeTeamId: -1,
    awayTeamId: -1,
    homeTeamScore: -1,
    awayTeamScore: -1,
    homeTeamPenalty: -1,
    awayTeamPenalty: -1,
    homeTeam: Array,
    awayTeam: Array,
    // refereeList: Array,
    // matchPlayerActionList: Array,
    modalHidden: true, // 控制模态框显示隐藏
    array: [['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], 
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']]
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
      url: URL + '/match/get',
      data: {
        id: id
      },
      success(res) {
        console.log("match->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        var date = new Date(res.data.time)
        let strTimeInfo = formatTime(date)
        let hasBegun = new Date() > date
        let { strDate, strTime } = splitDateTime(strTimeInfo) 
        // 基本数据
        that.setData({
          matchId: res.data.matchId,
          timeInfo: res.data.time,
          hasBegun: hasBegun,
          strTimeInfo: strTimeInfo,
          strDate: strDate,
          strTime: strTime,
          homeTeamId: res.data.homeTeamId,
          awayTeamId: res.data.awayTeamId,
          homeTeamScore: res.data.homeTeamScore,
          awayTeamScore: res.data.awayTeamScore,
          homeTeamPenalty: res.data.homeTeamPenalty,
          awayTeamPenalty: res.data.awayTeamPenalty,
          homeTeam: res.data.homeTeam,
          awayTeam: res.data.awayTeam,
          // refereeList: refereeList,
          // matchPlayerActionList: matchPlayerActionList,
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

  // 处理日期选择器选择完成事件
  bindDateChange: function (e) {
    // 更新页面上的日期显示
    this.setData({
      strDate: e.detail.value
    });
  },

  // 处理时间选择器选择完成事件
  bindTimeChange: function (e) {
    // 更新页面上的时间显示
    this.setData({
      strTime: e.detail.value
    });
  },

  // 显示比赛名称输入弹窗
  showNameInput: function () {
    this.setData({
      modalHidden: false
    });
  },

  changeName: function (e) {
    this.setData({
      newname: e.detail.value
    });
  },

  // 确认更改比赛名时触发的事件
  confirmChangeName: function () {
    // 这里可以添加逻辑，如检查输入是否合法等
    this.setData({
      name: this.data.newname,
      modalHidden: true
    });
  },

  // 取消更改比赛名时触发的事件
  cancelChangeName: function () {
    this.setData({
      modalHidden: true
    });
  },

  // 处理比分选择器选择完成事件
  bindPickerChangeScore: function (e) {
    const value = e.detail.value;
    // 更新页面上的比分显示
    this.setData({
      homeTeamScore: this.data.array[0][value[0]],
      awayTeamScore: this.data.array[0][value[1]]
    });
  },

  // 处理点球比分选择器选择完成事件
  bindPickerChangePenalty: function (e) {
    const value = e.detail.value;
    // 更新页面上的点球比分显示
    this.setData({
      homeTeamPenalty: this.data.array[0][value[0]],
      awayTeamPenalty: this.data.array[0][value[1]]
    });
  },

  // 处理提交信息修改
  confirmEdit(){

  }

})