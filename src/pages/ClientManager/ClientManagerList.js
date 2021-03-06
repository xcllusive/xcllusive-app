import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import numeral from 'numeral'

import {
  Table,
  Icon,
  Button,
  Input,
  Grid,
  Dimmer,
  Loader,
  Pagination,
  Message,
  Form,
  Label,
  Segment,
  Divider,
  Checkbox
} from 'semantic-ui-react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'

import { TypesModal, openModal, closeModal } from '../../redux/ducks/modal'
import { getBuyers, createBuyer, updateBuyer, checkCaReminder } from '../../redux/ducks/buyer'
import { getBusinesses, getBusiness, createBusiness, updateBusiness } from '../../redux/ducks/business'
import { getLog, clearBuyerLog } from '../../redux/ducks/buyerLog'
import styled from 'styled-components'
import {
  enquiryBusiness,
  sendCa,
  sendIm,
  caReceived,
  emailBuyer,
  requestOwnersApproval,
  sendEnquiryToOwner,
  sendEmailCtcBusiness,
  sendSms
} from '../../redux/ducks/clientManager'

import { getEmailTemplate } from '../../redux/ducks/emailTemplates'

import Wrapper from '../../components/content/Wrapper'
// import { ctcLogoEmail } from '../../constants/images'

const CheckboxFormatted = styled.div`
  padding-right: 1em;
`

