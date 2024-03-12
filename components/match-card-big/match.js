// components/match-card-big/match.js
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
    hasBegun: Boolean,
  },

  computed: {

  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  lifetimes: {
    attached: function () {
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})