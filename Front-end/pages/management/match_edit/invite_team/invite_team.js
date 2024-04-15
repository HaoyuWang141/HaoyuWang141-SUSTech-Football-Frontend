// pages/management/match_new/invite_team/invite_team.js
const appInstance = getApp()
const URL = appInstance.globalData.URL
const userId = appInstance.globalData.userId

Page({

  /**
   * 页面的初始数据
   */
  data: {
    matchId: Number,
    managedTeamList: Array,
    allTeamList: Array,
    homeTeamId: Number,
    awayTeamId: Number,
    activeHomeTeam: -1,
    activeAwayTeam: -1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      matchId: options.id
    })
    console.log('比赛' + this.data.matchId);
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

    wx.request({
      url: URL + '/user/getUserManageTeam',
      data: {
        userId: userId
      },
      success(res) {
        console.log("team->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
       
        // 基本数据
        that.setData({
          managedTeamList: res.data,
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
  
    // 模拟网络请求
    wx.request({
      url: URL + '/team/getAll',
      success(res) {
        console.log("team/getALL->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        // 基本数据
        that.setData({
          allTeamList: res.data,
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

  selectHomeTeam(e){
    let id = e.currentTarget.dataset.item;
    const homeTeamId = e.target.dataset.id;
    this.setData({
      homeTeamId: homeTeamId,
      activeHomeTeam: id,
    })
    console.log('选择主队' + this.data.homeTeamId);
    console.log('activeHomeTeam->' + this.data.activeHomeTeam);
  },

  selectAwayTeam(e){
    let id = e.currentTarget.dataset.item;
    const awayTeamId = e.target.dataset.id;
    this.setData({
      awayTeamId: awayTeamId,
      activeAwayTeam: id,
    })
    console.log('选择客队' + this.data.awayTeamId)
    console.log('activeAwayTeam->' + this.data.activeAwayTeam);
  },

  confirmSelect (){
    wx.request({
      url: URL + '/match/team/invite?matchId=' + this.data.matchId + '&teamId=' + this.data.homeTeamId + '&isHomeTeam=' + Boolean(true),
      method: 'POST',
      success: res => {
        console.log('主队邀请成功', res.data);
        // 获取成功信息并显示在 toast 中
        const successMsg = res.data ? res.data : '已邀请主队'; // 假设后端返回的成功信息在 res.data.message 中
        wx.showToast({
          title: successMsg,
          icon: 'none',
          duration: 2000
        });
      },
      fail: err => {
        console.error('主队邀请失败', err);
        // 显示失败信息
        wx.showToast({
          title: '请求失败，请重试',
          icon: 'none',
          duration: 2000
        });
      }
    });
    var that = this;
    wx.request({
      url: URL + '/match/team/invite?matchId=' + this.data.matchId + '&teamId=' + this.data.awayTeamId + '&isHomeTeam=' + Boolean(false),
      method: 'POST',
      success: res => {
        console.log('客队邀请成功', res.data);
        // 获取成功信息并显示在 toast 中
        const successMsg = res.data ? res.data : '已邀请客队'; // 假设后端返回的成功信息在 res.data.message 中
        wx.showToast({
          title: successMsg,
          icon: 'none',
          duration: 2000
        });
      },
      fail: err => {
        console.error('客队邀请失败', err);
        // 显示失败信息
        wx.showToast({
          title: '请求失败，请重试',
          icon: 'none',
          duration: 2000
        });
      },
      complete() {
        wx.showToast({
          title: '成功邀请',
          icon: 'none',
          duration: 1000
        });
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];
        prevPage.setData({
              homeTeamId: that.data.homeTeamId,
        })
        wx.navigateBack({
              delta: 1,
        })
      }
    });
  },
})