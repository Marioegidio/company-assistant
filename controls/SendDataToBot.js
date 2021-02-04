const axios = require('axios')

const refreshKB = function (callback) {
    try {
        return axios({
            url: 'https://YOUR_BOT/qnamaker/v4.0/knowledgebases/ENDPOINT',
            method: 'post',
            headers: { "Ocp-Apim-Subscription-Key": "Subscription-Key" },

        })
    } catch (error) {
        console.error("Errore aggiornamento KB " + error)
        callback(error, null);
    }
}

const insertData = function (answer, question, callback) {
    try {
        return axios({
            url: 'https://YOUR_BOT/qnamaker/v4.0/knowledgebases/ENDPOINT',
            method: 'patch',
            headers: { "Ocp-Apim-Subscription-Key": "Subscription-Key" },
            data: {
                "add": {
                    "qnaList": [{
                        "id": 0,
                        "answer": answer,
                        "source": "Problems",
                        "questions": [
                            question
                        ],
                    }]
                }
            }
        }).then(function (response) { setTimeout(function () { refreshKB(callback) }, 3000); });
    } catch (error) {
        console.error("Errore inserimento domanda " + error)
        callback(error, null);
    }
}



exports.send = async function (answer, question, callback) {
    // Aggiungo domanda e risposta alla KB
    insertData(answer, question, callback)
    callback(null, "inserita");
}