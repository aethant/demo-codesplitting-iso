import React from 'react'
import { render, hydrate } from 'react-dom'
import AppContainer from 'react-hot-loader/lib/AppContainer'
import App from './components/App'

const renderApplication = ( Application ) => {
  hydrate(
    <AppContainer>
      <Application />
    </AppContainer>,
    document.getElementById( 'root' )
  )
  return true
}

if ( process.env.NODE_ENV === 'development' ) {
  module.hot.accept( './components/App.jsx', () => {
    const AppDev = require( './components/App.jsx' ).default // eslint-disable-line global-require
    renderApplication( AppDev )
  } )
}

renderApplication( App )
