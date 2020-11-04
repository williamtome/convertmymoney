const express = require('express')
const app = express()
const path = require('path')
const convert = require('./lib/convert')
const apiBCB = require('./lib/api-bcb')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async(req,res) => {
  const cotacao = await apiBCB.getCotacao()
  res.render('home', {
    cotacao: convert.toMoney(cotacao)
  })
})

app.get('/cotacao', (req, res) => {
  const { cotacao, quantidade } = req.query;
  if (cotacao && quantidade) {
    const conversao = convert.convert(cotacao, quantidade)
    res.render('cotacao', {
      error: false,
      cotacao: convert.toMoney(cotacao),
      quantidade: convert.toMoney(quantidade),
      conversao: convert.toMoney(conversao)
    })  
  } else {
    res.render('cotacao', {
      error: 'Valores inválidos!'
    })
  }
})

app.listen(3000, err => {
  if (err) {
    console.error('Não foi possível iniciar!')
  } else {
    console.log('ConvertMyMoney está online. Link: http://localhost:3000');
  }
})