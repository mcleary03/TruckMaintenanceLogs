import React, { Component } from 'react'
import { Form, Divider, Button } from 'semantic-ui-react'

const trucks = [
  {id: '2', manufacturer: 'Ford', year: 2005, model: 'F650', color: 'Red', licensePlate: 'JBS1234', mileage: 210433, vin: '98475092304958723049', img: 'http://jingletruck.com/img/2004-ford-f650-xl-cummins-diesel-box-truck-262234311723-0.jpg'},
  {id: '3', manufacturer: 'Ford', year: 2006, model: 'F650', color: 'Red', licensePlate: 'ASD3456', mileage: 141886, vin: 'q3094857203458947050', img: 'http://jingletruck.com/img/2004-ford-f650-xl-cummins-diesel-box-truck-262234311723-0.jpg'},
  {id: '4', manufacturer: 'International', year: 2009, model: '4300', color: 'Yellow', licensePlate: 'LKJ9898', mileage: 356721, vin: '34134345245324524562', img: 'https://cdn1.commercialtrucktrader.com/v1/media/59944b952e14f62b9f7ffd42.jpg?width=300&height=225'},
]

let truckNumbers = trucks.map( truck => {
  return {text: truck.id, value: truck.id }
})

// Relational Database style here, might want to just put these inside trucks
const serviceRecords = [
  {id: '1', truckID: '2', category: 'Oil', service: 'Oil Change', mileage: 207450, date: '06/29/2017'},
  {id: '2', truckID: '3', category: 'Tire', service: 'Tire Repair', mileage: 140997, date: '07/08/2017'},
  {id: '3', truckID: '4', category: 'Oil', service: 'Oil Change', mileage: 356713, date: '08/26/2017'},
]

const categories = [
  {text: 'Tires', value: 'Tires' },
  {text: 'Engine', value: 'Engine'},
  {text: 'Oil', value: 'Oil'},
]
const services = {
  tires: [
    {text: 'Tire Change', value: 'Tire Change' },
    {text: 'Tire Repair', value: 'Tire Repair'},
    {text: 'Tire Inspection', value: 'Tire Inspection'},
  ],
  engine: [
    {text: 'Engine Replacement', value: 'Engine Replacement'},
    {text: 'Engine Tuneup', value: 'Engine Tuneup'},
    {text: 'Engine Inspection', value: 'Engine Inspection'},
  ],
  oil: [
    {text: 'Oil Change', value: 'Oil Change'},
    {text: 'Oil Filter', value: 'Oil Filter'},
    {text: 'Oil Pump', value: 'Oil Pump'},
  ],
}

export default class MaintenanceForm extends Component {
  constructor() {
    super()
    this.state = {
      truck: '2',
      mileage: '',
      category: '',
      service: ''
    }
    this.setTruck = this.setTruck.bind(this);
    this.setMileage = this.setMileage.bind(this);
    this.setCategory = this.setCategory.bind(this);
    this.setService = this.setService.bind(this);
  }

  setTruck = (e, { value }) => {
    this.setState({ truck: value })
  }

  setMileage = (e, { value }) => {
    let mileage = e.target.value
    this.setState({ mileage })
    // also update truck mileage in database
    trucks.find( t => t.id === this.state.truck ).mileage = mileage
  }

  setCategory = (e, { value }) => {
    this.setState({ category: value })
  }

  setService = (e, { value }) => {
    this.setState({ service: value })
  }

  showServiceOptions = () => {
    if (this.state.category !== '') {
      return (
        <Form.Select
          label='Service'
          onChange={ this.setService }
          options={ services[this.state.category] }
          placeholder='Select a Service'
        />
      )
    }
  }

  render() {
    // find truck in database that matches selected truck id
    let truck = trucks.find( t => t.id === this.state.truck )
    let { id, manufacturer, year, model, color, licensePlate, mileage, vin, img } = truck
    let lastRecord = serviceRecords.find( r => r.truckID === id )

    return (
      <div>
        <h1>Service Log</h1>
        <h2 className='ui top attached header'>{ year } { manufacturer } { model }</h2>
          <div className='ui attached segment centered stackable three column grid'>
            <div className='ui centered column'>
              <h3>Color: { color }</h3>
              <h3>Plate# { licensePlate }</h3>
              <h3>VIN# { vin }</h3>
            </div>
            <div className='ui centered column'>
              <img id='truckImage' src={ img } alt='truck'/>
            </div>
            <div className='ui centered column'>
              <h3>Last Maintenance on { lastRecord.date }</h3>
              <h3>Service: { lastRecord.service }</h3>
              <h3>Mileage: {lastRecord.mileage }</h3>
            </div>
          </div>
        <Form className='ui centered grid'>
          <Divider horizontal>Truck</Divider>
          <Form.Group inline className=''>
            <div className='column'>
              <Form.Select
                label='Truck #'
                options={ truckNumbers }
                onChange={ this.setTruck }
                value={ this.state.truck }
                placeholder='Truck #'
                />
              <Form.Input
                label='Mileage'
                onChange={ this.setMileage }
                value={ mileage }
                placeholder='Mileage'
                />
            </div>
          </Form.Group>
          <Divider horizontal>Service</Divider>
          <Form.Group inline>
            <Form.Select
              label='Category'
              options={ categories }
              onChange={ this.setCategory }
              placeholder='Select a Category'
            />
            {this.showServiceOptions()}
          </Form.Group>
          <Divider horizontal></Divider>
          <Button.Group widths='2'>
            <Button color='red'>Cancel</Button>
            <Button color='blue'>Save</Button>
          </Button.Group>
        </Form>
      </div>
    )
  }
}
