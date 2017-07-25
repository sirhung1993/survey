'use strict'
const fs = require('fs')
const path = require('path')

let productionConfigDoesNotExist
let productionConfigurationPath = path.join(__dirname, '/ProConfig.js')
try {
  fs.accessSync(productionConfigurationPath, fs.constants.R)
} catch (e) {
  productionConfigDoesNotExist = e
}

module.exports = class Config {
  constructor (DEVorPro) {
    if (DEVorPro === 'DEV' || productionConfigDoesNotExist) {
    	this.dbconnectionLimit = 5
    	this.mysqlHost = "localhost"
    	this.dbUsername = "innovation_survey"
    	this.dbDatabasename = "innovation_survey"
    	this.surveyTable = "surveyData",
    	this.countTable = "countSurveyView",
    	this.dbPassword = "innovation"
      
    } else if (DEVorPro === 'PRO' || productionConfigDoesNotExist === undefined) {
      //  For specific purpose configurations - write the content below in ~/config/ProConfig.js/ It will replace all the default configurations.

    }
  }
  }
