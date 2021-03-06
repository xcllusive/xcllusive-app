import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import 'jodit'
import 'jodit/build/jodit.min.css'
import JoditEditor from 'jodit-react'

import { Grid, Button, Icon } from 'semantic-ui-react'

import { previewAgreementTemplate } from '../../../redux/ducks/agreementTemplates'
import { downloadAgreement, sendAgreement, getAgreementBody, saveAgreement } from '../../../redux/ducks/agreement'
import { TypesModal, openModal, closeModal } from '../../../redux/ducks/modal'

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
  }

  static getDerivedStateFromProps (props, state) {
    if (props.agreementExisted && !state.bodyUpdate && props.location.state.editAgreement) {
      return {
        body:
          props.location.state.typeAgreement === 'businessAgreement'
            ? props.agreementExisted.body
            : props.agreementPropertyExisted.body,
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

  _handleChangeBody = value => {
    this.setState({ body: value })
  }

  _handleSelectChangeState = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
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
      fileNameAgreement:
        this.props.location.state.typeAgreement === 'businessAgreement'
          ? `agreement_${this.props.location.state.business.businessName.substring(0, 10)}_${moment().format(
            'DD_MM_YYYY'
          )}.pdf`
          : null,
      fileNamePropertyAgreement:
        this.props.location.state.typeAgreement === 'propertyAgreement'
          ? `propertyagreement_${this.props.location.state.business.businessName.substring(0, 10)}_${moment().format(
            'DD_MM_YYYY'
          )}.pdf`
          : null,
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

  _saveReturnAgreement = async () => {
    await this.props.saveAgreement({
      businessId: this.props.location.state.business.id,
      body: this.state.body,
      values: this.props.location.state.values,
      typeAgreement: this.props.location.state.typeAgreement,
      title: this.props.location.state.title
    })
    this.props.history.push({
      pathname: `/business/${this.props.location.state.business.id}/agreementInvoice`,
      state: {
        business: this.props.location.state.business
      }
    })
  }

  _config = () => {}

  render () {
    // const { isValid } = this.props.location.state
    const { isLoading, isLoadingDownloading } = this.props
    return (
      <Wrapper loading={isLoading}>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <JoditEditor value={this.state.body} config={this._config} onChange={this._handleChangeBody} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid padded>
          <Grid.Row>
            <Grid.Column style={{ marginTop: '50px' }}>
              <Button color="red" onClick={() => this._saveReturnAgreement()} size="small" floated="left">
                <Icon name="save" />
                Save and Return
              </Button>
              {/* <Button color={theme.buttonSave} onClick={() => this._saveReturnAgreement()} size="small" floated="right">
                <Icon name="save" />
                Save Agreement
              </Button> */}
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
  agreementPropertyExisted: PropTypes.object,
  saveAgreement: PropTypes.func,
  isValid: PropTypes.bool
}

const mapStateToProps = state => ({
  body: state.agreementTemplates.preview.body,
  isLoading: state.agreementTemplates.preview.isLoading,
  isSent: state.agreement.send.isSent,
  agreementExisted: state.agreement.get.object,
  agreementPropertyExisted: state.agreement.get.objectProperty,
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
      getAgreementBody,
      saveAgreement
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreviewAgreement)
