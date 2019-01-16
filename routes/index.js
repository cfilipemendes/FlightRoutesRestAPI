const routes = require('express').Router();
const flight = require('./flightRoutes')

/**
 * @description Root endpoint 'GET /'
 */
routes.get('/', (req ,res) => {
    res.send({msg: "Hello , server is up and running!", GET : {"1" : "/flights",
                    "2" : "/flight?code=?airportOrigin?", 
                    "3" : "/flight?code=?airport_origin_id?&location=?airport_dest_id?"}})

});
routes.use('/',flight);

/**
 * @description Default case where the end point does not exist
 */
routes.all('*', (req ,res) => {
    res.status(404).send(
        {msg: "Page not found!"});
});

module.exports = routes;