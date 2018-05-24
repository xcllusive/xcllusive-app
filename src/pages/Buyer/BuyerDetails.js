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
  updateBuyerLog,
  getBusinessBuyerLog,
  clearBuyerLog
} from '../../redux/ducks/buyerLog'

import { getBusiness } from '../../redux/ducks/business'

import { TypesModal, openModal } from '../../redux/ducks/modal'

import { OptionsPriceSelectBuyer } from '../../constants/OptionsPriceSelect'

import Wrapper from '../../components/content/Wrapper'

class BuyerDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      buyerLog: null,
      priceOptions: OptionsPriceSelectBuyer,
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
    this.props.getBusiness(this.props.match.params.idBusiness)
    this.props.getBusinessBuyerLog(
      this.props.match.params.idBuyer,
      this.props.match.params.idBusiness
    )
    this.props.getBusinessesFromBuyer(this.props.match.params.idBuyer)
  }

  componentWillReceiveProps (nextProps) {
    if (
      this.props.listBusinessBuyerLogList.length !==
        nextProps.listBusinessBuyerLogList.length &&
      nextProps.listBusinessBuyerLogList.length
    ) {
      this._selectLog(nextProps.listBusinessBuyerLogList[0])
    }
  }

  _selectLog = buyerLog => {
    const { id, followUp, text } = buyerLog
    this.props.setFieldValue('buyerLog_id', id)
    this.props.setFieldValue('buyerLog_followUp', followUp)
    this.props.setFieldValue('buyerLog_text', text)
  }

  _handleDateChange = date => {
    this.props.setFieldValue('buyerLog_followUp', date)
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

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
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
      listBusinessesFromBuyer,
      handleChange,
      values
    } = this.props

    const { priceOptions, buyerType } = this.state
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
                {values.buyerLog_id ? (
                  <Form>
                    <Form.Group>
                      <Form.Field width={11}>
                        <h5>Follow Up Date</h5>
                        <DatePicker
                          selected={moment(values.buyerLog_followUp)}
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
                          value={values.buyerLog_text}
                          onChange={handleChange}
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
              <Grid.Column width={16} textAlign="center">
                <Button
                  color="twitter"
                  onClick={() =>
                    this._selectLog({
                      id: 1,
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
              <Dimmer.Dimmable dimmed={isLoadingBuyer}>
                <Dimmer inverted active={isLoadingBuyer}>
                  <Loader>Loading</Loader>
                </Dimmer>
                {buyer ? (
                  <Fragment>
                    <Header
                      style={{ margin: 0 }}
                      as="h4"
                      content="Brokers Notes"
                    />
                    <Form>
                      <Form.Group>
                        <Form.TextArea
                          width={16}
                          // placeholder="there is no notes..."
                          name="buyerNotes"
                          value={values.buyerNotes}
                          onChange={handleChange}
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
                      name="backgroundInfo"
                      autoComplete="backgroundInfo"
                      value={values.backgroundInfo}
                      onChange={handleChange}
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
                      value={values.buyerType}
                      onChange={this._handleSelectChange}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field>
                    <Form.Select
                      label="Price From"
                      options={priceOptions}
                      name="priceOptions"
                      autoComplete="priceOptions"
                      value={values.priceOptions}
                      onChange={this._handleSelectChange}
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
  listBusinessesFromBuyer: PropTypes.array,
  handleChange: PropTypes.func,
  values: PropTypes.object
}

const mapPropsToValues = props => {
  return {
    buyerNotes: props.buyer ? props.buyer.buyerNotes : '',
    backgroundInfo: props.buyer ? props.buyer.backgroundInfo : '',
    buyerType: props.buyer ? props.buyer.buyerType : '',
    priceFrom: props.buyer ? props.buyer.priceFrom : '',
    priceTo: props.buyer ? props.buyer.priceTo : '',
    buyerLog_id: '',
    buyerLog_followUp: '',
    buyerLog_text: ''
  }
}

const mapStateToProps = state => ({
  buyer: state.buyer.get.object,
  isLoadingBuyer: state.buyer.get.isLoading,
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
