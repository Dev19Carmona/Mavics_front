export const cutString = (string = '--') => {
  let cut
  if (string.length > 11) {
    cut = string.substring(0, 11)
    return cut.concat('...')
  } else return string
}

export const getLazyQuery = async (get, type, set, variables = {}) => {
  try {
    let data = await get(variables)
    data = data.data[type]
    set((prevState) => {
      let prevCopy = [...prevState]
      prevCopy = [...data]
      //if (prevCopy.length === 0 && data.length > 0) prevCopy.push(...data);
      return prevCopy
    })
  } catch (error) {
    console.log(error)
    return error
  }
}

export const addField = (set = () => {}, field = '', value = '') => {
  set((prevState) => {
    const copy = [...prevState]
    copy.forEach((element) => {
      element[field] = value
    })
    return copy
  })
}

export const unformatPrice = (formattedValue) => {
  const cleanedValue = formattedValue.replace(/[^\d]/g, '')
  const unformattedValue = cleanedValue.replace(/[.,]/g, '')
  return parseInt(unformattedValue)
}

export const formatPrice = (value) => {
  const numericValue = Math.floor(parseInt(value)).toLocaleString()
  return numericValue
}
