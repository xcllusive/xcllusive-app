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
  Button
} from 'semantic-ui-react'

import { getBuyer } from '../../redux/ducks/buyer'
import {
  getLog,
  updateBuyerLog,
  getBusinessBuyerLog,
  clearBuyerLog
} from '../../redux/ducks/buyerLog'
import { getBusiness } from '../../redux/ducks/business'

import Wrapper from '../../components/content/Wrapper'

class BuyerDetailsCM extends Component {
  constructor (props) {
    super(props)
    this.state = {
      buyerLog: null
    }
  }
  componentWillMount () {
    this.props.getBuyer(this.props.match.params.id)
    this.props.getLog(this.props.match.params.id)
  }

  _getBusinessObject = buyerLog => {
    this.props.getBusiness(buyerLog.business_id)
    this.setState({ buyerLog })
    this.props.getBusinessBuyerLog(this.props.buyer.id, buyerLog.business_id)
  }

  _getBusinessObject2 = buyerLog => {
    this.setState({ buyerLog })
  }

  _handleDateChange = date => {
    this.props.setFieldValue('date', date)
  }

  _backToSearch = business => {
    // this.props.clearBuyerLog()
    // this.props.getBusiness(0)
  }

  _selectLog = buyerLog => {
    this.setState({ buyerLog })
  }

