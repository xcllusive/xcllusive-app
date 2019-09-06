import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Wrapper from '../../components/content/Wrapper'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Header, Segment, Grid, Icon, Divider, Label, Table } from 'semantic-ui-react'
import _ from 'lodash'
import { TypesModal, openModal, closeModal } from '../../redux/ducks/modal'
import {
  getDocumentFolder,
  removeDocumentFolder,
  getFilesPerOffice,
  removeDocumentFile,
  clearFiles
} from '../../redux/ducks/documentFolder'

class DocumentFolder extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editMode: false
    }
  }

  componentDidMount () {
    this.props.getDocumentFolder()
  }

  _isUserSystemSettings = () => {
    return _.includes(this.props.userRoles, 'SYSTEM_SETTINGS_MENU')
  }

  _newDocumentFolder = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_NEW_DOCUMENT_FOLDER, {
      titleModal: 'New Folder',
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          this.props.getDocumentFolder()
          this.props.closeModal()
        }
      }
    })
  }

  _editDocumentFolder = documentFolder => {
    documentFolder.allOffices = documentFolder.allOffices !== 0
    this.props.openModal(TypesModal.MODAL_TYPE_NEW_DOCUMENT_FOLDER, {
      titleModal: 'Edit Folder',
      documentFolder
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

  // _folderNameTotalFiles (folderOffice) {
  //   let total = 0
  //   this.props.totalFilesPerFolder.forEach(item => {
  //     if (item.folder_id === folderOffice.id) total = item.count
  //   })
  //   return `${folderOffice.name} ${total}`
  // }
  _folderNameTotalFiles (folderOffice) {
    let total = 0
    this.props.totalFilesPerFolder.forEach(item => {
      if (item.folder_id === folderOffice.id) total = item.count
    })
    return `${total}`
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
                          <Grid.Column style={{ paddingRight: '0px' }}>
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
                              {folderOffice.name}
                            </Label>
                            <label>{this._folderNameTotalFiles(folderOffice)}</label>
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
                            <Divider style={{ width: '100%' }} clearing />
                          </Fragment>
                        ) : (
                          <Divider style={{ width: '100%' }} clearing />
                        )}
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
                          <Grid.Column style={{ paddingRight: '0px' }}>
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
                              {folderOffice.name}
                            </Label>
                            <label>{this._folderNameTotalFiles(folderOffice)}</label>
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
                            <Divider style={{ width: '100%' }} clearing />
                          </Fragment>
                        ) : (
                          <Divider style={{ width: '100%' }} clearing />
                        )}
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
                          <Grid.Column style={{ paddingRight: '0px' }}>
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
                              {folderOffice.name}
                            </Label>
                            <label>{this._folderNameTotalFiles(folderOffice)}</label>
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
                            <Divider style={{ width: '100%' }} clearing />
                          </Fragment>
                        ) : (
                          <Divider style={{ width: '100%' }} clearing />
                        )}
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
                              <Grid.Column style={{ paddingRight: '0px' }}>
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
                                  {folderOffice.name}
                                </Label>
                                <label>{this._folderNameTotalFiles(folderOffice)}</label>
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
                                <Divider style={{ width: '100%' }} clearing />
                              </Fragment>
                            ) : (
                              <Divider style={{ width: '100%' }} clearing />
                            )}
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
  listFiles: PropTypes.array,
  listFolderAllOffices: PropTypes.array,
  removeDocumentFile: PropTypes.func,
  totalFiles: PropTypes.number,
  totalFilesPerFolder: PropTypes.array,
  clearFiles: PropTypes.func,
  folderAnalystsWithAccess: PropTypes.array,
  folderBrokersWithAccess: PropTypes.array,
  folderGeneralWithAccess: PropTypes.array,
  closeModal: PropTypes.func
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
    {
      openModal,
      getDocumentFolder,
      removeDocumentFolder,
      getFilesPerOffice,
      removeDocumentFile,
      clearFiles,
      closeModal
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentFolder)
