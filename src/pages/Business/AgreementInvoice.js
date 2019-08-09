import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import numeral from 'numeral'
import { Grid, Segment, Header, Button, Icon, Divider } from 'semantic-ui-react'
import Wrapper from '../../components/content/Wrapper'
import { TypesModal, openModal, closeModal } from '../../redux/ducks/modal'
import { downloadAgreement, getAgreementBody, clearAgreement, sendAgreement } from '../../redux/ducks/agreement'
import { getLastInvoice, downloadInvoice, sendInvoice, clearInvoice } from '../../redux/ducks/invoice'

import { theme } from '../../styles'

class AgreementInvoice extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editAgreement: true
    }
  }

  componentDidMount () {
    this.props.getAgreementBody(this.props.location.state.business.id)
    if (this.props.location.state.business.lastInvoice_id) this.props.getLastInvoice(this.props.match.params.id)
  }

  componentWillUnmount () {
    this.props.clearAgreement()
    this.props.clearInvoice()
  }

  _openModalListAgreement = (state, typeAgreement) => {
    if ((this.props.location.state.business.agreement_id && typeAgreement === 'businessAgreement') || (this.props.location.state.business.agreementProperty_id && typeAgreement === 'propertyAgreement')) {
      this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
        options: {
          title: 'Agreement',
          text: 'This business has an agreement already. Are you sure you want to overwrite it?'
        },
        onConfirm: isConfirmed => {
          if (isConfirmed) {
            this.props.openModal(TypesModal.MODAL_TYPE_LIST_AGREEMENTS, {
              options: {
                title: 'List of Agreements'
              },
              state,
              typeAgreement,
              callBack: (isConfirmed, idAgreement) => {
                if (isConfirmed) {
                  this.props.history.push({
                    pathname: `/business/${this.props.location.state.business.id}/agreement/${idAgreement}`,
                    state: {typeAgreement}
                  })
                }
              }
            })
          }
        }
      })
    } else {
      this.props.openModal(TypesModal.MODAL_TYPE_LIST_AGREEMENTS, {
        options: {
          title: 'List of Agreements'
        },
        state,
        typeAgreement,
        callBack: (isConfirmed, idAgreement) => {
          if (isConfirmed) {
            this.props.history.push({
              pathname: `/business/${this.props.location.state.business.id}/agreement/${idAgreement}`,
              state: {typeAgreement}
            })
          }
        }
      })
    }
  }

  _modalConfirmDownloadAgreement = (typeAgreement) => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Download Agreement',
        text: 'Are you sure you want to download the agreement?'
      },
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          this.props.downloadAgreement({
            businessId: this.props.location.state.business.id,
            fileName: `agreement_${this.props.location.state.business.businessName.substring(0, 10)}_${moment().format(
              'DD_MM_YYYY'
            )}.pdf`,
            body: typeAgreement === 'businessAgreement' ? this.props.businessAgreement.body : this.props.propertyAgreement.body,
            typeAgreement
          })
        }
      }
    })
  }

  _newEditInvoice (business, newEdit) {
    if (business.lastInvoice_id) {
      if (newEdit === 'new') {
        this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
          options: {
            title: 'Tax Invoice',
            text: 'Are you sure you want to make a new invoice?'
          },
          onConfirm: isConfirmed => {
            if (isConfirmed) {
              this.props.history.push({
                pathname: `/business/${business.id}/invoice`,
                state: {
                  business,
                  newInvoice: true
                }
              })
            }
          }
        })
      } else {
        this.props.history.push({
          pathname: `/business/${business.id}/invoice`,
          state: {
            business,
            newInvoice: false
          }
        })
      }
    } else {
      this.props.history.push({
        pathname: `/business/${business.id}/invoice`,
        state: {
          business,
          newInvoice: true
        }
      })
    }
  }

  _sendEmail = (whereFrom) => {
    this.props.openModal(TypesModal.MODAL_TYPE_EMAIL_AGREEMENT_INVOICE, {
      options: {
        title: 'Preparing Agreement/Invoice Email'
      },
      vendorEmail: this.props.location.state.business.vendorEmail,
      businessId: this.props.location.state.business.id,
      fileNameAgreement: (whereFrom !== 'invoice' && this.props.businessAgreement) || (whereFrom === 'all' && this.props.businessAgreement) ? `agreement_${this.props.location.state.business.businessName.substring(
        0,
        10
      )}_${moment().format('DD_MM_YYYY')}.pdf` : null,
      fileNamePropertyAgreement: whereFrom === 'all' && this.props.propertyAgreement ? `propertyagreement_${this.props.location.state.business.businessName.substring(
        0,
        10
      )}_${moment().format('DD_MM_YYYY')}.pdf` : null,
      fileNameInvoice: whereFrom === 'invoice' || (whereFrom === 'all' && this.props.objectLastInvoice) ? `${this.props.objectLastInvoice.ref}.pdf` : null,
      fromAgreement: true,
      onConfirm: async object => {
        if (object) {
          if (whereFrom === 'businessAgreement') {
            await this.props.sendAgreement({
              businessId: this.props.location.state.business.id,
              body: this.props.businessAgreement.body,
              mail: object
            })
          }
          if (whereFrom === 'invoice') {
            await this.props.sendInvoice({
              invoiceId: this.props.objectLastInvoice.id,
              mail: object
            })
          }
          if (whereFrom === 'propertyAgreement') {
            await this.props.sendAgreement({
              businessId: this.props.location.state.business.id,
              body: this.props.propertyAgreement.body,
              mail: object
            })
          }
          if (whereFrom === 'all') {
            await this.props.sendAgreement({
              businessId: this.props.location.state.business.id,
              body: this.props.propertyAgreement.body,
              mail: object
            })
          }
        }
        this.props.closeModal()
      }
    })
  }

  render () {
    const { business } = this.props.location.state
    const { isLoadingDownloading, objectAgreementIsLoading, businessAgreement, propertyAgreement, objectLastInvoice, isLoadingDownloadingInvoice } = this.props
    return (
      <Wrapper loading={objectAgreementIsLoading}>
        <Grid style={{marginTop: '10px'}}>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Segment style={{ backgroundColor: '#008eff26' }} size="small">
                <Header as="h3" textAlign="center">
                  {'BUSINESS AGREEMENT'}
                </Header>
                <Divider></Divider>
                <Grid>
                  <Grid.Row columns={3}>
                    <Grid.Column>
                      <Button
                        size="small"
                        color={theme.buttonNew}
                        onClick={() => this._openModalListAgreement(business.state, 'businessAgreement')}
                      >
                        <Icon name="file" />
                      New
                      </Button>
                    </Grid.Column>
                    <Grid.Column>
                      <Button
                        size="small"
                        color={theme.buttonEdit}
                        disabled={!businessAgreement}
                        onClick={() =>
                          this.props.history.push({
                            pathname: `/business/${business.id}/agreement/${
                              business.agreement_id
                            }/preview`,
                            state: {
                              business: business,
                              editAgreement: this.state.editAgreement,
                              typeAgreement: 'businessAgreement'
                            }
                          })
                        }
                      >
                        <Icon name="edit" />
                    Edit
                      </Button>
                    </Grid.Column>
                    <Grid.Column>
                      <Button
                        size="small"
                        color={theme.buttonDownload}
                        disabled={!businessAgreement}
                        onClick={() => this._modalConfirmDownloadAgreement('businessAgreement')}
                        loading={isLoadingDownloading}
                      >
                        <Icon name="download" />
                    Download
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Divider></Divider>
                <Grid.Row textAlign="center" style={{paddingBottom: '10px'}}>
                  <Header as="h4" textAlign="center">
                    {businessAgreement ? businessAgreement.title : null}
                  </Header>
                </Grid.Row>
                {businessAgreement ? (
                  <Fragment>
                    <Grid celled="internally">
                      <Grid.Row columns={2}>
                        <Grid.Column>
                          <h4>Asking Price</h4>
                        </Grid.Column>
                        <Grid.Column>
                          <h4>{businessAgreement.askingPriceOrPropertyValue}</h4>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row columns={2}>
                        <Grid.Column>
                          <h4>Commision</h4>
                        </Grid.Column>
                        <Grid.Column>
                          <h4>{businessAgreement.commission}%</h4>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row columns={2}>
                        <Grid.Column>
                          <h4>Engagement Fee</h4>
                        </Grid.Column>
                        <Grid.Column>
                          <h4>{businessAgreement.engagementFee}</h4>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                    <Divider></Divider>
                    <Header style={{marginTop: '0px'}} as="h3" textAlign="center">
                      <Button
                        size="small"
                        color="green"
                        onClick={() => this._sendEmail('businessAgreement')}
                      >
                        <Icon name="send" />
                      Send
                      </Button>
                    </Header>
                  </Fragment>
                ) : null}
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment style={{ backgroundColor: '#daf3e4', height: '100%' }} size="small">
                <Header as="h3" textAlign="center">
                  {'INVOICE'}
                </Header>
                <Divider></Divider>
                <Grid>
                  <Grid.Row columns={3}>
                    <Grid.Column>
                      <Button
                        size="small"
                        color={theme.buttonNew}
                        onClick={() => this._newEditInvoice(business, 'new')

                        }
                      >
                        <Icon name="file" />
                      New
                      </Button>
                    </Grid.Column>
                    <Grid.Column>
                      <Button
                        size="small"
                        color={theme.buttonEdit}
                        disabled={!objectLastInvoice}
                        onClick={() => this._newEditInvoice(business, 'edit')}
                      >
                        <Icon name="edit" />
                    Edit
                      </Button>
                    </Grid.Column>
                    <Grid.Column>
                      <Button
                        size="small"
                        color={theme.buttonDownload}
                        loading={isLoadingDownloadingInvoice}
                        disabled={!objectLastInvoice}
                        onClick={() => this.props.downloadInvoice({
                          id: objectLastInvoice.id,
                          fileName: `invoice_${objectLastInvoice.ref}.pdf`
                        })}
                      >
                        <Icon name="download" />
                    Download
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Divider></Divider>
                {objectLastInvoice ? (
                  <Fragment>
                    <Grid celled="internally">
                      <Grid.Row columns={2}>
                        <Grid.Column>
                          <h4>Last Invoice</h4>
                        </Grid.Column>
                        <Grid.Column>
                          <h4>{numeral(objectLastInvoice.amount).format('$0,0.[99]')}</h4>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                    <Divider></Divider>
                    <Header style={{marginTop: '130px'}} as="h3" textAlign="center">
                      <Button
                        size="small"
                        color="green"
                        onClick={() => this._sendEmail('invoice')}
                      >
                        <Icon name="send" />
                      Send
                      </Button>
                    </Header>
                  </Fragment>
                ) : null}
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment style={{ backgroundColor: '#008eff26' }} size="small">
                <Header as="h3" textAlign="center">
                  {'PROPERTY AGREEMENT'}
                </Header>
                <Divider></Divider>
                <Grid>
                  <Grid.Row columns={3}>
                    <Grid.Column>
                      <Button
                        size="small"
                        color={theme.buttonNew}
                        onClick={() => this._openModalListAgreement(business.state, 'propertyAgreement')}
                      >
                        <Icon name="file" />
                      New
                      </Button>
                    </Grid.Column>
                    <Grid.Column>
                      <Button
                        size="small"
                        color={theme.buttonEdit}
                        disabled={!propertyAgreement}
                        onClick={() =>
                          this.props.history.push({
                            pathname: `/business/${business.id}/agreement/${
                              business.agreementProperty_id
                            }/preview`,
                            state: {
                              business: business,
                              editAgreement: this.state.editAgreement,
                              typeAgreement: 'propertyAgreement'
                            }
                          })
                        }
                      >
                        <Icon name="edit" />
                    Edit
                      </Button>
                    </Grid.Column>
                    <Grid.Column>
                      <Button
                        size="small"
                        color={theme.buttonDownload}
                        disabled={!propertyAgreement}
                        loading={isLoadingDownloading}
                        onClick={() => this._modalConfirmDownloadAgreement('propertyAgreement')}
                      >
                        <Icon name="download" />
                    Download
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Divider></Divider>
                <Grid.Row textAlign="center" style={{paddingBottom: '10px'}}>
                  <Header as="h4" textAlign="center">
                    {propertyAgreement ? propertyAgreement.title : null}
                  </Header>
                </Grid.Row>
                {propertyAgreement ? (
                  <Fragment>
                    <Grid celled="internally">
                      <Grid.Row columns={2}>
                        <Grid.Column>
                          <h4>Property Value</h4>
                        </Grid.Column>
                        <Grid.Column>
                          <h4>{propertyAgreement.askingPriceOrPropertyValue}</h4>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row columns={2}>
                        <Grid.Column>
                          <h4>Commision</h4>
                        </Grid.Column>
                        <Grid.Column>
                          <h4>{propertyAgreement.commission}%</h4>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row columns={2}>
                        <Grid.Column>
                          <h4>Engagement Fee</h4>
                        </Grid.Column>
                        <Grid.Column>
                          <h4>{propertyAgreement.engagementFee}</h4>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                    <Divider></Divider>
                    <Header style={{marginTop: '0px'}} as="h3" textAlign="center">
                      <Button
                        size="small"
                        color="green"
                        onClick={() => this._sendEmail('propertyAgreement')}
                      >
                        <Icon name="send" />
                      Send
                      </Button>
                    </Header>
                  </Fragment>
                ) : null}
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {(businessAgreement && propertyAgreement) || (businessAgreement && objectLastInvoice) || (objectLastInvoice && propertyAgreement) || (objectLastInvoice && businessAgreement) || (businessAgreement && propertyAgreement && objectLastInvoice) ? (

          <Header as="h3" textAlign="center">
            <Button
              size="small"
              color="red"
              onClick={() => this._sendEmail('all')}
            >
              <Icon name="send" />
                      Send All
            </Button>
          </Header>
        ) : null}
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Button
                color="green"
                onClick={() => this.props.history.push(`/business/${this.props.location.state.business.id}`)}
                size="small"
                floated="left"
              >
                <Icon name="backward" />
                Return to Business
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Wrapper>
    )
  }
}

