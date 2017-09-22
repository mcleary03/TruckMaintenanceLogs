import { persistentReducer } from 'redux-pouchdb'
import merge from 'lodash/merge'

let today = new Date()
const defaultState = {
  id: '',
  manufacturer: '',
  year: '',
  model: '',
  color: '',
  licensePlate: '',
  mileage: 0,
  vin: '',
  totalCost: 0,
  img: '',
  serviceRecords: []
}

const truckFormReducer = (state = defaultState, action) => {
  Object.freeze(state)
  let newState = merge({}, state)
  let { type, key, value } = action
  switch(type) {
    case 'UPDATE_FORM':
      newState[key] = value
      return newState
    case 'CLEAR_TRUCK_FORM':
      newState = defaultState
      return newState
    default:
      return state
  }
}

export default persistentReducer(truckFormReducer)
