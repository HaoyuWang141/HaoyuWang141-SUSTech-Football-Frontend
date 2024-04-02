// pages/mine/mine.js
const appInstance = getApp()
const URL = appInstance.globalData.URL
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    nickName: '',
    playerId: null,
    coachId: null,
    refereeId: null, 
    isPlayer: false,
    isCoach: false,
    isReferee: false,
    // 控制比赛通知和球队邀请通知的显示
    showMatchInform: false,
    showInvitationInform: false,
    // 控制红点的显示
    showMatchDot: false, // 假设有新的比赛通知
    showInvitationDot: false, // 假设有新的球队邀请
    showApplicationDot: false,
    invitationInform: [],
    matchInform: [],
    applicationsInform: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      avatarUrl: appInstance.globalData.avatarUrl ?? defaultAvatarUrl,
      nickName: appInstance.globalData.nickName ?? '',
    })
    appInstance.addToRequestQueue(this.fetchData)
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
    appInstance.addToRequestQueue(this.fetchData)
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
    appInstance.addToRequestQueue(this.fetchData)
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
    //Player相关
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
        that.setData({
          isPlayer: true
        })
        //球员身份：比赛信息
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
            that.formatMatchs(res.data);

          },
          fail(err) {
            console.log('请求失败', err);
          },
          complete() {
            wx.hideLoading();
          }
        });
        //球员身份：球队邀请
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
            that.formatInvatitons(res.data)
            that.setData({

            });
          },
          fail(err) {
            console.log('请求失败', err);
          },
          complete() {
            wx.hideLoading();
          }
        });

        //球队申请
        wx.request({
          url: URL + '/player/team/getApplications',
          data: {
            playerId: 2,
          },
          success(res) {
            console.log("application->")
            console.log(res.data)
            if (res.statusCode !== 200) {
              console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
              return
            }
            that.formatApplications(res.data)
          },
          fail(err) {
            console.log('请求失败', err);
          },
          complete() {
            wx.hideLoading();
          }
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

    //教练身份
    wx.request({
      url: URL + '/user/getCoachId',
      data: {
        userId: userId
      },
      success(res) {
        console.log("CoachId->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        that.setData({
          isCoach: true
        })
      },
      fail(err) {
        console.log('请求失败', err);
      },
      complete() {
        wx.hideLoading();
      }
    });

    //裁判身份
    wx.request({
      url: URL + '/user/getRefereeId',
      data: {
        userId: userId
      },
      success(res) {
        console.log("RefereeId->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        that.setData({
          isReferee: true
        })
      },
      fail(err) {
        console.log('请求失败', err);
      },
      complete() {
        wx.hideLoading();
      }
    });

  },
  formatApplications: function(applications){
    const informs = applications.map(application => {
      const formattedDate = (application.lastUpdate != null) ? new Date(application.lastUpdate).toLocaleString() : ''; // 将时间戳转换为可读日期
      let stadus;
      if (application.status == "PENDING"){
        stadus = "正在审核中"
      }
      else if(application.status == "ACCEPTED"){
        stadus = "已被接受"
      }
      else if(application.status == "REJECTED"){
        stadus = "已被拒绝"
      }
      return `您对${application.team.name}（球队）的申请${stadus}：${formattedDate}`
    });
    this.setData({
      applicationInform: informs
    });
  },
  formatInvatitons: function(invitations) {
    const informs = invitations.map(invitation => {
        const formattedDate = (invitation.lastUpdate != null) ? new Date(invitation.lastUpdate).toLocaleString() : '未知';
          if (invitation.status == "PENDING"){
            return `${invitation.team.name} 邀请您加入，邀请发起时间：${formattedDate}`;
          }
          else if(invitation.status == "ACCEPTED"){
          }
          else if(invitation.status == "REJECTED"){
          }
          return null;
    }).filter(inform => inform !== null);
    const dataToUpdate = informs.length > 0 ? { invitationInform: informs, showInvitationDot : true} : { invitationInform: ['您还没有收到任何球队发出的邀请，可以尝试申请加入球队'] };
    this.setData(dataToUpdate);
  },

  formatMatchs: function(matchs) {
    const informs = matchs.map(match => {
      const matchDay = new Date(match.time);
      const nowDay = new Date();
        if (matchDay < nowDay) return null;
        else{
          let differenceInDays = (matchDay - nowDay) / (1000 * 60 * 60 * 24);
          if (differenceInDays <= 14)
          return `你在${matchDay.toLocaleString()}有一场比赛`;
        }
        return null;
    }).filter(inform => inform !== null);
    const dataToUpdate = informs.length > 0 ? { matchInform: informs, showMatchDot : true} : { matchInform: ['您近两星期内没有比赛'] };
  this.setData(dataToUpdate);
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

  toggleApplicationInform: function() {
    this.setData({
      showApplicationInform: !this.data.showApplicationInform,
      showApplicationDot: false
    });
  },
})