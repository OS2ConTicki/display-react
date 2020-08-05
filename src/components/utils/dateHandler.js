
export function getDate (inputDate, language) {
  const date = new Date(inputDate)
  const lang = language === 'en' ? 'en-EN' : 'da-DA'
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return date.toLocaleDateString(lang, dateOptions)
}
export function getDay (inputDate, language) {
  const lang = language === 'en' ? 'en-EN' : 'da-DA'
  const dayOptions = {
    weekday: 'long'
  }

  const date = new Date(inputDate)
  let helperStartDate = date.toLocaleDateString(lang, dayOptions)
  helperStartDate =
      helperStartDate.charAt(0).toUpperCase() + helperStartDate.slice(1)
  return helperStartDate
}

export function getTime (inputDate, language) {
  const lang = language === 'en' ? 'en-EN' : 'da-DA'
  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit'
  }
  const date = new Date(inputDate)
  return date.toLocaleTimeString(lang, timeOptions)
}
