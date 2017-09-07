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
    type: 'CLEAR_FORM',
  })
}

export const updateTruck = (truck) => {
  return ({
    type: 'UPDATE_TRUCK',
    truck
  })
}

export const selectTruck = truckID => {
  return ({
    type: 'SELECT_TRUCK',
    truckID
  })
}
