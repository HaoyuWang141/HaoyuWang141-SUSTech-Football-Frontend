// pages/management/management.js
const appInstance = getApp()
const URL = appInstance.globalData.URL
const ANONYMITY = appInstance.globalData.ANONYMITY
const {
  formatTime
} = require("../../utils/timeFormatter")

Page({
  data: {
    hasThirdAuthority: false,
    authorityId: 0,
    userId: Number,
    id: 0,
    teams: [],
    matches: [],
    events: [],
    newEvent: {
      id: 'id',
      icon: '/assets/newplayer.png',
      name: '创建赛事'
    },
    manageEventIdList: [],
    manageEventNumber: 0,
    showManageEventInvitationTeamInform: false,
    showManageEventInvitationTeamDot: false,
    manageEventInvitationTeamInform: [],
  },

  onLoad(options) {

  },

  onShow() {
    appInstance.addToRequestQueue(this.fetchThirdAuthority)
    appInstance.addToRequestQueue(this.fetchData)
    appInstance.addToRequestQueue(this.fetchUserId)
  },

  onPullDownRefresh() {
    appInstance.addToRequestQueue(this.fetchThirdAuthority)
    appInstance.addToRequestQueue(this.fetchData)
    appInstance.addToRequestQueue(this.fetchUserId)
    wx.stopPullDownRefresh()
  },

  fetchUserId(userId) {
    const that = this
    that.setData({
      userId: userId
    })
  },

  fetchThirdAuthority(userId) {
    const that = this
    wx.request({
      url: `${URL}/authority/check/third?userId=${userId}`,
      method: "POST",
      success(res) {
        console.log("management page: fetchThirdAuthority ->")
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        let authorityId = res.data
        console.log("third authority id: " + authorityId)
        if (authorityId > 0) {
          that.setData({
            hasThirdAuthority: true,
            authorityId: authorityId,
          })
        } else {
          that.setData({
            hasThirdAuthority: false,
            authorityId: 0,
          })
        }
      }
    })
  },

  fetchData(userId) {
    wx.showLoading({
      title: '加载中',
      mask: true
    });

    var that = this;
    wx.request({
      url: URL + '/user/getUserManageTeam?userId=' + userId,
      success(res) {
        console.log("teams->")
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        console.log(res.data)
        that.setData({
          teams: res.data,
        });
      },
      fail(err) {
        console.log('请求失败', err);
      },
      complete() {
        wx.hideLoading();
      }
    });

    wx.request({
      url: URL + '/user/getUserManageMatch?userId=' + userId,
      success(res) {
        console.log('matches->');
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        let matchList = res.data ?? []
        for (let match of matchList) {
          let date = new Date(match.time)
          match.strTime = formatTime(date)
          match.hasBegun = match.status == 'PENDING' ? false : true
          match.awayTeamId = match.awayTeamId ?? 0
          match.awayTeam = match.awayTeam ?? {
            teamId: 0,
            name: "客队",
            logoUrl: ANONYMITY,
          }
        }
        that.setData({
          matches: matchList,
        });
        console.log(that.data.matches);
      },
      fail(err) {
        console.log('请求失败', err);
      },
      complete() {
        wx.hideLoading();
      }
    });

    wx.request({
      url: URL + '/user/getUserManageEvent?userId=' + userId,
      success(res) {
        console.log("events->")
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        console.log(res.data)
        let manageEventIdList = res.data;
        let manageEventNumber = res.data.length;
        that.setData({
          events: res.data,
          isEventManager: res.data.length > 0 ? true : false,
          manageEventIdList: res.data,
          manageEventNumber: res.data.length,
          manageEventInvitationTeamInform: []
        })
        for (let index = 0; index < manageEventNumber; index++) {
          const event = manageEventIdList[index];
          that.fetchManageEventInvitationTeam(event.eventId);
        }
      },
      fail(err) {
        console.log('请求失败', err);
      },
      complete() {
        wx.hideLoading();
      }
    });
  },

  fetchManageEventInvitationTeam(eventId) {
    const that = this
    wx.request({
      url: URL + '/event/team/getInvitations',
      data: {
        eventId: eventId
      },
      success(res) {
        console.log("management page: fetch event invitations to team->")
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        console.log(res.data)
        that.formatManageEventInvitationTeam(res.data);
      },
      fail(err) {
        console.log('请求失败', err);
      },
      complete() {}
    });
  },
  formatManageEventInvitationTeam: function (invitations) {
    const that = this
    const informs = invitations.map(invitation => {
      const formattedDate = (invitation.lastUpdated != null) ? new Date(invitation.lastUpdated).toLocaleString() : '未知';
      if (invitation.status == "PENDING") {
        return `${invitation.eventId}(eventId) 所邀请 ${invitation.team.name}(teamId = ${invitation.teamId}) 还未被处理您发出的邀请，邀请发起时间：${formattedDate}`
      } else if (invitation.status == "ACCEPTED") {
        return `${invitation.eventId}(eventId) 所邀请 ${invitation.team.name}(teamId = ${invitation.teamId}) 已经同意参与您所创建的赛事，处理时间时间：${formattedDate}`
      } else if (invitation.status == "REJECTED") {
        return `${invitation.eventId}(eventId) 所邀请 ${invitation.team.name}(teamId = ${invitation.teamId}) 已经拒绝参与您所创建的赛事，处理时间时间：${formattedDate}`
      }
      return null;
    }).filter(inform => inform !== null);
    let showDot = informs.length > 0 ? true : false;
    that.setData({
      manageEventInvitationTeamInform: this.data.manageEventInvitationTeamInform.concat(informs),
      showManageEventInvitationTeamDot: showDot
    });
  },
  toggleManageEventInvitationTeamInform: function () {
    this.setData({
      showManageEventInvitationTeamInform: !this.data.showManageEventInvitationTeamInform,
      showManageEventInvitationTeamDot: false
    });
  },

  gotoMatches: function (e) {
    wx.navigateTo({
      url: `/pages/management/match_more/match_more?authorityLevel=3&authorityId=${this.data.authorityId}`,
    })
  },

  gotoTeams: function (e) {
    wx.navigateTo({
      url: `/pages/management/team_more/team_more?authorityLevel=3&authorityId=${this.data.authorityId}`,
    })
  },

  gotoMatchPage: function (e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/pub/match/match?id=' + dataset.id,
    })
  },

  gotoTeamPage: function (e) {
    wx.navigateTo({
      url: '/pages/pub/team/team',
    })
  },

  // gotoEditMatch: function (e) {
  //   const dataset = e.currentTarget.dataset
  //   wx.navigateTo({
  //     url: '/pages/management/match_edit/match_edit?id=' + dataset.id,
  //   })
  // },

  gotoEditEvent: function (e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/management/event_edit/event_edit?id=' + dataset.id,
    })
  },

  // gotoNewEvent() {
  //   wx.navigateTo({
  //     url: '/pages/management/event_new/event_new',
  //   })
  // },

})