// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: 0,
    searchText: '', // 初始化搜索框内容为空
    newsIdList: [],
    matchIdList: [],
    playerIdList: [],
    teamIdList: [],
    eventIdList: [],
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

  gotoExample() {
    wx.navigateTo({
      url: '/pages/example/example',
    })
  },

  gotoSearch() {
    wx.navigateTo({
      url: '/pages/home/search/search?' + 'searchText=' + encodeURIComponent(this.data.searchText),
    })
  },

  gotoTheNews() {
      // TODO
  },

  gotoTheMatch() {
    console.log("11111");
    wx.navigateTo({
      url: '/pages/pub/match/match?' + 'matchId=' + encodeURIComponent('123'),
    });
  },

  gotoThePlayer() {
      // TODO
  },

  gotoTheTeam() {
      // TODO
  },

  gotoTheEvent() {
      // TODO
  },

  gotoMoreMatches() {
    wx.navigateTo({
      url: '/pages/pub/matches/matches',
    })
  },

  gotoMorePlayers() {
    wx.navigateTo({
        url: '/pages/pub/players/players',
      })
  },

  gotoMoreTeams() {
    wx.navigateTo({
        url: '/pages/pub/teams/teams',
      })
  },

///////////////////////////////////////////////////////////////////////////////
// 其它逻辑

  /**
   * 监听搜索框文本
   */
  bindInput: function(e) {
    this.setData({
      searchText: e.detail.value // 更新data中的searchText值为用户输入的内容
    });
    // 这里可以添加你的搜索逻辑，比如根据用户输入的内容进行实时搜索
  },

  /**
   * 监听搜索按钮
   */
  search: function() {
    // 这里添加搜索逻辑，比如发起网络请求或其他操作
    console.log('搜索内容:', this.data.searchText);
    this.gotoSearch();
  },

  // 跳转至event详情页，需要的参数为event的id 
  gotoEvent: function(e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/pub/event/event?id=' + dataset.id,
    })
  },

  // 跳转至match详情页，需要的参数为match的id
  gotoMatch: function(e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/pub/match/match?id=' + dataset.id,
    })
  }
})