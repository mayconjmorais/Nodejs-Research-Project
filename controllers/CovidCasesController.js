/**
 * Create a record object using dataset as part of the source.
 * # Assignment #2 - 20F_CST8333_350 Programming Language Research Proj.
 * 
 * Written by: Maycon Morais
 * October 05, 2020
 */

 /** module to reference covid19 model */
const Covid19 = require("../models/Covid19");
/** Converts json into csv with column titles and proper line endings */
const converter = require('json-2-csv');
/** allows to work with the file system */
const fs = require('fs');

/**
 * Function responsible to generate the file populate with data in-memory data
 * @param {represents the HTTP request} req 
 * @param {represents the HTTP response} res 
 */
exports.generateFile = (req, res) => {
  
  (async () => {
    try {
      const records = Covid19.fetchAll();
      const csv = await converter.json2csvAsync(records);
      /** print CSV string */
      console.log(csv);

      /** write CSV to a file */
      fs.writeFileSync('./data/output_covid.csv', csv);
      res.redirect('/covidcases');
    } catch (err) {
      console.log(err);
      return res.status(400).send("Records not found");
    }
  })();
};
/**
 * Function to retrieve all records from in-memory data
 * @param {represents the HTTP request} req 
 * @param {represents the HTTP response} res 
 */
exports.getAllRecords = (req, res) => {
  const records = Covid19.fetchAll();
  res.render("index", {
    records: records,
    pageTitle: "Covid19 Cases",
    path: "/",
  });
};

/**
 * Function to save a new register in-memory data
 * @param {represents the HTTP request} req 
 * @param {represents the HTTP response} res 
 */
exports.saveRecord = (req, res) => {
  try {
    const record = req.body;

    /** Creating the object */
    const covid = new Covid19(
      record.idCovid,
      record.dateCovid,
      record.casesCovid,
      record.deathsCovid,
      record.namefr,
      record.nameen);
      
      /** function to save a new register */
      covid.save();
    res.redirect('/covidcases');
  } catch (error) {
    console.log(error);
    return res.status(400).send("Records not found");
  }
};

/**
 * Function to update the customer 
 * @param {represents the HTTP request} req 
 * @param {represents the HTTP response} res 
 */
exports.update = (req, res) => {
  try {
    const record = req.body;
    /** building object to be updated*/
    const covid = new Covid19(
      record.idCovid,
      record.dateCovid,
      record.casesCovid,
      record.deathsCovid,
      record.namefr,
      record.nameen);
    
      /** call function sending index to be updated */
      covid.updateRow(record.index);
      res.redirect('/covidcases');
  } catch (error) {
    return res.status(400).send("Records not found");
  }
};

/**
 * Function to delete a register in-memory data
 * @param {represents the HTTP request} req 
 * @param {represents the HTTP response} res 
 */
exports.delete = (req, res) => {
  try {
    const index = req.body.btDelete;
    /** call function sending index to be deleted */
    Covid19.deleteRow(index);
    res.redirect('/covidcases');
  } catch (error) {
    console.log(error);
    return res.status(400).send("Records not found");
  }
};
