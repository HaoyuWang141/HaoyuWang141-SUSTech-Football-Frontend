Page({
  data: {
    id1: 1,
  },
  handleTap: function() {
    console.log("触发回调函数")
  },
  goBilibili:function() {
    const aid='200376800'
    const timestamp=new Date().getTime()
    const path=`pages/video/video?__preload_=${timestamp*10+3}&__key_=${timestamp*10+4}&avid=${aid}`
    wx.navigateToMiniProgram({
      appId: 'wx7564fd5313d24844',
      path,
      success: res => {
        console.log('跳转成功')
      }
    })
  }
})
