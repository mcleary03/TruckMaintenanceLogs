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

export const selectTruck = truckID => {
  return ({
    type: 'SELECT_TRUCK',
    truckID
  })
}

export const getTruck = truckID => {
  return ({
    type: 'GET_TRUCK',
    truckID
  })
}
