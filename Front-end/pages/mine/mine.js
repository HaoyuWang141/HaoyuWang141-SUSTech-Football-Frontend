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

    playerId: Number,
    coachId: Number,
    refereeId: Number,
    manageTeamIdList: [],
    manageMatchIdList: [],
    manageEventIdList: [],
    isPlayer: false,
    isCoach: false,
    isReferee: false,
    isTeamManager: false,
    isMatchManager: false,
    isEventManager: false,

    manageTeamNumber: 0,
    manageMatchNumber: 0,
    manageEventNumber: 0,

    // 控制比赛通知和球队邀请通知的显示
    showPlayerMatchInform: false,
    showCoachMatchInform: false,
    showRefereeMatchInform: false,
    showPlayerInvitationInform: false,
    showCoachInvitationInform: false,
    showRefereeInvitationInformForMatch: false,
    showRefereeInvitationInformForEvent: false,
    showManageTeamApplicationInform: false,

    // 控制红点的显示
    showPlayerMatchDot: false,
    showCoachMatchDot: false,
    showRefereeMatchDot: false,
    showPlayerInvitationDot: false,
    showCoachInvitationDot: false,
    showRefereeInvitationDotForMatch: false,
    showRefereeInvitationDotForEvent: false,
    showApplicationDot: false,
    showManageTeamApplicationDot: false,

    playerInvitationInform: [],
    coachInvitationInform: [],
    refereeInvitationInformForMatch: [],
    refereeInvitationInformForEvent: [],
    playerMatchInform: [],
    coachMatchInform: [],
    refereeMatchInform: [],
    applicationsInform: [],
    manageTeamApplicationsInform: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      avatarUrl: appInstance.globalData.avatarUrl ?? defaultAvatarUrl,
      nickName: appInstance.globalData.nickName ?? '',
    })
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
    appInstance.addToRequestQueue(this.fetchUserId)
    this.setData({
      showPlayerMatchInform: false,
      showCoachMatchInform: false,
      showRefereeMatchInform: false,
      showPlayerInvitationInform: false,
      showCoachInvitationInform: false,
      showRefereeInvitationInformForMatch: false,
      showRefereeInvitationInformForEvent: false,
    })
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
    appInstance.addToRequestQueue(this.fetchUserId)
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

    //球队管理员身份
    that.fetchManageTeamList(userId)

    //比赛管理员身份
    that.fetchManageMatchList(userId)

    //赛事管理员身份
    that.fetchManageEventList(userId)
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
        that.fetchCoachTeamInvitations(coachId)
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

  fetchCoachTeamInvitations(coachId) {
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
  // fetch data: manager

  fetchManageTeamList(userId) {
    const that = this
    wx.request({
      url: URL + '/user/getUserManageTeam',
      data: {
        userId: 1
      },
      success(res) {
        console.log("mine page: manageTeam->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        let manageTeamIdList = res.data;
        let manageTeamNumber = res.data.length;
        that.setData({
          isTeamManager: true,
          manageTeamApplicationsInform: [],
          manageTeamIdList: res.data,
          manageTeamNumber: res.data.length
        })
        for (let index = 0; index < manageTeamNumber; index++) {
          const team = manageTeamIdList[index];
          console.log("team->")
          console.log(team.teamId)
          that.fetchManageTeamApplications(team.teamId, team.name);
        }
      },
      fail(err) {
        console.log('请求失败', err);
      },
      complete() {}
    });
  },  

  fetchManageTeamApplications: function (teamId, teamName) {
    const that = this
    wx.request({
      url: URL + '/team/player/getApplications',
      data: {
        teamId: teamId,
      },
      success(res) {
        console.log("mine page: fetch team application->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        that.formatManageTeamApplication(res.data, teamName);
      },
      fail(err) {
        console.log('请求失败', err);
      },
      complete() {}
    });
  },

  fetchManageMatchList(userId) {
    const that = this
    wx.request({
      url: URL + '/user/getUserManageMatch',
      data: {
        userId: 1
      },
      success(res) {
        console.log("mine page: manageMatch->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        that.setData({
          isMatchManager: true,
          manageMatchIdList: res.data,
          manageMatchNumber: res.data.length
        })
      },
      fail(err) {
        console.log('请求失败', err);
      },
      complete() {}
    });
  },  

  fetchManageEventList(userId) {
    const that = this
    wx.request({
      url: URL + '/user/getUserManageEvent',
      data: {
        userId: 1
      },
      success(res) {
        console.log("mine page: manageEvent->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        that.setData({
          isEventManager: true,
          manageEventIdList: res.data,
          manageEventNumber: res.data.length
        })
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
    let showDot = informs.length > 0 ? true : false;
    this.setData({
      applicationInform: informs,
      showApplicationDot: showDot,
    });
  },

  formatManageTeamApplication: function (applications, teamName) {
    const informs = applications.map(application => {
      const formattedDate = (application.lastUpdated != null) ? new Date(application.lastUpdated).toLocaleString() : ''; // 将时间戳转换为可读日期
      if (application.status == "PENDING") {
        return `${application.player.name}（球员）于${formattedDate}对您所管理的球队 ${teamName} (teamId = ${application.teamId})发出了入队申请，请您进行审核`
      }
      return null;
    }).filter(inform => inform !== null);
    let showDot = informs.length > 0 ? true : false;
    this.setData({
      manageTeamApplicationsInform: this.data.manageTeamApplicationsInform.concat(informs),
      showManageTeamApplicationDot: showDot
    });
  },

  // ------------------
  // format invitations

  formatRefereeInvitationsForMatch: function (invitations) {
    const informs = invitations.map(invitation => {
      const formattedDate = (invitation.lastUpdated != null) ? new Date(invitation.lastUpdated).toLocaleString() : '未知';
      let matchTime = new Date(invitation.match.time).toLocaleString();
      if (invitation.status == "PENDING") {
        return {
          content: `邀请您执法${invitation.match.homeTeam.name}对阵${invitation.match.awayTeam.name}，比赛时间为${matchTime}, 邀请发起时间：${formattedDate}`,
          id: invitation.match.matchId,
        };
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
        return {
          content: `邀请您执法赛事：${invitation.event.name}, 邀请发起时间：${formattedDate}`,
          id: invitation.event.eventId,
        };
      } else if (invitation.status == "ACCEPTED") {

      } else if (invitation.status == "REJECTED") {

      }
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
        return {
          content: `${invitation.team.name} 邀请您执教球队，邀请发起时间：${formattedDate}`,
          id: invitation.team.teamId,
        };
      } else if (invitation.status == "ACCEPTED") {

      } else if (invitation.status == "REJECTED") {

      }
      return null;
    }).filter(inform => inform !== null);
    let showDot = informs.length > 0 ? true : false;
    this.setData({
      coachInvitationInform: informs,
      showCoachInvitationDot: showDot
    });
  },

  formatPlayerInvitations: function (invitations) {
    const that = this
    const informs = invitations.map(invitation => {
      const formattedDate = (invitation.lastUpdated != null) ? new Date(invitation.lastUpdated).toLocaleString() : '未知';
      if (invitation.status == "PENDING") {
        return {
          content: `${invitation.team.name} 邀请您加入球队，邀请发起时间：${formattedDate}`,
          id: invitation.team.teamId,
        };
      } else if (invitation.status == "ACCEPTED") {

      } else if (invitation.status == "REJECTED") {

      }
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
    const showDot = informs.length > 0 ? true : false
    this.setData({
      playerMatchInform: informs,
      showPlayerMatchDot: showDot,
    });
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
    const showDot = informs.length > 0 ? true : false
    this.setData({
      coachMatchInform: informs,
      showCoachMatchDot: showDot,
    });
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
    const showDot = informs.length > 0 ? true : false
    this.setData({
      refereeMatchInform: informs,
      showRefereeMatchDot: showDot,
    });
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

  // ------------------
  // 切换球队管理员处理申请通知的显示状态

  toggleManageTeamApplicationInform: function () {
    this.setData({
      showManageTeamApplicationInform: !this.data.showManageTeamApplicationInform,
      showManageTeamApplicationDot: false
    });
  },
  // ------------------
  // 弹出 modal 用来同意或拒绝邀请

  showPlayerTeamInvitationModal(e) {
    let teamId = e.currentTarget.dataset.id
    wx.showModal({
      title: '球队邀请',
      content: `是否加入球队？`,
      cancelText: '拒绝',
      cancelColor: '#FF0000',
      confirmText: '接受',
      confirmColor: '#1cb72d',
      success: (res) => {
        if (res.confirm) {
          this.playerReplyTeamInvitation(true, teamId);
        } else if (res.cancel) {
          this.playerReplyTeamInvitation(false, teamId);
        }
      }
    });
  },

  showCoachTeamInvitationModal(e) {
    let teamId = e.currentTarget.dataset.id
    wx.showModal({
      title: '执教邀请',
      content: `是否接受球队执教邀请？`,
      cancelText: '拒绝',
      cancelColor: '#FF0000',
      confirmText: '接受',
      confirmColor: '#1cb72d',
      success: (res) => {
        if (res.confirm) {
          this.coachReplyTeamInvitation(true, teamId);
        } else if (res.cancel) {
          this.coachReplyTeamInvitation(false, teamId);
        }
      }
    });
  },

  showRefereeEventInvitationModal(e) {
    let eventId = e.currentTarget.dataset.id
    wx.showModal({
      title: '赛事执法',
      content: `是否接受赛事执法邀请？`,
      cancelText: '拒绝',
      cancelColor: '#FF0000',
      confirmText: '接受',
      confirmColor: '#1cb72d',
      success: (res) => {
        if (res.confirm) {
          this.refereeReplyEventInvitation(true, eventId);
        } else if (res.cancel) {
          this.refereeReplyEventInvitation(false, eventId);
        }
      }
    });
  },

  showRefereeMatchInvitationModal(e) {
    let matchId = e.currentTarget.dataset.id
    wx.showModal({
      title: '比赛执法',
      content: `是否接受比赛执法邀请？`,
      cancelText: '拒绝',
      cancelColor: '#FF0000',
      confirmText: '接受',
      confirmColor: '#1cb72d',
      success: (res) => {
        if (res.confirm) {
          this.refereeReplyMatchInvitation(true, matchId);
        } else if (res.cancel) {
          this.refereeReplyMatchInvitation(false, matchId);
        }
      }
    });
  },

  showManageTeamApplicationModal(e) {
    let playerId = e.currentTarget.dataset.id
    let teamIndex = e.currentTarget.dataset.index
    console.log(playerId)
    console.log(teamIndex)
    wx.showModal({
      title: '球员申请',
      content: `是否同意该球员加入球队？`,
      cancelText: '拒绝',
      cancelColor: '#FF0000',
      confirmText: '接受',
      confirmColor: '#1cb72d',
      success: (res) => {
        if (res.confirm) {
          this.teamManagerReplyApplication(true, playerId, teamIndex);
        } else if (res.cancel) {
          this.teamManagerReplyApplication(false, playerId, teamIndex);
        }
      }
    });
  },
  // ------------------
  // 同意/拒绝各邀请, accepted=true/false

  playerReplyTeamInvitation(accept, teamId) {
    const that = this
    const playerId = Number(this.data.playerId)
    teamId = Number(teamId)
    accept = Boolean(accept)

    wx.showLoading({
      title: '正在提交',
      mask: true,
    })

    wx.request({
      url: URL + '/player/team/replyInvitation?playerId=' + playerId + '&teamId=' + teamId + '&accept=' + accept,
      method: "POST",
      success(res) {
        console.log("mine page: player Reply Team Invitation ->")
        if (res.statusCode != 200) {
          console.error("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          wx.showToast({
            title: '回复失败',
            icon: 'error',
          })
          return
        }
        wx.showToast({
          title: '回复成功',
          icon: 'success',
        })
        console.log("回复球队邀请成功")
      },
      fail(err) {
        console.error('请求失败：', err.statusCode, err.errMsg)
        wx.showToast({
          title: '回复失败',
          icon: 'error',
        })
      },
      complete() {
        wx.hideLoading()
        that.fetchPlayerTeamInvitations(that.data.playerId)
      }
    })
  },

  coachReplyTeamInvitation(accept, teamId) {
    const that = this
    const coachId = Number(this.data.coachId)
    teamId = Number(teamId)
    accept = Boolean(accept)

    wx.showLoading({
      title: '正在提交',
      mask: true,
    })

    wx.request({
      url: URL + '/coach/team/replyInvitation?coachId=' + coachId + '&teamId=' + teamId + '&accept=' + accept,
      method: "POST",
      success(res) {
        console.log("mine page: coach Reply Team Invitation ->")
        if (res.statusCode != 200) {
          console.error("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          wx.showToast({
            title: '回复失败',
            icon: 'error',
          })
          return
        }
        wx.showToast({
          title: '回复成功',
          icon: 'success',
        })
        console.log("回复球队邀请成功")
      },
      fail(err) {
        console.error('请求失败：', err.statusCode, err.errMsg)
        wx.showToast({
          title: '回复失败',
          icon: 'error',
        })
      },
      complete() {
        wx.hideLoading()
        that.fetchCoachTeamInvitations(that.data.coachId)
      }
    })
  },

  refereeReplyEventInvitation(accept, eventId) {
    const that = this
    const refereeId = Number(this.data.refereeId)
    eventId = Number(eventId)
    accept = Boolean(accept)

    wx.showLoading({
      title: '正在提交',
      mask: true,
    })

    wx.request({
      url: URL + '/referee/event/replyInvitation?refereeId=' + refereeId + '&eventId=' + eventId + '&accept=' + accept,
      method: "POST",
      success(res) {
        console.log("mine page: referee Reply Event Invitation ->")
        if (res.statusCode != 200) {
          console.error("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          wx.showToast({
            title: '回复失败',
            icon: 'error',
          })
          return
        }
        wx.showToast({
          title: '回复成功',
          icon: 'success',
        })
        console.log("回复赛事邀请成功")
      },
      fail(err) {
        console.error('请求失败：', err.statusCode, err.errMsg);
        wx.showToast({
          title: '回复失败',
          icon: 'error',
        })
      },
      complete() {
        wx.hideLoading()
        that.fetchRefereeInvitationsForEvent(that.data.refereeId)
      }
    })
  },

  refereeReplyMatchInvitation(accept, matchId) {
    const that = this
    const refereeId = Number(this.data.refereeId)
    matchId = Number(matchId)
    accept = Boolean(accept)

    wx.showLoading({
      title: '正在提交',
      mask: true,
    })

    wx.request({
      url: URL + '/referee/match/replyInvitation?refereeId=' + refereeId + '&matchId=' + matchId + '&accept=' + accept,
      method: "POST",
      success(res) {
        console.log("mine page: referee Reply Match Invitation ->")
        if (res.statusCode != 200) {
          console.error("请求失败" + res.statusCode + "; 错误信息为：" + res.data)
          wx.showToast({
            title: '回复失败',
            icon: 'error',
          })
          return
        }
        wx.showToast({
          title: '回复成功',
          icon: 'success',
        })
        console.log("回复比赛邀请成功")
      },
      fail(err) {
        console.error('请求失败：', err.statusCode, err.errMsg);
        wx.showToast({
          title: '回复失败',
          icon: 'error',
        })
      },
      complete() {
        wx.hideLoading()
        that.fetchRefereeInvitationsForMatch(that.data.refereeId)
      }
    })
  },

  teamManagerReplyApplication(accept, playerId, index) {
    const that = this
    const teamId = Number(this.data.manageTeamIdList[index].teamId)
    playerId = Number(playerId)
    accept = Boolean(accept)

    wx.showLoading({
      title: '正在提交',
      mask: true,
    })

    wx.request({
      url: URL + '/team/player/replyApplication?teamId=' + teamId + '&playerId=' + playerId + '&accept=' + accept,
      method: "POST",
      success(res) {
        console.log("mine page: Team Reply Player Application ->")
        if (res.statusCode != 200) {
          console.error("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          wx.showToast({
            title: '回复失败',
            icon: 'error',
          })
          return
        }
        wx.showToast({
          title: '回复成功',
          icon: 'success',
        })
        console.log("回复球员申请成功")
      },
      fail(err) {
        console.error('请求失败：', err.statusCode, err.errMsg)
        wx.showToast({
          title: '回复失败',
          icon: 'error',
        })
      },
      complete() {
        wx.hideLoading()
        that.fetchManageTeamList(that.data.userId)
      }
    })
  },
})