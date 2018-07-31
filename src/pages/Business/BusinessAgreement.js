import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css'
import { withFormik } from 'formik'
import * as Yup from 'yup'

import { Form, Header, Grid, Segment } from 'semantic-ui-react'

import { getBusiness } from '../../redux/ducks/business'
import { getAgreementTemplate } from '../../redux/ducks/agreementTemplates'

import Wrapper from '../../components/content/Wrapper'

class BusinessAgreement extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentDidMount () {
    this.props.getBusiness(this.props.match.params.id)
    this.props.getAgreementTemplate(this.props.match.params.idAgreement)
  }

  render () {
    const { objectAgreementTemplate } = this.props
    return (
      <Wrapper>
        <Grid celled="internally" divided>
          {objectAgreementTemplate ? (
            <Header
              style={{ paddingTop: '1rem' }}
              as="h2"
              content={`${objectAgreementTemplate.title}`}
            />
          ) : null}
          <Grid.Row>
            <Grid.Column>
              <Header as="h3" content="Business Details" />
              <Segment>
                <Form>
                  <Form.Group widths="equal">
                    <Form.Input
                      label="First Name"
                      // value={this.props.buyer.firstName}
                    />
                    <Form.Input
                      label="Last Name"
                      // value={this.props.buyer.surname}
                    />
                    <Form.Input
                      label="Phone"
                      // value={this.props.buyer.surname}
                    />
                    <Form.Input
                      label="ABN/ACN"
                      // value={this.props.buyer.surname}
                    />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Input
                      label="Address"
                      // value={this.props.buyer.surname}
                    />
                    <Form.Input
                      label="For sale of the businesses known as"
                      // value={this.props.buyer.surname}
                    />
                    <Form.Input
                      label="Conducted at"
                      // value={this.props.buyer.surname}
                    />
                  </Form.Group>
                </Form>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Header as="h3" content="Contract Fields" />
              <Segment>
                <Form>
                  <Form.Group widths="equal">
                    <Form.Input
                      label="Listed Price"
                      // value={this.props.buyer.firstName}
                    />
                    <Form.Input
                      label="Appraisal High $"
                      // value={this.props.buyer.firstName}
                    />
                    <Form.Input
                      label="Appraisal Low $"
                      // value={this.props.buyer.firstName}
                    />
                    <Form.Input
                      label="Engagement Fee"
                      // value={this.props.buyer.firstName}
                    />
                    <Form.Input
                      label="Commission %"
                      // value={this.props.buyer.firstName}
                    />
                  </Form.Group>
                </Form>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Header
                as="h3"
                content="Option For Principal Introduction Of Buyer"
              />
              <Segment>
                <Form>
                  <Form.Group widths="equal">
                    <Form.Input
                      label="Commission Discount"
                      // value={this.props.buyer.firstName}
                    />
                    <Form.TextArea
                      label="Introduction Parties"
                      // value={this.props.buyer.firstName}
                    />
                  </Form.Group>
                </Form>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Header as="h3" content="Property Option" />
              <Segment>
                <Form>
                  <Form.Group widths="equal">
                    <Form.Input
                      label="Commission"
                      // value={this.props.buyer.firstName}
                    />
                    <Form.Input
                      label="Address"
                      // value={this.props.buyer.firstName}
                    />
                    <Form.Input
                      label="Price"
                      // value={this.props.buyer.firstName}
                    />
                  </Form.Group>
                </Form>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Wrapper>
    )
  }
}

BusinessAgreement.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  buyer: PropTypes.object,
  getBusiness: PropTypes.func,
  business: PropTypes.object,
  values: PropTypes.object,
  getAgreementTemplate: PropTypes.func,
  objectAgreementTemplate: PropTypes.object
}

const validationSchema = Yup.object().shape({})

const mapPropsToValues = props => {}

const mapStateToProps = state => ({
  business: state.business.get.object,
  objectAgreementTemplate: state.agreementTemplates.get.object
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getBusiness,
      getAgreementTemplate
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    enableReinitialize: true
  })(BusinessAgreement)
)
