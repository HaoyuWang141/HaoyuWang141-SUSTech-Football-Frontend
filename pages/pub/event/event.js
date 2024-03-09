// pages/pub/event/event.js
const appInstance = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: -1,
    name: String,
    description: String,
    managerList: Array,
    teamList: Array,
    matchList: Array,
    groupList: Array,
    stageList: Array,

    activeIndex: 0,

    stageAndTag: "选择比赛阶段及轮次",
    multiArray: Array,
    multiIndex: Array,
    matchesOfCurrentTag: Array,

    statisticData: [{
        icon: '/assets/statistic-team.png',
        count: 0,
        title: '球队数量'
      },
      {
        icon: '/assets/statistic-player.png',
        count: 0,
        title: '球员数量'
      },
      {
        icon: '/assets/statistic-match.png',
        count: 0,
        title: '比赛总数'
      },
      {
        icon: '/assets/statistic-goal.png',
        count: 0,
        title: '进球总数'
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id
    })

    // 显示加载提示框，提示用户正在加载
    wx.showLoading({
      title: '加载中',
      mask: true // 创建一个蒙层，防止用户操作
    });

    // 执行网络请求
    this.fetchData(options.id);
  },

  fetchData: function (id) {
    var that = this;
    // 模拟网络请求
    wx.request({
      url: appInstance.globalData.URL + '/event/getDetail',
      data: {
        id: id
      },
      success(res) {
        console.log("event->")
        console.log(res.data);

        // 基本数据
        that.setData({
          name: res.data.name,
          description: res.data.description,
          managerList: res.data.managerList,
          teamList: res.data.teamList,
          matchList: res.data.matchList,
          groupList: res.data.groupList,
          stageList: res.data.stageList,
        });

        // 比赛 - picker - 多选数据 multiArray
        var multiArray = [
          [],
          []
        ]
        let firstStage = true
        for (let stage of res.data.stageList) {
          multiArray[0].push(stage.stageName)
          if (firstStage) {
            for (let tag of stage.tags) {
              multiArray[1].push(tag.tagName)
            }
            firstStage = false
          }
        }
        console.log("multiArray->")
        console.log(multiArray)
        that.setData({
          multiArray: multiArray
        })

        // --- 赛事统计 ---
        // 球队数量
        var teamCount = res.data.teamList.length
        // 球员数量
        var playerCount = 0
        for (let team of res.data.teamList) {
          playerCount += team.playerCount
        }
        // 比赛总数
        var matchCount = res.data.matchList.length
        // 进球总数
        var goalCount = 0
        for (let match of res.data.matchList) {
          goalCount += match.homeTeamScore + match.awayTeamScore
        }
        // ---
        let statisticData = that.data.statisticData
        statisticData[0].count = teamCount
        statisticData[1].count = playerCount
        statisticData[2].count = matchCount
        statisticData[3].count = goalCount
        that.setData({
          statisticData: statisticData,
        })

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

  switchTab: function (e) {
    const tabIndex = e.currentTarget.dataset.index;
    this.setData({
      activeIndex: tabIndex
    })
    this.loadTabData(tabIndex);
  },

  loadTabData: function (tabIndex) {
    // 这里是示例逻辑
    // 实际应用中，你可能需要根据tabIndex做不同的数据请求或处理
    console.log('加载Tab数据，当前Tab索引：', tabIndex);
    switch (tabIndex) {
      case 0:
        // 加载主页数据
        break;
      case 1:
        // 加载赛程数据
        break;
      case 2:
        // 加载积分榜数据
        break;
      default:
        console.log('未知的Tab');
    }
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

  gotoTeamPage: function (e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/pub/team/team?id=' + id,
    })
  },

  format(time) {
    console.log(1111111111)
    var date = new Date(time)
    console.log(date)
    return "sdfsdf"
    // return timeFormmater(time)
  },

  stageAndTagChange: function (e) {
    console.log("stageAndTagChange")
    var stageName = this.data.multiArray[0][e.detail.value[0]]
    var tagName = this.data.multiArray[1][e.detail.value[1]]
    var matches = []
    for (let stage of this.data.stageList) {
      if (stageName === stage.stageName) {
        for (let tag of stage.tags) {
          if (tagName === tag.tagName) {
            matches = tag.matches
          }
        }
      }
    }
    this.setData({
      multiIndex: e.detail.value,
      stageAndTag: stageName + " " + tagName,
      matchesOfCurrentTag: matches,
    })
  },

  stageAndTagColumnChange: function (e) {
    console.log("stageAndTagColumnChange")
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    if (e.detail.column === 0) {
      for (let stage of this.data.stageList) {
        if (data.multiArray[0][e.detail.value] == stage.stageName) {
          data.multiArray[1] = []
          for (let tag of stage.tags) {
            data.multiArray[1].push(tag.tagName)
          }
          break
        }
      }
      data.multiIndex[1] = 0;
      console.log(data.multiIndex);
    }
    this.setData(data);
  },
})