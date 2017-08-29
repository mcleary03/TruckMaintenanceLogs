import React, { Component } from 'react'
import { Form, Divider, Button, Message } from 'semantic-ui-react'
import findLast from 'lodash/findLast'

const trucks = [
  {id: '2', manufacturer: 'Ford', year: 2005, model: 'F650', color: 'Red', licensePlate: 'JBS1234', mileage: 210433, vin: '98475092304958723049', totalCost: 70, img: 'http://jingletruck.com/img/2004-ford-f650-xl-cummins-diesel-box-truck-262234311723-0.jpg'},
  {id: '3', manufacturer: 'Ford', year: 2006, model: 'F650', color: 'Red', licensePlate: 'ASD3456', mileage: 141886, vin: 'q3094857203458947050', totalCost: 310, img: 'http://jingletruck.com/img/2004-ford-f650-xl-cummins-diesel-box-truck-262234311723-0.jpg'},
  {id: '4', manufacturer: 'International', year: 2009, model: '4300', color: 'Yellow', licensePlate: 'LKJ9898', mileage: 356721, vin: '34134345245324524562', totalCost: 82, img: 'https://cdn1.commercialtrucktrader.com/v1/media/59944b952e14f62b9f7ffd42.jpg?width=300&height=225'},
]

let truckNumbers = trucks.map( truck => {
  return { text: truck.id, value: truck.id }
})

// Relational Database style here, might want to just put these inside trucks
let serviceRecords = [
  {id: '1', truck: '2', category: 'oil', service: 'oil change', mileage: 207450, cost: 70.00, date: '06/29/2017', notes: 'fast service'},
  {id: '2', truck: '3', category: 'tire', service: 'tire repair', mileage: 140997, cost: 310.00, date: '07/08/2017', notes: ''},
  {id: '3', truck: '4', category: 'oil', service: 'oil change', mileage: 356713, cost: 82.00, date: '08/26/2017', notes: ''},
]

let categories = [
  {text: 'tires', value: 'tires' },
  {text: 'engine', value: 'engine'},
  {text: 'oil', value: 'oil'},
]
let services = {
  tires: [
    {text: 'tire change', value: 'tire change' },
    {text: 'tire repair', value: 'tire repair'},
    {text: 'tire inspection', value: 'tire inspection'},
  ],
  engine: [
    {text: 'engine replacement', value: 'engine replacement'},
    {text: 'engine tuneup', value: 'engine tuneup'},
    {text: 'engine inspection', value: 'engine inspection'},
  ],
  Oil: [
    {text: 'oil change', value: 'oil change'},
    {text: 'oil filter', value: 'oil filter'},
    {text: 'oil pump', value: 'oil pump'},
  ],
}

export default class MaintenanceForm extends Component {
  constructor() {
    super()
    let today = new Date()
    this.defaultState = {
      id: serviceRecords.length + 1,
      truck: '',
      mileage: '',
      category: '',
      service: '',
      notes: '',
      cost: '',
      date: `${today.getMonth()+1}-${today.getDate()}-${today.getFullYear()}`
    }
    this.state = this.defaultState
    this.handleChange = this.handleChange.bind(this)
  }

  // This is for Semantic UI Form components
  // target comes from semantic-ui-react instead of the event
  handleChange = (e, target) => {
    this.setState({ [target.id]: target.value })
  }

  // For Non-Semantic UI component inputs
  updateNotes = (e) => {
    this.setState({ notes: e.target.value })
  }

  reset = () => this.setState( this.defaultState )

  save = () => {
    // add log to database
    serviceRecords.push(this.state)
    // update running total cost on truck record
    let truck = this.selectedTruck()
    truck.totalCost = this.getTotalCost()
    this.reset()
  }

  getTotalCost = () => {
    let list = this.selectedTruckRecords()
    return list.reduce( ( mem, record ) => mem += Number(record.cost), 0 )
  }

  showServiceOptions = () => {
    if (this.state.category) {
      return (
        <Form.Select
          label='Service'
          onChange={ this.handleChange }
          options={ services[this.state.category] }
          placeholder='Select a Service'
        />
      )
    }
  }

  selectedTruck = () => {
    if (this.state.truck) {
      let truck = trucks.find( t => t.id === this.state.truck )
      return truck
    }
  }

  selectedTruckRecords = () => {
    return serviceRecords.filter( r => r.truck === this.state.truck )
  }

  selectedTruckDisplay = () => {
    if (this.state.truck) {
      let truck = this.selectedTruck()
      let { manufacturer, year, model, color, licensePlate, vin, img, totalCost } = truck
      let lastRecord = findLast(serviceRecords, record => record.truck === truck.id)
      console.log('last record', lastRecord)

      return (
        <div id='selectedTruckDisplay'>
          <h2 className='ui top attached header'>{ year } { manufacturer } { model }</h2>
          <div className='ui attached segment centered stackable three column grid'>
            <div className='ui centered column'>
              <h3>Color: { color }</h3>
              <h3>Plate# { licensePlate }</h3>
              <h3>VIN# { vin }</h3>
              <h3>Total Cost: ${ totalCost }</h3>
            </div>
            <div className='ui centered column'>
              <img id='truckImage' src={ img } alt='truck'/>
            </div>
            <div className='ui centered column'>
              <h3>Last Maintenance on { lastRecord.date }</h3>
              <h3>Service: { lastRecord.service }</h3>
                <div className='notes'>
                  <em>{ lastRecord.notes }</em>
                </div>
              <h3>Mileage: { lastRecord.mileage }</h3>
              <h3>Cost: ${ lastRecord.cost }</h3>
            </div>
          </div>
        </div>
      )
    }
    return <div/>
  }

  saveConfirmation = () => {
    return (
      <div>
        <Message positive>
          <Message.Header>Save Successful!</Message.Header>
          <p>All records have been pushed to the database.</p>
        </Message>
      </div>
    )
  }

  render() {
    console.log('new state: ', this.state)
    let selectedTruck = this.selectedTruck()

    return (
      <div>
        { this.selectedTruckDisplay() }
        <Form className='ui centered grid'>

          <Divider horizontal>Truck</Divider>
          <Form.Group inline>
            <div className='column'>
              <Form.Select
                id='truck'
                label='Truck #'
                options={ truckNumbers }
                onChange={ this.handleChange }
                value={ selectedTruck ? selectedTruck.id : '' }
                placeholder='Truck #'
                />
              <Form.Input
                id='mileage'
                label='Mileage'
                onChange={ this.handleChange }
                value={ this.state.mileage ? this.state.mileage : '' }
                placeholder='Mileage'
              />
            </div>
          </Form.Group>

          <Divider horizontal>Service</Divider>
          <Form.Group inline>
            <Form.Select
              id='category'
              label='Category'
              options={ categories }
              onChange={ this.handleChange }
              placeholder='Select a Category'
            />
            {this.showServiceOptions()}
            <Form.Input
              id='cost'
              label='Cost'
              onChange={ this.handleChange }
              value={ this.state.cost }
              placeholder='Cost of Service'
            />
          </Form.Group>

          <Divider horizontal>Notes</Divider>
          <textarea
            rows='2'
            id='notes'
            onChange={ this.updateNotes }
            value={ this.state.notes }
            placeholder='Service Notes'></textarea>
          <Divider horizontal></Divider>
          <Button.Group widths='2'>
            <Button color='red' onClick={ this.reset }>Cancel</Button>
            <Button color='blue' onClick={ this.save }>Save</Button>
          </Button.Group>
        </Form>
      </div>
    )
  }
}
