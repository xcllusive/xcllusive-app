import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withFormik } from 'formik'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
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
import { calculateScore } from '../../redux/ducks/score'
import { mapArrayToValuesForDropdown } from '../../utils/sharedFunctionArray'

class MakeNewScorePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      objectPrice: {},
      objectMomentum: {},
      objectInterest: {},
      objectRisk: {},
      points: false,
      thisScore: null
    }
  }

  componentDidMount () {
    this.props.getBusiness(this.props.match.params.id)
    this.props.listScoreRegister('perceivedPrice')
    this.props.listScoreRegister('infoTransMomen')
    this.props.listScoreRegister('currentInterest')
    this.props.listScoreRegister('perceivedRisk')
  }

  // _typeOption = name => {
  //   if (name === 'perceivedPrice') {
  //     return this.props.perceivedPriceOptions
  //   }
  //   if (name === 'infoTransMomen') {
  //     return this.props.infoTransMomenOptions
  //   }
  //   if (name === 'currentInterest') {
  //     return this.props.currentInterestOptions
  //   }
  //   if (name === 'perceivedRisk') {
  //     return this.props.perceivedRiskOptions
  //   }
  // }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps)
  }

  _findItemArray = (name, id) => {
    if (name === 'perceivedPrice') {
      const object = _.find(this.props.perceivedPriceOptions, o => {
        return o.id === id
      })
      this.setState({
        objectPrice: object
      })
    }
    if (name === 'infoTransMomen') {
      const object = _.find(this.props.infoTransMomenOptions, o => {
        return o.id === id
      })
      this.setState({
        objectMomentum: object
      })
    }
    if (name === 'currentInterest') {
      const object = _.find(this.props.currentInterestOptions, o => {
        return o.id === id
      })
      this.setState({
        objectInterest: object
      })
    }
    if (name === 'perceivedRisk') {
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

    console.log(this.state.objectPrice.weight)

    this.setState({
      points: false
    })
  }

  _calculateScore = values => {
    this.props.calculateScore(values)
    this.setState({
      points: true
    })
    this.setState({
      thisScore:
        (this.state.objectPrice.weight +
          this.state.objectMomentum.weight +
          this.state.objectInterest.weight +
          this.state.objectRisk.weight) /
        5
    })
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
      touched
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
                      {this.state.thisScore ? this.state.thisScore : '#'}
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
                    <Statistic.Value>#</Statistic.Value>
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
                          10
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
                <CardScore
                  header="Enquiries In Last Four Weeks Generated Text:"
                  title="This business has received four or less enquiries than the average business has received over the past four weeks."
                  icon={10}
                />
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
                          {this.state.points
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
                        name="perceivedPrice"
                        autoComplete="perceivedPrice"
                        value={values.perceivedPrice}
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
                <CardScore
                  header="Percieved Price from Buyers Generated Text"
                  title={
                    this.state.objectPrice
                      ? this.state.objectPrice.textReport
                      : ' '
                  }
                  icon={
                    this.state.objectPrice ? this.state.objectPrice.weight : 0
                  }
                />
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
                          {this.state.points
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
                        name="infoTransMomen"
                        autoComplete="infoTransMomen"
                        value={values.infoTransMomen}
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
                <CardScore
                  header="Information/Transparency/Momentum Generated Text:"
                  title={
                    this.state.objectMomentum
                      ? this.state.objectMomentum.textReport
                      : ' '
                  }
                  icon={
                    this.state.objectMomentum
                      ? this.state.objectMomentum.weight
                      : 0
                  }
                />
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
                          {this.state.points
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
                        name="currentInterest"
                        autoComplete="currentInterest"
                        value={values.currentInterest}
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
                <CardScore
                  header="Current Interest Generated Text:"
                  title={
                    this.state.objectInterest
                      ? this.state.objectInterest.textReport
                      : ' '
                  }
                  icon={
                    this.state.objectInterest
                      ? this.state.objectInterest.weight
                      : 0
                  }
                />
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
                          {this.state.points
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
                        name="perceivedRisk"
                        autoComplete="perceivedRisk"
                        value={values.perceivedRisk}
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
                <CardScore
                  header="Buyer Percieved Risk Generated Text:"
                  title={
                    this.state.objectRisk
                      ? this.state.objectRisk.textReport
                      : ' '
                  }
                  icon={
                    this.state.objectRisk ? this.state.objectRisk.weight : 0
                  }
                />
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
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <Button
                          color="red"
                          floated="right"
                          onClick={() => this._calculateScore(values)}
                        >
                          <Icon name="calculator" />
                          Calculate Your Score
                        </Button>
                      </Grid.Column>
                      <Grid.Column>
                        <Statistic.Group size="tiny" widths={1}>
                          <Statistic floated="left">
                            <Statistic.Value>
                              {this.state.thisScore
                                ? this.state.thisScore
                                : '#'}
                            </Statistic.Value>
                            <Statistic.Label>This Score</Statistic.Label>
                          </Statistic>
                        </Statistic.Group>
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
  touched: PropTypes.object
}

const mapPropsToValues = props => {
  return {
    perceivedPrice: '',
    infoTransMomen: '',
    currentInterest: '',
    perceivedRisk: '',
    notesEnquiries: '',
    notesPrice: '',
    notesMomentum: '',
    notesInterest: '',
    notesRisk: '',
    yours: '',
    avg: '',
    diff: ''
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { getBusiness, listScoreRegister, calculateScore },
    dispatch
  )

const mapStateToProps = state => ({
  business: state.business.get.object,
  isLoadingBusiness: state.business.get.isLoading,
  perceivedPriceOptions: state.scoreRegister.get.perceivedPrice.array,
  infoTransMomenOptions: state.scoreRegister.get.infoTransMomen.array,
  currentInterestOptions: state.scoreRegister.get.currentInterest.array,
  perceivedRiskOptions: state.scoreRegister.get.perceivedRisk.array
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    enableReinitialize: true
  })(MakeNewScorePage)
)
