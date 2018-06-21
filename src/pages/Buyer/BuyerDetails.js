import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { withFormik } from 'formik'

import { mapArrayToValuesForDropdown } from '../../utils/sharedFunctionArray'

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
  Statistic,
  Pagination
} from 'semantic-ui-react'

import {
  getBuyer,
  getBusinessesFromBuyer,
  updateBuyer
} from '../../redux/ducks/buyer'
import {
  createNewLog,
  updateBuyerLog,
  getBusinessBuyerLog,
  clearBuyerLog,
  finaliseBuyerLog
} from '../../redux/ducks/buyerLog'
import { getBusiness } from '../../redux/ducks/business'
import { TypesModal, openModal } from '../../redux/ducks/modal'
import { OptionsPriceSelectBuyer } from '../../constants/OptionsPriceSelect'
import { getBuyerRegister } from '../../redux/ducks/buyerRegister'

import Wrapper from '../../components/content/Wrapper'

class BuyerDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      buyerLog: null,
      priceOptions: OptionsPriceSelectBuyer,
      // buyerType: [
      //   { key: '0', text: 'General', value: 'General' },
      //   { key: '1', text: 'Private Buyer', value: 'Private Buyer' },
      //   { key: '2', text: 'Industry Buyer', value: 'Industry Buyer' },
      //   { key: '3', text: 'Investal', value: 'Investal' },
      //   { key: '4', text: 'Investment Company', value: 'Investment Company' }
      // ],
      buyerDetails: null,
      newLog: false,
      activePage: null
    }
  }

  componentDidMount () {
    this.props.getBuyer(this.props.match.params.idBuyer)
    this.props.getBusiness(this.props.match.params.idBusiness)
    this.props.getBusinessBuyerLog(
      this.props.match.params.idBuyer,
      this.props.match.params.idBusiness,
      5
    )
    this.props.getBusinessesFromBuyer(this.props.match.params.idBuyer)
    this.props.getBuyerRegister(1)
  }

  componentWillReceiveProps (nextProps) {
    if (
      this.props.listBusinessBuyerLogList.length !==
      nextProps.listBusinessBuyerLogList.length
    ) {
      this._selectLog(nextProps.listBusinessBuyerLogList[0])
    }
  }

  componentWillUnmount () {
    this.props.clearBuyerLog()
  }

  _selectLog = buyerLog => {
    const { newLog, id, followUp, text } = buyerLog

    if (newLog) this.props.setFieldValue('newLog', true)
    else this.props.setFieldValue('newLog', false)

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
      buyerId: this.props.match.params.idBuyer,
      email: this.props.buyer.email
    })
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  _handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage })
    this.props.getBusinessBuyerLog(
      this.props.match.params.idBuyer,
      this.props.match.params.idBusiness,
      5,
      activePage
    )
  }

  _handleSubmit = async () => {
    const updateBuyer = {
      ...this.props.values,
      id: this.props.match.params.idBuyer
    }

    if (this.props.values.newLog) {
      const newLog = {
        ...this.props.values,
        buyer_id: this.props.match.params.idBuyer,
        business_id: this.props.match.params.idBusiness
      }
      await this.props.createNewLog(newLog)
      await this.props.updateBuyer(updateBuyer)
    } else {
      await this.props.updateBuyer(updateBuyer)
      await this.props.updateBuyerLog(this.props.values)
    }

    this.props.getBusinessBuyerLog(
      this.props.match.params.idBuyer,
      this.props.match.params.idBusiness,
      5,
      this.state.activePage
    )
  }

  _finaliseLog = () => {
    this.props.finaliseBuyerLog(
      this.props.match.params.idBusiness,
      this.props.match.params.idBuyer
    )
    this.props.getBusinessBuyerLog(
      this.props.match.params.idBuyer,
      this.props.match.params.idBusiness,
      5,
      this.state.activePage
    )
  }

  render () {
    const {
      isLoadingBuyer,
      business,
      isLoadingUpdate,
      isSubmitting,
      isValid,
      listBusinessBuyerLogList,
      history,
      buyer,
      listBusinessesFromBuyer,
      handleChange,
      values,
      pagesBusinessBuyerLogList,
      activePageBusinessBuyerLogList,
      isLoadingPreviousBusiness,
      isLoadingLogTable,
      typeOptions
    } = this.props

    const { priceOptions } = this.state
    return (
      <Wrapper>
        {buyer ? (
          <Fragment>
            <Grid style={{ marginTop: 0 }}>
              <Grid.Row style={{ padding: 0 }}>
                <Grid.Column width={7}>
                  <Statistic.Group horizontal widths={7} size="mini">
                    <Statistic color="orange">
                      <Statistic.Value>
                        {buyer.firstName} {buyer.surname}
                      </Statistic.Value>
                    </Statistic>
                    <Statistic color="blue">
                      <Statistic.Value>
                        {buyer.email}
                        <Icon
                          style={{ padding: 5 }}
                          link
                          name="mail"
                          onClick={() =>
                            (window.location.href = `mailto:${buyer.email}`)
                          }
                        />
                      </Statistic.Value>
                    </Statistic>
                  </Statistic.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Statistic.Group horizontal widths={7} size="mini">
                    <Statistic color="blue">
                      <Statistic.Label style={{ padding: 5 }}>
                        Phone 1:
                      </Statistic.Label>
                      <Statistic.Value> {buyer.telephone1}</Statistic.Value>
                    </Statistic>
                    <Statistic color="blue">
                      <Statistic.Label style={{ padding: 5 }}>
                        Phone 2:
                      </Statistic.Label>
                      <Statistic.Value>{buyer.telephone2}</Statistic.Value>
                    </Statistic>
                  </Statistic.Group>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Statistic.Group widths={1} size="mini">
                    <Statistic color="blue">
                      <Statistic.Label style={{ padding: 5 }}>
                        Address:
                      </Statistic.Label>
                      <Statistic.Value>
                        {buyer.streetName}, {buyer.suburb} {buyer.postCode}{' '}
                        {buyer.state}
                      </Statistic.Value>
                    </Statistic>
                  </Statistic.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Fragment>
        ) : null}
        <Fragment>
          <Segment size="mini" inverted color="grey" style={{ margin: 0 }}>
            <Header inverted textAlign="center" size="large">
              {business.businessName}
            </Header>
          </Segment>
          <Grid celled="internally" divided centered>
            <Grid.Row>
              <Grid.Column width={16} textAlign="right">
                <Button
                  icon
                  color="twitter"
                  onClick={() =>
                    this._selectLog({
                      newLog: true,
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
                  icon
                  type="submit"
                  color="red"
                  disabled={isSubmitting || !isValid}
                  loading={isLoadingUpdate}
                  onClick={() => this._handleSubmit(values)}
                  size="small"
                >
                  <Icon name="save" />
                  Save
                </Button>
                <Button
                  icon
                  color="orange"
                  // disabled={isSubmitting || !isValid}
                  // loading={}
                  onClick={() => this._finaliseLog()}
                  size="small"
                >
                  <Icon name="cut" />
                  Finalise Log
                </Button>
                <Button
                  icon
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
                  icon
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
          <Grid style={{ marginTop: 0 }}>
            <Grid.Row style={{ padding: 0 }}>
              <Grid.Column width={5}>
                <Segment style={{ height: '226px' }}>
                  <Dimmer.Dimmable
                    dimmed={isLoadingLogTable}
                    style={{ height: '100%' }}
                  >
                    <Dimmer inverted active={isLoadingLogTable}>
                      <Loader>Loading</Loader>
                    </Dimmer>
                    {values.buyerLog_id ? (
                      <Form>
                        <Form.Group>
                          <Form.Field width={16}>
                            <Form.TextArea
                              label="Communication text"
                              name="buyerLog_text"
                              autoComplete="buyerLog_text"
                              value={values.buyerLog_text}
                              onChange={handleChange}
                            />
                          </Form.Field>
                        </Form.Group>
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
                      </Form>
                    ) : null}
                  </Dimmer.Dimmable>
                </Segment>
              </Grid.Column>
              <Grid.Column width={11}>
                <Dimmer.Dimmable dimmed={isLoadingLogTable}>
                  <Dimmer inverted active={isLoadingLogTable}>
                    <Loader>Loading</Loader>
                  </Dimmer>
                  <Table celled selectable compact striped size="small">
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
                  <Pagination
                    prevItem={null}
                    nextItem={null}
                    size="mini"
                    onPageChange={this._handlePaginationChange}
                    defaultActivePage={activePageBusinessBuyerLogList}
                    totalPages={pagesBusinessBuyerLogList}
                  />
                </Dimmer.Dimmable>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Fragment>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <Dimmer.Dimmable dimmed={isLoadingPreviousBusiness}>
                <Dimmer inverted active={isLoadingPreviousBusiness}>
                  <Loader>Loading</Loader>
                </Dimmer>
                <Table celled selectable compact striped size="small">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Previous Businesses</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {listBusinessesFromBuyer.map(businessesFromBuyer => (
                      <Table.Row key={businessesFromBuyer.business_id}>
                        <Table.Cell>
                          {businessesFromBuyer.Business.businessName}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </Dimmer.Dimmable>
            </Grid.Column>
            <Grid.Column width={4}>
              <Segment style={{ height: '100%' }}>
                <Dimmer.Dimmable
                  dimmed={isLoadingBuyer}
                  style={{ height: '100%' }}
                >
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
                      <Form style={{ height: '100%' }}>
                        <Form.Group style={{ height: '100%' }}>
                          <Form.TextArea
                            style={{ height: '90%' }}
                            rows={0}
                            width={16}
                            name="buyerNotes"
                            value={values.buyerNotes}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Form>
                    </Fragment>
                  ) : null}
                </Dimmer.Dimmable>
              </Segment>
            </Grid.Column>
            <Grid.Column width={8}>
              <Segment>
                <Dimmer.Dimmable dimmed={isLoadingBuyer}>
                  <Dimmer inverted active={isLoadingBuyer}>
                    <Loader>Loading</Loader>
                  </Dimmer>
                  <Form>
                    <Form.Group>
                      <Form.Field width={16}>
                        <Form.TextArea
                          label="Buyer Profile"
                          name="profile"
                          autoComplete="profile"
                          value={values.profile}
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
                          options={mapArrayToValuesForDropdown(typeOptions)}
                          name="typeId"
                          autoComplete="typeId"
                          value={values.typeId}
                          onChange={this._handleSelectChange}
                        />
                      </Form.Field>
                    </Form.Group>
                    <Form.Group>
                      <Form.Field>
                        <Form.Select
                          label="Price From"
                          options={priceOptions}
                          name="priceFrom"
                          autoComplete="priceFrom"
                          value={values.priceFrom}
                          onChange={this._handleSelectChange}
                        />
                      </Form.Field>
                      <Form.Field>
                        <Form.Select
                          label="Price To"
                          options={priceOptions}
                          name="priceTo"
                          autoComplete="priceTo"
                          value={values.priceTo}
                          onChange={this._handleSelectChange}
                        />
                      </Form.Field>
                    </Form.Group>
                  </Form>
                </Dimmer.Dimmable>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Wrapper>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getBuyer,
      getBusiness,
      getBusinessBuyerLog,
      clearBuyerLog,
      openModal,
      getBusinessesFromBuyer,
      updateBuyer,
      updateBuyerLog,
      createNewLog,
      getBuyerRegister,
      finaliseBuyerLog
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
  updateBuyerDetails: PropTypes.func,
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
  values: PropTypes.object,
  updateBuyer: PropTypes.func,
  createNewLog: PropTypes.func,
  updateBuyerLog: PropTypes.func,
  pagesBusinessBuyerLogList: PropTypes.number,
  activePageBusinessBuyerLogList: PropTypes.number,
  isLoadingPreviousBusiness: PropTypes.bool,
  isLoadingLogTable: PropTypes.bool,
  getBuyerRegister: PropTypes.func,
  typeOptions: PropTypes.array,
  finaliseBuyerLog: PropTypes.func
}

const mapPropsToValues = props => {
  return {
    buyerNotes: props.buyer ? props.buyer.buyerNotes : '',
    profile: props.buyer ? props.buyer.profile : '',
    typeId: props.buyer ? props.buyer.typeId : null,
    priceFrom: props.buyer ? props.buyer.priceFrom : '',
    priceTo: props.buyer ? props.buyer.priceTo : '',
    buyerLog_id: '',
    buyerLog_followUp: '',
    buyerLog_text: '',
    newLog: false
  }
}

const mapStateToProps = state => ({
  buyer: state.buyer.get.object,
  isLoadingBuyer: state.buyer.get.isLoading,
  business: state.business.get.object,
  isLoadingUpdate: state.buyerLog.update.isLoading,
  listBusinessBuyerLogList: state.buyerLog.getBusBuyLog.array,
  isLoadingLogTable: state.buyerLog.getBusBuyLog.isLoading,
  pagesBusinessBuyerLogList: state.buyerLog.getBusBuyLog.pages,
  activePageBusinessBuyerLogList: state.buyerLog.getBusBuyLog.activePage,
  listBusinessesFromBuyer: state.buyer.getBusinessesFromBuyer.array,
  isLoadingPreviousBusiness: state.buyer.getBusinessesFromBuyer.isLoading,
  typeOptions: state.buyerRegister.get.type.array
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    enableReinitialize: true
  })(BuyerDetails)
)
