import React, { Component } from 'react'
import Display from './components/Display'
import TopMenu from './components/TopMenu'
import './App.css'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <TopMenu/>
        <Display/>
      </div>
    )
  }
}
