import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withFormik } from 'formik'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import Yup from 'yup'
import {
  Grid,
  Header,
  Dimmer,
  Loader,
  Button,
  Icon,
  Message,
  Statistic,
  Segment,
  Label,
  Form
} from 'semantic-ui-react'

import { getBusiness } from '../../redux/ducks/business'

import Wrapper from '../../components/content/Wrapper'
import CardScore from '../../components/content/CardScore'
import { listScoreRegister } from '../../redux/ducks/scoreRegister'
import {
  calculateScore,
  getScore,
  clearScore,
  updateScore,
  enquiriesLast4Weeks
} from '../../redux/ducks/score'
import { mapArrayToValuesForDropdown } from '../../utils/sharedFunctionArray'
import { TypesModal, openModal } from '../../redux/ducks/modal'

class MakeNewScorePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      objectPrice: null,
      objectMomentum: null,
      objectInterest: null,
      objectRisk: null,
      objectEnquiries: null,
      perceivedPriceChange: false,
      infoTransMomenChange: false,
      currentInterestChange: false,
      perceivedRiskChange: false
    }
  }

  componentWillMount () {
    this.props.getBusiness(this.props.match.params.idBusiness)
    this.props.enquiriesLast4Weeks(this.props.match.params.idBusiness)
    if (this.props.match.params.idScore) {
      this.props.getScore(this.props.match.params.idScore)
    }
    this.props.listScoreRegister('perceivedPrice')
    this.props.listScoreRegister('infoTransMomen')
    this.props.listScoreRegister('currentInterest')
    this.props.listScoreRegister('perceivedRisk')
    this.props.listScoreRegister('enquiries')
  }

  componentWillUnmount () {
    this.props.clearScore()
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.score && nextProps.values.perceivedPrice_id) {
      this._findItemArray(
        'perceivedPrice_id',
        nextProps.values.perceivedPrice_id
      )
    }
    if (this.props.score && nextProps.values.infoTransMomen_id) {
      this._findItemArray(
        'infoTransMomen_id',
        nextProps.values.infoTransMomen_id
      )
    }
    if (this.props.score && nextProps.values.currentInterest_id) {
      this._findItemArray(
        'currentInterest_id',
        nextProps.values.currentInterest_id
      )
    }
    if (this.props.score && nextProps.values.perceivedRisk_id) {
      this._findItemArray(
        'perceivedRisk_id',
        nextProps.values.perceivedRisk_id
      )
    }
    if (nextProps.enquiries) {
      this._findItemEnquiries(nextProps.values.diff)
    }
  }

  _findItemEnquiries (diff) {
    const objectEnquiries = _.find(
      this.props.enquiriesOptions,
      o => o.label === diff.toString()
    )
    this.setState({
      objectEnquiries
    })
  }

  _findItemArray = (name, id) => {
    if (name === 'perceivedPrice_id') {
      const object = _.find(this.props.perceivedPriceOptions, o => {
        return o.id === id
      })
      this.setState({
        objectPrice: object
      })
    }
    if (name === 'infoTransMomen_id') {
      const object = _.find(this.props.infoTransMomenOptions, o => {
        return o.id === id
      })
      this.setState({
        objectMomentum: object
      })
    }
    if (name === 'currentInterest_id') {
      const object = _.find(this.props.currentInterestOptions, o => {
        return o.id === id
      })
      this.setState({
        objectInterest: object
      })
    }
    if (name === 'perceivedRisk_id') {
      const object = _.find(this.props.perceivedRiskOptions, o => {
        return o.id === id
      })
      this.setState({
        objectRisk: object
      })
    }
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
    this._findItemArray(name, value)
  }

  _toggleModalConfirm = values => {
    values.total = this._calculateScore()
    if (this.props.score) {
      this.props.updateScore()
    } else {
      this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
        options: {
          title: 'Create New Score',
          text: 'Are you sure you want to create a new score?'
        },
        onConfirm: isConfirmed => {
          if (isConfirmed) {
            this.props.calculateScore(values)
          }
        }
      })
    }
  }

  _calculateScore () {
    return (
      (this.state.objectEnquiries.weight +
        this.state.objectPrice.weight +
        this.state.objectMomentum.weight +
        this.state.objectInterest.weight +
        this.state.objectRisk.weight) /
      5
    )
  }

  _dateSent () {
    if (this.props.score) {
      if (this.props.score.dateSent !== null) {
        return this.props.score.dateSent
      } else {
        return '#'
      }
    } else {
      return '#'
    }
  }

  render () {
    const {
      history,
      values,
      business,
      isLoadingBusiness,
      perceivedPriceOptions,
      infoTransMomenOptions,
      currentInterestOptions,
      perceivedRiskOptions,
      handleChange,
      handleBlur,
      errors,
      touched,
      isValid,
      score
    } = this.props

    return (
      <Wrapper>
        <Dimmer.Dimmable dimmed={isLoadingBusiness} style={{ height: '80vh' }}>
          <Dimmer inverted active={isLoadingBusiness}>
            <Loader>Loading</Loader>
          </Dimmer>
          <Grid style={{ marginTop: 0 }}>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header
                  as="h2"
                  color="blue"
                  content={`Currently Editing: ${business.businessName}`}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid style={{ marginTop: 0 }}>
            <Grid.Row>
              <Grid.Column>
                <Message info size="tiny">
                  <Message.Header>What to do?</Message.Header>
                  <p>
                    Step1: Select an option from the drop down(except for
                    `Enquiries in Last 4 Weeks`)
                  </p>
                  <p>
                    Step2: Leave agent notes for your vendor in the cream boxes.
                    Please note that your vendor will see this notes.
                  </p>
                  <p>
                    Step3: Complete all five boxes and click `Calculate your
                    score` to review your score
                  </p>
                  <p />
                  <p>
                    If you are happy with your score you can leave by clicking
                    `Back to Business List`. If you make any changes, you can
                    review them by clicking `Calculate your score`.
                  </p>
                </Message>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid style={{ marginTop: 0 }}>
            <Grid.Row>
              <Grid.Column>
                <Statistic.Group size="tiny" widths={4}>
                  <Statistic>
                    <Statistic.Value>
                      {score ? score.total : '#'}
                    </Statistic.Value>
                    <Statistic.Label>This Score</Statistic.Label>
                  </Statistic>
                  <Statistic>
                    <Statistic.Value>30</Statistic.Value>
                    <Statistic.Label>Previous Score</Statistic.Label>
                  </Statistic>
                  <Statistic>
                    <Statistic.Value>No</Statistic.Value>
                    <Statistic.Label>Sent</Statistic.Label>
                  </Statistic>
                  <Statistic>
                    <Statistic.Value>{this._dateSent()}</Statistic.Value>
                    <Statistic.Label>Date Sent</Statistic.Label>
                  </Statistic>
                </Statistic.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid style={{ marginTop: 0 }}>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Segment>
                  <Grid>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <Header
                          color="orange"
                          as="h3"
                          textAlign="left"
                          size="small"
                        >
                          Enquiries in Last 4 Weeks
                        </Header>
                      </Grid.Column>
                      <Grid.Column>
                        <Header
                          color="blue"
                          as="h3"
                          textAlign="right"
                          size="small"
                        >
                          {this.state.objectEnquiries
                            ? this.state.objectEnquiries.weight
                            : null}
                        </Header>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Form size="tiny">
                    <Form.Group>
                      <Label>Yours</Label>
                      <Form.Input
                        width={5}
                        readOnly
                        name="yours"
                        autoComplete="yours"
                        value={values.yours}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.yours &&
                        touched.yours && (
                        <Label
                          basic
                          color="red"
                          pointing
                          content={errors.yours}
                        />
                      )}
                      <Label>Avg</Label>
                      <Form.Input
                        width={5}
                        readOnly
                        name="avg"
                        autoComplete="avg"
                        value={values.avg}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.avg &&
                        touched.avg && (
                        <Label
                          basic
                          color="red"
                          pointing
                          content={errors.avg}
                        />
                      )}
                      <Label>Diff</Label>
                      <Form.Input
                        width={5}
                        readOnly
                        name="diff"
                        autoComplete="diff"
                        value={values.diff}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.diff &&
                        touched.diff && (
                        <Label
                          basic
                          color="red"
                          pointing
                          content={errors.diff}
                        />
                      )}
                    </Form.Group>
                  </Form>
                  <Header
                    style={{ marginTop: 0 }}
                    as="h3"
                    textAlign="center"
                    size="tiny"
                  >
                    Notes for report : (Max 420 Characters)
                  </Header>
                  <Form>
                    <Form.TextArea
                      name="notesEnquiries"
                      autoComplete="notesEnquiries"
                      value={values.notesEnquiries}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.notesEnquiries &&
                      touched.notesEnquiries && (
                      <Label
                        basic
                        color="red"
                        pointing
                        content={errors.notesEnquiries}
                      />
                    )}
                  </Form>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                {this.state.objectEnquiries ? (
                  <CardScore
                    header="Enquiries In Last Four Weeks Generated Text:"
                    title={this.state.objectEnquiries.textReport}
                    icon={this.state.objectEnquiries.weight}
                  />
                ) : null}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Segment>
                  <Grid>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <Header
                          color="orange"
                          as="h3"
                          textAlign="left"
                          size="small"
                        >
                          Perceived Price from Buyers
                        </Header>
                      </Grid.Column>
                      <Grid.Column>
                        <Header
                          color="blue"
                          as="h3"
                          textAlign="right"
                          size="small"
                        >
                          {this.state.objectPrice
                            ? this.state.objectPrice.weight
                            : null}
                        </Header>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Form size="tiny">
                    <Form.Group>
                      <Form.Select
                        width={16}
                        options={mapArrayToValuesForDropdown(
                          perceivedPriceOptions
                        )}
                        name="perceivedPrice_id"
                        autoComplete="perceivedPrice_id"
                        value={values.perceivedPrice_id}
                        onChange={this._handleSelectChange}
                      />
                    </Form.Group>
                  </Form>
                  <Header
                    style={{ marginTop: 0 }}
                    as="h3"
                    textAlign="center"
                    size="tiny"
                  >
                    Notes for report : (Max 420 Characters)
                  </Header>
                  <Form>
                    <Form.TextArea
                      name="notesPrice"
                      autoComplete="notesPrice"
                      value={values.notesPrice}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.notesPrice &&
                      touched.notesPrice && (
                      <Label
                        basic
                        color="red"
                        pointing
                        content={errors.notesPrice}
                      />
                    )}
                  </Form>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                {this.state.objectPrice ? (
                  <CardScore
                    header="Percieved Price from Buyers Generated Text"
                    title={this.state.objectPrice.textReport}
                    icon={this.state.objectPrice.weight}
                  />
                ) : null}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Segment>
                  <Grid>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <Header
                          color="orange"
                          as="h3"
                          textAlign="left"
                          size="small"
                        >
                          Information / Transparency / Momentum
                        </Header>
                      </Grid.Column>
                      <Grid.Column>
                        <Header
                          color="blue"
                          as="h3"
                          textAlign="right"
                          size="small"
                        >
                          {this.state.objectMomentum
                            ? this.state.objectMomentum.weight
                            : null}
                        </Header>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Form size="tiny">
                    <Form.Group>
                      <Form.Select
                        width={16}
                        options={mapArrayToValuesForDropdown(
                          infoTransMomenOptions
                        )}
                        name="infoTransMomen_id"
                        autoComplete="infoTransMomen_id"
                        value={values.infoTransMomen_id}
                        onChange={this._handleSelectChange}
                      />
                    </Form.Group>
                  </Form>
                  <Header
                    style={{ marginTop: 0 }}
                    as="h3"
                    textAlign="center"
                    size="tiny"
                  >
                    Notes for report : (Max 420 Characters)
                  </Header>
                  <Form>
                    <Form.TextArea
                      name="notesMomentum"
                      autoComplete="notesMomentum"
                      value={values.notesMomentum}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.notesMomentum &&
                      touched.notesMomentum && (
                      <Label
                        basic
                        color="red"
                        pointing
                        content={errors.notesMomentum}
                      />
                    )}
                  </Form>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                {this.state.objectMomentum ? (
                  <CardScore
                    header="Information/Transparency/Momentum Generated Text:"
                    title={this.state.objectMomentum.textReport}
                    icon={this.state.objectMomentum.weight}
                  />
                ) : null}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Segment>
                  <Grid>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <Header
                          color="orange"
                          as="h3"
                          textAlign="left"
                          size="small"
                        >
                          Current Interest
                        </Header>
                      </Grid.Column>
                      <Grid.Column>
                        <Header
                          color="blue"
                          as="h3"
                          textAlign="right"
                          size="small"
                        >
                          {this.state.objectInterest
                            ? this.state.objectInterest.weight
                            : null}
                        </Header>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Form size="tiny">
                    <Form.Group>
                      <Form.Select
                        width={16}
                        options={mapArrayToValuesForDropdown(
                          currentInterestOptions
                        )}
                        name="currentInterest_id"
                        autoComplete="currentInterest_id"
                        value={values.currentInterest_id}
                        onChange={this._handleSelectChange}
                      />
                    </Form.Group>
                  </Form>
                  <Header
                    style={{ marginTop: 0 }}
                    as="h3"
                    textAlign="center"
                    size="tiny"
                  >
                    Notes for report : (Max 420 Characters)
                  </Header>
                  <Form>
                    <Form.TextArea
                      name="notesInterest"
                      autoComplete="notesInterest"
                      value={values.notesInterest}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.notesInterest &&
                      touched.notesInterest && (
                      <Label
                        basic
                        color="red"
                        pointing
                        content={errors.notesInterest}
                      />
                    )}
                  </Form>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                {this.state.objectInterest ? (
                  <CardScore
                    header="Current Interest Generated Text:"
                    title={this.state.objectInterest.textReport}
                    icon={this.state.objectInterest.weight}
                  />
                ) : null}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Segment>
                  <Grid>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <Header
                          color="orange"
                          as="h3"
                          textAlign="left"
                          size="small"
                        >
                          Buyer Perceived Risk
                        </Header>
                      </Grid.Column>
                      <Grid.Column>
                        <Header
                          color="blue"
                          as="h3"
                          textAlign="right"
                          size="small"
                        >
                          {this.state.objectRisk
                            ? this.state.objectRisk.weight
                            : null}
                        </Header>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Form size="tiny">
                    <Form.Group>
                      <Form.Select
                        width={16}
                        options={mapArrayToValuesForDropdown(
                          perceivedRiskOptions
                        )}
                        name="perceivedRisk_id"
                        autoComplete="perceivedRisk_id"
                        value={values.perceivedRisk_id}
                        onChange={this._handleSelectChange}
                      />
                    </Form.Group>
                  </Form>
                  <Header
                    style={{ marginTop: 0 }}
                    as="h3"
                    textAlign="center"
                    size="tiny"
                  >
                    Notes for report : (Max 420 Characters)
                  </Header>
                  <Form>
                    <Form.TextArea
                      name="notesRisk"
                      autoComplete="notesRisk"
                      value={values.notesRisk}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.notesRisk &&
                      touched.notesRisk && (
                      <Label
                        basic
                        color="red"
                        pointing
                        content={errors.notesRisk}
                      />
                    )}
                  </Form>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                {this.state.objectRisk ? (
                  <CardScore
                    header="Buyer Percieved Risk Generated Text:"
                    title={this.state.objectRisk.textReport}
                    icon={this.state.objectRisk.weight}
                  />
                ) : null}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Message warning size="tiny">
                  <Message.Header>
                    Don`t leave yet! You`re almost done...
                  </Message.Header>
                  <p>
                    Before you leave, make sure you click the red button below.
                    If you`ve made any changes, though the text will change, the
                    score won`t update until you click it.
                  </p>
                  <p>
                    So if you want to know the actual score before it gets sent
                    make sure you click red button.
                  </p>
                </Message>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Segment>
                  <Grid style={{ marginTop: 0 }}>
                    <Grid.Row columns={3}>
                      <Grid.Column>
                        <Button
                          icon
                          color="red"
                          floated="right"
                          onClick={() => this._toggleModalConfirm(values)}
                          disabled={!isValid}
                        >
                          <Icon name="calculator" />
                          {score
                            ? 'Recalculate Your Score'
                            : 'Calculate Your Score'}
                        </Button>
                      </Grid.Column>
                      <Grid.Column>
                        <Statistic.Group size="tiny" widths={1}>
                          <Statistic floated="left">
                            <Statistic.Value>
                              {score ? score.total : '#'}
                            </Statistic.Value>
                            <Statistic.Label>This Score</Statistic.Label>
                          </Statistic>
                        </Statistic.Group>
                      </Grid.Column>
                      <Grid.Column>
                        <Button
                          color="yellow"
                          floated="right"
                          // onClick={() => this._toggleModalConfirm(values)}
                          disabled={!isValid}
                        >
                          <Icon name="send" />
                          Send Score
                        </Button>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <Grid style={{ marginTop: 0 }}>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <Button
                          color="green"
                          onClick={() =>
                            history.push(
                              `/buyer/business/${business.id}/score-list`
                            )
                          }
                          size="small"
                          floated="left"
                        >
                          <Icon name="backward" />
                          Back to Log List
                        </Button>
                      </Grid.Column>
                      <Grid.Column>
                        <Button
                          color="green"
                          onClick={() => history.push('/buyer')}
                          size="small"
                          floated="right"
                        >
                          <Icon name="backward" />
                          Back to Business List
                        </Button>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Dimmer.Dimmable>
      </Wrapper>
    )
  }
}

