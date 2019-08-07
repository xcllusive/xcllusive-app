import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid, Segment, Header, Button, Icon, Divider } from 'semantic-ui-react'
import Wrapper from '../../components/content/Wrapper'

import { theme } from '../../styles'

class AgreementInvoice extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount () {
  }

  render () {
    // const { } = this.props
    return (
      <Wrapper>
        <Grid style={{marginTop: '10px'}}>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Segment style={{ backgroundColor: '#008eff26' }} size="small">
                <Header as="h3" textAlign="center">
                  {'BUSINESS AGREEMENT'}
                </Header>
                <Divider></Divider>
                <Grid>
                  <Grid.Row columns={3}>
                    <Grid.Column>
                      <Button
                        size="small"
                        color={theme.buttonNew}
                      >
                        <Icon name="file" />
                      New
                      </Button>
                    </Grid.Column>
                    <Grid.Column>
                      <Button
                        size="small"
                        color={theme.buttonEdit}
                      >
                        <Icon name="edit" />
                    Edit
                      </Button>
                    </Grid.Column>
                    <Grid.Column>
                      <Button
                        size="small"
                        color={theme.buttonDownload}
                      >
                        <Icon name="download" />
                    Download
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Divider></Divider>
                <Grid.Row textAlign="center" style={{paddingBottom: '10px'}}>
                  <Header as="h4" textAlign="center">
                    {'Agreement NSW'}
                  </Header>
                </Grid.Row>
                <Grid celled="internally">
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <h4>Asking Price</h4>
                    </Grid.Column>
                    <Grid.Column>
                      <h4>$50,000</h4>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <h4>Commision</h4>
                    </Grid.Column>
                    <Grid.Column>
                      <h4>%5</h4>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <h4>Engagement Fee</h4>
                    </Grid.Column>
                    <Grid.Column>
                      <h4>$10,000</h4>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Divider></Divider>
                <Header style={{marginTop: '0px'}} as="h3" textAlign="center">
                  <Button
                    size="small"
                    color="green"
                  >
                    <Icon name="send" />
                      Send
                  </Button>
                </Header>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment style={{ backgroundColor: '#daf3e4' }}>
                <Header as="h3" textAlign="center">
                  {'INVOICE'}
                </Header>
                <Divider></Divider>
                <Grid>
                  <Grid.Row columns={3}>
                    <Grid.Column>
                      <Button
                        size="small"
                        color={theme.buttonNew}
                      >
                        <Icon name="file" />
                      New
                      </Button>
                    </Grid.Column>
                    <Grid.Column>
                      <Button
                        size="small"
                        color={theme.buttonEdit}
                      >
                        <Icon name="edit" />
                    Edit
                      </Button>
                    </Grid.Column>
                    <Grid.Column>
                      <Button
                        size="small"
                        color={theme.buttonDownload}
                      >
                        <Icon name="download" />
                    Download
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Divider></Divider>
                <Grid celled="internally">
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <h4>Last Invoice</h4>
                    </Grid.Column>
                    <Grid.Column>
                      <h4>$1,800</h4>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Divider></Divider>
                <Header style={{marginTop: '0px'}} as="h3" textAlign="center">
                  <Button
                    size="small"
                    color="green"
                  >
                    <Icon name="send" />
                      Send
                  </Button>
                </Header>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment style={{ backgroundColor: '#008eff26' }} size="small">
                <Header as="h3" textAlign="center">
                  {'PROPERTY AGREEMENT'}
                </Header>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Wrapper>
    )
  }
}

AgreementInvoice.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object

}

const mapDispatchToProps = dispatch => bindActionCreators({ }, dispatch)

const mapStateToProps = state => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AgreementInvoice)
