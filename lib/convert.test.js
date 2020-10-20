const convert = require('./convert')

test('convert cotação 4 and quantidade 4', () => {
  expect(convert.convert(4,4)).toBe(16)
})

test('convert cotação 0 and quantidade 4', () => {
  expect(convert.convert(4,0)).toBe(0)
})

test('toMoney convert float', () => {
  expect(convert.toMoney(2)).toBe("2.00")
})

test('toMoney convert string', () => {
  expect(convert.toMoney('2')).toBe("2.00")
})