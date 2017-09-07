import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import { setDisplay } from '../actions'

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

const mapStateToProps = state => ({ display: state.displayReducer.display })

const mapDispatchToProps = dispatch => ({
  setDisplay: () => dispatch(setDisplay())
})

export default connect(mapStateToProps, mapDispatchToProps)(Display)
