// pages/management/team_edit/team_edit.js
const appInstance = getApp()
const URL = appInstance.globalData.URL
const userId = appInstance.globalData.userId

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    modalHidden: true, // 控制模态框显示隐藏
    newName: '',   // 用于存放用户输入的新队名
    tempFilePath: '',
    edit: '编辑',
    invitePlayer: { name: '邀请新队员', img: '/assets/newplayer.png' },
    selectCaptain: {name: '选择队长', img: '/assets/newplayer.png'},
    inviteCoach: {name: '邀请教练', img: '/assets/newplayer.png'},
    captain: [],

    teamId: 0,
    name: '',
    logoUrl: '',
    playerList: [],
    captainId: 0,
    coachList: [],
    eventList: [],
    managerList: [],
    matchList: [],
    isClickPlayerList: [],
    selectPlayerId: 0,
    isClickCoachList: [],
    selectCoachId: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.id)
    this.setData({
      id: options.id
    })
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
    this.fetchData(this.data.id);
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
    this.fetchData(this.data.id);
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

  fetchData: function (id) {
    wx.showLoading({
      title: '加载中',
      mask: true,
    });
    var that = this;
    wx.request({
      url: URL + '/team/get?id=' + id,
      success(res) {
        console.log("team->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        that.setData({
          teamId: res.data.teamId,
          name: res.data.name,
          logoUrl: res.data.logoUrl,
          coachList: res.data.coachList,
          eventList: res.data.eventList,
          managerList: res.data.managerList,
          matchList: res.data.matchList,
          playerList: res.data.playerList,
        });
        if (res.data.captainId !== null) {
          that.setData({
            captainId: res.data.captainId,
          });
        }
      },
      fail(err) {
        console.log('请求失败', err);
      },
      complete() {
        if(that.data.isClickPlayerList.length < that.data.playerList.length){
          for(var i = 0; i < that.data.playerList.length; i++) {
            that.data.isClickPlayerList.push({
              isClicked: false
            })
          }
        }
        if(that.data.isClickCoachList.length < that.data.coachList.length){
          for(var i = 0; i < that.data.coachList.length; i++) {
            that.data.isClickCoachList.push({
              isClicked: false
            })
          }
        }
        that.fetchCaptain();
        wx.hideLoading();
      }
    });
  },

  fetchCaptain() {
    if(this.data.captainId === 0 || this.data.captainId === null){
      return;
    }
    var that = this;
    // 模拟网络请求
    wx.request({
      url: URL + '/player/get?id=' + that.data.captainId,
      success(res) {
        console.log("captain->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          return
        }
        // 基本数据
        that.setData({
          captain: res.data
        });
      },
      fail(err) {
        console.log('请求失败', err);
      },
    })
  },

  /**
   * 修改队徽
   */
  uploadLogo: function () {
    var that = this;
    // 打开相册或相机选择图片
    wx.chooseMedia({
      count: 1, // 默认为9，设置为1表示只选择一张图片
      mediaType: ['image'],
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表
        console.log(res.tempFiles)
        that.setData({
          tempFilePath: res.tempFiles[0].tempFilePath,
        });
        console.log('tempFilePath->');
        console.log(that.data.tempFilePath);
      }
    })
  },

  // 引入模态框的通用方法
  showModal: function (title, content, confirmText, confirmColor, cancelText, confirmCallback, cancelCallback) {
    wx.showModal({
      title: title,
      content: content,
      confirmText: confirmText,
      confirmColor: confirmColor,
      cancelText: cancelText,
      success(res) {
        if (res.confirm) {
          confirmCallback();
        } else if (res.cancel) {
          cancelCallback();
        }
      }
    });
  },
 

  /**
   * 修改队名
   */
  // 点击队名触发的事件，显示模态框
  showNameModal: function () {
    this.setData({
      modalHidden: false
    });
  },

  // 输入框内容改变时触发的事件
  changeName: function (e) {
    this.setData({
      newName: e.detail.value
    });
  },

  // 确认更改队名时触发的事件
  confirmChangeName: function () {
    // 这里可以添加逻辑，如检查输入是否合法等
    this.setData({
      name: this.data.newName,
      modalHidden: true
    });
  },

  // 取消更改队名时触发的事件
  cancelChangeName: function () {
    this.setData({
      modalHidden: true
    });
  },


   // 点击确认修改按钮，弹出确认修改模态框
   showConfirmModal() {
    this.showModal(
      '确认修改',
      '确定要进行修改吗？',
      '确认',
      'black',
      '取消',
      this.confirmEdit, // 点击确认时的回调函数
      () => {} // 点击取消时的回调函数，这里不做任何操作
    );
  },

  // 点击确认创建按钮，弹出确认修改模态框
  showCheckPlayerModal(e) {
    var that = this
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '确认查看',
      content: '确定要查看该球员吗？',
      confirmText: '确认',
      cancelText: '取消',
      success(res) {
        if (res.confirm) {
          that.gotoPlayerPage(id) // 点击确认时的回调函数
        } else if (res.cancel) {
          () => {} // 点击取消时的回调函数，这里不做任何操作
        }
      }
    });
  },

  // 点击确认修改按钮，弹出确认修改模态框
  showDeletePlayerModal() {
    this.showModal(
      '确认移除',
      '确定要移除该球员吗？',
      '确认',
      'red',
      '取消',
      this.deletePlayer, // 点击确认时的回调函数
      () => {} // 点击取消时的回调函数，这里不做任何操作
    );
  },

  // 管理队员
  managePlayer(e) {
    const index = e.currentTarget.dataset.id;
    const isClickPlayerList = this.data.isClickPlayerList;
    for(var i = 0; i < this.data.playerList.length; i++) {
      isClickPlayerList[i].isClicked = false
    }
    isClickPlayerList[index].isClicked = !isClickPlayerList[index].isClicked;
    const selectPlayerId = this.data.playerList[index].playerId;
    this.setData({
      isClickPlayerList: isClickPlayerList,
      selectPlayerId: selectPlayerId
    });
  },

  deletePlayer() {
    var that = this;
    // 模拟网络请求
    wx.request({
      url: URL + '/team/player/delete?teamId=' + that.data.teamId + '&playerId=' + that.data.selectPlayerId,
      method: 'DELETE',
      success(res) {
        console.log("delete team player->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          wx.showToast({
            title: '删除失败，请重试',
            icon: 'none',
            duration: 2000
          });
          return
        }
        const successMsg = res.data ? res.data : '删除成功'; // 假设后端返回的成功信息在 res.
        wx.showToast({
          title: successMsg,
          icon: 'none',
          duration: 2000,
          success: function () {
            setTimeout(function () {
              that.fetchData(that.data.id);
            }, 2000);
          }
        });
      },
      fail(err) {
        // 请求失败的处理逻辑
        console.error('球员删除失败', err);
        // 显示失败信息
        wx.showToast({
          title: '删除失败，请重试',
          icon: 'none',
          duration: 2000
        });
      },
      complete() {
        const isClickPlayerList = this.data.isClickPlayerList;
        for(var i = 0; i < this.data.playerList.length; i++) {
          isClickPlayerList[i].isClicked = false
        }
        this.setData({
          isClickPlayerList: isClickPlayerList,
          selectPlayerId: 0,
        });
      }
    });
  },

  // 点击确认创建按钮，弹出确认修改模态框
  showCheckCoachModal(e) {
    var that = this
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '确认查看',
      content: '确定要查看该教练吗？',
      confirmText: '确认',
      cancelText: '取消',
      success(res) {
        if (res.confirm) {
          that.gotoCoachPage(id) // 点击确认时的回调函数
        } else if (res.cancel) {
          () => {} // 点击取消时的回调函数，这里不做任何操作
        }
      }
    });
  },

  // 点击确认修改按钮，弹出确认修改模态框
  showDeleteCoachModal() {
    this.showModal(
      '确认移除',
      '确定要移除该教练吗？',
      '确认',
      'red',
      '取消',
      this.deleteCoach, // 点击确认时的回调函数
      () => {} // 点击取消时的回调函数，这里不做任何操作
    );
  },

  manageCoach(e) {
    const index = e.currentTarget.dataset.id;
    const isClickCoachList = this.data.isClickCoachList;
    for(var i = 0; i < this.data.coachList.length; i++) {
      isClickCoachList[i].isClicked = false
    }
    isClickCoachList[index].isClicked = !isClickCoachList[index].isClicked;
    const selectCoachId = this.data.coachList[index].coachId;
    this.setData({
      isClickCoachList: isClickCoachList,
      selectCoachId: selectCoachId
    });
  },

  deleteCoach() {
    var that = this;
    // 模拟网络请求
    wx.request({
      url: URL + '/team/coach/delete?teamId=' + that.data.teamId + '&coachId=' + that.data.selectCoachId,
      method: 'DELETE',
      success(res) {
        console.log("delete team coach->")
        console.log(res.data)
        if (res.statusCode !== 200) {
          console.log("请求失败，状态码为：" + res.statusCode + "; 错误信息为：" + res.data)
          wx.showToast({
            title: '删除失败，请重试',
            icon: 'none',
            duration: 2000
          });
          return
        }
        const successMsg = res.data ? res.data : '删除成功'; // 假设后端返回的成功信息在 res.
        wx.showToast({
          title: successMsg,
          icon: 'none',
          duration: 2000,
          success: function () {
            setTimeout(function () {
              that.fetchData(that.data.id);
            }, 2000);
          }
        });
      },
      fail(err) {
        // 请求失败的处理逻辑
        console.error('教练删除失败', err);
        // 显示失败信息
        wx.showToast({
          title: '删除失败，请重试',
          icon: 'none',
          duration: 2000
        });
      },
      complete() {
        const isClickCoachList = this.data.isClickCoachList;
        for(var i = 0; i < this.data.coachList.length; i++) {
          isClickCoachList[i].isClicked = false
        }
        this.setData({
          isClickCoachList: isClickCoachList,
          selectCoachId: 0
        });
      }
    });
  },
  
  manageCaptain() {

  },

  confirmEdit() {
    var that = this;
    wx.uploadFile({
      url: URL + '/upload', // 你的上传图片的服务器API地址
      filePath: that.data.tempFilePath,
      name: 'file', // 必须填写，因为后台需要根据name键来获取文件内容
      success: function (uploadRes) {
        console.log('Create Team: uploadLogo ->')
        console.log(uploadRes)
        if (uploadRes.statusCode != 200) {
          console.error("请求失败，状态码为：" + uploadRes.statusCode + "; 错误信息为：" + uploadRes.data)
          wx.showToast({
            title: '上传头像失败，请检查网络！', // 错误信息文本
            icon: 'none', // 'none' 表示不显示图标，其他值如'success'、'loading'
            duration: 2000 // 持续时间
          });
          return
        }
        var filename = uploadRes.data;
        that.setData({
          logoUrl: URL + '/download?filename=' + filename
        });
        console.log("logoUrl->")
        console.log(that.data.logoUrl)
      },
      fail: function (error) {
        console.log('上传失败', error);
        wx.hideLoading()
        wx.showToast({
          title: '上传头像失败，请检查网络！', // 错误信息文本
          icon: 'none', // 'none' 表示不显示图标，其他值如'success'、'loading'
          duration: 2000 // 持续时间
        });
      },
      complete: function(){
        // 构造要发送给后端的数据
        const dataToUpdate = {
          teamId: that.data.teamId,
          name: that.data.name,
          logoUrl: that.data.logoUrl,
          captainId: that.data.captainId
        };
        console.log('dataToUpdate->');
        console.log(dataToUpdate);
        // 发送请求到后端接口
        wx.request({
          url: URL + '/team/update?managerId=' + userId, // 后端接口地址
          method: 'PUT', // 请求方法
          data: dataToUpdate, // 要发送的数据
          success: res => {
            // 请求成功的处理逻辑
            console.log('球队信息修改成功', res.data);
            // 获取成功信息并显示在 toast 中
            const successMsg = res.data ? res.data : '修改成功'; // 假设后端返回的成功信息在 res.data.message 中
            wx.showToast({
              title: successMsg,
              icon: 'none',
              duration: 2000,
              success: function () {
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1,
                  })
                }, 1000);
              }
            });
          },
          fail: err => {
            // 请求失败的处理逻辑
            console.error('球队信息修改失败', err);
            // 显示失败信息
            wx.showToast({
              title: '修改失败，请重试',
              icon: 'none',
              duration: 2000
            });
          }
        });
      }
    })
  },

  gotoInvitePlayer: function(e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/management/invite/invite?id=' + dataset.id + '&type=' + 'player',
    })
  },

  gotoSelectCaptain: function(e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      //url: '/pages/management/team_edit/select_captain/select_captain?id=' + dataset.id,
      url: '/pages/management/invite/invite?id=' + dataset.id + '&type=' + 'captain',
    })
  },

  gotoInviteCoach: function(e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/management/invite/invite?id=' + dataset.id + '&type=' + 'coach',
    })
  },

  gotoPlayerPage: function(id) {
    wx.navigateTo({
      url: '/pages/pub/user/player/player?id=' + id,
    })
  },

  gotoCoachPage: function(id) {
    wx.navigateTo({
      url: '/pages/pub/user/coach/coach?id=' + id,
    })
  },
})