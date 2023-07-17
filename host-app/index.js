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

class Factory {
    constructor(name){
        this.name = name;
        this.machines = [];
    }


    addMachine(machine){
        this.machines.push(machine);
    }

    getMachine(name){
        return this.machines.find(machine => machine.name === name);
    }

    getMachines(){
        return this.machines;
    }
}

class Machine {
    constructor(name, status){
        this.name = name;
        this.status = status;
    }

    setStatus(status){
        this.status = status;
    }

    getStatus(){
        return this.status;
    }

}


const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

factories = [];

function saveFactory(unParsedFactory){
    // create a new factory object
    const newFactory = new Factory(unParsedFactory.name);
    // iterate over the machines in the unParsedFactory
    unParsedFactory.machines.forEach(machine => {
        // create a new machine object
        const newMachine = new Machine(machine.name, machine.status);
        // add the machine to the factory
        newFactory.addMachine(newMachine);
    }
    );
    // add the factory to the factories array
    factories.push(newFactory);   
}

function getAllFactories(){
    // return all factories
    return factories;
}

// POST /api/factory
// add a factory to the database
app.post('/api/factory', jsonParser, (req, res) => {
    // get the factory data from the request
    const factory = req.body;
    // log the factory data
    console.log(factory);
    // add the factory to the database
    if (factory.name == null) {
        // send a response
        res.status(400).send('Factory name is required');
        return;
    }
    if(getAllFactories().find(f => f.name === factory.name)){
        // send a response
        res.status(400).send('Factory already exists');
        return;
    }
    saveFactory(factory);
    // send a response
    res.status(201).send(`Factory added with name: ${factory.name}`);
}
);

app.patch('/api/factory/:name', jsonParser, (req, res) => {
    // get the factory data from the request
    const factory = req.body;
    // log the factory data
    console.log(factory);
    // add the factory to the database
    if (factory.name == null) {
        // send a response
        res.status(400).send('Factory name is required');
        return;
    }
    const factoryToUpdate = getAllFactories().find(f => f.name === req.params.name);
    if(factoryToUpdate == null){
        // send a response
        res.status(404).send('Factory not found');
        return;
    }
    factoryToUpdate.name = factory.name;
    // send a response
    res.status(200).send(`Factory updated with name: ${factory.name}`);
}
);

app.patch('/api/factory/:factory/:machine', jsonParser, (req, res) => {
    // get the factory data from the request
    const machine = req.body;
    // log the factory data
    console.log(req.params.factory);
    console.log(req.params.machine);
    // add the factory to the database
    const factoryToUpdate = getAllFactories().find(f => f.name === req.params.factory);
    if(factoryToUpdate == null){
        res.status(404).send('Factory not found');
        return;
    }
    const machineToUpdate = factoryToUpdate.getMachine(req.params.machine);
    if(machineToUpdate == null){
        res.status(404).send('Machine not found');
        return;
    }
    machineToUpdate.setStatus(machine.status);

    // send a response
    res.status(200).send(`Factory ${req.params.factory} Machine ${machine.name} status patched: to ${machine.status}`);
}
);

// GET /api/factorys
// get all factories from the database
app.get('/api/factorys', (req, res) => {
    // return all factories as a json block
    res.status(200).json(getAllFactories()
    );
}
);

// add a default route to return a html page index.html
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
}
);


// start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
}
);
