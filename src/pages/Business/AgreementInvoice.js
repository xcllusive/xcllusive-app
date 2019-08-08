import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import { Grid, Segment, Header, Button, Icon, Divider } from 'semantic-ui-react'
import Wrapper from '../../components/content/Wrapper'
import { TypesModal, openModal } from '../../redux/ducks/modal'
import { downloadAgreement, getAgreementBody } from '../../redux/ducks/agreement'

import { theme } from '../../styles'

class AgreementInvoice extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editAgreement: true
    }
  }

  componentDidMount () {
    if (this.props.location.state.business.agreement_id) {
      this.props.getAgreementBody(this.props.location.state.business.agreement_id)
    }
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

  _modalConfirmDownloadAgreement = () => {
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
            body: this.props.businessAgreement.body
          })
        }
      }
    })
  }

  render () {
    const { business } = this.props.location.state
    const { isLoadingDownloading, objectAgreementIsLoading, businessAgreement } = this.props
    return (
      <Wrapper loading={objectAgreementIsLoading}>
        <Grid style={{marginTop: '10px'}}>
          <Grid.Row columns={3}>
            <Grid.Column>
              {businessAgreement ? (
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
                          onClick={this._modalConfirmDownloadAgreement}
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
                      {businessAgreement.title}
                    </Header>
                  </Grid.Row>
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
                    >
                      <Icon name="send" />
                      Send
                    </Button>
                  </Header>
                </Segment>
              ) : null}
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
                      >
                        <Icon name="file" />
                      New
                      </Button>
                    </Grid.Column>
                    <Grid.Column>
                      <Button
                        size="small"
                        color={theme.buttonEdit}
                      >
                        <Icon name="edit" />
                    Edit
                      </Button>
                    </Grid.Column>
                    <Grid.Column>
                      <Button
                        size="small"
                        color={theme.buttonDownload}
                      >
                        <Icon name="download" />
                    Download
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Divider></Divider>
                <Grid celled="internally">
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <h4>Last Invoice</h4>
                    </Grid.Column>
                    <Grid.Column>
                      <h4>$1,800</h4>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Divider></Divider>
                <Header style={{marginTop: '130px'}} as="h3" textAlign="center">
                  <Button
                    size="small"
                    color="green"
                  >
                    <Icon name="send" />
                      Send
                  </Button>
                </Header>
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
                      >
                        <Icon name="edit" />
                    Edit
                      </Button>
                    </Grid.Column>
                    <Grid.Column>
                      <Button
                        size="small"
                        color={theme.buttonDownload}
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
                    {'Agreement NSW'}
                  </Header>
                </Grid.Row>
                <Grid celled="internally">
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <h4>Property Value</h4>
                    </Grid.Column>
                    <Grid.Column>
                      <h4>$750,000</h4>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <h4>Commision</h4>
                    </Grid.Column>
                    <Grid.Column>
                      <h4>%10</h4>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <h4>Engagement Fee</h4>
                    </Grid.Column>
                    <Grid.Column>
                      <h4>$50,000</h4>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Divider></Divider>
                <Header style={{marginTop: '0px'}} as="h3" textAlign="center">
                  <Button
                    size="small"
                    color="green"
                  >
                    <Icon name="send" />
                      Send
                  </Button>
                </Header>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
  objectAgreementIsLoading: PropTypes.bool
}

const mapDispatchToProps = dispatch => bindActionCreators({openModal, downloadAgreement, getAgreementBody }, dispatch)

const mapStateToProps = state => ({
  businessAgreement: state.agreement.get.object,
  isLoadingDownloading: state.agreement.download.isLoading,
  objectAgreementIsLoading: state.agreement.get.isLoading
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AgreementInvoice)