AgreementInvoice.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  openModal: PropTypes.func,
  downloadAgreement: PropTypes.func,
  getAgreementBody: PropTypes.func,
  businessAgreement: PropTypes.object,
  isLoadingDownloading: PropTypes.bool,
  objectAgreementIsLoading: PropTypes.bool,
  propertyAgreement: PropTypes.object,
  clearAgreement: PropTypes.func,
  getLastInvoice: PropTypes.func,
  objectLastInvoice: PropTypes.object,
  downloadInvoice: PropTypes.func,
  isLoadingDownloadingInvoice: PropTypes.bool,
  sendAgreement: PropTypes.func,
  sendInvoice: PropTypes.func,
  closeModal: PropTypes.func,
  clearInvoice: PropTypes.func
}

const mapDispatchToProps = dispatch => bindActionCreators({openModal, downloadAgreement, getAgreementBody, clearAgreement, getLastInvoice, downloadInvoice, sendAgreement, sendInvoice, closeModal, clearInvoice }, dispatch)

const mapStateToProps = state => ({
  businessAgreement: state.agreement.get.object,
  propertyAgreement: state.agreement.get.objectProperty,
  isLoadingDownloading: state.agreement.download.isLoading,
  objectAgreementIsLoading: state.agreement.get.isLoading,
  objectLastInvoice: state.invoice.getLastInvoice.object,
  isLoadingDownloadingInvoice: state.invoice.download.isLoading
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AgreementInvoice)
