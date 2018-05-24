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

import { getBuyer, getBusinessesFromBuyer } from '../../redux/ducks/buyer'
import {
  getLog,
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
      buyerLog: null,
      priceOptions: [
        { key: '0', text: 'Any', value: 'Any' },
        { key: '1', text: '100k', value: '100.000' },
        { key: '2', text: '200k', value: '200.000' },
        { key: '3', text: '300k', value: '300.000' },
        { key: '4', text: '400k', value: '400.000' },
        { key: '5', text: '500k', value: '500.000' },
        { key: '6', text: '600k', value: '600.000' },
        { key: '7', text: '700k', value: '700.000' },
        { key: '8', text: '800k', value: '800.000' },
        { key: '9', text: '900k', value: '900.000' },
        { key: '10', text: '1M', value: '1,000.000' },
        { key: '11', text: '1.5M', value: '1,500.000' },
        { key: '12', text: '2M', value: '2,000.000' },
        { key: '13', text: '2.5M', value: '2,500.000' },
        { key: '14', text: '3M', value: '3,000.000' },
        { key: '15', text: '3M +', value: '3M+' }
      ],
      buyerType: [
        { key: '0', text: 'General', value: 'General' },
        { key: '1', text: 'Private Buyer', value: 'Private Buyer' },
        { key: '2', text: 'Industry Buyer', value: 'Industry Buyer' },
        { key: '3', text: 'Investal', value: 'Investal' },
        { key: '4', text: 'Investment Company', value: 'Investment Company' }
      ],
      buyerDetails: null
    }
  }

  componentDidMount () {
    this.props.getBuyer(this.props.match.params.idBuyer)
    this.props.getLog(this.props.match.params.idBuyer)
    this.props.getBusiness(this.props.match.params.idBusiness)
    this.props.getBusinessBuyerLog(
      this.props.match.params.idBuyer,
      this.props.match.params.idBusiness
    )
    this.props.getBusinessesFromBuyer(this.props.match.params.idBuyer)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.listBusinessBuyerLogList.length) {
      this._selectLog(nextProps.listBusinessBuyerLogList[0])
    }
  }

  _selectLog = buyerLog => {
    this.setState({ buyerLog })
  }

  _handleDateChange = date => {
    this.props.setFieldValue('date', date)
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
      isLoadingBuyer,
      business,
      isLoadingUpdate,
      handleSubmit,
      isSubmitting,
      isValid,
      listBusinessBuyerLogList,
      history,
      buyer,
      listBusinessesFromBuyer
    } = this.props

    const { priceOptions, buyerType, buyerLog } = this.state
    return (
      <Wrapper>
        {buyer ? (
          <Fragment>
            <Statistic.Group widths={7} size="mini">
              <Statistic color="orange">
                <Statistic.Value>{buyer.firstName}</Statistic.Value>
                <Statistic.Label>Buyer</Statistic.Label>
              </Statistic>
              <Statistic color="blue">
                <Statistic.Value>{buyer.email}</Statistic.Value>
                <Statistic.Label>Email</Statistic.Label>
              </Statistic>
              <Statistic color="blue">
                <Statistic.Value>{buyer.telephone1}</Statistic.Value>
                <Statistic.Label>Phone 1</Statistic.Label>
              </Statistic>
              <Statistic color="blue">
                <Statistic.Value>{buyer.telephone1}</Statistic.Value>
                <Statistic.Label>Phone 2</Statistic.Label>
              </Statistic>
            </Statistic.Group>
            <Statistic.Group widths={1} size="mini">
              <Statistic color="blue">
                <Statistic.Value>
                  {buyer.streetName}, {buyer.suburb} {buyer.postCode}{' '}
                  {buyer.state}
                </Statistic.Value>
                <Statistic.Label>Address</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Fragment>
        ) : null}
        <Fragment>
          <Segment size="mini" inverted color="grey">
            <Header inverted textAlign="center" size="large">
              {business.businessName}
            </Header>
          </Segment>
          <Grid celled="internally" divided>
            <Grid.Row>
              <Grid.Column width={5}>
                {buyerLog ? (
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
                    </Form.Group>
                    <Form.Group>
                      <Form.Field width={16}>
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
                    </Form.Group>
                  </Form>
                ) : null}
              </Grid.Column>
              <Grid.Column width={11}>
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
                        onClick={() => this._selectLog(businessBuyerLog)}
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
          <Grid celled="internally" divided centered>
            <Grid.Row>
              <Grid.Column width={7}>
                <Button
                  color="twitter"
                  onClick={() =>
                    this._selectLog({
                      followUp: moment().add(1, 'day'),
                      text: ''
                    })
                  }
                  size="small"
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
                  size="small"
                >
                  <Icon name="save" />
                  Save
                </Button>
                <Button
                  color="yellow"
                  // disabled={isSubmitting || !isValid}
                  // loading={}
                  onClick={() => this._toggleModalEmailTemplates()}
                  size="small"
                >
                  <Icon name="mail" />
                  Send Email
                </Button>
                <Button
                  color="green"
                  onClick={() => history.push(`/buyer/business/${business.id}`)}
                  size="small"
                >
                  <Icon name="backward" />
                  Return to list
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Fragment>
        <Grid celled="internally" divided>
          <Grid.Row>
            <Grid.Column width={4}>
              <Dimmer.Dimmable
                dimmed={isLoadingBuyer}
                style={{ height: '80vh' }}
              >
                <Dimmer inverted active={isLoadingBuyer}>
                  <Loader>Loading</Loader>
                </Dimmer>
                {buyer ? (
                  <Fragment>
                    <Header as="h4" content="Brokers Notes" />
                    <Form>
                      <Form.Group>
                        <Form.TextArea
                          width={16}
                          // placeholder="there is no notes..."
                          name="buyerNotes"
                          value={buyer.buyerNotes}
                          onChange={(e, data) => {
                            this.setState({
                              buyer: {
                                ...buyer,
                                buyerNotes: data.value
                              }
                            })
                          }}
                        />
                      </Form.Group>
                    </Form>
                  </Fragment>
                ) : null}
              </Dimmer.Dimmable>
            </Grid.Column>
            <Grid.Column width={4}>
              <Table color="blue" celled inverted size="small" compact>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Previous Businesses</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {listBusinessesFromBuyer.map(businessesFromBuyer => (
                    <Table.Row active key={businessesFromBuyer.business_id}>
                      <Table.Cell>
                        {businessesFromBuyer.Business.businessName}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column width={8}>
              <Form>
                <Form.Group>
                  <Form.Field width={16}>
                    <Form.TextArea
                      label="Buyer Background Info"
                      name="text"
                      autoComplete="text"
                      //  value={this.state.buyerLog.text}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field width={16}>
                    <Form.TextArea
                      label="Business Type"
                      name="type"
                      autoComplete="type"
                      //  value={this.state.buyerLog.text}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Form.Select
                      label="Buyer Type"
                      options={buyerType}
                      name="buyerType"
                      autoComplete="buyerType"
                      // value={values.businessSource}
                      // onChange={buyerType}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field>
                    <Form.Select
                      required
                      label="Price From"
                      options={priceOptions}
                      name="priceOptions"
                      autoComplete="priceOptions"
                      // value={values.businessSource}
                      // onChange={priceOptions}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Form.Select
                      label="Price To"
                      options={priceOptions}
                      name="priceOptions"
                      autoComplete="priceOptions"
                      // value={values.businessSource}
                      // onChange={priceOptions}
                    />
                  </Form.Field>
                </Form.Group>
              </Form>
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
      clearBuyerLog,
      openModal,
      getBusinessesFromBuyer
    },
    dispatch
  )

BuyerDetails.propTypes = {
  getBuyer: PropTypes.func,
  match: PropTypes.object,
  buyer: PropTypes.object,
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
  openModal: PropTypes.func,
  history: PropTypes.object,
  getBusinessesFromBuyer: PropTypes.func,
  listBusinessesFromBuyer: PropTypes.array
}

const mapPropsToValues = props => {}

const mapStateToProps = state => ({
  buyer: state.buyer.get.object,
  isLoadingBuyer: state.buyer.get.isLoading,
  listBuyerLogList: state.buyerLog.get.array,
  business: state.business.get.object,
  isLoadingUpdate: state.buyerLog.update.isLoading,
  listBusinessBuyerLogList: state.buyerLog.getBusBuyLog.array,
  listBusinessesFromBuyer: state.buyer.getBusinessesFromBuyer.array
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withFormik({
    mapPropsToValues,
    handleSubmit,
    enableReinitialize: true
  })(BuyerDetails)
)
