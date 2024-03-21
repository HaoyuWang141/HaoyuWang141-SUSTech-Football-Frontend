// pages/home/home.js
const app = getApp()
const URL = app.globalData.URL
const {
  formatTime
} = require("../../utils/timeFormatter")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchText: '', // 初始化搜索框内容为空
    newsList: [],
    matchList: [],
    userList: [],
    teamList: [],
    eventList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    app.addToRequestQueue(this.fetchFavorateMatch)
    app.addToRequestQueue(this.fetchFavoratePlayer)
    app.addToRequestQueue(this.fetchFavorateTeam)
    app.addToRequestQueue(this.fetchFavorateEvent)
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

  /////////////////////////////////////
  // 网络传输
  fetchFavorateMatch(id) {
    let that = this
    wx.request({
      url: URL + '/getFavorite',
      data: {
        userId: id,
        type: 'match',
      },
      success(res) {
        console.log("home page: fetchFavorite match ->")
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
      fail: function(err) {
        console.error('请求失败：', err.statusCode, err.errMsg);
      },
    })
  },

  fetchFavoratePlayer(id) {
    let that = this
    wx.request({
      url: URL + '/getFavorite',
      data: {
        userId: id,
        type: 'user',
      },
      success(res) {
        console.log("home page: fetchFavorite: users(players) ->")
        if (res.statusCode != 200) {
          console.error("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        console.log(res.data)
        let userList = res.data ?? []
        that.setData({
          userList: userList,
        })
      },
      fail: function(err) {
        console.error('请求失败：', err.statusCode, err.errMsg);
      },
    })
  },

  fetchFavorateTeam(id) {
    let that = this
    wx.request({
      url: URL + '/getFavorite',
      data: {
        userId: id,
        type: 'team',
      },
      success(res) {
        console.log("home page: fetchFavorite: teams ->")
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
      fail: function(err) {
        console.error('请求失败：', err.statusCode, err.errMsg);
      },
    })
  },

  fetchFavorateEvent(id) {
    let that = this
    wx.request({
      url: URL + '/getFavorite',
      data: {
        userId: id,
        type: 'event',
      },
      success(res) {
        console.log("home page: fetchFavorite: events ->")
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
      fail: function(err) {
        console.error('请求失败：', err.statusCode, err.errMsg);
      },
    })
  },

  ///////////////////////////////////////////////////////////////////////////////
  // 页面跳转
  gotoExample() {
    wx.navigateTo({
      url: '/pages/example/example',
    })
  },

  gotoSearch() {
    wx.navigateTo({
      url: '/pages/home/search/search?' + 'searchText=' + encodeURIComponent(this.data.searchText),
    })
  },

  gotoNewsPage: function (e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/pub/news/news?id=' + dataset.id,
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

  gotoPlayerPage(e) {
    wx.navigateTo({
      url: '/pages/pub/players/players',
    })
  },

  gotoTeamsPage(e) {
    let teamList = e.currentTarget.dataset.list ?? []
    let teamIdList = teamList.map(team => team.teamId)
    wx.navigateTo({
      url: '/pages/pub/teams/teams?idList=' + teamIdList,
    })
  },

  gotoTeamPage: function(e) {
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

  gotoPlayerPage: function(e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/pub/match/match?id=' + dataset.id,
    })
  },

  gotoEventHallPage: function(e) {
    wx.navigateTo({
      url: './event_hall/event_hall',
    })
  },

  ///////////////////////////////////////////////////////////////////////////////
  // 其它逻辑

  /**
   * 监听搜索框文本
   */
  bindInput: function (e) {
    this.setData({
      searchText: e.detail.value // 更新data中的searchText值为用户输入的内容
    });
    // 这里可以添加你的搜索逻辑，比如根据用户输入的内容进行实时搜索
  },

  /**
   * 监听搜索按钮
   */
  search: function () {
    // 这里添加搜索逻辑，比如发起网络请求或其他操作
    console.log('搜索内容:', this.data.searchText);
    this.gotoSearch();
  },

})