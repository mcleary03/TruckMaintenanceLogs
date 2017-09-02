import { persistentReducer } from 'redux-pouchdb'
import merge from 'lodash/merge'

const trucksReducer = (state = trucks, action) => {
  Object.freeze(state)
  let newState = merge({}, state)
  let { type, truckID } = action
  switch(type) {
    case 'GET_TRUCK' :
      return selectedTruck(truckID)
    case 'UPDATE_TRUCK' :
      return state
    case 'ADD_TRUCK' :
      return state
    case 'DELETE_TRUCK' :
      return state
    default :
      return state
  }
}

export default persistentReducer(trucksReducer, 'trucksReducer')

const selectedTruck = () => trucks.find( t => t.id === this.props.selectedTruck.id )

let trucks = [
  {
    id: '2',
    manufacturer: 'Ford',
    year: 2005,
    model: 'F650',
    color: 'red',
    licensePlate: 'JBS1234',
    mileage: 210433,
    vin: '98475092304958723049',
    totalCost: 70,
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
  {
    id: '3',
    manufacturer: 'Ford',
    year: 2006,
    model: 'F650',
    color: 'red',
    licensePlate: 'ASD3456',
    mileage: 141886,
    vin: 'q3094857203458947050',
    totalCost: 310,
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
  {
    id: '4',
    manufacturer: 'International',
    year: 2009,
    model: '4300',
    color: 'yellow',
    licensePlate: 'LKJ9898',
    mileage: 356721,
    vin: '34134345245324524562',
    totalCost: 82,
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
]
