import { persistentReducer } from 'redux-pouchdb'
import merge from 'lodash/merge'
// import Truck from '../models'

const trucksReducer = (state = { selectedTruck: undefined, trucks }, action) => {
  Object.freeze(state)
  let newState = merge({}, state)

  const getTotalCost = id => (
    newState.trucks[id].serviceRecords.reduce( ( sum, record ) => sum + Number(record.cost), 0 )
  )

  switch(action.type) {
    case 'SELECT_TRUCK':
      newState.selectedTruck = newState.trucks[action.truckID]
      return newState
    case 'UPDATE_TRUCK':
      newState.selectedTruck.totalCost = getTotalCost(newState.selectedTruck.id)
      newState.trucks[newState.selectedTruck.id] = newState.selectedTruck
      return newState
    case 'CLEAR_FORM':
      newState.selectedTruck = undefined
      return newState
    case 'ADD_TRUCK':
      newState.trucks.push(action.truck)
      return newState
    default:
      return state
  }
}

export default persistentReducer(trucksReducer)


const trucks = {
  '2': {
    id: '2',
    manufacturer: 'Ford',
    year: 2005,
    model: 'F650',
    color: 'red',
    licensePlate: 'JBS1234',
    mileage: 210433,
    vin: '98475092304958723049',
    totalCost: 70.00,
    img: 'http://jingletruck.com/img/2004-ford-f650-xl-cummins-diesel-box-truck-262234311723-0.jpg',
    serviceRecords: [
      {
        category: 'oil',
        service: 'oil change',
        mileage: 207450,
        cost: 70.00,
        date: '06-29-2017',
        notes: 'fast service',
        location: 'McWhorters'
      }
    ]
  },
  '3': {
    id: '3',
    manufacturer: 'Ford',
    year: 2006,
    model: 'F650',
    color: 'red',
    licensePlate: 'ASD3456',
    mileage: 141886,
    vin: 'q3094857203458947050',
    totalCost: 310.00,
    img: 'http://jingletruck.com/img/2004-ford-f650-xl-cummins-diesel-box-truck-262234311723-0.jpg',
    serviceRecords: [
      {
        category: 'tire',
        service: 'tire repair',
        mileage: 140997,
        cost: 310.00,
        date: '07-08-2017',
        notes: '',
        location: 'McWhorters'
      }
    ]
  },
  '4': {
    id: '4',
    manufacturer: 'International',
    year: 2009,
    model: '4300',
    color: 'yellow',
    licensePlate: 'LKJ9898',
    mileage: 356721,
    vin: '34134345245324524562',
    totalCost: 82.00,
    img: 'https://cdn1.commercialtrucktrader.com/v1/media/59944b952e14f62b9f7ffd42.jpg?width=300&height=225',
    serviceRecords: [
      {
        category: 'oil',
        service: 'oil change',
        mileage: 356713,
        cost: 82.00,
        date: '08-26-2017',
        notes: '',
        location: 'self'
      }
    ]
  },
}
