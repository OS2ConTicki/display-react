import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import { useTranslate } from 'react-translate'

const SearchBox = ({ value, onChange }) => {
  const t = useTranslate('Conticki')
  return (
    <Form>
      <InputGroup className='mb-3'>
        <InputGroup.Prepend>
          <InputGroup.Text id='basic-addon1'>
            <FontAwesomeIcon
              icon={faSearch}
            />
          </InputGroup.Text>
        </InputGroup.Prepend>

        <Form.Label className='sr-only'>{t('Search events')}</Form.Label>
        <FormControl
          placeholder={t('Type search words')}
          role='search'
          name='search'
          value={value}
          className='form-control'
          onChange={(e) => onChange(e.currentTarget.value)}
        />

      </InputGroup>
    </Form>

  )
}

export default SearchBox
