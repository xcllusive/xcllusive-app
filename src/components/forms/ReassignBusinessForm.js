import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Modal, Form, Label, Icon, Button } from 'semantic-ui-react'
import Yup from 'yup'

import { reassignBusiness } from '../../redux/ducks/business'
import { getUsers } from '../../redux/ducks/user'

class ReassignBusinessForm extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount = () => {
    this.props.getUsers()
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  _mapValuesToArray = (array) => {
    if (array.length > 0) {
      return array.map((item, index) => ({ key: index, text: item.firstName, value: item.firstName }))
    }
    return [{ key: 1, text: 'Nenhum usuario encontrado', value: null }]
  }

  render () {
    const {
      values,
      touched,
      errors,
      handleSubmit,
      isSubmitting,
      isValid,
      createLoading,
      modalOpen,
      toggleModal
    } = this.props
    return (
      <Modal
        dimmer={'blurring'}
        open={modalOpen}
      >
        <Modal.Header align='center'>Reassign Business to New Listing Agent</Modal.Header>
        <Modal.Content>
          <Form>
            <h4>IMPORTANT: You are able to reassign the LISTING agent- not the sales agent. Once this is done, the responsibility of listing this business will be transferred to the allocated Listing Agent. Only do this if this is your intention.</h4>
            <Form.Group>
              <Form.Field width={6}>
                <Form.Select
                  required
                  label='Reassign Business To New Listing Agent'
                  name='listingAgent'
                  options={this._mapValuesToArray(this.props.users)}
                  autoComplete='listingAgent'
                  value={values.listingAgent}
                  onChange={this._handleSelectChange}
                />
                {errors.listingAgent && touched.listingAgent && <Label basic color='red' pointing content={errors.listingAgent} />}
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color='blue'
            disabled={isSubmitting || !isValid}
            loading={createLoading}
            onClick={handleSubmit}
          >
            <Icon name='save' />
            Save and Return
          </Button>
          <Button
            color='red'
            onClick={() => toggleModal('modalOpenReassignBusiness')}
          >
            <Icon name='cancel' />
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

ReassignBusinessForm.propTypes = {
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleSubmit: PropTypes.func,
  setFieldValue: PropTypes.func,
  toggleModal: PropTypes.func,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  modalOpen: PropTypes.bool,
  users: PropTypes.array,
  getUsers: PropTypes.func,
  createLoading: PropTypes.bool
}

const mapPropsToValues = (props) => {
  if (props && props.listingAgent) {
    return {
      listingAgent: props.listingAgent
    }
  }
  return {
    listingAgent: ''
  }
}

const validationSchema = Yup.object().shape({
  listingAgent: Yup.string()
    .required('Listing Agent is required.')
})

const handleSubmit = (values, { props, setSubmitting }) => {
  props.reassignBusiness({
    businessId: props.businessId,
    listingAgentName: values.listingAgent
  })
  setSubmitting(false)
}

const mapStateToProps = state => {
  return {
    createLoading: state.business.reassignBusiness.isLoading,
    users: state.user.get.array
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    reassignBusiness, getUsers }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withFormik({
    validationSchema,
    mapPropsToValues,
    handleSubmit})(ReassignBusinessForm)
)
