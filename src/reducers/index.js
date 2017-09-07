import { combineReducers } from 'redux'
import displayReducer from './displayReducer'
import maintenanceFormReducer from './maintenanceFormReducer'
import trucksReducer from './trucksReducer'

const reducers = combineReducers({
  displayReducer,
  maintenanceFormReducer,
  trucksReducer
})

export default reducers
