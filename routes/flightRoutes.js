var express = require('express')
var router = express.Router();
var database_table = "FLIGHT_ROUTES"

/*
* Return all flights and their information
*/
router.get('/flights', (req,res) => {
    let query = "select * from " + database_table;

    //execute
    db.query(query, (err,result) => {
        if(err){
            console.log(":: ERRO :: \n" + err);
            res.send('QUERY FAILED!')
        }
        res.send(result)
    })
});

/*
* Return the info. from one flight route
* @params code,location  
*/
router.get('/flight', (req,res) => {
    let flightCode = req.query['code'];
    let location = req.query['location'];
    if(!flightCode){
        res.status(403).send({msg: "Wrong GET Operation"});
        return;
    }

    let query = "select dep_delay, arr_delay, SEC_TO_TIME(actual_elapsed_time*60) as duration " 
    + "from FLIGHTS where origin_airport_id = " + flightCode;

    if(location){
        query += " AND DEST_AIRPORT_ID = " + location;
    }
    //execute
    db.query(query, (err,result) => {
        if(err){
            console.log(":: ERRO :: \n" + err);
            res.send('QUERY FAILED!')
        }
        res.send(result)
    })
});

module.exports = router;