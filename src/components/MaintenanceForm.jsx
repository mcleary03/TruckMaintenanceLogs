import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Divider, Button, Message, Label, TextArea } from 'semantic-ui-react'
import { updateForm, clearForm, selectTruck, updateTruck } from '../actions'


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
    this.flashMessage = <div/>
    this.handleChange = this.handleChange.bind(this)
    this.setSelectedTruck = this.setSelectedTruck.bind(this)
  }

  // Semantic UI component events send second argument to refer to DOM target
  handleChange = (e, target) => {
    this.props.updateForm(target.id, target.value)
    this.flashMessage = <div/>
  }

  getTruckNumbers = () => Object.keys(this.props.trucks).map(key => ({text: key, value: key}))

  setSelectedTruck = (e, target) => this.props.selectTruck(target.value)

  //TODO VALIDATION PRIOR TO SAVE
  save = () => {
    let truck = this.props.selectedTruck
    truck.serviceRecords.push(this.props.maintenanceForm)
    this.props.updateTruck(truck)
    this.props.clearForm()
    // Need logic to determine success
    this.setFlashMessage('SUCCESS')
  }

  showServiceOptions = () => {
    let { category, service } = this.props.maintenanceForm
    if (category) {
      return (
        <Form.Select
          id='service'
          label='Service'
          onChange={ this.handleChange }
          value={ service }
          options={ services[category] }
          placeholder='Select a Service'
        />
      )
    }
  }

  selectedTruckDisplay = () => {
    let truck = this.props.selectedTruck
    if (truck) {
      let { id, manufacturer, year, model, color, licensePlate, vin, img, totalCost, serviceRecords } = truck
      let lastRecord

      if (serviceRecords) lastRecord = serviceRecords[serviceRecords.length - 1]

      return (
        <div id='selectedTruckDisplay'>
          <h3 className='ui top attached header'>
            <Label basic horizontal color='orange' size='large'>
              { id }
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
              {lastRecord ? (<div>
                <h3>Last Maintenance</h3>
                <Label.Group id='labels' className='truckTagDisplay fluid'>
                  <Label basic >Date
                    <Label.Detail>
                      { lastRecord.date }
                    </Label.Detail>
                  </Label>
                  <Label basic >Location
                    <Label.Detail>
                      { lastRecord.location }
                    </Label.Detail>
                  </Label>
                  <Label basic >Service
                    <Label.Detail>
                      { lastRecord.service }
                    </Label.Detail>
                  </Label>
                  <Label basic >Mileage
                    <Label.Detail>
                      { lastRecord.mileage }
                    </Label.Detail>
                  </Label>
                  <Label basic >Cost
                    <Label.Detail>
                      { lastRecord.cost }
                    </Label.Detail>
                  </Label>
                </Label.Group>
                <div className='noteDisplay'>
                  <em>{ lastRecord.notes }</em>
                </div></div>
              ) : (
                <div><p>No Previous Records</p></div>
              )}
            </div>
          </div>
        </div>
      )
    } else
    return <div><p>Select a Truck</p></div>
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
                options={ this.getTruckNumbers() }
                onChange={ this.setSelectedTruck }
                value={ this.props.selectedTruck ? this.props.selectedTruck.id : '' }
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

const mapStateToProps = state => ({
  selectedTruck: state.trucksReducer.selectedTruck,
  trucks: state.trucksReducer.trucks,
  maintenanceForm: state.maintenanceFormReducer
})

const mapDispatchToProps = dispatch => ({
  updateTruck: (truck) => dispatch(updateTruck(updateTruck)),
  selectTruck: truckID => dispatch(selectTruck(truckID)),
  updateForm: (key, value) => dispatch(updateForm(key, value)),
  clearForm: () => dispatch(clearForm())
})

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceForm)
