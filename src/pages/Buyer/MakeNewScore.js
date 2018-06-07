import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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

class MakeNewScorePage extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.props.getBusiness(this.props.match.params.id)
  }

  render () {
    const { history, business, isLoadingBusiness } = this.props
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
                    <Statistic.Value>#</Statistic.Value>
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
                      <Form.Input width={5} readOnly />
                      <Label>Avg</Label>
                      <Form.Input width={5} readOnly />
                      <Label>Diff</Label>
                      <Form.Input width={5} readOnly />
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
                    <Form.TextArea />
                  </Form>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <CardScore
                  header="Enquiries In Last Four Weeks Generated Text:"
                  title="This business has received four or less enquiries than the average business has received over the past four weeks."
                  subtitle="Needs Urgent Attention"
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
                          Percieved Price from Buyers
                        </Header>
                      </Grid.Column>
                      <Grid.Column>
                        <Header
                          color="blue"
                          as="h3"
                          textAlign="right"
                          size="small"
                        >
                          60
                        </Header>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Form size="tiny">
                    <Form.Group>
                      <Form.Select width={16} />
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
                    <Form.TextArea />
                  </Form>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <CardScore
                  header="Enquiries In Last Four Weeks Generated Text:"
                  title="This business has received four or less enquiries than the average business has received over the past four weeks."
                  subtitle="Needs Urgent Attention"
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
                          60
                        </Header>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Form size="tiny">
                    <Form.Group>
                      <Form.Select width={16} />
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
                    <Form.TextArea />
                  </Form>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <CardScore
                  header="Enquiries In Last Four Weeks Generated Text:"
                  title="This business has received four or less enquiries than the average business has received over the past four weeks."
                  subtitle="Needs Urgent Attention"
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
                          60
                        </Header>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Form size="tiny">
                    <Form.Group>
                      <Form.Select width={16} />
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
                    <Form.TextArea />
                  </Form>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <CardScore
                  header="Enquiries In Last Four Weeks Generated Text:"
                  title="This business has received four or less enquiries than the average business has received over the past four weeks."
                  subtitle="Needs Urgent Attention"
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
                          Buyer Percieved Risk
                        </Header>
                      </Grid.Column>
                      <Grid.Column>
                        <Header
                          color="blue"
                          as="h3"
                          textAlign="right"
                          size="small"
                        >
                          60
                        </Header>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Form size="tiny">
                    <Form.Group>
                      <Form.Select width={16} />
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
                    <Form.TextArea />
                  </Form>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <CardScore
                  header="Enquiries In Last Four Weeks Generated Text:"
                  title="This business has received four or less enquiries than the average business has received over the past four weeks."
                  subtitle="Needs Urgent Attention"
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
                        <Button color="red" floated="right">
                          <Icon name="calculator" />
                          Calculate Your Score
                        </Button>
                      </Grid.Column>
                      <Grid.Column>
                        <Statistic.Group size="tiny" widths={1}>
                          <Statistic floated="left">
                            <Statistic.Value>#</Statistic.Value>
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
                              `/buyer/business/${business.id}/ScoreList`
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
  getBusiness: PropTypes.func,
  business: PropTypes.object,
  isLoadingBusiness: PropTypes.bool
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getBusiness }, dispatch)

const mapStateToProps = state => ({
  business: state.business.get.object,
  isLoadingBusiness: state.business.get.isLoading
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MakeNewScorePage)