  render () {
    const {
      listBuyerLogList,
      isLoadingBuyer,
      business,
      isLoadingUpdate,
      handleSubmit,
      isSubmitting,
      isValid,
      listBusinessBuyerLogList,
      isLoadingBusBuyLog,
      isLoadingBuyerLog
    } = this.props
    const { buyerLog } = this.state
    return (
      <Wrapper>
        <Grid celled="internally" divided>
          <Grid.Row>
            <Grid.Column width={5}>
              {this.props.buyer ? (
                <Header as="h3" content="Buyer Details" />
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
                      <Form.Input
                        width={8}
                        label="First Name"
                        readOnly
                        value={this.props.buyer.firstName}
                      />
                      <Form.Input
                        width={8}
                        label="Last Name"
                        readOnly
                        value={this.props.buyer.surname}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Input
                        width={16}
                        label="Email"
                        readOnly
                        icon={
                          <Icon
                            name="mail"
                            inverted
                            circular
                            link
                            onClick={() =>
                              window.open(`mailto:${this.props.buyer.email}`)
                            }
                          />
                        }
                        value={this.props.buyer.email}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Input
                        width={16}
                        label="Street"
                        readOnly
                        value={this.props.buyer.streetName}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Input
                        width={8}
                        label="Suburb"
                        readOnly
                        value={this.props.buyer.suburb}
                      />
                      <Form.Input
                        width={4}
                        label="State"
                        readOnly
                        value={this.props.buyer.state}
                      />
                      <Form.Input
                        width={4}
                        label="Post Code"
                        readOnly
                        value={this.props.buyer.postCode}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Input
                        width={16}
                        label="Telephone"
                        readOnly
                        value={this.props.buyer.telephone1}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Input
                        width={8}
                        label="Source"
                        readOnly
                        value={this.props.buyer.BusinessSource.label}
                      />
                      <Form.Input
                        width={8}
                        label="Price To"
                        readOnly
                        value={this.props.buyer.priceTo}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.TextArea
                        width={16}
                        label="Notes"
                        readOnly
                        placeholder="there is no notes..."
                        value={this.props.buyer.buyerNotes}
                      />
                    </Form.Group>
                  </Form>
                ) : null}
              </Dimmer.Dimmable>
            </Grid.Column>
            <Grid.Column width={11}>
              <Dimmer.Dimmable
                dimmed={isLoadingBuyerLog}
                style={{ height: '80vh' }}
              >
                <Dimmer inverted active={isLoadingBuyerLog}>
                  <Loader>Loading</Loader>
                </Dimmer>
                {listBuyerLogList ? (
                  // business.businessName == null &&
                  // buyerLog == null
                  <Fragment>
                    <Header>Attached Business Log</Header>
                    <Table
                      color="blue"
                      celled
                      inverted
                      selectable
                      size="small"
                      compact
                    >
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Business Name</Table.HeaderCell>
                          <Table.HeaderCell>Log</Table.HeaderCell>
                          <Table.HeaderCell>Date</Table.HeaderCell>
                          <Table.HeaderCell>Status</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {listBuyerLogList.map(buyerLogList => (
                          <Table.Row
                            active
                            key={buyerLogList.id}
                            onClick={() =>
                              this._getBusinessObject(buyerLogList)
                            }
                          >
                            <Table.Cell>
                              {buyerLogList.Business.businessName}
                            </Table.Cell>
                            <Table.Cell>{buyerLogList.text}</Table.Cell>
                            <Table.Cell>
                              {moment(buyerLogList.followUp).format(
                                'DD/MM/YYYY - HH:mm'
                              )}
                            </Table.Cell>
                            <Table.Cell>
                              {buyerLogList.followUpStatus}
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  </Fragment>
                ) : null}
              </Dimmer.Dimmable>
              <Dimmer.Dimmable
                dimmed={isLoadingBusBuyLog}
                style={{ height: '80vh' }}
              >
                <Dimmer inverted active={isLoadingBusBuyLog}>
                  <Loader>Loading</Loader>
                </Dimmer>
                {business.businessName && buyerLog ? (
                  <Fragment>
                    <Segment size="mini" inverted color="grey">
                      <Header inverted textAlign="center">
                        {business.businessName}
                      </Header>
                    </Segment>
                    <Table
                      color="blue"
                      celled
                      inverted
                      selectable
                      size="small"
                      compact
                    >
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
                            onClick={() =>
                              this._getBusinessObject2(businessBuyerLog)
                            }
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
                    <Grid celled="internally" divided>
                      <Grid.Row>
                        <Grid.Column width={8}>
                          <Fragment>
                            <Form>
                              <Form.Group>
                                <Form.Field width={11}>
                                  <h5>Follow Up Date</h5>
                                  <DatePicker
                                    selected={moment(buyerLog.followUp)}
                                    onChange={this._handleDateChange}
                                    popperPlacement="top-end"
                                    form
                                  />
                                </Form.Field>
                                <Form.Field
                                  width={5}
                                  style={{ alignSelf: 'flex-end' }}
                                >
                                  <Form.Button
                                    floated="right"
                                    size="small"
                                    color="twitter"
                                    style={{ alignSelf: 'flex-end' }}
                                    onClick={() =>
                                      this._selectLog({
                                        followUp: moment().add(1, 'day'),
                                        text: ''
                                      })
                                    }
                                  >
                                    <Icon name="commenting" />
                                    New Log
                                  </Form.Button>
                                </Form.Field>
                              </Form.Group>
                              <Form.Group>
                                <Form.Field width={12}>
                                  <Form.TextArea
                                    required
                                    label="Communication text"
                                    name="text"
                                    autoComplete="text"
                                    value={buyerLog.text}
                                    onChange={(e, data) => {
                                      this.setState({
                                        buyerLog: {
                                          ...buyerLog,
                                          text: data.value
                                        }
                                      })
                                    }}
                                  />
                                </Form.Field>
                                <Form.Field
                                  width={4}
                                  style={{ alignSelf: 'flex-end' }}
                                >
                                  <Form.Button
                                    floated="right"
                                    type="submit"
                                    color="red"
                                    disabled={isSubmitting || !isValid}
                                    loading={isLoadingUpdate}
                                    onClick={handleSubmit}
                                  >
                                    <Icon name="save" />
                                    Save
                                  </Form.Button>
                                </Form.Field>
                              </Form.Group>
                            </Form>
                          </Fragment>
                        </Grid.Column>
                        <Grid.Column width={8}>
                          <Table
                            color="blue"
                            celled
                            inverted
                            selectable
                            size="small"
                            compact
                          >
                            <Table.Header>
                              <Table.Row>
                                <Table.HeaderCell>
                                  Other Business
                                </Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>
                            <Table.Body>
                              {listBuyerLogList.map(buyerLog => (
                                <Table.Row
                                  active
                                  key={buyerLog.id}
                                  onClick={() =>
                                    this._getBusinessObject(buyerLog)
                                  }
                                >
                                  <Table.Cell>
                                    {buyerLog.Business.businessName}
                                  </Table.Cell>
                                </Table.Row>
                              ))}
                            </Table.Body>
                          </Table>
                        </Grid.Column>
                      </Grid.Row>
                      <Button
                        size="small"
                        color="green"
                        onClick={() => this._backToSearch(null)}
                      >
                        <Icon name="backward" />
                        Back to Attached Logs
                      </Button>
                    </Grid>
                  </Fragment>
                ) : null}
              </Dimmer.Dimmable>
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
      updateBuyerLog,
      getBusinessBuyerLog,
      clearBuyerLog
    },
    dispatch
  )

BuyerDetailsCM.propTypes = {
  getBuyer: PropTypes.func,
  match: PropTypes.object,
  buyer: PropTypes.object,
  listBuyerLogList: PropTypes.array,
  getLog: PropTypes.func,
  isLoadingBuyer: PropTypes.bool,
  getBusiness: PropTypes.func,
  business: PropTypes.object,
  setFieldValue: PropTypes.func,
  updateBuyerLog: PropTypes.func,
  handleSubmit: PropTypes.func,
  isLoadingUpdate: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  listBusinessBuyerLogList: PropTypes.array,
  getBusinessBuyerLog: PropTypes.func,
  clearBuyerLog: PropTypes.func,
  isLoadingBusBuyLog: PropTypes.bool,
  isLoadingBuyerLog: PropTypes.bool
}

const mapPropsToValues = props => {}

const mapStateToProps = state => ({
  buyer: state.buyer.get.object,
  isLoadingBuyer: state.buyer.get.isLoading,
  listBuyerLogList: state.buyerLog.get.array,
  isLoadingBuyerLog: state.buyerLog.get.isLoading,
  business: state.business.get.object,
  isLoadingUpdate: state.buyerLog.update.isLoading,
  listBusinessBuyerLogList: state.buyerLog.getBusBuyLog.array,
  isLoadingBusBuyLog: state.buyerLog.getBusBuyLog.isLoading
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withFormik({
    mapPropsToValues,
    handleSubmit,
    enableReinitialize: true
  })(BuyerDetailsCM)
)
