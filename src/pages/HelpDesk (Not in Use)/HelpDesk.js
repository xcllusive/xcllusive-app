import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid, Button, Icon } from 'semantic-ui-react'
import { TypesModal, openModal } from '../../redux/ducks/modal'
import Wrapper from '../../components/content/Wrapper'

class HelpDesk extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      inputSearch: '',
      optionsSearch: {
        admin: true,
        broker: true,
        introducer: true
      }
    }
  }

  componentDidMount () {}

  _newHelpDesk = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_NEW_HELP_DESK, {
      title: 'New Help Desk',
      onConfirm: async values => {
        if (values) {
          // await this.props.createUser(values)
        }
      }
    })
  }

  // _editUser = user => {
  //   this.props.openModal(TypesModal.MODAL_TYPE_NEW_USER, {
  //     title: 'Edit User',
  //     user,
  //     onConfirm: async values => {
  //       if (values) {
  //         await this.props.updateUser(values)
  //       }
  //     }
  //   })
  // }

  render () {
    return (
      <Wrapper>
        <Grid padded="horizontally">
          <Grid.Row>
            <Grid.Column style={{ marginTop: '20px' }} width={3} floated="right">
              <Button onClick={this._newHelpDesk} color="facebook">
                <Icon name="add" />
                New Help Desk
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Wrapper>
    )
  }
}

HelpDesk.propTypes = {
  openModal: PropTypes.func
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ openModal }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HelpDesk)
