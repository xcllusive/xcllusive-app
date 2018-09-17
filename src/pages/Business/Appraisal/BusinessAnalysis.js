import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import {
  Message,
  Step,
  Grid,
  Table,
  Header,
  Form,
  Pagination
} from 'semantic-ui-react'
import * as Yup from 'yup'
import Wrapper from '../../../components/content/Wrapper'
import { updateAppraisal } from '../../../redux/ducks/appraisal'
import { listAppraisalRegister } from '../../../redux/ducks/appraisalRegister'

class AboutPage extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillUnmount () {
    this.props.updateAppraisal(this.props.values)
  }

  componentDidMount () {
    this.props.listAppraisalRegister('risks', 5)
  }

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  render () {
    // const { values, handleChange, handleBlur, errors, touched } = this.props
    return (
      <Wrapper>
        <Step.Group size="large">
          <Step
            active
            icon="tasks"
            title="Step 3"
            description="Business Analysis"
          />
          <Message info size="large">
            <p>
              The information you enter on this page will be shown on the
              `Business Analysis` page of the appraisal. This information will
              be used to calculate the capitalisation rate/multiplier for the
              final appraisal value. You will have the option to manually set
              the capitalisation rate from the Pricing page. The column on the
              left allows you to rate different business aspects and the column
              on the right allows you to select the degree of impact you feel
              that each aspect has on the business value.
            </p>
          </Message>
        </Step.Group>
        <Grid>
          <Header
            style={{ marginTop: '25px' }}
            as="h3"
            textAlign="center"
            color="blue"
          >
            Risks
          </Header>
          <Grid.Row style={{ marginTop: '-15px' }} columns={2}>
            <Grid.Column width={9}>
              <Form>
                <Form.Field>
                  <Form.TextArea style={{ height: '205px' }} />
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column width={7}>
              <Table color="blue" celled inverted selectable compact>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Label</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.risksOptions.array.map(risksOptions => {
                    return (
                      <Table.Row active key={risksOptions.id}>
                        <Table.Cell>{risksOptions.id}</Table.Cell>
                        <Table.Cell>{risksOptions.label}</Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
              <Pagination
                size="mini"
                onPageChange={(e, data) =>
                  this._handlePaginationChange(e, data, 'risks')
                }
                defaultActivePage={this.props.risksOptions.activePage}
                totalPages={this.props.risksOptions.pages}
                firstItem={null}
                lastItem={null}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Wrapper>
    )
  }
}

AboutPage.propTypes = {
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
  listAppraisalRegister: PropTypes.func
}

const mapPropsToValues = props => ({
  business_id: props.business ? props.business.id : '',
  id: props.appraisalObject ? props.appraisalObject.id : ''
})

const mapStateToProps = state => {
  return {
    risksOptions: state.appraisalRegister.get.risks
  }
}

const validationSchema = Yup.object().shape({})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { updateAppraisal, listAppraisalRegister },
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
  })(AboutPage)
)
