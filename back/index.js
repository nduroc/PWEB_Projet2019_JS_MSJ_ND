const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')

const UserAccount = require('./routes/UserAccountRoutes')
const Episode = require('./routes/EpisodeRoutes')
const Series = require('./routes/SeriesRoutes')
const Serie = require('./routes/SerieRoutes')

/* 'use strict';

const fs = require('fs'),
    path = require('path'),
    http = require('http'); */

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  secret: 'sosecret',
  saveUninitialized: false,
  resave: false
}))

/* const app = require('connect')();
const swaggerTools = require('swagger-tools');
const jsyaml = require('js-yaml'); */
const serverPort = (process.env.PORT || 3002);

// swaggerRouter configuration
/* const options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
}; */

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
/* const spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
const swaggerDoc = jsyaml.safeLoad(spec); */

// Initialize the Swagger middleware
/* swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
  });

}); */

app.use('/', UserAccount)
app.use('/', Episode)
app.use('/', Series)
app.use('/', Serie)


app.listen(serverPort, () => {
  console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort)
})