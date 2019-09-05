import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Wrapper from '../../components/content/Wrapper'
import { withFormik } from 'formik'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Header, Segment, Grid, Icon, Divider, Label, Button, Table, Popup, Form } from 'semantic-ui-react'
import _ from 'lodash'
import { TypesModal, openModal } from '../../redux/ducks/modal'
import {
  getGroupEmailFolder,
  clearEmailTemplates,
  getGroupEmailTemplates,
  removeGroupEmailTemplate,
  removeGroupEmailFolder
} from '../../redux/ducks/groupEmail'

class GroupEmailTemplate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editMode: false,
      viewEmail: null,
      modules: {
        toolbar: null
      },
      formats: ['', '', '', '', '', '', '', '', '', '', '']
    }
  }

  componentDidMount () {
    this.props.getGroupEmailFolder()
  }

  _isUserSystemSettings = () => {
    return _.includes(this.props.userRoles, 'SYSTEM_SETTINGS_MENU')
  }

  _convertHtmlToRightText = html => {
    let htmlConverted = html.replace(/<style([\s\S]*?)<\/style>/gi, '')
    htmlConverted = htmlConverted.replace(/<script([\s\S]*?)<\/script>/gi, '')
    htmlConverted = htmlConverted.replace(/<\/div>/gi, '')
    htmlConverted = htmlConverted.replace(/<\/li>/gi, '')
    htmlConverted = htmlConverted.replace(/<li>/gi, '  *  ')
    htmlConverted = htmlConverted.replace(/<\/ul>/gi, '')
    htmlConverted = htmlConverted.replace(/<p><br><\/p>/gi, '\n')
    htmlConverted = htmlConverted.replace(/<\/p>/gi, '\n')
    htmlConverted = htmlConverted.replace(/<br\s*[\\/]?>/gi, '\n')
    htmlConverted = htmlConverted.replace(/<[^>]+>/gi, '')

    return encodeURIComponent(htmlConverted)
  }

  _editDocumentFolder = documentFolder => {
    documentFolder.allOffices = documentFolder.allOffices !== 0
    this.props.openModal(TypesModal.MODAL_TYPE_NEW_DOCUMENT_FOLDER, {
      titleModal: 'Edit Folder',
      documentFolder
    })
  }

  _newEmailTemplate = folderObject => {
    this.props.openModal(TypesModal.MODAL_TYPE_NEW_GROUP_EMAIL_TEMPLATE, {
      titleModal: 'New Email Template',
      folderObject
    })
  }

  _editTemplate = templateObject => {
    this.props.openModal(TypesModal.MODAL_TYPE_NEW_GROUP_EMAIL_TEMPLATE, {
      titleModal: 'Edit Email Template',
      templateObject
    })
  }

  _deleteTemplate = templateObject => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Remove Template',
        text: `Are you sure you want to delete this template (${templateObject.name}) ?`
      },
      onConfirm: async isConfirmed => {
        if (isConfirmed) {
          await this.props.removeGroupEmailTemplate(templateObject)
          this.props.getGroupEmailTemplates()
        }
      }
    })
  }

  _listTemplates = async folderId => {
    if (folderId === this.state.folderId) {
      this.props.clearEmailTemplates()
      this.setState({ folderId: null })
    } else {
      await this.props.getGroupEmailTemplates(folderId)
      this.setState({ folderId: folderId })
    }
  }

  _sendEmail = template => {
    const body = this._convertHtmlToRightText(template.body)
    // const body = document.createElement(template.body)
    window.location.href = `mailto: ?subject= &body=${body}`
  }

  _viewEmail = template => {
    if (this.state.viewEmail === template.id) {
      this.setState({ viewEmail: null })
    } else {
      this.setState({ viewEmail: template.id })
    }
  }

  _editMode = () => {
    this.setState({
      editMode: true
    })
  }

  _newFolder = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_NEW_GROUP_EMAIL_FOLDER, {
      titleModal: 'New Folder'
    })
  }

  _editFolder = folderObject => {
    this.props.openModal(TypesModal.MODAL_TYPE_NEW_GROUP_EMAIL_FOLDER, {
      titleModal: 'New Folder',
      folderObject
    })
  }

  _deleteFolder = folderObject => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Remove Folder',
        text: `Are you sure you want to delete this folder (${folderObject.name}) ?`
      },
      onConfirm: async isConfirmed => {
        if (isConfirmed) {
          await this.props.removeGroupEmailFolder(folderObject)
          this.props.getGroupEmailFolder()
        }
      }
    })
  }

  render () {
    const { listFolder, listTemplates } = this.props
    return (
      <Wrapper>
        {this._isUserSystemSettings() ? (
          <Header textAlign="right">
            <Button
              size="small"
              color={!this.state.editMode ? 'yellow' : 'facebook'}
              onClick={() => (!this.state.editMode ? this._editMode() : this._newFolder())}
            >
              <Icon name={!this.state.editMode ? 'edit' : 'add'} />
              {!this.state.editMode ? 'Edit Mode' : 'New Folder'}
            </Button>
          </Header>
        ) : null}
        {listFolder && listFolder.length > 0 ? (
          <Segment size="tiny">
            <Grid style={{ marginTop: '10px' }} divided="vertically">
              <Fragment>
                {listFolder.map((folder, index) => {
                  return (
                    <Fragment key={index}>
                      <Grid.Row style={{ paddingTop: '0px' }} columns={2}>
                        <Grid.Column style={{ paddingRight: '0px' }} width={2}>
                          {this._isUserSystemSettings() && this.state.editMode ? (
                            <Grid.Column style={{ paddingLeft: '0px', marginTop: '3px' }}>
                              <Icon
                                style={{ marginLeft: '5px' }}
                                onClick={() => this._newEmailTemplate(folder)}
                                link
                                name="add"
                                color="blue"
                                size="large"
                              />
                              <Icon
                                style={{ marginLeft: '5px' }}
                                onClick={() => this._editFolder(folder)}
                                link
                                name="edit"
                                color="orange"
                                size="large"
                              />
                              <Icon
                                link
                                name="trash"
                                color="red"
                                size="large"
                                onClick={() => this._deleteFolder(folder)}
                              />
                            </Grid.Column>
                          ) : null}
                          <Icon
                            onClick={() => this._listTemplates(folder.id)}
                            link
                            name="folder"
                            color="yellow"
                            size="big"
                          />
                          <Label
                            style={{ backgroundColor: 'white', color: 'black', paddingLeft: '5px', marginTop: '5px' }}
                            as="a"
                            size="large"
                            onClick={() => this._listTemplates(folder.id)}
                          >
                            {folder.name}
                          </Label>
                        </Grid.Column>
                      </Grid.Row>
                      {listTemplates && listTemplates.length > 0 ? (
                        <Fragment>
                          {listTemplates.map((template, index2) => {
                            if (template.folder_id === folder.id) {
                              return (
                                <Table style={{ marginLeft: '50px' }} key={index2} basic="very" celled size="large">
                                  <Table.Header>
                                    <Table.Row>
                                      <Table.HeaderCell>
                                        {this.state.editMode ? (
                                          <Fragment>
                                            <Icon
                                              link
                                              name="trash"
                                              color="red"
                                              size="big"
                                              onClick={() => this._deleteTemplate(template)}
                                            />
                                            <Icon
                                              link
                                              name="edit"
                                              color="orange"
                                              size="big"
                                              onClick={() => this._editTemplate(template)}
                                            />
                                          </Fragment>
                                        ) : null}
                                        <Popup
                                          content="Send"
                                          trigger={
                                            <Icon
                                              link
                                              name="send"
                                              color="green"
                                              size="big"
                                              onClick={() => this._sendEmail(template)}
                                            />
                                          }
                                        />
                                        <Popup
                                          content="View"
                                          trigger={
                                            <Icon
                                              link
                                              name="mail"
                                              color="blue"
                                              size="big"
                                              onClick={() => this._viewEmail(template)}
                                            />
                                          }
                                        />

                                        <Label
                                          style={{
                                            backgroundColor: 'white',
                                            paddingLeft: '5px'
                                          }}
                                          as="a"
                                          size="large"
                                        >
                                          {template.name}
                                        </Label>
                                      </Table.HeaderCell>
                                    </Table.Row>
                                    {this.state.viewEmail === template.id ? (
                                      <Table.Row>
                                        <Table.HeaderCell>
                                          <Form>
                                            <Form.Field>
                                              <ReactQuill
                                                readOnly
                                                onChange={this._handleChangeBody}
                                                value={template.body}
                                                style={{ height: '40vh' }}
                                                modules={this.state.modules}
                                                formats={this.state.formats}
                                              />
                                            </Form.Field>
                                            <Form.Field>
                                              <Button
                                                size="small"
                                                color="green"
                                                floated="right"
                                                onClick={() =>
                                                  !this.state.editMode ? this._editMode() : this._newFolder()
                                                }
                                              >
                                                <Icon name="send" />
                                                Send
                                              </Button>
                                            </Form.Field>
                                          </Form>
                                        </Table.HeaderCell>
                                      </Table.Row>
                                    ) : null}
                                  </Table.Header>
                                </Table>
                              )
                            }
                          })}
                        </Fragment>
                      ) : null}
                    </Fragment>
                  )
                })}
              </Fragment>
            </Grid>
          </Segment>
        ) : null}
        <Divider horizontal inverted />
      </Wrapper>
    )
  }
}

GroupEmailTemplate.propTypes = {
  history: PropTypes.object,
  values: PropTypes.object,
  setFieldValue: PropTypes.func,
  location: PropTypes.object,
  userRoles: PropTypes.array,
  openModal: PropTypes.func,
  getGroupEmailFolder: PropTypes.func,
  listFolder: PropTypes.array,
  removeDocumentFolder: PropTypes.func,
  removeDocumentFile: PropTypes.func,
  clearEmailTemplates: PropTypes.func,
  getGroupEmailTemplates: PropTypes.func,
  listTemplates: PropTypes.array,
  removeGroupEmailTemplate: PropTypes.func,
  removeGroupEmailFolder: PropTypes.func
}

const mapPropsToValues = props => ({})

const mapStateToProps = state => ({
  userRoles: state.auth.user.roles,
  listFolder: state.groupEmail.get.array,
  listTemplates: state.groupEmail.listEmailTemplates.array
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openModal,
      getGroupEmailFolder,
      clearEmailTemplates,
      getGroupEmailTemplates,
      removeGroupEmailTemplate,
      removeGroupEmailFolder
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues
  })(GroupEmailTemplate)
)
