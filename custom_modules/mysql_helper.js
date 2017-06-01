var mysql = require('mysql');
//var config = require("../config");
var mySqlDbSettings = {
    connectionLimit: 1000, //important
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventory',
    debug: false
};

var poolConnection = mysql.createPool(mySqlDbSettings);

//-----Insert Values to MySql

var insertValues = function (req, myCallback) {
    poolConnection.getConnection(function (err, connection) {
        if (err) {
            //connection.release();
            console.log("Start SQL Server or check Password")
            myCallback("Error in connection database!");
            return;
        }
        // console.log('query ' + req.query);
        connection.query(req.query, function (err, rows) {
            connection.release();
            if (!err) {
                console.log(rows);
      //          console.log("success");
                myCallback("success", rows);
            } else {
                console.log("Error in query!");
                myCallback("failure");
            }
        });
      
       
    });
}

//-----Update Values to MySql
var updateValues = function (req, myCallback) {
    poolConnection.getConnection(function (err, connection) {
        if (err) {
            //connection.release();
            console.log(" Start SQL Server or check Password")
            myCallback("Error in connection database!");
            return;
        }
      
       // console.log('query ' + req.query);
        connection.query(req.query, function (err, rows) {
            connection.release();
            if (!err) {
                //console.log(rows);
                console.log("success");
                myCallback("success");
            } else {
                console.log("Error in query!");
                myCallback("failure");
            }
        });
      
    });
}

//-----Get Values from MySql

function getValues(req, myCallback) {
    poolConnection.getConnection(function (err, connection) {
        if (err) {
            //connection.release();
            console.log(" Start SQL Server or check Password")
            myCallback("Error in connection database!");
            return;
        }
      
        //console.log('query ' + req.query);
        connection.query(req.query, function (err, rows) {
            connection.release();
            if (!err) {
                //console.log(rows);
                if (rows == undefined) {
                    var rows = [];
                }
                console.log("success");
                myCallback("success", rows);
            } else {
                console.log("Error in query!");
                myCallback("failure");
            }
        });
      
    });
}


//-----delete Values from
function deleteValues(req, myCallback) {
    poolConnection.getConnection(function (err, connection) {
        if (err) {
            
            console.log("Start SQL Server or check Password")
            myCallback("Error in connection database!");
            return;
        }
        
       // console.log('query ' + req.query);
        connection.query(req.query, function (err, rows) {
            connection.release();
            if (!err) {
        
        //        console.log("success");
                myCallback("success", rows);
            } else {
                console.log("Error in query!");
                myCallback("failure");
            }
        });
        
    });
}

module.exports = {
    mysql: mysql,
    insertValues: insertValues,
    updateValues: updateValues,
    getValues: getValues,
    deleteValues: deleteValues
};
