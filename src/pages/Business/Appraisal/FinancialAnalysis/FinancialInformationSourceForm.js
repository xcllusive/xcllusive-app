import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Form, Label, Segment, Icon } from 'semantic-ui-react'
import * as Yup from 'yup'
import { listAppraisalRegister } from '../../../../redux/ducks/appraisalRegister'
import { mapArrayToValuesForDropdown } from '../../../../utils/sharedFunctionArray'
import { TypesModal, openModal } from '../../../../redux/ducks/modal'

class FinancialInformationSourceForm extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.props.listAppraisalRegister('financialInfoSource')
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  _newAppraisalRegister = type => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Confirming...',
        text:
          'This will add a new business `Financial Information Source` to the list. Before you do this, please ensure that an applicable option is not included in the list.'
      },
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          this.props.openModal(TypesModal.MODAL_TYPE_NEW_APPRAISAL_REGISTER, {
            title: 'New Appraisal Register',
            typeAdd: type
          })
        }
      }
    })
  }

  render () {
    const { values, errors, touched, financialInfoSourceOptions } = this.props
    return (
      <Fragment>
        <Segment style={{ marginLeft: '-10px' }}>
          <Form>
            <Form.Group>
              <Form.Field width={15}>
                <Form.Select
                  label="Financial Information Source"
                  options={mapArrayToValuesForDropdown(
                    financialInfoSourceOptions
                  )}
                  name="financialInfoSource"
                  autoComplete="financialInfoSource"
                  value={values.financialInfoSource}
                  onChange={this._handleSelectChange}
                />
                {errors.financialInfoSource &&
                  touched.financialInfoSource && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.financialInfoSource}
                  />
                )}
              </Form.Field>
              <Form.Field width={1}>
                <Icon
                  style={{ marginTop: '27px', marginLeft: '-10px' }}
                  name="add"
                  color="green"
                  inverted
                  circular
                  link
                  onClick={() =>
                    this._newAppraisalRegister('financialInfoSource')
                  }
                />
              </Form.Field>
            </Form.Group>
          </Form>
        </Segment>
      </Fragment>
    )
  }
}

FinancialInformationSourceForm.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  setFieldValue: PropTypes.func,
  isValid: PropTypes.bool,
  financialInfoSourceOptions: PropTypes.array,
  listAppraisalRegister: PropTypes.func,
  openModal: PropTypes.func
}

const mapPropsToValues = props => ({})

const mapStateToProps = state => {
  return {
    financialInfoSourceOptions:
      state.appraisalRegister.get.financialInfoSource.array
  }
}

const validationSchema = Yup.object().shape({})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ listAppraisalRegister, openModal }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    enableReinitialize: true
  })(FinancialInformationSourceForm)
)