MakeNewScorePage.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  values: PropTypes.object,
  getBusiness: PropTypes.func,
  business: PropTypes.object,
  isLoadingBusiness: PropTypes.bool,
  listScoreRegister: PropTypes.func,
  perceivedPriceOptions: PropTypes.array,
  infoTransMomenOptions: PropTypes.array,
  currentInterestOptions: PropTypes.array,
  perceivedRiskOptions: PropTypes.array,
  setFieldValue: PropTypes.func,
  calculateScore: PropTypes.func,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  openModal: PropTypes.func,
  isValid: PropTypes.bool,
  getScore: PropTypes.func,
  score: PropTypes.object,
  clearScore: PropTypes.func,
  updateScore: PropTypes.func,
  enquiriesLast4Weeks: PropTypes.func,
  enquiries: PropTypes.object,
  enquiriesOptions: PropTypes.array
}

const mapPropsToValues = props => {
  if (props.score || props.enquiries) {
    return {
      yours: props.score ? props.score.yours : props.enquiries.yours,
      avg: props.score ? props.score.avg : props.enquiries.avg,
      diff: props.score
        ? props.score.diff
        : props.enquiries.yours - props.enquiries.avg,
      perceivedPrice_id: props.score ? props.score.perceivedPrice_id : '',
      notesPrice: props.score ? props.score.notesPrice : '',
      infoTransMomen_id: props.score ? props.score.infoTransMomen_id : '',
      notesMomentum: props.score ? props.score.notesMomentum : '',
      currentInterest_id: props.score ? props.score.currentInterest_id : '',
      notesInterest: props.score ? props.score.notesInterest : '',
      perceivedRisk_id: props.score ? props.score.perceivedRisk_id : '',
      notesRisk: props.score ? props.score.notesRisk : '',
      notesEnquiries: props.score ? props.score.notesEnquiries : '',
      total: props.score ? props.score.total : '',
      business_id: props.score ? props.score.business_id : props.match.params.idBusiness
    }
  }

  return {
    yours: '',
    avg: '',
    diff: '',
    notesEnquiries: '',
    perceivedPrice_id: '',
    notesPrice: '',
    infoTransMomen_id: '',
    notesMomentum: '',
    currentInterest_id: '',
    notesInterest: '',
    perceivedRisk_id: '',
    notesRisk: '',
    total: '',
    business_id: props.match.params.idBusiness
  }
}

