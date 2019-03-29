import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Form, Table, Checkbox, Dimmer, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { closeModal } from '../../redux/ducks/modal'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import * as Yup from 'yup'

import { getAllAnalysts } from '../../redux/ducks/reports'

class ModalPickAnalysts extends Component {
  constructor (props) {
    super(props)
    this.state = {
      array: []
    }
  }

  componentDidMount () {
    this.props.getAllAnalysts()
  }

  _handleConfirm = async isConfirmed => {
    if (!isConfirmed) {
      this.props.closeModal()
      return
    }
    await this.props.onConfirm(this.state.array)
    this.props.closeModal()
  }

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  _checkBoxArray = (e, { values }) => {
    const isChecked = this.state.array.filter(item => {
      return item.value === values.value
    })

    if (!isChecked.length) {
      const array = this.state.array
      array.push(values)
      this.setState({ array })
    } else {
      const array = this.state.array.filter(item => {
        return item.value !== values.value
      })
      this.setState({ array })
    }
  }

  render () {
    const { options, isLoading, arrayAnalysts } = this.props
    return (
      <Modal open size="small" onClose={() => this._handleConfirm(false)}>
        <Modal.Header>{options.title}</Modal.Header>
        <Modal.Content>
          <Dimmer.Dimmable dimmed={isLoading}>
            <Dimmer inverted active={isLoading}>
              <Loader>Loading</Loader>
            </Dimmer>
            {arrayAnalysts.length ? (
              <Form>
                <Form.Group>
                  <Table celled compact definition>
                    <Table.Body>
                      {arrayAnalysts.map((analysts, index) => (
                        <Table.Row key={index}>
                          <Table.Cell collapsing>
                            <Checkbox
                              checked={this.state.array.some(item => item.key === analysts.key)}
                              values={analysts}
                              onChange={this._checkBoxArray}
                            />
                          </Table.Cell>
                          <Table.Cell>{analysts.text}</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </Form.Group>
              </Form>
            ) : null}
          </Dimmer.Dimmable>
        </Modal.Content>
        <Modal.Actions>
          <Button negative content="Cancel" onClick={() => this._handleConfirm(false)} />
          <Button
            positive
            icon="thumbs up"
            labelPosition="right"
            content="Confirm"
            onClick={this._handleConfirm}
            disabled={this.state.array.length === 0}
          />
        </Modal.Actions>
      </Modal>
    )
  }
}

ModalPickAnalysts.propTypes = {
  closeModal: PropTypes.func.isRequired,
  options: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired,
  handleChange: PropTypes.func,
  values: PropTypes.object,
  setFieldValue: PropTypes.func,
  arrayAnalysts: PropTypes.array,
  getAllAnalysts: PropTypes.func,
  isLoading: PropTypes.bool,
  onConfirm: PropTypes.func
}

const mapStateToProps = state => ({
  arrayAnalysts: state.reports.getAllAnalysts.array,
  isLoading: state.reports.getAllAnalysts.isLoading
})

const mapPropsToValues = () => ({})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeModal,
      getAllAnalysts
    },
    dispatch
  )

const validationSchema = Yup.object().shape({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    enableReinitialize: true,
    validationSchema
  })(ModalPickAnalysts)
)
