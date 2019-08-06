import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Message, Step, Segment, Grid, Header, Button, Icon } from 'semantic-ui-react'
import * as Yup from 'yup'
import Wrapper from '../../../components/content/Wrapper'
import { updateAppraisal, downloadAppraisal } from '../../../redux/ducks/appraisal'
import { getBusiness } from '../../../redux/ducks/business'
import { theme } from '../../../styles'
import { TypesModal, openModal } from '../../../redux/ducks/modal'

class GenerateAndSendPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      draft: false
    }
  }

  componentWillUnmount () {
    this.props.updateAppraisal(this.props.values)
  }

  componentDidMount () {
    this.props.getBusiness(this.props.appraisalObject.business_id)
  }

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  _modalConfirmDownloadAppraisal = async () => {
    await this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Download Appraisal',
        text: 'Are you sure you want to download the appraisal?'
      },
      message: 'Once you download it, you will NOT be allow to edit anymore!',
      onConfirm: async isConfirmed => {
        if (isConfirmed) {
          await this.props.downloadAppraisal(this.props.appraisalObject)
          this.props.history.push({
            pathname: `/business/${this.props.appraisalObject.business_id}/appraisalList`,
            state: {
              business: this.props.business
            }
          })
        }
      }
    })
  }

  _modalConfirmDownloadDraftAppraisal = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Download Draft Appraisal',
        text: 'Are you sure you want to download the draft appraisal?'
      },
      onConfirm: async isConfirmed => {
        if (isConfirmed) {
          this.setState({draft: true})
          await this.props.downloadAppraisal(this.props.appraisalObject, true)
          this.props.history.push({
            pathname: `/business/${this.props.appraisalObject.business_id}/appraisalList`,
            state: {
              business: this.props.business
            }
          })
        }
      }
    })
  }

  _modalSendAppraisal = async () => {
    await this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Making Sure',
        text:
          'Are you sure you want to send the appraisal? '
      },
      message: 'Once you send it, you will NOT be allow to edit anymore!',
      onConfirm: async isConfirmed => {
        if (isConfirmed) {
          await this.props.openModal(TypesModal.MODAL_TYPE_SEND_APPRAISAL, {
            options: {
              title: 'Preparing Appraisal`s Email'
            },
            business: this.props.business,
            appraisalObject: this.props.appraisalObject,
            onConfirm: async isConfirmed => {
              if (isConfirmed) {
                this.props.history.push({
                  pathname: `/business/${this.props.appraisalObject.business_id}/appraisalList`,
                  state: {
                    business: this.props.business
                  }
                })
              }
            }
          })
        }
      }
    })
  }

  render () {
    const { appraisalObject, isLoadingDownloading } = this.props
    // const {} = this.state
    return (
      <Wrapper>
        <Segment style={{ backgroundColor: '#ffe7a273', marginTop: '0px' }} size="small">
          <Step.Group size="large">
            <Step active icon="download" title="Step 7" description="Generate And Send" />
            <Message style={{ marginTop: '0px' }} info size="large">
              <p>
                Welcome to the final stage of the appraisal process. Here you can check that all stages have been
                completed and preview the final product. If a section has not been marked as complete, it will display
                as `red`. You can click on the heading to be taken to that section. Once all sections have been marked
                as done you can send the appraisal to the vendor or download it.
              </p>
            </Message>
          </Step.Group>
        </Segment>
        <Segment style={{ backgroundColor: '#008eff26' }}>
          <Grid>
            <Grid.Row>
              <Grid.Column width={5} style={{ margin: '0 auto' }} textAlign="center">
                <Header as="h3" textAlign="center" color="blue">
                  Checklist
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid style={{ margin: '0 auto' }} textAlign="center" divided="vertically">
            <Grid.Row style={{ paddingBottom: '0px' }} columns={2}>
              <Grid.Column textAlign="right">
                <b>Step 1: </b>
              </Grid.Column>
              <Grid.Column textAlign="left" onClick={() => this.props.handleItemClick('Business Details')}>
                {appraisalObject.confirmBusinessDetail ? (
                  <font size="3" color="green">
                    <u>Business Details</u>
                  </font>
                ) : (
                  <font size="3" color="red">
                    <u>Business Details</u>
                  </font>
                )}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ paddingBottom: '0px', paddingTop: '0px' }} columns={2}>
              <Grid.Column textAlign="right">
                <b>Step 2: </b>
              </Grid.Column>
              <Grid.Column textAlign="left" onClick={() => this.props.handleItemClick('About')}>
                {appraisalObject.confirmAbout &&
                appraisalObject.confirmCustomersSuppliers &&
                appraisalObject.confirmPremisesEnployees &&
                appraisalObject.confirmOwnershipFinalNotes ? (
                    <font size="3" color="green">
                      <u>About</u>
                    </font>
                  ) : (
                    <font size="3" color="red">
                      <u>About</u>
                    </font>
                  )}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ paddingBottom: '0px', paddingTop: '0px' }} columns={2}>
              <Grid.Column textAlign="right">
                <b>Step 4: </b>
              </Grid.Column>
              <Grid.Column textAlign="left" onClick={() => this.props.handleItemClick('Business Analysis')}>
                {appraisalObject.confirmBusinessAnalysis ? (
                  <font size="3" color="green">
                    <u>Business Analysis</u>
                  </font>
                ) : (
                  <font size="3" color="red">
                    <u>Business Analysis</u>
                  </font>
                )}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ paddingBottom: '0px', paddingTop: '0px' }} columns={2}>
              <Grid.Column textAlign="right">
                <b>Step 3: </b>
              </Grid.Column>
              <Grid.Column textAlign="left" onClick={() => this.props.handleItemClick('Financial Analysis')}>
                {appraisalObject.confirmFinancialAnalysis ? (
                  <font size="3" color="green">
                    <u>Financial Analysis</u>
                  </font>
                ) : (
                  <font size="3" color="red">
                    <u>Financial Analysis</u>
                  </font>
                )}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ paddingBottom: '0px', paddingTop: '0px' }} columns={2}>
              <Grid.Column textAlign="right">
                <b>Step 5: </b>
              </Grid.Column>
              <Grid.Column textAlign="left" onClick={() => this.props.handleItemClick('Comparable Data')}>
                {appraisalObject.confirmComparableData ? (
                  <font size="3" color="green">
                    <u>Comparable Data</u>
                  </font>
                ) : (
                  <font size="3" color="red">
                    <u>Comparable Data</u>
                  </font>
                )}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ paddingBottom: '0px', paddingTop: '0px' }} columns={2}>
              <Grid.Column textAlign="right">
                <b>Step 6: </b>
              </Grid.Column>
              <Grid.Column textAlign="left" onClick={() => this.props.handleItemClick('Pricing')}>
                {appraisalObject.confirmPricing ? (
                  <font size="3" color="green">
                    <u>Pricing</u>
                  </font>
                ) : (
                  <font size="3" color="red">
                    <u>Pricing</u>
                  </font>
                )}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ paddingBottom: '0px', paddingTop: '0px' }} columns={2}>
              <Grid.Column textAlign="right">
                <b>Step 7: </b>
              </Grid.Column>
              <Grid.Column textAlign="left" onClick={() => this.props.handleItemClick('Notes And Assumptions')}>
                {appraisalObject.confirmNotesAndAssumptions ? (
                  <font size="3" color="green">
                    <u>Notes And Assumptions</u>
                  </font>
                ) : (
                  <font size="3" color="red">
                    <u>Notes And Assumptions</u>
                  </font>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid style={{ margin: '0 auto' }} textAlign="center">
            <Grid.Row columns={1}>
              <Grid.Column>
                <font size="2" color="red">
                  If all of the above sections are marked as done, your `Completed` % should display as 100% Completed.
                  Now you can download a copy of the completed appraisal to review.
                </font>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
              <Grid.Column>
                <Button
                  color={theme.buttonDownload}
                  onClick={this._modalConfirmDownloadAppraisal}
                  size="small"
                  disabled={
                    !appraisalObject.confirmBusinessDetail ||
                    !appraisalObject.confirmAbout ||
                    !appraisalObject.confirmCustomersSuppliers ||
                    !appraisalObject.confirmPremisesEnployees ||
                    !appraisalObject.confirmOwnershipFinalNotes ||
                    !appraisalObject.confirmBusinessAnalysis ||
                    !appraisalObject.confirmFinancialAnalysis ||
                    !appraisalObject.confirmComparableData ||
                    !appraisalObject.confirmPricing ||
                    !appraisalObject.confirmNotesAndAssumptions ||
                    !appraisalObject.downloadedDraft
                  }
                  loading={isLoadingDownloading && !this.state.draft}
                >
                  <Icon name="download" />
                  Download Appraisal
                </Button>
                <Button
                  color="orange"
                  onClick={this._modalConfirmDownloadDraftAppraisal}
                  size="small"
                  disabled={
                    !appraisalObject.confirmBusinessDetail ||
                    !appraisalObject.confirmAbout ||
                    !appraisalObject.confirmCustomersSuppliers ||
                    !appraisalObject.confirmPremisesEnployees ||
                    !appraisalObject.confirmOwnershipFinalNotes ||
                    !appraisalObject.confirmBusinessAnalysis ||
                    !appraisalObject.confirmFinancialAnalysis ||
                    !appraisalObject.confirmComparableData ||
                    !appraisalObject.confirmPricing ||
                    !appraisalObject.confirmNotesAndAssumptions
                  }
                  loading={isLoadingDownloading && this.state.draft}
                >
                  <Icon name="download" />
                  Download Draft Appraisal
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment style={{ backgroundColor: '#daf3e4' }}>
          <Grid>
            <Grid.Row>
              <Grid.Column width={5} style={{ margin: '0 auto' }} textAlign="center">
                <Header as="h3" textAlign="center" color="blue">
                  Sending
                </Header>
              </Grid.Column>
            </Grid.Row>
            {!appraisalObject.downloadedDraft ? (
              <Grid.Row columns={1}>
                <Grid.Column style={{ margin: '0 auto' }} textAlign="center">
                  <font size="2" color="red">
                    You can not send appraisal until you download and review it.
                  </font>
                </Grid.Column>
              </Grid.Row>
            ) : null}
            <Grid.Row columns={1}>
              <Grid.Column style={{ margin: '0 auto' }} textAlign="center">
                <Button
                  color="green"
                  size="small"
                  onClick={this._modalSendAppraisal}
                  // loading={isLoadingSendEmail}
                  disabled={!appraisalObject.downloadedDraft}
                >
                  <Icon name="send" />
                  Send Appraisal
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Wrapper>
    )
  }
}

GenerateAndSendPage.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  setFieldValue: PropTypes.func,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  business: PropTypes.object,
  appraisalObject: PropTypes.object,
  updateAppraisal: PropTypes.func,
  handleItemClick: PropTypes.func,
  confirmsCompleteSteps: PropTypes.func,
  openModal: PropTypes.func,
  downloadAppraisal: PropTypes.func,
  isLoadingDownloading: PropTypes.bool,
  history: PropTypes.object,
  getBusiness: PropTypes.func
}

const mapPropsToValues = props => ({
  business_id: props.business ? props.business.id : '',
  id: props.appraisalObject ? props.appraisalObject.id : ''
})

const mapStateToProps = state => {
  return {
    isLoadingDownloading: state.appraisal.download.isLoading,
    business: state.business.get.object
  }
}

const validationSchema = Yup.object().shape({})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateAppraisal,
      openModal,
      downloadAppraisal,
      getBusiness
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    enableReinitialize: true
  })(GenerateAndSendPage)
)
