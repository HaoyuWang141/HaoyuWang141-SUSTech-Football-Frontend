// pages/management/team_edit/team_edit.js
const appInstance = getApp()
const URL = appInstance.globalData.URL

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: Number,
    modalHidden: true, // 控制模态框显示隐藏
    newName: String,   // 用于存放用户输入的新队名
    edit: '编辑',
    invitePlayer: { name: '邀请新队员', img: '/assets/newplayer.png' },
    selectCaptain: {name: '选择队长', img: '/assets/newplayer.png'},
    inviteCoach: {name: '邀请教练', img: '/assets/newplayer.png'},
    captain: Array,

    teamId: String,
    name: String,
    logoUrl: String,
    playerList: Array,
    captainId: Number,
    coachList: Array,
    eventList: Array,
    managerList: Array,
    matchList: Array,
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
    wx.showLoading({
      title: '加载中',
      mask: true,
    });
    var that = this;
    wx.request({
      url: URL + '/team/get',
      data: {
        id: id
      },
      success(res) {
        console.log("team->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        that.setData({
          teamId: res.data.teamId,
          name: res.data.name,
          logoUrl: res.data.logoUrl,
          captainId: res.data.captainId,
          coachList: res.data.coachList,
          eventList: res.data.eventList,
          managerList: res.data.managerList,
          matchList: res.data.matchList,
          playerList: res.data.playerList,
        });
      },
      fail(err) {
        console.log('请求失败', err);
      },
      complete() {
        wx.hideLoading();
      }
    });
  },

  fetchCaptain() {
    var that = this;
    // 模拟网络请求
    wx.request({
      url: URL + '/player/get',
      data: {
        id: this.data.captainId
      },
      success(res) {
        console.log("captain->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        // 基本数据
        that.setData({
          captain: res.data
        });
      },
      fail(err) {
        console.log('请求失败', err);
      },
    })
  },

  /**
   * 修改队徽
   */
  changeLogo: function () {
    wx.chooseImage({
      count: 1,
      success: res => {
        const tempFilePaths = res.tempFilePaths;
        this.setData({
          logoUrl: tempFilePaths[0]
        });
      }
    });
  },
 

  /**
   * 修改队名
   */
  // 点击队名触发的事件，显示模态框
  showNameModal: function () {
    this.setData({
      modalHidden: false
    });
  },

  // 输入框内容改变时触发的事件
  changeName: function (e) {
    this.setData({
      newName: e.detail.value
    });
  },

  // 确认更改队名时触发的事件
  confirmChangeName: function () {
    // 这里可以添加逻辑，如检查输入是否合法等
    this.setData({
      name: this.data.newName,
      modalHidden: true
    });
  },

  // 取消更改队名时触发的事件
  cancelChangeName: function () {
    this.setData({
      modalHidden: true
    });
  },

  // 管理队员
  managePlayer() {

  },

  manageCoach() {

  },
  
  manageCaptain() {

  },

  confirmEdit() {
    // 构造要发送给后端的数据
    const dataToUpdate = {
      teamId: this.data.teamId,
      name: this.data.name,
      logoUrl: this.data.logoUrl,
      playerList: this.data.playerList,
      captainId: this.data.captainId,
      coachList: this.data.coachList,
      eventList: this.data.eventList,
      managerList: this.data.managerList,
      matchList: this.data.matchList,
    };
  
    // 发送请求到后端接口
    wx.request({
      url: URL + '/team/update', // 后端接口地址
      method: 'PUT', // 请求方法
      data: dataToUpdate, // 要发送的数据
      success: res => {
        // 请求成功的处理逻辑
        console.log('球队信息更新成功', res.data);
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
        console.error('球队信息更新失败', err);
        // 显示失败信息
        wx.showToast({
          title: '修改失败，请重试',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  gotoInvitePlayer: function(e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/management/invite_player/invite_player?id=' + dataset.id,
    })
  },

  gotoSelectCaptain: function(e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/management/team_edit/select_captain/select_captain?id=' + dataset.id,
    })
  },

  gotoInviteCoach: function(e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/management/team_edit/invite_coach/invite_coach?id=' + dataset.id,
    })
  },
})