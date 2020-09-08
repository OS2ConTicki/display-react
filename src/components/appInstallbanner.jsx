import React from 'react'
import Toast from 'react-bootstrap/Toast'
import NavigationActionIcon from '../images/Navigation_Action.png'
import { useTranslate } from 'react-translate'

const AppInstallBanner = (icons) => {
  const t = useTranslate('Conticki')

  return (
    <Toast className='bg-warning'>
      <Toast.Header>
        <img src={icons.icons['16x16']} width='16' height='16' alt='' className='mr-1' />
        <strong className='mr-auto'>{t('Install Conference App')}</strong>
      </Toast.Header>
      <Toast.Body>{t('Install this webapp on your iPhone: tab {{image}} and then Add to homescreen.', { image: <img src={NavigationActionIcon} alt='iOS action menu' className='mx-3' /> })}  </Toast.Body>
    </Toast>
  )
}

export default AppInstallBanner
