// pages/management/event_edit/event_edit.js
const appInstance = getApp()
const URL = appInstance.globalData.URL

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: Number,
    icon: '/assets/cup.svg',    
    modalHiddenEname: true, // 控制模态框显示隐藏
    modalHiddenEdes: true,

    eventId: Number,
    name: String,
    description: String,
    teamList: Array,
    matchList: Array,
    groupList: Array,
    managerList: Array,
    stageList: Array,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.id)
    this.setData({
      id: options.id
    })
    this.fetchData(options.id);
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
    this.fetchData(this.data.id);
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
    this.fetchData(this.data.id);
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

  fetchData: function (id) {
    // 显示加载提示框，提示用户正在加载
    wx.showLoading({
      title: '加载中',
      mask: true // 创建一个蒙层，防止用户操作
    });

    var that = this;
    // 模拟网络请求
    wx.request({
      url: URL + '/event/get',
      data: {
        id: id
      },
      success(res) {
        console.log("event->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        // 基本数据
        that.setData({
          eventId: res.data.eventId,
          name: res.data.name,
          description: res.data.description,
          teamList: res.data.teamList,
          matchList: res.data.matchList,
          groupList: res.data.groupList,
          managerList: res.data.managerList,
          stageList: res.data.stageList,
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

  // 显示赛事名称输入弹窗
  showNameInput: function () {
    this.setData({
      modalHiddenEname: false
    });
  },

  changename: function (e) {
    this.setData({
      newname: e.detail.value
    });
  },

  // 确认更改队名时触发的事件
  confirmChangeEventname: function () {
    // 这里可以添加逻辑，如检查输入是否合法等
    this.setData({
      name: this.data.newname,
      modalHiddenEname: true
    });
  },

  // 取消更改队名时触发的事件
  cancelChangeEventname: function () {
    this.setData({
      modalHiddenEname: true
    });
  },

  showDesInput: function () {
    this.setData({
      modalHiddenEdes: false
    });
  },

  changedes: function (e) {
    this.setData({
      newdes: e.detail.value
    });
  },

  // 确认更改队名时触发的事件
  confirmChangeEventdes: function () {
    // 这里可以添加逻辑，如检查输入是否合法等
    this.setData({
      description: this.data.newdes,
      modalHiddenEdes: true
    });
  },

  // 取消更改队名时触发的事件
  cancelChangeEventdes: function () {
    this.setData({
      modalHiddenEdes: true
    });
  },

  inviteNewTeam() {

  },

  createNewMatch() {
    
  },

  // 处理提交信息修改
  confirmEdit() {
    // 构造要发送给后端的数据
    const dataToUpdate = {
      eventId: this.data.eventId,
      name: this.data.name,
      description: this.data.description,
      teamList: this.data.teamList,
      matchList: this.data.matchList,
      groupList: this.data.groupList,
      managerList: this.data.managerList,
      stageList: this.data.stageList,
    };
  
    // 发送请求到后端接口
    wx.request({
      url: URL + '/event/update', // 后端接口地址
      method: 'PUT', // 请求方法
      data: dataToUpdate, // 要发送的数据
      success: res => {
        // 请求成功的处理逻辑
        console.log('赛事信息更新成功', res.data);
        // 获取成功信息并显示在 toast 中
        const successMsg = res.data ? res.data : '修改成功'; // 假设后端返回的成功信息在 res.data.message 中
        wx.showToast({
          title: successMsg,
          icon: 'none',
          duration: 2000
        });
      },
      fail: err => {
        // 请求失败的处理逻辑
        console.error('赛事信息更新失败', err);
        // 显示失败信息
        wx.showToast({
          title: '修改失败，请重试',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  gotoTeamPage: function(e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/pub/team/team?id=' + dataset.id,
    })
  },

  gotoMatchPage: function(e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/pub/match/match?id=' + dataset.id,
    })
  },

  gotoTeams: function(e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/management/event_edit/event_teams/event_teams?id=' + dataset.id,
    })
  },

  gotoMatches: function(e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/management/event_edit/event_matches/event_matches?id=' + dataset.id,
    })
  }

})