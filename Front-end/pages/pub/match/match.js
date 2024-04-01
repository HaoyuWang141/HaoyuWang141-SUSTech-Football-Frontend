// pages/pub/match/match.js
const appInstance = getApp()
const URL = appInstance.globalData.URL
const userId = appInstance.globalData.userId
const {
  formatTime
} = require("../../../utils/timeFormatter")

Page({
  data: {
    activeIndex: 0,
    id: -1,

    actions: Array,
    awayTeam: {
      logoUrl: "",
      name: "",
      penalty: -1,
      players: [],
      score: -1,
      teamId: -1,
    },
    event: {
      eventId: Number,
      eventName: String,
      stage: String,
      tag: String,
    },
    homeTeam: {
      logoUrl: "",
      name: "",
      penalty: -1,
      players: [],
      score: -1,
      teamId: -1,
    },
    managerList: Array,
    refereeList: Array,
    status: "PENDING",
    time: new Date(),

    strTime: '',
    hasBegun: false,

    liveList: [],
    videoList: [],

    description: "",

    isFavorite: Boolean,

    refereeId: -1,
    isReferee: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id,
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
    this.fetchData(this.data.id)
    this.isFavorite(userId, this.data.id)
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
    this.fetchData(options.id)
    this.isFavorite(userId, options.id)
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

  // 获取比赛数据
  fetchData: function (id) {
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
      success: async function (res) {
        console.log("match->")
        if (res.statusCode != 200) {
          console.error("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        console.log(res.data)

        let date = new Date(res.data.time)
        let strTime = formatTime(date)
        let hasBegun = res.data.status != "PENDING"
        that.setData({
          actions: res.data.actions,
          awayTeam: res.data.awayTeam,
          event: res.data.event,
          homeTeam: res.data.homeTeam,
          managerList: res.data.managerList,
          refereeList: res.data.refereeList,
          status: res.data.status,
          time: res.data.time,
          hasBegun: hasBegun,
          strTime: strTime,
        })

        let refereeList = res.data.refereeList
        if (refereeList.length > 0) {
          try {
            const refereeId = await that.fetchRefereeId(userId)
            if (refereeList.includes(refereeId)) {
              that.setData({
                isReferee: true,
              })
            }
          } catch (error) {
            console.error(error)
          }
        }
      },
      fail(err) {
        console.error('请求失败：', err.statusCode, err.errMsg);
      },
      complete() {
        wx.hideLoading();
      }
    })
  },

  // 点击不同tab时调用
  switchTab: function (e) {
    const tabIndex = e.currentTarget.dataset.index;
    if (this.data.activeIndex != tabIndex) {
      this.loadTabData(tabIndex);
    }
    this.setData({
      activeIndex: tabIndex
    })
  },

  // 加载tab内信息时调用
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

  // 页面跳转
  goToLiveOrVideo: function (e) {
    const url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: '/pages/pub/live/live?url=' + url,
    })
  },

  // 获取用户是否关注该比赛
  isFavorite(userId, id) {
    let that = this
    wx.request({
      url: URL + '/isFavorite',
      data: {
        userId: userId,
        type: "match",
        id: id,
      },
      success(res) {
        console.log("match page: isFavorite->")
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        that.setData({
          favorited: res.data
        })
      }
    })
  },

  // 关注比赛
  favorite() {
    let that = this
    wx.showLoading({
      title: '收藏中',
      mask: true,
    })
    wx.request({
      url: URL + '/favorite?type=match&userId=' + userId + '&id=' + that.data.id,
      method: "POST",
      success(res) {
        console.log("match page: favorite->")
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        console.log("收藏成功")
        that.setData({
          favorited: true,
        })
      },
      complete() {
        wx.hideLoading()
      }
    })
  },

  // 取消关注
  unfavorite() {
    let that = this
    wx.showLoading({
      title: '取消收藏中',
      mask: true,
    })
    wx.request({
      url: URL + '/unfavorite?type=match&userId=' + userId + '&id=' + that.data.id,
      method: "POST",
      success(res) {
        console.log("match page: unfavorite->")
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        console.log("取消收藏成功")
        that.setData({
          favorited: false
        })
      },
      complete() {
        wx.hideLoading()
      }
    })
  },

  // 获取user的refereeId
  fetchRefereeId(userId) {
    let that = this
    return new Promise((resolve, reject) => {
      wx.request({
        url: URL + '/user/getRefereeId',
        data: {
          userId: userId,
        },
        success(res) {
          console.log("match referee page: fetchRefereeId ->")
          if (res.statusCode == 404) {
            reject(new Error("用户未注册为裁判"))
          }
          if (res.statusCode != 200) {
            reject(new Error("fetchRefereeId 失败"))
          }
          console.log(res.data)
          that.setData({
            refereeId: res.data,
          })
          resolve(res.data)
        },
        fail(err) {
          reject(new Error("fetchRefereeId 失败"))
        },
      })
    })

  },

  // 跳转至裁判页面
  gotoMatchRefereePage() {
    wx.navigateTo({
      url: './match_referee/match_referee?matchId=' + this.data.id + '&refereeId=' + this.data.refereeId,
    })
  },
})