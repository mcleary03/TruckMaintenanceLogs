import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Divider, Button, Message, Label, Segment, TextArea } from 'semantic-ui-react'
import findLast from 'lodash/findLast'
import maintenanceFormReducer from '../reducers'
import { updateForm, clearForm } from '../actions'

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

const categories = [
  {text: 'tires', value: 'tires' },
  {text: 'engine', value: 'engine'},
  {text: 'oil', value: 'oil'},
]

const services = {
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
  oil: [
    {text: 'oil change', value: 'oil change'},
    {text: 'oil filter', value: 'oil filter'},
    {text: 'oil pump', value: 'oil pump'},
  ],
}

class MaintenanceForm extends Component {
  constructor() {
    super()
    let flashMessage = <div/>

    this.state = { selectedTruckID: '' }
    this.handleChange = this.handleChange.bind(this)
    this.setTruckID = this.setTruckID.bind(this)
  }

  // Semantic UI component events send second argument to refer to DOM target
  handleChange = (e, target) => {
    this.props.updateForm(target.id, target.value)
    // this.setState({ [target.id]: target.value })
    this.flashMessage = <div/>
  }

  setTruckID = (e, target) => this.setState({selectedTruckID: target.value})

  //TODO VALIDATION PRIOR TO SAVE
  save = () => {
    // update running total cost on truck record
    let truck = this.selectedTruck()
    truck.totalCost = this.getTotalCost()
    // add log to database
    truck.serviceRecords.push(this.props.maintenanceForm)
    this.props.clearForm()
    // Replace this with logic checking if database save was Successful
    this.setFlashMessage('SUCCESS')
  }

  getTotalCost = () => {
    let list = this.selectedTruckRecords()
    return list.reduce( ( sum, record ) => sum += Number(record.cost), 0 )
  }

  showServiceOptions = () => {
    if (this.props.maintenanceForm.category) {
      return (
        <Form.Select
          id='service'
          label='Service'
          onChange={ this.handleChange }
          value={ this.props.maintenanceForm.service }
          options={ services[this.props.maintenanceForm.category] }
          placeholder='Select a Service'
        />
      )
    }
  }

  getTruckNumbers = trucks.map( t => ({text: t.id, value: t.id}) )

  selectedTruck = () => {
    if (this.state.selectedTruckID) {
      let truck = trucks.find( t => t.id === this.state.selectedTruckID )
      return truck
    } else {
      console.log('NO TRUCK OBJECT SELECTED')
    }
  }

  selectedTruckRecords = () => (this.selectedTruck().serviceRecords)

  selectedTruckDisplay = () => {
    if (this.state.selectedTruckID) {
      let truck = this.selectedTruck()
      let { id, manufacturer, year, model, color, licensePlate, vin, img, totalCost } = truck
      let lastRecord = truck.serviceRecords[truck.serviceRecords.length - 1]
      let tagColor = 'teal'
      console.log('last record', lastRecord)

      return (
        <div id='selectedTruckDisplay'>
          <h3 className='ui top attached header'>
            <Label basic horizontal color='teal' size='large'>
              {id}
            </Label>
            { year } { manufacturer } { model }
          </h3>
          <div className='ui attached segment centered stackable three column grid'>
            <div className='ui centered column'>
              <h3>Truck Information</h3>
              <h4>Color: { color }</h4>
              <h4>Plate# { licensePlate }</h4>
              <h4>VIN# { vin }</h4>
              <h4>Total Cost: ${ totalCost }</h4>
            </div>
            <div className='ui centered column'>
              <div className="ui image fluid">
                <img
                  id='truckImage'
                  src={ img }
                  alt='truck'
                />
              </div>
            </div>
            <div className='ui centered column'>
              <h3>Last Maintenance</h3>
              <Label.Group id='labels' className='truckTagDisplay fluid'>
                <Label basic color={ tagColor }>Date
                  <Label.Detail>
                    { lastRecord.date }
                  </Label.Detail>
                </Label>
                <Label basic color={ tagColor }>Location
                  <Label.Detail>
                    { lastRecord.location }
                  </Label.Detail>
                </Label>
                <Label basic color={ tagColor }>Service
                  <Label.Detail>
                    { lastRecord.service }
                  </Label.Detail>
                </Label>
                <Label basic color={ tagColor }>Mileage
                  <Label.Detail>
                    { lastRecord.mileage }
                  </Label.Detail>
                </Label>
                <Label basic color={ tagColor }>Cost
                  <Label.Detail>
                    { lastRecord.cost }
                  </Label.Detail>
                </Label>
              </Label.Group>
              <div className='noteDisplay'>
                <em>{ lastRecord.notes }</em>
              </div>
            </div>
          </div>
        </div>
      )
    } else
    return <div/>
  }

  setFlashMessage = type => {
    switch (type) {
      case 'SUCCESS' :
        this.flashMessage = (
          <div>
            <Message positive>
              <Message.Header>Save Successful!</Message.Header>
              <p>All records have been pushed to the database.</p>
            </Message>
          </div>
        )
        break
      case 'ERROR' :
        this.flashMessage = (
          <div>
            <Message negative>
              <Message.Header>Cancelled</Message.Header>
              <p>Records have NOT been saved!</p>
            </Message>
          </div>
        )
        break
      default :
        this.flashMessage = <div/>
    }
  }

  render() {
    console.log('new state: ', this.state)
    console.log('new store: ', this.props.maintenanceForm)
    console.log('trucks: ', trucks)
    let selectedTruck = this.selectedTruck()

    return (
      <div>
        { this.flashMessage }
        { this.selectedTruckDisplay() }
        <Form className='ui centered grid'>

          <Divider horizontal>Truck</Divider>
          <Form.Group inline>
            <div className='column'>
              <Form.Select
                id='truck'
                label='Truck #'
                options={ this.getTruckNumbers }
                onChange={ this.setTruckID }
                value={ this.selectedTruckID }
                placeholder='Truck #'
                />
              <Form.Input
                id='mileage'
                label='Mileage'
                onChange={ this.handleChange }
                value={ this.props.maintenanceForm.mileage ? this.props.maintenanceForm.mileage : '' }
                placeholder='Mileage'
              />
            </div>
          </Form.Group>

          <Divider horizontal>Service</Divider>
          <Form.Group inline>
            <Form.Input
              id='location'
              label='Location'
              onChange={ this.handleChange }
              value={ this.props.maintenanceForm.location }
              placeholder='Location'/>
            <Form.Select
              id='category'
              label='Category'
              options={ categories }
              onChange={ this.handleChange }
              value={ this.props.maintenanceForm.category }
              placeholder='Select a Category'
            />
            {this.showServiceOptions()}
            <Form.Input
              id='cost'
              label='Cost'
              onChange={ this.handleChange }
              value={ this.props.maintenanceForm.cost }
              placeholder='Cost of Service'
            />
          </Form.Group>

          <Divider horizontal>Notes</Divider>
          <TextArea
            id='notes'
            rows={ 2 }
            autoHeight
            onChange={ this.handleChange }
            value={ this.props.maintenanceForm.notes }
            placeholder='Service Notes'
          />
        <Divider horizontal />
          <Button.Group widths='2'>
            <Button color='red' onClick={ this.props.clearForm }>Cancel</Button>
            <Button color='blue' onClick={ this.save }>Save</Button>
          </Button.Group>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => (
  { maintenanceForm: state.maintenanceFormReducer }
)

const mapDispatchToProps = dispatch => (
  {
    updateForm: (key, value) => dispatch(updateForm(key, value)),
    clearForm: () => dispatch(clearForm())
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceForm)
