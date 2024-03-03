// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchText: '' // 初始化搜索框内容为空
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

  gotoMatches() {
    wx.navigateTo({
      url: '/pages/pub/matches/matches',
    })
  },

  gotoPlayers() {
    wx.navigateTo({
        url: '/pages/pub/players/players',
      })
  },

  gotoTeams() {
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
  }

})