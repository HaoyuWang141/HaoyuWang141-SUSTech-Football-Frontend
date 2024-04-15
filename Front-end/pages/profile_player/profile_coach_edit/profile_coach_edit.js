// pages/profile_player/profile_coach_edit/profile_coach_edit.js
const app = getApp()
const URL = app.globalData.URL

Page({

  /**
   * 页面的初始数据
   */
  data: {
    coachId: Number,
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
      coachId: decodeURIComponent(options.coachId),
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

  uploadImage: function () {
    var that = this; // 保存当前上下文的this值
    // 打开相册或相机选择图片
    wx.chooseMedia({
      count: 1, // 默认为9，设置为1表示只选择一张图片
      mediaType: ['image'],
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表
        console.log(res.tempFiles)
        var tempFilePath = res.tempFiles[0].tempFilePath;
        // 选取完成后，上传到服务器
        wx.showLoading({
          title: '上传头像，请稍后',
          mask: true,
        })
        wx.uploadFile({
          url: URL + '/upload', // 你的上传图片的服务器API地址
          filePath: tempFilePath,
          name: 'file', // 必须填写，因为后台需要根据name键来获取文件内容
          success: function (uploadRes) {
            console.log('profile coach register: uploadImage ->')
            console.log(uploadRes)
            if (uploadRes.statusCode != 200) {
              console.error("请求失败，状态码为：" + uploadRes.statusCode + "; 错误信息为：" + uploadRes.data)
              wx.showToast({
                title: '上传头像失败，请检查网络！', // 错误信息文本
                icon: 'none', // 'none' 表示不显示图标，其他值如'success'、'loading'
                duration: 3000 // 持续时间
              });
              return
            }
            var filename = uploadRes.data;
            that.setData({
              photoUrl: URL + '/download?filename=' + filename
            });
            wx.hideLoading()
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 2000,
            });
          },
          fail: function (error) {
            console.log('上传失败', error);
            wx.hideLoading()
            wx.showToast({
              title: '上传头像失败，请检查网络！', // 错误信息文本
              icon: 'none', // 'none' 表示不显示图标，其他值如'success'、'loading'
              duration: 3000 // 持续时间
            });
          }
        })
      }
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

  submit: function (coach) {
    let that = this
    console.log('profile coach edit: submit ->')
    console.log(this.data);
    if (this.validateData()) {
      // 如果验证通过，进行数据上传或其他处理
      console.log('验证通过，开始上传');
      wx.showLoading({
        title: '正在注册',
      })
      wx.request({
        url: URL + '/coach/update',
        method: 'PUT',
        data: {
          coachId: this.data.coachId,
          photoUrl: this.data.photoUrl,
          name: this.data.name,
          bio: this.data.bio,
          userId: app.globalData.userId,
        },
        success (res) {
          console.log('profile coach register: submit ->')
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