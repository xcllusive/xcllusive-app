import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Wrapper from '../../../components/content/Wrapper'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Header, Segment, Grid, Button, Icon, Divider, Label, Table } from 'semantic-ui-react'
import _ from 'lodash'
import { TypesModal, openModal } from '../../../redux/ducks/modal'
import {
  getDocumentFolder,
  removeDocumentFolder,
  getFilesPerOffice,
  removeDocumentFile,
  clearFiles
} from '../../../redux/ducks/documentFolder'

class DocumentFolderEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editMode: false
    }
  }

  componentDidMount () {
    this.props.getDocumentFolder(true)
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
    documentFolder.allOffices = documentFolder.allOffices !== 0
    this.props.openModal(TypesModal.MODAL_TYPE_NEW_DOCUMENT_FOLDER, {
      titleModal: 'Edit Folder',
      documentFolder
    })
  }

  _removeDocumentFolder = folder => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Delete Folder',
        text: 'Are you sure you want to delete this folder?',
        id: folder.id
      },
      onConfirm: async isConfirmed => {
        if (isConfirmed) {
          await this.props.removeDocumentFolder(isConfirmed)
          this.props.getDocumentFolder()
        }
      }
    })
  }

  _newDocumentFile = folderObject => {
    this.props.openModal(TypesModal.MODAL_TYPE_NEW_DOCUMENT_FILE, {
      titleModal: 'New File',
      folderObject
    })
  }

  _removeDocumentFile = file => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Delete File',
        text: 'Are you sure you want to delete this file?',
        id: file.id
      },
      onConfirm: async isConfirmed => {
        if (isConfirmed) {
          await this.props.removeDocumentFile(isConfirmed)
          this.props.getFilesPerOffice(file.id)
        }
      }
    })
  }

  _listFiles = async folderId => {
    if (folderId === this.state.folderId) {
      this.props.clearFiles()
      this.setState({ folderId: null })
    } else {
      await this.props.getFilesPerOffice(folderId)
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

  _folderNameTotalFiles (folderOffice) {
    let total = 0
    this.props.totalFilesPerFolder.forEach(item => {
      if (item.folder_id === folderOffice.id) total = item.count
    })
    return `${folderOffice.name} [${total}]`
  }

  _iconColorName = (format, type) => {
    if (format === 'pdf') {
      return type === 'icon' ? 'file pdf outline' : 'red'
    } else if (format === 'jpeg' || format === 'png' || format === 'jpg') {
      return type === 'icon' ? 'file image outline' : 'orange'
    } else if (
      format === 'vnd.openxmlformats-officedocument.wordprocess' ||
      format === 'vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      format === 'docx'
    ) {
      return type === 'icon' ? 'file word outline' : 'blue'
    } else if (
      format === 'vnd.openxmlformats-officedocument.spreadsheet' ||
      format === 'xml' ||
      format === 'csv' ||
      format === 'xlsx'
    ) {
      return type === 'icon' ? 'file excel outline' : 'green'
    } else if (format === 'vnd.openxmlformats-officedocument.presentationml.presentation' || format === 'pptx') {
      return type === 'icon' ? 'file powerpoint outline' : 'purple'
    } else {
      return type === 'icon' ? 'file text outline' : 'grey'
    }
  }

  render () {
    const {
      listFolder,
      listFiles,
      // listFolderAllOffices,
      folderAnalystsWithAccess,
      folderBrokersWithAccess,
      folderGeneralWithAccess
    } = this.props
    return (
      <Wrapper>
        <Header textAlign="right">
          <Fragment>
            <Button size="small" color="facebook" onClick={() => this._newDocumentFolder()}>
              <Icon name="add" />
              New Folder
            </Button>
            <Button size="small" color="twitter" onClick={() => this._newDocumentFile()}>
              <Icon name="file" />
              New File
            </Button>
          </Fragment>
        </Header>
        {listFolder && listFolder.length > 0 ? (
          <Segment size="tiny">
            <Grid style={{ marginTop: '10px' }}>
              <Fragment>
                {folderAnalystsWithAccess.map((folderOffice, index) => {
                  if (folderOffice) {
                    return (
                      <Fragment key={index}>
                        {index === 0 ? (
                          <Grid.Row style={{ paddingBottom: '0px' }}>
                            <Grid.Column>
                              <Divider horizontal>
                                <Header as="h3" color="blue" textAlign="center" content={'Analysts'} />
                              </Divider>
                            </Grid.Column>
                          </Grid.Row>
                        ) : null}
                        <Grid.Row style={{ paddingTop: '0px' }} columns={2}>
                          <Grid.Column style={{ paddingRight: '0px' }} width={2}>
                            <Icon
                              onClick={() => this._listFiles(folderOffice.id)}
                              link
                              name="folder"
                              color="yellow"
                              size="big"
                            />
                            <Label
                              style={{ backgroundColor: 'white', color: 'black', paddingLeft: '5px' }}
                              as="a"
                              size="large"
                              onClick={() => this._listFiles(folderOffice.id)}
                            >
                              {this._folderNameTotalFiles(folderOffice)}{' '}
                            </Label>
                          </Grid.Column>
                          <Grid.Column style={{ paddingLeft: '0px', marginTop: '3px' }}>
                            <Icon
                              style={{ marginLeft: '5px' }}
                              onClick={() => this._newDocumentFile(folderOffice)}
                              name="add"
                              color="blue"
                              size="large"
                            />
                            <Icon
                              name="edit"
                              color="green"
                              size="large"
                              link
                              onClick={() => this._editDocumentFolder(folderOffice)}
                            />
                            <Icon
                              name="trash"
                              color="red"
                              size="large"
                              link
                              onClick={() => this._removeDocumentFolder(folderOffice)}
                            />
                          </Grid.Column>
                        </Grid.Row>
                        {listFiles && listFiles.length > 0 ? (
                          <Fragment>
                            {listFiles.map((files, index2) => {
                              if (files.folder_id === folderOffice.id) {
                                return (
                                  <Table style={{ marginLeft: '50px' }} key={index2} basic="very" celled size="large">
                                    <Table.Header>
                                      <Table.Row>
                                        <Table.HeaderCell>
                                          <Icon
                                            name="trash"
                                            color="red"
                                            size="large"
                                            link
                                            onClick={() => this._removeDocumentFile(folderOffice)}
                                          />
                                          <Icon
                                            link
                                            name={this._iconColorName(files.format, 'icon')}
                                            color={this._iconColorName(files.format, 'color')}
                                            size="big"
                                            onClick={() => this._downloadFile(files)}
                                          />
                                          <Label
                                            style={{
                                              backgroundColor: 'white',
                                              paddingLeft: '5px'
                                            }}
                                            as="a"
                                            size="large"
                                            onClick={() => this._downloadFile(files)}
                                          >
                                            {files.name}
                                          </Label>
                                        </Table.HeaderCell>
                                      </Table.Row>
                                    </Table.Header>
                                  </Table>
                                )
                              }
                            })}
                          </Fragment>
                        ) : null}
                      </Fragment>
                    )
                  }
                })}
                {folderBrokersWithAccess.map((folderOffice, index) => {
                  if (folderOffice) {
                    return (
                      <Fragment key={index}>
                        {index === 0 ? (
                          <Grid.Row style={{ paddingBottom: '0px' }}>
                            <Grid.Column>
                              <Divider horizontal>
                                <Header as="h3" color="blue" textAlign="center" content={'Brokers'} />
                              </Divider>
                            </Grid.Column>
                          </Grid.Row>
                        ) : null}
                        <Grid.Row style={{ paddingTop: '0px' }} columns={2}>
                          <Grid.Column style={{ paddingRight: '0px' }} width={2}>
                            <Icon
                              onClick={() => this._listFiles(folderOffice.id)}
                              link
                              name="folder"
                              color="yellow"
                              size="big"
                            />
                            <Label
                              style={{ backgroundColor: 'white', color: 'black', paddingLeft: '5px' }}
                              as="a"
                              size="large"
                              onClick={() => this._listFiles(folderOffice.id)}
                            >
                              {this._folderNameTotalFiles(folderOffice)}{' '}
                            </Label>
                          </Grid.Column>
                          <Grid.Column style={{ paddingLeft: '0px', marginTop: '3px' }}>
                            <Icon
                              style={{ marginLeft: '5px' }}
                              onClick={() => this._newDocumentFile(folderOffice)}
                              name="add"
                              color="blue"
                              size="large"
                            />
                            <Icon
                              name="edit"
                              color="green"
                              size="large"
                              link
                              onClick={() => this._editDocumentFolder(folderOffice)}
                            />
                            <Icon
                              name="trash"
                              color="red"
                              size="large"
                              link
                              onClick={() => this._removeDocumentFolder(folderOffice)}
                            />
                          </Grid.Column>
                        </Grid.Row>
                        {listFiles && listFiles.length > 0 ? (
                          <Fragment>
                            {listFiles.map((files, index2) => {
                              if (files.folder_id === folderOffice.id) {
                                return (
                                  <Table style={{ marginLeft: '50px' }} key={index2} basic="very" celled size="large">
                                    <Table.Header>
                                      <Table.Row>
                                        <Table.HeaderCell>
                                          <Icon
                                            name="trash"
                                            color="red"
                                            size="large"
                                            link
                                            onClick={() => this._removeDocumentFile(folderOffice)}
                                          />
                                          <Icon
                                            link
                                            name={this._iconColorName(files.format, 'icon')}
                                            color={this._iconColorName(files.format, 'color')}
                                            size="big"
                                            onClick={() => this._downloadFile(files)}
                                          />
                                          <Label
                                            style={{
                                              backgroundColor: 'white',
                                              paddingLeft: '5px'
                                            }}
                                            as="a"
                                            size="large"
                                            onClick={() => this._downloadFile(files)}
                                          >
                                            {files.name}
                                          </Label>
                                        </Table.HeaderCell>
                                      </Table.Row>
                                    </Table.Header>
                                  </Table>
                                )
                              }
                            })}
                          </Fragment>
                        ) : null}
                      </Fragment>
                    )
                  }
                })}
                {folderGeneralWithAccess.map((folderOffice, index) => {
                  if (folderOffice) {
                    return (
                      <Fragment key={index}>
                        {index === 0 ? (
                          <Grid.Row style={{ paddingBottom: '0px' }}>
                            <Grid.Column>
                              <Divider horizontal>
                                <Header as="h3" color="blue" textAlign="center" content={'General'} />
                              </Divider>
                            </Grid.Column>
                          </Grid.Row>
                        ) : null}
                        <Grid.Row style={{ paddingTop: '0px' }} columns={2}>
                          <Grid.Column style={{ paddingRight: '0px' }} width={2}>
                            <Icon
                              onClick={() => this._listFiles(folderOffice.id)}
                              link
                              name="folder"
                              color="yellow"
                              size="big"
                            />
                            <Label
                              style={{ backgroundColor: 'white', color: 'black', paddingLeft: '5px' }}
                              as="a"
                              size="large"
                              onClick={() => this._listFiles(folderOffice.id)}
                            >
                              {this._folderNameTotalFiles(folderOffice)}{' '}
                            </Label>
                          </Grid.Column>
                          <Grid.Column style={{ paddingLeft: '0px', marginTop: '3px' }}>
                            <Icon
                              style={{ marginLeft: '5px' }}
                              onClick={() => this._newDocumentFile(folderOffice)}
                              name="add"
                              color="blue"
                              size="large"
                            />
                            <Icon
                              name="edit"
                              color="green"
                              size="large"
                              link
                              onClick={() => this._editDocumentFolder(folderOffice)}
                            />
                            <Icon
                              name="trash"
                              color="red"
                              size="large"
                              link
                              onClick={() => this._removeDocumentFolder(folderOffice)}
                            />
                          </Grid.Column>
                        </Grid.Row>
                        {listFiles && listFiles.length > 0 ? (
                          <Fragment>
                            {listFiles.map((files, index2) => {
                              if (files.folder_id === folderOffice.id) {
                                return (
                                  <Table style={{ marginLeft: '50px' }} key={index2} basic="very" celled size="large">
                                    <Table.Header>
                                      <Table.Row>
                                        <Table.HeaderCell>
                                          <Icon
                                            name="trash"
                                            color="red"
                                            size="large"
                                            link
                                            onClick={() => this._removeDocumentFile(folderOffice)}
                                          />
                                          <Icon
                                            link
                                            name={this._iconColorName(files.format, 'icon')}
                                            color={this._iconColorName(files.format, 'color')}
                                            size="big"
                                            onClick={() => this._downloadFile(files)}
                                          />
                                          <Label
                                            style={{
                                              backgroundColor: 'white',
                                              paddingLeft: '5px'
                                            }}
                                            as="a"
                                            size="large"
                                            onClick={() => this._downloadFile(files)}
                                          >
                                            {files.name}
                                          </Label>
                                        </Table.HeaderCell>
                                      </Table.Row>
                                    </Table.Header>
                                  </Table>
                                )
                              }
                            })}
                          </Fragment>
                        ) : null}
                      </Fragment>
                    )
                  }
                })}
              </Fragment>

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
                            <Grid.Row style={{ paddingTop: '0px' }} columns={2}>
                              <Grid.Column style={{ paddingRight: '0px' }} width={2}>
                                <Icon
                                  onClick={() => this._listFiles(folderOffice.id)}
                                  link
                                  name="folder"
                                  color="yellow"
                                  size="big"
                                />
                                <Label
                                  style={{ backgroundColor: 'white', color: 'black', paddingLeft: '5px' }}
                                  as="a"
                                  size="large"
                                  onClick={() => this._listFiles(folderOffice.id)}
                                >
                                  {this._folderNameTotalFiles(folderOffice)}{' '}
                                </Label>
                              </Grid.Column>
                              <Grid.Column style={{ paddingLeft: '0px', marginTop: '3px' }}>
                                <Icon
                                  style={{ marginLeft: '5px' }}
                                  onClick={() => this._newDocumentFile(folderOffice)}
                                  name="add"
                                  color="blue"
                                  size="large"
                                />
                                <Icon
                                  name="edit"
                                  color="green"
                                  size="large"
                                  link
                                  onClick={() => this._editDocumentFolder(folderOffice)}
                                />
                                <Icon
                                  name="trash"
                                  color="red"
                                  size="large"
                                  link
                                  onClick={() => this._removeDocumentFolder(folderOffice)}
                                />
                              </Grid.Column>
                            </Grid.Row>

                            {listFiles && listFiles.length > 0 ? (
                              <Fragment>
                                {listFiles.map((files, index2) => {
                                  if (files.folder_id === folderOffice.id) {
                                    return (
                                      <Table
                                        style={{ marginLeft: '50px' }}
                                        key={index2}
                                        basic="very"
                                        celled
                                        size="large"
                                      >
                                        <Table.Header>
                                          <Table.Row>
                                            <Table.HeaderCell>
                                              <Icon
                                                name="trash"
                                                color="red"
                                                size="large"
                                                link
                                                onClick={() => this._removeDocumentFile(folderOffice)}
                                              />
                                              <Icon
                                                link
                                                name={this._iconColorName(files.format, 'icon')}
                                                color={this._iconColorName(files.format, 'color')}
                                                size="big"
                                                onClick={() => this._downloadFile(files)}
                                              />
                                              <Label
                                                style={{
                                                  backgroundColor: 'white',
                                                  paddingLeft: '5px'
                                                }}
                                                as="a"
                                                size="large"
                                                onClick={() => this._downloadFile(files)}
                                              >
                                                {files.name}
                                              </Label>
                                            </Table.HeaderCell>
                                          </Table.Row>
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

DocumentFolderEdit.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  userRoles: PropTypes.array,
  openModal: PropTypes.func,
  getDocumentFolder: PropTypes.func,
  listFolder: PropTypes.array,
  removeDocumentFolder: PropTypes.func,
  getFilesPerOffice: PropTypes.func,
  listFiles: PropTypes.array,
  listFolderAllOffices: PropTypes.array,
  removeDocumentFile: PropTypes.func,
  totalFiles: PropTypes.number,
  totalFilesPerFolder: PropTypes.array,
  clearFiles: PropTypes.func,
  folderAnalystsWithAccess: PropTypes.array,
  folderBrokersWithAccess: PropTypes.array,
  folderGeneralWithAccess: PropTypes.array
}

const mapStateToProps = state => ({
  userRoles: state.auth.user.roles,
  listFolder: state.documentFolder.get.array,
  listFiles: state.documentFolder.listFiles.array,
  listFolderAllOffices: state.documentFolder.get.folderAllOffices,
  totalFilesPerFolder: state.documentFolder.get.totalFilesPerFolder,
  folderAnalystsWithAccess: state.documentFolder.get.folderAnalystsWithAccess,
  folderBrokersWithAccess: state.documentFolder.get.folderBrokersWithAccess,
  folderGeneralWithAccess: state.documentFolder.get.folderGeneralWithAccess
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { openModal, getDocumentFolder, removeDocumentFolder, getFilesPerOffice, removeDocumentFile, clearFiles },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentFolderEdit)
