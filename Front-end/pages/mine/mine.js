// pages/mine/mine.js
const appInstance = getApp()
const URL = appInstance.globalData.URL
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: Number,
    avatarUrl: defaultAvatarUrl,
    nickName: '',
    playerId: null,
    coachId: null,
    refereeId: null,

    isPlayer: false,
    isCoach: false,
    isReferee: false,
    // 控制比赛通知和球队邀请通知的显示
    showPlayerMatchInform: false,
    showCoachMatchInform: false,
    showRefereeMatchInform: false,

    showPlayerInvitationInform: false,
    showCoachInvitationInform: false,
    showRefereeInvitationInformForMatch: false,
    showRefereeInvitationInformForEvent: false,

    // 控制红点的显示
    showPlayerMatchDot: false, // 假设有新的比赛通知
    showCoachMatchDot: false,
    showRefereeMatchDot: false,
    showPlayerInvitationDot: false, // 假设有新的球队邀请
    showCoachInvitationDot: false,
    showRefereeInvitationDotForMatch: false,
    showRefereeInvitationDotForEvent: false,

    showApplicationDot: false,
    playerInvitationInform: [],
    coachInvitationInform: [],
    refereeInvitationInformForMatch: [],
    refereeInvitationInformForEvent: [],
    playerMatchInform: [],
    coachMatchInform: [],
    refereeMatchInform: [],
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
    appInstance.addToRequestQueue(this.fetchUserId)
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

  // ------------------
  // fetch data

  fetchUserId(userId) {
    const that = this
    that.setData({
      userId
    })
  },

  // 根据userId获取本页面全部数据
  fetchData: function (userId) {

    const that = this

    //Player相关
    that.fetchPlayerId(userId)

    //教练身份
    that.fetchCoachId(userId)

    //裁判身份
    that.fetchRefereeId(userId)

  },

  // ------------------
  // fetch data: player

  fetchPlayerId(userId) {
    const that = this
    wx.request({
      url: URL + '/user/getPlayerId',
      data: {
        userId: userId
      },
      success(res) {
        console.log("mine page: playerId->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        let playerId = res.data;
        that.setData({
          isPlayer: true,
          playerId: res.data
        })

        //球员身份：比赛信息
        that.fetchPlayerMatches(playerId)

        //球员身份：球队邀请
        that.fetchPlayerTeamInvitations(playerId)

        //球员身份：球队申请
        that.fetchPlayerTeamApplications(playerId)
      },
      fail(err) {
        console.log('请求失败', err);
      },
      complete() {}
    });
  },

  fetchPlayerMatches(playerId) {
    const that = this
    wx.request({
      url: URL + '/player/match/getAll',
      data: {
        playerId: playerId,
      },
      success(res) {
        console.log("mine page: fetch Player Matches->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        that.formatPlayerMatches(res.data);
      },
      fail(err) {
        console.log('请求失败', err);
      },
      complete() {}
    });
  },

  fetchPlayerTeamInvitations(playerId) {
    const that = this
    wx.request({
      url: URL + '/player/team/getInvitations',
      data: {
        playerId: playerId,
      },
      success(res) {
        console.log("mine page: fetch Player Team Invitations->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        that.formatPlayerInvitations(res.data)
      },
      fail(err) {
        console.log('请求失败', err);
      },
      complete() {}
    });
  },

  fetchPlayerTeamApplications(playerId) {
    const that = this
    wx.request({
      url: URL + '/player/team/getApplications',
      data: {
        playerId: playerId,
      },
      success(res) {
        console.log("mine page: fetch Player Team Applications->")
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
      complete() {}
    });
  },

  // ------------------
  // fetch data: coach

  fetchCoachId(userId) {
    const that = this
    wx.request({
      url: URL + '/user/getCoachId',
      data: {
        userId: userId
      },
      success(res) {
        console.log("mine page: CoachId->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        let coachId = res.data;
        that.setData({
          isCoach: true,
          coachId: coachId,
        })

        that.fetchCoachMatches(coachId)
        that.fetchCoachInvitations(coachId)
      },
      fail(err) {
        console.log('请求失败', err);
      },
      complete() {}
    });
  },

  fetchCoachMatches(coachId) {
    const that = this
    wx.request({
      url: URL + '/coach/match/getAll',
      data: {
        coachId: coachId,
      },
      success(res) {
        console.log("mine page: fetch Coach Matches->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        that.formatCoachMatches(res.data);
      },
      fail(err) {
        console.log('请求失败', err);
      },
      complete() {}
    });
  },

  fetchCoachInvitations(coachId) {
    const that = this
    wx.request({
      url: URL + '/coach/team/getInvitations',
      data: {
        coachId: coachId,
      },
      success(res) {
        console.log("mine page: fetch Coach Invitations->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        that.formatCoachInvitations(res.data);
      },
      fail(err) {
        console.log('请求失败', err);
      },
      complete() {}
    });
  },

  // ------------------
  // fetch data: referee

  fetchRefereeId(userId) {
    const that = this
    wx.request({
      url: URL + '/user/getRefereeId',
      data: {
        userId: userId
      },
      success(res) {
        console.log("mine page: RefereeId->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        let refereeId = res.data
        that.setData({
          isReferee: true,
          refereeId: refereeId
        })

        that.fetchRefereeMatches(refereeId)
        that.fetchRefereeInvitationsForMatch(refereeId)
        that.fetchRefereeInvitationsForEvent(refereeId)

      },
      fail(err) {
        console.log('请求失败', err);
      },
      complete() {}
    });
  },

  fetchRefereeMatches(refereeId) {
    const that = this
    wx.request({
      url: URL + '/referee/match/getAll',
      data: {
        refereeId: refereeId,
      },
      success(res) {
        console.log("mine page: fetch Referee Match->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        that.formatRefereeMatches(res.data);
      },
      fail(err) {
        console.log('请求失败', err);
      },
      complete() {}
    });
  },

  fetchRefereeInvitationsForMatch(refereeId) {
    const that = this
    wx.request({
      url: URL + '/referee/match/getInvitations',
      data: {
        refereeId: refereeId,
      },
      success(res) {
        console.log("mine page: fetch Referee Invitations For Match->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.error("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        that.formatRefereeInvitationsForMatch(res.data);
      },
      fail(err) {
        console.log('请求失败', err);
      },
      complete() {}
    });
  },

  fetchRefereeInvitationsForEvent(refereeId) {
    const that = this
    wx.request({
      url: URL + '/referee/event/getInvitations',
      data: {
        refereeId: refereeId,
      },
      success(res) {
        console.log("mine page: fetch Referee Invitations For Event->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        that.formatRefereeInvitationsForEvent(res.data);
      },
      fail(err) {
        console.log('请求失败', err);
      },
      complete() {}
    });
  },

  // ------------------
  // format applications

  formatApplications: function (applications) {
    const informs = applications.map(application => {
      const formattedDate = (application.lastUpdated != null) ? new Date(application.lastUpdated).toLocaleString() : ''; // 将时间戳转换为可读日期
      let stadus;
      if (application.status == "PENDING") {
        stadus = "正在审核中"
      } else if (application.status == "ACCEPTED") {
        stadus = "已被接受"
      } else if (application.status == "REJECTED") {
        stadus = "已被拒绝"
      }
      return `您对${application.team.name}（球队）的申请${stadus}：${formattedDate}`
    });
    this.setData({
      applicationInform: informs
    });
  },

  // ------------------
  // format invitations

  formatRefereeInvitationsForMatch: function (invitations) {
    const informs = invitations.map(invitation => {
      const formattedDate = (invitation.lastUpdated != null) ? new Date(invitation.lastUpdated).toLocaleString() : '未知';
      let matchTime = new Date(invitation.match.time).toLocaleString();
      if (invitation.status == "PENDING") {
        return `邀请您执法${invitation.match.homeTeam.name}对阵${invitation.match.awayTeam.name}，比赛时间为${matchTime}, 邀请发起时间：${formattedDate}`;
      } else if (invitation.status == "ACCEPTED") {

      } else if (invitation.status == "REJECTED") {

      }
      return null;
    }).filter(inform => inform !== null);
    let showDot = informs.length > 0 ? true : false;
    this.setData({
      refereeInvitationInformForMatch: informs,
      showRefereeInvitationDotForMatch: showDot,
    });
  },

  formatRefereeInvitationsForEvent: function (invitations) {
    const informs = invitations.map(invitation => {
      const formattedDate = (invitation.lastUpdated != null) ? new Date(invitation.lastUpdated).toLocaleString() : '未知';
      if (invitation.status == "PENDING") {
        return `邀请您执法赛事：${invitation.event.name}, 邀请发起时间：${formattedDate}`;
      } else if (invitation.status == "ACCEPTED") {} else if (invitation.status == "REJECTED") {}
      return null;
    }).filter(inform => inform !== null);
    let showDot = informs.length > 0 ? true : false;
    this.setData({
      refereeInvitationInformForEvent: informs,
      showRefereeInvitationDotForEvent: showDot
    });
  },

  formatCoachInvitations: function (invitations) {
    const informs = invitations.map(invitation => {
      const formattedDate = (invitation.lastUpdated != null) ? new Date(invitation.lastUpdated).toLocaleString() : '未知';
      if (invitation.status == "PENDING") {
        return `${invitation.team.name} 邀请您以教练的身份加入，邀请发起时间：${formattedDate}`;
      } else if (invitation.status == "ACCEPTED") {} else if (invitation.status == "REJECTED") {}
      return null;
    }).filter(inform => inform !== null);
    let showDot = informs.length > 0 ? true : false;
    this.setData({
      coachInvitationInform: informs,
      showCoachInvitationDot: showDot
    });
  },

  formatPlayerInvitations: function (invitations) {
    let that = this
    const informs = invitations.map(invitation => {
      const formattedDate = (invitation.lastUpdated != null) ? new Date(invitation.lastUpdated).toLocaleString() : '未知';
      if (invitation.status == "PENDING") {
        return `${invitation.team.name} 邀请您加入，邀请发起时间：${formattedDate}`;
      } else if (invitation.status == "ACCEPTED") {} else if (invitation.status == "REJECTED") {}
      return null;
    }).filter(inform => inform !== null);
    let showDot = informs.length > 0 ? true : false;
    that.setData({
      playerInvitationInform: informs,
      showPlayerInvitationDot: showDot
    });
  },

  // ------------------
  // format matches

  formatPlayerMatches: function (matches) {
    const informs = matches.map(match => {
      const matchDay = new Date(match.time);
      const nowDay = new Date();
      if (matchDay < nowDay) return null;
      else {
        let differenceInDays = (matchDay - nowDay) / (1000 * 60 * 60 * 24);
        if (differenceInDays <= 14)
          return `你在${matchDay.toLocaleString()}有一场比赛`;
      }
      return null;
    }).filter(inform => inform !== null);
    const dataToUpdate = informs.length > 0 ? {
      playerMatchInform: informs,
      showPlayerMatchDot: true
    } : {
      playerMatchInform: ['您近两星期内没有比赛']
    };
    this.setData(dataToUpdate);
  },

  formatCoachMatches: function (matches) {
    const informs = matches.map(match => {
      const matchDay = new Date(match.time);
      const nowDay = new Date();
      if (matchDay < nowDay) return null;
      else {
        let differenceInDays = (matchDay - nowDay) / (1000 * 60 * 60 * 24);
        if (differenceInDays <= 14)
          return `你在${matchDay.toLocaleString()}有一场比赛`;
      }
      return null;
    }).filter(inform => inform !== null);
    const dataToUpdate = informs.length > 0 ? {
      coahcMatchInform: informs,
      showCoachMatchDot: true
    } : {
      coachMatchInform: ['您近两星期内没有比赛']
    };
    this.setData(dataToUpdate);
  },

  formatRefereeMatches: function (matches) {
    const informs = matches.map(match => {
      const matchDay = new Date(match.time);
      const nowDay = new Date();
      if (matchDay < nowDay) return null;
      else {
        let differenceInDays = (matchDay - nowDay) / (1000 * 60 * 60 * 24);
        if (differenceInDays <= 14)
          return `你在${matchDay.toLocaleString()}有一场比赛`;
      }
      return null;
    }).filter(inform => inform !== null);
    const dataToUpdate = informs.length > 0 ? {
      refereeMatchInform: informs,
      showRefereeMatchDot: true
    } : {
      refereeMatchInform: ['您近两星期内没有比赛']
    };
    this.setData(dataToUpdate);
  },

  // ------------------

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

  // ------------------
  // 切换比赛通知的显示状态

  togglePlayerMatchInform: function () {
    this.setData({
      showPlayerMatchInform: !this.data.showPlayerMatchInform,
      showPlayerMatchDot: false
    });
  },

  toggleCoachMatchInform: function () {
    this.setData({
      showCoachMatchInform: !this.data.showCoachMatchInform,
      showCoachMatchDot: false
    });
  },

  toggleRefereeMatchInform: function () {
    this.setData({
      showRefereeMatchInform: !this.data.showRefereeMatchInform,
      showRefereeMatchDot: false
    });
  },

  // ------------------
  // 切换球队邀请通知的显示状态

  togglePlayerInvitationInform: function () {
    this.setData({
      showPlayerInvitationInform: !this.data.showPlayerInvitationInform,
      showPlayerInvitationDot: false
    });
  },

  toggleCoachInvitationInform: function () {
    this.setData({
      showCoachInvitationInform: !this.data.showCoachInvitationInform,
      showCoachInvitationDot: false
    });
  },

  toggleRefereeInvitationInformForMatch: function () {
    this.setData({
      showRefereeInvitationInformForMatch: !this.data.showRefereeInvitationInformForMatch,
      showRefereeInvitationDotForMatch: false
    });
  },

  toggleRefereeInvitationInformForEvent: function () {
    this.setData({
      showRefereeInvitationInformForEvent: !this.data.showRefereeInvitationInformForEvent,
      showRefereeInvitationDotForEvent: false
    });
  },

  // ------------------
  // 切换申请加入球队通知的显示状态

  toggleApplicationInform: function () {
    this.setData({
      showApplicationInform: !this.data.showApplicationInform,
      showApplicationDot: false
    });
  },
})