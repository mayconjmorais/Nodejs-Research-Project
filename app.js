/**
 * Create a record object using dataset as part of the source.
 * # Assignment #2 - 20F_CST8333_350 Programming Language Research Proj.
 *
 * Written by: Maycon Morais
 * October 05, 2020
 */

/** Module for working with file and directory paths */
const path = require('path');
/** Module for providing features for web and mobile application */
const express = require('express');
/** Node.js body parsing middleware */
const bodyParser = require('body-parser');
/** This app starts a server and listens on port 3000 for connections */
const port = 3000;
/** setting express module */
const app = express();
/** building controller module */
const covidCasesController = require("./controllers/CovidCasesController");

/** middleware for parsing json objects */
app.use(bodyParser.json());
/** middleware for parsing bodies from URL */
app.use(bodyParser.urlencoded({ extended: false }));
/** create a new directory public  */
app.use(express.static(path.join(__dirname, 'public')));
/** enables frontend/ full-stack developers to write HTML markup */
app.set('view engine', 'ejs');
/** directory where the template files are located */
app.set('views', 'views');

/** handle GET requests - retrieve all records from in-memory data */
app.get("/covidcases", covidCasesController.getAllRecords);
/** handle POST requests - responsible to save a new record in the in-memory data*/
app.post("/add-to-list", covidCasesController.saveRecord);
/** handle POST requests - responsible to update a record in the in-memory data*/
app.post("/update-covid", covidCasesController.update);
/** handle POST requests - responsible to delete a record in the in-memory data*/
app.post("/delete-covid", covidCasesController.delete);
/** handle GET requests - responsible to generate a file using in-memory data source*/
app.get("/create-file", covidCasesController.generateFile);

/** Set connection port*/
app.listen(port);