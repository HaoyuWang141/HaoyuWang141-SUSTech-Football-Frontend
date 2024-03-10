// pages/home/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: 0,
    searchText: '',
    newsIdList: [],
    matchIdList: [],
    playerIdList: [],
    teamIdList: [],
    eventIdList: [],

    filterButtonText: '+', // 弃用
    showFilter: false,
    filterTypes: ['全部', '新闻', '比赛', '球员(裁判)', '球队', '赛事', '其它'],
    type: '全部',
    filterSortings: ['按时间', '按热度'],
    sorting: '按时间',
    filterFavors: ['仅我的关注', '所有'],
    favor: '仅我的关注'

    //   checkboxItems: [
    //     { name: '新闻', value: 'news', checked: true },
    //     { name: '比赛', value: 'matches', checked: true },
    //     { name: '球员(裁判)', value: 'players', checked: true },
    //     { name: '球队', value: 'teams', checked: true },
    //     { name: '赛事', value: 'events', checked: true },
    //     { name: '其它', value: 'others', checked: true },
    //   ],
    //   radioItems: [
    //     { name: '按时间', value: 'time', checked: true },
    //     { name: '按热度', value: 'popularity', checked: true },
    //   ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      searchText: decodeURIComponent(options.searchText)
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

  },

  ///////////////////////////////////////////////////////////////////////////////
  // 其它逻辑

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
    console.log('搜索内容:', this.data.searchText);
  },

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

  bindTypeChange: function (e) {
    const val = e.detail.value;
    this.setData({
      type: this.data.filterTypes[val]
    });
  },

  bindSortingChange: function (e) {
    const val = e.detail.value;
    this.setData({
      sorting: this.data.filterSortings[val]
    });
  },

  bindFavorChange: function (e) {
    const val = e.detail.value;
    this.setData({
      favor: this.data.filterFavors[val]
    });
  },

  // showMultiPicker() {
  //     wx.showActionSheet({
  //       itemList: this.data.items,
  //       success: res => {
  //         // 用户选择的选项的索引数组
  //         const selectedIndexes = res.tapIndex;
  //         // 根据索引数组获取选中的选项，并保存到 selectedOptions 中
  //         const selectedOptions = selectedIndexes.map(index => this.data.items[index]);
  //         this.setData({ selectedOptions });
  //       }
  //     });
  //   },

  // checkboxChange(e) {
  //     const checkedValues = e.detail.value; // 获取被选中的复选框的值
  //     const items = this.data.items.map(item => {
  //       // 遍历所有选项，更新选中状态
  //       if (checkedValues.indexOf(item.value) !== -1) {
  //         item.checked = true;
  //       } else {
  //         item.checked = false;
  //       }
  //       return item;
  //     });
  //     this.setData({ items });
  // }

})