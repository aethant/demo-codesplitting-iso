import React from 'react'
import { renderToString, } from 'react-dom/server'
import { flushModuleIds, } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import App from '../src/components/App'

export default ( { clientStats, outputPath, } ) => ( req, res ) => {
  const app = renderToString( <App /> )
  const moduleIds = flushModuleIds()

  const {
    js,
    styles, // external stylesheets
  } = flushChunks( clientStats, {
    moduleIds,
    before: [ 'bootstrap', ],
    after: [ 'main', ],

    // only needed if serving css rather than an external stylesheet
    // note: during development css still serves as a stylesheet
    outputPath,
  } )

  res.send( `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>react-universal-component-boilerplate</title>
          ${styles}
        </head>
        <body>
          <div id="root">${app}</div>
          ${js}
        </body>
      </html>` )
}
