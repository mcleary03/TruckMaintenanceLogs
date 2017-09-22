import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Divider, Button, Message, Label, TextArea } from 'semantic-ui-react'
import { addTruck } from '../actions'

class TruckForm extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  render() {
    return (
      <div>
        <Form className='ui centered grid'>
          <Divider horizontal>Truck</Divider>
          <Form.Group inline>
            <div className='column'>
              <Form.Input
                label='Truck #'
                onChange={ this.setTruckID }
                value={ this.props.TruckForm.id }
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
            <Button.Group widths='2'>
              <Button color='red' onClick={ this.props.clearForm }>Cancel</Button>
              <Button color='blue' onClick={ this.props.addTruck(this.props.truckForm) }>Save</Button>
            </Button.Group>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  trucks: state.trucksReducer.trucks,
  truckForm: state.truckFormReducer
})

const mapDispatchToProps = dispatch => ({
  addTruck: truck => dispatch(addTruck(truck))
})

export default connect(mapStateToProps, mapDispatchToProps)(TruckForm)
