import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'

const SearchBox = ({ value, onChange }) => {
  return (

    <InputGroup className='mb-3'>
      <InputGroup.Prepend>
        <InputGroup.Text id='basic-addon1'>
          <FontAwesomeIcon
            icon={faSearch}
          />
        </InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        placeholder='Søg i events'
        role='search'
        name='search'
        value={value}
        className='form-control'
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </InputGroup>

  )
}

export default SearchBox
