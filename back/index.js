const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')

const UserAccount = require('./routes/UserAccountRoutes')
const Episode = require('./routes/EpisodeRoutes')
const Series = require('./routes/SeriesRoutes')
const Serie = require('./routes/SerieRoutes')
const csp = require('content-security-policy');

 
const cspPolicy = {
  'report-uri': '/reporting',
  'default-src': csp.SRC_NONE,
  'script-src': [ csp.SRC_SELF, csp.SRC_DATA ]
};
 
const localCSP = csp.getCSP(cspPolicy);

const app = express()

app.use(localCSP);
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