// pages/pub/news/news.js

const appInstance = getApp()
const URL = appInstance.globalData.LOCAL

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    matchId: "",
    event: '书院杯',
    group: 'A组',
    team1: '树德书院',
    team2: '树仁书院',
    icon1: "/assets/shude.png",
    icon2: "/assets/shuren.png",
    score1: '1',
    score2: '1',
    penalty1: '-',
    penalty2: '-',
    time: "2024-2-1 15:00",
    hasBegun: true,
    description: "今日举行了XX比赛，描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述。\n\n描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述。",
    descriptionTime: '2024-2-1 19:00',
    matchEvents: [{name: 'event1'}, {name: 'event2'}],

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
    time: null,
    strTime: String,
    matchPlayerActionList: Array,
    refereeList: Array,

    liveList: [],
    videoList: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
// <<<<<<< HEAD
    this.setData({
        matchId: decodeURIComponent(options.matchId)
    });
// =======
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
        let strTime = that.format(date)
        that.setData({
          homeTeam: res.data.homeTeam,
          homeTeamScore: res.data.homeTeamScore,
          homeTeamPenalty: res.data.homeTeamPenalty,
          awayTeam: res.data.awayTeam,
          awayTeamScore: res.data.awayTeamScore,
          awayTeamPenalty: res.data.awayTeamPenalty,
          time: res.data.time,
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
// >>>>>>> 1cc132dada632cabf065e5965abad0e13abee33d
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
    wx.stopPullDownRefresh()
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

  format: function (date) {
    // 将时间格式化为"yyyy-mm-dd hh:mm"的形式
    var year = date.getFullYear();
    var month = date.getMonth() + 1; // 月份是从0开始的，所以要加1
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();

    // 补零操作
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;

    // 拼接时间字符串
    const strTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
    return strTime
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

})