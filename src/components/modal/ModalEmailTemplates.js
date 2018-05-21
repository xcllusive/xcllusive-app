import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Form, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { closeModal } from '../../redux/ducks/modal'
import { bindActionCreators } from 'redux'

import { mapArrayToValuesForDropdown } from '../../utils/sharedFunctionArray'

import {
  getEmailTemplates,
  getEmailTemplate,
  clearEmailTemplates
} from '../../redux/ducks/emailTemplates'

class ModalEmailTemplates extends Component {
  constructor () {
    super()

    this.state = {}
  }

  componentWillMount () {
    this.props.getEmailTemplates()
    this.props.clearEmailTemplates()
  }

  _handleSelectChange = (e, { value }) => {
    this.props.getEmailTemplate(value)
  }

  _handleConfirm = isConfirmed => {
    this.props.closeModal()
    this.props.onConfirm(isConfirmed)
  }

  render () {
    const {
      listEmailTemplates,
      options,
      objectEmailTemplate,
      isLoadingEmailTemplates,
      isLoadingEmailTemplate
    } = this.props
    return (
      <Modal open size="tiny" onClose={() => this._handleConfirm(false)}>
        <Modal.Header>{options.title}</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group>
              <Form.Field width={16}>
                <Form.Select
                  style={{ zIndex: 9999 }}
                  label="Templates"
                  placeholder="Please select one template bellow..."
                  options={mapArrayToValuesForDropdown(listEmailTemplates)}
                  name="title"
                  autoComplete="title"
                  onChange={this._handleSelectChange}
                  loading={isLoadingEmailTemplates}
                />
                {listEmailTemplates.title}
              </Form.Field>
            </Form.Group>
            {objectEmailTemplate ? (
              <Segment loading={isLoadingEmailTemplate}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: objectEmailTemplate.body
                  }}
                />
              </Segment>
            ) : null}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            negative
            content="Cancel"
            onClick={() => this._handleConfirm(false)}
          />
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Confirm"
            onClick={() => this._handleConfirm(options)}
          />
        </Modal.Actions>
      </Modal>
    )
  }
}

ModalEmailTemplates.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  options: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  listEmailTemplates: PropTypes.array,
  getEmailTemplates: PropTypes.func,
  getEmailTemplate: PropTypes.func,
  objectEmailTemplate: PropTypes.object,
  clearEmailTemplates: PropTypes.func,
  isLoadingEmailTemplates: PropTypes.bool,
  isLoadingEmailTemplate: PropTypes.bool
}

const mapStateToProps = state => ({
  listEmailTemplates: state.emailTemplates.getAll.array,
  isLoadingEmailTemplates: state.emailTemplates.getAll.isLoading,
  objectEmailTemplate: state.emailTemplates.get.object,
  isLoadingEmailTemplate: state.emailTemplates.get.isLoading
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getEmailTemplates,
      getEmailTemplate,
      closeModal,
      clearEmailTemplates
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(ModalEmailTemplates)
