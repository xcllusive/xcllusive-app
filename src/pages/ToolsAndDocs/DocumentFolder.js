import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Wrapper from '../../components/content/Wrapper'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Header, Segment, Grid, Button, Icon, Divider, Label } from 'semantic-ui-react'
import _ from 'lodash'
import { TypesModal, openModal } from '../../redux/ducks/modal'
import { getDocumentFolder, removeDocumentFolder } from '../../redux/ducks/documentFolder'

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

  render () {
    const { listFolder } = this.props
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
            <Header style={{ paddingBottom: '10px' }} as="h2" textAlign="center" content="Documents" />
            <Grid style={{ marginTop: '10px' }} divided="vertically">
              {listFolder.map((folder, index) => {
                if (folder) {
                  return (
                    <Fragment key={index}>
                      <Grid.Row>
                        <Grid.Column>
                          <Header
                            // style={{ paddingBottom: '10px' }}
                            color="blue"
                            as="h3"
                            textAlign="left"
                            content={folder[0]['office_id.label']}
                          />
                        </Grid.Column>
                      </Grid.Row>
                      {folder.map((folderOffice, index1) => {
                        return (
                          <Fragment key={index1}>
                            <Grid>
                              <Grid.Row>
                                <Grid.Column>
                                  <Icon
                                    link
                                    name="folder"
                                    // onClick={() => this._goToBusinessesListPerAnalyst(item)}
                                  />
                                </Grid.Column>
                                <Grid.Column>
                                  <Label
                                    style={{ backgroundColor: '#f7f7f7' }}
                                    as="a"
                                    size="big"
                                    // onClick={() => window.open(resource.link)}
                                  >
                                    <u>{folderOffice.name}</u>
                                  </Label>
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </Fragment>
                        )
                      })}
                    </Fragment>
                  )

                  // return (
                  //   <Fragment key={index}>
                  //     <Grid.Row
                  //       style={{ paddingBottom: '0px', paddingTop: '0px' }}
                  //       columns={this._isUserSystemSettings() ? 3 : 2}
                  //     >
                  //       {this._isUserSystemSettings() ? (
                  //         <Grid.Column width={2}>
                  //           <Icon
                  //             name="edit"
                  //             color="green"
                  //             size="large"
                  //             link
                  //             onClick={() => this._editDocumentFolder(folder)}
                  //           />
                  //           <Icon
                  //             name="trash"
                  //             color="red"
                  //             size="large"
                  //             link
                  //             onClick={() => this._removeDocumentFolder(folder)}
                  //           />
                  //         </Grid.Column>
                  //       ) : null}
                  //       <Grid.Column style={{ textAlign: 'left' }} width={4}>
                  //         <Label
                  //           style={{ backgroundColor: '#f7f7f7', color: '#0f98ff' }}
                  //           as="a"
                  //           size="big"
                  //           onClick={() => window.open(folder.link)}
                  //         >
                  //           <u>{folder.name}</u>
                  //         </Label>
                  //       </Grid.Column>
                  //       {/* <Grid.Column width={10}>
                  //         <Label
                  //           style={{ backgroundColor: '#2285d0', color: 'white', fontWeight: 'normal' }}
                  //           size="large"
                  //           pointing="left"
                  //         >
                  //           {folder.description}
                  //         </Label>
                  //       </Grid.Column> */}
                  //     </Grid.Row>
                  //   </Fragment>
                  // )
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
  removeDocumentFolder: PropTypes.func
}

const mapStateToProps = state => ({
  userRoles: state.auth.user.roles,
  listFolder: state.documentFolder.get.array,
  isCreated: state.resource.create.isCreated,
  isUpdated: state.resource.create.isUpdated
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ openModal, getDocumentFolder, removeDocumentFolder }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentFolder)
