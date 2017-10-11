import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware-multi-compiler'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackHotServerMiddleware from 'webpack-hot-server-middleware'
import clientConfig from '../webpack/client.dev'
import serverConfig from '../webpack/server.dev'

const __DEBUG__ = process.env.NODE_ENV === 'development'
const __PORT__ = process.env.PORT || 3000

const publicPath = clientConfig.output.publicPath
const outputPath = clientConfig.output.path
const server = express()

if ( __DEBUG__ ) {
  const multiCompiler = webpack( [ clientConfig, serverConfig, ] )
  const clientCompiler = multiCompiler.compilers[ 0 ]

  server.use( webpackDevMiddleware( multiCompiler, { publicPath, } ) )
  server.use( webpackHotMiddleware( clientCompiler ) )
  server.use(
    // keeps serverRender updated with arg: { clientStats, outputPath }
    webpackHotServerMiddleware( multiCompiler, {
      serverRendererOptions: { outputPath, },
    } ) )
} else {
  const clientStats = require( '../buildClient/stats.json' )
  const serverRender = require( '../buildServer/main.js' ).default

  server.use( publicPath, express.static( outputPath ) )
  server.use( serverRender( { clientStats, outputPath, } ) )
}

server.listen( __PORT__, () => {
  console.log( `Listening on port ${__PORT__}` )
} )
