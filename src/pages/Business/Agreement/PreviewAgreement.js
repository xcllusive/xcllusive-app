import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { Form, Grid, Button, Icon } from 'semantic-ui-react'

import { previewAgreementTemplate } from '../../../redux/ducks/agreementTemplates'
import { downloadAgreement, sendAgreement, getAgreementBody } from '../../../redux/ducks/agreement'
import { TypesModal, openModal, closeModal } from '../../../redux/ducks/modal'
import { getLastInvoice } from '../../../redux/ducks/invoice'

import Wrapper from '../../../components/content/Wrapper'
import { theme } from '../../../styles'

class PreviewAgreement extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
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
      this.props.getAgreementBody(this.props.location.state.business.id)
    } else {
      this.props.previewAgreementTemplate({
        business: this.props.location.state.business,
        values: this.props.location.state.values
      })
    }
    this._attachQuillRefs()

    // this.props.getLastInvoice(this.props.match.params.id)
  }

  static getDerivedStateFromProps (props, state) {
  // cayo
    if (props.agreementExisted && !state.bodyUpdate && props.location.state.editAgreement) {
      return {
        body: props.location.state.typeAgreement === 'businessAgreement' ? props.agreementExisted.body : props.agreementPropertyExisted.body,
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
    if (!this.reactQuillRef || typeof this.reactQuillRef.getEditor !== 'function') {
      return false
    }
    // Skip if Quill reference is defined:
    if (this.quillRef !== null) return false

    const quillRef = this.reactQuillRef.getEditor()
    if (quillRef !== null) this.quillRef = quillRef
  }

  _modalConfirmDownloadAgreement = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Download Agreement',
        text: 'Are you sure you want to download the agreement?'
      },
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          this.props.downloadAgreement({
            businessId: this.props.location.state.business.id,
            fileName: `agreement_${this.props.location.state.business.businessName.substring(0, 10)}_${moment().format(
              'DD_MM_YYYY'
            )}.pdf`,
            body: this.state.body,
            values: this.props.location.state.values,
            typeAgreement: this.props.location.state.typeAgreement,
            title: this.props.location.state.title
          })
        }
      }
    })
  }

  _openModalEmailAgreement = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_EMAIL_AGREEMENT_INVOICE, {
      options: {
        title: 'Preparing Agreement/Invoice Email'
      },
      vendorEmail: this.props.location.state.business.vendorEmail,
      businessId: this.props.location.state.business.id,
      fileNameAgreement: `agreement_${this.props.location.state.business.businessName.substring(
        0,
        10
      )}_${moment().format('DD_MM_YYYY')}.pdf`,
      fileNameInvoice: this.props.objectLastInvoice ? `${this.props.objectLastInvoice.ref}.pdf` : '',
      fromAgreement: true,
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
            <Grid.Column floated="left" width={16} style={{ paddingLeft: '0px', paddingRight: 0 }}>
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
                color="green"
                onClick={() => this.props.history.push(`/business/${this.props.location.state.business.id}`)}
                size="small"
                floated="left"
              >
                <Icon name="backward" />
                Return to Business
              </Button>
              <Button
                color={theme.buttonSave}
                onClick={() => this._openModalEmailAgreement()}
                size="small"
                floated="right"
              >
                <Icon name="mail" />
                Send Agreement
              </Button>
              <Button
                color={theme.buttonDownload}
                onClick={this._modalConfirmDownloadAgreement}
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
  isLoadingDownloading: PropTypes.bool,
  getLastInvoice: PropTypes.func,
  objectLastInvoice: PropTypes.object,
  agreementPropertyExisted: PropTypes.object
}

const mapStateToProps = state => ({
  body: state.agreementTemplates.preview.body,
  isLoading: state.agreementTemplates.preview.isLoading,
  isSent: state.agreement.send.isSent,
  agreementExisted: state.agreement.get.object,
  agreementPropertyExisted: state.agreement.get.objectProperty,
  isLoadingDownloading: state.agreement.download.isLoading,
  objectLastInvoice: state.invoice.getLastInvoice.object
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      previewAgreementTemplate,
      openModal,
      closeModal,
      downloadAgreement,
      sendAgreement,
      getAgreementBody,
      getLastInvoice
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreviewAgreement)
