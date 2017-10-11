import React from 'react'
import universal from 'react-universal-component'
import styles from '../css/App.css'

const UniversalExample = universal( () => import( './Example.jsx' ), {
  resolve: () => require.resolveWeak( './Example.jsx' ),
  minDelay: 500,
} )

export default class App extends React.Component {
  // set `show` to `true` to see dynamic chunks served by initial request
  // set `show` to `false` to test how asynchronously loaded chunks behave,
  // specifically how css injection is embedded in chunks + corresponding HMR
  state = {
    show: false,
  }

  componentDidMount() {
    if ( this.state.show ) return

    setTimeout( () => {
      console.log( 'now showing <Example />' )
      this.setState( { show: true, } )
    }, 1500 )
  }

  render() {
    return (
      <div>
        <h1 className={styles.title}>Hello there World</h1>
        {this.state.show && <UniversalExample />}
        {!this.state.show && 'Async Component Not Requested Yet'}
      </div>
    )
  }
}
