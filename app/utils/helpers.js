export const truncate = (string, length) => {
  return string.length > length + 3 ? string.substring(0, length) + "..." : string
}

export const convert_to_sqrMeter = (number) => parseInt(number * 0.093)

const CapitalizeFirstChar = (str) => str && str[0].toUpperCase() + str.slice(1);

export const buildQueryParams = (data) => {
  return Object.keys(data)
    .reduce((queryParams, key) => {

      const subData = data[key]

      if (typeof subData === 'object') {

        return Object.keys(subData)
          .reduce((subParams, subKey) => {
            return Object.assign(subParams, {
              [`${subKey}${CapitalizeFirstChar(key)}`]: subData[subKey]
            })
          }, queryParams)
      }

      return Object.assign(queryParams, {
        [key]: subData
      })
    }, {})
}
