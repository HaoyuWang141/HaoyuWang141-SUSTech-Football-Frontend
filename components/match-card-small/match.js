// components/match-card-small/match.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    name: String,
    stage: String,
    tag: String,
    team1: String,
    team2: String,
    icon1: String,
    icon2: String,
    score1: Number,
    score2: Number,
    penalty1: Number,
    penalty2: Number,
    time: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    strTime: String,
    hasBegun: Boolean,
  },

  lifetimes: {
    attached: function () {
      const date = new Date(this.properties.time)

      // 将时间格式化为"yyyy-mm-dd hh:mm"的形式
      var year = date.getFullYear();
      var month = date.getMonth() + 1; // 月份是从0开始的，所以要加1
      var day = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();

      // 补零操作
      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;
      hour = hour < 10 ? '0' + hour : hour;
      minute = minute < 10 ? '0' + minute : minute;

      // 拼接时间字符串
      const strTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
      const hasBegun = new Date() > date
      this.setData({
        strTime: strTime,
        hasBegun: hasBegun,
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})