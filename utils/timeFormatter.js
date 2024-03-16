const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const formatTime = date => {
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
  return strTime
}

const splitDateTime = strTimeInfo => {
  // 按空格拆分日期和时间
  const [datePart, timePart] = strTimeInfo.split(' ');

  // 返回拆分后的日期和时间
  return {
      strDate: datePart,
      strTime: timePart
  };
}

module.exports = {
  formatTime,
  splitDateTime,
}
