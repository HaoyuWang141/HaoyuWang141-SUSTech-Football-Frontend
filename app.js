// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
        if (res.code) {
          //发起网络请求
          wx.request({
            url: this.globalData.SERVER + '/user/wxLogin?code=' + res.code,
            method: "POST",
            success(res) {
              console.log(res.data)
              const appInstance = getApp()
              appInstance.globalData.openid = res.data.openid
              appInstance.globalData.session_key = res.data.session_key
              wx.request({
                url: appInstance.globalData.SERVER + '/user/login?openid=' + res.data.openid + '&session_key=' + res.data.session_key,
                method: "POST",
                success(res) {
                  console.log(res.data)
                  appInstance.globalData.userId = res.data.userId
                },
                fail(err) {
                  console.log(err)
                }
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

    // 获取用户头像url
    this.globalData.avatarUrl = wx.getStorageSync('avatarUrl')
  },
  globalData: {
    SERVER: 'https://haoyu-wang141.top:8085',
    // SERVER: 'https://localhost:8085',
    openid: null,
    session_key: null,
    userId: null,
    avatarUrl: null
  }
})