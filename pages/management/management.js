// pages/management/management.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teams: [
      { name: '南科大足球队', img: '/assets/barca1.png', number: 25 },
      { name: '南科大足球队南科大足球队南科大足球队', img: '/assets/barca1.png', number: 25 },
      { name: '南科大足球队', img: '/assets/barca1.png', number: 25 },
      { name: '南科大足球队南科大足球队南科大足球队', img: '/assets/barca1.png', number: 25 },
      { name: '南科大足球队', img: '/assets/barca1.png', number: 25 },
      { name: '南科大足球队南科大足球队南科大足球队', img: '/assets/barca1.png', number: 25 }
    ],
    matches: [
      { name: '书院杯', group: 'A组', team1: 'team1', team2: 'team2', icon1: '/assets/team.svg', icon2: '/assets/team.svg', score1: 1, score2: 1, time: '2024-2-1 15:00', hasBegun: true },
      { name: '书院杯', group: 'A组', team1: 'team1', team2: 'team2', icon1: '/assets/team.svg', icon2: '/assets/team.svg', score1: 1, score2: 1, time: '2024-2-1 15:00', hasBegun: true },
      { name: '书院杯', group: 'A组', team1: 'team1', team2: 'team2', icon1: '/assets/team.svg', icon2: '/assets/team.svg', score1: 1, score2: 1, time: '2024-2-1 15:00', hasBegun: true }
    ],
    events: [
      { id: 'id1', icon: '/assets/cup.svg', name: '2024年南方科技大学书院杯足球赛事' },
      { id: 'id1', icon: '/assets/cup.svg', name: '2024年南方科技大学书院杯足球赛事' },
      { id: 'id1', icon: '/assets/cup.svg', name: '2024年南方科技大学书院杯足球赛事' },
      { id: 'id1', icon: '/assets/cup.svg', name: '2024年南方科技大学书院杯足球赛事' }
    ],
    newEvent: { id: 'id', icon: '/assets/newplayer.png', name: '创建赛事'},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

///////////////////////////////////////////////////////////////////////////////
// 页面跳转

gotoMatches() {
  wx.navigateTo({
    url: '/pages/management/match_more/match_more',
  })
},


gotoTeams() {
  wx.navigateTo({
    url: '/pages/management/team_more/team_more',
  })
},

gotoEditTeam() {
  wx.navigateTo({
    url: '/pages/management/team_edit/team_edit',
  })
},

gotoEditMatch() {
  wx.navigateTo({
    url: '/pages/management/match_edit/match_edit',
  })
},

gotoEditEvent() {
  wx.navigateTo({
    url: '/pages/management/event_edit/event_edit',
  })
},

gotoNewEvent() {
  wx.navigateTo({
    url: '/pages/management/event_new/event_new',
  })
},

})

