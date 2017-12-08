import React, { Component } from 'react';

import EditPage from './pages/Business/EditPage';
//import ListPage from './pages/Business/ListPage';

class App extends Component {
  render() {
    return (
      <div>
        <EditPage />
      </div>
      /*<div>
        <ListPage />
      </div>*/
    );
  }
}

export default App;
