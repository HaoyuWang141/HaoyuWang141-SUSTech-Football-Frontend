// pages/management/invite_player/invite_player.js
const appInstance = getApp()
const URL = appInstance.globalData.URL

Page({

  /**
   * 页面的初始数据
   */
  data: {
    allPlayerList: Array,

    teamId: Number,
    name: String,
    logoUrl: String,
    captainId: String,
    coachList: Array,
    playerList: Array,
    matchList: Array,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.id);
    this.setData({
      teamId: options.id,
    })
    this.fetchData(this.data.teamId);
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

  // 获取基本数据
  fetchData: function (id) {
    // 显示加载提示框，提示用户正在加载
    wx.showLoading({
      title: '加载中',
      mask: true
    });

    const that = this
    wx.request({
      url: URL + "/player/getAll",
      success(res) {
        console.log("/player/getAll")
        console.log(res.data)
        that.setData({
          allPlayerList: res.data,
        })
      },
      fail(err) {
        console.log("请求失败，错误码为：" + err.statusCode + "；错误信息为：" + err.message)
      },
      complete() {
        // 无论请求成功还是失败都会执行
        wx.hideLoading(); // 关闭加载提示框
      }
    })

    wx.request({
      url: URL + "/team/get?id=" + id,
      success(res) {
        console.log("/team/get?id=" + id + " ->")
        console.log(res.data)
        that.setData({
          homeTeam: res.data.homeTeam,
          name: res.data.name,
          logoUrl: res.data.logoUrl,
          captainId: res.data.captainId,
          coachList: res.data.coachList,
          playerList: res.data.playerList,
          matchList: res.data.matchList
        })
      },
      fail(err) {
        console.log("请求失败，错误码为：" + err.statusCode + "；错误信息为：" + err.message)
      },
      complete() {
        // 无论请求成功还是失败都会执行
        wx.hideLoading(); // 关闭加载提示框
      }
    })
  },

  invite: function(e) {
    const dataToUpdate = {
      teamId: this.data.teamId,
      playerId: e.currentTarget.dataset.id
    };
    // 发送请求到后端接口
    wx.request({
      url: URL + '/team/player/invite', // 后端接口地址
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

  gotoPlayerPage: function (e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/pub/player/player?id=' + id
    })
  },
})