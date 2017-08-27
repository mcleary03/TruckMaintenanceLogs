import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import displayReducer from '../reducers'

class Display extends Component {
  render() {
    let { display } = this.props
    return (
      <div id='Display'>
        <Container>
          {display.component}
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {return {display: state.displayReducer.display}}

export default connect(mapStateToProps)(Display)
