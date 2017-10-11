import React, { Component, } from 'react'
import universal from 'react-universal-component'
import styles from '../css/AE.css'

const AnotherLoadableExample = universal( () => import( './AE' ), {
  resolve: () => require.resolveWeak( './AE' ),
  minDelay: 500,
} )

class Example extends Component {
  constructor( props ) {
    super( props )
    this.clicker = this.clicker.bind( this )
    this.state = {
      clicked: false,
    }
  }
  clicker() {
    this.setState( { ...this.state, clicked: !this.state.clicked, } )
  }
  render() {
    return ( <div>
      <div className={styles.foo} onClick={this.clicker}>Click</div>
      <div>{this.state.clicked ? <AnotherLoadableExample /> : null}</div>
    </div> )
  }
}

export default Example
