import { combineReducers } from 'redux'
import displayReducer from './displayReducer'
import selectedTruckReducer from './selectedTruckReducer'
import maintenanceFormReducer from './maintenanceFormReducer'

const reducers = combineReducers({
  displayReducer,
  selectedTruckReducer,
  maintenanceFormReducer
})

export default reducers
