const axios = require('axios')

const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${data}'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`

const getCotacaoAPI = data => axios.get(getUrl(data))
const extractCotacao = res => res.data.value[0].cotacaoVenda
const getToday = () => {
  const today = new Date()
  return (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear()
}

const getCotacao = async() => {
  try {
    const res = await getCotacaoAPI(getToday())
    const cotacao = await extractCotacao(res)
    return cotacao
  } catch (error) {
    console.log('erro');
    return error
  }
}

module.exports = { getCotacaoAPI, getCotacao, extractCotacao }
