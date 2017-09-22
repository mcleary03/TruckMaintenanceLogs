import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import logo from '../images/JBStarLogoCropped.jpg'
import { setDisplay } from '../actions'

class TopMenu extends Component {
  render() {
    return (
      <div>
        <Menu id='topMenu' className='ui top fixed three item menu'>
          <Menu.Item><img id='logo' src={ logo } alt='logo'/></Menu.Item>
          <div id='title' className='item'>{ this.props.display.title} </div>
          <Menu.Item id='collapsedMenuButton'>
            <a>Menu</a>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = state => {return {display: state.displayReducer.display}}

const mapDispatchToProps = dispatch => ({
  setDisplay: truck => dispatch(setDisplay(truck))
})

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu)
