import { persistentReducer } from 'redux-pouchdb'
import merge from 'lodash/merge'

const selectedTruckReducer = (state = {id: ''}, action) => {
  Object.freeze(state)
  let newState = merge({}, state)
  let { type, truckID } = action
  switch(type) {
    case 'SELECT_TRUCK' :
      newState.id= truckID
      return newState
    case 'CLEAR_FORM' :
      newState.id = ''
      return newState
    default :
      return state
  }
}

export default persistentReducer(selectedTruckReducer, 'selectedTruckReducer')
