// pages/management/invite/invite.js
const appInstance = getApp()
const URL = appInstance.globalData.URL
const userId = appInstance.globalData.userId

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    homeTeamId: 0,
    awayTeamId: 0,
    type: '',
    blockTitle: '', // block-title 的文本内容
    blockMore: '', // block-more 的文本内容
    allList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.id);
    console.log(options.type);
    this.setData({
      id: parseInt(options.id),
      type: options.type,
    })
    switch (this.data.type) {
      case 'player':
        this.setData({
          blockTitle: '球员列表',
          blockMore: '点击邀请球员',
        });
        break;
      case 'coach':
        this.setData({
          blockTitle: '教练列表',
          blockMore: '点击邀请教练',
        });
        break;
      case 'referee':
        this.setData({
          blockTitle: '裁判列表',
          blockMore: '点击邀请裁判',
        });
        break;
      case 'team':
        this.setData({
          blockTitle: '球队列表',
          blockMore: '点击邀请球队',
        });
        break;
      case 'hometeam-match':
        this.setData({
          blockTitle: '管理的球队',
          blockMore: '点击设置主队',
        });
        break;
      case 'awayteam-match':
        this.setData({
          blockTitle: '球队列表',
          blockMore: '点击邀请客队',
        });
        break;
      case 'hometeam-event-match':
        this.setData({
          blockTitle: '参赛球队列表',
          blockMore: '点击设置主队',
        });
        break;
      case 'awayteam-event-match':
        this.setData({
          blockTitle: '参赛球队列表',
          blockMore: '点击设置客队',
        });
        break;
      case 'captain':
        this.setData({
          blockTitle: '队员列表',
          blockMore: '点击选择队长',
        });
        break;
      default:
    }
    this.fetchData();
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
    this.fetchData();
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
    this.fetchData();
    wx.stopPullDownRefresh();
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

  // 获取基本数据
  fetchData: function () {
    const that = this
    let url = '';
    switch (this.data.type) {
      case 'player':
        url = URL + '/player/getAll';
        break;
      case 'coach':
        url = URL + '/coach/getAll';
        break;
      case 'referee':
        url = URL + '/referee/getAll';
        break;
      case 'team':
        url = URL + '/team/getAll';
        break;
      case 'hometeam-match':
        url = URL + '/user/getUserManageTeam?userId=' + userId;
        break;
      case 'awayteam-match':
        url = URL + '/team/getAll';
        break;
      case 'hometeam-event-match':
        url = URL + '/event/team/getAll?eventId=' + that.data.id;
        break;
      case 'awayteam-event-match':
        url = URL + '/event/team/getAll?eventId=' + that.data.id;
        break;
      case 'captain':
        url = URL + "/team/player/getAll?teamId=" + that.data.id;
        break;
      default:
        url = URL;
    }
    // 显示加载提示框，提示用户正在加载
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    wx.request({
      url: url,
      success(res) {
        console.log(that.data.type + '->')
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        that.setData({
          allList: res.data,
        })
      },
      fail(err) {
        console.log("请求失败，错误码为：" + err.statusCode + "；错误信息为：" + err.message)
      },
      complete() {
        // 无论请求成功还是失败都会执行
        wx.hideLoading(); // 关闭加载提示框
      }
    })
  },

  selectHomeTeam(e){
    const homeTeamId = e.target.dataset.id;
    this.setData({
      homeTeamId: homeTeamId,
    })
    console.log('选择主队' + this.data.homeTeamId);
    this.homeTeamBack();
  },

  selectAwayTeam(e){
    const awayTeamId = e.target.dataset.id;
    this.setData({
      awayTeamId: awayTeamId,
    })
    console.log('选择客队' + this.data.awayTeamId);
    this.awayTeamBack();
  },

  homeTeamBack(){
    console.log('Back->');
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      tempHomeTeamId: this.data.homeTeamId,
    })
    wx.navigateBack({
      delta: 1,
    })
  },

  awayTeamBack(){
    console.log('Back->');
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      tempAwayTeamId: this.data.awayTeamId,
    })
    wx.navigateBack({
      delta: 1,
    })
  },

  invite(e) {
    let url = '';
    console.log('e.currentTarget.dataset->');
    console.log(e.currentTarget.dataset);
    switch (this.data.type) {
      case 'player':
        url = URL + '/team/player/invite?teamId=' + this.data.id + "&playerId=" + e.currentTarget.dataset.id;
        break;
      case 'coach':
        url = URL + '/team/coach/invite?teamId=' + this.data.id + "&coachId=" + e.currentTarget.dataset.id;
        break;
      case 'referee':
        url = URL + '/match/referee/invite?matchId=' + this.data.id + "&refereeId=" + e.currentTarget.dataset.id;
        break;
      case 'team':
        url = URL + '/event/team/invite?eventId=' + this.data.id + '&teamId=' + e.currentTarget.dataset.id;
        break;
      default:
        url = URL;
    }
    wx.request({
      url: url,
      method: 'POST',
      success: res => {
        console.log('已邀请 type=', this.data.type, res.data);
        // 获取成功信息并显示在 toast 中
        const successMsg = res.data ? res.data : '邀请成功'; // 假设后端返回的成功信息在 res.data.message 中
        wx.showToast({
          title: successMsg,
          icon: 'none',
          duration: 2000
        });
      },
      fail: err => {
        console.error('邀请失败', err);
        // 显示失败信息
        wx.showToast({
          title: '请求失败，请重试',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  selectCaptain(e) {
    const that = this;
    this.setData({
      captainId: e.target.dataset.id,
    })
    wx.request({
      url: URL + '/team/captain/select?teamId=' + that.data.id + '&captainId=' + e.currentTarget.dataset.id,
      method: 'POST',
      success: res => {
        console.log('成功设置队长', res.data);
        // 获取成功信息并显示在 toast 中
        const successMsg = res.data ? res.data : '设置成功'; // 假设后端返回的成功信息在 res.data.message 中
        wx.showToast({
          title: successMsg,
          icon: 'none',
          duration: 2000,
          success: function () {
            setTimeout(function () {
              wx.navigateBack({
                delta: 1,
              })
            }, 500);
          }
        });
      },
      fail: err => {
        console.error('设置失败', err);
        // 显示失败信息
        wx.showToast({
          title: '设置失败，请重试',
          icon: 'none',
          duration: 2000
        });
      },
    });
  },
})