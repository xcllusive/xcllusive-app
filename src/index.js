import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
// import setLogoutFromInactivity from './utils/setLogoutFromInactivity'

ReactDOM.render(<App />, document.getElementById('root'))
// setLogoutFromInactivity()
registerServiceWorker()
