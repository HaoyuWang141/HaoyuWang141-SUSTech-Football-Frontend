// pages/management/event_edit/match_new/match_new.js
const appInstance = getApp()
const URL = appInstance.globalData.URL
const {
  formatTime,
  splitDateTime
} = require("../../../../utils/timeFormatter")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    eventId: 0,
    dateTime: '',
    date: '',
    time: '',
    stage: '',
    tag: '',
    stageList: [],
    stageNameList: [],
    tagNameList: [],
    tempHomeTeamId: 0,
    tempAwayTeamId: 0,
    homeTeamId: 0,
    awayTeamId: 0,
    homeTeamName: "主队",
    awayTeamName: "客队",
    homeTeamLogoUrl: '/assets/newplayer.png',
    awayTeamLogoUrl: '/assets/newplayer.png',
    hasBegun: false,
    modalHidden: true, // 控制模态框显示隐藏
    array: [
      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('matchnew')
    const now = new Date();
    console.log(now);
    let strTimeInfo = formatTime(now)
    let {
      strDate,
      strTime
    } = splitDateTime(strTimeInfo)
    console.log("strdate->")
    console.log(strDate)
    console.log(strTime)
    this.setData({
      eventId: options.id,
      date: strDate,
      time: strTime,
    })
    this.fetchData();
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
    this.fetchData();
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
    this.fetchData();
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

  fetchData: function () {
    // 显示加载提示框，提示用户正在加载
    wx.showLoading({
      title: '加载中',
      mask: true // 创建一个蒙层，防止用户操作
    });
    var that = this;
    // 模拟网络请求
    wx.request({
      url: URL + '/event/get?id=' + that.data.eventId,
      success(res) {
        console.log("event->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        // 将 stageList 中的每个 stageName 提取出来存储到 stageNameList 中
        const stageNameList = res.data.stageList.map(stage => stage.stageName);
        console.log("stageNameList->");
        console.log(stageNameList);
        // 基本数据
        that.setData({
          stageList: res.data.stageList,
          stageNameList: stageNameList
        });
        console.log('stageList->');
        console.log(that.data.stageList);
        if (that.data.stageList.length === 1) {
          const tagNameList = that.data.stageList[0].tags.map(tag => tag.tagName);
          that.setData({
            stage: stageNameList[0],
            tagNameList: tagNameList
          })
        }
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

    if (this.data.tempHomeTeamId !== 0) {
      console.log('homeTeamId');
      console.log(that.data.tempHomeTeamId);
      wx.request({
        url: URL + '/team/get?id=' + that.data.tempHomeTeamId,
        success(res) {
          console.log("homeTeam->")
          console.log(res.data)
          if (res.statusCode !== 200) {
            console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
            return
          }
          // 基本数据
          that.setData({
            homeTeamId: res.data.teamId,
            homeTeamName: res.data.name,
            homeTeamLogoUrl: res.data.logoUrl,
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
    }

    if (this.data.tempAwayTeamId !== 0) {
      console.log('awayTeamId');
      console.log(that.data.tempAwayTeamId)
      wx.request({
        url: URL + '/team/get?id=' + that.data.tempAwayTeamId,
        success(res) {
          console.log("awayTeam->")
          console.log(res.data)
          if (res.statusCode !== 200) {
            console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
            return
          }
          // 基本数据
          that.setData({
            awayTeamId: res.data.teamId,
            awayTeamName: res.data.name,
            awayTeamLogoUrl: res.data.logoUrl,
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
    }
  },

  // 处理日期选择器选择完成事件
  bindDateChange: function (e) {
    // 更新页面上的日期显示
    this.setData({
      date: e.detail.value
    });
  },

  // 处理时间选择器选择完成事件
  bindTimeChange: function (e) {
    // 更新页面上的时间显示
    this.setData({
      time: e.detail.value
    });
  },

  bindStageChange: function (e) {
    // 更新页面上的比赛阶段显示
    const selectedStage = this.data.stageList.find(stage => stage.stageName === this.data.stageNameList[e.detail.value]);
    const tagNameList = selectedStage.tags.map(tag => tag.tagName);
    this.setData({
      stage: this.data.stageNameList[e.detail.value],
      tag: "",
      tagNameList: tagNameList,
    });
  },

  bindTagChange: function (e) {
    // 更新页面上的比赛组别显示
    this.setData({
      tag: this.data.tagNameList[e.detail.value],
    });
  },

  // 点击确认修改按钮，弹出确认修改模态框
  showConfirmModal() {
    var that = this
    wx.showModal({
      title: '确认创建',
      content: '确定要创建比赛吗？',
      confirmText: '确认',
      cancelText: '取消',
      success(res) {
        if (res.confirm) {
          that.confirmCreate() // 点击确认时的回调函数
        } else if (res.cancel) {
          () => {} // 点击取消时的回调函数，这里不做任何操作
        }
      }
    })
  },

  // 处理提交信息修改
  confirmCreate: function () {
    var that = this;
    let sqlTimestamp = this.data.date + ' ' + this.data.time + ":00.000"; // 转换为 ISO 
    that.setData({
      dateTime: sqlTimestamp,
    });
    wx.showLoading({
      title: '正在创建',
      mask: true,
    })
    // 发送请求到后端接口
    wx.request({
      url: URL + '/event/match/add?eventId=' + that.data.eventId + "&stage=" + that.data.stage + "&tag=" + that.data.tag + "&time=" + that.data.dateTime + "&homeTeamId=" + that.data.homeTeamId + "&awayTeamId=" + that.data.awayTeamId, // 后端接口地址
      method: 'POST', // 请求方法
      success: res => {
        wx.hideLoading()
        console.log("event_edit=>match_new page: confirmCreate ->")
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          wx.showToast({
            title: '创建失败，请重试',
            icon: 'error',
          });
          return
        }
        console.log('赛事比赛创建成功');
        const successMsg = res.data ? res.data : '创建成功';
        wx.navigateBack({
          success: () => {
            setTimeout(() => {
              wx.showToast({
                title: "创建成功",
                icon: "success",
              })
            }, 500)
          }
        })
      },
      fail: err => {
        wx.hideLoading()
        console.error('赛事比赛创建失败', err);
        wx.showToast({
          title: '创建失败，请重试',
          icon: 'error',
        });
      },
    });
  },

  inviteHomeTeam: function (e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/management/invite/invite?id=' + dataset.id + '&type=' + 'hometeam-event-match',
    })
  },

  inviteAwayTeam: function (e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/management/invite/invite?id=' + dataset.id + '&type=' + 'awayteam-event-match',
    })
  },

})