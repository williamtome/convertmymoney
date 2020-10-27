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