// pages/pub/player/player.js
const appInstance = getApp()
const URL = appInstance.globalData.URL
const {
  formatTime
} = require("../../../utils/timeFormatter")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: -1,
    playerId: -1,  // id 和 playerId 是完全相同的两个字段，copy的代码里有这两种引用，懒得改了
    player: Object,
    teamList: Array,
    matchList: Array,
    eventList: Array,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id,
      playerId: options.id
    })
    this.fetchData(this.data.id)
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

  // 获取基本数据
  fetchData: function (id) {
    // 显示加载提示框，提示用户正在加载
    wx.showLoading({
      title: '加载中',
      mask: true
    });

    const that = this
    wx.request({
      url: URL + "/player/get?id=" + id,
      success(res) {
        console.log("/player/get?id=" + id + " ->")
        if (res.statusCode != 200) {
          console.error("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        console.log(res.data)
        let player = res.data
        if (player.birthDate == '' || player.birthDate == null) {
          player.strBirthDate = '暂无';
        } else {
          const date = new Date(player.birthDate);
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();
          player.strBirthDate = `${year}-${month}-${day}`;
        }
        that.setData({
          player: player,
        })
        that.fetchPlayerMatches(id)
        that.fetchPlayerTeams(id)
        that.fetchPlayerEvents(id)
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

  fetchPlayerMatches(playerId) {
    let that = this
    wx.request({
      url: URL + '/player/match/getAll',
      data: {
        playerId: playerId,
      },
      success(res) {
        console.log("profile player page: fetchPlayerMatches ->")
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

  fetchPlayerTeams(playerId) {
    let that = this
    wx.request({
      url: URL + '/player/team/getAll',
      data: {
        playerId: playerId,
      },
      success(res) {
        console.log("profile player page: fetchPlayerTeams ->")
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

  fetchPlayerEvents(playerId) {
    let that = this
    wx.request({
      url: URL + '/player/event/getAll',
      data: {
        playerId: playerId,
      },
      success(res) {
        console.log("profile player page: fetchPlayerEvents ->")
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

  ///////////////////////////////////////////////////////////////////////////////
  // 页面跳转

  coach_information() {
    wx.navigateTo({
      url: '/pages/profile_player/profile_coach/profile_coach',
    })
  },

  referee_information() {
    wx.navigateTo({
      url: '/pages/profile_player/profile_referee/profile_referee',
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
      url: './profile_player_register/profile_player_register',
    })
  },

})
