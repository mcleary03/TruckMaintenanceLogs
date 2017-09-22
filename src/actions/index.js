export const setDisplay = display => {
  return ({
    type: 'SET_DISPLAY',
    display
  })
}

export const updateForm = (key, value) => {
  return ({
    type: 'UPDATE_FORM',
    key,
    value
  })
}

export const clearForm = () => {
  return ({
    type: 'CLEAR_FORM'
  })
}

export const clearTruckForm = () => {
  return ({
    type: 'CLEAR_TRUCK_FORM'
  })
}

export const updateTruck = () => {
  return ({
    type: 'UPDATE_TRUCK'
  })
}

export const selectTruck = truckID => {
  return ({
    type: 'SELECT_TRUCK',
    truckID
  })
}

export const addTruck = truck => {
  return ({
    type: 'ADD_TRUCK',
    truck
  })
}
