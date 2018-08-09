import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { Form, Grid, Button, Icon } from 'semantic-ui-react'

import { previewAgreementTemplate } from '../../../redux/ducks/agreementTemplates'
import {
  downloadAgreement,
  sendAgreement,
  getAgreementBody
} from '../../../redux/ducks/agreement'
import { TypesModal, openModal, closeModal } from '../../../redux/ducks/modal'

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
      ],
      body: '',
      bodyUpdate: false
    }
    this.quillRef = null
    this.reactQuillRef = null
  }

  shouldComponentUpdate (nextProps) {
    if (this.props.isSent !== nextProps.isSent && nextProps) {
      this.props.closeModal()
    }

    return true
  }

  componentDidMount () {
    if (this.props.location.state.editAgreement) {
      this.props.getAgreementBody(this.props.match.params.idAgreement)
    } else {
      this.props.previewAgreementTemplate({
        business: this.props.location.state.business,
        values: this.props.location.state.values
      })
    }
    this._attachQuillRefs()
  }

  static getDerivedStateFromProps (props, state) {
    if (
      props.agreementExisted &&
      !state.bodyUpdate &&
      props.location.state.editAgreement
    ) {
      return {
        body: props.agreementExisted.body,
        bodyUpdate: true
      }
    }

    if (props.body && !state.bodyUpdate) {
      return {
        body: props.body,
        bodyUpdate: true
      }
    }
    return null
  }

  componentDidUpdate () {
    this._attachQuillRefs()
  }

  _handleChangeBody = value => {
    this.setState({ body: value })
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
        text: 'Are you sure you want to download the agreement?'
      },
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          this.props.downloadAgreement({
            businessId: this.props.location.state.business.id,
            fileName: `agreement_${this.props.location.state.business.businessName.substring(
              0,
              10
            )}_${moment().format('DD_MM_YYYY')}.pdf`,
            body: this.state.body
          })
        }
      }
    })
  }

  _openModalEmailAgreement = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_EMAIL_AGREEMENT, {
      options: {
        title: 'Preparing Agreement Email'
      },
      vendorEmail: this.props.location.state.business.vendorEmail,
      businessId: this.props.location.state.business.id,
      fileName: `agreement_${this.props.location.state.business.businessName.substring(
        0,
        10
      )}_${moment().format('DD_MM_YYYY')}.pdf`,
      onConfirm: object => {
        if (object) {
          this.props.sendAgreement({
            businessId: this.props.location.state.business.id,
            body: this.state.body,
            mail: object
          })
        }
      }
    })
  }

  render () {
    const { isLoading, isLoadingDownloading } = this.props
    return (
      <Wrapper loading={isLoading}>
        <Grid padded>
          <Grid.Row>
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
                  value={this.state.body}
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
                color="facebook"
                onClick={() =>
                  this.props.history.push({
                    pathname: `/business/${
                      this.props.location.state.business.id
                    }/invoice`,
                    state: { state: this.props.location.state.business.state }
                  })
                }
                size="small"
                floated="left"
              >
                <Icon name="file" />
                Invoice
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
              <Button
                color="red"
                onClick={() => this._modalConfirmGenerateAgreement()}
                size="small"
                floated="right"
                loading={isLoadingDownloading}
              >
                <Icon name="edit" />
                Download Agreement
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Wrapper>
    )
  }
}

PreviewAgreement.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  values: PropTypes.object,
  previewAgreementTemplate: PropTypes.func,
  objectAgreementTemplate: PropTypes.object,
  setFieldValue: PropTypes.func,
  openModal: PropTypes.func,
  downloadAgreement: PropTypes.func,
  location: PropTypes.object,
  body: PropTypes.string,
  isLoading: PropTypes.bool,
  sendAgreement: PropTypes.func,
  closeModal: PropTypes.func,
  isSent: PropTypes.bool,
  getAgreementBody: PropTypes.func,
  agreementExisted: PropTypes.object,
  isLoadingDownloading: PropTypes.bool
}

const mapStateToProps = state => ({
  body: state.agreementTemplates.preview.body,
  isLoading: state.agreementTemplates.preview.isLoading,
  isSent: state.agreement.send.isSent,
  agreementExisted: state.agreement.get.object,
  isLoadingDownloading: state.agreement.download.isLoading
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      previewAgreementTemplate,
      openModal,
      closeModal,
      downloadAgreement,
      sendAgreement,
      getAgreementBody
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreviewAgreement)
