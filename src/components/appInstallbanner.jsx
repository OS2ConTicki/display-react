import React, { useState } from 'react'
import Toast from 'react-bootstrap/Toast'
import NavigationActionIcon from '../images/Navigation_Action.png'
import { useTranslate } from 'react-translate'

const AppInstallBanner = (icons) => {
  const t = useTranslate('Conticki')

  const handleBanner = (key = 'iosInstallBanner', initialState = true) => {
    const [state, setState] = useState(() => {
      const storedState = window.localStorage.getItem(key)
      return storedState !== 'false'
    })

    React.useEffect(() => {
      window.localStorage.setItem(key, state)
    }, [state])

    return [state, setState]
  }

  const [value, setValue] = handleBanner()

  return (
    <Toast className='bg-warning' show={value} onClose={() => setValue(false)}>
      <Toast.Header>
        <img src={icons.icons['16x16']} width='16' height='16' alt='' className='mr-1' />
        <strong className='mr-auto'>{t('Install Conference App')}</strong>
      </Toast.Header>
      <Toast.Body>{t('Install this webapp on your iPhone: tab {{image}} and then Add to homescreen.', { image: <img src={NavigationActionIcon} alt='iOS action menu' className='mx-3' /> })}  </Toast.Body>
    </Toast>
  )
}

export default AppInstallBanner
