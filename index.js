const express = require('express')
const app = express()
const path = require('path')
const convert = require('./lib/convert')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req,res) => {
  res.render('home')
})

app.get('/cotacao', (req, res) => {
  const { cotacao, quantidade } = req.query;
  const conversao = convert.convert(cotacao, quantidade)
  res.render('cotacao', {
    cotacao,
    quantidade,
    conversao
  })
})

app.listen(3000)