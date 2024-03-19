// pages/pub/match/match.js
const appInstance = getApp()
const URL = appInstance.globalData.URL
const {formatTime} = require("../../../utils/timeFormatter")

Page({
  data: {
    activeIndex: 0,
    id: -1,
    event: '友谊赛',
    stage: String,
    tag: String,

    homeTeam: {
      teamId: -1,
      name: "",
      logoUrl: "",
    },
    homeTeamPlayerList: [],
    homeTeamScore: 0,
    homeTeamPenalty: 0,
    awayTeam: {
      teamId: -1,
      name: "",
      logoUrl: "",
    },
    awayTeamPlayerList: [],
    awayTeamScore: 0,
    awayTeamPenalty: 0,
    time: new Date(),
    hasBegun: false,
    strTime: String,
    matchPlayerActionList: Array,
    refereeList: Array,

    liveList: [],
    videoList: [],

    description: "",

    matchEvents: [{name: 'event1'}, {name: 'event2'}],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id,
      event: options.event,
      stage: options.stage,
      tag: options.tag,
    })
    this.fetchData(options.id)
  },

  fetchData: function (id) {
    // 显示加载提示框，提示用户正在加载
    wx.showLoading({
      title: '加载中',
      mask: true
    });

    const that = this
    wx.request({
      url: URL + "/match/get",
      data: {
        id: id,
      },
      success(res) {
        console.log("match->")
        console.log(res.data)

        var date = new Date(res.data.time)
        let strTime = formatTime(date)
        let hasBegun = new Date() > date
        that.setData({
          homeTeam: res.data.homeTeam,
          homeTeamScore: res.data.homeTeamScore,
          homeTeamPenalty: res.data.homeTeamPenalty,
          awayTeam: res.data.awayTeam,
          awayTeamScore: res.data.awayTeamScore,
          awayTeamPenalty: res.data.awayTeamPenalty,
          time: res.data.time,
          hasBegun: hasBegun,
          strTime: strTime,
          matchPlayerActionList: res.data.matchPlayerActionList,
          refereeList: res.data.refereeList,
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
    this.fetchData(this.data.id)
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

  switchTab: function (e) {
    const tabIndex = e.currentTarget.dataset.index;
    if (this.data.activeIndex != tabIndex) {
      this.loadTabData(tabIndex);
    }
    this.setData({
      activeIndex: tabIndex
    })
  },

  loadTabData: function (tabIndex) {
    const that = this
    if (tabIndex == 1) {
      // 显示加载提示框，提示用户正在加载
      wx.request({
        url: URL + '/match/live/getAll',
        data: {
          matchId: that.data.id
        },
        success(res) {
          console.log("live->")
          console.log(res.data)
          that.setData({
            liveList: res.data
          })
        },
        fail(err) {
          console.log("请求失败，错误码为：" + err.statusCode + "；错误信息为：" + err.message)
        }
      })
      wx.request({
        url: URL + '/match/video/getAll',
        data: {
          matchId: that.data.id
        },
        success(res) {
          console.log("video->")
          console.log(res.data)
          that.setData({
            videoList: res.data
          })
        },
        fail(err) {
          console.log("请求失败，错误码为：" + err.statusCode + "；错误信息为：" + err.message)
        }
      })
    }
  },

  goToLiveOrVideo: function (e) {
    const url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: '/pages/pub/live/live?url=' + url,
    })
  }
})