import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { withFormik } from 'formik'
import * as Yup from 'yup'

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
  Pagination,
  Label
} from 'semantic-ui-react'

import {
  getBuyer,
  getBusinessesFromBuyer,
  updateBuyer,
  getBusinessFromBuyer,
  getBuyersFromBusiness
} from '../../redux/ducks/buyer'
import {
  createNewLog,
  updateBuyerLog,
  getBusinessBuyerLog,
  clearBuyerLog,
  finaliseBuyerLog
} from '../../redux/ducks/buyerLog'
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
      activePage: null,
      buyerLog_id: null,
      buyerLog_followUp: null,
      buyerLog_text: null
    }
  }

  componentDidMount () {
    this.props.getBuyer(this.props.match.params.idBuyer)
    this.props.getBusinessFromBuyer(this.props.match.params.idBusiness)
    this.props.getBusinessBuyerLog(this.props.match.params.idBuyer, this.props.match.params.idBusiness, 5)
    this.props.getBusinessesFromBuyer(this.props.match.params.idBuyer)
    this.props.getBuyerRegister(1)
  }

  // static getDerivedStateFromProps (nextProps) {
  //   if (
  //     this.props.listBusinessBuyerLogList.length !==
  //     nextProps.listBusinessBuyerLogList.length
  //   ) {
  //     this._selectLog(nextProps.listBusinessBuyerLogList[0])
  //   }
  //   if (!this.props.values && nextProps.values) {
  //     this.setState({
  //       lastObjValues: this.props.values
  //     })
  //   }
  // }

  static getDerivedStateFromProps (nextProps) {
    if (nextProps.listBusinessBuyerLogList.length && !nextProps.isLoadingBusinessBuyerLogList) {
      const { newLog, id, followUp, text } = nextProps.listBusinessBuyerLogList[0]

      return {
        newLog: !!newLog,
        buyerLog_id: id,
        buyerLog_followUp: followUp,
        buyerLog_text: text
      }
    }
    return null
  }

  async componentWillUnmount () {
    this.props.clearBuyerLog()
    if (this.state.buyerLog_id) {
      this.props.setFieldValue('buyerLog_id', parseInt(this.state.buyerLog_id))
      if (this.props.values.buyerLog_followUp === '') {
        this.props.setFieldValue('buyerLog_followUp', this.state.buyerLog_followUp)
      }
      if (this.props.values.buyerLog_text === '') {
        this.props.setFieldValue('buyerLog_text', this.state.buyerLog_text)
      }
    }
    const updateBuyer = {
      ...this.props.values,
      id: parseInt(this.props.match.params.idBuyer)
    }

    if (this.props.values.newLog) {
      const newLog = {
        ...this.props.values,
        buyer_id: parseInt(this.props.match.params.idBuyer),
        business_id: this.props.match.params.idBusiness,
        buyerLog_followUp: moment(this.props.values.buyerLog_followUp).format('YYYY-MM-DD hh:mm:ss')
      }
      await this.props.createNewLog(newLog)
      await this.props.updateBuyer(updateBuyer)
    } else {
      await this.props.updateBuyer(updateBuyer)
      if (this.props.values && this.props.values.buyerLog_id > 0) await this.props.updateBuyerLog(this.props.values)
    }

    this.props.getBusinessBuyerLog(
      this.props.match.params.idBuyer,
      this.props.match.params.idBusiness,
      5,
      this.state.activePage
    )

    /* set this func here because can not refresh the previous page properly without it */
    await this.props.getBuyersFromBusiness(this.props.match.params.idBusiness)
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
      buyerObject: this.props.buyer,
      businessObject: this.props.business
    })
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  _handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage })
    this.props.getBusinessBuyerLog(this.props.match.params.idBuyer, this.props.match.params.idBusiness, 5, activePage)
  }

  _handleSubmit = async () => {
    if (this.state.buyerLog_id) {
      this.props.setFieldValue('buyerLog_id', parseInt(this.state.buyerLog_id))
      if (this.props.values.buyerLog_followUp === '') {
        this.props.setFieldValue('buyerLog_followUp', this.state.buyerLog_followUp)
      }
      if (this.props.values.buyerLog_text === '') {
        this.props.setFieldValue('buyerLog_text', this.state.buyerLog_text)
      }
    }
    const updateBuyer = {
      ...this.props.values,
      id: parseInt(this.props.match.params.idBuyer)
    }

    if (this.props.values.newLog) {
      const newLog = {
        ...this.props.values,
        buyer_id: parseInt(this.props.match.params.idBuyer),
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
    this.props.finaliseBuyerLog(this.props.match.params.idBusiness, this.props.match.params.idBuyer)
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
      typeOptions,
      errors,
      touched
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
                          onClick={() => (window.location.href = `mailto:${buyer.email}`)}
                        />
                      </Statistic.Value>
                    </Statistic>
                  </Statistic.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Statistic.Group horizontal widths={7} size="mini">
                    <Statistic color="blue">
                      <Statistic.Label style={{ padding: 5 }}>Phone 1:</Statistic.Label>
                      <Statistic.Value> {buyer.telephone1}</Statistic.Value>
                    </Statistic>
                    <Statistic color="blue">
                      <Statistic.Label style={{ padding: 5 }}>Phone 2:</Statistic.Label>
                      <Statistic.Value>{buyer.telephone2}</Statistic.Value>
                    </Statistic>
                  </Statistic.Group>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Statistic.Group widths={1} size="mini">
                    <Statistic color="blue">
                      <Statistic.Label style={{ padding: 5 }}>Address:</Statistic.Label>
                      <Statistic.Value>
                        {buyer.streetName}, {buyer.suburb} {buyer.postCode} {buyer.state}
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
              {business ? business.businessName : null}
            </Header>
          </Segment>
          <Segment style={{ backgroundColor: '#ecf4fb' }}>
            <Grid>
              <Grid.Row>
                <Grid.Column width={6}>
                  <Segment style={{ height: '100%' }}>
                    <Dimmer.Dimmable dimmed={isLoadingBuyer} style={{ height: '100%' }}>
                      <Dimmer inverted active={isLoadingBuyer}>
                        <Loader>Loading</Loader>
                      </Dimmer>
                      {buyer ? (
                        <Fragment>
                          <Header style={{ margin: 0 }} as="h4" content="Brokers Notes" />
                          <Form>
                            <Form.Group style={{ height: '80%' }}>
                              <Form.TextArea
                                style={{ height: '17em' }}
                                rows={0}
                                width={16}
                                name="buyerNotes"
                                value={values.buyerNotes}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            {buyer.brokersNotesDate ? (

                              <label style={{ color: 'grey' }}>{`Modified on ${moment(buyer.brokersNotesDate).format(
                                'MMMM YYYY'
                              )} by ${buyer.brokersNotesModifiedBy_id}`}</label>
                            ) : null}
                          </Form>
                        </Fragment>
                      ) : null}
                    </Dimmer.Dimmable>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={10}>
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
                              disabled={true}
                            />
                          </Form.Field>
                        </Form.Group>
                        <Form.Group>
                          <Form.Field width={16}>
                            <Form.TextArea
                              label="Business Type"
                              name="businessType"
                              autoComplete="businessType"
                              value={values.businessType}
                              onChange={handleChange}
                              disabled={true}
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
          </Segment>
          <Segment style={{ height: '300px', backgroundColor: '#d4d4d53b' }}>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Dimmer.Dimmable dimmed={isLoadingLogTable} style={{ height: '100%' }}>
                    <Dimmer inverted active={isLoadingLogTable}>
                      <Loader>Loading</Loader>
                    </Dimmer>
                    {values.buyerLog_id || this.state.buyerLog_id ? (
                      <Form>
                        <Form.Group>
                          <Form.Field width={16}>
                            <Form.TextArea
                              style={{ height: '150px' }}
                              label="Communication text (max. 1200 characteres)"
                              name="buyerLog_text"
                              autoComplete="buyerLog_text"
                              value={values.buyerLog_text ? values.buyerLog_text : this.state.buyerLog_text}
                              onChange={handleChange}
                            />
                          </Form.Field>
                          {errors.buyerLog_text && touched.buyerLog_text && (
                            <Label basic color="red" pointing content={errors.buyerLog_text} />
                          )}
                        </Form.Group>
                        <Form.Group>
                          <Form.Field style={{ marginLeft: '90%' }}>
                            <h5>Follow Up Date</h5>
                            <DatePicker
                              selected={
                                values.buyerLog_followUp
                                  ? moment(values.buyerLog_followUp)
                                  : moment(this.state.buyerLog_followUp)
                              }
                              onChange={this._handleDateChange}
                              form
                            />
                          </Form.Field>
                        </Form.Group>
                      </Form>
                    ) : null}
                  </Dimmer.Dimmable>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Button icon color="orange" onClick={() => this._finaliseLog()} size="small">
                  <Icon name="cut" />
                  Finalise Log
                </Button>
              </Grid.Column>
              <Grid.Column textAlign="right">
                <Button icon color="yellow" onClick={() => this._toggleModalEmailTemplates()} size="small">
                  <Icon name="mail" />
                  Send Email
                </Button>
                <Button
                  icon
                  color="twitter"
                  onClick={() =>
                    this._selectLog({
                      newLog: true,
                      id: 1,
                      followUp: moment().add(1, 'day'),
                      text: ' '
                    })
                  }
                  size="small"
                >
                  <Icon name="commenting" />
                  New Log
                </Button>
                {/* <Button
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
                </Button> */}
                <Button icon color="green" onClick={() => history.push(`/buyer/business/${business.id}`)} size="small">
                  <Icon name="backward" />
                  Save and Return to list
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Segment style={{ height: '300px', backgroundColor: '#ecf4fb' }}>
            <Grid style={{ marginTop: 0 }}>
              <Grid.Row style={{ padding: 0 }}>
                <Grid.Column>
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
                          <Table.Row key={businessBuyerLog.id} onClick={() => this._selectLog(businessBuyerLog)}>
                            <Table.Cell>{businessBuyerLog.text}</Table.Cell>
                            <Table.Cell>{moment(businessBuyerLog.followUp).format('DD/MM/YYYY - HH:mm')}</Table.Cell>
                            <Table.Cell>{businessBuyerLog.followUpStatus}</Table.Cell>
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
          </Segment>
        </Fragment>
        <Segment style={{ backgroundColor: '#d4d4d53b' }}>
          <Grid centered>
            <Grid.Row>
              <Grid.Column width={7}>
                <Dimmer.Dimmable dimmed={isLoadingPreviousBusiness}>
                  <Dimmer inverted active={isLoadingPreviousBusiness}>
                    <Loader>Loading</Loader>
                  </Dimmer>
                  <Table celled selectable compact striped size="small">
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell style={{ textAlign: 'center' }}>Previous Businesses</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {listBusinessesFromBuyer.map(businessesFromBuyer => (
                        <Table.Row key={businessesFromBuyer.business_id}>
                          <Table.Cell>{businessesFromBuyer.Business.businessName}</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </Dimmer.Dimmable>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Wrapper>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getBuyer,
      getBusinessFromBuyer,
      getBusinessBuyerLog,
      clearBuyerLog,
      openModal,
      getBusinessesFromBuyer,
      updateBuyer,
      updateBuyerLog,
      createNewLog,
      getBuyerRegister,
      finaliseBuyerLog,
      getBuyersFromBusiness
    },
    dispatch
  )

BuyerDetails.propTypes = {
  getBuyer: PropTypes.func,
  match: PropTypes.object,
  buyer: PropTypes.object,
  isLoadingBuyer: PropTypes.bool,
  getBusinessFromBuyer: PropTypes.func,
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
  finaliseBuyerLog: PropTypes.func,
  isLoadingBusinessBuyerLogList: PropTypes.bool,
  errors: PropTypes.object,
  touched: PropTypes.object,
  getBuyersFromBusiness: PropTypes.func
}

const mapPropsToValues = props => {
  return {
    buyerNotes: props.buyer ? props.buyer.buyerNotes : '',
    profile: props.buyer ? props.buyer.profile : '',
    businessType: props.buyer ? props.buyer.businessType : '',
    typeId: props.buyer ? props.buyer.typeId : null,
    priceFrom: props.buyer ? props.buyer.priceFrom : 0,
    priceTo: props.buyer ? props.buyer.priceTo : 0,
    buyerLog_id: '',
    buyerLog_followUp: '',
    buyerLog_text: '',
    newLog: false
    // brokersNotesDate: props.buyer ? moment(props.buyer.brokersNotesDate).format('MMMM YYYY') : '',
    // brokersNotesModifiedBy_id: props.buyer ? props.buyer.brokersNotesModifiedBy_id : ''
  }
}

const validationSchema = Yup.object().shape({
  buyerLog_text: Yup.string().max(10, 'Communication Text requires maximum of 1200 characteres')
})

const mapStateToProps = state => ({
  buyer: state.buyer.get.object,
  isLoadingBuyer: state.buyer.get.isLoading,
  business: state.buyer.getBusinessFromBuyer.object,
  isLoadingUpdate: state.buyerLog.update.isLoading,
  listBusinessBuyerLogList: state.buyerLog.getBusBuyLog.array,
  isLoadingLogTable: state.buyerLog.getBusBuyLog.isLoading,
  pagesBusinessBuyerLogList: state.buyerLog.getBusBuyLog.pages,
  activePageBusinessBuyerLogList: state.buyerLog.getBusBuyLog.activePage,
  listBusinessesFromBuyer: state.buyer.getBusinessesFromBuyer.array,
  isLoadingPreviousBusiness: state.buyer.getBusinessesFromBuyer.isLoading,
  typeOptions: state.buyerRegister.get.type.array,
  isLoadingBusinessBuyerLogList: state.buyerLog.getBusBuyLog.isLoading
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    enableReinitialize: true
  })(BuyerDetails)
)
