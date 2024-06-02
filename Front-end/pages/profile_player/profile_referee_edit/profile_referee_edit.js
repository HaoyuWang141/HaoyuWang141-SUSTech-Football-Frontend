// pages/profile_player/profile_referee_edit/profile_referee_edit.js
const app = getApp()
const URL = app.globalData.URL

Page({

  /**
   * 页面的初始数据
   */
  data: {
    refereeId: Number,
    photoUrl: '', // 头像链接
    name: '', // 名字
    bio: '', //简介
    modalHiddenEname: true, // 控制模态框显示隐藏
    modalHiddenBio: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({
      refereeId: decodeURIComponent(options.refereeId),
      photoUrl: decodeURIComponent(options.photoUrl),
      name: decodeURIComponent(options.name), // 名字
      bio: decodeURIComponent(options.bio), // 简介
    })
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

  uploadImage(e) {
    const {
      avatarUrl
    } = e.detail
    const that = this
    app.onChooseAvatar(avatarUrl, (url) => {
      that.setData({
        photoUrl: url
      });
    })
  },

  showNameInput: function () {
    this.setData({
      modalHiddenEname: false
    });
  },

  confirmChangeName: function () {
    // 这里可以添加逻辑，如检查输入是否合法等
    this.setData({
      name: this.data.newname,
      modalHiddenEname: true
    });
  },

  cancelChangeName: function () {
    this.setData({
      modalHiddenEname: true
    });
  },

  changename: function (e) {
    this.setData({
      newname: e.detail.value
    });
  },

  showBioInput: function () {
    this.setData({
      modalHiddenBio: false
    });
  },

  confirmChangeBio: function () {
    // 这里可以添加逻辑，如检查输入是否合法等
    this.setData({
      bio: this.data.newbio,
      modalHiddenBio: true
    });
  },

  cancelChangeBio: function () {
    this.setData({
      modalHiddenBio: true
    });
  },

  changebio: function (e) {
    this.setData({
      newbio: e.detail.value
    });
  },

  submit: function (referee) {
    let that = this
    console.log('profile referee edit: submit ->')
    console.log(this.data);
    if (this.validateData()) {
      // 如果验证通过，进行数据上传或其他处理
      console.log('验证通过，开始上传');
      wx.showLoading({
        title: '正在注册',
      })
      wx.request({
        url: URL + '/referee/update',
        method: 'PUT',
        data: {
          refereeId: this.data.refereeId,
          photoUrl: this.data.photoUrl,
          name: this.data.name,
          bio: this.data.bio,
          userId: app.globalData.userId,
        },
        success(res) {
          console.log('profile referee register: submit ->')
          if (res.statusCode != 200) {
            console.error('更新教练失败' + res.statusCode + ' ' + res.data)
            return
          }
          console.log('更新教练成功')
          wx.navigateBack()
        },
        fail(err) {
          console.error('更新教练失败：', err.statusCode, err.errMsg);
        },
        complete() {
          wx.hideLoading()
        }
      })
    }
  },

  // 验证函数
  validateData: function () {
    const {
      photoUrl,
      name,
    } = this.data;

    if (!photoUrl) {
      wx.showToast({
        title: '头像不能为空',
        icon: 'none'
      });
      return false;
    }

    if (!name) {
      wx.showToast({
        title: '名字不能为空',
        icon: 'none'
      });
      return false;
    }

    return true;
  },

})