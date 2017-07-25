'use strict'
const mysql = require('mysql')
const fs = require('fs')
const Config = require('../config/Config.js')
const config = new Config()

/*
* Table name are listed here
*/
const dbTesterInfo = ' testerInfo '

module.exports = class Database {
    constructor () {
      this.pool  = mysql.createPool({
        connectionLimit: config.dbconnectionLimit,
        host: config.mysqlHost,
        user: config.dbUsername,
        password: config.dbPassword,
        database: config.dbDatabasename
      });
      this.countTable = "countSurveyView"
      this.surveyView = "surveyView"
    }
/*
* connect to database and return a promis with connection
* else return a promise with err
*/

  connectDB() {
    return new Promise ((resolve, reject) => {
      this.pool.getConnection(function(err, connection){
        if (!err) {
          resolve(connection)
        } else {
          console.error(err)
          reject(err)
        }
      })
    })
  }
/*
* Insert an array of answer to db.
* Input: array
* Output: err or success 
*/
  insertASurvey(answers) {
    return new Promise((resolve, reject) => {
      var input = {
        q1: (answers[0] === 'yes') ? 1 : 0,
        q2: (answers[1] === 'yes') ? 1 : 0,
        q3: answers[2],
        q4: (answers[3] === 'yes') ? 1 : 0,
        q4_1: answers[4],
        q5: answers[5]
      }

      this.connectDB().then((connection) => {
        connection.query("INSERT INTO " + config.surveyTable + 
          " SET ?", input, 
          (err, results, fields) => {
          if(!err) {
            resolve("Insert survey successfully!")
          } else {
            console.error(err)
            reject(err)
          }

        })
      })
      .catch((err) => {
        console.error(err)
        reject(err)
      })
    })
  }

  countSurveyView() {
    return new Promise ((resolve, reject) => {
      this.connectDB().then((connection) => {
        connection.query("UPDATE " + this.countTable + 
          " SET count = count + 1 WHERE element = ?", 
          this.surveyView,
          (err, results, fields) => {
            if (!err) {
              resolve("Increase survey view successfully!")
            } else {
              console.error(err)
              reject("Cannot increase survey view due to internal error!")
            }
          })
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

}
