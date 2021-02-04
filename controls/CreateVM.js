var Vm = require("../models/DAOs/Vm");
const axios = require('axios');
const crypto = require('../utilities/crpyto.js');



exports.createVM = function (name, username, password, vmSize, os, callback) {

    var id = "/subscriptions/SUBSCRIPTION/resourceGroups/RESOURCEGROUP/providers/Microsoft.Compute/virtualMachines/" + name;
    console.log(username + password+ "os "+os)
    axios.post('https://createvirtualmachine.azurewebsites.net/api/CreateVM?code=YOUR_CODE==&name=' + name + '&username=' + username + '&password=' + password + '&vmSize=' + vmSize + '&os=' + os, { headers: { 'Content-Type': 'application/application.json' } })
        .then(function (response) {

            if (!response.data.error) {

                if (!response.data.resIP.error) {

                    if (!response.data.resNetInterface.error) {

                        if (!response.data.resVm.error) {

                            var encrypted = crypto.encrypt(password);
                            var pass = encrypted.content

                            Vm.insertVM(id, name, username, pass, "Vm in creazione", false, null, null, os, vmSize, function (err) {

                                if (!err) {
                                    callback(null, response);
                                } else {
                                    callback(err, null);
                                }

                            });

                        } else {
                            callback("Errore Creazione della vm: " + response.data.resVm.error.message, response);
                        }

                    } else {
                        callback("Errore Creazione dell'interfaccia di rete: " + response.data.resNetInterface.error.message, response);
                    }

                } else {
                    callback("Errore Creazione Ip statico: " + response.data.resIP.error.message, response);
                }

            } else {
                callback("Errore Creazione Vm", null);
            }

        })
        .catch(function (error) {
            callback(error, null);
        });



}


exports.ifVmExist = function (name, callback) {

    Vm.ifExist(name, function (err, check) {

        if (!err) {
            callback(null, check)
        } else {
            callback(err, null);
        }

    });

}

exports.ifVmExistORinCreation = function (name, callback) {

    Vm.fetchByName(name, function (err, vm) {

        if (!err) {
            callback(null, vm)
        } else {
            callback(err, null);
        }

    });

}