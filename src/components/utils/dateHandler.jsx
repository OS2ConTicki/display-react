import { useContext } from 'react'
import { utcToZonedTime, format } from 'date-fns-tz'
import { da, enGB } from 'date-fns/locale'
import AppStateContext from '../../context/appStateContext'

// We need this for time zone support in IE 11.
// https://www.npmjs.com/package/date-time-format-timezone
require('date-time-format-timezone')

const locales = { da, en: enGB }

const getCurrentTimeZone = () => {
  // @TODO Let user/app choose display timezone?
  return 'Europe/Copenhagen'
}

const getCurrentLocale = () => {
  const context = useContext(AppStateContext)
  const language = context.language.get

  return locales[language] ?? null
}

const loadDate = (date) => {
  if (date instanceof Date) {
    date = new Date(date)
  }

  return utcToZonedTime(date, getCurrentTimeZone())
}

// @see https://date-fns.org/docs/format
export const formatDate = (date, formatStr = 'P') => {
  const [locale, timeZone] = [getCurrentLocale(), getCurrentTimeZone()]
  date = loadDate(date)

  return format(date, formatStr, { locale, timeZone })
}

export const formatTime = (date, formatStr = 'p') => {
  const [locale, timeZone] = [getCurrentLocale(), getCurrentTimeZone()]
  date = loadDate(date)

  return format(date, formatStr, { locale, timeZone })
}

export function getDateByLanguage (inputDate, language) {
  return formatDate(inputDate, 'PPP')
}

export function getDate (inputDate) {
  const date = new Date(inputDate)
  return date.toDateString()
}
export function getDayByLanguage (inputDate, language) {
  const day = formatDate(inputDate, 'EEEE')
  const capitalize = ([first, ...rest], lowerRest = false) => first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''))

  return capitalize(day)
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
