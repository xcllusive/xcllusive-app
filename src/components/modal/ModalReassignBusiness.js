import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Modal, Form, Icon, Button, Message, Dropdown } from 'semantic-ui-react'
import { closeModal } from '../../redux/ducks/modal'

import { reassignBusiness } from '../../redux/ducks/business'
import { getUsers } from '../../redux/ducks/user'

class ModalReassignBusiness extends Component {
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

  _mapValuesToArray = array => {
    if (array.length > 0) {
      return array.map((item, index) => ({
        key: index,
        text: `${item.firstName} ${item.lastName}`,
        value: item.id
      }))
    }
    return [{ key: 1, text: 'No users found', value: null }]
  }

  _handleConfirm = async isConfirmed => {
    if (!isConfirmed) {
      this.props.closeModal()
      return
    }
    await this.props.reassignBusiness({
      businessId: this.props.businessId,
      listingAgentId: this.props.values.listingAgent,
      listingAgentCtcId: this.props.values.listingAgentCtc
    })
    this.props.closeModal()
  }

  render () {
    const { values, isValid, createLoading, options, xcllusiveAnalysts, ctcAnalysts, company } = this.props
    return (
      <Modal open size="small" onClose={() => this._handleConfirm(false)}>
        <Modal.Header>{options.title}</Modal.Header>
        <Modal.Content>
          <Message warning>
            <Message.Header>IMPORTANT:</Message.Header>
            You are able to reassign the LISTING agent- not the sales agent. Once this is done, the responsibility of
            listing this business will be transferred to the allocated Listing Agent. Only do this if this is your
            intention.
          </Message>
          <Form>
            <Form.Group>
              {company === 'Xcllusive' ? (
                <Form.Field>
                  <label>Reassign Business To New Xcllusive Listing Agent</label>
                  <Dropdown
                    name="listingAgent"
                    placeholder="Listing Agent"
                    fluid
                    search
                    selection
                    options={this._mapValuesToArray(xcllusiveAnalysts)}
                    value={values.listingAgent}
                    onChange={this._handleSelectChange}
                    onSearchChange={this._handleSearchChange}
                  />
                </Form.Field>
              ) : (
                <Form.Field>
                  <label>Reassign Business To New CTC Listing Agent</label>
                  <Dropdown
                    name="listingAgentCtc"
                    placeholder="Listing Agent"
                    fluid
                    search
                    selection
                    options={this._mapValuesToArray(ctcAnalysts)}
                    value={values.listingAgentCtc}
                    onChange={this._handleSelectChange}
                    onSearchChange={this._handleSearchChange}
                  />
                </Form.Field>
              )}
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="blue"
            disabled={createLoading || !isValid}
            loading={createLoading}
            onClick={this._handleConfirm}
          >
            <Icon name="save" />
            Save and Return
          </Button>
          <Button color="red" onClick={() => this._handleConfirm(false)}>
            <Icon name="cancel" />
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

ModalReassignBusiness.propTypes = {
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  setFieldValue: PropTypes.func,
  isValid: PropTypes.bool,
  users: PropTypes.array,
  getUsers: PropTypes.func,
  createLoading: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
  options: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired,
  reassignBusiness: PropTypes.func,
  businessId: PropTypes.number.isRequired,
  listingAgent: PropTypes.number.isRequired,
  listingAgentCtc: PropTypes.number.isRequired,
  xcllusiveAnalysts: PropTypes.array,
  ctcAnalysts: PropTypes.array,
  company: PropTypes.string
}

const mapPropsToValues = props => {
  if (props && (props.listingAgent || props.listingAgentCtc)) {
    return {
      listingAgent: props.listingAgent,
      listingAgentCtc: props.listingAgentCtc
    }
  }
  return {
    listingAgent: null,
    listingAgentCtc: null
  }
}

// const validationSchema = Yup.object().shape({
//   listingAgent: Yup.number().required('Listing Agent is required.')
// })

const mapStateToProps = state => ({
  createLoading: state.business.reassignBusiness.isLoading,
  users: state.user.get.array,
  xcllusiveAnalysts: state.user.get.xcllusiveAnalysts,
  ctcAnalysts: state.user.get.ctcAnalysts
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      reassignBusiness,
      getUsers,
      closeModal
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    enableReinitialize: true
  })(ModalReassignBusiness)
)
