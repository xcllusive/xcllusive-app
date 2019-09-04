import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Wrapper from '../../components/content/Wrapper'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Header, Segment, Grid, Icon, Divider, Label, Button, Table, Popup, Form } from 'semantic-ui-react'
import _ from 'lodash'
import { TypesModal, openModal } from '../../redux/ducks/modal'
import { getGroupEmailFolder, clearEmailTemplates, getEmailTemplates } from '../../redux/ducks/groupEmail'

class GroupEmailTemplate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editMode: false,
      viewEmail: null
    }
  }

  componentDidMount () {
    this.props.getGroupEmailFolder()
  }

  _isUserSystemSettings = () => {
    return _.includes(this.props.userRoles, 'SYSTEM_SETTINGS_MENU')
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

  _listTemplates = async folderId => {
    if (folderId === this.state.folderId) {
      this.props.clearEmailTemplates()
      this.setState({ folderId: null })
    } else {
      await this.props.getEmailTemplates(folderId)
      this.setState({ folderId: folderId })
    }
  }

  _downloadFile = file => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Download File',
        text: `Are you sure you want to download this file (${file.name}) ?`
      },
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          window.open(file.url, '_blank')
        }
      }
    })
  }

  _sendEmail = template => {
    window.location.href = `mailto: ?subject= &body=Hi ${template.body}`
  }

  _viewEmail = template => {
    this.setState({ viewEmail: template.id })
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
            <Grid style={{ marginTop: '10px' }}>
              <Fragment>
                {listFolder.map((folder, index) => {
                  return (
                    <Fragment key={index}>
                      <Grid.Row style={{ paddingTop: '0px' }} columns={2}>
                        <Grid.Column style={{ paddingRight: '0px' }} width={2}>
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
                        {this._isUserSystemSettings() && this.state.editMode ? (
                          <Grid.Column style={{ paddingLeft: '0px', marginTop: '3px' }}>
                            <Icon
                              style={{ marginLeft: '5px' }}
                              onClick={() => this._newEmailTemplate(folder)}
                              name="add"
                              color="blue"
                              size="large"
                            />
                          </Grid.Column>
                        ) : null}
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
                                          <Form.Field>
                                            <Form.TextArea value={template.body} />
                                          </Form.Field>
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
  location: PropTypes.object,
  userRoles: PropTypes.array,
  openModal: PropTypes.func,
  getGroupEmailFolder: PropTypes.func,
  listFolder: PropTypes.array,
  removeDocumentFolder: PropTypes.func,
  removeDocumentFile: PropTypes.func,
  clearEmailTemplates: PropTypes.func,
  getEmailTemplates: PropTypes.func,
  listTemplates: PropTypes.array
}

const mapStateToProps = state => ({
  userRoles: state.auth.user.roles,
  listFolder: state.groupEmail.get.array,
  listTemplates: state.groupEmail.listEmailTemplates.array
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ openModal, getGroupEmailFolder, clearEmailTemplates, getEmailTemplates }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupEmailTemplate)
