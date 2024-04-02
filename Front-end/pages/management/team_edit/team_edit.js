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
    this.findCaptain();
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
        // 基本数据
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
        // 可以显示失败的提示信息，或者做一些错误处理
      },
      complete() {
        // 无论请求成功还是失败都会执行
        wx.hideLoading(); // 关闭加载提示框
      }
    });
  },

  findCaptain() {
    let captainPlayer = null;
    if (this.data.playerList !== null) {
      for (let i = 0; i < this.data.playerList.length; i++) {
        if (this.data.playerList[i].playerId === this.data.captainId) {
          captainPlayer = this.data.playerList[i];
          break;
        }
      }
    
      if (captainPlayer) {
        this.setData({
          captain: [captainPlayer]
        });
      } else {
        console.log('未找到队长信息');
      }
    }
    console.log('未找到队长信息');
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
        console.log('比赛信息更新成功', res.data);
        // 可以根据后端返回的数据更新页面状态或进行其他操作
      },
      fail: err => {
        // 请求失败的处理逻辑
        console.error('比赛信息更新失败', err);
        // 可以显示失败的提示信息或进行其他操作
      }
    });
  },

  gotoInvitePlayer: function(e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/management/invite_player/invite_player?id=' + dataset.id,
    })
  },
})