export default class Truck {
  constructor({
    id,
    manufacturer,
    year,
    model,
    color,
    licensePlate,
    mileage,
    vin,
    totalCost,
    notes,
    active,
    img,
    serviceRecords
  }) {
    this.id = id
    this.manufacturer = manufacturer
    this.year = year
    this.model = model
    this.color = color
    this.licensePlate = licensePlate
    this.mileage = mileage
    this.vin = vin
    this.totalCost = totalCost
    this.notes = notes
    this.active = active
    this.img = img
    this.serviceRecords = serviceRecords
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
