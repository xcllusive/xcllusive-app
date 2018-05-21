import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { withFormik } from 'formik'

import {
  Form,
  Header,
  Table,
  Grid,
  Icon,
  Dimmer,
  Loader,
  Segment,
  Button,
  Statistic
} from 'semantic-ui-react'

import { getBuyer } from '../../redux/ducks/buyer'
import {
  getLog,
  createBuyerLog,
  updateBuyerLog,
  getBusinessBuyerLog,
  clearBuyerLog
} from '../../redux/ducks/buyerLog'
import { getBusiness } from '../../redux/ducks/business'

import { TypesModal, openModal } from '../../redux/ducks/modal'

import Wrapper from '../../components/content/Wrapper'

class BuyerDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      buyerLog: null
    }
  }
  componentWillMount () {
    this.props.getBuyer(this.props.match.params.id)
    this.props.getLog(this.props.match.params.id)

    // this.props.getBusiness(2)
    // this.props.getBusinessBuyerLog(this.props.buyer.id, 2)
  }

  _getBusinessObject = buyerLog => {
    this.props.getBusiness(buyerLog.business_id)
    this.setState({ buyerLog })
    this.props.getBusinessBuyerLog(this.props.buyer.id, buyerLog.business_id)
  }

  _handleDateChange = date => {
    this.props.setFieldValue('date', date)
  }

  _createBuyerLog = () => {
    this.props.createBuyerLog(this.props.buyer.id, this.props.business.id)
  }

  _toggleModalEmailTemplates = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_EMAIL_TEMPLATES, {
      options: {
        title: 'Email to Buyer',
        text: 'Are you sure you want to send an email to buyer?'
      },
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          console.log('worked!')
        }
      }
    })
  }

  render () {
    const {
      listBuyerLogList,
      isLoadingBuyer,
      isLoadingCreate,
      business,
      isLoadingUpdate,
      handleSubmit,
      isSubmitting,
      isValid,
      listBusinessBuyerLogList
    } = this.props
    return (
      <Wrapper>
        {this.props.buyer ? (
          <Fragment>
            <Statistic.Group widths={6} size="mini">
              <Statistic color="orange">
                <Statistic.Value>{this.props.buyer.firstName}</Statistic.Value>
                <Statistic.Label>Name</Statistic.Label>
              </Statistic>
              <Statistic color="blue">
                <Statistic.Value>{this.props.buyer.email}</Statistic.Value>
                <Statistic.Label>Email</Statistic.Label>
              </Statistic>
              <Statistic color="blue">
                <Statistic.Value>{this.props.buyer.telephone1}</Statistic.Value>
                <Statistic.Label>Phone 1</Statistic.Label>
              </Statistic>
              <Statistic color="blue">
                <Statistic.Value>{this.props.buyer.telephone1}</Statistic.Value>
                <Statistic.Label>Phone 2</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Fragment>
        ) : null}
        {business.businessName && this.state.buyerLog ? (
          <Fragment>
            <Segment size="mini" inverted color="grey">
              <Header inverted textAlign="center" size="huge">
                {business.businessName}
              </Header>
            </Segment>
            <Grid celled="internally" divided>
              <Grid.Row>
                <Grid.Column width={5}>
                  <Form>
                    <Form.Group>
                      <Form.Field width={11}>
                        <h5>Follow Up Date</h5>
                        <DatePicker
                          selected={moment(this.state.buyerLog.followUp)}
                          onChange={this._handleDateChange}
                          popperPlacement="top-end"
                          form
                        />
                      </Form.Field>
                    </Form.Group>
                    <Form.Group>
                      <Form.Field width={16}>
                        <Form.TextArea
                          required
                          label="Communication text"
                          name="text"
                          autoComplete="text"
                          value={this.state.buyerLog.text}
                        />
                      </Form.Field>
                    </Form.Group>
                  </Form>
                </Grid.Column>
                <Grid.Column width={11}>
                  <Table color="blue" celled inverted selectable size="small">
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Log</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {listBusinessBuyerLogList.map(businessBuyerLog => (
                        <Table.Row
                          active
                          key={businessBuyerLog.id}
                          // onClick={() => this._getBusinessObject(businessBuyerLog)}
                        >
                          <Table.Cell>{businessBuyerLog.text}</Table.Cell>
                          <Table.Cell>
                            {moment(businessBuyerLog.followUp).format(
                              'DD/MM/YYYY - HH:mm'
                            )}
                          </Table.Cell>
                          <Table.Cell>
                            {businessBuyerLog.followUpStatus}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Grid celled="internally" divided>
              <Grid.Row>
                <Grid.Column>
                  <Button
                    color="twitter"
                    loading={isLoadingCreate}
                    disabled={isLoadingCreate}
                    onClick={() => this._createBuyerLog()}
                  >
                    <Icon name="commenting" />
                    New Log
                  </Button>
                  <Button
                    type="submit"
                    color="red"
                    disabled={isSubmitting || !isValid}
                    loading={isLoadingUpdate}
                    onClick={handleSubmit}
                  >
                    <Icon name="save" />
                    Save
                  </Button>
                  <Button
                    color="yellow"
                    // disabled={isSubmitting || !isValid}
                    // loading={isLoadingUpdate}
                    onClick={() => this._toggleModalEmailTemplates()}
                  >
                    <Icon name="mail" />
                    Send Email
                  </Button>
                  <Button
                    color="green"
                    // disabled={isSubmitting || !isValid}
                    // loading={isLoadingUpdate}
                    // onClick={handleSubmit}
                  >
                    <Icon name="backward" />
                    Return to list
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Fragment>
        ) : null}
        <Grid celled="internally" divided>
          <Grid.Row>
            <Grid.Column width={4}>
              {this.props.buyer ? (
                <Header as="h4" content="Brokers Notes" />
              ) : null}
              <Dimmer.Dimmable
                dimmed={isLoadingBuyer}
                style={{ height: '80vh' }}
              >
                <Dimmer inverted active={isLoadingBuyer}>
                  <Loader>Loading</Loader>
                </Dimmer>

                {this.props.buyer ? (
                  <Form>
                    <Form.Group>
                      <Form.TextArea
                        width={16}
                        readOnly
                        placeholder="there is no notes..."
                        value={this.props.buyer.buyerNotes}
                      />
                    </Form.Group>
                  </Form>
                ) : null}
              </Dimmer.Dimmable>
            </Grid.Column>
            <Grid.Column width={4}>
              <Table color="blue" celled inverted selectable size="small">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Previous Businesses</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {listBuyerLogList.map(buyerLog => (
                    <Table.Row
                      active
                      key={buyerLog.id}
                      onClick={() => this._getBusinessObject(buyerLog)}
                    >
                      <Table.Cell>{buyerLog.Business.businessName}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column width={8}>
              {listBuyerLogList ? (
                <Fragment>
                  <Header>Attached Business Log</Header>
                  <Table color="blue" celled inverted selectable size="small">
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Business Name</Table.HeaderCell>
                        <Table.HeaderCell>Log</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {listBuyerLogList.map(buyerLog => (
                        <Table.Row
                          active
                          key={buyerLog.id}
                          onClick={() => this._getBusinessObject(buyerLog)}
                        >
                          <Table.Cell>
                            {buyerLog.Business.businessName}
                          </Table.Cell>
                          <Table.Cell>{buyerLog.text}</Table.Cell>
                          <Table.Cell>
                            {moment(buyerLog.followUp).format(
                              'DD/MM/YYYY - HH:mm'
                            )}
                          </Table.Cell>
                          <Table.Cell>{buyerLog.followUpStatus}</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </Fragment>
              ) : null}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Wrapper>
    )
  }
}

const handleSubmit = (values, { props, setSubmitting }) => {
  props.updateBuyerLog(values).then(setSubmitting(false))
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getBuyer,
      getLog,
      getBusiness,
      createBuyerLog,
      updateBuyerLog,
      getBusinessBuyerLog,
      clearBuyerLog,
      openModal
    },
    dispatch
  )

BuyerDetails.propTypes = {
  getBuyer: PropTypes.func,
  match: PropTypes.object,
  buyer: PropTypes.object,
  listBuyerLogList: PropTypes.array,
  getLog: PropTypes.func,
  isLoadingBuyer: PropTypes.bool,
  getBusiness: PropTypes.func,
  business: PropTypes.object,
  setFieldValue: PropTypes.func,
  createBuyerLog: PropTypes.func,
  isLoadingCreate: PropTypes.bool,
  updateBuyerLog: PropTypes.func,
  handleSubmit: PropTypes.func,
  isLoadingUpdate: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  listBusinessBuyerLogList: PropTypes.array,
  getBusinessBuyerLog: PropTypes.func,
  clearBuyerLog: PropTypes.func,
  openModal: PropTypes.func
}

const mapPropsToValues = props => {}

const mapStateToProps = state => ({
  buyer: state.buyer.get.object,
  isLoadingBuyer: state.buyer.get.isLoading,
  listBuyerLogList: state.buyerLog.get.array,
  business: state.business.get.object,
  isLoadingCreate: state.buyerLog.create.isLoading,
  isLoadingUpdate: state.buyerLog.update.isLoading,
  listBusinessBuyerLogList: state.buyerLog.getBusBuyLog.array
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withFormik({
    mapPropsToValues,
    handleSubmit,
    enableReinitialize: true
  })(BuyerDetails)
)
