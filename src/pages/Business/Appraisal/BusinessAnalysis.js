import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Message, Step, Grid, Table, Header, Form, Pagination, Segment } from 'semantic-ui-react'
import SliderComponent from '../../../components/content/SliderComponent'
import * as Yup from 'yup'
import Wrapper from '../../../components/content/Wrapper'
import { updateAppraisal } from '../../../redux/ducks/appraisal'
import { listAppraisalRegister } from '../../../redux/ducks/appraisalRegister'

class BusinessAnalysisPage extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.props.listAppraisalRegister('risks', 10)
    this.props.listAppraisalRegister('valueDrivers', 10)
    this.props.listAppraisalRegister('criticalIssues', 10)
    this.props.listAppraisalRegister('descriptionBusinessRisk')
    this.props.listAppraisalRegister('descriptionMarket')
  }

  componentWillUnmount () {
    this.props.updateAppraisal(this.props.values)
  }

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  _handleChangeTextArea = e => {
    if (e.target.type === 'textarea' && e.which === 13 /* Enter */) {
      e.preventDefault()
    }
  }

  _insertOnTextArea = (name, text) => {
    this.props.setFieldValue(name, this.props.values[name] === '' ? text : `${this.props.values[name]}\n${text}`)
  }

  _handleChangeSlider = (value, name) => {
    this.props.setFieldValue(name, value)
  }

  render () {
    const { values, handleChange } = this.props
    return (
      <Wrapper>
        <Step.Group size="large">
          <Step active icon="tasks" title="Step 3" description="Business Analysis" />
          <Message info size="large">
            <p>
              The information you enter on this page will be shown on the `Business Analysis` page of the appraisal.
              This information will be used to calculate the capitalisation rate/multiplier for the final appraisal
              value. You will have the option to manually set the capitalisation rate from the Pricing page. The column
              on the left allows you to rate different business aspects and the column on the right allows you to select
              the degree of impact you feel that each aspect has on the business value.
            </p>
          </Message>
        </Step.Group>
        <Form>
          <Grid>
            <Header style={{ marginTop: '25px' }} as="h3" textAlign="center" color="blue">
              Risks
            </Header>
            <Grid.Row style={{ marginTop: '-15px' }} columns={2}>
              <Grid.Column width={9}>
                <Form.Field>
                  <Form.TextArea
                    name="riskList"
                    value={values.riskList}
                    style={{ height: '205px' }}
                    onChange={handleChange}
                    onKeyDown={this._handleChangeTextArea}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={7}>
                <Table color="blue" celled inverted selectable compact size="small">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>ID</Table.HeaderCell>
                      <Table.HeaderCell>Label</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {this.props.risksOptions.array.map(risksOptions => {
                      return (
                        <Table.Row
                          active
                          key={risksOptions.id}
                          onClick={() => this._insertOnTextArea('riskList', risksOptions.label)}
                        >
                          <Table.Cell>{risksOptions.id}</Table.Cell>
                          <Table.Cell>{risksOptions.label}</Table.Cell>
                        </Table.Row>
                      )
                    })}
                  </Table.Body>
                </Table>
                <Pagination
                  size="mini"
                  onPageChange={(e, data) => this._handlePaginationChange(e, data, 'risks')}
                  defaultActivePage={this.props.risksOptions.activePage}
                  totalPages={this.props.risksOptions.pages}
                  firstItem={null}
                  lastItem={null}
                />
              </Grid.Column>
            </Grid.Row>
            <Header style={{ marginTop: '25px' }} as="h3" textAlign="center" color="blue">
              Value Drivers
            </Header>
            <Grid.Row style={{ marginTop: '-15px' }} columns={2}>
              <Grid.Column width={9}>
                <Form.Field>
                  <Form.TextArea
                    name="valueDriversList"
                    value={values.valueDriversList}
                    style={{ height: '205px' }}
                    onChange={handleChange}
                    onKeyDown={this._handleChangeTextArea}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={7}>
                <Table color="blue" celled inverted selectable compact size="small">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>ID</Table.HeaderCell>
                      <Table.HeaderCell>Label</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {this.props.valueDriversOptions.array.map(valueDriversOptions => {
                      return (
                        <Table.Row
                          active
                          key={valueDriversOptions.id}
                          onClick={() => this._insertOnTextArea('valueDriversList', valueDriversOptions.label)}
                        >
                          <Table.Cell>{valueDriversOptions.id}</Table.Cell>
                          <Table.Cell>{valueDriversOptions.label}</Table.Cell>
                        </Table.Row>
                      )
                    })}
                  </Table.Body>
                </Table>
                <Pagination
                  size="mini"
                  onPageChange={(e, data) => this._handlePaginationChange(e, data, 'valueDrivers')}
                  defaultActivePage={this.props.valueDriversOptions.activePage}
                  totalPages={this.props.valueDriversOptions.pages}
                  firstItem={null}
                  lastItem={null}
                />
              </Grid.Column>
            </Grid.Row>
            <Header style={{ marginTop: '25px' }} as="h3" textAlign="center" color="blue">
              Critical Issues
            </Header>
            <Grid.Row style={{ marginTop: '-15px' }} columns={2}>
              <Grid.Column width={9}>
                <Form.Field>
                  <Form.TextArea
                    name="criticalIssuesList"
                    value={values.criticalIssuesList}
                    style={{ height: '205px' }}
                    onChange={handleChange}
                    onKeyDown={this._handleChangeTextArea}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={7}>
                <Table color="blue" celled inverted selectable compact size="small">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>ID</Table.HeaderCell>
                      <Table.HeaderCell>Label</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {this.props.criticalIssuesOptions.array.map(criticalIssuesOptions => {
                      return (
                        <Table.Row
                          active
                          key={criticalIssuesOptions.id}
                          onClick={() => this._insertOnTextArea('criticalIssuesList', criticalIssuesOptions.label)}
                        >
                          <Table.Cell>{criticalIssuesOptions.id}</Table.Cell>
                          <Table.Cell>{criticalIssuesOptions.label}</Table.Cell>
                        </Table.Row>
                      )
                    })}
                  </Table.Body>
                </Table>
                <Pagination
                  size="mini"
                  onPageChange={(e, data) => this._handlePaginationChange(e, data, 'criticalIssues')}
                  defaultActivePage={this.props.criticalIssuesOptions.activePage}
                  totalPages={this.props.criticalIssuesOptions.pages}
                  firstItem={null}
                  lastItem={null}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column style={{ margin: '0 auto' }} textAlign="center" width={8}>
                <Header as="h3" textAlign="center" color="blue">
                  Business Risk
                </Header>
                {values.valueSliderBR ? (
                  <Segment>
                    <SliderComponent
                      value={values.valueSliderBR}
                      type="businessRisk"
                      descriptionArray={this.props.descriptionBusinessRiskArray}
                      onChange={value => this._handleChangeSlider(value, 'valueSliderBR')}
                    />
                  </Segment>
                ) : null}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column style={{ margin: '0 auto' }} textAlign="center" width={8}>
                <Header as="h3" textAlign="center" color="blue">
                  Market
                </Header>
                {values.valueSliderMarket ? (
                  <Segment>
                    <SliderComponent
                      value={values.valueSliderMarket}
                      type="market"
                      descriptionArray={this.props.descriptionMarketArray}
                      onChange={value => this._handleChangeSlider(value, 'valueSliderMarket')}
                    />
                  </Segment>
                ) : null}
              </Grid.Column>
            </Grid.Row>
            <Form.Group>
              <Form.Field>
                <Form.Checkbox
                  label="Please confirm that you have completed the above information"
                  name="confirmBusinessAnalysis"
                  onChange={this._handleChangeCheckBox}
                  checked={values.confirmBusinessAnalysis}
                />
              </Form.Field>
            </Form.Group>
          </Grid>
        </Form>
      </Wrapper>
    )
  }
}

