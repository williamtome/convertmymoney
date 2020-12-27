const api = require('./api-bcb')
const axios = require('axios')

jest.mock('axios')

test('getCotacaoAPI', () => {
  const response = {
    data: {
      value: [
        { cotacaoVenda: 5.63 }
      ]
    }
  }
  axios.get.mockResolvedValue(response)
  api.getCotacaoAPI('url').then(res => {
    expect(res).toEqual(response)
    expect(axios.get.mock.calls[0][0]).toBe('url');
  })
})

test('extractCotacao', () => {
  const cotacao = api.extractCotacao({
    data: {
      value: [
        { cotacaoVenda: 5.63 }
      ]
    }
  })
  expect(cotacao).toBe(5.63)
})

describe('getToday', () => {

  const RealDate = Date // é igual ao new Date()

  function mockDate(date) {
    global.Date = class extends RealDate {
      constructor() {
        return new RealDate(date)
      }
    }
  }

  afterEach(() => {
    global.Date = RealDate
  })

  test('getToday', () => {
    mockDate('2020-01-01T12:00:00z')
    const today = api.getToday()
    expect(today).toBe('1-1-2020')
  })

})

test('getUrl', () => {
  const url = api.getUrl('MINHA-DATA')
  expect(url).toBe("https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='MINHA-DATA'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao")
})

test('getCotacao', () => {
  const response = {
    data: {
      value: [
        { cotacaoVenda: 5.63 }
      ]
    }
  }
  
  const getUrl = jest.fn()
  getUrl.mockReturnValue('url')

  const getToday = jest.fn()
  getToday.mockReturnValue('01-01-2020')

  const getCotacaoAPI = jest.fn()  
  getCotacaoAPI.mockResolvedValue(response)

  const extractCotacao = jest.fn()
  extractCotacao.mockReturnValue(5.63)

  api.pure.getCotacao({ getToday, getUrl, getCotacaoAPI, extractCotacao })()
    .then( res => expect(res).toBe(5.63) )
})

test('getCotacao', () => {
  const res = {}

  const getToday = jest.fn()
  getToday.mockReturnValue('01-01-2020')
  
  const getUrl = jest.fn()
  getUrl.mockReturnValue('url')
  
  const getCotacaoAPI = jest.fn()  
  getCotacaoAPI.mockReturnValue(Promise.reject('err'))

  const extractCotacao = jest.fn()
  extractCotacao.mockReturnValue(5.63)

  api.pure.getCotacao({ getToday, getUrl, getCotacaoAPI, extractCotacao })()
    .then( res => expect(res).toBe('') )
})