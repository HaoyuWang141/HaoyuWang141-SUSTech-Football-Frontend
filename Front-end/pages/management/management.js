// pages/management/management.js
const appInstance = getApp()
const URL = appInstance.globalData.URL
const userId = appInstance.globalData.userId
const {
  formatTime
} = require("../../utils/timeFormatter")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    teams: [],
    matches: [],
    events: [],
    newEvent: { id: 'id', icon: '/assets/newplayer.png', name: '创建赛事'},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchData(userId);
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
    this.fetchData(userId);
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
    this.fetchData(userId);
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

  fetchData: function (userId) {
    // 显示加载提示框，提示用户正在加载
    wx.showLoading({
      title: '加载中',
      mask: true // 创建一个蒙层，防止用户操作
    });

    var that = this;
    // 模拟网络请求
    wx.request({
      url: URL + '/user/getUserManageTeam?userId=' + userId,
      success(res) {
        console.log("team->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
       
        // 基本数据
        that.setData({
          teams: res.data,
        });
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

    wx.request({
      url: URL + '/user/getUserManageMatch?userId=' + userId,
      success(res) {
        console.log("match->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        let matchList = res.data ?? []
        for (let match of matchList) {
          let date = new Date(match.time)
          match.strTime = formatTime(date)
          match.hasBegun = match.status == 'PENDING' ? false : true
        }
        that.setData({
          matches: matchList,
        });
        console.log('matches->');
        console.log(that.data.matches);

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

    wx.request({
      url: URL + '/user/getUserManageEvent?userId=' + userId,
      success(res) {
        console.log("event->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        // 基本数据
        that.setData({
          events: res.data,
        });
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

  gotoMatches: function(e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/management/match_more/match_more?id=' + dataset.id,
    })
  },

  gotoTeams: function(e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/management/team_more/team_more?id=' + dataset.id,
    })
  },

  gotoTeamPage: function(e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/pub/team/team?id=' + dataset.id,
    })
  },

  // gotoEditTeam: function(e) {
  //   const dataset = e.currentTarget.dataset
  //   wx.navigateTo({
  //     url: '/pages/management/team_edit/team_edit?id=' + dataset.id,
  //   })
  // },

  gotoEditMatch: function(e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/management/match_edit/match_edit?id=' + dataset.id,
    })
  },

  gotoEditEvent: function(e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/management/event_edit/event_edit?id=' + dataset.id,
    })
  },

  gotoNewEvent() {
    wx.navigateTo({
      url: '/pages/management/event_new/event_new',
    })
  },

})

