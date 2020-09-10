import { useContext } from 'react'
import { format } from 'date-fns'
import { da, enGB } from 'date-fns/locale'
import AppStateContext from '../../context/appStateContext'

const locales = { da, en: enGB }

const getCurrentLocale = () => {
  const context = useContext(AppStateContext)
  const language = context.language.get

  return locales[language] ?? null
}

const loadDate = (date) => {
  return date instanceof Date ? date : new Date(date)
}

// @see https://date-fns.org/docs/format
export const formatDate = (date, formatStr = 'P') => {
  const locale = getCurrentLocale()
  date = loadDate(date)

  return format(date, formatStr, { locale: locale })
}

export const formatTime = (date, formatStr = 'p') => {
  const locale = getCurrentLocale()
  date = loadDate(date)

  return format(date, formatStr, { locale: locale })
}

export function getDateByLanguage (inputDate, language) {
  const date = new Date(inputDate)
  const lang = language === 'en' ? 'en-EN' : 'da-DA'
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return date.toLocaleDateString(lang, dateOptions)
}

export function getDate (inputDate) {
  const date = new Date(inputDate)
  return date.toDateString()
}
export function getDayByLanguage (inputDate, language) {
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
