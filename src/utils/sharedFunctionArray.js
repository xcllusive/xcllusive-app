export const mapArrayToValuesForDropdown = array => {
  if (array.length > 0) {
    return array.map((item, index) => ({
      key: index,
      text: item.title,
      value: item.id
    }))
  }
  return [{ key: 0, text: 'Nenhum item encontrado', value: 0 }]
}
