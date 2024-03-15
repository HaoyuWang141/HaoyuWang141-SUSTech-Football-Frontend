// pages/pub/teams/teams.js
const appInstance = getApp()
const URL = appInstance.globalData.URL

Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamIdList: [],
    teams: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      teamIdList: options.teamIdList || [],
    })
    this.fetchData(options.id)
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

  ////////////////////////////////////////////////////////////////
  // HTTP 请求

  fetchData: function (id) {

    // 显示加载提示框，提示用户正在加载
    wx.showLoading({
      title: '加载中',
      mask: true // 创建一个蒙层，防止用户操作
    });

    // 网络请求
    var that = this
    wx.request({
      url: URL + '/team/getAll',
      success(res) {
        console.log("/team/getAll ->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }

        var teams = []
        var teamIdList = that.data.teamIdList
        for (let team of res.data) {
          console.log(teamIdList.length, team.teamId)
          if (teamIdList.length === 0 || teamIdList.includes(team.teamId)) {
            teams.push(team)
          }
        }
        that.setData({
          teams: teams
        })
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

  /////////////////////////////////////////////////////
  // 跳转

  gotoTeam: function (e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/pub/team/team?id=' + id,
    })
  },
})