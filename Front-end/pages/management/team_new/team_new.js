// pages/management/team_new/team_new.js
const appInstance = getApp()
const URL = appInstance.globalData.URL
const userId = appInstance.globalData.userId

Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamId: 0,
    logoUrl: '', 
    tempFilePath: '',
    teamname: '',
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

  /**
   * 上传队徽图片
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
      }
    })
  },

  /**
   * 输入队名
   */
  inputTeamname: function (e) {
    this.setData({
      teamname: e.detail.value
    });
  },

  confirmCreate: function (){
    var that = this;
    wx.uploadFile({
      url: URL + '/upload', // 你的上传图片的服务器API地址
      filePath: that.data.tempFilePath,
      name: 'file', // 必须填写，因为后台需要根据name键来获取文件内容
      success (uploadRes) {
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
      fail (error) {
        console.log('上传失败', error);
        wx.hideLoading()
        wx.showToast({
          title: '上传头像失败，请检查网络！', // 错误信息文本
          icon: 'none', // 'none' 表示不显示图标，其他值如'success'、'loading'
          duration: 2000 // 持续时间
        });
      },
      complete (){
        // 构造要发送给后端的数据
        const dataToUpdate = {
          name: that.data.teamname,
          logoUrl: that.data.logoUrl,
        };
        // 发送请求到后端接口
        wx.request({
          url: URL + '/team/create?ownerId=' + userId, // 后端接口地址
          method: 'POST', // 请求方法
          data: dataToUpdate, // 要发送的数据
          success: res => {
            // 请求成功的处理逻辑
            console.log("dataToUpdate->");
            console.log(dataToUpdate);
            console.log('球队创建成功', res.data);
            const successMsg = res.data ? res.data : '创建成功'; // 假设后端返回的成功信息在 res.data.message 中
            wx.showToast({
              title: successMsg,
              icon: 'none',
              duration: 2000,
            });
          },
          fail: err => {
            // 请求失败的处理逻辑
            console.error('球队创建失败', err);
            // 显示失败信息
            wx.showToast({
              title: '创建失败，请重试',
              icon: 'none',
              duration: 2000
            });
          },
          complete() {
            setTimeout(function () {
              wx.navigateBack({
                delta: 1,
              })
            }, 1000);
          }
        });
      }
    })
  },
})