const validationSchema = Yup.object().shape({
  notesEnquiries: Yup.string().max(
    420,
    'This notes requires maximum of 420 characteres'
  ),
  perceivedPrice_id: Yup.string().required(
    'Perceived Price from Buyers is required.'
  ),
  notesPrice: Yup.string().max(
    420,
    'This notes requires maximum of 420 characteres'
  ),
  infoTransMomen_id: Yup.string().required(
    'Information / Transparency / Momentum is required.'
  ),
  notesMomentum: Yup.string().max(
    420,
    'This notes requires maximum of 420 characteres'
  ),
  currentInterest_id: Yup.string().required('Current Interest is required.'),
  notesInterest: Yup.string().max(
    420,
    'This notes requires maximum of 420 characteres'
  ),
  perceivedRisk_id: Yup.string().required('Buyer Perceived Risk is required.'),
  notesRisk: Yup.string().max(
    420,
    'This notes requires maximum of 420 characteres'
  )
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getBusiness,
      listScoreRegister,
      calculateScore,
      openModal,
      getScore,
      clearScore,
      updateScore,
      enquiriesLast4Weeks
    },
    dispatch
  )

const mapStateToProps = state => ({
  business: state.business.get.object,
  isLoadingBusiness: state.business.get.isLoading,
  perceivedPriceOptions: state.scoreRegister.get.perceivedPrice.array,
  infoTransMomenOptions: state.scoreRegister.get.infoTransMomen.array,
  currentInterestOptions: state.scoreRegister.get.currentInterest.array,
  perceivedRiskOptions: state.scoreRegister.get.perceivedRisk.array,
  enquiriesOptions: state.scoreRegister.get.enquiries.array,
  score: state.score.get.object,
  enquiries: state.score.enquiries.object
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    enableReinitialize: true
  })(MakeNewScorePage)
)
