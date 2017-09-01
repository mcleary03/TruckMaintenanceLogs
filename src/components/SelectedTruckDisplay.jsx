import React, { Component } from 'react'
import { Label } from 'semantic-ui-react'

export default class SelectedTruckDisplay () {
  constructor() {
    super()

  }

  if (this.props.truck) {
    let truck = this.selectedTruck()
    let { id, manufacturer, year, model, color, licensePlate, vin, img, totalCost } = truck
    let lastRecord = findLast(serviceRecords, record => record.truck === truck.id)
    let tagColor = 'teal'
    console.log('last record', lastRecord)

    return (
      <div id='selectedTruckDisplay'>
        <h3 className='ui top attached header'>
          <Label basic horizontal color='teal' size='large'>
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