BusinessAnalysisPage.propTypes = {
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
  openModal: PropTypes.func,
  appraisalObject: PropTypes.object,
  updateAppraisal: PropTypes.func,
  risksOptions: PropTypes.object,
  listAppraisalRegister: PropTypes.func,
  valueDriversOptions: PropTypes.object,
  criticalIssuesOptions: PropTypes.object,
  descriptionBusinessRiskArray: PropTypes.array,
  descriptionMarketArray: PropTypes.array
}

const mapPropsToValues = props => ({
  business_id: props.business ? props.business.id : '',
  id: props.appraisalObject ? props.appraisalObject.id : '',
  riskList: props.appraisalObject ? props.appraisalObject.riskList : '',
  criticalIssuesList: props.appraisalObject ? props.appraisalObject.criticalIssuesList : '',
  valueDriversList: props.appraisalObject ? props.appraisalObject.valueDriversList : '',
  confirmBusinessAnalysis: props.appraisalObject ? props.appraisalObject.confirmBusinessAnalysis : false,
  valueSliderBR: props.appraisalObject ? props.appraisalObject.valueSliderBR : null,
  valueSliderMarket: props.appraisalObject ? props.appraisalObject.valueSliderMarket : null
})

const mapStateToProps = state => {
  return {
    risksOptions: state.appraisalRegister.get.risks,
    valueDriversOptions: state.appraisalRegister.get.valueDrivers,
    criticalIssuesOptions: state.appraisalRegister.get.criticalIssues,
    descriptionBusinessRiskArray: state.appraisalRegister.get.descriptionBusinessRisk.array,
    descriptionMarketArray: state.appraisalRegister.get.descriptionMarket.array
  }
}

const validationSchema = Yup.object().shape({})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateAppraisal, listAppraisalRegister }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    enableReinitialize: true
  })(BusinessAnalysisPage)
)
