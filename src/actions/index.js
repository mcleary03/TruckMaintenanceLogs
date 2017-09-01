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
