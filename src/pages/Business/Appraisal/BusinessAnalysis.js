import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Form, Message, Step, Grid, Table, Header } from 'semantic-ui-react'
import * as Yup from 'yup'
import Wrapper from '../../../components/content/Wrapper'
import { updateAppraisal } from '../../../redux/ducks/appraisal'

class AboutPage extends Component {
  constructor (props) {
    super(props)
    this.state = {}
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

  render () {
    // const { values, handleChange, handleBlur, errors, touched } = this.props
    return (
      <Wrapper>
        <Step.Group size="large">
          <Step
            active
            icon="pencil alternate"
            title="Step 2"
            description="About This Business"
          />
          <Message info size="large">
            <p>
              The information you enter on this page will be used on the `About
              This Business` page of the appraisal. Though it won`t be used in
              any specific calculations it is important to complete in full as
              it will demonstrate to the vendor that care has been taken in
              assessing their business. A number of these fields will also
              update fields on the business database and our agents may use
              parts of it in the Sales Memorandum. Anything not entered will be
              left as blank.
            </p>
          </Message>
        </Step.Group>
        <Form>
          <Grid celled="internally" divided>
            <Header as="h3" textAlign="center" color="blue">
              Risks
            </Header>
            <Grid.Row columns={2}>
              <Grid.Column width={10}>
                <Table
                  color="blue"
                  celled
                  inverted
                  selectable
                  size="small"
                  compact
                >
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Buyer</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {/* {listBuyersList.map(buyersList => ( */}
                    <Table.Row active>
                      <Table.Cell />
                    </Table.Row>
                    {/* ))} */}
                  </Table.Body>
                </Table>
              </Grid.Column>
              <Grid.Column width={6}>
                <Table
                  color="blue"
                  celled
                  inverted
                  selectable
                  size="small"
                  compact
                >
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Buyer</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {/* {listBuyersList.map(buyersList => ( */}
                    <Table.Row active>
                      <Table.Cell />
                    </Table.Row>
                    {/* ))} */}
                  </Table.Body>
                </Table>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
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
  updateAppraisal: PropTypes.func
}

const mapPropsToValues = props => ({
  business_id: props.business ? props.business.id : '',
  id: props.appraisalObject ? props.appraisalObject.id : ''
})

const mapStateToProps = state => {
  return {}
}

const validationSchema = Yup.object().shape({})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateAppraisal }, dispatch)
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
