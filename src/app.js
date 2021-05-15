const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const autoloading = require("./services/autoloading").autoloading;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo/apinode');

/**
 * Routes in the "routes" in the routes 
 * directory will be autoloaded, 
 * you have an example on how to create routes 
 * in the routes/hello/hello_route.js file
 */
autoloading(app);

app.listen(process.env.PORT, process.env.HOSTNAME, () => {
    console.log(`The server in ${process.env.HOSTNAME}:${process.env.PORT} is up.`);    
});
