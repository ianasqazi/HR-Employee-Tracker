var mysql = require("mysql");

async function connectDb(){

    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "hr_employees"
      });
    
connection.connect(function(err) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId + "\n");
      });
}



module.exports = connectDb;
