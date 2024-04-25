const filter = (keyword, pattern) => {
  // keyword: search text
  console.log(keyword)
  console.log(pattern)
  keyword = keyword.trim()
  if (keyword == '') {
    return true
  }
  else {
    return pattern.includes(keyword)
  }
}

module.exports = {
  filter,
}