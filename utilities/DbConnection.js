var Connection = require("tedious").Connection;

// Create connection to database
const config = {
    authentication: {
        options: {
            userName: "USERNAME", // update me
            password: "PASSWORD" // update me
        },
        type: "default"
    },
    server: "SERVER", // update me
    options: {
        database: "DBNAME", //update me
        encrypt: true
    }
};

exports.createConnection = function (callback) {

    const connection = new Connection(config);
    connection.connect(function (err) {

        if (!err) {
            console.log("Connesso al DB!");
            callback(null, connection)

        } else {
            console.log("Errore di connessione al DB: \n" + err);
            callback(err, null)
        }

    });

}