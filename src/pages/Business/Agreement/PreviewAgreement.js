import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { Form, Grid, Button, Icon, Header } from 'semantic-ui-react'

import { getAgreementTemplate } from '../../../redux/ducks/agreementTemplates'
import {
  generateAgreement,
  sendAgreement
} from '../../../redux/ducks/agreement'
import { TypesModal, openModal } from '../../../redux/ducks/modal'

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

  _modalConfirmGenerateAgreement = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Send Agreement',
        text: 'Are you sure you want to generate the agreement as a PDF?'
      },
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          this.props.generateAgreement()
        }
      }
    })
  }

  _openModalEmailAgreement = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_EMAIL_AGREEMENT, {
      options: {
        title: 'Preparing Agreement Email'
      },
      vendorEmail: this.props.location.state.business.vendorEmail
    })
  }

  render () {
    console.log(this.props.location.state.email)
    const { values, objectAgreementTemplate } = this.props
    return (
      <Wrapper>
        <Form>
          <Grid padded="horizontally">
            <Grid.Row>
              <Grid.Column>
                <Header
                  style={{ paddingTop: '1rem' }}
                  as="h2"
                  content={
                    objectAgreementTemplate
                      ? objectAgreementTemplate.title
                      : null
                  }
                />
              </Grid.Column>
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
                    style={{ height: '75vh' }}
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
                  onClick={() => this._modalConfirmGenerateAgreement()}
                  size="small"
                  floated="left"
                >
                  <Icon name="edit" />
                  Generate Agreement
                </Button>
                <Button
                  color="yellow"
                  onClick={() => this._openModalEmailAgreement()}
                  size="small"
                  floated="right"
                >
                  <Icon name="mail" />
                  Send Agreement
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
  values: PropTypes.object,
  getAgreementTemplate: PropTypes.func,
  objectAgreementTemplate: PropTypes.object,
  setFieldValue: PropTypes.func,
  openModal: PropTypes.func,
  generateAgreement: PropTypes.func,
  location: PropTypes.object
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
  objectAgreementTemplate: state.agreementTemplates.get.object
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAgreementTemplate,
      openModal,
      generateAgreement,
      sendAgreement
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
