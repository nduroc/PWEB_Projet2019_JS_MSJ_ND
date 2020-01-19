const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')

const UserAccount = require('./routes/UserAccountRoutes')
const Episode = require('./routes/EpisodeRoutes')
const Series = require('./routes/SeriesRoutes')
const Serie = require('./routes/SerieRoutes')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  secret: 'sosecret',
  saveUninitialized: false,
  resave: false
}))

const serverPort = (process.env.PORT || 8080);

app.use('/', UserAccount)
app.use('/', Episode)
app.use('/', Series)
app.use('/', Serie)


app.listen(serverPort, () => {
  console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort)
})