var express = require('express');
var session = require('express-session');
var GetVms = require('../controls/GetVms.js');
var GetUsers = require('../controls/GetUsers.js');
var GetTypes = require('../controls/GetTypes.js');
var Login = require('../controls/Login.js');
var SendDataToBot = require('../controls/SendDataToBot.js');
var UserRegistration = require('../controls/registerUser.js');
var DeleteUser = require('../controls/deleteUser.js');
var DeleteVM = require('../controls/deleteVM.js');
var CreateVM = require('../controls/CreateVM.js');
var UpdateVms = require('../controls/UpdateVms.js');
var UseVM = require('../controls/useVM.js');
var StopVM = require('../controls/stopVM.js');
var crypto = require('../utilities/crpyto.js');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('loginPage', { title: 'Effettua il login' });
});
router.get('/index', function (req, res, next) {
    if (!req.session) {
        //SE L'UTENTE NON È LOGGATO
        res.render('index', { title: 'Home Page', user: null });

    } else {
        if (!req.session.user) {
            //SE L'UTENTE NON È LOGGATO
            res.render('index', { title: 'Home Page', user: null });

        } else {
            //SE L'UTENTE È LOGGATO
            res.render('index', { title: 'Home Page', user: req.session.user });
        }
    }
});

router.get('/users', function (req, res, next) {
    if (!req.session) {
        //SE L'UTENTE NON È LOGGATO
        res.render('users', { title: 'Utenti', user: null });

    } else {
        if (!req.session.user) {
            //SE L'UTENTE NON È LOGGATO
            res.render('users', { title: 'Utenti', user: null });

        } else {
            //SE L'UTENTE È LOGGATO
            GetUsers.getAllUsers(function (err, usersFound) {

                if (!err) {

                    GetTypes.getAllTypes(function (err, typesFound) {

                        if (!err) {
                            //console.log(typesFound);
                            res.render('users', { title: 'Utenti', users: usersFound, user: req.session.user, types: typesFound });
                        } else {
                            res.render('error', { title: 'Errore nel richiedere i tipi utenti', message: err });
                        }

                    });

                } else {
                    res.render('error', { title: 'Errore nel richiedere elenco utenti', message: err });
                }
            });
        }
    }
});

router.get('/vms', function (req, res, next) {

    if (!req.session) {
        //SE L'UTENTE NON È LOGGATO
        res.render('vms', { title: 'VMs', virtualMachines: null, user: null });

    } else {
        if (!req.session.user) {
            //SE L'UTENTE NON È LOGGATO
            res.render('vms', { title: 'VMs', virtualMachines: null, user: null });

        } else {
            //SE L'UTENTE È LOGGATO
            GetVms.getAllVms(function (err, vms) {

                if (!err) {
                    res.render('vms', { title: 'VMs', virtualMachines: vms, user: req.session.user });
                } else {
                    res.render('error', { title: 'Errore', message: err });
                }

            });
        }
    }
});

router.get('/bot', function (req, res, next) {
    if (!req.session) {
        //SE L'UTENTE NON È LOGGATO
        res.render('bot', { title: 'Company BOT', user: null });

    } else {
        if (!req.session.user) {
            //SE L'UTENTE NON È LOGGATO
            res.render('bot', { title: 'Company BOT', user: null });

        } else {
            //SE L'UTENTE È LOGGATO
            res.render('bot', { title: 'Company BOT', user: req.session.user });
        }
    }
});


router.post('/login', function (req, res, next) {
    var session = req.session;
    //console.log("LOGIN");

    //console.log(req.body.username + req.body.password)
    Login.login(req.body.username, req.body.password, function (err, user) {

        if (!err) {
            session.user = user
            session.save();
            //DOPO AVER EFFETTUATO IL LOGIN
            res.render('./index', { title: 'Home Page', user: user });
        } else {
            //NEL CASO IN CUI IL LOGIN FALLISCE
            //console.log("Non trovato")
            res.render('error', { title: 'Errore', message: err });
        }

    });
});

router.get('/logout', function (req, res, next) {
    req.session.destroy;
    res.render('./index', { title: 'Company BOT', user: null });
});

router.get('/loginPage', function (req, res, next) {
    res.render('loginPage', { title: 'login' });
});

router.get('/createVMTest', function (req, res, next) {
    res.render('createVMTest', { title: 'loginTest' });
});

router.get('/loggedTest', function (req, res, next) {
    if (!req.session) {

        //SE L'UTENTE NON È LOGGATO
        res.render('loggedTest', { title: 'loggedTest', user: null });

    } else {
        if (!req.session.user) {

            //SE L'UTENTE NON È LOGGATO
            res.render('loggedTest', { title: 'loggedTest', user: null });

        } else {
            //SE L'UTENTE È LOGGATO
            res.render('loggedTest', { title: 'loggedTest', user: req.session.user });

        }
    }

});

router.get('/info', function (req, res, next) {
    if (!req.session) {
        //SE L'UTENTE NON È LOGGATO
        res.render('info', { title: 'Info', user: null });

    } else {
        if (!req.session.user) {
            //SE L'UTENTE NON È LOGGATO
            res.render('info', { title: 'Info', user: null });

        } else {
            //SE L'UTENTE È LOGGATO
            res.render('info', { title: 'Info', user: req.session.user });
        }
    }
});


