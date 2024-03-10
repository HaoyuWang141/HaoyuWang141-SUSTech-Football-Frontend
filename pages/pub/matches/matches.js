// pages/pub/matches/matches.js
const appInstance = getApp()
const URL = appInstance.globalData.URL

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 搜索框
    searchText: '',
    // 过滤器
    showFilter: false,
    filterSortings: ['按时间', '按热度'],
    sorting: '按时间',
    filterFavors: ['仅我的关注', '所有'],
    favor: '仅我的关注',
    // 比赛列表
    allMatches: [],
    favorMatches: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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


  /**
   * 监听搜索框文本
   */
  bindInput: function (e) {
    this.setData({
      searchText: e.detail.value // 更新data中的searchText值为用户输入的内容
    });
    // 这里可以添加你的搜索逻辑，比如根据用户输入的内容进行实时搜索
  },

  /**
   * 监听搜索按钮
   */
  search: function () {
    // 这里添加搜索逻辑，比如发起网络请求或其他操作
    console.log('搜索内容:', this.data.searchText);
  },

  ////////////////////////////////////////////////////////////////
  // HTTP 请求

  fetchData: function (id) {

    // 显示加载提示框，提示用户正在加载
    wx.showLoading({
      title: '加载中',
      mask: true // 创建一个蒙层，防止用户操作
    });

    // 网络请求
    wx.request({
      url: URL + '/match/getAll',
      success(res) {
        console.log("/match/getAll ->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        for (let match of res.data) {
          allMatches.push(match)
        }
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

  ////////////////////////////////////////////////////////////////
  // 监听

  /**
   * 监听过滤器按钮
   */
  filter: function () {
    console.log('点击过滤器按钮');
    this.setData({
      filterButtonText: this.data.filterButtonText == '+' ? '-' : '+',
      showFilter: !this.data.showFilter
    });
  },

  /**
   * 监听过滤器排序选项
   */
  bindSortingChange: function (e) {
    const val = e.detail.value;
    this.setData({
      sorting: this.data.filterSortings[val]
    });
  },

  /**
   * 监听过滤器过滤选项
   */
  bindFavorChange: function (e) {
    const val = e.detail.value;
    this.setData({
      favor: this.data.filterFavors[val]
    });
  },

  /////////////////////////////////////////////////////
  // 跳转

  gotoMatch: function (e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/pub/match/match?id=' + id,
    })
  },

})