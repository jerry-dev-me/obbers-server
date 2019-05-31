const CircularJSON = require("circular-json")

module.exports = dataToStringify => {
  let serialized = CircularJSON.stringify(dataToStringify)
  let parsed = JSON.parse(serialized)
  let result = parsed
  return result
}
