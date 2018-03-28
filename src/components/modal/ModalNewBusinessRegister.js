import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import { Modal, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { closeModal } from '../../redux/ducks/modal'

import { FormNewBusinessRegister } from '../forms'

const ModalNewBusinessRegister = ({ onConfirm, closeModal, title, businessRegister, businessRegisterType }) => {
  const handleConfirm = values => {
    closeModal()
    !values ? onConfirm(false) : onConfirm(values)
  }

  const _renderTitle = () => {
    if (!title) {
      return null
    }

    return (
      <Modal.Header>
        { title }
      </Modal.Header>
    )
  }

  const initialValues = {
    businessRegister: businessRegisterType,
    label: businessRegister ? businessRegister.text : '',
    id: businessRegister ? businessRegister.value : ''
  }

  return (
    <Formik
      onSubmit={values => handleConfirm(values)}
      initialValues={initialValues}
      render={props =>
        <Modal open size='tiny' onClose={() => handleConfirm(false)}>
          { _renderTitle() }
          <Modal.Content>
            <FormNewBusinessRegister {...props} businessRegister={businessRegister} />
          </Modal.Content>
          <Modal.Actions>
            <Button
              negative
              icon='cancel'
              content='Cancel'
              labelPosition='right'
              onClick={() => handleConfirm(false)}
            />
            <Button
              color='blue'
              icon='save'
              content={(businessRegister && businessRegister.value) ? 'Edit Register' : 'Create Register'}
              labelPosition='right'
              disabled={!props.isValid}
              // loading={createLoading || updateLoading}
              onClick={() => handleConfirm(props.values)}
            />
          </Modal.Actions>
        </Modal>
      }
    />
  )
}

ModalNewBusinessRegister.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  title: PropTypes.string,
  values: PropTypes.object,
  businessRegister: PropTypes.object,
  businessRegisterType: PropTypes.number,
  isValid: PropTypes.bool
}

export default connect(null, { closeModal })(ModalNewBusinessRegister)
