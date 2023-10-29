function formatStringWithZeros(inputString) {
    // Check if the input string contains only digits
    if (/^\d+$/.test(inputString)) {
      // Convert the string to a number and then back to a string with leading zeros
      const formattedString = Number(inputString).toString().padStart(5, '0');
      return formattedString;
    } else {
      // If it's not a string containing only numbers, return the original string
      return inputString;
    }
  }

// Test
// console.log(formatStringWithZeros("1"))
// console.log(formatStringWithZeros("21"))
// console.log(formatStringWithZeros("321"))
// console.log(formatStringWithZeros("2321"))
// console.log(formatStringWithZeros("12321"))
// console.log(formatStringWithZeros("Heke 0sd  sdifs"))

module.exports = { formatStringWithZeros };