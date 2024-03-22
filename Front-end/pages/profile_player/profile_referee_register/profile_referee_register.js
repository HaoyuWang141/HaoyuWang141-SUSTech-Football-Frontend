// pages/profile_player/profile_referee_register/profile_referee_register.js
const app = getApp()
const URL = app.globalData.URL

Page({

  /**
   * 页面的初始数据
   */
  data: {
    photoUrl: '',
    name: '',
    bio: ''
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
            console.log('profile referee register: uploadImage ->')
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
              icon: 'none',
              duration: 3000 // 持续时间
            });
          }
        })
      }
    })
  },

  inputName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  inputBio: function (e) {
    this.setData({
      bio: e.detail.value
    })
  },

    // 表单提交
    submit: function () {
      console.log('profile referee register: submit ->')
      console.log(this.data);
      if (this.validateData()) {
        // 如果验证通过，进行数据上传或其他处理
        console.log('验证通过，开始上传');
        wx.showLoading({
          title: '正在注册',
        })
        wx.request({
          url: URL + '/referee/create',
          method: 'POST',
          data: {
            photoUrl: this.data.photoUrl,
            name: this.data.name,
            bio: this.data.bio,
            userId: app.globalData.userId,
          },
          success (res) {
            console.log('profile referee register: submit ->')
            if (res.statusCode != 200) {
              console.error('新建裁判失败' + res.statusCode + ' ' + res.data)
              return
            }
            console.log('新建裁判成功')
            wx.navigateBack()
          },
          fail(err) {
            console.error('新建裁判失败：', err.statusCode, err.errMsg);
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
      name
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