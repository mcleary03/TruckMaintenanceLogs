import React from 'react'
import merge from 'lodash/merge'
import MaintenanceForm from '../components/MaintenanceForm'
import TruckForm from '../components/TruckForm'

const displayReducer = (state = {display: {component: <MaintenanceForm/>, title: 'Maintenance'}}, action) => {
  Object.freeze(state)
  switch(action.type) {
    case 'SET_DISPLAY':
      let newState = merge({}, state)
      newState.display = newDisplay(action)
      return newState
    default:
      return state
  }
}

const newDisplay = action => {
  switch(action.display) {
    case 'MaintenanceForm':
      return {component: <MaintenanceForm/>, title: 'Maintenance'}
    case 'TruckForm':
      return {component: <TruckForm/>, title: 'New Truck'}
    default :
      return {component: <MaintenanceForm/>, title: 'Maintenance'}
  }
}

export default displayReducer
