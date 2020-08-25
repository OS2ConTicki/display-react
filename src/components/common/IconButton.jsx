import React from 'react'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**
 * Button with icon.
 *
 * @param iconPosition The icon position ('before' (default) or 'after')
 * @param iconProps Props for the FontAwesomeIcon element
 * @param children The children
 * @param buttonProps Props for the Button element
 * @returns {JSX.Element}
 * @constructor
 */
const IconButton = ({ iconPosition = 'before', icon: iconProps, children, ...buttonProps }) => {
  const icon = iconProps ? <FontAwesomeIcon {...iconProps} /> : null

  return (
    <Button {...buttonProps}>
      {icon && iconPosition === 'before' && <span className='pr-2'>{icon}</span>}
      {children}
      {icon && iconPosition !== 'before' && <span className='pl-2'>{icon}</span>}
    </Button>
  )
}

export default IconButton
