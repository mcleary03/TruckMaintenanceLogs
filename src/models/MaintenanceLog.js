import Truck from './Truck'

class MaintenanceLog {
  constructor({
    mileage,
    category,
    service,
    notes,
    cost,
    location,
    date
  }) {
    this.mileage = mileage,
    this.category = category,
    this.service = service,
    this.notes = notes,
    this.cost = cost,
    this.location = location,
    this.date = date
  }
}

let t = new Truck(
  {id: '4',
  manufacturer: 'International',
  year: 2009,
  model: '4300',
  color: 'yellow',
  licensePlate: 'LKJ9898',
  mileage: 356721,
  vin: '34134345245324524562',
  totalCost: 82.00,
  notes: '',
  active: true,
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
  ]}
)

console.log(t)

// let m = new MaintenanceLog({
//   mileage: '0',
//   category: 'oil',
//   service: 'oil change',
//   notes: 'some notes',
//   cost: '100',
//   location: 'self',
//   date: new Date()})
// console.log(m)
