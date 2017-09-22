import { combineReducers } from 'redux'
import displayReducer from './displayReducer'
import maintenanceFormReducer from './maintenanceFormReducer'
import truckFormReducer from './truckFormReducer'
import trucksReducer from './trucksReducer'

const reducers = combineReducers({
  displayReducer,
  maintenanceFormReducer,
  truckFormReducer,
  trucksReducer
})

export default reducers
