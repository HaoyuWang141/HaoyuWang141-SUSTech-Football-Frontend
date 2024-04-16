// pages/management/event_edit/invite_team/invite_team.js
const appInstance = getApp()
const URL = appInstance.globalData.URL
const userId = appInstance.globalData.userId

Page({

  /**
   * 页面的初始数据
   */
  data: {
    eventId: Number,
    teamList: Array,
    homeTeamId: Number,
    awayTeamId: Number,
    activeHomeTeam: -1,
    activeAwayTeam: -1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      eventId: options.id
    })
    console.log('比赛' + this.data.eventId);
    this.fetchData(this.data.eventId);
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
    this.fetchData(this.data.eventId);
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
    this.fetchData(this.data.eventId);
    wx.stopPullDownRefresh();
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

  fetchData: function (eventId) {
    // 显示加载提示框，提示用户正在加载
    wx.showLoading({
      title: '加载中',
      mask: true // 创建一个蒙层，防止用户操作
    });

    var that = this;

    wx.request({
      url: URL + '/event/team/getAll?eventId=' + eventId,
      success(res) {
        console.log("team->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        // 基本数据
        that.setData({
          teamList: res.data,
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

  selectHomeTeam(e){
    let id = e.currentTarget.dataset.item;
    const homeTeamId = e.target.dataset.id;
    this.setData({
      homeTeamId: homeTeamId,
      activeHomeTeam: id,
    })
    console.log('选择主队' + this.data.homeTeamId);
    console.log('activeHomeTeam->' + this.data.activeHomeTeam);
  },

  selectAwayTeam(e){
    let id = e.currentTarget.dataset.item;
    const awayTeamId = e.target.dataset.id;
    this.setData({
      awayTeamId: awayTeamId,
      activeAwayTeam: id,
    })
    console.log('选择客队' + this.data.awayTeamId);
    console.log('activeAwayTeam->' + this.data.activeAwayTeam);
  },

  confirmSelect: function(){
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
          homeTeamId: this.data.homeTeamId,
          awayTeamId: this.data.awayTeamId,
    })
    wx.navigateBack({
          delta: 1,
    })
  },
})