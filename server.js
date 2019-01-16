const express = require('express');
const app = express();
const mysql = require("mysql");
const port = process.env.port || 8080;
const routes = require('./routes');

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST || '172.17.0.2',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'root',
    database: process.env.MYSQL_DATABASE || 'docker_flights'
});


db.connect((err) => {
    if (err){
        throw err;
    }
    console.log('Connected to database!');
})

global.db = db;

app.use('/',routes);

app.set('port', port);
    
app.listen(port, () => {
    console.log('Flight attendance REST API server started on: ' + port);
});

