import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Modal, Form, Label, Icon, Button } from 'semantic-ui-react'
import Yup from 'yup'

import { reassignBusiness } from '../../redux/ducks/business'

class ReassignBusinessForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      listingAgent: [
        { key: '1', text: 'Business Source', value: '1' },
        { key: '2', text: 'Business Rating', value: '2' },
        { key: '3', text: 'Business Product', value: '3' },
        { key: '4', text: 'Business Industry', value: '4' },
        { key: '5', text: 'Business Type', value: '5' },
        { key: '6', text: 'Business Owner`s Time', value: '6' }
      ]
    }
  }

  componentWillReceiveProps (nextProps) {
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  render () {
    const {
      values,
      touched,
      errors,
      handleSubmit,
      isSubmitting,
      isValid,
      isLoading,
      modalOpen,
      toggleModal
    } = this.props
    const {
      listingAgent
    } = this.state
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
                  options={listingAgent}
                  autoComplete='listingAgent'
                  //  value={this.props.business}
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
            loading={isLoading}
            onClick={handleSubmit}
          >
            <Icon name='save' />
            Save and Return
          </Button>
          <Button
            color='red'
            onClick={toggleModal}
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
  isLoading: PropTypes.bool,
  modalOpen: PropTypes.bool
}

const mapPropsToValues = () => ({
  listingAgent: ''
})

const validationSchema = Yup.object().shape({
  listingAgent: Yup.string()
    .required('Listing Agent is required.')
})

const handleSubmit = (values, { props, setSubmitting }) => {
  console.log('oii ', values.listingAgent)
  props.reassignBusiness(values)
  setSubmitting(false)
}

const mapStateToProps = state => {
  return {
    isLoading: state.business.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    reassignBusiness }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withFormik({
    validationSchema,
    mapPropsToValues,
    handleSubmit})(ReassignBusinessForm)
)
