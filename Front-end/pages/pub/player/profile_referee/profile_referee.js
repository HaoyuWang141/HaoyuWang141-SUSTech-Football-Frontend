// pages/profile_player/profile_referee/profile_referee.js
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
    refereeId: 0,
    referee: {},
    matchList: [],
    teamList: [],
    eventList: [],
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
    app.addToRequestQueue(this.fetchRefereeId)
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
    app.addToRequestQueue(this.fetchRefereeId)
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

  // 拉取裁判id
  fetchRefereeId(userId) {
    let that = this
    wx.request({
      url: URL + '/user/getRefereeId',
      data: {
        userId: userId,
      },
      success(res) {
        console.log("profile referee page: fetchRefereeId ->")
        if (res.statusCode != 200) {
          console.error("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        console.log(res.data)
        let refereeId = res.data
        that.setData({
          refereeId: refereeId
        })
        that.fetchData(refereeId)
        that.fetchRefereeMatches(refereeId)
        that.fetchRefereeEvents(refereeId)
      },
      fail(err) {
        console.error('请求失败：', err.statusCode, err.errMsg);
      },
    })
  },

  // 拉取裁判个人信息
  fetchData(refereeId) {
    let that = this
    wx.request({
      url: URL + '/referee/get',
      data: {
        id: refereeId,
      },
      success(res) {
        console.log("profile referee page: fetchData ->")
        if (res.statusCode != 200) {
          console.error("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        console.log(res.data)
        that.setData({
          referee: res.data,
        })
      },
      fail(err) {
        console.error('请求失败：', err.statusCode, err.errMsg);
      },
    })
  },

  // 拉取比赛
  fetchRefereeMatches(refereeId) {
    let that = this
    wx.request({
      url: URL + '/referee/match/getAll',
      data: {
        refereeId,
      },
      success(res) {
        console.log("profile referee page: fetchRefereeMatches ->")
        if (res.statusCode != 200) {
          console.error("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        console.log(res.data)
        let matchList = res.data ?? []
        for (let match of matchList) {
          let date = new Date(match.time)
          match.strTime = formatTime(date)
          match.hasBegun = match.status == 'PENDING' ? false : true
        }
        that.setData({
          matchList,
        })
      },
      fail(err) {
        console.error('请求失败：', err.statusCode, err.errMsg);
      },
    })
  },

  // 拉取赛事
  fetchRefereeEvents(refereeId) {
    let that = this
    wx.request({
      url: URL + '/referee/event/getAll',
      data: {
        refereeId: refereeId,
      },
      success(res) {
        console.log("profile referee page: fetchRefereeEvents ->")
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
    let referee = this.data.referee
    console.log(referee)
    const queryString = Object.keys(referee).map(key => {
      console.log(key + ": " + encodeURIComponent(referee[key]))
      return `${key}=${encodeURIComponent(referee[key])}`
    }).join('&');
    console.log("queryString->")
    console.log(queryString)
    wx.navigateTo({
      url: `/pages/profile_player/profile_referee_edit/profile_referee_edit?${queryString}`
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

  gotoRegisterPage() {
    wx.navigateTo({
      url: '../profile_referee_register/profile_referee_register',
    })
  },
})