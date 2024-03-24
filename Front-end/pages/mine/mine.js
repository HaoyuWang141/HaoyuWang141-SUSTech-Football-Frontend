// pages/mine/mine.js
const appInstance = getApp()
const URL = appInstance.globalData.URL
const userId = appInstance.globalData.userId
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    nickName: '',
    playerId: null,
    // 控制比赛通知和球队邀请通知的显示
    showMatchInform: false,
    showInvitationInform: false,
    // 控制红点的显示
    showMatchDot: true, // 假设有新的比赛通知
    showInvitationDot: true, // 假设有新的球队邀请
    invitationinform: [],
    matchinform: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.id)
    this.setData({
      avatarUrl: appInstance.globalData.avatarUrl ?? defaultAvatarUrl,
      nickName: appInstance.globalData.nickName ?? '',
      //id : options.id
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
      url: URL + '/user/getPlayerId', 
      data: {
        userId: userId
      },
      success(res) {
        console.log("playerId->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        this.setData({
          playerId: res.data
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
      url: URL + '/player/team/getInvitations',
      data: {
        playerId: 2,
      },
      success(res) {
        console.log("invitation->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        that.formatInforms(res.data)
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
      url: URL + '/player/match/getAll',
      data: {
        playerId: 2,
      },
      success(res) {
        console.log("match->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        that.formatMatchs(res.data) 
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

  formatInforms: function(invitations) {
    const informs = invitations.map(invitation => {
        const formattedDate = new Date(invitation.lastUpdate).toLocaleString(); // 将时间戳转换为可读日期
        let stadus;
        if (invitation.type == "INVITATION"){
          if (invitation.status == "PENDING"){
            stadus = ""
          }
          else if(invitation.status == "ACCEPTED"){

          }
          else if(invitation.status == "REJECTED"){
  
          }
          return `${invitation.team.name} 邀请您加入，邀请发起时间：${formattedDate}`;
        }else{
          if (invitation.status == "PENDING"){
            stadus = "正在审核中"
          }
          else if(invitation.status == "ACCEPTED"){
            stadus = "已被接受"
          }
          else if(invitation.status == "REJECTED"){
            stadus = "已被拒绝"
          }
          return `$您申请加入${invitation.team.name}${stadus}：${formattedDate}`
        }
      
    });
    this.setData({
      invitationinform: informs
    });
  },

  formatMatchs: function(matchs) {
    const informs = matchs.map(match => {
        const formattedDate = new Date(match.time).toLocaleString(); // 将时间戳转换为可读日期
        return `你在${formattedDate}有一场比赛`;
    });
    this.setData({
      matchinform: informs
    });
  },


  onChooseAvatar(e) {
    const {
      avatarUrl
    } = e.detail
    this.setData({
      avatarUrl: avatarUrl,
    })
    appInstance.globalData.avatarUrl = avatarUrl
    // 或者使用异步方式保存
    wx.setStorage({
      key: 'avatarUrl',
      data: avatarUrl,
      success: function () {
        console.log('用户头像URL已保存到本地存储');
      },
      fail: function (e) {
        console.error('保存用户头像URL到本地存储失败', e);
      }
    });
  },

  // 切换比赛通知的显示状态
  toggleMatchInform: function() {
    this.setData({
      showMatchInform: !this.data.showMatchInform,
      showMatchDot: false
    });
  },

  // 切换球队邀请通知的显示状态
  toggleInvitationInform: function() {
    this.setData({
      showInvitationInform: !this.data.showInvitationInform,
      showInvitationDot: false
    });
  },
})