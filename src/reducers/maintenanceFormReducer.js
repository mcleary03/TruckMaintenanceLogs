import { persistentReducer } from 'redux-pouchdb'
import merge from 'lodash/merge'

let today = new Date()
const defaultState = {
  // id: serviceRecords.length + 1,
  mileage: '',
  category: '',
  service: '',
  notes: '',
  cost: '',
  location: '',
  date: `${today.getMonth()+1}-${today.getDate()}-${today.getFullYear()}`
}

const maintenanceFormReducer = (state = defaultState, action) => {
  Object.freeze(state)
  let newState = merge({}, state)
  let { type, key, value } = action
  switch(type) {
    case 'UPDATE_FORM' :
      newState[key] = value
      return newState
    case 'CLEAR_FORM' :
      return defaultState
    default :
      return state
  }
}

export default persistentReducer(maintenanceFormReducer, 'maintenanceFormReducer')
