import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Wrapper from '../../components/content/Wrapper'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Header, Segment, Grid, Button, Icon, Divider, Label } from 'semantic-ui-react'
import _ from 'lodash'
import { TypesModal, openModal } from '../../redux/ducks/modal'
import { getDocumentFolder, removeDocumentFolder, getFilesPerOffice } from '../../redux/ducks/documentFolder'

class DocumentFolder extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.props.getDocumentFolder()
  }

  _isUserSystemSettings = () => {
    return _.includes(this.props.userRoles, 'SYSTEM_SETTINGS_MENU')
  }

  _newDocumentFolder = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_NEW_DOCUMENT_FOLDER, {
      titleModal: 'New Folder'
    })
  }

  _editDocumentFolder = documentFolder => {
    this.props.openModal(TypesModal.MODAL_TYPE_NEW_DOCUMENT_FOLDER, {
      titleModal: 'Edit Folder',
      documentFolder
    })
  }

  _removeDocumentFolder = resource => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Delete Resource',
        text: 'Are you sure you want to delete the resource?',
        id: resource.id
      },
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          this.props.removeDocumentFolder(isConfirmed)
        }
      }
    })
  }

  _newDocumentFile = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_NEW_DOCUMENT_FILE, {
      titleModal: 'New File'
    })
  }

  _listFiles = folderId => {
    this.props.getFilesPerOffice(folderId)
  }

  _downloadFile = fileUrl => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Download File',
        text: 'Are you sure you want to download this file?'
      },
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          window.open(fileUrl, '_blank')
        }
      }
    })
  }

  render () {
    const { listFolder, listFiles } = this.props
    return (
      <Wrapper>
        {this._isUserSystemSettings() ? (
          <Header textAlign="right">
            <Button size="small" color="facebook" onClick={() => this._newDocumentFolder()}>
              <Icon name="add" />
              New Folder
            </Button>
            <Button size="small" color="twitter" onClick={() => this._newDocumentFile()}>
              <Icon name="file" />
              New File
            </Button>
          </Header>
        ) : null}
        {listFolder && listFolder.length > 0 ? (
          <Segment style={{ backgroundColor: '#f7f7f7' }} size="tiny">
            <Grid style={{ marginTop: '10px' }}>
              {listFolder.map((folder, index) => {
                if (folder) {
                  return (
                    <Fragment key={index}>
                      <Grid.Row style={{ paddingBottom: '0px' }}>
                        <Grid.Column>
                          <Divider horizontal>
                            <Header as="h3" color="blue" textAlign="center" content={folder[0]['office_id.label']} />
                          </Divider>
                        </Grid.Column>
                      </Grid.Row>
                      {folder.map((folderOffice, index1) => {
                        return (
                          <Fragment key={index1}>
                            <Grid.Row>
                              <Grid.Column>
                                <Icon name="folder" />
                                <Label
                                  style={{ backgroundColor: '#f7f7f7', color: 'black', paddingLeft: '5px' }}
                                  as="a"
                                  size="big"
                                  onClick={() => this._listFiles(folderOffice.id)}
                                >
                                  {folderOffice.name}
                                </Label>
                              </Grid.Column>
                            </Grid.Row>
                            {listFiles && listFiles.length > 0 ? (
                              <Fragment>
                                {listFiles.map((files, index2) => {
                                  if (files.folder_id === folderOffice.id) {
                                    return (
                                      <Grid.Row style={{ paddingTop: '0px', paddingBottom: '0px' }} key={index2}>
                                        <Grid.Column style={{ marginLeft: '50px', color: 'blue' }}>
                                          <Icon
                                            link
                                            name="download"
                                            // color="blue"
                                            onClick={() => this._downloadFile(files.url)}
                                          />
                                          <Label
                                            style={{ backgroundColor: '#f7f7f7', color: 'blue', paddingLeft: '5px' }}
                                            as="a"
                                            size="large"
                                            onClick={() => this._downloadFile(files.url)}
                                          >
                                            <u>{files.name}</u>
                                          </Label>
                                        </Grid.Column>
                                      </Grid.Row>
                                    )
                                  }
                                })}
                              </Fragment>
                            ) : null}
                          </Fragment>
                        )
                      })}
                    </Fragment>
                  )
                }
              })}
            </Grid>
          </Segment>
        ) : null}
        <Divider horizontal inverted />
      </Wrapper>
    )
  }
}

DocumentFolder.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  userRoles: PropTypes.array,
  openModal: PropTypes.func,
  getDocumentFolder: PropTypes.func,
  listFolder: PropTypes.array,
  removeDocumentFolder: PropTypes.func,
  getFilesPerOffice: PropTypes.func,
  listFiles: PropTypes.array
}

const mapStateToProps = state => ({
  userRoles: state.auth.user.roles,
  listFolder: state.documentFolder.get.array,
  isCreated: state.resource.create.isCreated,
  isUpdated: state.resource.create.isUpdated,
  listFiles: state.documentFolder.listFiles.array
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ openModal, getDocumentFolder, removeDocumentFolder, getFilesPerOffice }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentFolder)
