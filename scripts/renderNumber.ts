function renderNumber(num: number) {
  if (num > 100000) {
    return Math.round((num / 10000) * 100) / 100 + 'w'
  } else if (num > 1000) {
    return Math.round((num / 10000) * 100) / 10 + 'k'
  } else {
    return num
  }
}

export { renderNumber }