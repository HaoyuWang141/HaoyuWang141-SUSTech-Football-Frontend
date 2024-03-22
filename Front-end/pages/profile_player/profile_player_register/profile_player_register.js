// pages/profile_player/profile_player_register/profile_player_register.js
const app = getApp()
const URL = app.globalData.URL

Page({

  /**
   * 页面的初始数据
   */
  data: {
    photoUrl: '', // 头像链接
    name: '', // 名字
    birthDate: '请选择出生日期', // 生日
    height: '', // 身高
    weight: '', // 体重
    position: '', // 场上位置
    identity: '', // 学工号
    shuYuan: '', // 书院
    college: '', // 院系
    admissionYear: '请选择入学年份', // 入学年份
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
            console.log('profile player register: uploadImage ->')
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

  inputName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  // 处理学工号输入
  inputIdentity: function (e) {
    this.setData({
      identity: e.detail.value
    });
  },

  // 处理身高输入
  inputHeight: function (e) {
    this.setData({
      height: e.detail.value
    });
  },

  // 处理体重输入
  inputWeight: function (e) {
    this.setData({
      weight: e.detail.value
    });
  },

  // 处理生日选择
  bindDateChange: function (e) {
    this.setData({
      birthDate: e.detail.value
    });
  },

  // 处理场上位置选择
  inputPosition: function (e) {
    this.setData({
      position: e.detail.value
    });
  },

  // 处理书院输入
  inputShuYuan: function (e) {
    this.setData({
      shuYuan: e.detail.value
    });
  },

  // 处理院系输入
  inputCollege: function (e) {
    this.setData({
      college: e.detail.value
    });
  },

  // 处理入学年份选择
  bindAdmissionYearChange: function (e) {
    this.setData({
      admissionYear: e.detail.value
    });
  },

  // 表单提交
  submit: function () {
    console.log('profile player register: submit ->')
    console.log(this.data);
    if (this.validateData()) {
      // 如果验证通过，进行数据上传或其他处理
      console.log('验证通过，开始上传');
      wx.showLoading({
        title: '正在注册',
      })
      wx.request({
        url: URL + '/player/create',
        method: 'POST',
        data: {
          photoUrl: this.data.photoUrl,
          name: this.data.name,
          birthDate: this.data.birthDate,
          height: this.data.height,
          weight: this.data.weight,
          position: this.data.position,
          identity: this.data.identity,
          shuYuan: this.data.shuYuan,
          college: this.data.college,
          admissionYear: this.data.admissionYear,
          userId: app.globalData.userId,
        },
        success (res) {
          console.log('profile player register: submit ->')
          if (res.statusCode != 200) {
            console.error('新建球员失败' + res.statusCode + ' ' + res.data)
            return
          }
          console.log('新建球员成功')
          wx.navigateBack()
        },
        fail(err) {
          console.error('新建球员失败：', err.statusCode, err.errMsg);
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
      identity,
      birthDate,
      admissionYear
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

    if (!identity) {
      wx.showToast({
        title: '学工号不能为空',
        icon: 'none'
      });
      return false;
    }

    // 对出生日期进行验证，确保用户已经选择
    if (birthDate === '请选择出生日期') {
      wx.showToast({
        title: '请选择出生日期',
        icon: 'none'
      });
      return false;
    }

    // 对入学年份进行验证，确保用户已经选择
    if (admissionYear === '请选择入学年份') {
      wx.showToast({
        title: '请选择入学年份',
        icon: 'none'
      });
      return false;
    }

    return true;
  },

})