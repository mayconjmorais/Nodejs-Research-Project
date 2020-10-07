/**
 * Create a record object using dataset as part of the source.
 * # Assignment #2 - 20F_CST8333_350 Programming Language Research Proj.
 * 
 * Written by: Maycon Morais
 * October 05, 2020
 */

 /** Module used to convert csv to json */
const csvToJson = require("convert-csv-to-json");
 /** list to be populated with data from data set */
let listResult = [];
 /** number of register to populate listResult */
const LIST_SIZE = 100;

/**
 * Constructor 
 */
module.exports = class Covid19 {
  constructor(id, date, cases, deaths, nameFr, nameEn) {
    this.id = id;
    this.date = date;
    this.cases = cases;
    this.deaths = deaths;
    this.name_fr = nameFr;
    this.name_en = nameEn;
  }

  /**
   * Function to read registers inside data set
   */
  static fetchAll() {
    if (listResult.length > 0) {
      return listResult;
    }
    let data = csvToJson
      .fieldDelimiter(",")
      .getJsonFromCsv("./data/covid19Cases.csv");
    for (let i = 0; i < LIST_SIZE; i++) {
      listResult.push(data[i]);
    }
    return listResult;
  }

  /**
   * Function to delete from in-memory data
   * @param {object to be deleted} row 
   */
  static deleteRow(row){
    listResult.splice(row, 1);
  }

  /**
   * Function to save a new register in in-memory data
   */
  save() {
    getAllCovid(covidList => {
      covidList.push(this);
      listResult = covidList;
    });
  }

  /**
   * Function to update the register
   * @param {object to be deleted} row 
   */
  updateRow(row){
    listResult.splice(row, 1, this);
  }
};

/**
 * Simply a function passed as an argument to another function which will then use it
 * @param {callback} cb 
 */
const getAllCovid = cb => {
  cb(listResult);
};