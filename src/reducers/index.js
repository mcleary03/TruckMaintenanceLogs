import { combineReducers } from 'redux'
import displayReducer from './displayReducer'
import maintenanceFormReducer from './maintenanceFormReducer'

const reducers = combineReducers({
  displayReducer,
  maintenanceFormReducer,
})

export default reducers
