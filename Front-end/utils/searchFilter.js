const filter = (keyword, patterns) => {
  // keyword: search text
  keyword = keyword.trim()
  if (keyword == '') {
    return true
  }
  else {
    for (let pattern of patterns) {
      if (pattern.includes(keyword)) {
        return true
      }
    }
    return false
  }
}

module.exports = {
  filter,
}