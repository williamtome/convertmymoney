const convert = (cotacao, quantidade) => cotacao * quantidade

const toMoney = valor => valor.toFixed(2)

module.exports = { convert, toMoney }