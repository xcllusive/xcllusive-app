import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { Form, Grid, Button, Icon } from 'semantic-ui-react'

import { getBusiness } from '../../../redux/ducks/business'
import { getAgreementTemplate } from '../../../redux/ducks/agreementTemplates'

import Wrapper from '../../../components/content/Wrapper'

class PreviewAgreement extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' }
          ],
          ['link', 'image'],
          ['clean']
        ]
      },
      formats: [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image'
      ]
    }
    this.quillRef = null
    this.reactQuillRef = null
  }
  componentDidMount () {
    this.props.getBusiness(this.props.match.params.id)
    this.props.getAgreementTemplate(this.props.match.params.idAgreement)
    this._attachQuillRefs()
  }

  componentDidUpdate () {
    this._attachQuillRefs()
  }

  _handleChangeBody = value => {
    this.props.setFieldValue('body', value)
  }

  _handleSelectChangeState = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  _attachQuillRefs = () => {
    // Ensure React-Quill reference is available:
    if (
      !this.reactQuillRef ||
      typeof this.reactQuillRef.getEditor !== 'function'
    ) {
      return false
    }
    // Skip if Quill reference is defined:
    if (this.quillRef !== null) return false

    const quillRef = this.reactQuillRef.getEditor()
    if (quillRef !== null) this.quillRef = quillRef
  }

  render () {
    const { values } = this.props
    return (
      <Wrapper>
        <Form>
          <Grid padded="horizontally">
            <Grid.Row style={{ paddingBottom: 0, paddingLeft: '0px' }}>
              <h4>Body</h4>
            </Grid.Row>
            <Grid.Row columns={1}>
              <Grid.Column
                floated="left"
                width={16}
                style={{ paddingLeft: '0px', paddingRight: 0 }}
              >
                <Form.Field>
                  <ReactQuill
                    ref={el => {
                      this.reactQuillRef = el
                    }}
                    value={values.body}
                    onChange={this._handleChangeBody}
                    style={{ height: '80vh' }}
                    modules={this.state.modules}
                    formats={this.state.formats}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column style={{ marginTop: '50px' }}>
                <Button
                  color="red"
                  // onClick={() =>
                  //   history.push(
                  //     `/business/${objectBusiness.id}/agreement/${
                  //       objectAgreementTemplate.id
                  //     }/preview`
                  //   )
                  // }
                  size="small"
                  floated="right"
                >
                  <Icon name="edit" />
                  Generate PDF
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Wrapper>
    )
  }
}

PreviewAgreement.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  getBusiness: PropTypes.func,
  objectBusiness: PropTypes.object,
  values: PropTypes.object,
  getAgreementTemplate: PropTypes.func,
  objectAgreementTemplate: PropTypes.object,
  setFieldValue: PropTypes.func
}

const validationSchema = Yup.object().shape({})

const mapPropsToValues = props => {
  if (props && props.objectAgreementTemplate) {
    return {
      body: props.objectAgreementTemplate.body
    }
  }
  return {
    body: ''
  }
}

const mapStateToProps = state => ({
  objectBusiness: state.business.get.object,
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
  })(PreviewAgreement)
)