class ClientManagerList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      buyer: null,
      business: null,
      buyerLog: null,
      inputSearchBuyer: '',
      inputSearchBusiness: '',
      showMsgBusiness: false,
      ownersApprovalReceived: false,
      createdBuyer: false,
      isSentCa: false,
      isReceivedCa: false
    }
  }

  _convertHtmlToRightText = html => {
    let htmlConverted = html.replace(/<style([\s\S]*?)<\/style>/gi, '')
    htmlConverted = htmlConverted.replace(/<script([\s\S]*?)<\/script>/gi, '')
    htmlConverted = htmlConverted.replace(/<\/div>/gi, '\n')
    htmlConverted = htmlConverted.replace(/<\/li>/gi, '\n')
    htmlConverted = htmlConverted.replace(/<li>/gi, '  *  ')
    htmlConverted = htmlConverted.replace(/<\/ul>/gi, '\n')
    htmlConverted = htmlConverted.replace(/<\/p>/gi, '\n')
    htmlConverted = htmlConverted.replace(/<br\s*[\\/]?>/gi, '\n')
    htmlConverted = htmlConverted.replace(/<[^>]+>/gi, '')

    return encodeURIComponent(htmlConverted)
  }

  componentDidMount () {
    this.props.checkCaReminder()
  }

  componentDidUpdate () {
    if (this.props.isCreatedBuyer && !this.state.createdBuyer) {
      if (this.timer) clearTimeout(this.timer)

      this.setState({
        inputSearchBuyer: `B${this.props.newBuyerObject.id}`,
        buyer: null,
        createdBuyer: true
      })
      if (this.props.newBuyerObject && this.props.newBuyerObject.id !== '') {
        this.timer = setTimeout(() => this.props.getBuyers(`B${this.props.newBuyerObject.id}`), 100)
      }
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.isSentCa && prevState.isSentCa !== nextProps.isSentCa) {
      return {
        buyer: { ...prevState.buyer, caSent: 1 },
        isSentCa: true
      }
    }
    if (nextProps.isReceivedCa && prevState.isReceivedCa !== nextProps.isReceivedCa) {
      return {
        buyer: { ...prevState.buyer, caReceived: 1 },
        isReceivedCa: true
      }
    }
    return null
  }

  _backToSearch = async () => {
    this._renderBuyer(null)
    this._renderBuyerLog(null)
    // await this.props.getBuyers()
    this.props.clearBuyerLog()
  }

  _renderBuyer = buyer => {
    this.setState({ buyer })
    this.props.clearBuyerLog()
  }

  _renderBusiness = business => {
    this.setState({ business })
  }

  _getBusinessObject = id => {
    this.setState({ business: null })
    this.setState({ showMsgBusiness: true })
    const value = 'BS' + id
    this.props.getBusinesses(value, [4, 5], false, 'xcllusive', false)
  }

  _renderBuyerLog = buyerLog => {
    this.props.getLog(this.state.buyer.id)
    this.setState({ buyerLog })
  }

  _toggleModalEmailBuyer = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Email Buyer',
        text: 'Are you sure you want to send an email to buyer?'
      },
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          this.props.emailBuyer(this.state.buyer.id, this.state.business.id)
        }
      }
    })
  }

  _toggleModalEnquiryBusiness = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Enquiry Business',
        text: 'Do you want to enquiry this business for the selected buyer?'
      },
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          this.props.enquiryBusiness(this.state.buyer.id, this.state.business.id)
        }
      }
    })
  }

  _toggleModalRequestOwnersApproval = () => {
    this.props.getEmailTemplate(6)
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Request Owners Approval',
        text: 'Are you sure you want request owners for approval?'
      },
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          if (this.props.objectEmailTemplate) {
            window.location.href = `mailto:${this.state.business.vendorEmail} ?subject=${
              this.props.objectEmailTemplate.subject
            } &body=Dear ${
              this.state.business.firstNameV
            }, %0D%0A %0D%0A we have a new enquiry for your business. %0D%0A %0D%0A Details are: %0D%0A %0D%0A ${
              this.state.buyer.firstName
            } ${this.state.buyer.surname} %0D%0A ${this.state.buyer.streetName}, ${this.state.buyer.suburb} ${
              this.state.buyer.state
            } ${this.state.buyer.postCode} %0D%0A ${this.state.buyer.telephone1} %0D%0A ${
              this.state.buyer.email
            } %0D%0A %0D%0A ${this._convertHtmlToRightText(this.props.objectEmailTemplate.body)}
            `
          }
        }
      }
    })
  }

  _toggleModalSendCa = caSent => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Send CA',
        text: caSent ? 'CA already sent. Do you want to send again?' : 'Are you sure you want to send the CA?'
      },
      onConfirm: async isConfirmed => {
        if (isConfirmed) {
          await this.props.sendCa(this.state.buyer.id, this.state.business.id)
          this.setState({ isSentCa: false })
        }
      }
    })
  }

  _toggleModalSendIm = caSent => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Send IM',
        text: 'Are you sure you want to send the IM?'
      },
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          this.props.sendIm(this.state.buyer.id, this.state.business.id)
        }
      }
    })
  }

  _onSearchBuyer = (e, { value }) => {
    if (this.timer) clearTimeout(this.timer)

    this.setState({
      inputSearchBuyer: value,
      buyer: null
    })
    if (value !== '') {
      this.timer = setTimeout(() => this.props.getBuyers(value), 1000)
    }
  }

  _onSearchBusiness = (e, { value }) => {
    this.setState({ showMsgBusiness: false })
    if (this.timer) clearTimeout(this.timer)
    this.setState({
      inputSearchBusiness: value,
      business: null
    })
    if (value !== '') {
      if (this.props.values.searchBusinesses === 'all') {
        this.timer = setTimeout(
          () => this.props.getBusinesses(value, false, false, false, this.props.values.allStages),
          1000
        )
      }
      if (this.props.values.searchBusinesses === 'xcllusive') {
        this.timer = setTimeout(
          () => this.props.getBusinesses(value, [4, 5], false, 'xcllusive', this.props.values.allStages),
          1000
        )
      }
      if (this.props.values.searchBusinesses === 'ctc') {
        this.timer = setTimeout(
          () => this.props.getBusinesses(value, 6, false, 'ctc', this.props.values.allStages),
          1000
        )
      }
    }
  }

  _toggleModal = (modal, buyer) => {
    this.setState(prevState => ({
      [modal]: !prevState[modal],
      buyer: prevState.buyer
    }))
  }

  _toggleModalCaReceived = () => {
    if (this.state.buyer && this.state.buyer.caReceived) {
      this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
        options: {
          title: 'CA Received',
          text: 'CA already received. Do you want to upload again?'
        },
        onConfirm: isConfirmed => {
          if (isConfirmed) {
            this.props.openModal(TypesModal.MODAL_TYPE_UPLOAD_FILE, {
              options: {
                title: 'Upload CA'
              },
              onConfirm: async isConfirmed => {
                if (isConfirmed) {
                  await this.props.caReceived(this.state.file, this.state.buyer.id, this.state.business.id)
                  this.setState({ isReceivedCa: false })
                }
              },
              handleFileUpload: e => {
                const file = e.target.files[0]
                this.setState({ file })
              }
            })
          }
        }
      })
    } else {
      this.props.openModal(TypesModal.MODAL_TYPE_UPLOAD_FILE, {
        options: {
          title: 'Upload CA'
        },
        onConfirm: isConfirmed => {
          if (isConfirmed) {
            this.props.caReceived(this.state.file, this.state.buyer.id, this.state.business.id)
          }
        },
        handleFileUpload: e => {
          const file = e.target.files[0]
          this.setState({ file })
        }
      })
    }
  }

  _openFile = url => {
    if (url) {
      window.open(url, '_blank')
    }
  }

  _newBuyer = company => {
    this.props.openModal(TypesModal.MODAL_TYPE_NEW_BUYER, {
      title: company === 'Xcllusive' ? 'New Buyer for Xcllusive' : 'New Buyer for CTC',
      company: company,
      onConfirm: async (values, searchDuplicatedBuyer = false) => {
        if (values) {
          if (searchDuplicatedBuyer) {
            await this.props.closeModal()
            this.setState({
              inputSearchBuyer: searchDuplicatedBuyer.email
                ? searchDuplicatedBuyer.email
                : searchDuplicatedBuyer.telephone1
            })
            const inputDuplicatedBuyer = searchDuplicatedBuyer.email
              ? searchDuplicatedBuyer.email
              : searchDuplicatedBuyer.telephone1

            this.timer = setTimeout(() => this.props.getBuyers(inputDuplicatedBuyer), 500)
          } else {
            if (company === 'Xcllusive') {
              values.xcllusiveBuyer = true
            }
            if (company === 'CTC') {
              values.xcllusiveBuyer = false
              values.ctcBuyer = true
            }
            await this.props.createBuyer(values)
          }
          this.props.closeModal()
        }
      }
    })
  }

  _editBuyer = buyer => {
    this.props.openModal(TypesModal.MODAL_TYPE_EDIT_BUYER, {
      title: 'Edit Buyer',
      buyer,
      onConfirm: async values => {
        if (values) {
          await this.props.updateBuyer(values)
          this.setState({ buyer: values, createdBuyer: false })
          this.props.closeModal()
        }
      }
    })
  }

  _newBusiness = company => {
    this.props.openModal(TypesModal.MODAL_TYPE_NEW_BUSINESS, {
      title: company === 'Xcllusive' ? 'New Business for Xcllusive' : 'New Business for CTC',
      where: 'ClientManager',
      company: company,
      history: this.props.history,
      onConfirm: async (values, searchDuplicatedBusiness = false, willReassign = false) => {
        if (values) {
          if (searchDuplicatedBusiness) {
            await this.props.closeModal()
            this.setState({
              inputSearchBusiness: `BS${searchDuplicatedBusiness.id}`
            })
            this.timer = setTimeout(() => this.props.getBusinesses(`BS${searchDuplicatedBusiness.id}`), 500)
          } else {
            if (company === 'Xcllusive' && !willReassign) {
              values.company = 1
              values.ctcSourceId = null
            } else {
              values.company = 2
              values.willReassign = willReassign
              if (willReassign) values.ctcSourceId = 1
            }
            // moved to backend
            // values.dateTimeAssignToAgent = moment().format('YYYY-MM-DD hh:mm:ss')
            values.dateTimeFirstOpenByAgent = null
            await this.props.createBusiness(values)
            this.setState({
              inputSearchBusiness: `BS${this.props.newBusinessObject.id}`
            })
            this.timer = setTimeout(() => this.props.getBusinesses(`BS${this.props.newBusinessObject.id}`), 500)
          }
          this.props.closeModal()
        }
      }
    })
  }

  _handlePaginationChange = (e, { activePage }) => {
    this.props.getLog(this.state.buyer.id, 10, activePage)
  }

  _ownersApprovalReceived = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_OWNERS_APPRAISAL_CONFIRM, {
      title: 'Owners Approval Received',
      onConfirm: value => {
        if (value.confirmYes && value.confirmYes === 'YES') {
          this.setState({ ownersApprovalReceived: true })
        }
        this.props.closeModal()
      }
    })
  }

  _handleChangeCheckBox = async (e, { name, value }) => {
    if (name === 'allStages') await this.props.setFieldValue(name, !this.props.values[name])
    else await this.props.setFieldValue(name, value)

    // if (this.props.values.searchBusinesses === 'all' && !this.props.values.allStages) {
    //   await this.props.setFieldValue('allStages', true)
    // }

    this.setState({ showMsgBusiness: false })
    if (this.timer) clearTimeout(this.timer)
    this.setState({
      inputSearchBusiness: this.state.inputSearchBusiness,
      business: null
    })
    if (this.state.inputSearchBusiness !== '') {
      if (this.props.values.searchBusinesses === 'all') {
        this.timer = setTimeout(
          () => this.props.getBusinesses(this.state.inputSearchBusiness, false, false, this.props.values.allStages),
          1000
        )
      }
      if (this.props.values.searchBusinesses === 'xcllusive') {
        if (this.props.values.allStages) {
          this.timer = setTimeout(
            () =>
              this.props.getBusinesses(
                this.state.inputSearchBusiness,
                false,
                false,
                'xcllusive',
                this.props.values.allStages
              ),
            1000
          )
        } else {
          this.timer = setTimeout(
            () =>
              this.props.getBusinesses(
                this.state.inputSearchBusiness,
                [4, 5],
                false,
                'xcllusive',
                this.props.values.allStages
              ),
            1000
          )
        }
      }
      if (this.props.values.searchBusinesses === 'ctc') {
        if (this.props.values.allStages) {
          this.timer = setTimeout(
            () =>
              this.props.getBusinesses(
                this.state.inputSearchBusiness,
                false,
                false,
                'ctc',
                this.props.values.allStages
              ),
            1000
          )
        } else {
          this.timer = setTimeout(
            () =>
              this.props.getBusinesses(this.state.inputSearchBusiness, 6, false, 'ctc', this.props.values.allStages),
            1000
          )
        }
      }
    }
  }

  _sendEmailCtcBusiness = (buyer, business) => {
    this.props.openModal(TypesModal.MODAL_TYPE_SEND_EMAIL, {
      options: {
        title: 'Send Enquiry CTC',
        emailTemplate: 16,
        to: business.vendorEmail,
        cc: business.ccEmail
      },
      businessId: business.id,
      buyerId: buyer.id,
      onConfirm: async isConfirmed => {
        if (isConfirmed) {
          this.props.sendEmailCtcBusiness(isConfirmed, buyer, business)
        }
      }
    })
  }

  _sendSms = (buyer, business) => {
    const numPhone1 = parseInt(business.vendorPhone1.replace(/[^0-9]/g, ''), 10)
    const numPhone2 = parseInt(business.vendorPhone2.replace(/[^0-9]/g, ''), 10)
    const numPhone3 = parseInt(business.vendorPhone3.replace(/[^0-9]/g, ''), 10)
    let arrayNumbers = []

    if (numPhone1.toString().substr(0, 1) === '4' && numPhone1.toString().length === 9) {
      arrayNumbers.push({ id: 1, number: numPhone1 })
    }
    if (numPhone2.toString().substr(0, 1) === '4' && numPhone2.toString().length === 9) {
      arrayNumbers.push({ id: 2, number: numPhone2 })
    }
    if (numPhone3.toString().substr(0, 1) === '4' && numPhone3.toString().length === 9) {
      arrayNumbers.push({ id: 3, number: numPhone3 })
    }

    this.props.openModal(TypesModal.MODAL_SEND_SMS, {
      options: {
        title: 'Sending SMS',
        arrayNumbers: arrayNumbers.length > 0 ? arrayNumbers : []
      },
      onConfirm: phone => {
        if (phone) {
          this.props.sendSms(buyer, business, phone, '')
        }
      }
    })
  }

  _showEnquiries = business => {
    this.props.history.push({
      pathname: `/clientManager/enquiries/${business.id}`,
      state: {
        business,
        comingFrom: 'clientManager'
      }
    })
  }

  render () {
    const {
      listBuyerList,
      listBusinessList,
      isLoadingBuyerList,
      isLoadingBusinessList,
      history,
      isLoadingBuyerLog,
      listBuyerLogList,
      isLoadingSendCa,
      isLoadingSendIm,
      isLoadingCaReceived,
      isLoadingEmailBuyer,
      isLoadingEnquiryBusiness,
      isLoadingRequestOwnersApproval,
      values
    } = this.props
    return (
      <Wrapper>
        <Grid padded="horizontally" style={{ marginTop: 0 }}>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Grid.Row>
                <h2>
                  <b>
                    <div align="left"> Buyer</div>
                  </b>
                </h2>
              </Grid.Row>
              <Grid.Row style={{ marginTop: '40px' }}>
                <Input
                  fluid
                  icon="search"
                  loading={isLoadingBuyerList}
                  placeholder="Find buyers..."
                  onChange={this._onSearchBuyer}
                  value={this.state.inputSearchBuyer}
                />
              </Grid.Row>
              <Grid.Row style={{ marginTop: '10px', textAlign: 'end' }}>
                <Button size="small" onClick={() => this._newBuyer('Xcllusive')} color="facebook">
                  <Icon name="add" />
                  Xcllusive Buyer
                </Button>
                <Button size="small" onClick={() => this._newBuyer('CTC')} color="green">
                  <Icon name="add" />
                  CTC Buyer
                </Button>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column>
              <Grid.Row>
                <h2>
                  <b>
                    <div align="left"> Business </div>
                  </b>
                </h2>
              </Grid.Row>
              <Grid.Row>
                <Form.Group>
                  <Grid.Column style={{ marginTop: '10px' }}>
                    <Grid>
                      <Grid.Row columns={2}>
                        <Grid.Column style={{ textAlign: 'initial' }} width={4}>
                          <Checkbox
                            as={CheckboxFormatted}
                            label="All Stages"
                            name="allStages"
                            onChange={this._handleChangeCheckBox}
                            checked={values.allStages}
                          />
                        </Grid.Column>
                        <Grid.Column style={{ textAlign: 'end' }} width={12}>
                          <Checkbox
                            as={CheckboxFormatted}
                            label="All"
                            name="searchBusinesses"
                            value="all"
                            onChange={this._handleChangeCheckBox}
                            checked={values.searchBusinesses === 'all'}
                          />
                          <Checkbox
                            as={CheckboxFormatted}
                            label="Xcllusive"
                            name="searchBusinesses"
                            value="xcllusive"
                            onChange={this._handleChangeCheckBox}
                            checked={values.searchBusinesses === 'xcllusive'}
                          />
                          <Checkbox
                            label="CTC"
                            name="searchBusinesses"
                            value="ctc"
                            onChange={this._handleChangeCheckBox}
                            checked={values.searchBusinesses === 'ctc'}
                          />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Grid.Column>
                </Form.Group>
              </Grid.Row>
              <Grid.Row>
                <Input
                  style={{ marginTop: '10px' }}
                  fluid
                  icon="search"
                  loading={isLoadingBusinessList}
                  placeholder="Find businesses..."
                  onChange={this._onSearchBusiness}
                  value={this.state.inputSearchBusiness}
                />
              </Grid.Row>
              <Grid.Row style={{ marginTop: '10px' }}>
                <Grid>
                  <Grid.Row columns={2}>
                    <Grid.Column width={5}>
                      <Button
                        size="small"
                        onClick={() => history.push('/clientManager/advanced-search')}
                        color="twitter"
                      >
                        <Icon name="magnify" />
                        Advanced Search
                      </Button>
                    </Grid.Column>
                    <Grid.Column style={{ textAlign: 'end' }} width={11}>
                      <Button size="small" onClick={() => this._newBusiness('Xcllusive')} color="facebook">
                        <Icon name="add" />
                        Xcllusive Business
                      </Button>
                      <Button size="small" onClick={() => this._newBusiness('CTC')} color="green">
                        <Icon name="add" />
                        CTC Business
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Segment style={{ backgroundColor: '#f7f7f7' }}>
                {!this.state.buyer && listBuyerList.length > 0 ? (
                  <Dimmer.Dimmable dimmed>
                    <Dimmer inverted active={isLoadingBuyerList}>
                      <Loader>Loading</Loader>
                    </Dimmer>
                    <Table size="small" compact color="blue" celled inverted selectable>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Name</Table.HeaderCell>
                          <Table.HeaderCell>Phone</Table.HeaderCell>
                          <Table.HeaderCell>Email</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {listBuyerList.map(buyer => (
                          <Table.Row active key={buyer.id} onClick={() => this._renderBuyer(buyer)}>
                            <Table.Cell>
                              {buyer.firstName} {buyer.surname}
                            </Table.Cell>
                            <Table.Cell>{buyer.telephone1 ? buyer.telephone1 : buyer.telephone2}</Table.Cell>
                            <Table.Cell>{buyer.email}</Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  </Dimmer.Dimmable>
                ) : null}
                {this.state.buyer && listBuyerList.length > 0 ? (
                  <Fragment>
                    {this.state.buyer.xcllusiveBuyer ? (
                      <Label style={{ marginBottom: '0px' }} as="a" color="blue" pointing="below" size="large">
                        Xcllusive Buyer
                      </Label>
                    ) : null}
                    {this.state.buyer.ctcBuyer ? (
                      <Label style={{ marginBottom: '0px' }} as="a" color="green" pointing="below" size="large">
                        CTC Buyer
                      </Label>
                    ) : null}
                    <Table style={{ paddingRight: '300px' }} size="small" basic="very" compact>
                      <Table.Body>
                        <Table.Row>
                          <Table.HeaderCell>BuyerID</Table.HeaderCell>
                          <Table.Cell onClick={() => this._editBuyer(this.state.buyer)} selectable>
                            <Icon link name="search" />
                            {`B${this.state.buyer.id}`}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.HeaderCell color="red">Name</Table.HeaderCell>
                          <Table.Cell>
                            {this.state.buyer.firstName} {this.state.buyer.surname}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.HeaderCell>Address</Table.HeaderCell>
                          <Table.Cell>
                            {this.state.buyer.streetName}, {this.state.buyer.suburb} {this.state.buyer.state}{' '}
                            {this.state.buyer.postCode}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.HeaderCell>Phone</Table.HeaderCell>
                          <Table.Cell>
                            {this.state.buyer.telephone1 ? this.state.buyer.telephone1 : this.state.buyer.telephone2}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.HeaderCell>Email</Table.HeaderCell>
                          <Table.Cell>{this.state.buyer.email}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.HeaderCell>CA sent</Table.HeaderCell>
                          <Table.Cell>{this.state.buyer.caSent ? 'Yes' : 'No'}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.HeaderCell>CA returned</Table.HeaderCell>
                          <Table.Cell>
                            {this.state.buyer.caReceived ||
                            (this.state.buyer.scanfilePath !== '' && this.state.buyer.scanfilePath !== null)
                              ? 'Yes'
                              : 'No'}
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                    <Grid.Column floated="left" width={2}>
                      <Button
                        size="small"
                        color="teal"
                        disabled={!this.state.buyer.attachmentUrl}
                        onClick={() => this._openFile(this.state.buyer.attachmentUrl)}
                      >
                        <Icon name="folder open outline" />
                        Open CA
                      </Button>
                      <Button
                        size="small"
                        color="blue"
                        onClick={() => this._toggleModalCaReceived()}
                        disabled={!this.state.business || isLoadingCaReceived}
                        loading={isLoadingCaReceived}
                      >
                        <Icon name="mail" />
                        CA Received
                      </Button>
                      <Button
                        size="small"
                        color="blue"
                        disabled={!this.state.business || isLoadingSendCa}
                        loading={isLoadingSendCa}
                        onClick={() => this._toggleModalSendCa(this.state.buyer.caSent)}
                      >
                        <Icon name="send" />
                        Send CA
                      </Button>
                      <Button
                        size="small"
                        color="blue"
                        onClick={() => this._toggleModalSendIm()}
                        disabled={
                          (!this.state.buyer.caReceived &&
                            (this.state.buyer.scanfilePath === '' || this.state.buyer.scanfilePath === null)) ||
                          !this.state.business ||
                          (!this.state.ownersApprovalReceived && this.state.business.notifyOwner) ||
                          this.state.business.stageId === 5 // Under Offer
                          // this.state.business.productId === 2 // Seller Assist
                        }
                        loading={isLoadingSendIm}
                      >
                        <Icon name="send" />
                        Send IM
                      </Button>
                      <Button size="small" color="grey" onClick={() => this._backToSearch()}>
                        <Icon name="arrow left" />
                        Back to Search
                      </Button>
                    </Grid.Column>
                  </Fragment>
                ) : null}
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment style={{ backgroundColor: '#f7f7f7' }}>
                {!this.state.business && listBusinessList.length > 0 ? (
                  <Dimmer.Dimmable dimmed>
                    <Dimmer inverted active={isLoadingBusinessList}>
                      <Loader>Loading</Loader>
                    </Dimmer>
                    <Table size="small" compact color="blue" celled inverted selectable>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>ID</Table.HeaderCell>
                          <Table.HeaderCell>Name</Table.HeaderCell>
                          <Table.HeaderCell>Company</Table.HeaderCell>
                          <Table.HeaderCell>Price</Table.HeaderCell>
                          <Table.HeaderCell>Notes</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {listBusinessList.map(business => (
                          <Table.Row active key={business.id} onClick={() => this._renderBusiness(business)}>
                            <Table.Cell>{`BS${business.id}`}</Table.Cell>
                            <Table.Cell>{business.businessName}</Table.Cell>
                            <Table.Cell style={{ color: business.company_id === 1 ? '#2285d0' : '#21ba45' }}>
                              <b>{business.company_id === 1 ? 'Xcllusive' : 'CTC'}</b>
                            </Table.Cell>
                            <Table.Cell>{numeral(business.listedPrice).format('0,0.00')}</Table.Cell>
                            <Table.Cell>{business.description}</Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  </Dimmer.Dimmable>
                ) : null}
                {listBusinessList.length === 0 && this.state.showMsgBusiness ? (
                  <Message warning>
                    <Message.Header>Sorry! this business is not `Under Offer` neither `For Sale`</Message.Header>
                  </Message>
                ) : null}
                {this.state.business && this.state.business.id && listBusinessList.length > 0 ? (
                  <Fragment>
                    <Label
                      style={{ marginBottom: '0px' }}
                      as="a"
                      color={this.state.business.company_id === 1 ? 'blue' : 'green'}
                      pointing="below"
                      size="large"
                    >
                      {this.state.business.company_id === 1 ? 'Xcllusive Business' : 'CTC Business'}
                    </Label>
                    <Table style={{ paddingRight: '300px' }} size="small" basic="very" compact>
                      <Table.Body>
                        <Table.Row>
                          <Table.HeaderCell>BusinessID</Table.HeaderCell>
                          <Table.Cell onClick={() => history.push(`business/${this.state.business.id}`)} selectable>
                            <Icon link name="search" />
                            {`BS${this.state.business.id}`}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.HeaderCell color="red">Name</Table.HeaderCell>
                          <Table.Cell>{this.state.business.businessName}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.HeaderCell>Address</Table.HeaderCell>
                          <Table.Cell>
                            {this.state.business.address1} {','} {this.state.business.suburb}{' '}
                            {this.state.business.state} {this.state.business.postCode}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.HeaderCell>Industry</Table.HeaderCell>
                          <Table.Cell>{this.state.business.industryId}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.HeaderCell>Price</Table.HeaderCell>
                          <Table.Cell>{numeral(this.state.business.listedPrice).format('0,0.00')}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.HeaderCell>Notes</Table.HeaderCell>
                          <Table.Cell>{this.state.business.description}</Table.Cell>
                        </Table.Row>
                        {this.state.business.BusinessStage ? (
                          <Table.Row>
                            <Table.HeaderCell>Stage</Table.HeaderCell>
                            <Table.Cell>
                              {this.state.business.company_id === 1
                                ? this.state.business.BusinessStage.label
                                : this.state.business.CtcBusinessStage.label}
                            </Table.Cell>
                          </Table.Row>
                        ) : null}
                        {/* {this.state.business.productId === 2 ? (
                          <Table.Row>
                            <Table.HeaderCell>Product</Table.HeaderCell>
                            <Table.Cell>Seller Assist</Table.Cell>
                          </Table.Row>
                        ) : null} */}
                      </Table.Body>
                    </Table>
                    {this.state.business.notifyOwner ? (
                      <Message>
                        <p style={{ color: 'red' }}>
                          <b>Owners must approve buyers before IM is send to them!</b>
                        </p>
                      </Message>
                    ) : null}
                    <Grid.Row>
                      <Grid.Column>
                        <Button
                          size="small"
                          color="orange"
                          onClick={() => this._toggleModalEnquiryBusiness()}
                          disabled={!this.state.buyer || isLoadingEnquiryBusiness}
                          loading={isLoadingEnquiryBusiness}
                        >
                          <Icon name="write" />
                          Enquiry Business
                        </Button>
                        {this.state.business &&
                        this.state.buyer &&
                        this.state.business.company_id === 2 &&
                        this.state.business.ctcStageId === 6 ? (
                            <Fragment>
                              <Button
                                size="small"
                                color="orange"
                                disabled={
                                  (this.state.business.company_id !== 2 && this.state.business.ctcStageId !== 6) ||
                                !this.state.buyer
                                }
                                onClick={() => this._sendEmailCtcBusiness(this.state.buyer, this.state.business)}
                              >
                                <Icon name="mail" />
                              Send Enquiry Email
                              </Button>
                              <Button
                                size="small"
                                color="orange"
                                onClick={() => this._sendSms(this.state.buyer, this.state.business)}
                              >
                                <Icon name="mobile alternate" />
                              Send Enquiry SMS
                              </Button>
                            </Fragment>
                          ) : null}
                      </Grid.Column>
                    </Grid.Row>
                    <Divider style={{ marginTop: '5px', marginBottom: '5px' }}></Divider>
                    <Grid.Row>
                      <Grid.Column>
                        <Button
                          size="small"
                          color="blue"
                          onClick={() => this._toggleModalRequestOwnersApproval()}
                          disabled={
                            !this.state.buyer ||
                            isLoadingRequestOwnersApproval ||
                            (!this.state.buyer.caReceived && !this.state.business.notifyOwner)
                          }
                          loading={isLoadingRequestOwnersApproval}
                        >
                          <Icon name="mail" />
                          Request Owners Approval
                        </Button>
                        <Button
                          size="small"
                          color="blue"
                          onClick={() => this._ownersApprovalReceived()}
                          loading={isLoadingEmailBuyer}
                          disabled={!this.state.business.notifyOwner}
                        >
                          <Icon name="mail" />
                          Owners Approval Received
                        </Button>
                        <Button
                          size="small"
                          color="blue"
                          disabled={!this.state.buyer || isLoadingEmailBuyer || this.state.business.stageId !== 5}
                          onClick={() => this._toggleModalEmailBuyer()}
                          loading={isLoadingEmailBuyer}
                        >
                          <Icon name="mail" />
                          Email Buyer
                        </Button>
                      </Grid.Column>
                    </Grid.Row>
                    <Divider style={{ marginTop: '5px', marginBottom: '5px' }}></Divider>
                    <Grid.Row>
                      <Grid.Column>
                        <Button size="small" color="blue" onClick={() => this._showEnquiries(this.state.business)}>
                          <Icon name="folder open" />
                          Show Enquiries
                        </Button>
                        <Button size="small" color="grey" onClick={() => this._renderBusiness(null)}>
                          <Icon name="arrow left" />
                          Back to Search
                        </Button>
                      </Grid.Column>
                    </Grid.Row>
                  </Fragment>
                ) : null}
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <br />
        <br />
        <Grid.Column floated="left" width={2}>
          {this.state.buyer ? (
            <Fragment>
              <Button size="small" color="blue" onClick={() => this._renderBuyerLog(this.state.buyer)}>
                <Icon name="talk" />
                Show Log
              </Button>
              <Button
                size="small"
                color="teal"
                onClick={() =>
                  // history.push(`clientManager/${this.state.buyer.id}`)
                  history.push(`/clientManager/buyer/${this.state.buyer.id}`)
                }
              >
                <Icon name="edit" />
                Edit Log
              </Button>
            </Fragment>
          ) : null}
        </Grid.Column>
        <Grid.Column>
          {this.state.buyer && this.state.buyerLog ? (
            <Dimmer.Dimmable dimmed>
              <Dimmer inverted active={isLoadingBuyerLog}>
                <Loader>Loading</Loader>
              </Dimmer>
              <Table size="small" compact color="blue" celled inverted selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Business</Table.HeaderCell>
                    <Table.HeaderCell>Log</Table.HeaderCell>
                    <Table.HeaderCell>Created Date</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {listBuyerLogList.array.map(buyerLog => (
                    <Table.Row active key={buyerLog.id} onClick={() => this._getBusinessObject(buyerLog.business_id)}>
                      <Table.Cell>{`BS${buyerLog.business_id}`}</Table.Cell>
                      <Table.Cell>{buyerLog.Business.businessName}</Table.Cell>
                      <Table.Cell>{buyerLog.text}</Table.Cell>
                      <Table.Cell>{moment(buyerLog.dateTimeCreated).format('DD/MM/YYYY - HH:mm')}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              <Pagination
                size="mini"
                onPageChange={(e, data) => this._handlePaginationChange(e, data)}
                defaultActivePage={this.props.listBuyerLogList.activePage}
                totalPages={this.props.listBuyerLogList.pages}
                firstItem={null}
                lastItem={null}
              />
            </Dimmer.Dimmable>
          ) : null}
        </Grid.Column>
      </Wrapper>
    )
  }
}

ClientManagerList.propTypes = {
  history: PropTypes.object,
  openModal: PropTypes.func,
  isLoadingEnquiryBusiness: PropTypes.bool,
  enquiryBusiness: PropTypes.func,
  listBuyerList: PropTypes.array,
  listBusinessList: PropTypes.array,
  getBuyers: PropTypes.func,
  isLoadingBuyerList: PropTypes.bool,
  isLoadingBusinessList: PropTypes.bool,
  isCreatedBuyer: PropTypes.bool,
  isCreatedBusiness: PropTypes.bool,
  getBusinesses: PropTypes.func,
  isLoadingBuyerLog: PropTypes.bool,
  getLog: PropTypes.func,
  listBuyerLogList: PropTypes.object,
  sendCa: PropTypes.func,
  isLoadingSendCa: PropTypes.bool,
  isLoadingSendIm: PropTypes.bool,
  sendIm: PropTypes.func,
  isLoadingCaReceived: PropTypes.bool,
  caReceived: PropTypes.func,
  isLoadingEmailBuyer: PropTypes.bool,
  emailBuyer: PropTypes.func,
  isLoadingRequestOwnersApproval: PropTypes.bool,
  requestOwnersApproval: PropTypes.func,
  isLoadingSendEnquiryToOwner: PropTypes.bool,
  sendEnquiryToOwner: PropTypes.func,
  businessObject: PropTypes.object,
  getBusiness: PropTypes.func,
  clearBuyerLog: PropTypes.func,
  buyerUpdated: PropTypes.object,
  getEmailTemplate: PropTypes.func,
  objectEmailTemplate: PropTypes.object,
  createBuyer: PropTypes.func,
  updateBuyer: PropTypes.func,
  createBusiness: PropTypes.func,
  closeModal: PropTypes.func,
  updateBusiness: PropTypes.func,
  setFieldValue: PropTypes.func,
  values: PropTypes.object,
  newBuyerObject: PropTypes.object,
  isSentCa: PropTypes.bool,
  isReceivedCa: PropTypes.bool,
  newBusinessObject: PropTypes.object,
  sendEmailCtcBusiness: PropTypes.func,
  sendSms: PropTypes.func,
  bodyEmailCtc: PropTypes.string,
  checkCaReminder: PropTypes.func
}

const mapPropsToValues = () => ({
  searchBusinesses: 'all',
  allStages: false
})

const mapStateToProps = state => ({
  isLoadingBuyerList: state.buyer.getAll.isLoading,
  isLoadingBusinessList: state.business.getAll.isLoading,
  listBuyerList: state.buyer.getAll.array,
  listBusinessList: state.business.getAll.array,
  buyerUpdated: state.buyer.update.buyer,
  isCreatedBusiness: state.business.create.isCreated,
  isCreatedBuyer: state.buyer.create.isCreated,
  isLoadingBuyerLog: state.buyerLog.get.isLoading,
  listBuyerLogList: state.buyerLog.get,
  isLoadingSendCa: state.clientManager.sentCa.isLoading,
  isSentCa: state.clientManager.sentCa.isSent,
  isLoadingSendIm: state.clientManager.sentIm.isLoading,
  isLoadingCaReceived: state.clientManager.caReceived.isLoading,
  isReceivedCa: state.clientManager.caReceived.isReceived,
  isLoadingEmailBuyer: state.clientManager.emailBuyer.isLoading,
  isLoadingEnquiryBusiness: state.clientManager.enquired.isLoading,
  isLoadingRequestOwnersApproval: state.clientManager.requestOwnersApproval.isLoading,
  businessObject: state.business.get.object,
  objectEmailTemplate: state.emailTemplates.get.object,
  newBuyerObject: state.buyer.create.newBuyer,
  newBusinessObject: state.business.create.object,
  bodyEmailCtc: state.clientManager.sendEmailCtcBusiness.body
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openModal,
      enquiryBusiness,
      getBuyers,
      getBusinesses,
      getLog,
      sendCa,
      sendIm,
      caReceived,
      emailBuyer,
      requestOwnersApproval,
      sendEnquiryToOwner,
      getBusiness,
      clearBuyerLog,
      getEmailTemplate,
      createBuyer,
      updateBuyer,
      createBusiness,
      closeModal,
      updateBusiness,
      sendEmailCtcBusiness,
      sendSms,
      checkCaReminder
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues
  })(ClientManagerList)
)
