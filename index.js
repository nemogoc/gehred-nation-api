require('dotenv').config()
const express = require('express')
var favicon = require('serve-favicon')
var path = require('path')
const morgan = require('morgan') //logs HTTP requests to console
const helmet = require('helmet') //sets headers for security
const rateLimit = require('express-rate-limit') //rate limits API
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')

//init middlewares
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(bodyParser.json())
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(morgan("common"))
app.use(helmet())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(limiter); //  apply to all requests ("<apiPath>", limiter) to limit to specific path e.g. "/api"


//eventually move to routes dir - https://node-postgres.com/guides/async-express
app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUsers)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
