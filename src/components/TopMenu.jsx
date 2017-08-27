import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import logo from '../images/JBStarLogoCropped.jpg'

class TopMenu extends Component {
  render() {
    return (
      <div>
        <Menu className='ui top fixed three item menu'>
          <Menu.Item id='logo'><img src={ logo } alt='logo'/></Menu.Item>
          <div id='title' className='item'>{this.props.display.title}</div>
          <Menu.Item className="right menu"><a>Menu</a></Menu.Item>
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = state => {return {display: state.displayReducer.display}}

export default connect(mapStateToProps)(TopMenu)