router.post('/sendDataToBot', function (req, res, next) {
    SendDataToBot.send(req.body.answer, req.body.question, function (err, response) {
        if (!err) {
            //res.json({ output: test });
            //console.log("Inserita")
            res.send({ "esito": 'Inserita' });

        } else {
            //console.log("NON inserita")
        }
    });
});

router.post('/register', function (req, res, next) {
    UserRegistration.send(req.body.name, req.body.lastname, req.body.username, req.body.password, req.body.userType, function (err, response) {
        if (!err) {
            //res.json({ output: test });
            //console.log("Registrato")
            res.send({ "esito": 'Registato' });

        } else {
            //console.log("NON inserita")
        }
    });
});

router.post('/deleteUser', function (req, res, next) {
    DeleteUser.send(req.body.username, function (err, response) {
        if (!err) {
            //res.json({ output: test });
            //console.log("Eliminato")
            res.send({ "esito": 'Eliminato' });

        } else {
            //console.log("NON inserita")
        }
    });
});

router.post('/deleteVM', function (req, res, next) {
    DeleteVM.send(req.body.name, function (err, response) {
        if (!err) {
            //res.json({ output: test });
            //console.log("Eliminata")
            res.send({ "esito": 'Eliminata' });

        } else {
            //console.log("NON eliminata")
        }
    });
});

router.get('/VmCreatingDesktop', function (req, res, next) {

    if (req.query.name != null) {

        UpdateVms.updateState(req.query.name, "Creazione desktop environment", (err) => {
            if (!err) {
                res.send("done");
            } else {
                res.send("Non ok");
            }
        });

    } else {
        //console.log("Errore: req.query.name è null");
    }

});


router.get('/VmReady', function (req, res, next) {

    if (req.query.name != null && req.query.ipAddr != null) {


        UpdateVms.updateState(req.query.name, "Vm pronta", (err) => {
            if (!err) {

                UpdateVms.updateIp(req.query.name, req.query.ipAddr, (err) => {

                    if (!err) {
                        res.send("done");
                    } else {
                        res.send("Non ok");
                    }

                });


            } else {
                res.send("Non ok");
            }
        });

    } else {
        //console.log("Errore: req.query.name è null");
    }

});

router.post('/useVM', function (req, res, next) {

    if (req.body.name != null && req.body.user != null) {

        //console.log("ok")
        UseVM.changeUsage(req.body.name, req.body.user, function (err, response) {
            if (!err) {
                //console.log("ok")
                res.send({ "esito": 'Cambiato' });
            } else {
                //console.log("no o")
                res.send({ "esito": 'Non Cambiato' });
            }
        });

    } else {
        //console.log("Errore: req.body.name è null");
    }

});

router.post('/stopVM', function (req, res, next) {

    if (req.body.name != null && req.body.user != null) {

        StopVM.changeUsage(req.body.name, req.body.user, function (err, response) {
            if (!err) {
                //console.log("ok")
                res.send({ "esito": 'Cambiato' });
            } else {
                //console.log("no o")
                res.send({ "esito": 'Non Cambiato' });
            }
        });

    } else {
        //console.log("Errore: req.body.name è null");
    }

});

router.post('/ifVmExist', function (req, res, next) {

    if (req.query.name != null) {

        CreateVM.ifVmExistORinCreation(req.query.name, (err, vm) => {

            if (!err) {
                //console.log("mo la mando, tranquillo")

                if (vm.length == 0) {
                    //console.log("Non c'è nel DB");
                    res.send({ "inCreation": false });

                } else {

                    if (vm[0].state == "Vm in creazione") {
                        //console.log("VM in creazione");
                        var decrpyted = crypto.decrypt({ content: vm[0].password });
                        var password = decrpyted;
                        res.send({ "inCreation": true, "username": vm[0].username, "password": password, "os": vm[0].osType });
                    } else {
                        res.send({ "inCreation": false });
                    }

                }

                // res.status(200);


            } else {
                //res.status(500);
                res.send("errore" + '');
                //console.log("Errore: " + err);
            }

        });

    } else {
        //console.log("Errore: req.query.name è null");
    }

});


router.post('/createVM', function (req, res, next) {

    if (req.session != null) {
        if (req.session.user != null) {
            if (req.session.user.userType == "admin") {

                CreateVM.ifVmExist(req.body.name, function (err, exist) {

                    if (!exist) {

                        CreateVM.createVM(req.body.name, req.body.username, req.body.password, req.body.vmSize, req.body.os, function (err, DBres) {

                            if (!err) {
                                //console.log("La VM è in creazione");
                                res.send({ "esito": 'creazione' });
                            } else {
                                //console.log("Errore nella creazione della VM");
                                res.send({ "error": err });
                                //console.log(err);
                            }


                        });

                    } else {
                        //console.log("La VM già esiste");
                    }


                });


            } else {
                //console.log("Permesso negato"); 
            }
        } else {
            //console.log("L'utente non è loggato!"); 
        }
    } else {
        //console.log("Non esiste una sessione!"); 
    }
});

module.exports = router;