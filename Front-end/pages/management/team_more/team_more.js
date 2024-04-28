// pages/management/team_more/team_more.js
const appInstance = getApp()
const URL = appInstance.globalData.URL
const userId = appInstance.globalData.userId

Page({

  /**
   * 页面的初始数据
   */
  data: {
    deleteTeamId: 0,
    teamList: [],
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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
          teamList: res.data,
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

  // 引入模态框的通用方法
  showModal: function (title, content, confirmText, cancelText, confirmCallback, cancelCallback) {
    wx.showModal({
      title: title,
      content: content,
      confirmText: confirmText,
      cancelText: cancelText,
      success(res) {
        if (res.confirm) {
          confirmCallback();
        } else if (res.cancel) {
          cancelCallback();
        }
      }
    });
  },

  // 点击取消比赛按钮，弹出确认取消模态框
  showCancelModal(e) {
    this.setData({
      deleteTeamId: e.currentTarget.dataset.id
    }) 
    this.showModal(
      '确认删除球队',
      '确定要删除这支球队吗？',
      '确认删除',
      '我再想想',
      this.deleteTeam, // 点击确认删除时的回调函数
      () => {} // 点击我再想想时的回调函数，这里不做任何操作
    );
  },

  deleteTeam() {
    // 显示加载提示框，提示用户正在加载
    wx.showLoading({
      title: '加载中',
      mask: true // 创建一个蒙层，防止用户操作
    });
    var that = this;
    // 模拟网络请求
    wx.request({
      url: URL + '/team/delete?id=' + that.data.deleteTeamId,
      method: 'DELETE',
      success(res) {
        console.log("delete team->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
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
  },

  createNewTeam() {
    wx.navigateTo({
      url: '/pages/management/team_new/team_new',
    })
  },

  gotoEditTeam: function(e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/management/team_edit/team_edit?id=' + dataset.id,
    })
  },

})