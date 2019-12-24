const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const config = require('./config')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Revolut Challenge API' })
})

app.get('/hello', db.getUsers)
app.get('/hello/:name', db.getUserByName)
app.put('/hello/:name', db.createUser)

app.listen(config.port, () => {
  console.log(`App running on port ${config.port}.`)
})
