import React, { Component } from 'react';

class BusinessDetail extends Component {
  render() {
    if (this.props.modal) {
      issos;
    }
    if (this.props.edit) {
      asdasd;
    }
    return (
      <Grid verticalAlign={'middle'}>
        <Grid.Column floated={'left'}>
          <Header title="Business" />
        </Grid.Column>
        <Grid.Column floated={'right'} width={3}>
          <Button onClick={() => this._toggleModal(true)} color="blue">
            <Icon name="add" />
            New Business
          </Button>
        </Grid.Column>
        <Grid.Row />
      </Grid>
    );
  }
}

export default Header;
