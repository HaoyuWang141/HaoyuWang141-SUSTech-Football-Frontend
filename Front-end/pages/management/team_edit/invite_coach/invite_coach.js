// pages/management/team_edit/invite_coach/invite_coach.js
const appInstance = getApp()
const URL = appInstance.globalData.URL

Page({

  /**
   * 页面的初始数据
   */
  data: {
    allCoachList: Array,

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
      teamId: parseInt(options.id)
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
    this.fetchData(this.data.teamId);
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
    this.fetchData(this.data.teamId);
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

  // 获取基本数据
  fetchData: function (id) {
    // 显示加载提示框，提示用户正在加载
    wx.showLoading({
      title: '加载中',
      mask: true
    });

    const that = this
    wx.request({
      url: URL + "/coach/getAll",
      success(res) {
        console.log("/coach/getAll")
        console.log(res.data)
        that.setData({
          allCoachList: res.data,
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

  // 判断球员是否在coachList中
  isInCoachList: function(id) {
    const isInList = this.data.coachList.find(coach => coach.coachId.include(id));
    console.log('Coach ${id} is {isInList ? "in" : "not in"} the player list.');
    return isInList;
  },

  invite(e) {
    wx.request({
      url: URL + '/team/coach/invite?teamId=' + this.data.teamId + "&coachId=" + e.currentTarget.dataset.id,
      method: 'POST',
      success: res => {
        console.log('已邀请', res.data);
        // 获取成功信息并显示在 toast 中
        const successMsg = res.data ? res.data : '已邀请'; // 假设后端返回的成功信息在 res.data.message 中
        wx.showToast({
          title: successMsg,
          icon: 'none',
          duration: 2000
        });
      },
      fail: err => {
        console.error('邀请失败', err);
        // 显示失败信息
        wx.showToast({
          title: '请求失败，请重试',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },
  
})