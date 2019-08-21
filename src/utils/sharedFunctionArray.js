export const mapArrayToValuesForDropdown = array => {
  if (array.length > 0) {
    return array.map((item, index) => ({
      key: index,
      text: item.label ? item.label : item.name,
      value: item.id
    }))
  }
  return [{ key: 0, text: 'No records found', value: 0 }]
}

export const mapArrayToValuesForDropdownTemplates = array => {
  if (array.length > 0) {
    return array.map((item, index) => ({
      key: index,
      text: item.title,
      value: item.id
    }))
  }
  return [{ key: 0, text: 'No records found', value: 0 }]
}
