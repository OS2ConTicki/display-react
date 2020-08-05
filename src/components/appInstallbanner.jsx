import React from 'react'
import Toast from 'react-bootstrap/Toast'
import NavigationActionIcon from '../images/Navigation_Action.png'

const AppInstallBanner = () => {
  return (
    <Toast>
      <Toast.Header>
        <img src='/icons/favicon-16x16.png' alt=''className='mr-1' />
        <strong className='mr-auto'>Install Conference App</strong>
      </Toast.Header>
      <Toast.Body>Install this webapp on your iPhone: tab <img src={NavigationActionIcon} alt='iOS action menu' className='mx-3' /> and then Add to homescreen.</Toast.Body>
    </Toast>
  )
}

export default AppInstallBanner
