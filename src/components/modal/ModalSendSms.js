import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Divider, Table, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { closeModal } from '../../redux/ducks/modal'

class ModalSms extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pickedNumber: false
    }
  }

  _handleConfirm = pickedNumber => {
    if (pickedNumber) {
      const formatedNumber = `+61${pickedNumber}`
      this.props.onConfirm(formatedNumber)
    }

    this.props.closeModal()
  }

  _pickedPhone = number => {
    this.setState({ pickedNumber: number })
  }

  render () {
    const { arrayNumbers, title } = this.props.options
    const { pickedNumber } = this.state
    return (
      <Modal open size="tiny" onClose={() => this._handleConfirm(false)}>
        <Modal.Header>{title}</Modal.Header>
        {arrayNumbers.length === 0 ? (
          <Fragment>
            <Modal.Content>
              <p>This business has no mobile phones registered! Please insert one in Business Page.</p>
            </Modal.Content>
            <Modal.Actions>
              <Button
                positive
                icon="thumbs up"
                labelPosition="right"
                content="OK"
                onClick={() => this._handleConfirm(false)}
              />
            </Modal.Actions>
          </Fragment>
        ) : (
          <Fragment>
            {pickedNumber || arrayNumbers.length === 1 ? (
              <Fragment>
                <Modal.Content>
                  <p>
                    Are you sure you want to send a SMS to <b>{pickedNumber || arrayNumbers[0].number}</b> ?
                  </p>
                </Modal.Content>
                <Modal.Actions>
                  <Button negative content="No" onClick={() => this._handleConfirm(false)} />
                  <Button
                    positive
                    icon="checkmark"
                    labelPosition="right"
                    content="Yes"
                    onClick={() => this._handleConfirm(pickedNumber || arrayNumbers[0].number)}
                  />
                </Modal.Actions>
              </Fragment>
            ) : (
              <Fragment>
                <Divider horizontal>I found the numbers below, please click on one:</Divider>
                <Table celled compact definition>
                  <Table.Body>
                    {arrayNumbers.map(numbers => (
                      <Table.Row key={numbers.id}>
                        <Table.Cell textAlign="center" onClick={() => this._pickedPhone(numbers.number)}>
                          <Icon name="add" />
                          {numbers.number}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
                <Modal.Actions>
                  <Button negative content="Cancel" onClick={() => this._handleConfirm(false)} />
                </Modal.Actions>
              </Fragment>
            )}
          </Fragment>
        )}
      </Modal>
    )
  }
}

ModalSms.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  options: PropTypes.shape({
    title: PropTypes.string.isRequired,
    arrayNumbers: PropTypes.array.isRequired
  }).isRequired
}

export default connect(
  null,
  { closeModal }
)(ModalSms)
