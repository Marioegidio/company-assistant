var VM = require("../models/DAOs/Vm");
const axios = require('axios')

exports.send = function (name, callback) {
    axios.get('https://createvirtualmachine.azurewebsites.net/api/DeleteVM?code=YOUR_CODE==&name=' + name, {})
        .then(function (response) {
            VM.deleteVM(name, callback);
        })
        .catch(function (error) {
            console.log(error);
            callback(error, null);
        });
}