const app = getApp()
const URL = app.globalData.URL
const {
  formatTime
} = require("../../../utils/timeFormatter")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    matchList: [],
    teamList: [],
    eventList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    app.addToRequestQueue(this.fetchCoachId)
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
    app.addToRequestQueue(this.fetchCoachId)
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

  // 拉取数据
  fetchCoachId(userId) {
    let that = this
    wx.request({
      url: URL + '/user/getCoachId',
      data: {
        userId: userId,
      },
      success(res) {
        console.log("profile coach page: fetchCoachId ->")
        if (res.statusCode != 200) {
          console.error("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        console.log(res.data)
        let playerId = res.data
        that.fetchCoachMatches(playerId)
        that.fetchCoachTeams(playerId)
        that.fetchCoachEvents(playerId)
      },
      fail(err) {
        console.error('请求失败：', err.statusCode, err.errMsg);
      },
    })
  },

  fetchCoachMatches(coachId) {
    let that = this
    wx.request({
      url: URL + '/coach/match/getAll',
      data: {
        coachId: coachId,
      },
      success(res) {
        console.log("profile coach page: fetchCoachMatches ->")
        if (res.statusCode != 200) {
          console.error("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        console.log(res.data)
        let matchList = res.data ?? []
        for (let match of matchList) {
          let date = new Date(match.time)
          match.strTime = formatTime(date)
          match.hasBegun = new Date() > date
        }
        that.setData({
          matchList: matchList,
        })
      },
      fail(err) {
        console.error('请求失败：', err.statusCode, err.errMsg);
      },
    })
  },

  fetchCoachTeams(coachId) {
    let that = this
    wx.request({
      url: URL + '/coach/team/getAll',
      data: {
        coachId: coachId,
      },
      success(res) {
        console.log("profile coach page: fetchCoachTeams ->")
        if (res.statusCode != 200) {
          console.error("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        console.log(res.data)
        let teamList = res.data ?? []
        that.setData({
          teamList: teamList,
        })
      },
      fail(err) {
        console.error('请求失败：', err.statusCode, err.errMsg);
      },
    })
  },

  fetchCoachEvents(coachId) {
    let that = this
    wx.request({
      url: URL + '/player/event/getAll',
      data: {
        coachId: coachId,
      },
      success(res) {
        console.log("profile coach page: fetchCoachEvents ->")
        if (res.statusCode != 200) {
          console.error("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        console.log(res.data)
        let eventList = res.data ?? []
        that.setData({
          eventList: eventList,
        })
      },
      fail(err) {
        console.error('请求失败：', err.statusCode, err.errMsg);
      },
    })
  },

  // 页面跳转
  edit_information() {
    wx.navigateTo({
      url: '/pages/profile_player/profile_coach_edit/profile_coach_edit',
    })
  },

  gotoMatchesPage(e) {
    let matchList = e.currentTarget.dataset.list ?? []
    let matchIdList = matchList.map(match => match.matchId)
    wx.navigateTo({
      url: '/pages/pub/matches/matches?idList=' + matchIdList,
    })
  },

  gotoMatchPage: function (e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/pub/match/match?id=' + dataset.id,
    })
  },

  gotoTeamsPage(e) {
    let teamList = e.currentTarget.dataset.list ?? []
    let teamIdList = teamList.map(team => team.teamId)
    wx.navigateTo({
      url: '/pages/pub/teams/teams?idList=' + teamIdList,
    })
  },

  gotoTeamPage: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/pub/team/team?id=' + id,
    })
  },

  gotoEventPage: function (e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/pub/event/event?id=' + dataset.id,
    })
  },

})