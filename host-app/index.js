// This is a simple api that listens on port 3000 for REST requests
// Then stores the data in a Redis database
// Planning to use Express for the http server
// and the node_redis library for the Redis connection
// the API listens for POST requests on the /api/factory endpoint
// /api/factory is expecting a JSON object with the following format:
// {
//   "name": "factory name",
//   "location": "factory location",
//   "machines": [
//     {
//       "name": "machine name",
//       "status": "machine status"
//     },
//     ]
// }
// The API will then store the data in Redis
// The API will also listen for GET requests on the /api/factorys endpoint
// GET requests to /api/factorys will return an array of all factories and their data
// The REDIS_HOST environment variable is used to set the Redis host
// The REDIS_PORT environment variable is used to set the Redis port
// The REDIS_PASSWORD environment variable is used to set the Redis password
// The REDIS_DB environment variable is used to set the Redis database number


const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');
const openapi = require('express-openapi');

const app = express();
const port = 3000;

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// create redis client
const client = redis.createClient({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || '',
    db: process.env.REDIS_DB || 0,
});

// connect to redis
client.on('connect', () => {
    console.log('Connected to Redis...');
}
);


// add the express router
const router = express.Router();
// add the router to the app
app.use('/api', router);

// POST /api/factory
// add a factory to the database
router.post('/factory', jsonParser, (req, res) => {
    // get the factory data from the request
    const factory = req.body;
    // log the factory data
    console.log(factory);
    // add the factory to the database
    client.hSet(factory.name, factory);
    // send a response
    res.status(201).send(`Factory added with name: ${factory.name}`);
}
);

// GET /api/factorys
// get all factories from the database
router.get('/factorys', (req, res) => {
    // get all factories from the database
    client.hGetAll('*', (err, factorys) => {
        if (err) {
            console.log(err);
            throw err;
        }
        // log the factories
        console.log(factorys);
        // send a response
        res.status(200).send(factorys);
    }
    );
}
);


// generate the OpenAPI documentation
openapi.initialize({
    app,
    apiDoc: './openai.yaml',
    paths: './api',
    docsPath: '/api-docs',
    errorMiddleware: (err, req, res, next) => {
      console.error(err);
      res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
      });
    },
  });


// add a redirect to the OpenAPI documentation
app.get('/', (req, res) => {
    res.redirect('/api-docs');
}
);

// start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
}
);
