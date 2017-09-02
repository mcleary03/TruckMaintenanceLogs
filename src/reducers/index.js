import { combineReducers } from 'redux'
import displayReducer from './displayReducer'
import selectedTruckReducer from './selectedTruckReducer'
import maintenanceFormReducer from './maintenanceFormReducer'
import trucksReducer from './trucksReducer'

const reducers = combineReducers({
  displayReducer,
  selectedTruckReducer,
  maintenanceFormReducer,
  trucksReducer
})

export default reducers
