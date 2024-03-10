// pages/pub/match/match.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    matchId: "",
    event: '书院杯',
    group: 'A组',
    team1: '树德书院',
    team2: '树仁书院',
    icon1: "/assets/shude.png",
    icon2: "/assets/shuren.png",
    score1: '1',
    score2: '1',
    penalty1: '-',
    penalty2: '-',
    time: "2024-2-1 15:00",
    hasBegun: true,
    
    description: "今日举行了XX比赛，描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述。\n\n描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述。",
    descriptionTime: '2024-2-1 19:00',

    matchEvents: [{name: 'event1'}, {name: 'event2'}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log("22222");
    this.setData({
        matchId: decodeURIComponent(options.matchId)
    });
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

  }
})