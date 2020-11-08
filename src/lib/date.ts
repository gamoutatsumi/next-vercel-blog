const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = (date.getMonth() < 9 ? '0' : '') + String(date.getMonth() + 1)
  const day = (date.getDate() < 10 ? '0' : '') + String(date.getDate())

  return `${year}/${month}/${day}`
}

export default formatDate
