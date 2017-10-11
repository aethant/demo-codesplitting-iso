import React from 'react'
import ReactDOM from 'react-dom'
import AppContainer from 'react-hot-loader/lib/AppContainer'
import App from './components/App.jsx'

const render = App =>
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById( 'root' )
  )

if ( process.env.NODE_ENV === 'development' ) {
  module.hot.accept( './components/App.jsx', () => {
    const App = require( './components/App.jsx' ).default
    render( App )
  } )
}

render( App )
