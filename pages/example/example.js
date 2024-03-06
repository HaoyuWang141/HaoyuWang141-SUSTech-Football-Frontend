Page({
  data: {
    id1: 1,
  },
  handleTap: function() {
    console.log("触发回调函数")
  },
  goBilibili:function() {
    const aid='200376800' // 这是跳转视频的id
    const timestamp=new Date().getTime()
    const path=`pages/video/video?__preload_=${timestamp*10+3}&__key_=${timestamp*10+4}&avid=${aid}`
    wx.navigateToMiniProgram({
      appId: 'wx7564fd5313d24844',
      path,
      success: res => {
        console.log('跳转成功')
      }
    })
  },
  goLive: function() {
    wx.navigateTo({
      url: '/pages/pub/live/live?url=https://live.bilibili.com/31935228',
    })
  },
  goBilibili_useLive: function() {
    wx.navigateTo({
      url: '/pages/pub/live/live?url=https://www.bilibili.com/video/BV1cF4m1M7oV',
    })
  },
  goAliyunpan: function () {
    wx.navigateTo({
      url: '/pages/pub/live/live?url=https://www.alipan.com/s/sPmEsthvjwS',
    })
  }
})
